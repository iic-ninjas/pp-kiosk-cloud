var PaymentsView = Marionette.CompositeView.extend({
	className: 'payments',
	template: '#payments-template',
	chidView: PaymentView,
	childViewContainer: '#payments',

	initialize: function() {
		var sum = 0;
		var min_payment = Number.MAX_VALUE;
		var max_payment = 0;
		var currency = '';
		var exportArray = [];
		exportArray.push("from_name,amount");
		for ( i in this.collection.models ) {
			sum += this.collection.models[i].get('amount');
			min_payment = Math.min(min_payment, this.collection.models[i].get('amount'));
			max_payment = Math.max(max_payment, this.collection.models[i].get('amount'));
			if ( currency == '' ) {
				// this.event = this.collection.models[i].get('event');
				currency = this.collection.models[i].get('event').get('currency');
			}
			var currPayment = [];
			currPayment.push(this.collection.models[i].get('from_name'));
			currPayment.push(this.collection.models[i].get('amount'));
			exportArray.push(currPayment.join(','));
		}
		this.payments_sum = sum;
		this.max_payment = max_payment;
		this.min_payment = min_payment;
		if ( min_payment == Number.MAX_VALUE ){
			this.min_payment = 0;
		}
		this.currency = currency;
		// console.log(exportArray.join("\n"));
		this.csvFile = encodeURI("data:text/csv;charset=utf-8,"+exportArray.join("\n"));
    },

    templateHelpers: function () {
    	return {
    		payments_sum: this.payments_sum / 100,
  			total_payments: this.collection.models.length,
  			min_payment: this.min_payment / 100,
  			max_payment: this.max_payment / 100,
  			currency: this.currency,
  			currency_symbol: currency_symbol_function,
  			eventName: this.model.get('name'),
  			csvFile: this.csvFile,
    	}
    },

    events: {
		'click .back-link': '_backLinkClick'
	},

	_backLinkClick: function() {
		window.history.back();
	}
});
