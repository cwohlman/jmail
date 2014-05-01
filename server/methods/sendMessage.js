Meteor.methods({
	sendMessage: function (newMessage) {
		if (!Meteor.userId()) throw new Meteor.Error(403, "Only logged in users can create messages.");
		if (!newMessage) throw new Meteor.Error(400, "Message details missing.")
		var to = newMessage.to;
		var subject = newMessage.subject;
		var body = newMessage.body;
		if (!to) throw new Meteor.Error(400, "All messages must have a recipient");
		if (!subject) throw new Meteor.Error(400, "All messages must have a subject");
		if (!body) throw new Meteor.Error(400, "All messages must have a body");
		var user = Meteor.user();
		var from = user.emails[0].address;
		Messages.insert({
			from_id: Meteor.userId(),
			from: from,
			to: to,
			subject: subject,
			body: body
		});
		Email.send({
			from: from,
			to: to,
			subject: subject,
			text: body
		})
	}
});