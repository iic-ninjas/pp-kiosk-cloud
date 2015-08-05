var ImageView = Marionette.ItemView.extend({
	className: 'image',
	template: '#image-template',

	ui: {
		'fileInput': '#input-file',
		'image': '.image-display'
	},

	events: {
		'click @ui.image': '_selectImage',
		'change @ui.fileInput': '_inputFileChange'
	},

	initialize: function(options) {
		this.mergeOptions(options, ["file"]);
	},

	onRender: function() {
		if (this.file) {
			this.ui.image.css('background-image', 'url(' + this.file.url() + ')');
		}
	},

	saveAndGetFile: function() {
		var fileInput = this.ui.fileInput[0];
		if (fileInput.files.length > 0) {
			var file = fileInput.files[0];
			var parseFile = new Parse.File("image.jpg", file);
			return parseFile.save().then(function(){
				return parseFile;
			});
		} else {
			return Parse.Promise.as(this.file);
		}
	},

	_selectImage: function() {
		var fileReader = new FileReader();
		this.ui.fileInput.click();
	},

	_inputFileChange: function() {
		var reader  = new FileReader();
		var file = this.ui.fileInput[0].files[0];
		var ui = this.ui;
		reader.onloadend = function () {
			ui.image.css('background-image', 'url(' + reader.result + ')');
		}

		if (file) {
			reader.readAsDataURL(file);
		} else {
			this.ui.image.css('background-image', 'none');
		}

	}

});
