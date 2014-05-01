Meteor.publish('messages', function () {
	return Messages.find({
		from_id: this.userId 
	});
})