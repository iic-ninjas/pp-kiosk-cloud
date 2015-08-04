var CreateView = Marionette.ItemView.extend({
	className: 'create',
	template: '#create-template',
	events: {
		'click #create-button': '_createButtonClick'
	},

	ui: {
		eventName: '#event-name'
	},

	_createButtonClick: function() {
		var model = this.model;
		model.set({ name: this.ui.eventName.val() });
		model.save().then(function() {
			window.app.navigate('events/' + model.id + '/edit', { trigger: true });
		});
	}
});
