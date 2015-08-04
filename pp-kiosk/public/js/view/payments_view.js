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
		for ( i in this.collection.models ) {
			sum += this.collection.models[i].get('amount');
			min_payment = Math.min(min_payment, this.collection.models[i].get('amount'));
			max_payment = Math.max(max_payment, this.collection.models[i].get('amount'));
			if ( currency == '' ) {
				currency = this.collection.models[i].get('event').get('currency');
			}
		}
		this.payments_sum = sum;
		this.max_payment = max_payment;
		this.min_payment = min_payment;
		if ( min_payment == Number.MAX_VALUE ){
			this.min_payment = 0;	
		}
		this.currency = currency;
    },

    templateHelpers: function () {
    	return {
    		payments_sum: this.payments_sum,
  			total_payments: this.collection.models.length,
  			min_payment: this.min_payment,
  			max_payment: this.max_payment,
  			currency: this.currency,
  			currency_symbol: currency_symbol_function
    	}
    },

    events: {
		'click .back-link': '_backLinkClick'
	},

	_backLinkClick: function() {
		window.history.back();
	}
});
