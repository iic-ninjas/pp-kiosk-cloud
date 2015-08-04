var EditView = Marionette.ItemView.extend({
	className: 'edit',
	template: '#edit-template',
	events: {
		"click @ui.doneButton": '_doneClick'
	},

	ui: {
		eventName: "#event-name",
		reciepientEmail: "#recipient-email",
		currency: "#curerncy",
		thankYouNote: "#thank-you-note",
		customAmount: "#custom-amount",
		gtVideo: "#greeting-type-video",
		gtImage: "#greeting-type-image",
		gtNote: "#greeting-type-note",

		doneButton: "#done-button",
	},

	onRender: function() {
		this.ui.eventName.val(this.model.get('name'));
		this.ui.reciepientEmail.val(this.model.get('recipient_email'));
		this.ui.currency.val(this.model.get('currency'));
		this.ui.thankYouNote.val(this.model.get('thank_you_note'));

		this.ui.customAmount.attr('checked', this.model.get('custom_amount'));
		if (this.model.has('greeting_types')) {
			this.ui.gtVideo.attr('checked', this.model.get('greeting_types').indexOf("video") >= 0);
			this.ui.gtImage.attr('checked', this.model.get('greeting_types').indexOf("image") >= 0);
			this.ui.gtNote.attr('checked',  this.model.get('greeting_types').indexOf("note")  >= 0);
		}
	},

	_doneClick: function() {
		this.model.save().then(function() {
			window.app.navigate('events', { trigger: true });
		});
	}

});
