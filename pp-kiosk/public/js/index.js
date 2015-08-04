function processLoginForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */
    console.log("loginng in");
    console.log($("#login-username").val());
    console.log($("#login-password").val());

    Parse.User.logIn($("#login-username").val(), $("#login-password").val(), {
  		success: function(user) {
    		// Do stuff after successful login.
    		console.log("success");
    		console.log(user);
    		window.location.href = "events.html";
  		},
  		error: function(user, error) {
    		// The login failed. Check error to see why.
    		console.log("login failed");
    		console.log(error);
  		}
	});

    // You must return false to prevent the default form behavior
    return false;
}

$( document ).ready(function() {
	Parse.initialize("2tPV0437veVV9ef6egrkdzGxu6qSpthN8fYfY8AK", "Hm9CwIxz0XESJejp4HLFObieMQ9yvVan9nbqFN90");

	var form = document.getElementById('login-form');
	if (form.attachEvent) {
    	form.attachEvent("submit", processLoginForm);
	} else {
    	form.addEventListener("submit", processLoginForm);
	}

	var currentUser = Parse.User.current();
	if (currentUser) {
    	// do stuff with the user
    	console.log(currentUser);
    	window.location.href = "events.html";
	} else {
    	// show the signup or login page
    	console.log("need to login");
    }
});
