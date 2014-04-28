Template.Header.helpers({
	loggedIn: function () {
		return !!Meteor.userId();
	},
	needsLogin: function () {
		return !Meteor.userId();
	},
	userName: function () {
		return Meteor.user() && Meteor.user().emails[0].address;
	}
});

Template.Header.events({
	'submit form-login': function (e, tmpl) {
		e.preventDefault();
		var userName = tmpl.find('input[type="email"]').value;
		var password = tmpl.find('input[type="password"]').value;
		Meteor.loginWithPassword(userName, password);
	},
	'click .btn-register': function (e, tmpl) {
		e.preventDefault() // Would the default action do anything?
		// We don't use email address because this is an 'email' service
		// and a demo app
		var userName = tmpl.find('input[type="email"]').value;
		var password = tmpl.find('input[type="password"]').value;
		Accounts.createUser({
			email: userName, 
			password: password
		});
	},
	'click .btn-logout': function (e, tmpl) {
		Meteor.logout();
	}
});
