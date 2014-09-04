define(['services/afrikikDatacontext', 'durandal/app', 'services/logger', 'config', 'models/AfrikikModels', 'plugins/router'], function (datacontext, app, logger, config, models,router) {
    var title = 'Feeds';
    var self = this;
    var feeds = ko.observableArray([]);
    var comment = ko.observable();
    
    var isBusy = ko.observable(false);

    
    function activate() {
        getComFeeds();        
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }
   
    var getComFeeds = function () {
        datacontext.getComFeeds(function (data, error) {
            if (error == false) {
                //map according to model
                var mappedFeeds = $.map(data, function (item) { return new models.FeedModel(item) });
                feeds(mappedFeeds);
            }
        });
    };

    
     var onComplete = function (result, error) {
       if (error == false) {
           logger.log(' Comment Deleted', null, title, true);
           getComFeeds();
    }
};
     self.refresh = function () {
         getComFeeds();
     };
    

     self.postFeed = function () {
         //createComFeed();
         datacontext.createComFeed(comment, function (data, error) {
             if (error == false) {
                 //map according to model
                 logger.log('Posted Successfully', null, title, true);
                 getComFeeds();
                 comment('');
             }
         });
     };

     self.deleteFeed = function (selectedFeed) {
         if (selectedFeed) {
             app.showMessage('Are you sure you want to Delete this comment?', 'Delete Comment', ['Yes', 'No'])
     .then(function (dialogResult) {
         if (dialogResult === "Yes") {
             return datacontext.deleteFeed(selectedFeed.id(), onComplete)
         }
     });


         }
     };
    var attached = function (view) {
        //bindEventToList(view, '.details', gotoDetails);
    };

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var client = ko.dataFor(this);
            callback(client);
            return false;
        });
    };

        
        var onRetrieve = function (data, error) {
         if (error == false) {
            //map according to model
            var mappedFeeds = $.map(data, function (item) { return new models.FeedModel(item) });
            feeds(mappedFeeds);
        }
        app.trigger('busy', false);           

    };

var vm = {
    activate: activate,    
    attached: attached,
    title: title,
    feeds: feeds,
    getComFeeds: getComFeeds,
    refresh: refresh,
    comment: comment,
    postFeed: postFeed,
    deleteFeed: deleteFeed,
   
        };

        return vm;

    });