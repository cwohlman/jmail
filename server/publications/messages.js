Meteor.publish('messages', function () {
	return messages.find({
		from_id: this.userId 
	});
})