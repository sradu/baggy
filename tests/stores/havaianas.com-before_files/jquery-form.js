$(function() {
	$(document).on('click', '[data-swf-event]', function(event) {
		var $target = $(event.currentTarget);

		// we don't disable the element b/c for a submit button, it will keep the form from being submitted
		// after we've disabled it here.
		// so we do it via CSS classes
		if ($target.hasClass('acdc-prevent-double-submission')) {
			if ($target.hasClass('acdc-prevent-double-submission-submitted')) {
				console.log('already submitted');
				return false;
			}
		}

		var swf_event = $target.data('swf-event');
		var swf_form_selector = $target.data('swf-form-selector');

		if (swf_event && swf_event != '') {
			$target.addClass('acdc-prevent-double-submission-submitted');
			console.log('submitting event ' + swf_event);
			return submitEvent(swf_event, swf_form_selector);
		}
	});
});

function get_form_values(form_id) {
	return $('#' + form_id).serialize();
}

function append_hidden_field(elementID, fieldName, fieldValue) {
	$('#' + elementID).append('<input type="hidden" name="' + fieldName + '" value="' + fieldValue + '">');
}

/**
 * sets, instead of appending.
 */
function set_hidden_field(elementID, fieldName, fieldValue) {
	$('#' + elementID).html('<input type="hidden" name="' + fieldName + '" value="' + fieldValue + '">');
}

/**
 * same as append_hidden_field() but this will let you set the hidden field's id for things like easy removal.
 */
function append_hidden_field_with_id(append_id, name, value, element_id) {
	$('#' + append_id).append('<input type="hidden" name="' + name + '" value="' + value + '" id="' + element_id + '">');
}

function create_and_submit_form(url, params) {
	var $form = $("<form method='POST'>").attr("action", url);
	$.each(params, function(name, value) {
		$("<input type='hidden'>").attr("name", name).attr("value", value).appendTo($form);
	});
	$form.appendTo("body");
	$form.submit();
}

/**
 * useful for SWF - attach as onclick on <a> tags. just looks for the first hidden div within the #command form and adds a hidden
 * element. appends a hidden div if not found
 */
function submitEvent(event, form_selector) {
	if (event.indexOf('_eventId_') !== 0) {
		event = '_eventId_' + event;
	}

	if (typeof form_selector === 'undefined' || form_selector == null || form_selector == '') {
		form_selector = '#command';
	}

	if ($(form_selector + ' > div:hidden').length == 0) {
		$(form_selector).prepend('<div style="display: none"></div>');
	}

	$(form_selector + ' > div:hidden:first').append('<input type="hidden" name="' + event + '" value="value" />');
	$(form_selector).submit();
	return false;
}

/**
 * @param event doesn't have to being with '_eventId_'
 * @param handler if undefined/null, just calls a "blank" function
 * @param form_id '#command' by default
 * @returns {Boolean}
 */
function submitAjaxEvent(event, handler, form_id) {
	var form_selector = '#command';

	if (typeof form_id === 'undefined' || form_id == null || form_id == '') {

		// default
	} else if (form_id.substring(0, 1) == '#' || form_id.substring(0, 1) == '.') {

		// we assume that "form_id" is actually a selector
		form_selector = form_id;
	} else {
		form_selector = '#' + form_id;
	}

	if ($(form_selector + ' > div:hidden').length == 0) {
		$(form_selector).append("<div style='display: none'></div>");
	}

	// get the action of the form
	var action = $(form_selector).attr('action');

	// location.protocol would be 'https:' or 'http:'
	action = action.replace(/^http+:/i, location.protocol);
	// console.log(action);

	if (event.indexOf('_eventId_') !== 0) {
		event = '_eventId_' + event;
	}

	if (typeof handler === 'undefined' || handler == null) {
		handler = function() {
		};
	}

	$(form_selector + ' > div:hidden:first').append('<input type="hidden" name="' + event + '" value="value" />');
	$.post(action, $(form_selector).serialize(), handler);
	return false;
}

/**
 * @deprecated THIS IS TOO SIMPLE. IT ASSUMES YOU WILL ALWAYS WRITE THE DATA TO THE SAME ELEMENT REGARDLESS OF WHETHER IT'S
 *             SUCCESSFUL OR NOT. DO NOT USE THIS. CALL submitAjaxEvent() instead.
 */
function submitEventAjax(toFill) {
	$.post($("#command").attr('action'), $("#command").serialize(), function(data) {
		$("#" + toFill).html(data);
	});
}

/**
 * @param selector the element to attach event listener
 * @param el_selector the element we'll submit or click
 */
function attachEnterKey(selector, el_selector) {
	jQuery(selector).keypress(function(event) {
		if (event.which === 13) {
			var target = jQuery(event.target);

			if (target.is('input')) {
				var el = jQuery(el_selector);

				if (el.is('form')) {
					console.log('submitting form ' + el_selector);
					el.submit();
				} else {
					console.log('clicking ' + el_selector);
					el.click();
				}
			} else {
				console.log('target is not input, ignoring');
			}
		}
	});
}
