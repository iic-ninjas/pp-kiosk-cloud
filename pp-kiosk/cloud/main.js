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
  // request.params.payment.suggested_payment - id of suggested payment (can be null)
  // request.params.greeting - Parse.File for video
  //

  var cleanPaymentParams = _.pick(request.params.payment,
                        'from_email', 'from_name', 'from_image',
                        'amount', 'transaction_id', 'greeting',
                        'suggested_payment');

  Event.findByCode(request.params.event_code, false).then(function(event) {
      if (event) {
        return Payment.create(event, request.params.payment, request.params.greeting);
      } else {
        return Parse.Promise.error("event not found");
      }
  }).then(function() {
      response.success("OK");
  }).fail(function(error) {
      response.error(error);
  });
});


Parse.Cloud.beforeSave("Event", function(request, response) {
    var event = request.object;
    if (!event.has('event_code')) {
        eventCode = '' + Math.floor(Math.random() * 10000);
        if (eventCode.length == 1) eventCode = '000' + eventCode;
        if (eventCode.length == 2) eventCode = '00' + eventCode;
        if (eventCode.length == 3) eventCode = '0' + eventCode;
        event.set("event_code", eventCode);
    }
    response.success();
});
