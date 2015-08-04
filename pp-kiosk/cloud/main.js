var _ = require('underscore');
var Event = require('cloud/event.js');
var Payment = require('cloud/payment.js');

Parse.Cloud.define("getEvent", function(request, response) {
  // input: request.params.event_code
  // returns an event + all of the event's images + all of the suggested payments
  Event.findByCode(request.params.event_code, true).then(function(event){
      response.success(event);
  }).fail(function(error){
      response.error(error);
  });
});

Parse.Cloud.define("doPayment", function(request, response) {
  // input:
  // request.params.event_code
  // request.params.payment.from_email
  // request.params.payment.from_name
  // request.params.payment.from_image - url of image
  // request.params.payment.amount
  // request.params.payment.transaction_id
  // request.params.payment.greeting - see below
  // request.params.payment.suggested_payment - id of suggested payment (can be null)
  //
  // greeting is
  // greeting.drawing - Parse.File
  // greeting.image - Parse.File
  // greeting.video - Parse.File
  // greeting.note
  // each one can be null

  var cleanPaymentParams = _.pick(request.params.payment,
                        'from_email', 'from_name', 'from_image',
                        'amount', 'transaction_id', 'greeting',
                        'suggested_payment');

  Event.findByCode(request.params.event_code, false).then(function(event) {
      if (event) {
        return Payment.create(event, request.params.payment);
      } else {
        return Parse.Promise.error("event not found");
      }
  }).then(function() {
      response.success("OK");
  }).fail(function(error) {
      response.error(error);
  });
});
