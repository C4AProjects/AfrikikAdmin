define(['durandal/system', 'plugins/router', 'services/logger','durandal/app'],
    function (system, router, logger,app) {
       

        var isLoggedIn = ko.observable(false);
        var userid = ko.observable();
        var username = ko.observable();
        var userFullName = ko.observable();
        var registerEvents = function () {

            app.on('onLogin').then(function (success) {
                if (success === true) {
                    isLoggedIn(true);
                    boot();
                    //router.navigate('home');
                }
            });

            app.on('busy').then(function (isBusy) {
                if (isBusy === true) {
                    box1 = new ajaxLoader($(".box-1"));
                } else {
                    if (box1) box1.remove();
                }

            });

        };

        var logout = function () {
            app.setRoot('viewmodels/login');
        };
        

        //#region Internal Methods
        function activate() {           
            
            return boot();
        }

       

        function boot() {
            registerEvents();
            log('Afrikik Admin Loaded!', null, true);

            router.on('router:route:not-found', function (fragment) {
                logError('No Route Found', fragment, true);
            });

            var routes = [
                { route: 'login', moduleId: 'login', title: 'Login' },
                 { route: 'feeds', moduleId: 'feeds', title: 'Feeds' },
                  { route: 'feed/:id', moduleId: 'feed', title: 'Feed' },
                { route: '', moduleId: 'home', title: 'Home', nav: true},                
                { route: 'players', moduleId: 'players', title: 'Players', nav: true },
            { route: 'teams', moduleId: 'teams', title: 'Teams', nav: true },
            { route: 'users', moduleId: 'users', title: 'Users', nav: true },
            { route: 'clubs', moduleId: 'clubs', title: 'Clubs', nav: true },
            { route: 'scores', moduleId: 'scores', title: 'Scores', nav: true },
            
            { route: 'team/:id', moduleId: 'team', title: 'Team' },
            { route: 'club/:id', moduleId: 'club', title: 'Club' },
            { route: 'player/:id', moduleId: 'player', title: 'Player' },
            { route: 'teamPlayer/:country', moduleId: 'teamPlayer', title: 'TeamPlayer' }];

            router.makeRelative({ moduleId: 'viewmodels' }) // router will look here for viewmodels by convention
                .map(routes)            // Map the routes
                .buildNavigationModel() // Finds all nav routes and readies them
                .activate();        // Activate the router

            return true;
            
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }

        function logError(msg, data, showToast) {
            logger.logError(msg, data, system.getModuleId(shell), showToast);
        }
        //#endregion

        var shell = {
            activate: activate,
            router: router,
            isLoggedIn: isLoggedIn,
            logout: logout,
            userid: userid,
            username: username,
            userFullName: userFullName
        };

        return shell;
    });