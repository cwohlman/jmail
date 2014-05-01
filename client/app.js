App.subs = {
  userData: Meteor.subscribe('current_user_data')
};

App.sendNotification = function (status, message) {
  Session.set('notification', {
    user_id: Meteor.userId(),
    status: status, // TODO:
    time: new Date(),
    read: false,
    message: message
  });
};
// App admin code like Meteor.startup or 
// Deps.autorun will stay in this file
Deps.autorun(function() {
  
});

App.login = function (email, password, cb) {

  onLogin = function (err) {
    cb && cb(err);
  };

  Meteor.loginWithPassword(email, password, onLogin);
};


App.logout = function (cb) {
  var onLogout = function (err) {
    if (cb){
      cb(err);
    }else{
      Router.go('home');
    }
  };

  Meteor.logout(onLogout);
};

//Global Helpers are also in here!
Helpers = {};


_.each(Helpers, function (helper, key) {
  Handlebars.registerHelper(key, helper)
});

// I copied this method from the accounts-ui package (or one of it's dependancies)
// I've modified it to use my notification system
Meteor.startup(function () {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(error) {
      Accounts._enableAutoLogin();
      if (!error) App.sendNotification('success', 'Thank You for verifying your Email! You may now add contacts and send messages.');
      else App.sendNotification('error', 'Could not verify email!');
    });
  }
});