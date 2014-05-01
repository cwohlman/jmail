

Template.Contacts.helpers({
	filteredContacts: function () {
		var filter = Session.get('search');
		this.contacts.rewind();
		var result = this.contacts.fetch(); 
		// Is this the correct way to preserve the reactiveness of the cursor?
		// It's a great question and I'm glad you thought it looked weird and
		// asked, check out: http://docs.meteor.com/#rewind
		if (filter) {
			result = _.filter(result, function (item) {
				// TODO: implement sublime text style search?
				var match = false;
				if (item.name.search(filter) != -1) match = true;
				if (item.email.search(filter) != -1) match = true;
				if (_.any(item.tags, function (tag) {
					// TODO: should a tag have to match exactly?
					return tag.search(filter) != -1
				})) match = true;
				return match;
			});
		}
		return result;
	},
	allTags: function () {
		var result = this.contacts.collection.find().fetch();
		return _.chain(result).map(function(a){return a.tags}).flatten().uniq().value();
	}
});

Template.Contacts.events({
	'keydown .search-value': function (e, tmpl) {
		var value = e.target.value;
		Session.set('search', value);
	},
	'click .btn-send': function (e, tmpl) {
		var contact = this;
		var modal = $('.send-modal');
		var sendFunction = function (e) {
			e.preventDefault();
			if (modal.find('form')[0].checkValidity()) {
				var subject = modal.find('.subject-value').val();
				var body = modal.find('.body-value').val();
				Meteor.call('sendMessage', {
					to_id: contact._id,
					subject: subject,
					body: body
				});
				modal.modal('hide');				
			}
		};
		// Remove any handlers
		modal.off('submit', '.send-form');
		// Attach submit handler
		modal.on('submit', '.send-form', sendFunction);

		modal.find('.to-value').text(contact.email);

		modal.modal();
	},
	'click .nav-contacts li': function (e, tmpl) {
		// TODO: edit contacts
	}
});

Template.AddContactForm.events({
	'submit form': function (e, tmpl) {
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
})