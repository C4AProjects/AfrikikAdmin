define(['config'],function (config) {
    var limit = 13;
    var shortText = function (limit, text) {
        return ((text && text.length > limit) ? text.substring(0, limit) + '...' : text);
    }
    var PlayerModel=function(data) {
        if (!data)
        {
            data = {};
        }

        this.name = ko.observable(data.name);
        this.description = ko.observable(data.description);
        this.country = ko.observable(data.country);
        this.id = ko.observable(data._id);
        this.position = ko.observable(data.position);
        this.height = ko.observable(data.height);
        this.weight = ko.observable(data.weight);
        this.dob = ko.observable(data.dob);
        this.birth_place = ko.observable(data.birth_place);
        //compose full image url
        //this.picture = ko.observable(config.imageSettings.imageBasePath+data.picture);
        this.img_url=ko.observable(data.img_url);
        this.clubcountry = ko.observable(data.clubcountry);
        this.club = ko.observable(data.club);
        this.no = ko.observable(data.no);
        this.rating = ko.observable(data.rating);
        this.isNational=ko.observable(data.isNational);
        this.shortName = ko.computed(function () {
            return shortText(limit,data.name);
        });
        this.shortCountry = ko.computed(function () {
            return shortText(limit,data.country);
        });
        this.shortClub = ko.computed(function () {
            return shortText(limit, data.club);
        });
    }

    var StatModel = function (data) {
        if (!data) {
            data = {};
        }
        this.id = ko.observable(data._id);
        this.season = ko.observable(data.season);
        this.minutes = ko.observable(data.minutes);
        this.sub = ko.observable(data.sub);
        this.redc = ko.observable(data.redc);
        this.yellowc = ko.observable(data.yellowc);
        this.games = ko.observable(data.games);
        this.team = ko.observable(data.team);
        this.player = ko.observable(data._player);
        this.league = ko.observable(data.league);
        this.goals = ko.observable(data.goals);
    }
    
    var NationalTeamModel = function (data) {
        if (!data)
        {
            data = {};
        }

        this.name = ko.observable(data.name);
        this.img_url = ko.observable(data.img_url);
        //this.description = ko.observable(data.description);
        this.association = ko.observable(data.association);
        this.id = ko.observable(data._id);
        //compose full image url
        this.picture = ko.observable(config.imageSettings.imageBasePath+data.picture);
        this.league = ko.observable(data.league);
        this.nationalTeam = ko.observable(data.nationalTeam);
        this.shortName = ko.computed(function () {
            return shortText(limit, data.name);
        });
        
    }
    var ClubModel = function (data) {
        if (!data) {
            data = {};
        }

        this.name = ko.observable(data.name);
        this.img_url = ko.observable(data.img_url);
        this.country = ko.observable(data.country);
        this.location = ko.observable(data.location);
        this.id = ko.observable(data._id);
        //compose full image url
        this.picture = ko.observable(config.imageSettings.imageBasePath + data.picture);        
        this.shortName = ko.computed(function () {
            return shortText(limit, data.name);
        });

    }
    var UserModel = function (data) {
        if (!data)
        {
            data = {};
        }

        this.name = ko.observable(data.name);
        this.email = ko.observable(data.email);
        this.id = ko.observable(data._id);
        //compose full image url
        this.picture = ko.observable(config.imageSettings.imageBasePath+data.picture);
        this.shortEmail = ko.computed(function () {
            return shortText(limit, data.email);
        });
    }


    var FeedModel = function (data){
        this.user = ko.observable(data._user);
        this.message = ko.observable(data.message);
        this.comments = ko.observableArray(data.comments);
        this.published = ko.observable(data.publish_date);
        this.id = ko.observable(data._id);
    };
    var PlayerFeedModel = function (data) {
        this.player = ko.observable(data._player);
        this.message = ko.observable(data.message);
        this.comments = ko.observableArray(data.comments);
        this.published = ko.observable(data.publish_date);
        this.id = ko.observable(data._id);
        this.imgurl = ko.observable(data.image);
    };
    var TeamFeedModel = function (data) {
        this.team = ko.observable(data._team);
        this.message = ko.observable(data.message);
        this.comments = ko.observableArray(data.comments);
        this.published = ko.observable(data.publish_date);
        this.id = ko.observable(data._id);
        this.imgurl = ko.observable(data.image);
    };
    return {
        PlayerModel: PlayerModel,
        ClubModel: ClubModel,
        UserModel: UserModel,
        NationalTeamModel: NationalTeamModel,
        FeedModel: FeedModel,
        PlayerFeedModel: PlayerFeedModel,
        TeamFeedModel: TeamFeedModel,
        StatModel: StatModel
    };

    
});