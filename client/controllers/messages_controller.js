MessagesController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe('messages');
  },
  data: function () {
  	return {
  		inbox: Messages.find({
  			to_id: Meteor.userId()
  		}),
  		outbox: Messages.find({
  			from_id: Meteor.userId()
  		})
  	};
  }
});
