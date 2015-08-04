var KioskRouter = Backbone.Router.extend({
	routes: {
		"payments": "payments",
		"*actions": "defaultRoute"
	},

	payments: function() {
		window.appLayout.app.show(new PaymentsView());
	},

	defaultRoute: function() {
		var currentUser = Parse.User.current();
		if (currentUser) {

	    	// Get all the events for the current user
	    	var KioskEvent = Parse.Object.extend("Event");
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
	    	window.location.href = "public/index.html";
	    }
	}
});
