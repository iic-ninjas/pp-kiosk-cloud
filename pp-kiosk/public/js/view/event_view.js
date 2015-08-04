var EventView = Marionette.ItemView.extend({
	className: 'event',
	template: '#event-template',
	events: {
		'click .payment-link': '_paymentLinkClick',
		'click .edit-link': '_editLinkClick'
	},

	_paymentLinkClick: function() {
		window.app.navigate('/event/' + this.model.id + '/payments', {trigger: true});
	},

	_editLinkClick: function() {
		window.app.navigate('events/' + this.model.id + '/edit', {trigger: true});
	}
});
