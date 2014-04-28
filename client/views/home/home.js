Template.Home.helpers({
	state: function () {
		var notification = Session.get('notification');
		if (notification && new Date(new Date().valueOf() - 1000 * 60 * 2) < notification.time) {
			return {
				message: notification.message,
				style: 'alert alert-' + notification.status
			};
		} else if (!Meteor.user()) {
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
