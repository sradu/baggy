function CountrySwapper(options) {

	// for private methods
	var obj = this;
	
	var settings = $.extend({
		on_selector: null, // you don't need this if the country is a select
		country_selector: '#country',
		us_selector: '.us-block',
		can_selector: '.can-block',
		au_selector: '.au-block',
		other_selector: '.other-block',
		callback: null,
		do_nothing_on_unknown: false // if this is true and we can't determine the country, don't assume it's US - ignore it
	}, options || {});

	// is this the first update()?
	var first = true;

	var $country = $(settings.country_selector);
	var $other = $(settings.other_selector);
	var $can = $(settings.can_selector);
	var $au = $(settings.au_selector);
	var $us = $(settings.us_selector);
	
	if ($country.is('select')) {
		if (settings.on_selector == null) {
			$country.on('change', function() {
				obj.update($country);
			});
		} else {
			$(settings.on_selector).on('change', settings.country_selector, function(event) {
				obj.update($(event.target));
			});
		}
	} else {
		if (settings.on_selector == null) {
			$country.on('click', function() {
				obj.update($country);
			});
		} else {
			$(settings.on_selector).on('click', settings.country_selector, function(event) {
				obj.update($(event.target));
			});
		}
	}
	
	this.update = function($target) {
		if (typeof $target === 'undefined') {
			console.log('target is undefined')
			return;
		}

		if ($target.prop('disabled')) {
			console.log('target is disabled <' + $target.prop('tagName') + ' class="' + $target.attr('class') + '" id="' + $target.attr('id') + '">');
			return;
		}
		
		(function(closed_first) {
			if ($target.is('select')) {
				var country = $target.val();
				var $option = $target.find('option:selected');
				
				if ($option.length) {
					
					// if the selected option has data "country", use that instead of val()
					if (typeof $option.data('country') !== 'undefined') {
						country = $option.data('country');
					}
				}
			} else {
				var country = $target.data('country');
			}
			
			console.log('"' + country + '" according to <' + $target.prop('tagName') + ' class="' + $target.attr('class') + '" id="' + $target.attr('id') + '">');
			
			if (settings.do_nothing_on_unknown && (typeof country === 'undefined' || country == '' || country == null)) {
				console.log('country is unknown, doing nothing');
				return;
			}
			
			if (typeof country === 'undefined' || country == '' || country == 'US' || country == null) {
				$other.hide();
				$other.find('input, select, textarea').prop('disabled', true);
				$can.hide();
				$can.find('input, select, textarea').prop('disabled', true);
				$au.hide();
				$au.find('input, select, textarea').prop('disabled', true);
				$us.show();
				$us.find('input, select, textarea').prop('disabled', false);
			} else if (country == 'CANADA' || country == 'CA') {
				$other.hide();
				$other.find('input, select, textarea').prop('disabled', true);
				$us.hide();
				$us.find('input, select, textarea').prop('disabled', true);
				$au.hide();
				$au.find('input, select, textarea').prop('disabled', true);
				$can.show();
				$can.find('input, select, textarea').prop('disabled', false);
			} else if (country == 'AUSTRALIA' || country == 'AU') {
				$other.hide();
				$other.find('input, select, textarea').prop('disabled', true);
				$us.hide();
				$us.find('input, select, textarea').prop('disabled', true);
				$can.hide();
				$can.find('input, select, textarea').prop('disabled', true);
				$au.show();
				$au.find('input, select, textarea').prop('disabled', false);
			} else {
				$us.hide();
				$us.find('input, select, textarea').prop('disabled', true);
				$can.hide();
				$can.find('input, select, textarea').prop('disabled', true);
				$au.hide();
				$au.find('input, select, textarea').prop('disabled', true);
				$other.show();
				$other.find('input, select, textarea').prop('disabled', false);
			}
			
			if (typeof settings.callback !== 'undefined' && settings.callback != null) {
				settings.callback(closed_first, country);
			}
		})(first);
		
		first = false;
	}
	
	// run it the first time
	if ($country.is('select')) {
		obj.update($country);
	} else {
		obj.update($country.filter(':checked'));
	}
}
