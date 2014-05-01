Meteor.methods({
	addContact: function (newContact) {
		if (!Meteor.userId()) throw new Meteor.error(403, "Only logged in users can create contacts.");
		if (!newContact) throw new Meteor.error(400, "Contact details missing.")
		var name = newContact.name;
		var email = newContact.email;
		var tags = newContact.tags;
		if (!name) throw new Meteor.error(400, "All contacts must have a name");
		if (!email) throw new Meteor.error(400, "All contacts must have an email");
		// TODO: Better regex? It might be better to send a confirmation email.
		if (!/[^@]+@[^@]+/.test(email)) throw new Meteor.error(400, "Contact email must match xx@xx");
		// Better to use duck typing ie !tags.concat ?
		if (tags && !(tags instanceof Array)) throw new Meteor.error(400, "The tags property must be an array.");
		tags = tags || []; // we want to store an empty array if no tags specified.
		Contacts.insert({
			owner_id: Meteor.userId(),
			name: name,
			email: email,
			tags: tags
		});
	}
});