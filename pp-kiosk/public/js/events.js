var EventView = Marionette.ItemView.extend({
	className: 'event',
	template: '#event-template'
});


$( document ).ready(function() {
	Parse.initialize("2tPV0437veVV9ef6egrkdzGxu6qSpthN8fYfY8AK", "Hm9CwIxz0XESJejp4HLFObieMQ9yvVan9nbqFN90");

	var currentUser = Parse.User.current();
	if (currentUser) {

    	// Get all the events for the current user
    	var KioskEvent = Parse.Object.extend("Event");
		var query = new Parse.Query(KioskEvent);
		query.equalTo("user", currentUser);
		query.find({
			success: function(results) {
				var eventCollection = new Parse.Collection(results);

				var collectionView = new Marionette.CollectionView({
					childView: EventView,
					collection: eventCollection,
					el: "#events"
				});

				collectionView.render();
			},
			error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			}
		});

	} else {
    	// show the signup or login page
    	window.location.href = "index.html";
    }
});
