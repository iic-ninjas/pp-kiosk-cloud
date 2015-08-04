var EventView = Marionette.ItemView.extend({
	className: 'event',
	template: '#event-template',
	events: {
		'click .payment-link': '_paymentLinkClick'
	},

	_paymentLinkClick: function() {
		window.app.navigate('payments', {trigger: true});
	}
});
