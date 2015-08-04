var EventImage = Parse.Object.extend("EventImage");
var SuggestedPayment = Parse.Object.extend("SuggestedPayment");

var Event = Parse.Object.extend("Event", {

}, {
	findByCode: function(eventCode, fetchRelations) {
		var eventQ = new Parse.Query(Event);
		eventQ.equalTo("event_code", eventCode);
		return eventQ.first().then(function(event) {
			if (fetchRelations && event) {
				var suggestedPaymentQ = new Parse.Query(SuggestedPayment);
				suggestedPaymentQ.equalTo('event', event);
				var suggestedPaymentPromise = suggestedPaymentQ.find().then(function(suggestedPayments){
					event.attributes.suggestedPayments = suggestedPayments;
				});

				var eventImageQ = new Parse.Query(EventImage);
				eventImageQ.equalTo('event', event);
				var eventImagePromise = eventImageQ.find().then(function(eventImages){
					event.attributes.eventImages = eventImages;
				});

				return Parse.Promise.when(suggestedPaymentPromise, eventImagePromise).then(function(){
					return event;
				});
			} else {
				return event;
			}
		});
	}
});

module.exports = Event;
