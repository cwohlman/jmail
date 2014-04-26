Template.Contacts.helpers({
	filteredContacts: function () {
		return this.contacts;
	}
});

Template.Contacts.events({
	'submit .newuser-form': function (e, tmpl) {
		e.preventDefault();
		var name = tmpl.find('.name-value').value;
		var email = tmpl.find('.email-value').value;
		var tags = tmpl.find('.tags-value').value;
		// TODO: which is prefered lowercase or camel case?
		tags = _.map((tags || '').split(','), function (tag) {return tag.trim().toLowerCase();});
		Meteor.call('addContact', {
			name: name,
			email: email,
			tags: tags
		})
	}
});