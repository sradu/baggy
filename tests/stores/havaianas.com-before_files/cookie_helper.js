function setCookieWithHelper(isJson, cookieName, cookieValue, options) {
	// remember cookie json flag, temp fix when it is not unset
	var cookieJson = $.cookie.json;
	if (isJson) {
		$.cookie.json = true;
	} else {
		$.cookie.json = false;
	}

	var defaultRaw = $.cookie.raw;
	if(options != undefined && options != null && options.raw != undefined) {
		$.cookie.raw = options.raw;
	}
	$.cookie(cookieName, cookieValue, options);

	// reset original cookie json flag
	$.cookie.json = cookieJson;
	$.cookie.raw = defaultRaw;
};


function getCookieWithHelper(isJson, cookieName) {
	// remember cookie json flag, temp fix when it is not unset
	var cookieJson = $.cookie.json;
	if (isJson) {
		$.cookie.json = true;
	} else {
		$.cookie.json = false;
	}
	
	var cookieValue =  $.cookie(cookieName);
	
	// reset original cookie json flag
	$.cookie.json = cookieJson;
	
	return cookieValue;
};
