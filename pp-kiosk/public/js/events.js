function addEvent(e){
	console.log(e);
	$("#events").append("<div>"+e.get("name")+"</div>")
}

$( document ).ready(function() {
	Parse.initialize("2tPV0437veVV9ef6egrkdzGxu6qSpthN8fYfY8AK", "Hm9CwIxz0XESJejp4HLFObieMQ9yvVan9nbqFN90");

	var currentUser = Parse.User.current();
	if (currentUser) {
    	// do stuff with the user
    	console.log(currentUser);

    	// Get all the events for the current user
    	var KioskEvent = Parse.Object.extend("Event");
		var query = new Parse.Query(KioskEvent);
		query.equalTo("user", currentUser);
		query.find({
			success: function(results) {
			    // Do something with the returned Parse.Object values
			    for (var i = 0; i < results.length; i++) {
			    	var object = results[i];
			    	// alert(object.id + ' - ' + object.get('playerName'));
			    	addEvent(object);
			    }
			},
			error: function(error) {
			    alert("Error: " + error.code + " " + error.message);
			}
		});

	} else {
    	// show the signup or login page
    	window.location.href = "file:///C:/Projects/tlv-hackathon/pp-kiosk-cloud/pp-kiosk/public/index.html";
    }
});

