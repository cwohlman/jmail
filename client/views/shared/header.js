var formErrors = debugvar = new ReactiveDict();


Template.Header.helpers({
	inputs: function () {
		return [
			{
				placeholder: 'Email',
				type: 'email',
				field: 'email',
			},
			{
				placeholder: 'Password',
				type: 'password',
				field: 'password',
			}
		]
	},
	loggedIn: function () {
		return !!Meteor.userId();
	},
	needsLogin: function () {
		return !Meteor.userId();
	},
	email: function () {
		return Meteor.user() && Meteor.user().emails[0].address;
	}
});

Template.Header.events({
	'submit .form-login': function (e, tmpl) {
		e.preventDefault();
		var email = tmpl.find('input[type="email"]').value;
		var password = tmpl.find('input[type="password"]').value;
		Meteor.loginWithPassword(email, password, function (err) {
			if (err) {
				if (err.reason.match('password')) {
					formErrors.set('password', err.reason);
				} else if (err.reason.match('user') || err.reason.match(/email/i)) {
					formErrors.set('email', err.reason);
				} else {
					formErrors.set('email', ' '); // This will set the error style with no error message
					formErrors.set('password', err.reason); // We only display the reason once.
				}
			}
		});
	},
	'click .btn-register': function (e, tmpl) {
		e.preventDefault() // Would the default action do anything?
		var email = tmpl.find('input[type="email"]').value;
		if (!email.match(/[^@]+@[^@]+/)) {
			formErrors.set('email', 'Please enter a valid email.');
			return;
		}
		var password = tmpl.find('input[type="password"]').value;
		if (!password) {
			formErrors.set('password', 'Please enter a password');
			return;
		}
		Accounts.createUser({
			email: email, 
			password: password
		}, function (err) {
			if (err) {
				if (err.reason.match('password')) {
					formErrors.set('password', err.reason);
				} else if (err.reason.match('user') || err.reason.match(/email/i)) {
					formErrors.set('email', err.reason);
				} else {
					formErrors.set('email', ' '); // This will set the error style with no error message
					formErrors.set('password', err.reason); // We only display the reason once.
				}
			}
		});
	},
	'click .btn-logout': function (e, tmpl) {
		Meteor.logout();
	}
});

Template.formGroup.helpers({
	
	inputHelpText: function () {
		return formErrors.get(this.field);
	},
	inputStyle: function () {
		return formErrors.get(this.field) ? 'has-error' : '';
	}
});

Template.formGroup.events({
	'keydown input': function (e, tmpl) {
		formErrors.set(this.field, '');
	}
});
