MessagesController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe('messages');
  },
  data: function () {
  	return {
  		inbox: messages.find({
  			to_id: Meteor.userId()
  		}),
  		outbox: messages.find({
  			from_id: Meteor.userId()
  		})
  	};
  }
});
