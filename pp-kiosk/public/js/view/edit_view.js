var EditView = Marionette.ItemView.extend({
	className: 'edit',
	template: '#edit-template',
	events: {
		"click @ui.doneButton": '_doneClick'
	},

	ui: {
		eventName: "#event-name",
		recipientEmail: "#recipient-email",
		currency: "#currency",
		thankYouNote: "#thank-you-note",
		backgroundImage: "#background-image",
		customAmount: "#custom-amount",
		gtVideo: "#greeting-type-video",
		gtImage: "#greeting-type-image",
		gtNote: "#greeting-type-note",

		doneButton: "#done-button",

		sp1Name:   "#sp1-name",
		sp1Amount: "#sp1-amount",
		sp1Image:  "#sp1-image",

		sp2Name:   "#sp2-name",
		sp2Amount: "#sp2-amount",
		sp2Image:  "#sp2-image",

		sp3Name:   "#sp3-name",
		sp3Amount: "#sp3-amount",
		sp3Image:  "#sp3-image",
	},


	onRender: function() {
		this.ui.eventName.val(this.model.get('name'));
		this.ui.recipientEmail.val(this.model.get('recipient_email'));
		this.ui.currency.val(this.model.get('currency'));
		this.ui.thankYouNote.val(this.model.get('thank_you_note'));

		this.ui.customAmount.attr('checked', this.model.get('custom_amounts'));
		if (this.model.has('greeting_types')) {
			this.ui.gtVideo.attr('checked', this.model.get('greeting_types').indexOf("video") >= 0);
			this.ui.gtImage.attr('checked', this.model.get('greeting_types').indexOf("image") >= 0);
			this.ui.gtNote.attr('checked',  this.model.get('greeting_types').indexOf("note")  >= 0);
		}

		var suggestedPayments = this.model.attributes.suggestedPayments;

		// complete the list to 3
		switch(suggestedPayments.length) {
			case 1:
				var sp = new SuggestedPayment();
				sp.set("event", this.model);
				suggestedPayments.add(sp);
			case 2:
				var sp = new SuggestedPayment();
				sp.set("event", this.model);
				suggestedPayments.add(sp);
			case 3: break;
		}

		this.ui.sp1Name.val(suggestedPayments.at(0).get('name'));
		if (suggestedPayments.at(0).has('amount'))
			this.ui.sp1Amount.val(suggestedPayments.at(0).get('amount') / 100);

		this.ui.sp2Name.val(suggestedPayments.at(1).get('name'));
		if (suggestedPayments.at(1).has('amount'))
			this.ui.sp2Amount.val(suggestedPayments.at(1).get('amount') / 100);

		this.ui.sp3Name.val(suggestedPayments.at(2).get('name'));
		if (suggestedPayments.at(2).has('amount'))
			this.ui.sp3Amount.val(suggestedPayments.at(2).get('amount') / 100);
	},

	_saveImage: function(fileInput) {
		if (fileInput.files.length > 0) {
			var file = fileInput.files[0];
			var parseFile = new Parse.File("image.jpg", file);
			return parseFile.save().then(function(){
				return parseFile;
			});
		} else {
			return Parse.Promise.as(null);
		}
	},

	_doneClick: function() {
		var model = this.model;
		var ui = this.ui;
		var that = this;
		this._saveImage(ui.backgroundImage[0]).then(function(parseFile) {
			if (parseFile) {
				model.set('background_image', parseFile);
			}
		}).then(function(){
			return Parse.Promise.when(
				that._saveImage(ui.sp1Image[0]),
				that._saveImage(ui.sp2Image[0]),
				that._saveImage(ui.sp3Image[0])
			).then(function(sp1File, sp2File, sp3File) {
				model.attributes.suggestedPayments.at(0).set("name", ui.sp1Name.val());
				model.attributes.suggestedPayments.at(0).set("amount", parseInt(ui.sp1Amount.val()) * 100);
				if (sp1File != null) {
					model.attributes.suggestedPayments.at(0).set("image", sp1File);
				}

				model.attributes.suggestedPayments.at(1).set("name", ui.sp2Name.val());
				model.attributes.suggestedPayments.at(1).set("amount", parseInt(ui.sp2Amount.val()) * 100);
				if (sp2File != null) {
					model.attributes.suggestedPayments.at(0).set("image", sp2File);
				}

				model.attributes.suggestedPayments.at(2).set("name", ui.sp3Name.val());
				model.attributes.suggestedPayments.at(2).set("amount", parseInt(ui.sp3Amount.val()) * 100);
				if (sp3File != null) {
					model.attributes.suggestedPayments.at(0).set("image", sp3File);
				}

				return Parse.Promise.when(
					model.attributes.suggestedPayments.at(0).save(),
					model.attributes.suggestedPayments.at(1).save(),
					model.attributes.suggestedPayments.at(2).save()
				);
			});
		}).then(function() {
			model.set("name", ui.eventName.val());
			model.set("currency", ui.currency.val());
			model.set("recipient_email", ui.recipientEmail.val());
			model.set("thank_you_note", ui.thankYouNote.val());
			model.set("custom_amounts", ui.customAmount[0].checked);

			var greetingTypes = [];
			if (ui.gtVideo[0].checked) { greetingTypes.push("video"); }
			if (ui.gtImage[0].checked) { greetingTypes.push("image"); }
			if (ui.gtNote[0].checked)  { greetingTypes.push("note"); }
			model.set("greeting_types", greetingTypes);

			return model.save().then(function() {
				window.app.navigate('events', { trigger: true });
			});
		});
	}
});
