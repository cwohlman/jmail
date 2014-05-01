ContactsController = RouteController.extend({
  waitOn: function () {
  	return this.subscribe('contacts');
  },
  data: function () {
  	return {
  		contacts: Contacts.find()
  	};
  }
});
