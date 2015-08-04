var KioskRouter = Backbone.Router.extend({
	routes: {
		"event/:eventid/payments": "payments",
		"*actions": "defaultRoute"
	},

	payments: function(eventid) {
		var Event = Parse.Object.extend("Event");
		var myevent = new Event();
		myevent.id = eventid;
		var query = new Parse.Query("Payment");
		query.include("event");
		query.include("greeting");
		query.equalTo("event", myevent);
		query.find({
			success: function(results) {
				var paymentCollection = new Parse.Collection(results);

				console.log(results);

				var paymentsView = new PaymentsView({
					childView: PaymentView,
					collection: paymentCollection,
				});
				window.appLayout.app.show(paymentsView);
			},
			error: function(error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
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
