ComposeController = RouteController.extend({
	data: function () {
		return {
			to: '',
			subject: '',
			body: '',
			attachements: []
		};
	}
})