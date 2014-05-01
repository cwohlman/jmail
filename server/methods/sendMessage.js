Meteor.methods({
	sendMessage: function (newMessage) {
		if (!Meteor.userId()) throw new Meteor.Error(403, "Only logged in users can create messages.");
		if (!newMessage) throw new Meteor.Error(400, "Message details missing.")
		var to_id = newMessage.to_id;
		var to = Contacts.findOne({
			_id: to_id,
			owner_id: Meteor.userId()
		});
		var subject = newMessage.subject;
		var body = newMessage.body;
		if (!to_id) throw new Meteor.Error(400, "All messages must have a recipient");
		if (!to && to_id) throw new Meteor.Error(400, "Contact info for recipient not found");
		if (!subject) throw new Meteor.Error(400, "All messages must have a subject");
		if (!body) throw new Meteor.Error(400, "All messages must have a body");
		var user = Meteor.user();
		var from_email = user.emails[0].address;
		var to_email = to.email;
		// Both of these cases should be imposible
		// we throw a 500 error because this indicates an invalid data state.
		if (!from_email) throw new Meteor.Error(500, 'The user has no email address!');
		if (!to_email) throw new Meteor.Error(500, 'The contact has no email address!');
		Messages.insert({
			from_id: Meteor.userId(),
			to_id: to_id,
			from: from_email,
			to: to_email,
			subject: subject,
			body: body
		});
		Email.send({
			from: from_email,
			to: to_email,
			subject: subject,
			text: body
		})
	}
});