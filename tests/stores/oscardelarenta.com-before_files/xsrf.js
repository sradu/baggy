// This script file should be included after JQuery
// The Anti Cross Site Request Forgery (XSRF) token is retrieved dynamically so that page caching does not affect a user's token

var g_antiXsrfToken = null;

// Retrieve the token asynchronously to block any requests until the token can be set
$.ajax({
	type: "GET",
	url: "/api/User/GetAntiXsrfToken",
	async: false,
	success: function (token) {
		g_antiXsrfToken = token;

		$.ajaxSetup({
			headers: {
				'X-XSRF-TOKEN': g_antiXsrfToken
			}
		});

	},
	error: function (error) {
		console.error("Failed to retrieve XSRF token.");
	}
});

// Each form on the site should contain a hidden field with the ID = hdnAntiXsrfToken
$(function () {
	$('#hdnAntiXsrfToken').val(g_antiXsrfToken);
});

