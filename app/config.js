define(function () {
    toastr.options.timeOut = 2000;
    toastr.options.positionClass = 'toast-bottom-right';


    var apiUrl = "http://m-afrikik.c4adev.co.vu:2014/api/v1/";

    var imageSettings = {
        imageBasePath: 'http://m-afrikik.c4adev.co.vu:2014/uploads/',
        unknownPlayerImageSource: 'nopic-player.png',
        unknownTeamImageSource: 'nopic-team.png'
    };

    var playerService = apiUrl + 'players';
    var teamService = apiUrl + 'teams';
    var userService = apiUrl + 'users';
    var loginService = apiUrl + 'users/session';

    var composePlayerStatService = function (userid, statId) {
        return apiUrl + 'users/' + userid + '/stats/' + statId;
    };
    var PlayerStatService = function (userid){
        return apiUrl + 'users/' + userid + '/stats/';
    };
    var composeTeamStatService = function (userid, statId) {
        return apiUrl + 'users/' + userid + '/stats/' + statId + '/team';
    };
    var TeamStatService = function (userid) {
        return apiUrl + 'users/' + userid + '/stats/team';
    };

    var composeFeedService= function (userid) {
        return apiUrl + 'users/'+userid+'/feeds/';
    };
    var composeCommunityFeedService = function (userid) {
        return apiUrl + 'users/' + userid + '/community/feeds';
    };
    var composePlayerFeedService = function (userid,playerid) {
        return apiUrl + 'users/' + userid + '/players/'+playerid+'/feeds';
    };
    var composeTeamFeedService = function (userid, teamid) {
        return apiUrl + 'users/' + userid + '/teams/' + teamid + '/feeds';
    };
    var composePlayerFileSevice = function (userid, playerid) {
        return apiUrl + 'admin/photos/users/'+userid+'/players/'+playerid;
    };
    var composeTeamFileSevice = function (userid, teamid) {
        return apiUrl + 'admin/photos/users/' + userid + '/teams/' + teamid;
    };

    var composeTeamPlayersSevice = function (teamid) {
        return teamService + '/' + teamid+'/players';
    };

    var appTitle = 'Afrikik Admin';

    var activate = function () {
        console.log('activate');
    };



    //var startModule = 'login';

    return {
        appTitle: appTitle,
        debugEnabled: ko.observable(true),
        activate: activate,
        imageSettings: imageSettings,
        apiUrl: apiUrl,
        playerService: playerService,
        teamService: teamService,
        userService: userService,
        composePlayerFileSevice: composePlayerFileSevice,
        composeTeamFileSevice: composeTeamFileSevice,
        loginService: loginService,
        composeCommunityFeedService: composeCommunityFeedService,
        composeFeedService: composeFeedService,
        composePlayerFeedService: composePlayerFeedService,
        composeTeamFeedService: composeTeamFeedService,

        composePlayerStatService: composePlayerStatService,
        composeTeamStatService: composeTeamStatService,
        PlayerStatService: PlayerStatService,
        TeamStatService:TeamStatService,

        composeTeamPlayersSevice:composeTeamPlayersSevice
    };

    //#region Sub

    //#endregion


});