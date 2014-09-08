define(['services/afrikikDatacontext', 'services/logger', 'config', 'models/AfrikikModels','plugins/router','durandal/app'], function (datacontext, logger, config, models,router,app) {
    var title = 'Football Clubs Directory';

    var teams = ko.observableArray([]);

    var searchText = ko.observable("");

    var teamId = ko.observable(0);

    function activate() {
        getTeams();
        logger.log(title + ' View Activated', null, title, true);
        return true;
    }

    var gotoDetails = function (selectedTeam) {
        if (selectedTeam) {
            var url = '#/club/' + selectedTeam.id();
            router.navigate(url);
        }
    };

    var onComplete = function (result, error) {
     if (error === false) {
        logger.log(' Team Deleted', null, title, true);
    }
};

var DeleteTeam = function (selectedTeam) {
    if (selectedTeam) {
        app.showMessage('Are you sure you want to Delete the team?', 'Delete Team', ['Yes', 'No'])
        .then(function(dialogResult){
            if(dialogResult === "Yes"){
        //return datacontext.deleteTeam(selectedTeam.id(),onComplete)
        app.showMessage('Team Deleted');
    }
});


    }
};
var getTeams = function () {
    datacontext.getTeams(function (data, error) {
        if (error === false) {
            //map according to model
            var mappedTeams = $.map(data,
                function (item) {
                   return new models.ClubModel(item);
               });
            teams(mappedTeams);
        }
    });
};

var GetClubs = ko.computed(function () {
    var filteredCollection = ko.utils.arrayFilter(teams(), function (item) {
        var c = item.country();
        if(c!==undefined)
            return c.length>0;
    });
    return filteredCollection;
});

var NationalTeamsCount = ko.computed(function () {
    return GetClubs().length;
});


var onRetrieve = function (data, error) {
    if (error === false) {
        app.trigger('busy', false);
            //map according to model
            var mappedTeams = $.map(data, function (item) { return new models.ClubModel(item); });
            teams(mappedTeams);
        }
    };
    var loadTeams=function(){
        app.trigger('busy', true);
        var pId = 0;
        var s0 = '_';
        if (teamId()) pId = teamId();
        if (searchText() && (s0.length > 0) ) s0 = searchText();
        return datacontext.searchTeams(s0, onRetrieve);
    };


    var attached = function (view) {
        bindEventToList(view, '.details', gotoDetails);
        bindEventToList(view, '.delete', DeleteTeam);
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
    return GetClubs().slice(start, start + size);
});

var maxPageIndex = ko.dependentObservable(function () {
    return Math.ceil(GetClubs().length / pageSize()) - 1;
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

    //Run when navigating to another view
    var addNew = ko.asyncCommand({
        execute: function () {
            var url = '#/team/0';
            router.navigate(url);
        }
    });
    var refresh = ko.asyncCommand({
        execute: function () {
            getTeams();
        }
    });

    var canActivate = function () {
        return true;
    };


    var vm = {
        activate: activate,
        title: title,
        teams: teams,
        attached: attached,
        loadTeams:loadTeams,
        teamId:teamId,
        addNew: addNew,
        GetClubs: GetClubs,
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
        };

        return vm;

    });