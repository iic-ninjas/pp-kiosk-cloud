var KioskEvent = Parse.Object.extend("Event");

var KioskRouter = Backbone.Router.extend({
	routes: {
		"payments": "payments",
		"events": "events",
		"events/create": "createEvent",
		"events/:event_id/edit": "editEvent",
		"*actions": "defaultRoute"
	},

	defaultRoute: function() {
		window.app.navigate('events', { trigger: true });
	},

	payments: function() {
		window.appLayout.app.show(new PaymentsView());
	},

	events: function() {
		var currentUser = Parse.User.current();
		if (currentUser) {

	    	// Get all the events for the current user
			var query = new Parse.Query(KioskEvent);
			query.equalTo("user", currentUser);
			query.find({
				success: function(results) {
					var eventCollection = new Parse.Collection(results);

					var eventsView = new EventsView({
						childView: EventView,
						collection: eventCollection,
					});

					window.appLayout.app.show(eventsView);
				},
				error: function(error) {
				    alert("Error: " + error.code + " " + error.message);
				}
			});

		} else {
	    	// show the signup or login page
	    	window.location.href = "index.html";
	    }
	},

	createEvent: function() {
		var newEvent = new KioskEvent();
		newEvent.set({user: Parse.User.current()});
		window.appLayout.app.show(new CreateView({model: newEvent}));
	},

	editEvent: function(eventId) {
		var query = new Parse.Query(KioskEvent);
		query.get(eventId).then(function(eventToEdit) {
			console.log(eventToEdit);
			window.appLayout.app.show(new EditView({model: eventToEdit}));
		});
	}
});
