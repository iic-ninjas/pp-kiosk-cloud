var _ = require('underscore');
var Greeting = Parse.Object.extend("Greeting");

var Payment = Parse.Object.extend("Payment", {

}, {
	create: function(event, paymentData) {
		var payment = new Payment(_.omit(paymentData, 'greeting'));
		var greeting = new Greeting(paymentData.greeting);

		return greeting.save().then(function(){
			payment.set('greeting', greeting);
			payment.set('event', event);

			return payment.save();
		});


	}
});

module.exports = Payment;
