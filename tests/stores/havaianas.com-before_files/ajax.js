
$(document).ready(function() {
	$('[data-ajax-html]').each(function(idx, value) {
		ajaxWithoutAuth($(value).data('ajax-html'), null, 'GET', function(el) {
			return function(data) {
				$(el).html(data);
			}
		}(this));
	});
});

/**
 * we CANNOT use jQuery's "cache: false" because it appends a "_" parameter which breaks Spring when it comes to binding.
 */
function cachebust(data) {
	if (data == null) {
		data = new Object();
	}

	if (typeof data === 'string') {
		if (data.length > 0 && data.charAt(data.length - 1) != '&') {
			data += '&';
		}

		data += 'cachebust=' + new Date().getTime();
	} else {
		data['cachebust'] = new Date().getTime();
	}

	return data;
}

/**
 * data can be something like $(form_selector).serialize()
 * 
 * @param method e.g., 'POST' or 'GET'
 */
function ajaxWithAuth(url, data, method, success, auth_handler) {
	data = cachebust(data);

	$.ajax(url, {
		type : method,
		data : data,
		success : function(data, textStatus, jqXHR) {
			console.log(jqXHR.getResponseHeader('auth_exception'));

			if (jqXHR.getResponseHeader('auth_exception') == null) {
				success(data, textStatus, jqXHR);
			} else {
				if (auth_handler === undefined) {
					window.location.href = js_site_var['context_path'] + '/app/account/login';
				} else {
					auth_handler();
				}
			}
		},
		error : function(jqXHR, text_status, error_thrown) {
			console.log(jqXHR);
			console.log(text_status);
			console.log(error_thrown);
		}
	});
}

/**
 * data can be something like $(form_selector).serialize() this is just here for convenience, you don't have to call this
 * function.
 * 
 * @param method e.g., 'POST' or 'GET'
 * @param data_type e.g., 'json'
 */
function ajaxWithoutAuth(url, data, method, success, data_type) {
	data = cachebust(data);
	var opt = {
		type : method,
		data : data,
		success : success,
		error : function(jqXHR, text_status, error_thrown) {
			console.log(jqXHR);
			console.log(text_status);
			console.log(error_thrown);
		}
	};

	if (typeof data_type !== 'undefined') {

		// e.g. 'json'
		opt.dataType = data_type;
	}

	$.ajax(url, opt);
}

/**
 * data can be something like $(form_selector).serialize() this is just here for convenience, you don't have to call this
 * function.
 *
 * can optionally pass in headers e.g.:
 *   {"Accept" : "application/json", "Content-Type" : "application/json"}
 *
 * @param method e.g., 'POST' or 'GET'
 * @param data_type e.g., 'json'
 */
function ajaxWithoutAuthWithHeaders(url, data, method, headers, success, data_type) {
	data = cachebust(data);

	var opt = {
		type : method,
		data : data,
		headers : headers,
		success : success,
		error : function(jqXHR, text_status, error_thrown) {
			console.log(jqXHR);
			console.log(text_status);
			console.log(error_thrown);
		}
	};

	if (typeof data_type !== 'undefined') {

		opt.dataType = data_type;
	}

	$.ajax(url, opt);
}