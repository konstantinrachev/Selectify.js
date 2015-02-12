/*!
 * Selectify.js v 1.0.0
 * Original author: Konstantin Rachev | @konstantinrachev | konstantin.rachev.web@gmail.com
 * Further changes, comments: @konstantinrachev
 * Licensed under the MIT license
 */

;(function ( $, window, document, undefined ) {

	$.fn.selectify = function (arguments) {

		var settings = arguments;

		return this.each(function () {

			if (!$.data(this, 'Selectify')) {
	    	$.data(this, 'Selectify',

	    	new Selectify($(this), settings));
	    }

	    	return $(this);
		});
	};

	/* DEFAULTS
	* ---------
	* Setting the defaults for using selectify.js
	**/

	$.fn.selectify.defaults = {
		container: null, // The container we are willing to fill with data
		ishidden: false, // Is this container hidden, if yes - then show
		data: {
			content: null, // The content we need, which returns JSON formatted data, you can set either json file or function
			opt: null, // The JSON object param we are setting as value
			val: null // The JSON object param we are setting as option content
		},
		listenOn: null, // The jQuery event we are willing to trigger our selectify.js on
		toRemove: true // Do we want to remove all the set options before appending the new one
	};

	var Selectify = function(current, arguments) {
		this.settings = $.extend({}, $.fn.selectify.defaults, arguments || {});

		/* 
		* We are setting all needed options in order to run selectify.js propertly 
		* As the plugin is choosing between data-* attributes and javascript arguments.
		*/
		this.$el = current;
		this.isHidden = (this.$el.data('ishidden') ? this.$el.data('ishidden') : this.settings.ishidden);
		this.dataHandler = (this.$el.data('data') ? this.$el.data('data') : this.settings.data.content);
		this.dataOpt = (this.$el.data('data-opt') ? this.$el.data('data-opt') : this.settings.data.opt);
		this.dataVal = (this.$el.data('data-val') ? this.$el.data('data-val') : this.settings.data.val);
		this.placeholder = (this.$el.data('placeholder') ? this.$el.data('placeholder') : this.settings.placeholder);
		this.listenOn = (this.$el.data('listenOn') ? this.$el.data('listenOn') : this.settings.listenOn);
		this.toRemove = (this.$el.data('toRemove') ? this.$el.data('toRemove') : this.settings.toRemove);

		// Setting the container
		var container = (this.$el.data('container') ? this.$el.data('container') : this.settings.container);

		// Checking if the given element is a select
			if (!this.$el.is('select')) {
				$.error("The current element is not a select."); 
			}

			// If the given container exists as id or class element else throwing an error
			if ($(container).length) {
				// Set up that container 
				this.$container = $(container); 
			} else {
				// Check if the given container is a name attribute
				if ($('select[name=' + container + ']').length) {
					// Set up that container 
					this.$container = $('select[name=' + container + ']'); 
				} else {
					// Nope, we are done here
					$.error('The given container was not found.');
				}
			}

			// If the given container exists
			if (!this.$container.length) {
				$.error('The given container was not found.'); 
			}

			// One more check if the given container is a select
			if (!this.$container.is('select')) {
				$.error("The given container is no a select."); 
			}

			// Setting $.getJSON params
			var target = this.$container, dataHandler = this.dataHandler, dataVal = this.dataVal, dataOpt = this.dataOpt, placeholder = this.placeholder, ishidden = this.isHidden, toRemove = this.toRemove;

			// If the given dataHandler and options are set else throwing an error
			if (!this.dataHandler || !this.dataOpt || !this.dataVal) { 
				$.error("You must set data url, opt and val attributes."); 
			}

			// Check if we are willing to listen for a specific event
			if (this.listenOn) {

				// Oooh, boy, if this was our dreamed event :)
			  	this.$el.on(this.listenOn, function() {
			  		// Trigger the data loader
			  		new triggerData(target, dataHandler, dataVal, dataOpt, placeholder, ishidden, toRemove);
				});

			} else {
				// Trigger the data loader
				new triggerData(target, dataHandler, dataVal, dataOpt, placeholder, ishidden, toRemove);
			}

	};

	/* 
	* Triggerting the data changer to change effect
	* As the plugin is choosing between data-* attributes and javascript arguments.
	*/
	var triggerData = function(target, dataHandler, dataVal, dataOpt, placeholder, ishidden, toRemove) {

		// Getting our JSON data as expected
		$.getJSON(dataHandler, function(handler) {

			// If we are willing to remove the before set options
			if (toRemove == true) {
				// Going throigh all the options and removing
				$.each(target.find('option'), function(i, v) {
					$(this).remove();
				});
			}

			// Setting the placeholder
			if (placeholder) {
				target.append('<option value="">' + placeholder + '</option>');
			}

			// Adding each record from the given data
			$.each(handler, function(i, v) {
				target.append('<option value="' + handler[i]['' + dataVal + ''] + '">' + handler[i]['' + dataOpt + ''] + '</option>');
			});

		});

		// If the element is hidden, if yes - then show it
		if (ishidden == true) { target.show(); }
	};

})( jQuery, window, document );