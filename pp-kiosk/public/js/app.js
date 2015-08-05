

var AppLayoutView = Marionette.LayoutView.extend({
	el: 'body',
	template: false,
	regions: {
		app: '#app-region'
	}
});

$( document ).ready(function() {
	Parse.initialize("2tPV0437veVV9ef6egrkdzGxu6qSpthN8fYfY8AK", "Hm9CwIxz0XESJejp4HLFObieMQ9yvVan9nbqFN90");

	$(".logout-link").click(function() {
  		Parse.User.logOut();
		var currentUser = Parse.User.current();  // this will now be null
		// $("#logout-wrapper").hide();
		window.location.href = "index.html";
	});

	var currentUser = Parse.User.current();
	if (currentUser) {
  		// user is logged in
  		$("#logout-wrapper").show();
	} else {
    	// show the signup or login page
    }

	window.appLayout = new AppLayoutView();
	window.appLayout.render();

	window.app = new KioskRouter();
	Backbone.history.start();

});
