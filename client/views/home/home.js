Template.Home.helpers({
	state: function () {
		if (!Meteor.user()) {
			return {
				message: "Please login or register above to use this cool app.",
				style: 'alert alert-danger'
			};
		} else if (!App.isUserVerified()) {
			return {
				message: "Please verify your email address to use this cool app.",
				style: 'alert alert-warning'
			}
		} else {
			return {
				message: "Take a look at your contacts or messages to get started!",
				style: 'alert alert-success'
			};
		}
	}
});

Template.Home.events({

});
