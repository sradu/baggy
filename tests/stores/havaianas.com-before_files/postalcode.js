// drop postal code related stuff here

function PostalCodeLookup(options) {

	// for private methods
	var obj = this;

	var settings = $.extend({
		postalcode_selector : '.lookup-zip-code',
		city_selector : '.lookup-city',
		province_selector : '.lookup-province',
		country_selector : '.lookup-country',
		clear_intl_city : 'true',
		clear_intl_province: 'true',
		callback : null
	}, options || {});

	// is this the first lookup?
	var first = true;

	$(settings.postalcode_selector).focusout(function() {
		var $this = $(this);

		(function(closed_first) {
			var countrycode = $(settings.country_selector).val();

			if (typeof countrycode === 'undefined' || countrycode == '' || countrycode == null) {
				countrycode = 'US';
			}

			// right now, it's US-specific

			var re = /^[0-9]{5}$/;
			var postalcode = $this.val();
			var $province_selector = $(settings.province_selector);

			if (postalcode.match(re)) {
				ajaxWithoutAuth(js_site_var['context_path'] + '/app/address/postalcode/' + countrycode + '/' + postalcode, '', 'GET', function(data, textStatus, jqXHR) {
					if (typeof data.lookup !== 'undefined') {
						var original_city = $(settings.city_selector).val();
						$province_selector.val(data.lookup.province);
						$(settings.city_selector).val(data.lookup.city);
						console.log(data.lookup.city + ', ' + data.lookup.province);
						
						if(original_city !== data.lookup.city) {
							$(settings.city_selector).trigger('populate_success');
						}
					} else {
						$(settings.city_selector).val('');

						if ($province_selector.is('select')) {
							$province_selector.find('option:first').attr('selected','selected');
						} else {
							$province_selector.val('');
						}
					}

					if ($province_selector.is('select')) {
						$province_selector.trigger('change');
					}

					if (typeof settings.callback !== 'undefined' && settings.callback != null) {
						settings.callback(closed_first);
					}
				}, 'json');
			} else {
				if(settings.clear_intl_province == 'true'){
					if ($province_selector.is('select')) {
						$province_selector.find('option:first').attr('selected','selected');
						$province_selector.trigger('change');
					} else {
						$province_selector.val('');
					}
				}
				if ( settings.clear_intl_city == 'true' ) {
					$(settings.city_selector).val('');
				}

				if (typeof settings.callback !== 'undefined' && settings.callback != null) {
					settings.callback(closed_first);
				}
			}
		})(first);

		first = false;
	});
}
