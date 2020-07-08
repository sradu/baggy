$(document).ready(function () {
	if (!getCookieWithHelper(false, 'linkDepth')) {
		setCookieWithHelper(false, 'linkDepth', 0, { path: '/' });
	} else {
		try {
			var linkDepth = parseInt(getCookieWithHelper(false, 'linkDepth'));
			setCookieWithHelper(false, 'linkDepth', ++linkDepth, { expires: 30, path: '/' });
		} catch (error) {
			setCookieWithHelper(false, 'linkDepth', 0, { expires: 30, path: '/' });
		}
	}
	checkEmailPopup();
});

function signUpPopupSubmit(data){
	if(data == 'success'){
		var email = $('#subscriber\\.email').val();
		subscriptionSuccess({email: email, location: 'pop up'});
	}else{
		$('.fancybox-inner').html(data);
		$('#newsletter-row').append('<p id="subscribe_warning" style="color:#ff8080;">You are either already subscribed or there is an issue with your email address.</p>');
		initializeEmailSignupPopup();
	}
}

function subscriptionFooterSuccess(data) {
	data.location = 'footer';
	subscriptionSuccess(data);
}

function subscriptionSuccess(data) {
	$('.fancybox-overlay #newsletter-row').html('<div>Your email address has been subscribed.</div>');
	$('#subscribe_terms_checkbox').html("<h3 style='color:white;'>You've been subscribed. Thank you!</h3>");
	$('#q.subscribe-field').val('');

	$('.popup-head-subscribe .subscribe-title').text('You\'re On The List!');
	$('.subscribe-body-text .default-text').hide();
	$('.subscribe-body-text .subscribe-success-text').show();

	setTimeout(function() {
		$.fancybox.close();
	}, 3000);

	setCookieWithHelper(false, 'newsletterpopupSignup', 'true', { expires: 30, path: '/' });
	data.accountType = 'lightbox_signup';
	data.newsletter = true;
	zetaTracking(data);
}

function subscriptionSuccessWidget(data) {
	$('#subscribe_terms_checkbox-widget').html("<h3>You've been subscribed. Thank you!</h3>");
}

function subscriptionFailure(data) {
	var error_msg = 'The email address is not valid or is already on our mailing list.';
	$('#subscribe_warning').remove();
	$('#subscribe_terms_checkbox').append('<p id="subscribe_warning" style="color:#ff8080;">You are either already subscribed or there is an issue with your email address.</p>');
	if (data.outcome == 'valError') error_msg = data.m;
	$('.fancybox-overlay #newsletter-popup-error').css('display','block').html(error_msg);
}

function toggleDisabled() {
	var privacyPolicyChecked = $('#field-privacy-policy').prop('checked') || $('#field-privacy-policy-1').prop('checked')
	$('.subscribe .subscribe-btn').prop('disabled', !privacyPolicyChecked );
}

function checkEmailPopup(){
    $('#newsletter_popup_form').on('submit',function(event){
        event.preventDefault() ;
    });
	if (!$.cookie('newsletter') && $(window).width() > 768) {

		$.fancybox({
			maxWidth	: '100%',
			width		: '500px',
			height		: 'auto',
			autoSize	: false,
			transitionIn: 'fade',
			transitionOut: 'fade',
			type: 'ajax',
			href: js_site_var['context_path'] + '/app/subscription/anonSignup',
			afterShow: initializeEmailSignupPopup
		});

		setCookieWithHelper(false, 'newsletter', JSON.stringify({ created_on: new Date().toString(), isFinshed: false }), { expires: 30, path: '/' });
	}
}

function signupNewsletterCookie() {
	$('.fancybox-overlay #newsletter-popup-error').css('display','none').html('');
	try {
		popupNewsletterSubmit();
	} catch (err) {
		console.log(err);
	}
}

function initializeEmailSignupPopup(){
	var image = new Image();

	var headSrc = $(".popup-head").css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
	image.src = headSrc;
	$(".popup-head").css({"width":image.width, "height":image.height});

	var formHeadSrc = $(".form-head").css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
	image.src = formHeadSrc;
	//$(".form-head").css({"width":image.width, "height":image.height});

	var formBodySrc = $(".form-body").css('background-image').replace('url(','').replace(')','').replace(/\"/gi, "");
	image.src = formBodySrc;
	//$(".form-body").css({"width":image.width, "height":image.height});
}
