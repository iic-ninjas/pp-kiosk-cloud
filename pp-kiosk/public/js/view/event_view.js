var EventView = Marionette.ItemView.extend({
	className: 'event',
	template: '#event-template',
	events: {
		'click .payment-link': '_paymentLinkClick',
		'click .edit-link': '_editLinkClick'
	},

	templateHelpers: function() {
		if (this.model.has('background_image'))
			return { background_image: this.model.get('background_image').url()};
		else
			return { background_image: ''};
	},

	_paymentLinkClick: function() {
		window.app.navigate('/event/' + this.model.id + '/payments', {trigger: true});
	},

	_editLinkClick: function() {
		window.app.navigate('events/' + this.model.id + '/edit', {trigger: true});
	}
});
