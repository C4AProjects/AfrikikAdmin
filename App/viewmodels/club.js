define(['services/afrikikDatacontext', 'plugins/router',
    'durandal/system', 'services/logger', 'models/AfrikikModels', 'config', 'durandal/app'],
    function (datacontext, router, system, logger, models, config,app) {

        var model = ko.observable();
        var title = "Team Details";
        var feeds = ko.observableArray([]);
        var newTeam = ko.observable(false);
        var self = this;
        var comment = ko.observable();
        //Run when viewmodel is called
        var activate = function (id) {

            if (id === 0) {
                //create new Person model
                title = "New Team";
                return datacontext.createTeam(onRetrieve, true);
            }
            else
                return datacontext.getTeamById(id, onRetrieve, true).then(datacontext.getTeamFeeds(id, onFeedRetrieve, true));;
        };

        var onRetrieve = function (data, error) {
            if (error === false) {
                model(new models.ClubModel(data));
            }
        };

        var onFeedRetrieve = function (data, error) {
            if (error === false) {
                var mappedFeeds = $.map(data, function (item) { return new models.TeamFeedModel(item) });
                feeds(mappedFeeds);
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


//Run when navigating to another view
        var create = function () {
            return datacontext.createTeam(model, onRetrieve, true);
        };


        var save = function () {
            return datacontext.updateClub(model, onSave, true);
        };

       var onSave = function (data, error) {
            if (error === false) {
                logger.log('Team Saved', null, title, true);
                var url = '#/clubs';
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


        var vm = {
            activate: activate,
            deactivate: deactivate,
            model: model,
            create: create,
            save:save,
            cancel: cancel,
            title: title,
            upload: upload,
            newTeam: newTeam,
            feeds: feeds,
            comment: comment,
            postFeed: postFeed,
            deleteFeed: deleteFeed
        };

        return vm;
    });
