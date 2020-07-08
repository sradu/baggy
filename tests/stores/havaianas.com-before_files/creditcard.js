/**
 * jQuery plugin to determine and set credit card type based on credit card number
 * 
 * options.type_selector is optional options.callback is optional and is called afterwards
 */
(function($) {
	$.fn.creditcard_setType = function(options) {
		var settings = $.extend({
			callback : function() {

			},
			type_selector : '[name="checkoutCreditCard\\.creditCard\\.creditCardType"]'
		}, options);

		this.focusout(function() {

			// https://en.wikipedia.org/wiki/Bank_card_number

			var re = {
				visa : /^4/,
				mastercard : /^[25]/,
				amex : /^3[47]/,
				discover : /^6/
			};

			var $type = $(settings.type_selector);
			var typeval = null;
			var number = $(this).val().replace(/ /g, '');
			// console.log(number);

			if (re.visa.test(number)) {
				typeval = 'VISA';
				$type.val(typeval);

				if ($type.is('select')) {
					$type.trigger('change');
				}
			} else if (re.mastercard.test(number)) {
				typeval = 'MASTERCARD';
				$type.val(typeval);

				if ($type.is('select')) {
					$type.trigger('change');
				}
			} else if (re.amex.test(number)) {
				typeval = 'AMEX';
				$type.val(typeval);

				if ($type.is('select')) {
					$type.trigger('change');
				}
			} else if (re.discover.test(number)) {
				typeval = 'DISCOVER';
				$type.val(typeval);

				if ($type.is('select')) {
					$type.trigger('change');
				}
			}

			console.log(typeval);
			settings.callback(typeval);
		});
	};
}(jQuery));
