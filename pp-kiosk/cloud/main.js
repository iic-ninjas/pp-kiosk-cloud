var Event = require('cloud/event.js');

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
  response.success("Hello world!");
});
