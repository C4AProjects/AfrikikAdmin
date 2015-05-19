define(['durandal/system', 'services/afrikikDatacontext', 'durandal/app', 'viewmodels/shell', 'plugins/router'],
    function (system,datacontext,app,shell,router) {

         
        //var name = ko.observable("Kossi Selom Banybah");

       var email = ko.observable('');
       var password = ko.observable();
        var name = ko.observable();

        var cancel = function () {

        };

        var callLogin = function () {
            app.trigger('busy', true);
            datacontext.Login(email, password, onOk, onFail);

        };
        
        var onOk = function (result) {
            app.trigger('busy', false);
            if (result.success === true) {
                email('');
                password('');
                name('');
                app.setRoot('viewmodels/shell');
                shell.isLoggedIn(true);
                shell.username(result.user.email);
                shell.userid(result.user._id);
                shell.userFullName(result.user.name);
                app.trigger('onLogin', true);
                app.trigger('busy', false);
            } else {
                console.log("error");
            }
        };
        var onFail = function (data) {
            console.log('wrong credentials');
        };
        var ok = function () {
            //app.setRoot('viewmodels/shell');
            //shell.isLoggedIn(true);
            //app.trigger('onLogin', true);
            //app.trigger('busy', false);
            //router.navigate('home');
            
            callLogin();
            //return true;
        };

        var onRegister = function (data) {
            alert(data);
        };

        var onRegisterFail = function (data) {
            alert(data);
        };

        var register = function () {
            app.trigger('busy', true);
            datacontext.RegisterUser(name, email, password, onRegister, onRegisterFail);
        };

        var vm = {
            email: email,
            password: password,
            cancel: cancel,
            ok: ok,
            title: 'Login',
            register: register
        };

        return vm;
    });
