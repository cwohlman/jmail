Meteor.publish('messages', function () {
	return messages.find({
		$or: [
			{ from_id: this.userId },
			{ to_id: this.userId }
		]
	});
})