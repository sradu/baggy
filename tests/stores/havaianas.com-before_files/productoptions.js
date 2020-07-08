function ProductOptions(options) {

	/**
	 * for private methods
	 */
	var obj = this;

	var settings = jQuery.extend({
		propagate_event : false,
		exclude_out_of_stock : true,

		// product info that holds inventory info for each sku
		// see com.acadaca.yaz.app.catalog.model.ProductInfo
		inventory_product_info : null,

		// product info that holds options info for each sku
		// see com.acadaca.yaz.app.catalog.model.ProductInfo
		options_product_info : null,

		// function to render each option. it should expect
		// this (ProductOptions) as the first arg,
		// the option object as the second arg, and the option values
		// as the third arg (array of value objects).
		optionRenderer : null,

		// you can choose to order the options so that the options are rendered in the order you like
		// e.g., (color first, then size, then substyle.)
		allOptionsSorter : null,

		// where the event handler is attached
		on_selector : '.product_options',

		// jQuery selector prefix that holds the option (size, color, etc.) and any other misc
		// HTML specific to that option (e.g. label, etc.) that would be displayed/removed as options are selected/unselected.
		// the complete selector would have the option code appended like '.product_option_container_COLOR'
		// and 'product_option_container_SIZE'
		//
		// this MUST be a child of "on_selector"
		option_container_selector_prefix : '.product_option_container_',

		// child elements of the on_selector which we use to filter the events.
		// you should attach this to an element for each option
		child_selector : '.product_option',

		// the function to call when an option is changed (selected/unselected).
		// this will be attached to the "on_selector". args are (event, option_code, value).
		optionChangeHandler : null,

		// when we render one option, we need to remove/hide the successive options since they depend on
		// what's selected for the current option. if this is true, the HTML element for the options are removed.
		// if false, the elements hidden.
		remove_next_option : true,

		// how to sort values (colors, sizes, etc.) based on the option code.
		// key is the option code. value can be "sku_order". if the value is not "sku_order", it defaults
		// to sorting by the choice value priority.
		value_sort : {},

		// attach the ProductOption as data on the "on_selector" (as "product-options")
		attach : false,
		
		// useful if you have multiple templates but want to use the same function to render the product options
		// (e.g. set this to 'qv-' when initializing the object on a PDP quickview with different product options HTML)
		template_prefix : '',
		
		// this is useful if you have multiple products with product options on one page, and some may be nested inside 
		// the selector of another product options container
		selectors_to_ignore : []
	}, options || {});

	var rendered = false;

	/**
	 * is everything excluded?
	 */
	var nothing_available = true;

	if (settings.attach) {
		$(settings.on_selector).data('product-options', obj);
	}

	this.getImagesForOptionCode = function(optionCode) {
		return this.getImagesForOptionCodeAndProductId(optionCode, null);
	}

	this.getImagesForOptionCodeAndProductId = function(optionCode, productId) {
		var images = {};
		
		var skuInfos = settings.options_product_info.skuInfos;
		for(var i = 0; i < skuInfos.length; i++) {
			var skuInfo = skuInfos[i];

			// if we've merged product data for multiple products, make sure we're
			// getting the data for the product we want only
			if(productId !== null && skuInfo.productId != productId) {
				continue;
			}

			var optionValue;
			for(var j = 0; j < skuInfo.options.length; j++) {
				var option = skuInfo.options[j];
				if(option.code == optionCode) {
					optionValue = option.optionValue.value;
					break;
				}
			}
			
			var imageObj = {};
			for(var j = 0; j < skuInfo.images.length; j++) {
				var image = skuInfo.images[j];
				var tagObj = imageObj[image.imageTag] || {};
				tagObj[image.sizeCode] = image.filename;				
				imageObj[image.imageTag] = tagObj;
			}

			if(images[optionValue] !== undefined && images[optionValue] !== null) {
				images[optionValue] = Object.assign({}, imageObj, images[optionValue]);
			} else {
				images[optionValue] = imageObj;
			}
		}
		
		return images;
	}

	/**
	 * you may need to know this if you are juggling multiple ProductOptions on a single page.
	 */
	this.getOptionContainerSelectorPrefix = function() {
		return settings.option_container_selector_prefix;
	}

	this.getOnSelector = function() {
		return settings.on_selector;
	}
	
	this.getSelectorsToIgnore = function() {
		return settings.selectors_to_ignore;
	}

	this.getChildSelector = function() {
		return settings.child_selector;
	}

	this.isNothingAvailable = function() {
		return nothing_available;
	}
	
	this.getTemplatePrefix = function() {
		return settings.template_prefix;
	}

	/**
	 * are all skus out of stock?
	 */
	this.isAllSkusOutOfStock = function() {
		var all_skus_out_of_stock = true;
		for (var i = 0; i < settings.options_product_info.skuInfos.length; i++) {
			var si = settings.options_product_info.skuInfos[i];
			if (si.inStock) {
				all_skus_out_of_stock = false;
				return all_skus_out_of_stock;
			}
		}

		return all_skus_out_of_stock;
	}

	/**
	 * this should be the first method you call. this will get the product options and then render all selected options and the
	 * next unselected option. only call this once to render the first option.
	 */
	this.render = function(callback) {
		if (rendered) {
			console.log('render() already called, ignoring...');
		} else {
			rendered = true;

			if (settings.inventory_product_info != null) {

				// need to merge inventory_product_info with options_product_info.
				// for loop in for loop - oh well...
				for (var o = 0; o < settings.inventory_product_info.skuInfos.length; o++) {
					var inv = settings.inventory_product_info.skuInfos[o];

					for (var i = 0; i < settings.options_product_info.skuInfos.length; i++) {
						var si = settings.options_product_info.skuInfos[i];

						if (si.itemId == inv.itemId) {
							si.inStock = inv.inStock;
							si.preorder = inv.preorder;
							si.qtyAvailable = inv.qtyAvailable;
							si.preorderExpectedDate = inv.preorderExpectedDate;
						}
					}
				}
			}

			// if we are excluding out of stock skus, we need to exclude them now.
			resetExcluded(settings.options_product_info.skuInfos);

			// checking if everything is excluded
			for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
				if (!settings.options_product_info.skuInfos[o].excluded) {
					nothing_available = false;
					break;
				}
			}

			if (nothing_available) {
				console.log('nothing is available');
			}

			// sort
			if (settings.allOptionsSorter != null) {
				settings.options_product_info.allOptions = settings.options_product_info.allOptions
						.sort(settings.allOptionsSorter);
			}

			// render all selected options and next unselected option
			renderAllSelectedOptions();

			if (callback) {

				// anything you need should be captured in a closure
				callback();
			}
		}
	}

	/**
	 * if we are excluding out of stock items, then those out of stock will be marked as excluded and will be normally skipped.
	 */
	var resetExcluded = function(skus) {
		for (var i = 0; i < skus.length; i++) {
			skus[i].excluded = settings.exclude_out_of_stock && !skus[i].inStock;
		}
	}

	/**
	 * should work regardless of type
	 */
	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	/**
	 * we sort based on priority
	 */
	var getUniqueSortedValues = function(values) {
		if (values.length <= 1) {
			return values;
		}

		var new_vals = new Array();

		for (var i = 0; i < values.length; i++) {
			new_vals.push(values[i]);
		}

		// IMPORTANT - the priority is important so that we can sort the values and remove
		// duplicates. but in case they are not set...
		new_vals.sort(function(a, b) {

			// if the priorities are the same and the values are not, then we'll assume that
			// the priorities were not set (at all or correctly) and use the value as the tie-breaker.
			if (a.priority == b.priority && a.value != b.value) {

				// if a.value and b.value are numbers, then we'll compare them as numbers
				// (not lexically)
				if (isNumber(a.value) && isNumber(b.value)) {
					if (parseInt(a.value) < parseInt(b.value)) {
						return -1
					} else {
						return 1;
					}
				} else if (a.value < b.value) {
					return -1;
				} else {
					return 1;
				}
			}

			// higher priority comes first!
			return b.priority - a.priority;
		});

		// remove duplicates by splice()-ing
		var i = 1;

		while (i < new_vals.length) {
			if (new_vals[i - 1].value == new_vals[i].value) {
				new_vals.splice(i, 1);
			} else {
				i++;
			}
		}

		return new_vals;
	}

	/**
	 * goes through all skus that haven't been excluded and comes up with a list of values for the given option.
	 */
	this.findAvailableValuesForOption = function(option_code, include_excluded) {
		var values = new Array();

		for (var i = 0; i < settings.options_product_info.skuInfos.length; i++) {
			var sku_info = settings.options_product_info.skuInfos[i];

			// if the sku is excluded, we skip it.
			if (sku_info.excluded && !include_excluded) {
				continue;
			} else {

				// what value does this have for the given option_code?
				for (var o = 0; o < sku_info.options.length; o++) {
					if (sku_info.options[o].code == option_code) {
						values.push(sku_info.options[o].optionValue);
					}
				}
			}
		}

		return getUniqueSortedValues(values);
	}

	/**
	 * goes through all skus that haven't been excluded and comes up with a list of values for the given option in the order they
	 * appear in skus
	 */
	this.findAvailableValuesForOptionBySkuOrder = function(option_code, include_excluded) {
		var values = new Array();
		var seen = {};

		for (var i = 0; i < settings.options_product_info.skuInfos.length; i++) {
			var sku_info = settings.options_product_info.skuInfos[i];

			// if the sku is excluded, we skip it.
			if (sku_info.excluded && !include_excluded) {
				continue;
			} else {

				// what value does this have for the given option_code?
				for (var o = 0; o < sku_info.options.length; o++) {
					var option = sku_info.options[o];

					if (option.code == option_code) {
						if (!seen[option.optionValue.value]) {
							seen[option.optionValue.value] = true;
							values.push(option.optionValue);
						}
					}
				}
			}
		}

		return values;
	}

	/**
	 * flag the sku_info as excluded if the given option code and value do not match the options for the sku_info.
	 */
	var setExcludeFlag = function(sku_info, option_code, value) {
		for (var i = 0; i < sku_info.options.length; i++) {
			if (value != null && sku_info.options[i].code == option_code && (sku_info.options[i].optionValue.value != value.toString()) && value !== '') {
				sku_info.excluded = true;
				return;
			}
		}
	}

	/**
	 * this will render all selected options plus the next unselected one. this should only be called once from render()
	 */
	function renderAllSelectedOptions() {
		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			var option = settings.options_product_info.allOptions[i];
			var sort_how = settings.value_sort[option.code];

			if (sort_how == 'sku_order') {
				var options = obj.findAvailableValuesForOptionBySkuOrder(option.code);
			} else {
				var options = obj.findAvailableValuesForOption(option.code);
			}

			console.log('rendering option ' + option.code, options);
			settings.optionRenderer(obj, option, options);

			if (option.selected_value == null) {
				return;
			} else {
				obj.selectOption(option.code, option.selected_value, true);
			}
		}
	}

	/**
	 * if you need to programmatically render the next option, call this. it will render the next option (first unselected option)
	 * and remove successive options. if "skip" is true, then it won't render the next option and instead just remove all
	 * successive options.
	 */
	this.renderNextOption = function(skip) {
		var remove_successive = false;

		// find the first unselected option and render it, removing all successive options.
		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			var option = settings.options_product_info.allOptions[i];

			if (remove_successive) {
				var $successive_option = jQuery(settings.on_selector + ' ' + settings.option_container_selector_prefix
						+ option.code);

				if ($successive_option.length) {
					if (settings.remove_next_option) {
						console.log('removing successive option ' + option.code);
						$successive_option.remove();
					} else {
						console.log('hiding successive option ' + option.code);
						$successive_option.hide();
					}
				}
			} else if (option.selected_value == null) {
				if (skip) {
					console.log('skipping unselected option ' + option.code);
				} else {
					var $existing_option = jQuery(settings.on_selector + ' ' + settings.option_container_selector_prefix
							+ option.code);

					if ($existing_option.length) {
						if (settings.remove_next_option) {
							$existing_option.remove();
						} else {
							$existing_option.hide();
						}
					}

					var sort_how = settings.value_sort[option.code];

					if (sort_how == 'sku_order') {
						var options = obj.findAvailableValuesForOptionBySkuOrder(option.code);
					} else {
						var options = obj.findAvailableValuesForOption(option.code);
					}

					if ($existing_option.length) {
						console.log('re-rendering option ' + option.code, options);
					} else {
						console.log('rendering option ' + option.code, options);
					}

					settings.optionRenderer(obj, option, options);
				}

				remove_successive = true;
			}
		}
	}

	/**
	 * if you need to programmatically select an option, call this. selects the value for the given option code, and unsets all
	 * the successive options. any options before the "option_code" are untouched.
	 * 
	 * NOTE: this doesn't do any UI-related stuff. this *just* picks the option. it doesn't change any dropdowns or anything. it's
	 * actually just easier to click() the element rather than call this function directly since the click() will take care of
	 * everything else visually as well.
	 * 
	 * @param do_not_unset_successive by default, we unset all the successive options. if true, we do not
	 */
	this.selectOption = function(option_code, value, do_not_unset_successive) {
		if (typeof option_code === 'undefined' || option_code == null) {
			return;
		}

		if (typeof do_not_unset_successive === 'undefined') {
			do_not_unset_successive = false;
		}

		console.log(((value != null && value !== '' && value != 'null')? '' : 'not ') + 'selecting ' + option_code + ' with value "' + value + '"' + ((value!= null && value !== '' && value != 'null')? '' : ' (because null)'));

		// we need to re-include all the skus before excluding them.
		resetExcluded(settings.options_product_info.skuInfos);

		var unset_successive = false;

		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			var option = settings.options_product_info.allOptions[i];

			if (option.code.toUpperCase() == option_code.toUpperCase()) {
				if (value!= null && value !== '' && value != 'null') {
					option.selected_value = value;
				} else {
					option.selected_value = null;
				}

				if (!do_not_unset_successive) {
					unset_successive = true;
				}
			} else if (unset_successive) {
				// console.log('unselected next option ' + option.code);
				option.selected_value = null;
			}
		}

		// everything after the option_code should be all unset (incl. possibly the option_code)

		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			var option = settings.options_product_info.allOptions[i];

			// need to exclude based on option code and and whether a value is selected or not.
			for (var x = 0; x < settings.options_product_info.skuInfos.length; x++) {
				setExcludeFlag(settings.options_product_info.skuInfos[x], option.code, option.selected_value);
			}
		}

		// console.log(settings.options_product_info);
	}

	/**
	 * attach handler
	 */
	jQuery(settings.on_selector).on('change click productoptions_trigger keyup', settings.child_selector, function(event) {
		var target = jQuery(event.target);
		var option_code = null;
		var value = null;
		
		var handled = true;
		
		if (event.key !== undefined && event.key != 'Enter') {
			handled = false;
		} else if (event.keyCode !== undefined && event.keyCode != '13') {
			handled = false;
		}
	
		if (handled) {
			if (target.is('select')) {
				option_code = target.prop('name');
				value = target.val();
			} else if (target.is('input[type="radio"]')) {
				if (event.type == 'change') {
					console.log('you are advised to deal with click rather than change for radio/checkbox');
				}
	
				option_code = target.prop('name');
				value = target.val();
			} else {
				option_code = target.data('product_option.option_code');
				value = target.data('product_option.value');
			}
	
			console.log('handling event "' + event.type + '" on ' + target.prop('tagName') + ' for ' + option_code + ' : ' + value);
	
			if (typeof option_code === 'undefined' || option_code == null) {
				return settings.propagate_event;
			}
	
			obj.selectOption(option_code, value);
	
			// even if the option is unselected, we need to call this function so that all
			// successive options are removed. if the option is unselected, we want to skip
			// render b/c we'd just re-render the option that we just unset.
			obj.renderNextOption(value === '');
	
			if (settings.optionChangeHandler != null) {
				settings.optionChangeHandler(event, obj, option_code, value, target);
			}
	
			return settings.propagate_event;
		}
	});

	/**
	 * call this if you just want the first sku (don't care which one). comes in handy sometimes.
	 */
	this.getFirstSku = function(include_excluded) {
		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];

			if (include_excluded || !sku_info.excluded) {
				return sku_info;
			}
		}

		return null;
	}

	/**
	 * e.g., useful if you want any sku that's color blue
	 */
	this.getAnyMatchingSku = function(option_code, value, include_excluded) {
		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];

			if (include_excluded || !sku_info.excluded) {
				for (var i = 0; i < sku_info.options.length; i++) {
					if (sku_info.options[i].code == option_code && sku_info.options[i].optionValue.value == value) {
						return sku_info;
					}
				}
			}
		}

		return null;
	}

	this.getSku = function(item_id) {
		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];

			if (!sku_info.excluded) {
				if (sku_info.itemId == item_id) {
					return sku_info;
				}
			}
		}

		return null;
	}

	/**
	 * Useful if you want to blindly retrieve the first sku with a matching item_id
	 */
	this.getFirstSkuByItemId = function(item_id) {
		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];

			if (sku_info.itemId == item_id) {
				return sku_info;
			}
		}

		return null;
	}

	/**
	 * returns null if none or more than one sku is not excluded or if not all options have been selected.
	 */
	this.getOneAndOnlySku = function() {

		// make sure all options have been picked
		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			if (settings.options_product_info.allOptions[i].selected_value == null) {
				return null;
			}
		}

		var sku_info = null;

		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var si = settings.options_product_info.skuInfos[o];

			if (!si.excluded) {
				if (sku_info == null) {

					// first not-excluded item
					// if there's only one sku left, we should only get here once
					sku_info = si;
				} else {
					console.log('found more than one non-excluded item: ' + sku_info.itemId + ' and ' + si.itemId);
					return null;
				}
			}
		}

		return sku_info;
	}

	/**
	 * returns lowest priced item if include_excluded is true, then we are going to get the lowest priced item regardless of
	 * currently selected options
	 */
	this.getLowestPricedItem = function(include_excluded) {
		if (typeof include_excluded === 'undefined') {
			include_excluded = false;
		}

		var item;

		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];

			if (include_excluded || !sku_info.excluded) {
				if (item == null || sku_info.price < item.price) {
					item = sku_info;
				}
			}
		}

		return item;
	}

	/**
	 * returns lowest priced A item if include_excluded is true, then we are going to get the lowest priced item regardless of
	 * currently selected options
	 */
	this.getLowestPricedAItem = function(include_excluded) {
		if (typeof include_excluded === 'undefined') {
			include_excluded = false;
		}

		var item;

		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			if (include_excluded || !settings.options_product_info.skuInfos[o].excluded) {
				if (item == null || settings.options_product_info.skuInfos[o].price_a < item.price_a) {
					item = settings.options_product_info.skuInfos[o];
				}
			}
		}

		return item;
	}

	/**
	 * returns lowest list-priced item if include_excluded is true, then we are going to get the lowest list priced item
	 * regardless of currently selected options
	 */
	this.getLowestListPricedItem = function(include_excluded) {
		if (typeof include_excluded === 'undefined') {
			include_excluded = false;
		}

		var item;

		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];

			if (include_excluded || !sku_info.excluded) {
				if (item == null || sku_info.listPrice < item.listPrice) {
					item = sku_info;
				}
			}
		}

		return item;
	}

	/**
	 * useful if you want to display a message about missing option.
	 */
	this.getFirstUnselectedOption = function() {
		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			var option = settings.options_product_info.allOptions[i];

			if (option.selected_value == null) {
				return option;
			}
		}

		return null;
	}

	/**
	 * the whole shebang.
	 */
	this.getProductInfo = function() {
		return settings.options_product_info;
	}

	/**
	 * find matching sku filtered by options. Partial list of options is accepted. ex option : {"COLOR" : "BLACK"}
	 */
	this.getAnyMatchingSkuByOptions = function(options, include_excluded) {
		var sku = null;

		if (options) {
			for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
				var sku_info = settings.options_product_info.skuInfos[o];

				if (include_excluded || !sku_info.excluded) {
					var matches = true;

					$.each(options, function(key, value) {
						console.log('trying to match option for ' + key + ' with value of ' + value);
						var optionFound = false;

						for (var i = 0; i < sku_info.options.length; i++) {
							var option = sku_info.options[i];

							if (option.code == key) {
								optionFound = true;
							}

							if (option.code == key && option.optionValue.value != value) {
								console.log('option ' + key + ' does not match with value ' + option.optionValue.value
										+ ' moving on to the next sku');
								matches = false;
								return false;
							}
						}

						// this product doesn't have this option
						if (!optionFound) {
							console.log('option ' + key + ' not found, moving on to the next sku');
							matches = false;
							return false;
						}
					});

					if (matches) {
						sku = sku_info;
						break;
					}
				}
			}
		} else {
			sku = obj.getFirstSku(include_excluded);
		}

		return sku;
	}

	this.getAllMatchingSkusByOptions = function(options, include_excluded) {
		var skus = [];

		if (options) {
			for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
				var sku_info = settings.options_product_info.skuInfos[o];

				if (include_excluded || !sku_info.excluded) {
					var matches = true;

					$.each(options, function(key, value) {
						console.log('trying to match option for ' + key + ' with value of ' + value);
						var optionFound = false;

						for (var i = 0; i < sku_info.options.length; i++) {
							var option = sku_info.options[i];

							if (option.code == key) {
								optionFound = true;
							}

							if (option.code == key && option.optionValue.value != value) {
								console.log('option ' + key + ' does not match with value ' + option.optionValue.value
										+ ' moving on to the next sku');
								matches = false;
								return false;
							}
						}

						// this product doesn't have this option
						if (!optionFound) {
							console.log('option ' + key + ' not found, moving on to the next sku');
							matches = false;
							return false;
						}
					});

					if (matches) {
						skus.push(sku_info);
					}
				}
			}
		} else {
			skus.push(obj.getFirstSku(include_excluded));
		}

		return skus;
	}
	
	/**
	 * returns selected option(s) and the corresponding value like { COLOR : "BLUE", SIZE : "M" }
	 */
	this.getSelectedOptions = function() {
		var selectedOptions = {};

		for (var i = 0; i < settings.options_product_info.allOptions.length; i++) {
			var option = settings.options_product_info.allOptions[i];

			if (option.selected_value != null) {
				selectedOptions[option.code] = option.selected_value;
			}
		}

		return selectedOptions;
	}

	/**
	 * returns true if item is live, and in stock, with a quantity greater than zero
	 */
	this.isAvailable = function(item_id) {
		for (var o = 0; o < settings.options_product_info.skuInfos.length; o++) {
			var sku_info = settings.options_product_info.skuInfos[o];
			if (sku_info.itemId == item_id) {
				return (sku_info.live && sku_info.inStock && sku_info.qtyAvailable > 1);
			}
		}
		return false;
	}
}

/**
 * a lot simpler than constructProductOptions()
 * 
 * @param options
 * @param productid
 * @param callback
 */
function simpleProductOptions(options, productid, callback) {
	ajaxWithoutAuth(js_site_var['cart_domain'] + js_site_var['context_path'] + '/app/product/inventory/' + productid + '.json',
			null, 'GET', function(data) {
				options['inventory_product_info'] = data.productInfo;
				var product_options = new ProductOptions(options);

				if (typeof callback !== 'undefined' && callback != null) {
					callback(product_options);
				}
			});
}

/**
 * DEPRECATED use simpleProductOptions()
 * 
 * pass in null if you want to use defaults every successive parameter is optional callback is called after everything is done.
 * 
 * Not compatible with multiple products.
 */
function constructProductOptions(skus, callback, optionRenderer, optionChangeHandler, allOptionsSorter, remove_next_option,
		exclude_out_of_stock, on_selector, option_container_selector_prefix, child_selector) {
	ajaxWithoutAuth(js_site_var['cart_domain'] + js_site_var['context_path'] + '/app/product/inventory/' + skus.productDatas[0].productId
			+ '.json', null, 'GET', function(data) {
		var options = new Object();
		options['options_product_info'] = skus;
		options['inventory_product_info'] = data.productInfo;

		if (typeof exclude_out_of_stock !== 'undefined') {
			options['exclude_out_of_stock'] = exclude_out_of_stock;
		}

		if (typeof remove_next_option !== 'undefined') {
			options['remove_next_option'] = remove_next_option;
		}

		if (typeof optionRenderer !== 'undefined' && optionRenderer != null) {
			options['optionRenderer'] = optionRenderer;
		}

		if (typeof option_container_selector_prefix !== 'undefined' && option_container_selector_prefix != null) {
			options['option_container_selector_prefix'] = option_container_selector_prefix;
		}

		if (typeof allOptionsSorter !== 'undefined' && allOptionsSorter != null) {
			options['allOptionsSorter'] = allOptionsSorter;
		}

		if (typeof on_selector !== 'undefined' && on_selector != null) {
			options['on_selector'] = on_selector;
		}

		if (typeof child_selector !== 'undefined' && child_selector != null) {
			options['child_selector'] = child_selector;
		}

		if (typeof optionChangeHandler !== 'undefined' && optionChangeHandler != null) {
			options['optionChangeHandler'] = optionChangeHandler;
		}

		product_options = new ProductOptions(options);

		if (typeof callback !== 'undefined' && callback != null) {
			callback(product_options);
		}
	});
}
