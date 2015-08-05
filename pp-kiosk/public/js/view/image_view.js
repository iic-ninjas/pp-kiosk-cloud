var ImageView = Marionette.ItemView.extend({
	className: 'image',
	template: '#image-template',

	ui: {
		'fileInput': '#input-file',
		'image': '#image'
	},

	initialize: function(options) {
		this.mergeOptions(options, ["file"]);
	},

	onRender: function() {
		this.ui.image.css('background-image', 'url(' + this.file.url() + ')');
		this.ui.image.css('width',  100);
		this.ui.image.css('height', 100);
		this.ui.image.css('display', 'inline-block');
		this.ui.image.css('background-size', 'cover');
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
	}

});
