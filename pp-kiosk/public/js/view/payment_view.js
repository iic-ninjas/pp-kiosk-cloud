var PaymentView = Marionette.ItemView.extend({
	className: 'payment',
	template: '#payment-template',

	templateHelpers: function () {
    return {
    	video: this.model.get('greeting').get('video')._url
    };
  }
});
