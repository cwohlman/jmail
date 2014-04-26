Meteor.methods({
	sendMessage: function (newMessage) {
		if (!Meteor.userId()) throw new Meteor.error("Only logged in users can create messages.");
		if (!newMessage) throw new Meteor.error("Message details missing.")
		var to = newMessage.to;
		var subject = newMessage.subject;
		var body = newMessage.body;
		if (!to) throw new Meteor.error("All messages must have a recipient");
		if (!subject) throw new Meteor.error("All messages must have a subject");
		if (!body) throw new Meteor.error("All messages must have a body");
		// TODO: Actually send the email!
		messages.insert({
			from_id: Meteor.userId(),
			from: Meteor.user().email,
			to: to,
			subject: subject,
			body: body
		});
	}
});