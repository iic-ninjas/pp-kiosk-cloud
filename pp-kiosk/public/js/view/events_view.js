var EventsView = Marionette.CompositeView.extend({
	className: 'events',
	template: '#events-template',
	chidView: EventView,
	childViewContainer: '#events',

	events: {
		'click .create-link': '_createLinkClick'
	},

	_createLinkClick: function() {
		window.app.navigate('events/create', { trigger: true });
	}
});
