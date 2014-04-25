Template.Header.helpers({
	loggedIn: function () {
		return !!Meteor.userId();
	},
	needsLogin: function () {
		return !Meteor.userId();
	},
	userName: function () {
		return Meteor.user() && Meteor.user().username;
	}
});

Template.Header.events({
	'submit form': function (e, tmpl) {
		e.preventDefault();
		var userName = tmpl.find('input[type="username"]').value;
		var password = tmpl.find('input[type="password"]').value;
		Meteor.loginWithPassword(userName, password);
	},
	'click .btn-register': function (e, tmpl) {
		e.preventDefault() // Would the default action do anything?
		// We don't use email address because this is an 'email' service
		// and a demo app
		var userName = tmpl.find('input[type="username"]').value;
		var password = tmpl.find('input[type="password"]').value;
		Accounts.createUser({
			username: userName, 
			password: password
		});
	}
});
