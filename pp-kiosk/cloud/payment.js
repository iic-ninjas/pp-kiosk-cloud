var _ = require('underscore');
var Greeting = Parse.Object.extend("Greeting");

var Payment = Parse.Object.extend("Payment", {

}, {
	create: function(event, paymentData, greetingVideo) {
		var payment = new Payment(_.omit(paymentData, 'greeting'));
		var greeting = new Greeting();
		greeting.set('video', greetingVideo); 

		return greeting.save().then(function(){
			payment.set('greeting', greeting);
			payment.set('event', event);

			return payment.save();
		});


	}
});

module.exports = Payment;
