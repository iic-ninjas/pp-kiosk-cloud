function processLoginForm(e) {
    if (e.preventDefault) e.preventDefault();

    Parse.User.logIn($("#login-username").val(), $("#login-password").val(), {
  		success: function(user) {
    		// Do stuff after successful login.
    		window.location.href = "app.html";
  		},
  		error: function(user, error) {
    		// The login failed. Check error to see why.
            // alert("Error: " + error.code + " " + error.message);
            $(".form-group").addClass("has-error");
            alert("Error: " + error.code + " " + error.message);
  		}
	});

    // You must return false to prevent the default form behavior
    return false;
}

$( document ).ready(function() {
	Parse.initialize("2tPV0437veVV9ef6egrkdzGxu6qSpthN8fYfY8AK", "Hm9CwIxz0XESJejp4HLFObieMQ9yvVan9nbqFN90");

    $("#create-account").click(function() {
        var user = new Parse.User();
        user.set("username", $("#login-username").val());
        user.set("password", $("#login-password").val());
        user.set("email", $("#login-username").val());

        user.signUp(null, {
          success: function(user) {
            // Hooray! Let them use the app now.
            window.location.href = "app.html";
          },
          error: function(user, error) {
            // Show the error message somewhere and let the user try again.
            alert("Error: " + error.code + " " + error.message);
          }
        });
    });

	var form = document.getElementById('login-form');
	if (form.attachEvent) {
    	form.attachEvent("submit", processLoginForm);
	} else {
    	form.addEventListener("submit", processLoginForm);
	}

	var currentUser = Parse.User.current();
	if (currentUser) {
    	// do stuff with the user
    	window.location.href = "app.html";
	} else {
    	// show the signup or login page
    }
});
