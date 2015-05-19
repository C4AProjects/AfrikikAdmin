define(['services/afrikikDatacontext', 'plugins/router',
    'durandal/system', 'services/logger', 'models/AfrikikModels', 'config', 'durandal/app'],
    function (datacontext,router, system, logger,models,config,app) {

        var model = ko.observable();
        var title = ko.observable("Player Details");
        var newPlayer = ko.observable(false);
        var feeds = ko.observableArray([]);
        var self = this;
        var comment = ko.observable();

        //Run when viewmodel is called
        var activate = function (country) {

            if (country !== "") {
                //create new Person model
                title("New Player");
                //return datacontext.createPlayer(onRetrieve, true);
                newPlayer(true);
                model(new models.PlayerModel());
                model().country(country);
                return model;
            }
            else
                return datacontext.getPlayerById(id, onRetrieve, true).then(datacontext.getPlayerFeeds(id, onFeedRetrieve, true));
        };

        self.postFeed = function () {
            //createComFeed();
            datacontext.createPlayerFeed(model().id(), comment, function (data, error) {
                if (error === false) {
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
            }
        };
        var onFeedRetrieve = function (data, error) {
            if (error === false) {
                var mappedFeeds = $.map(data, function (item) { return new models.PlayerFeedModel(item); });
                feeds(mappedFeeds);
            }
        };

        var attached = function (view) {
            $("#datepicker").datepicker({ format: 'mm-dd-yyyy' });

        };

        //Run when navigating to another view
        var create = function () {
            return datacontext.createPlayer(model, onRetrieve, true);
        };

        var save = function () {
            return datacontext.updatePlayer(model, onSave, true);
        };

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
        //Run when navigating to another view
       var cancel = function () {
           router.navigateBack();
       };

       self.deleteFeed = function (selectedFeed) {
           if (selectedFeed) {
               app.showMessage('Are you sure you want to Delete this post?', 'Delete Post', ['Yes', 'No'])
       .then(function (dialogResult) {
           if (dialogResult === "Yes") {
               return datacontext.deleteFeed(selectedFeed.id(), onComplete);
           }
       });

           }
       };

       var onComplete = function (result, error) {
           if (error === false) {
               logger.log(' Post Deleted', null, title, true);
               datacontext.getPlayerFeeds(model().id(), onFeedRetrieve, true);
           }
       };

        //Run when navigating to another view
        var deactivate = function () {
            return model();
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
            deleteFeed: deleteFeed
        };

        return vm;
    });
