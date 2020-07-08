$(function() {
	checkLogIn();
	countCart();

	//mobile browser support for header promo banner
    $('.tooltip').bind('touchstart', function(e) {
        e.preventDefault();
        $(this).toggleClass('hover-effect');
    });

	// We have to unbind and rebind the mini cart link with the mini cart listener showHideCart()
	$('.nav-beta > ul > li > a.link-cart').unbind('click');
	$('.nav-beta > ul > li > a.link-cart').on('click', function(event) {
		var $this = $(this);
		var $parent = $(this).parent();

		if ($parent.find('.nav-dropdown').length) {
			$parent.toggleClass('current').find('.nav-dropdown').toggleClass('expanded');
			$parent.siblings().removeClass('current').find('.nav-dropdown').removeClass('expanded');
			showHideCart();
		}
	});

	$('.gift-message').keyup(function() {
		var charcount = parseInt($(this).attr('maxlength')) - $(this).val().length;
		$(this).closest('.message').find('h4').text(charcount + ' characters remaining');
	});

	$('#resdental-address').prop('checked', $('input[name="checkoutShippingAddress.shippingAddress.defaultAddress"]').val()  == 'true');
	$('#commercial-address').prop('checked', $('input[name="checkoutShippingAddress.shippingAddress.commercial"]').val()  == 'true');
	$('#poBox').prop('checked', $('input[name="checkoutShippingAddress.shippingAddress.poBoxOrApo"]').val()  == 'true');

	if(!($('#commercial-address').prop('checked') || $('#resdental-address').prop('checked') || $('#poBox').prop('checked'))) {
		$('#resdental-address').prop('checked', true);
		$('input[name="checkoutShippingAddress.shippingAddress.defaultAddress"]').val('true');
	}

	swapPoboxText();

	function swapPoboxText(){
		if ($('#poBox').prop('checked')) {
			$('.form-label-alpha-street-address').html('<span class="form-asterisk">*</span> PO Box or APO');
		} else {
			$('.form-label-alpha-street-address').html('<span class="form-asterisk">*</span> Street Address');
		}
	}

	$('body .form-section').on('click', '#resdental-address', function(event){
		$('input[name="checkoutShippingAddress.shippingAddress.defaultAddress"]').val('true');
		$('input[name="checkoutShippingAddress.shippingAddress.commercial"]').val('false');
		$('input[name="checkoutShippingAddress.shippingAddress.poBoxOrApo"]').val('false');
		swapPoboxText();
	});

	$('body .form-section').on('click', '#commercial-address', function(event){
		$('input[name="checkoutShippingAddress.shippingAddress.defaultAddress"]').val('false');
		$('input[name="checkoutShippingAddress.shippingAddress.commercial"]').val('true');
		$('input[name="checkoutShippingAddress.shippingAddress.poBoxOrApo"]').val('false');
		swapPoboxText();
	});

	$('body .form-section').on('click', '#poBox', function(event){
		$('input[name="checkoutShippingAddress.shippingAddress.defaultAddress"]').val('false');
		$('input[name="checkoutShippingAddress.shippingAddress.commercial"]').val('false');
		$('input[name="checkoutShippingAddress.shippingAddress.poBoxOrApo"]').val('true');
		swapPoboxText();
	});

	$('.lookup-zip-code').on('keyup', function(event){
		var currentZip = $('.lookup-zip-code').val();
		var isnum = /^\d+$/.test(currentZip);
		var selectedCountry = $('.lookup-country option:checked').val();

		var $countryDropdownSelect2 = $('.select-primary.lookup-country');

		if (isnum) {
			if (selectedCountry != 'US') {
				$countryDropdownSelect2.val('US').trigger('change');
			}
		} else {
			if (selectedCountry != 'CANADA') {
				$countryDropdownSelect2.val('CANADA').trigger('change');
			}
		}

	});


	// Zeta tracking...
	$('input[name="_eventId_checkout_place_order"]').click(function() {
		var $form = $(this).parents('form');
		var $email = $form.find('#createAccount\\.email');
		var $pw = $form.find('#createAccount\\.password');
		var $pw_confirm = $form.find('#createAccount\\.confirmPassword');

		if ($pw.val().trim().length > 0 && $pw_confirm.val().trim().length > 0 && $email.val().trim().length > 0) {
			var accountCreateSubscription = $('#field-receive-emails').prop('checked');
			setCookieWithHelper(false, 'justSignup', accountCreateSubscription , {expires: 30, path: '/'});
			setCookieWithHelper(false, 'placeOrderCreateAccount', 'true', {expires: 30, path: '/'});
		}
	});

	$('#account_create_button').click(function() {
		var accountCreateSubscription = $('#field-sign-newsletter')[0].checked;
		setCookieWithHelper(false, 'justSignup', accountCreateSubscription , {expires: 30, path: '/'});
	});

	$('#save_account_button').click(function() {
		setCookieWithHelper(false, 'updatedAccount', 'true', {expires: 30, path: '/'});
	});

	$("#user-logout").click(function(){
		zetaClearTraking();
	});

	// Update navigation for mobile
	// Nav Gamma Dropdown
	$('.nav-gamma > ul > li > a').on('click', function(event) {
		if ($(window).width() < 768) {
			var $parent = $(this).parent();
			if ($parent.find('.nav-dropdown').length) {
				$parent.toggleClass('current');
				$parent.siblings().removeClass('current');
				event.preventDefault();
			}
		}
	});

	$(window).on('load resize', function() {
		if($(window).width() > 768) {
			$.each($('.square-content img'), function(i,v) {
				if(v.width < 315) {
					$(v).parents('.square-container').css('column-gap', '40px');
				} else {
					$(v).parents('.square-container').css('column-gap', '29px');
				}
			});
		} else {
			$('.square-container').css('column-gap', '10px');
		}
	})

});

function checkHiddenPoBox() {
	if ($('#hidden-poBox').length < 1){
		$('#havaianas3-shipping-form').append('<input id="hidden-poBox" name="checkoutShippingAddress.shippingAddress.poBoxOrApo" type="hidden" value="true" >');
	} else {
		$('#hidden-poBox').val('true');
	}
}

function uncheckHiddenPoBox() {
	if ($('#hidden-poBox').length < 1){
		$('#havaianas3-shipping-form').append('<input id="hidden-poBox" name="checkoutShippingAddress.shippingAddress.poBoxOrApo" type="hidden" value="false" >');
	} else {
		$('#hidden-poBox').val('false');
	}
}

function checkLogIn() {
	$.ajax({
		url: js_site_var['context_path'] + '/app/account/info.json',
		success: function(data) {
			if (data.loggedIn) {
				$('#logged-out').hide();
				$('#logged-in').show();
				$('#logged-in .link-access').html('<i class="fa fa-user"></i> Welcome ' + data.firstName);
			}

			zetaTracking(data);
		}
	});
}

function loginPopupSubmit(data) {
	setCookieWithHelper(false, 'updatedAccount', 'true', { expires: 30, path: '/' });
	if ($('#login-popup', data).length > 0) {
		$('.popup-login-register > .popup-inner > .form-log').html($(data).find('#login-popup'));
	} else {
		location.href = js_site_var['context_path'] + '/app/account/home';
	}
}

function registerPopupSubmit(data) {
	setCookieWithHelper(false, 'justSignup', 'true', { expires: 30, path: '/' });
	if ($('#register-popup', data).length > 0) {
		$('.popup-login-register > .popup-inner > .form-reg').html($(data).find('#register-popup'));
	} else {
		location.href = js_site_var['context_path'] + '/app/account/home';
	}
}

function simplePriceFormatter(price, options) {

	if (typeof price !== 'number') {
		price = Number(price);
		price = (price / 100);
	}

	if (typeof price === 'number') {
		price = (price / 100);
		price = '' + price;
	}

	if (typeof options.showCents != 'undefined' && options.showCents) {
		var periodIndex = price.indexOf('.');
		if (periodIndex < 0) {
			price = price + '.00';
		} else if (price.length == periodIndex + 2) {
			price = price + '0';
		}
	}

	if (typeof options.showSymbol != 'undefined' && options.showSymbol) {
		price = '$' + price;
	}

	return price;
}

function giftCardCheckBalanceHandler(data) {
	if ($('#gc-balance-form', data).length > 0) {
		$('.popup-inner > .form').html($(data).find('#gc-balance-form'));
	}
}

function postalCodeMaxLengthHandler(countrySelector,postalCodeSelector) {
	var countryVal  = $(countrySelector).val();
	if(countryVal === 'US'){
		var zip = $(postalCodeSelector).val();
		if(zip.length > 5) $(postalCodeSelector).val(zip.substring(0, 5));
		$(postalCodeSelector).attr('maxlength', 5);

	}else if(countryVal === 'CANADA'){
		$(postalCodeSelector).attr('maxlength', 7);
	}
}

/**
 * Remove error status when populating data to field.
 *
 */
function removeErrorStatus() {
	$("input").on('input', function() {
		var use_shipping_status = $('.hav3-checkout-billing #use-shipping').is(':checked');
		if (typeof use_shipping_status != 'undefined' && use_shipping_status == true && typeof $(this).attr('id') != 'undefined' && $(this).attr('id').includes('address')) {
			return false;
		}

		if ('checkoutCreditCard.creditCard.securityCode' == $(this).attr('id')) {
			$(this).parent().parent().parent().parent().removeClass("error");
			$(this).parent().find('.form__error').remove();
		} else {
			$(this).parent().parent().removeClass('error');
			$(this).parent().find('.form__error').remove();
		}

	});

	$("select").change(function() {
		var use_shipping_status = $('.hav3-checkout-billing #use-shipping').is(':checked');
		if (typeof use_shipping_status != 'undefined' && use_shipping_status == true && typeof $(this).attr('id') != 'undefined' && $(this).attr('id').includes('address')) {
			return false;
		}

		if ($(this).val() != '') {
			if ('checkoutCreditCard.creditCard.expMonth' == $(this).attr('id')) {
				$(this).parent().parent().parent().parent().removeClass("error");
				$(this).parent().find('.form__error').remove();
			} else {
				$(this).parent().parent().removeClass("error");
				$(this).parent().find('.form__error').remove();
			}

		}
	});
}

/**
 * check skip mandatory field when filling data to shipping / billing method.
 *
 * @param elementAboveId
 */
var selectuseshipping = false;
function validateSkipStepsForMandatoryField() {
	$("input").on('input', function() {
		// get field above
		var selectedId = $(this).attr('id');
		var position = $(this).data('validation-position');
		if (typeof position != 'undefined' && $(this).val() != '') {
			validateFieldSkipMandatoryField(selectedId, position);
		}
	})

	$("select").change(function() {
		// get field above
		var position = $(this).data('validation-position');
		var selectedId = $(this).attr('id');
		if (typeof position != 'undefined' && $(this).val() != '') {
			validateFieldSkipMandatoryField(selectedId, position);
		}


	});
}

function validateFieldSkipMandatoryField(selectedId, position) {
	var use_shipping_status = $('.hav3-checkout-billing #use-shipping').is(':checked');
	if (typeof use_shipping_status != 'undefined' && use_shipping_status == true) {
		return false;
	}

	$("input").each(function() {
		var errorMessage = $(this).data('validation-error-msg-required');
		if (typeof errorMessage != 'undefined' && $(this).val() == '' && errorMessage != '') {
			var currentFieldPosition = $(this).data('validation-position');
			if (typeof currentFieldPosition != 'undefined' && typeof position != 'undefined') {
				if (Number(currentFieldPosition) >= Number(position)) {
					return false;
				} else {
					if ($(this).parent().has('.form__error').length == 0) { // check to see the error is already display or not
						$(this).parent().append('<p id="' + $(this).attr('id') + '.errors" class="form__error color-dark-red">'+ errorMessage +'</p>');
					}
				}
			}
		}
	});

	$("select").each(function() {
		var errorMessage = $(this).data('validation-error-msg-required');
		if (typeof errorMessage != 'undefined' && $(this).val() == '' && errorMessage != '') {
			var currentFieldPosition = $(this).data('validation-position');
			if (typeof currentFieldPosition != 'undefined' && typeof position != 'undefined') {
				if (Number(currentFieldPosition) >= Number(position)) {
					return false;
				} else {
					if ($(this).parent().has('.form__error').length == 0) { // check to see the error is already display or not
						$(this).parent().append('<p id="' + $(this).attr('id') + '.errors" class="form__error color-dark-red">'+ errorMessage +'</p>');
					}
				}
			}

		}
	});
}
