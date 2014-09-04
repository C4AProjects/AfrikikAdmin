define(['services/afrikikDatacontext', 'plugins/router',
    'durandal/system', 'services/logger', 'models/AfrikikModels', 'config', 'durandal/app'],
    function (datacontext,router, system, logger,models,config,app) {

        var model = ko.observable();
        var title = ko.observable("Player Details");
        var newPlayer = ko.observable(false);
        var feeds = ko.observableArray([]);
        //var stats = ko.observableArray([]);
        var stat = ko.observable();
        var self = this;
        var comment = ko.observable();




        //Run when viewmodel is called
        var activate = function (id) {           
            if (id == 0) {
                //create new Person model
                title("New Player");
                //return datacontext.createPlayer(onRetrieve, true);
                newPlayer(true);
                return model(new models.PlayerModel());
            }
            else {
                return datacontext.getPlayerById(id, onRetrieve, true).then(datacontext.getPlayerStats(id, onStatRetrieve, true)).then(datacontext.getPlayerFeeds(id, onFeedRetrieve, true));

            }             
        };

        self.postFeed = function () {
            //createComFeed();
            datacontext.createPlayerFeed(model().id(), comment, function (data, error) {
                if (error == false) {
                    //map according to model
                    logger.log('Posted Successfully', null, title, true);
                    datacontext.getPlayerFeeds(model().id(), onFeedRetrieve, true);
                    comment('');
                }
            });
        };

        var onRetrieve = function (data, error) {
            if (error === false) {
                model(new models.PlayerModel(data));
                console.log(model().dob());
                if(!model().dob()){
                    model().dob=ko.observable("01-01-1971");
                    console.log(model().dob());
                }
            }
        };
        var onFeedRetrieve = function (data, error) {
            if (error === false) {
                var mappedFeeds = $.map(data, function (item) { return new models.PlayerFeedModel(item) });
                feeds(mappedFeeds);
            }
        };
        var onStatRetrieve = function (data, error) {
            if (error === false) {
                if(data[0])
                    stat(new models.StatModel(data[0]));
                else {
                    stat(new models.StatModel());                    
                    stat().team(model().club());
                    stat().player(model().id());
                    datacontext.createPlayerStats(stat, onStatCreated);
                }
            }
        };

        var onStatCreated = function (data, error) {
            if (error === false) {
                if (data[0])
                    stat(new models.StatModel(data[0]));
            }
        };
        //Run when navigating to another view
        var create = function () {
            return datacontext.createPlayer(model, onCreate, true);
        };

        var save = function () {
            datacontext.updatePlayerStats(stat().id(),stat,onStatsUpdated)
            return datacontext.updatePlayer(model, onSave, true);
        };
        var onStatsUpdated = function (data, error) {
            if (error === false) {
                logger.log('Stats Updated', null, title, true);
            }
        }
        var onSave = function (data, error) {
            if (error === false) {
                logger.log('Player Saved', null, title, true);
                var url = '#/players';
                router.navigate(url);
            }
            if (error === true) {
                logger.log('Player Could Not Be Saved, Please Try Again', null, title, true);                
            }
        };

        var onCreate = function (data, error) {
            if (error === false) {
                //Set newPlayer to false after player created Successfully
                //this is loaded in the memory so next time user come back this viewmodel
                //newPlayer must be set to false if not players will be duplicated                
                newPlayer(false);
                logger.log('Player Saved', null, title, true);
                var url = '#/players';
                router.navigate(url);
            }
            if (error === true) {
                logger.log('Player Could Not Be Created, Please Try Again', null, title, true);                
            }
        };
        //Run when navigating to another view
        var cancel = function () {
         router.navigateBack();
     };

     self.deleteFeed = function (selectedFeed) {
         if (selectedFeed) {
             app.showMessage('Are you sure you want to Delete this post?', 'Delete Post', ['Yes', 'No'])
             .then(function (dialogResult) {
                 if (dialogResult === "Yes") {
                     return datacontext.deleteFeed(selectedFeed.id(), onComplete)
                 }
             });

         }
     };

     var onComplete = function (result, error) {
         if (error == false) {
             logger.log(' Post Deleted', null, title, true);
             datacontext.getPlayerFeeds(model().id(), onFeedRetrieve, true);
         }
     };

        //Run when navigating to another view
        var deactivate = function () {
            return model();
        };
        var attached = function (view) {
            $("#datepicker").datepicker({ format: 'mm-dd-yyyy' });
            $('#playerRating').rating({
                filled: 'icon-star',
              empty: 'icon-star-empty',
              start: 1,
              stop: 6
          });
        };
        var upload = function () {
            var fd = new FormData();
            fd.append('image', $('#file')[0].files[0]);

            $.ajax({
                url: config.composePlayerFileSevice('538ccddb5005f1c816ecfe75', model().id()),
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    model().img_url(config.composePlayerFileSevice('538ccddb5005f1c816ecfe75', model().id()));
                    save();
                }
            });
        };



        var vm = {
            activate: activate,
            deactivate: deactivate,
            attached: attached,
            model: model,
            create: create,
            save:save,
            cancel: cancel,
            title: title,            
            upload: upload,
            newPlayer: newPlayer,
            feeds: feeds,
            comment: comment,
            postFeed: postFeed,
            deleteFeed: deleteFeed,
            stat: stat
        };

        return vm;
    });
