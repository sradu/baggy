var nonPrimaryLocale = '';
var emptyRegex = /([^\s])/;

/* Soasta Configuration for Non-SPA Apps  */
window.BOOMR_config = {
    autorun: false,
    History : {
        enabled: false
    }
};


if ($("#nonPmyLocale")[0] && emptyRegex.test($("#nonPmyLocale").val())) {
  nonPrimaryLocale = $($("#nonPmyLocale")[0]).val();
} else if ($("#nonPrimaryLocale")[0] && emptyRegex.test($("#nonPrimaryLocale").val())) {
  nonPrimaryLocale = $($("#nonPrimaryLocale")[0]).val();
}

var headerURL = window.headerURL || nonPrimaryLocale + '/headerComponent';
var footerURL = window.footerURL || nonPrimaryLocale + '/footerComponent';

function footerAjax() {
    return $.ajax({
      method: 'GET',
  		url: footerURL,
  		success: function(response) {
  			$(".footer_container").append(response);
  		},
      error: function(response) {
        console.log("FOOTER COMPONENT ::: Failing in AJAX call for fetching footer");
      }
    });
}
function headerAjax() {
    return $.ajax({
      method: 'GET',
  		url: headerURL,
  		success: function(response) {
  			$(".header_container").append(response);
  		},
      error: function(response) {
        console.log("HEADER COMPONENT ::: Failing in AJAX call for fetching header");
      }
    });
}

$.when(footerAjax(), headerAjax()).done(function(){
    window.__INITIAL_STATE__ = $.extend({}, window.headerInitialState, {footer: window.footerInitialState.footer} );
	$.getScript('/assets/vendor.js');
	$.getScript('/assets/app.js');
});
