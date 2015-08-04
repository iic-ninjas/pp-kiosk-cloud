var EventsView = Marionette.CompositeView.extend({
	className: 'events',
	template: '#events-template',
	chidView: EventView,
	childViewContainer: '#events'
});
