define(['services/afrikikDatacontext', 'plugins/router',
    'durandal/system', 'services/logger', 'models/AfrikikModels', 'config', 'durandal/app'],
    function (datacontext, router, system, logger, models, config,app,mapping) {
        var self = this;
        var model = ko.observable();
        var title = "Team Details";
        var feeds = ko.observableArray([]);
        var players = ko.observableArray([]);
        var newTeam = ko.observable(false);
        var stat = ko.observable();      
        
        //var mytest= ko.observable(); 
        var comment = ko.observable();
        //Run when viewmodel is called
        var activate = function (id) {

            if (id == 0) {
                //create new Person model
                title = "New National Team";
                newTeam(true);
                return model(new models.NationalTeamModel());
                //return datacontext.createTeam(onRetrieve, true);
            }
            else
                return datacontext.getTeamById(id, onRetrieve, true)
                    .then(datacontext.getTeamFeeds(id, onFeedRetrieve, true))
                    .then(datacontext.getTeamStats(id, onStatRetrieve, true))
                    .then(datacontext.getTeamPlayers(id, onPlayersRetrieve, true));
        };

        var onRetrieve = function (data, error) {
            if (error === false) {
                model(new models.NationalTeamModel(data));
            }
        };
        var onFeedRetrieve = function (data, error) {
           
            if (error === false) {
                var mappedFeeds = $.map(data, function (item) { return new models.TeamFeedModel(item) });
                feeds(mappedFeeds);
            }
        };
        var onPlayersRetrieve = function (data, error) {
            if (error === false) {
                var mappedPlayers = $.map(data, function (item) { return new models.PlayerModel(item) });
                players(mappedPlayers);
            }
        };

        var onStatRetrieve = function (data, error) {
            if (error === false) {               
                
                var test=ko.viewmodel.fromModel(data);
                console.log(test);
                stat(test);
                console.log(stat);

            }
        };

        var onStatCreated = function (data, error) {
            if (error === false) {
                if (data[0])
                    stat(new models.StatModel(data[0]));
            }
        };

        self.postFeed = function () {
            //createComFeed();
            datacontext.createTeamFeed(model().id(), comment, function (data, error) {
                if (error == false) {
                    //map according to model
                    logger.log('Posted Successfully', null, title, true);
                    datacontext.getTeamFeeds(model().id(), onFeedRetrieve, true);
                    comment('');
                }
            });
        };
        var gotoDetails = function (selectedPlayer) {
            if (selectedPlayer) {
                var url = '#/player/' + selectedPlayer.id();
                router.navigate(url);
            }
        };
        var attached = function (view) {
            bindEventToList(view, '.playerdetails', gotoDetails);
        };

        var bindEventToList = function (rootSelector, selector, callback, eventName) {
            var eName = eventName || 'click';
            $(rootSelector).on(eName, selector, function () {
                var client = ko.dataFor(this);
                callback(client);
                return false;
            });
        };
//Run when navigating to another view
        var create = function () {
            return datacontext.createTeam(model, onRetrieve, true);
        };


        var save = function () {
            return datacontext.updateTeam(model, onSave, true);
        };

       var onSave = function (data, error) {
            if (error === false) {
                logger.log('Team Saved', null, title, true);
                var url = '#/teams';
            router.navigate(url);
            }
            if (error === true) {
                logger.log('Team Could Not Be Saved, Please Try Again', null, title, true);                
            }
        };
        //Run when navigating to another view
       var cancel = function () {
           router.navigateBack();
       };

        //Run when navigating to another view
        var deactivate = function () {
            return model();
        };

        var upload = function () {
            var fd = new FormData();
            fd.append('file', $('#file')[0].files[0]);

            $.ajax({
                url: config.composeTeamFileSevice('538ccddb5005f1c816ecfe75', model().id()),
                data: fd,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    alert(data);
                    model().img_url(config.composeTeamFileSevice('538ccddb5005f1c816ecfe75', model().id()));
                    save();
                }
            });
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
                datacontext.getTeamFeeds(model().id(), onFeedRetrieve, true)
            }
        };
        var addNew = ko.asyncCommand({
            execute: function () {

                var url = '#/teamPlayer/'+model().name();
                router.navigate(url);
            }
        });

        var vm = {
            activate: activate,
            deactivate: deactivate,
            attached: attached,
            gotoDetails: gotoDetails,
            model: model,
            create: create,
            save: save,

            addNew: addNew,


            cancel: cancel,
            title: title,
            upload: upload,
            newTeam: newTeam,
            feeds: feeds,
            comment: comment,
            postFeed: postFeed,
            deleteFeed: deleteFeed,
            stat:stat,
            players:players,
            stat:stat
        };

        return vm;
    });
