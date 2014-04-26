Meteor.publish('contacts', function () {
	return contacts.find({
		owner_id: this.userId
	});
});