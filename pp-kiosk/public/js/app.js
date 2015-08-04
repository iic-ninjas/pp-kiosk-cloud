

var AppLayoutView = Marionette.LayoutView.extend({
	el: 'body',
	template: false,
	regions: {
		app: '#app-region'
	}
});

$( document ).ready(function() {
	Parse.initialize("2tPV0437veVV9ef6egrkdzGxu6qSpthN8fYfY8AK", "Hm9CwIxz0XESJejp4HLFObieMQ9yvVan9nbqFN90");

	window.appLayout = new AppLayoutView();
	window.appLayout.render();

	window.app = new KioskRouter();
	Backbone.history.start();

});
