// namespaced cart functions
var AcdcCart = (function($) {
	var obj = {};

	/**
	 * gets the cart as JSON and then calls the the provided function
	 *
	 * @param func
	 */
	obj.doSomethingWithCart = function(func) {
		$.get(js_site_var.context_path + '/app/cart/view.json', {
			rand: Math.floor(Math.random() * 1000000)
		}, func);
	}

	/**
	 * get total items in cart, disregarding shipments
	 *
	 * @param cart
	 * @returns
	 */
	obj.getTotalItemsInCart = function(cart) {
		return cart.cartItems.length;
	}

	/**
	 * items = [ { itemId: '1234', quantity: 1, listItemId: '334' }, ... ]
	 *
	 * @param url either to cart/addItemsDo (old) or cart/addItems (new) flow
	 * @param items
	 * @param callback
	 * @param remove_list_id list ID to remove the items from (if we are e.g., adding to cart from wishlist)
	 * @param remove_cart_item_ids can also remove items (CSVs)
	 * @param addItemsCallback an optional callback for clients to populate addItems with additional data
	 */
	obj.addToCart = function(url, items, callback, remove_list_id, remove_cart_item_ids, addItemsCallback) {
		var data = {};

		if (typeof remove_list_id !== 'undefined') {
			data['remove_list_id'] = remove_list_id;
		}

		if (typeof remove_cart_item_ids !== 'undefined') {
			data['remove_cart_item_ids'] = remove_cart_item_ids;
		}

		for (var i = 0; i < items.length; i++) {
			data['addItems[' + i + '].itemId'] = items[i].itemId;

			if (items[i].hasOwnProperty('quantity')) {
				data['addItems[' + i + '].quantity'] = items[i].quantity;
			} else {
				data['addItems[' + i + '].quantity'] = 1;
			}

			if (items[i].hasOwnProperty('note') && items[i].note != null) {
				data['addItems[' + i + '].note'] = items[i].note;
			}

			if (items[i].hasOwnProperty('linkKey') && items[i].linkKey != null) {
				data['addItems[' + i + '].linkKey'] = items[i].linkKey;
			}

			if (items[i].hasOwnProperty('linkPrimary') && items[i].linkPrimary != null) {
				data['addItems[' + i + '].linkPrimary'] = items[i].linkPrimary;
			}

			if (items[i].hasOwnProperty('notes')) {
				for (j = 0; j < items[i].notes.length; j++) {
					data['addItems[' + i + '].notes[' + j + ']'] = items[i].notes[j];
				}
			}

			if (items[i].hasOwnProperty('subscriptionTerm') && items[i].subscriptionTerm != null) {
				data['addItems[' + i + '].subscriptionTerm'] = items[i].subscriptionTerm;
			}

			// add additional client-specific data to the request
			if (typeof addItemsCallback !== 'undefined' && typeof (addItemsCallback) == 'function') {
				// the callback should return a JSON-like object in the form { keyA: value1, keyB: value2, ... }
				var additionalData = addItemsCallback(items[i]);

				if (typeof additionalData !== 'undefined' && typeof additionalData === 'object') {
					$.each(additionalData, function(key, value) {
						data['addItems[' + i + '].' + key] = value;
					});
				}
			}
		}

		addCsrfTokenToPostData(data);

		/*
		 * The below requests will be tried again if they fail, with a new CSRF token that should have been
		 * returned with the blocked request
		 */
		if (typeof callback !== 'undefined' && typeof (callback) == 'function') {
			$.post(url, data, callback).fail(function(){
				addCsrfTokenToPostData(data);				
				$.post(url, data, callback) 
			});
		} else {
			$.post(url, data).fail(function(){
				addCsrfTokenToPostData(data);
				$.post(url, data);
			});
		}
	}

	/**
	 * useful when we store items added to cart in cookie for later retrieval
	 *
	 * @param url either to cart/addItemsDo (old) or cart/addItems (new) flow
	 * @param already_loaded_cookie_name name of the cookie used to remember that items were already loaded
	 * @param cookie_name name of the cookie where items are stored as JSON
	 * @param callback
	 */
	obj.addItemsFromCookieToCart = function(url, already_loaded_cookie_name, cookie_name, callback) {
		var already_loaded = getCookieWithHelper(false, already_loaded_cookie_name);

		if (typeof callback === 'undefined') {
			callback = function() {

			};
		}

		if (typeof already_loaded !== 'undefined' && already_loaded == 't') {
			console.log('already added items from cookie "' + cookie_name + '" to cart');
			callback();
		} else {
			setCookieWithHelper(false, already_loaded_cookie_name, 't', {
				path: '/'
			});
			var items_str = getCookieWithHelper(false, cookie_name);
			console.log(items_str);

			if (typeof items_str !== 'undefined' && items_str != null) {
				console.log('going to add items from cookie "' + cookie_name + '" to cart');
				obj.addToCart(url, JSON.parse(items_str), callback);
			} else {

				// we still call "callback" just in case
				callback();
			}
		}
	}

	/**
	 * move items to a list (e.g., wishlist)
	 *
	 * @param url
	 * @param index
	 * @returns {Boolean}
	 */
	obj.moveToList = function(url, index) {
		var $hidden = $('input[type="hidden"][name="cartUpdate.itemUpdates[' + index + '].sendToList"]');

		if ($hidden.length != 1) {
			console.log("couldn't find hidden \"sendToList\" input with index " + index);
			return;
		}

		$hidden.val('true');
		document.location = url + '&_eventId=checkout_list_item_add&' + $('#command input[name$="sendToList"]').serialize();
		return false;
	}

	/**
	 * update cart (after a delay). this would refresh the page. useful if they don't have an "update" button on the
	 * cart page and they want it to be auto-updated after quantity is changed
	 *
	 * @param delay in ms
	 * @param on_selector
	 * @param selector filter for event
	 * @param event - event triggger the update, default to click
	 */
	obj.updateCart = function(delay, on_selector, selector, event) {

		var evt = 'click';

		if (event) {
			evt = event;
		}

		$(on_selector).on(evt, selector, $.debounce(delay, function() {
			submitEvent('_eventId_checkout_update');
		}));
	}

	obj.estimateShippingCosts = function(address, callback) {
		console.log(address);

		if (typeof address.country === 'undefined' || address.country == null || address.country == '') {
			return;
		}

		if (typeof address.postal_code === 'undefined' || address.postal_code == null) {
			address.postal_code = '';
		}

		if (typeof address.province === 'undefined' || address.province == null) {
			address.province = '';
		}

		ajaxWithoutAuth(js_site_var['context_path'] + '/app/cart/estimateDo?ta=rates&country=' + address.country + '&postalCode=' + address.postal_code + '&province=' + address.province, null, 'GET', function(data) {
			callback(address, data);
		});
	}

	return obj;
})(jQuery);

/**
 * @deprecated
 */
function doSomethingWithCart(func) {
	AcdcCart.doSomethingWithCart(func);
}

/**
 * @deprecated
 */
function getTotalItemsInCart(cart) {
	return AcdcCart.getTotalItemsInCart(cart);
}

/**
 * @deprecated
 */
function addToCart(items, callback, remove_list_id, remove_cart_item_ids, addItemsCallback) {
	var url = js_site_var['cart_domain'] + js_site_var['context_path'] + '/app/cart/addItemsDo';
	AcdcCart.addToCart(url, items, callback, remove_list_id, remove_cart_item_ids, addItemsCallback);
}

/**
 * @deprecated
 */
function addItemsFromCookieToCart(already_loaded_cookie_name, cookie_name, callback) {
	var url = js_site_var['cart_domain'] + js_site_var['context_path'] + '/app/cart/addItemsDo';
	AcdcCart.addItemsFromCookieToCart(url, already_loaded_cookie_name, cookie_name, callback);
}

/**
 * @deprecated
 */
function cart_moveToList(url, index) {
	return AcdcCart.moveToList(url, index);
}

/**
 * @deprecated
 */
function cart_updateCart(delay, on_selector, selector) {
	AcdcCart.updateCart(delay, on_selector, selector);
}

/**
 * right now, it's US-only
 *
 * DEPRECATED! use AcdcCart.estimateShippingCosts()
 *
 * @deprecated
 * @param coutry_code
 * @param postal_code
 * @param callback function is passed three args: country code, postal code, and the data
 */
function cart_estimateShippingRates(country_code, postal_code, callback) {
	if (typeof country_code === 'undefined' || country_code == null || country_code == '' || typeof postal_code === 'undefined' || postal_code == null || postal_code == '' || typeof callback === 'undefined') {
		return;
	}

	var re = /^[0-9]{5}$/;

	if (country_code == 'US' && postal_code.match(re)) {
		ajaxWithoutAuth(js_site_var['context_path'] + '/app/cart/estimateDo?ta=rates&country=' + country_code + '&postalCode=' + postal_code, null, 'GET', function(data) {
			callback(country_code, postal_code, data);
		});
	} else {
		console.log('US-only with 5-digit zip code allowed');
	}
}

/**
 * @deprecated
 */
function cart_estimateShippingCosts(address, callback) {
	AcdcCart.estimateShippingCosts(address, callback);
}

/**
 * @deprecated use AcdcCart.estimateShippingCosts()
 * @param country_code
 * @param postal_code
 * @param callback
 */
function cart_estimateInternationalShippingRates(country_code, postal_code, callback) {
	if (typeof country_code === 'undefined' || country_code == null || country_code == '' || typeof postal_code === 'undefined' || postal_code == null || postal_code == '' || typeof callback === 'undefined') {
		return;
	}
	ajaxWithoutAuth(js_site_var['context_path'] + '/app/cart/estimateDo?ta=rates&country=' + country_code + '&postalCode=' + postal_code, null, 'GET', function(data) {
		callback(country_code, postal_code, data);
	});
}

/**
 * Adds a a csrf token to the data object if the cookie exists
 * @param data
 * @returns
 */
function addCsrfTokenToPostData(data){
	var csrfCookieValue = getCookieWithHelper(false, 'csrfToken');
	if (csrfCookieValue != undefined) {
		data['_csrfToken'] = csrfCookieValue;
	}
}

/**
 * jQuery plugin to deal with "same as shipping" checkboxes
 *
 * "options.shipping" is optional and is the shipping address. if it's undefined, then it will try to get it from the page itself.
 * "options.callback" is optional and is called afterwards
 *
 * IMPORTANT: do not use this directly for security reasons. always use the <checkout:sameAsShipping> tag which will use this
 */
(function($) {
	$.fn.cart_sameAsShipping = function(options) {
		var settings = $.extend({
			callback: function() {
			},
			precheck: false, // if true, the checkbox is automatically checked (w/o actually copying the address)
			credit_card_address_model: 'creditCardAddress', // defaults to "creditCardAddress" but can be "address"
			shipping_address_model: 'shippingAddress', // defaults to "shippingAddress" but can be "address"
			name_on_card: false, // if true, copy the credit card's "name on card" to the shipping first name and last name
			skip_email: false // if true, skips email field and does not populate it
		}, options);

		var copyShipping = function(target) {
			var checked = $(target).is(':checked');
			console.log(checked);
			var shipping = settings.shipping;

			if (typeof shipping === 'undefined') {
				shipping = {};
				shipping.address = {};
				shipping.address.firstName = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.firstName"]').val();
				shipping.address.lastName = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.lastName"]').val();
				shipping.address.address1 = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.address1"]').val();
				shipping.address.address2 = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.address2"]').val();
				shipping.address.city = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.city"]').val();
				shipping.address.province = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.province"]').val();
				shipping.address.postalCode = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.postalCode"]').val();
				shipping.address.phoneNumber = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.phoneNumber"]').val();
				if (!settings.skip_email) {
					shipping.address.email = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.email"]').val();
				}
				shipping.address.company = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.company"]').val();
				shipping.address.country = $('[name="checkoutShippingAddress\\.' + settings.shipping_address_model + '\\.country"]').val();
			} else {
				shipping = JSON.parse(shipping);
			}

			if (settings.name_on_card) {
				if (shipping.address.firstName != '' && shipping.address.lastName != '') {
					$('[name="checkoutCreditCard\\.creditCard\\.nameOnCard"]').val(checked ? shipping.address.firstName + ' ' + shipping.address.lastName : '');
				}
			}

			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.firstName"]').val(checked ? shipping.address.firstName : '');
			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.lastName"]').val(checked ? shipping.address.lastName : '');
			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.address1"]').val(checked ? shipping.address.address1 : '');
			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.address2"]').val(checked ? shipping.address.address2 : '');
			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.city"]').val(checked ? shipping.address.city : '');
			var $province = $('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.province"]');

			if (typeof $province.selectize != 'undefined' && typeof $province.selectize()[0] != 'undefined') {
				// selectize.js hides the native select dropdown, hence this if clause
				$province.selectize()[0].selectize.setValue(checked ? shipping.address.province : '');
			} else if ($province.is('select')) {
				if (checked) {
					$province.val(shipping.address.province);
				} else {
					$province.val($province.find('option:first').val());
				}

				$province.trigger('change');
			} else {
				$province.val(checked ? shipping.address.province : '');
			}

			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.postalCode"]').val(checked ? shipping.address.postalCode : '');
			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.phoneNumber"]').val(checked ? shipping.address.phoneNumber : '');
			if (!settings.skip_email) {
				$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.email"]').val(checked ? shipping.address.email : '');
			}
			$('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.company"]').val(checked ? shipping.address.company : '');
			var $country = $('[name="checkoutCreditCard\\.creditCard\\.' + settings.credit_card_address_model + '\\.country"]');

			if (typeof $country.selectize != 'undefined' && typeof $country.selectize()[0] != 'undefined') {
				// selectize.js hides the native select dropdown, hence this if clause
				$country.selectize()[0].selectize.setValue(checked ? shipping.address.country : '');
			} else if ($country.is('select')) {
				if (checked) {
					$country.val(shipping.address.country);
				} else {
					$country.val($country.find('option:first').val());
				}

				$country.trigger('change');
			} else if ($country.is(":hidden")) {
				// don't do anything; sometimes country is hidden and not meant to be changed (and set to US always)
			} else {
				$country.val(checked ? shipping.address.country : '');
			}
		};

		$(this).on('click', function(event) {
			copyShipping(this);
			var checked = $(this).is(':checked');

			settings.callback(checked);
		});

		$(this).prop('checked', settings.precheck);

		if (settings.precheck) {
			copyShipping(this);
		}
	};
}(jQuery));