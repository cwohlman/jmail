Meteor.publish('contacts', function () {
	return Contacts.find({
		owner_id: this.userId
	});
});