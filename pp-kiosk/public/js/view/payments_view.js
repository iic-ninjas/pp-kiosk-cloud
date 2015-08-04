var PaymentsView = Marionette.CompositeView.extend({
	className: 'payments',
	template: '#payments-template',
	chidView: PaymentView,
	childViewContainer: '#payments'
});
