var PaymentView = Marionette.ItemView.extend({
	className: 'payment',
	template: '#payment-template',

	templateHelpers: function () {
    return {
    	video: this.model.get('greeting').get('video'),
    	drawing: this.model.get('greeting').get('drawing'),
    	image: this.model.get('greeting').get('image'),
    	note: this.model.get('greeting').get('note'),
    	currency: this.model.get('event').get('currency'),
    	currency_symbol: currency_symbol_function
    };
  }
});
