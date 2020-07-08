/**
 * this is only for sharing via a window popup
 * 
 * @returns
 */
function Social(options) {
	// for private methods
	var obj = this;
	
	// fixed settings - stuff that shouldn't change once you set them.
	var settings = jQuery.extend({}, options || {});
	
	function getValue(arg) {
		if (typeof arg === 'undefined' || arg == null) {
			return '';
		} else if (arg instanceof jQuery) {
			if (arg.is('a')) {
				return encodeURIComponent(arg.attr('href'));
			} else {
				return encodeURIComponent(arg.data('social-data'));
			}
		} else {
			return encodeURIComponent(arg);
		}
	}
	
	this.tumblrPhotoShare = function(url, caption, image_url, param) {
		if (typeof param === 'undefined') {
			param = 'width=640,height=480,left=0,top=0,location=no,status=yes,scrollbars=yes,resizable=yes';
		}
		
		url = getValue(url);
		image_url = getValue(image_url);
		caption = getValue(caption);
		var win = window.open('http://www.tumblr.com/share/photo?clickthru=' + url + '&caption=' + caption + '&source=' + image_url, 'tumblr', param);
		win.focus();
	}

	this.pinterestPhotoShare = function(url, description, image_url, param) {
		if (typeof param === 'undefined') {
			param = 'width=640,height=480,left=0,top=0,location=no,status=yes,scrollbars=yes,resizable=yes';
		}
		
		url = getValue(url);
		image_url = getValue(image_url);
		description = getValue(description);
		var win = window.open('https://pinterest.com/pin/create/button/?url=' + url + '&description=' + description + '&media=' + image_url, 'pinterest', param);
		win.focus();
	}

	this.tweet = function(url, tweet, param) {
		if (typeof param === 'undefined') {
			param = 'width=640,height=480,left=0,top=0,location=no,status=yes,scrollbars=yes,resizable=yes';
		}
		
		url = getValue(url);
		tweet = getValue(tweet);
		var win = window.open('https://twitter.com/share?url=' + url + '&text=' + tweet, 'twitter', param);
		win.focus();
	}

	this.facebookShare = function(url, title, param) {
		if (typeof param === 'undefined') {
			param = 'width=640,height=480,left=0,top=0,location=no,status=yes,scrollbars=yes,resizable=yes';
		}
		
		url = getValue(url);
		title = getValue(title);
		var win = window.open('https://www.facebook.com/sharer/sharer.php?u=' + url + '&t=' + title, 'facebook', param);
		win.focus();
	}

	this.googlePlus = function(url, param) {
		if (typeof param === 'undefined') {
			param = 'width=640,height=480,left=0,top=0,location=no,status=yes,scrollbars=yes,resizable=yes';
		}
		
		url = getValue(url);
		var win = window.open('http://plusone.google.com/_/+1/confirm?hl=en-US&url=' + url, 'GooglePlus', param);
		win.focus();
	}

	this.fancy = function(url, title, image_url, param) {
		if (typeof param === 'undefined') {
			param = 'width=640,height=480,left=0,top=0,location=no,status=yes,scrollbars=yes,resizable=yes';
		}
		
		url = getValue(url);
		title = getValue(title);
		image_url = getValue(image_url);
		var win = window.open('https://www.thefancy.com/fancyit?ItemURL=' + url + '&Title=' + title + '&ImageURL=' + image_url, 'fancy', param);
		win.focus();
	};
}