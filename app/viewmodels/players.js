define(['services/afrikikDatacontext', 'durandal/app', 'services/logger', 'config', 'models/AfrikikModels', 'plugins/router'], function (datacontext, app, logger, config, models,router) {
    var title = 'Players Directory';

    var players = ko.observableArray([]);

    var searchText = ko.observable("");

    var playerId = ko.observable(0);

    var isBusy = ko.observable(false);


    function activate() {
        getPlayers();
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }



    var gotoDetails = function (selectedPlayer) {
        if (selectedPlayer) {
            var url = '#/player/' + selectedPlayer.id();
            router.navigate(url);
        }
    };
    var getPlayers = function () {
        datacontext.getPlayers(function (data, error) {
            if (error === false) {
                //map according to model
                var mappedPlayers = $.map(data, function (item) { return new models.PlayerModel(item); });
                players(mappedPlayers);
            }
        });
    };
     var onComplete = function (result, error) {
       if (error === false) {
        logger.log(' Player Deleted', null, title, true);
        getPlayers();
    }
};
var DeletePlayer = function (selectedPlayer) {
    if (selectedPlayer) {
        app.showMessage('Are you sure you want to Delete the player?', 'Delete Player', ['Yes', 'No'])
.then(function(dialogResult){
    if(dialogResult === "Yes"){
        datacontext.deletePlayer(selectedPlayer.id(), onComplete);
        app.showMessage('Player Deleted');
    }
});


        }
    };

    var attached = function (view) {
        bindEventToList(view, '.details', gotoDetails);
        bindEventToList(view, '.delete', DeletePlayer);
    };

    var bindEventToList = function (rootSelector, selector, callback, eventName) {
        var eName = eventName || 'click';
        $(rootSelector).on(eName, selector, function () {
            var client = ko.dataFor(this);
            callback(client);
            return false;
        });
    };

        //#region pagination

        var pageSize = ko.observable(20);
        var pageIndex = ko.observable(0);

        var pagedList = ko.dependentObservable(function () {
            var size = pageSize();
            var start = pageIndex() * size;
            return players().slice(start, start + size);
        });

        var maxPageIndex = ko.dependentObservable(function () {
            return Math.ceil(players().length / pageSize()) - 1;
        });
        var previousPage = function () {
            if (pageIndex() > 0) {
                pageIndex(pageIndex() - 1);
            }
        };
        var nextPage = function () {
            if (pageIndex() < maxPageIndex()) {
                pageIndex(pageIndex() + 1);
            }
        };
        var allPages = ko.dependentObservable(function () {
            var pages = [];
            for (var i = 0; i <= maxPageIndex() ; i++) {
                pages.push({ pageNumber: (i + 1) });
            }
            return pages;
        });
        var moveToPage = function (index) {
            pageIndex(index);
        };

        //#endregion

        var loadPlayers=function(){
            app.trigger('busy', true);
            var pId = 0;
            var s0 = '_';
            if (playerId()) pId = playerId();
            if (searchText() && (s0.length > 0) ) s0 = searchText();
            return datacontext.searchPlayers(s0, onRetrieve);

        };
        var loadPlayersByCountry=function(){
            app.trigger('busy', true);
            var pId = 0;
            var s0 = '_';
            if (playerId()) pId = playerId();
            if (searchText() && (s0.length > 0) ) s0 = searchText();
            return datacontext.searchPlayersByCountry(s0, onRetrieve);

        };
        var loadPlayersByClub=function(){
            app.trigger('busy', true);
            var pId = 0;
            var s0 = '_';
            if (playerId()) pId = playerId();
            if (searchText() && (s0.length > 0) ) s0 = searchText();
            return datacontext.searchPlayersByClub(s0, onRetrieve);

        };

        var onRetrieve = function (data, error) {
         if (error === false) {
            //map according to model
            var mappedPlayers = $.map(data, function (item) { return new models.PlayerModel(item); });
            players(mappedPlayers);
        }
        app.trigger('busy', false);

    };

        //Run when navigating to another view
        var addNew = function () {
            var url = '#/player/0';
                router.navigate(url);
        };
var refresh = function () {
            getPlayers();
        };

        var canActivate = function () {
            return true;
        };

var vm = {
    activate: activate,
    attached: attached,
    title: title,
    players: players,
    gotoDetails: gotoDetails,
    loadPlayers:loadPlayers,
    playerId:playerId,
    addNew: addNew,
    getPlayers: getPlayers,
    loadPlayersByCountry:loadPlayersByCountry,
    loadPlayersByClub:loadPlayersByClub,
    refresh:refresh,
    searchText: searchText,
            //#region Pagination
            pagedList: pagedList,
            previousPage: previousPage,
            nextPage: nextPage,
            allPages: allPages,
            moveToPage: moveToPage,
            pageIndex: pageIndex,
            maxPageIndex: maxPageIndex,

    //#endregion
            DeletePlayer: DeletePlayer
        };

        return vm;

    });