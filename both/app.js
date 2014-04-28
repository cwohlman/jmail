App = {};

App.isUserVerified = function () {
	return _.some(Meteor.user().emails, function(a){return a.verified;});
};