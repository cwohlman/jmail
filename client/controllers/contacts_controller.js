ContactsController = RouteController.extend({
  waitOn: function () {
  	Meteor.subscribe('contacts');
  },
  data: function () {
  	return {
  		contacts: contacts.find()
  	};
  }
});
