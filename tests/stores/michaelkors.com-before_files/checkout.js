var omni_error_track_restrict3 = false;
var localeName = $("#nonPrimaryLocale").val();
var mobileRequest = $("#isMobileRequest").val();
if (localeName == null) {
	localeName = "";
}
sessionexpurl = "";
internalServerError = "";
// if(mobileRequest == 'true'){
// 	sessionexpurl=localeName + '/myaccount/createAccount.jsp?error=409';
// 	internalServerError=localeName +'/common/serverError.jsp';
// } else {
// 	sessionexpurl=localeName + '/myaccount/createAccount.jsp?error=409';
// 	internalServerError=localeName +'/common/serverError.jsp';
// }

sessionexpurl=localeName + '/myaccount/createAccount.jsp?error=409';
internalServerError=localeName +'/common/serverError.jsp';

$(document).ready(function(){
	if(($("#signInConfirmationSuccessDTM").length)>0){
		 if (window.location.href.indexOf("isReload=true") > -1) {
			 var onLanding = false;
			 createRegistraionSuccessDTM(onLanding);
		    }

	}


	if(($("#completeShoppingBag").length)>0){
		$(".loyality_checkout").load("/checkout/includes/loyaltyPointsShow.jsp");
		$(".reflektion_checkout").load(localeName+'/checkout/includes/cartProductRecs.jsp?nonPrimaryLocale='+localeName, function() {
			responseReset();
			/*ECB-18111*/
			rfkmkorsdataResponse();
		});
		if(!($(".reflektion_checkout").length)>0){
			console.log("Firing from reflektion_checkout empty div");
			sendCustomEvent('dataLayerReady');
		}
	}
	//Start : added for ajax overlay on click of AJAX call
	$(document).ajaxStart(function() {
		var overlay = $('<div></div>').addClass('ajax_overlay');
		$('body').append(overlay);
	}).ajaxStop(function() {
		setTimeout(function(){ $('.ajax_overlay').remove();}, 1000);
	});
	//End : added for ajax overlay on click of AJAX call
	hideMessage();

	//Starts - Added for MKCAB-28 - Custom Product
	if(($('input#showCustomUpdateMsg').val()!='' )&& typeof ($('input#showCustomUpdateMsg').val()!= undefined) && ($('input#showCustomUpdateMsg').val()=="yes")) {
		localStorage.setItem("cartUpdatesuccessmsg",'true');
	}
	customProdTooltipInit();
	function customProdTooltipInit(){
		var custProdTooltipContent=$(".customToolTip").html();
		$('.customToolTipTag').each(function(key,value){
			var currentObj = $(this);
			var currentClass = "customToolTipTag-";
			currentClass = currentClass+key;
			currentObj.addClass(currentClass);
			$('.'+currentClass).tooltip({
				placement: 'bottom',
				html: true,
				container: $('.'+currentClass),
				title: custProdTooltipContent,
				trigger: 'hover'
			});
		});
	}
	//Ends - Added for MKCAB-28 - Custom Product

	// ECB-13758
	$("#addr-1").on('input', function(){
		var input = $(this);
		$('.suggestions-help-js').empty();
		var value = input.val();
		var searchResults = $(".pac-container").first().children().length;
		var searchResultsDisplay = $(".pac-container").first()[0].style.display;

		if (value && searchResults !== 0 && searchResultsDisplay !== 'none'){
			$('.suggestions-help-js').text('There are suggestions. Use the up and down arrows to browse.');
		} else {
			$('.suggestions-help-js').empty();
		}
	});

	$("#addr-1").on('focusout', function(){
		$('.suggestions-help-js').empty();
	});
	// END ECB-13758

	/*
	* slick initialize option <waseem>
	*/
	var mkoptions = {
		slick: {
		  dots: false,
			infinite: false,
			speed: 300,
			slidesToShow: 4,
			slidesToScroll: 4,
			adaptiveHeight: true,
			responsive: [{
				breakpoint: window.KOR.breakpoints.lg,
				settings: {
				  slidesToShow: 4,
				  slidesToScroll: 4,
				  infinite: true
				}
			  }, {
				breakpoint: window.KOR.breakpoints.md,
				settings: {
				  slidesToShow: 3,
				  slidesToScroll: 3
				}
			  }, {
				breakpoint: window.KOR.breakpoints.xs,
				settings: {
				  slidesToShow: 2,
				  slidesToScroll: 2,
				  arrows: false
				}
			  }
			  // You can unslick at a given breakpoint now by adding:
			  // settings: 'unslick'
			  // instead of a settings object
			]
		}
	};
	$('body').on("click", "#viewFullSiteLink", function(e) {
		e.preventDefault();
		$("form#viewFullSite").submit();
	});
	$('.successMessage p').hide();
	initializeEditAddMonoLink();

	$(document).on('click', '.removeMonoFromBag', function(e) {
		e.preventDefault();
		hideMessage();
		$.ajax({
			url: $(this).attr('href'),
			type: "post",
			dataType: "json",
			success: function(data) {
				if("failure" == data.result){
					var errors = data.errors;
					$('.alert-message--error').removeClass("hidden");
					for(i in errors){
						$('.serverErrors').html(errors[i].message);
						$('.serverErrors').show();
						$('.noLongerErrorMsg').hide();
						$('.ajaxErrorMessage').hide();
					}
				} else {
					$.ajax({
						url: localeName+'/checkout/includes/shoppingCartInclude.jsp',
						type:'POST',
						dataType: "text",
						success: function(data) {
							$('#completeShoppingBag').html(data);
							$('.itemRemove').show();
							if(disabledRR == 'true') {
								$("#shopping-bag-container").show();
							}
							var enableApple = true;
							var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
							if(disableCheckoutMaxQty == "true"){
								enableApple = false;
							}
							if (window.ApplePaySession && enableApple) {
							  	var merchantIdentifier = $("#merchantIdentifier").val();
							  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
							  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
							  		promise.then(function (canMakePayments) {
							  			if (canMakePayments){
							  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
							  				$(".apple-pay-button").removeClass("hidden");
							  				$("#applePay-payment-method").removeClass("hidden");
							  			}
							  		});
							  	}
							}

							$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $("select#shippingMethod").val()}, function(data) {
								$.ajax({
									url : localeName + '/checkout/common/orderSummaryOnCheckout.jsp',
									type : "post",
									dataType : "html",
									cache : false,
									success : function(data) {
										$("#summary").html(data);
										$(".shopping-bag-order-summary-details").find('.selectpicker').selectpicker();
									}
								});
							});

							responseReset();
							$('.successMessage').show();
							$('.successMessage p').hide();
							$('.successMessage , .successMessage .monogram').show();
							screenLiveAnnounce($('.successMessage .monogram').text());
							initializeEditAddMonoLink();
							if(disabledRR == 'false') {
								initRREvent();
							}
							console.log("CALLING DY SPA");
							DY.API('spa', {
								context: {
									type: 'CART',
					      	data: DY.recommendationContext.data
								},
								url: window.location.href,
								countAsPageview: true
							});
						}
					});
				}

			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
		});
	});

	$('body').on("click", 'a.remove-gift-card-Link', function(e){
		e.preventDefault();
		$("form#delete-giftcard-form").find("#giftCardId").val($(e.currentTarget).attr('data-giftCardId'));
		ajaxFormSubmit($("form#delete-giftcard-form"));
	});

    $('body').on("click", 'a.order-review-dummy-button', function(e){
        e.preventDefault();
        if (typeof store !== undefined) {
          store.remove('minicart');
        }
        $("#place-order-button").click();
    });
    /*<dattaprasad> MKCAB-11 for edit paypal button on 27-07-2016 starts*/
    $(document).on("click",".edit-paypal-btn",function(e){
        e.preventDefault();
        ajaxFormSubmit($("form#paymentEdit_form"));
    });
    /*<dattaprasad> MKCAB-11 for edit paypal button starts*/

	var disableCheckout = $('#disableCheckout').val();
	if(disableCheckout == "true"){
		if($("p.itemOutOfStock").length > 0){
			$('.noLongerErrorItem').removeClass('hidden');
			$('.noLongerErrorMsg').show();
		}
		$('.ajaxErrorMessage').hide();
		$('.serverErrors').hide();
	}

	var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
	if(disableCheckoutMaxQty == "true"){
		$('#maxOrderQtyExceedError').removeClass('hidden');
		$('#maxOrderQtyExceedError .alert-message--error').removeClass('hidden');
	}
	/*
	* ajax submit
	*/
	function ajaxFormSubmit(form){
		formId = $(form).attr("id");
		var prevItemCount = $(form.commerceItemCount).attr("value");
		var storeId=null;
		if(formId == "updateCart"){
			 if ($('input[name="shiptoaddress"]').length > 0) {
					if($('input[name="shiptoaddress"]')[0].checked){
						$('#updateToBagLocationId').val(null);
					}
					var shipmentMethod = $("input[name='shiptoaddress']:checked").val();
					$("#shippingMethodType").val(shipmentMethod);
				}
			for(var i=0; i<$('input[name="availstore"]').length; i++){
				if($('input[name="availstore"]')[i].checked){
					storeId = $('input[name="availstore"]')[i].value;
				}
			}
			if(storeId != undefined && storeId != '' && storeId != null){
				$('#updateToBagLocationId').val(storeId);
			}
		}
		if(formId =="orderPromotionFormForMobile") {
		if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
                   var dtmpromo = $(form).find('#shopping-bag-promo').val();
					var prcodeType = "shoppingCart";
					if($("#completeShoppingBag").length == 0) {
								prcodeType = $('.mobile-nav .arrow-container.current > button').attr("href") == "#shipping" ? "shipping" : "billing";
							}
					promoCodeSuccess(prcodeType,dtmpromo);
				}
		}
		if(formId == "addCartItem"){
			if ($('input[name="shiptoaddress"]').length > 0) {
				if($('input[name="shiptoaddress"]')[0].checked){
					$('#addToBagLocationId').val(null);
				}
			}
			for(var i=0; i<$('input[name="availstore"]').length; i++){
				if($('input[name="availstore"]')[i].checked){
					storeId = $('input[name="availstore"]')[i].value;
				}
			}
			if(storeId != undefined && storeId != '' && storeId != null){
				$('#addToBagLocationId').val(storeId);
			}
		}
		formDataPopulation(formId);
		fieldsArray = $(form).serializeArray();
		fieldsArray.push({
			name : "formName",
			value : formId
		});
		fieldsArray = $.grep(fieldsArray, function(n, i) {
			return n.name != "successUrl";
		});
		fieldsArray = $.grep(fieldsArray, function(n, i) {
			return n.name != "errorUrl";
		});
		successUrl = $(form).find('#successUrl').val();
		errorUrl = $(form).find('#errorUrl').val();
		pageName = $(form).find('#pageFrom').val();

		$.ajax({
			url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
			type : "post",
			data : fieldsArray,
			dataType : "json",
			cache : false,
			beforeSend : function() {
				if($(form).attr('id') == 'addCartItem') {
					var val=  $(form).find('.adding_input').val();
					$(form).find('#addToBag').val(val);
				}
			},
			success : function(data) {
				if(data.result == "success"){
					$('.popUpErrorMessage .alert-message--error, .popUpErrorMessage').addClass('hidden');
					renderAjaxSuccessCallBack(data, formId, successUrl,prevItemCount);
					var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
					if(disableCheckoutMaxQty == "true"){
						$('#maxOrderQtyExceedError').removeClass('hidden');
						$('#maxOrderQtyExceedError .alert-message--error').removeClass('hidden');
					}
					responseReset();
				}
				if(data.result == "error"){
					var errors = data.errors;
					if(formId == "orderPromotionForm") {
						for(i in errors){
							$('#errorMessage').text(errors[i].message);
							$('#errorMessage').css("color","red");
							$('#errorMessage').show();
						}
						/*<dattaprasad> ECB-12702 Added on 29-06-2017 starts*/
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
							var errortTypeDTM = "use a promotion code";
							var errorMessageDTM = errors[0].message;/*<Sukraj> WEBA-1293 Added on 18-09-2019*/
							var errorPageType = "Shopping cart";
							if($("#completeShoppingBag").length == 0){
								errorPageType = $("#shippingContainer").hasClass("current") ? "checkout:shipping" : "checkout:billing";
							}
							addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
						}
						/*<dattaprasad> ECB-12702 Added on 29-06-2017 ends*/
					} else if (formId == "addCartItem") {
						for(i=0;i<data.errors.length;i++) {
		                     var message = data.errors[i].message;
		                     $('.popUpErrorMessage .ajaxErrorMessage').html(message);
		            	 }
		         		$('.popUpErrorMessage .alert-message--error, .popUpErrorMessage').removeClass('hidden');
		         		$('.popUpErrorMessage').show();
						$('.popUpErrorMessage p').hide();
						$('.popUpErrorMessage .ajaxErrorMessage').show();
						var $changedInput = $(formId).find('.changed_input');
						var val1= $(formId).find('.default_input').val();
						$changedInput.val(val1);
						var errorPageType = "";
						if(pageName == "checkout") {
							errorPageType = "checkout";
						} else {
							errorPageType = "cart";
						}
						addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
					}else if(formId == "gitcard-balance-form"){
						$("p#giftcard-error-message").text("");
						$("p#giftcard-message").hide();
						$("#giftcard-error-container").show();
						$("#giftcard-error-container .alert-message--error").removeClass("hidden").show();
						for(var key in data.errors){
							var errorMessage = $("p#giftcard-error-message").text();
							if(errorMessage != ""){
								errorMessage = errorMessage + "<br/>" +data.errors[key];
							}else{
								errorMessage = data.errors[key].message;
							}
							$("p#giftcard-error-message").text(errorMessage);
						}
						errorPageType = "checkout:billing";
						errortTypeDTM = 'Check Gift Card Balance';
						addToDTMTrackEvent(errortTypeDTM,errorMessage,errorPageType);
					}else if(formId == "apply-giftcard-form"){
                        $("p#apply-giftcard-error-message").text("");
                        $("#apply-giftcard-success-container").hide();
                        $("#apply-giftcard-error-container").show();
                        $("#apply-giftcard-error-container .alert-message--error").removeClass("hidden").show();
                        for(var key in data.errors){
                               var errorMessage = $("p#apply-giftcard-error-message").text();
                               if(errorMessage != ""){
                            	   errorMessage = errorMessage + "<br/>" +data.errors[key].message; /*GWUAT-129 <dattaprasad> fixed on 03-12-2015*/
                               }else{
                                      errorMessage = data.errors[key].message;
                               }
                               $("p#apply-giftcard-error-message").html(errorMessage);	/*GWUAT-129 <dattaprasad> fixed on 03-12-2015*/
                               $("#"+formId).find(".alert-message").show();
                        }
                        var errorPageType = "";
						errorPageType = "checkout:billing";
						errortTypeDTM = 'Check Gift Card Balance';
						addToDTMTrackEvent(errortTypeDTM,errorMessage,errorPageType);
					} else if(formId == "updateCart" || formId == "removeOutofstockItems"){
						for(i=0;i<data.errors.length;i++) {
		                     var message = data.errors[i].message;
		                     $('.popUpErrorMessage .ajaxErrorMessage').html(message);
		            	 }
		         		$('.popUpErrorMessage .alert-message--error, .popUpErrorMessage').removeClass('hidden');
		         		$('.popUpErrorMessage').show();
						$('.popUpErrorMessage p').hide();
						$('.popUpErrorMessage .ajaxErrorMessage').show();
						var errorPageType = "";
						if(pageName == "checkout") {
							errorPageType = "checkout";
						} else {
							errorPageType = "cart";
						}
						errortTypeDTM = "Giftcard";
						if((dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true") && formId == "updateCart") {/*<Sukraj> WEBA-1293 Added on 18-09-2019*/
							var errortTypeDTM = "cart update";
							var errorMessageDTM = errors[0].message;
							var errorPageType = "Shopping cart";
						}
						addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
					} else if(formId == "orderPromotionFormForMobile") {
						var errors = data.errors;
						for(i in errors){
							$('.errorMessageMobile').text(errors[i].message);
							$('.errorMessageMobile').css("color","red");
							$('#wizardPanels .slick-list').css("height","auto");/* Baskar GWSIT-486 fixed*/
							$('.errorMessageMobile').show();
						}
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){/*<Sukraj> WEBA-1293 Added on 18-09-2019*/
							var errortTypeDTM = "use a promotion code";
							var errorMessageDTM = errors[0].message;
							var errorPageType = "Shopping cart";
							if($("#completeShoppingBag").length == 0) {
								errorPageType = $('.mobile-nav .arrow-container.current > button').attr("href") == "#shipping" ? "checkout:shipping" : "checkout:billing";
							}
							addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
						}
					} else if(formId == "expressOrderForm") {
						var errors = data.errors;
						var message = "";
						$('.alert-message--error').addClass("hidden");
						$('.successMessage').hide();
						for(i in errors){
							message = message + errors[i].message + "<br/>";
						}
						$('.serverErrors').html(message);
						$('.serverErrors').show();
						$("#error-container").removeClass('hidden');
						$('.noLongerErrorMsg').hide();
						$('.ajaxErrorMessage').hide();
						var errorPageType = "";
						if(pageName == "checkout") {
							errorPageType = "checkout";
						} else {
							errorPageType = "cart";
						}
						addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
					}else if(formId == "socialCheckoutSignin" || formId == "socialCreateProfileForm" || formId == "socialCheckEmailForm" || formId == "socialSignInDropDown"){
						$('#'+formId+' input[type="password"]').on('focus click',function(){
							var txtBoxId = $(this).attr('id');
							$('label[for="'+txtBoxId+'"]').eq(1).hide().removeClass('error');

						});
						for(i in errors){
							if(formId == 'socialCheckoutSignin'){
								$('#'+formId).find('label[for="' + errors[i].propertyName + '"]').eq(1).text(errors[i].message);
							}else{
								$('#'+formId).find('label[for="' + errors[i].propertyName + '"]').eq(1).text(errors[i].message).addClass('error');
							}
						}

					}
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}

		});
	}

	function renderAjaxSuccessCallBack(data, formId, successUrl,prevItemCount){
		switch (formId) {
			case "customProdRemove" :
				localStorage.setItem("customProdRemove",'true');
				location.href = successUrl+"?isEditCart=true";//Added for to call order re-price
				break;
			case "updateCart" :
				localStorage.setItem("cartUpdatesuccessmsg",'true');
				location.href = successUrl+"?isEditCart=true&prevItemCount="+prevItemCount;//Added for to call order re-price
				break;
			case "gift-wrap-notes-form" :
				giftWrapNoteUpdate();
				$('#gift-wrap-modal').modal('hide');
				//$('#js-giftwrap-cancel').click();
				break;
			case "orderPromotionForm" :
				var promoApplied = true;
				if(pageName == "checkout") {
					updateCheckoutOrderSummary(promoApplied);
				} else {
					updateShoppingBag(promoApplied);
				}
				if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
                   var dtmpromo = $("#"+formId ).find('#shopping-bag-promo').val();
					var prcodeType = "shoppingCart";
					if($("#completeShoppingBag").length == 0){
						prcodeType = $("#shippingContainer").hasClass("current") ? "shipping" : "billing";
					}
					if (window.location.href.indexOf("shipping") > -1) {
						prcodeType = "Shipping";
					}else if (window.location.href.indexOf("payment") > -1){
						prcodeType = "Billing";
					}
					promoCodeSuccess(prcodeType,dtmpromo);
				}
				break;
			case "orderPromotionFormForMobile" :
				var promoApplied = true;
				updateCheckoutOrderSummaryForMobile(promoApplied);
				break;
			case "expressOrderForm" :
				location.href = successUrl;
				break;
			case "gift-card-edit-form" :
				localStorage.setItem("giftEditsuccessmsg",'true');
				location.href = successUrl;
				break;
			case "addressCreationEmailForm" :
				localStorage.setItem("giftEditsuccessmsg",'true');
				location.href = successUrl;
				break;
			case "delete-giftcard-form" :
				if(data.result == "success"){
					$("#billingContainer").attr("data-submitvalidate", "false");
					$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
						$("#payment-step").removeClass("hidden");
						wizardInit(1);
						billingInit();
						initializeBillingZipcode();
					  initializeBillingAddress1();
						if(mobileRequest == 'false') {
					    $("#billingContainer").find('.selectpicker').selectpicker('refresh');
						}
					});
				}
				break;
			case "apply-giftcard-form" :
				$("#apply-giftcard-error-container").hide();
				$("#apply-giftcard-success-container").show();
				$("#billingContainer").attr("data-submitvalidate", "false");
				$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
					$("#payment-step").removeClass("hidden");
					wizardInit(1);
					billingInit();
					initializeBillingZipcode();
				  initializeBillingAddress1();
					if(mobileRequest == 'false') {
				    $("#billingContainer").find('.selectpicker').selectpicker('refresh');
					}
				});
				break;
			case "gitcard-balance-form" :
				//location.href = successUrl;
				$("p#giftcard-message").text(data.giftcardBalance).show();
				$("#giftcard-error-container").hide();
				break;
			case "addCartItem" :
				localStorage.setItem("addedFromYouMayLike",'true');
				var cform = '#'+formId;
				var skuId = $(cform).find(".omniSku").val();
				var itemCount = $("#itemCount").val();
				/* Start - MKCAB-5 : GWP - Echo Release */
				var gwpSkuId = getGWPSkuId(formId);
				/* End - MKCAB-5 : GWP - Echo Release */
				if(itemCount==0 && (dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true")){
					addToCartOmni(skuId,gwpSkuId);
				}
				else if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
					addToCartOmniScAdd(skuId,gwpSkuId);
				}
				postAddItemToCart(cform);
				addItemToRRCart(formId);
				break;

			case "sign-in-form":
				var formObj = $("#"+formId)
				var emailId = formObj.find("#sign-in-email-address").val();
				if(data.result == "error"){
					$.each(data.errors,function(key,value){
						var propertyName = value.propertyName;
						propertyName = propertyName + "Error";
						/*<dattaprasad> GWSIT-550 fixed on 03-11-2015 starts*/
						$("."+propertyName).html(value.message).removeClass("hiddenErrorMsg").show();
						if(value.propertyName == "globalError"){
							$(".globalError").html(value.message).removeClass("hiddenErrorMsg");
						}
						/*<dattaprasad> GWSIT-550 fixed on 03-11-2015 ends*/
						/* Starts - Added for MKCAB-28 - Custom Products */
						var localeName = $("#nonPrimaryLocale").val();
						if(value.propertyName=='customProdError'){
							location.href = localeName+'/checkout/shoppingCart.jsp';
						}
						/* Ends - Added for MKCAB-28 - Custom Products */
					});
					if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
						if(data.passwordWrongAttempts < 0){
	                		/*<dattaprasad> ECB-12702 Added on 29-06-2017 starts*/
	                		var errortTypeDTM = "accountLock";
							var errorMessageDTM = data.errors[0].message;
							var errorPageType = "";
							addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
							/*<dattaprasad> ECB-12702 Added on 29-06-2017 ends*/
	                	}
						window.omniture_errorCapture("sign-in-form");
					}
				}
				else if(data.result == "success" && (dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true")){
					mkorsData.profile = {"userID" : emailId};
					if(typeof $(".showCheckoutSignInModal").data("currenthref") != "undefined") {
						successUrl = $(".showCheckoutSignInModal").data("currenthref");
					}
					loginPage(emailId,successUrl);
					//location.href = successUrl;
				}
				else if(typeof $(".showCheckoutSignInModal").data("currenthref") != "undefined" && data.result == "success") {
					location.href = $(".showCheckoutSignInModal").data("currenthref");
				}
				else{
					location.href = successUrl;
				}
				break;
			case "socialSignInDropDown":
			case "socialCreateProfileForm":
			case "socialCheckoutSignin":
				location.href = successUrl;
				break;
			case "socialCheckEmailForm":
				if (data.socailRequestVO.isCreateUser) {
					socialRegisterAjax(data.socailRequestVO);
				} else {
					socialSigninAjax(data.socailRequestVO);
				}
				break;
			case "paymentEdit_form":
				$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
					$("#payment-step").removeClass("hidden");
					wizardInit(1);
					billingInit();
					initializeBillingZipcode();
				  initializeBillingAddress1();
					if(mobileRequest == 'false') {
				    $("#billingContainer").find('.selectpicker').selectpicker('refresh');
					}
				    /*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 starts*/
				    var removeCheckboxExtraInputField = ['use-shipping-checkbox', 'mailing-list'];
					newCheckoutMkobj.removeExtraField(removeCheckboxExtraInputField);
					/*<dattaprasad> GWSIT-496 Fixed on 22-12-2015 ends*/
				});
				break;
			case "removeOutofstockItems":
				$("#reviewOutofstock-modal").modal("hide");
				var errform = '#'+formId;
				if($("#"+formId).hasClass("allItemsOutOfStock-true")){
					placeOrderCartLineProductRemoval("outOfStockForAllProducts");
					$.post(localeName+'/checkout/includes/gwpUpdate.jsp', {gwpUpdate : "true"}, function(data) {
						location.href = successUrl;
					});

				}else{
					korscheckoutobj.displayError(data, errform, formId);
					$.post(localeName+'/checkout/includes/gwpUpdate.jsp', {gwpUpdate : "true"});
				}
			break;
		}
		console.log("CALLING DY SPA");
		DY.API('spa', {
			context: {
				type: 'CART',
      	data: DY.recommendationContext.data
			},
			url: window.location.href,
			countAsPageview: true
		});
	}

	/*
	* local set of error message
	*/
	var customProdRemove=localStorage.getItem("customProdRemove");
	if(customProdRemove=='true'){
		$('.successMessage').show();
		$('.successMessage p').hide();
		$('.successMessage , .successMessage .itemRemove').show();
		localStorage.setItem("customProdRemove",'');
		screenLiveAnnounce($('.successMessage .itemRemove').text());
	}

	var getmsg=localStorage.getItem("cartUpdatesuccessmsg");
	if(getmsg=='true'){
		$('.successMessage , .successMessage .itemUpdate').show();
		localStorage.setItem("cartUpdatesuccessmsg",'');
		screenLiveAnnounce($('.successMessage .itemUpdate').text());
	}
	var giftEditsuccessmsg=localStorage.getItem("giftEditsuccessmsg");
	if(giftEditsuccessmsg=='true'){
		$('.successMessage , .successMessage .giftcardUpdate').show();
		localStorage.setItem("giftEditsuccessmsg",'');
		screenLiveAnnounce($('.successMessage .giftcardUpdate').text());
	}
	var addedFromYouMayLike= localStorage.getItem("addedFromYouMayLike",'true');
	if(addedFromYouMayLike == 'true') {
		$('.successMessage , .successMessage .itemAdd').show();
		localStorage.setItem("addedFromYouMayLike",'');
		screenLiveAnnounce($('.successMessage .itemAdd').text());
	}
	var accountCreate= localStorage.getItem("accountCreate",'true');
	if(accountCreate == 'true') {
		$("#confirmation-thanks-box").removeClass("hidden");
		$("#confirmCreateAccount").removeClass("hidden");
		$("#loggedInUserSignature").addClass("hidden");
		localStorage.setItem("accountCreate",'');
	}

	function formDataPopulation(formId){
		switch (formId) {
		case "gift-wrap-notes-form" :
			var maxCount = document.getElementById("max_count_value").value;
			var giftWrapValues = new Array();
			var giftWrapValuesMob = new Array();
			var giftWrapMessages = "";
			var inputElements = document.getElementsByTagName("input");
			for (i=0; i<maxCount; i++){
				var num = i+1;
				giftWrapValues[i] = $("input#desktop-toggle-note-c"+num).is(":checked");
				giftWrapValuesMob[i] = $("input#mobile-toggle-note-c"+num).is(":checked");
				/*if($("#mobile-giftWrap").length > 0){
					var numb = num+1 ;
					giftWrapValuesMob[i] = $("input#add-note-"+numb).is(":checked");
				}*/
				if(i==0){
					giftWrapMessages = $("textarea#gift-text-"+num).val();
				}else{
					giftWrapMessages = giftWrapMessages + "@@@@"+ $("textarea#gift-text-"+num).val();
				}

			}
			if($('.mob-gfWrap').is(':visible')){
				document.getElementById("giftWrapOpt").value = giftWrapValuesMob;
			}else{
				document.getElementById("giftWrapOpt").value = giftWrapValues;
			}
			document.getElementById("giftMessages").value = giftWrapMessages;
			break;
		}
	}
	function postAddItemToCart(formId){
		var val=  $(formId).find('.added_input').val();
		var $changedInput = $(formId).find('.changed_input');
		$changedInput.val(val);
		setTimeout(function(){
			var val1= $(formId).find('.default_input').val();
			$changedInput.val(val1);
		},2000);
	}
	/* Start - MKCAB-5 : GWP - Echo Release */
	function getGWPSkuId(form){
		skuId = $("#"+form).find('#rrSkuId').val();
		var gwpTempSkuId = '';
		jQuery.ajax({
			url: localeName+'/checkout/includes/gwpAddToCartDTM.jsp',
			type: 'POST',
			data: {skuId: skuId},
			async: false,
			success: function(data) {
				gwpTempSkuId = data.gwpSkuId;
			}
		});
		return gwpTempSkuId;
	}
	/* End - MKCAB-5 : GWP - Echo Release */
    $('#apply-gift-card-modal , #gift-card-balance-modal').on('hidden.bs.modal', function(){
    	$("p#giftcard-message").hide();
    	$("#apply-giftcard-success-container , #giftcard-error-container , #apply-giftcard-error-container").hide();
    });

	function updateShoppingBag(promoApplied){
		$.ajax({
			url: localeName+'/checkout/includes/shoppingCartInclude.jsp?promoApplied='+promoApplied,
			type:'POST',
			dataType: "text",
			success: function(data) {
				$('#completeShoppingBag').html(data);
				responseReset();
				if(promoApplied != true){
					$('.successMessage').show();
					$('.successMessage p').hide();
					$('.successMessage , .successMessage .quantityUpdate').show();
					screenLiveAnnounce($('.successMessage .quantityUpdate').text());
				}
				$(".loyality_checkout").load("/checkout/includes/loyaltyPointsShow.jsp");
				$(".reflektion_checkout").load(localeName+'/checkout/includes/cartProductRecs.jsp?nonPrimaryLocale='+localeName, function() {
					responseReset();
					/*ECB-18111*/
					rfkmkorsdataResponse();
				});
				var enableApple = true;
				var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
				if(disableCheckoutMaxQty == "true"){
					enableApple = false;
				}
				if (window.ApplePaySession && enableApple) {
				  	var merchantIdentifier = $("#merchantIdentifier").val();
				  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
				  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
				  		promise.then(function (canMakePayments) {
				  			if (canMakePayments){
				  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
				  				$(".apple-pay-button").removeClass("hidden");
				  				$("#applePay-payment-method").removeClass("hidden");
				  			}
				  		});
				  	}
				}
				/*<sukraj > fix for GRNSIT-89 start on 05/Nov/2016*/
				$("#mobExpressCheckout").on("show.bs.collapse", function() {
			        $("#mobExpressCheckoutSticky").collapse("hide")
			    });
			    $("#mobExpressCheckoutSticky").on("show.bs.collapse", function() {
			        $("#mobExpressCheckout").collapse("hide")
			    });
			    /*<sukraj > fix for GRNSIT-89 ends on 05/Nov/2016*/
				$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $("select#shippingMethod").val()}, function(data) {
		    		$("#summary").load(localeName+"/checkout/common/orderSummaryOnCheckout.jsp", function(){
		    			$('#DTMUpdateContainer').load("/includes/updateCartForDTM.jsp" , function(){
		    				responseReset();
		    			});
		    		});
		    	});

			},
			complete: function(){
				newCheckoutMkobj.promoToggle();
			}
		});
	}

	function modelReset(targetModel){
		var $form = targetModel.find('form')
    	if ($form.length > 0) {
          $form[0].reset();
          console.log($form.find('.selectpicker').length);
          $form.parsley().reset();
        }
		if($('[data-toggle="tooltip"]').length > 0){
			$('[data-toggle="tooltip"]').tooltip();
		}
		var tabpanel = targetModel.find('.js-tabsPanel');
		if(tabpanel.length > 0){
			$('.js-tabsPanel').tabsPanel();
		}
		targetModel.find('.selectpicker').selectpicker('render');
        Placeholders.enable();
    }

	function responseReset(){
    	$('.selectpicker').selectpicker('render');
    	if($('form').length > 0){
	    	for(var index in $('form').toArray()){
	    	    $($('form')[index]).parsley();
	    	}
    	}
		if(!($('.responsive-carousel').hasClass('slick-initialized'))){
			initSlick();
		}
		disableSelectPicker();
		$('[data-toggle="tooltip"]').tooltip();
    }

    function initSlick(){
		$('.responsive-carousel').slick(mkoptions.slick);
	}

    $(document).on('submit', '.submitFormAjaxForCheckout', function(e) {
        e.preventDefault();
        if (typeof store !== undefined) {
          store.remove('minicart');
        }
        hideMessage();
        $(this.commerceItemCount).attr("value");
        ajaxFormSubmit(this);
    });

    $(document).on('submit', '#removeOutofstockItems', function(e) {
        e.preventDefault();
        ajaxFormSubmit(this);
    });
    $(document).on('submit', '#orderPromotionForm', function(e) {
          e.preventDefault();
          var form = $(this);
          if (typeof store !== undefined) {
            store.remove('minicart');
          }
          hideMessage();
		if($("#billingContainer").hasClass("current")){
			form.find("#couponAppliedFromPayment").val("true");
		}
		else {
			form.find("#couponAppliedFromPayment").val("false");
		}
          var form = $("#orderPromotionForm");
          var valid= true;
          valid = $("#orderPromotionForm").parsley().validate();
          if(valid){
                    var promoCodeVal = $('#orderPromotionForm .enter_promo').val();
                    var parsedPromo = parseInt(promoCodeVal);
                    $('#orderPromotionForm .enter_promo').removeClass('redCol');
                    if (promoCodeVal == "") {
                        $('#main_container').find(".global_error_msg_container").html("Please enter a valid promo code.").show();
                        $('#orderPromotionForm .enter_promo').addClass('redCol');
                    } else {
                        var ajax_result = ajaxFormSubmit(form);
												console.log("CALLING DY SPA");
												DY.API('spa', {
													context: {
														type: 'CART',
										      	data: DY.recommendationContext.data
													},
													url: window.location.href,
													countAsPageview: true
												});
                    }
          }
          else{
              if(!omni_error_track_restrict3){
                    omni_error_track_restrict = false;
                }

		  }
	});

	$(document).on('submit', '#orderPromotionFormForMobile', function(e) {
		  e.preventDefault();
		  hideMessage();
		  var form = $(this);
		  var valid= true;
		  valid = $(this).parsley().validate();
		  if($("#billingContainer").hasClass("current")){
			  form.find("#couponAppliedFromPayment").val("true");
			}
			else {
				form.find("#couponAppliedFromPayment").val("false");
			}
		  if(valid){
					var promoCodeVal = $('#orderPromotionFormForMobile .enter_promo').val();
					var parsedPromo = parseInt(promoCodeVal);
					$('#orderPromotionFormForMobile .enter_promo').removeClass('redCol');
					if (promoCodeVal == "") {
						$('#main_container').find(".global_error_msg_container").html("Please enter a valid promo code.").show();
						$('#orderPromotionFormForMobile .enter_promo').addClass('redCol');
					} else {
						var ajax_result = ajaxFormSubmit(form);
						console.log("CALLING DY SPA");
						DY.API('spa', {
							context: {
								type: 'CART',
				      	data: DY.recommendationContext.data
							},
							url: window.location.href,
							countAsPageview: true
						});
					}
		  }
		  else{
			  if(!omni_error_track_restrict3){
					omni_error_track_restrict = false;
				}

		  }
	});

	$(document).on('submit', '#addCartItem', function(e) {
		 e.preventDefault();
		  var form = $("#addCartItem");
		  $parent = $(this).parents('#shopping-bag-add-item-modal');
		  var selected = $($parent).find('#qvChangeSizeValue').val();
		  var selectSizeLength =  $parent.find('select[name=edit_item_size]').length;
		  var sizeText = $($parent).find('#chooseSizeText').val();
		  var SizeInCapsText = $('#chooseSizeInCapsText').val();
		  if(selectSizeLength <= 0 || (selected != '' && selected !== sizeText && selected !== SizeInCapsText)){
				var ajax_result = ajaxFormSubmit(form);
				console.log("CALLING DY SPA");
				DY.API('spa', {
					context: {
						type: 'CART',
		      	data: DY.recommendationContext.data
					},
					url: window.location.href,
					countAsPageview: true
				});
		  } else {
			$parent.find('.selSizeErrMsg').show();
		  }
	});

    $(document).on('click', '.remove-item', function(e) {
        e.preventDefault();
        if (typeof store !== undefined) {
          store.remove('minicart');
        }
        hideMessage();
        // START ECOSIT-304 <Pradeep Kumar> 11th August, 2016 Echo release
        var pageName = $('#removeItemPage').val();
        // Start for excluding Order Repricing on Shipping Page
        if(pageName != undefined && pageName == 'checkoutPage'){
            var $deskCurrentstep = $('.panel-group .panel.current').index();
            if($deskCurrentstep == 0){
                $(this).attr("data-href", $(this).attr('data-href').replace("repriceRequired=true", "repriceRequired=false"));/*<sukraj> fix for ECOUAT-51 on 14/09/2016*/
            }
        }
        /*For DTM of product removal from Cart Line Item ECB-11957 starts on 27-06-2017*/
        var $this = $(this);
        var parentContainer = ".shopping-bag-item";
        var quantity = $(this).closest(parentContainer).find("#quantityCartSelector_").val();
        var eventParametersObj = createDTMEventParametersForCartRemoval($this,parentContainer);
        /*For DTM of product removal from Cart Line Item ECB-11957 ends on 27-06-2017*/
        // End for excluding Order Repricing on Shipping Page
        // END ECOSIT-304 <Pradeep Kumar> 11th August, 2016 Echo release
        $.ajax({
            url: $(this).attr('data-href'),/*<sukraj> fix for ECOUAT-51 on 14/09/2016*/
            type: "post",
            dataType: "json",
            cache : false,
            success: function(data) {
                if("failure" == data.result){
                    var errors = data.errors;
                    $('.alert-message--error').removeClass("hidden");
                    for(i in errors){
                        $('.serverErrors').html(errors[i].message);
                        $('.serverErrors').show();
                        $('.noLongerErrorMsg').hide();
                        $('.ajaxErrorMessage').hide();
                    } // START ECOSIT-304 <Pradeep Kumar> 11th August, 2016 Echo release
                } else if(pageName != undefined && pageName == 'checkoutPage') {
                    $.ajax({
                        url: localeName+'/checkout/includes/checkoutOrderSummary.jsp',
                        type:'POST',
                        dataType: "text",
                        success: function(data) {
                            $('#checkOutOrderSummary').html(data);
                            $('#shopping-bag-box__summary').attr('class','collapse in');
                            $('#shopping-bag-box__summary').attr('aria-expanded','true');
                            $(".shopping-bag-count").text($(data).find("#totalCommerceItems").val());
                            $('#DTMUpdateContainer').load("/includes/updateCartForDTM.jsp");
                            //Starts - Added for monogramming - MKFP-175
                             initializeEditAddMonoLink();
                            //Ends - Added for monogramming - MKFP-175
                        }
                    }); // END ECOSIT-304 <Pradeep Kumar> 11th August, 2016 Echo release
                } else {
                    $.ajax({
                        url: localeName+'/checkout/includes/shoppingCartInclude.jsp?isRepriceRequired=true',//Added for to call order re-price
                        type:'POST',
                        dataType: "text",
                        success: function(data) {
                            $('#completeShoppingBag').html(data);
                            $('.itemRemove').show();
                            if(disabledRR == 'true') {
                                $("#shopping-bag-container").show();
                            }
                            var enableApple = true;
            				var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
            				if(disableCheckoutMaxQty == "true"){
            					enableApple = false;
            				}
                            if (window.ApplePaySession && enableApple) {
							  	var merchantIdentifier = $("#merchantIdentifier").val();
							  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
							  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
							  		promise.then(function (canMakePayments) {
							  			if (canMakePayments){
							  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
							  				$(".apple-pay-button").removeClass("hidden");
							  				$("#applePay-payment-method").removeClass("hidden");
							  			}
							  		});
							  	}
							}
                            responseReset();
                            $(".loyality_checkout").load("/checkout/includes/loyaltyPointsShow.jsp");
                            if(($("#completeShoppingBag").length)>0){
                            $(".reflektion_checkout").load(localeName+'/checkout/includes/cartProductRecs.jsp?nonPrimaryLocale='+localeName, function() {
                    			responseReset();
								/*ECB-18111*/
                    			rfkmkorsdataResponse();
													DY.API('spa', {
														context: {
															type: 'CART',
											      	data: DY.recommendationContext.data
														},
														url: window.location.href,
														countAsPageview: true
													});
                    		});
                            }
                            $('#DTMUpdateContainer').load("/includes/updateCartForDTM.jsp");
                            $('.successMessage').show();
                            $('.successMessage p').hide();
                            $('.successMessage , .successMessage .itemRemove').show();
                            screenLiveAnnounce($('.successMessage .itemRemove').text());

                            $.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $("select#shippingMethod").val()}, function(data) {
                                $.ajax({
                                    url : localeName + '/checkout/common/orderSummaryOnCheckout.jsp',
                                    type : "post",
                                    dataType : "html",
                                    cache : false,
                                    success : function(data) {
                                        $("#summary").html(data);
                                        $(".shopping-bag-order-summary-details").find('.selectpicker').selectpicker();
                                    }
                                });
                            });

                            if(disabledRR == 'false') {
                                initRREvent();
                            }
                            //Starts - Added for monogramming - MKFP-175
                                initializeEditAddMonoLink();
                            //Ends - Added for monogramming - MKFP-175

							//Starts - Added for MKCAB-28 - Custom Product
							$('.js-btnDisabled').click(function(e) {
							    e.preventDefault();
							  });
							//Ends - Added for MKCAB-28 - Custom Product
							var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
							if(disableCheckoutMaxQty == "true"){
								$('#maxOrderQtyExceedError').removeClass('hidden');
								$('#maxOrderQtyExceedError .alert-message--error').removeClass('hidden');
							}
							}
					});
                    /*For DTM of product removal from Cart Line Item ECB-11957 starts on 27-06-2017*/
                    var multipleParametersArr = [];
            		var quantityArr = [];
            		multipleParametersArr.push(eventParametersObj);
            		quantityArr.push(quantity);
            		var eventName = "removeFromCart";
            		var eventType = "cart";
            		var eventFrom = eventType;
            		var errorEvent = {};
                    triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom,errorEvent);
                    /*For DTM of product removal from Cart Line Item ECB-11957 ends on 27-06-2017*/
										console.log("CALLING DY SPA");
										DY.API('spa', {
											context: {
												type: 'CART',
								      	data: DY.recommendationContext.data
											},
											url: window.location.href,
											countAsPageview: true
										});
				}

			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
		});
	});

	/* Starts - Added for MKCAB-28 - Custom Products */
	$(document).on('show.bs.modal', '#shopping-bag-remove-custom-item-modal', function(event){

		$("#shopping-bag-remove-custom-item-modal .modal-body").load($(event.relatedTarget).attr("data-url"), function(){
			var targetModel = $("#shopping-bag-remove-custom-item-modal");
    		modelReset(targetModel);
		});
	});
	/* Ends - Added for MKCAB-28 - Custom Products */
	$(document).on('show.bs.modal', '#shopping-bag-edit-item-modal', function(event){
		hideMessage();
		$("#shopping-bag-add-item-modal").find(".modal-body.kor-modal__content-body").html("");
		$("#shopping-bag-edit-item-modal .modal-body").load($(event.relatedTarget).attr("data-url"), function(){
			var targetModel = $("#shopping-bag-edit-item-modal");
    		modelReset(targetModel);
    		bopusTooltipInit();/*<sukraj> fix for FRKSIT-284 on 16/09/2016*/
    		customProdTooltipInit();
    		/* Starts -FRKSIT-267 */
    		$(".store_distance .btn.dropdown-toggle.btn-default").removeAttr("title");
    		$("select.store_distance").change(function(){
        		$(".store_distance .btn.dropdown-toggle.btn-default").removeAttr("title");
    		});
    		/* End -FRKSIT-267 */
    	});
    });

	$(document).on('show.bs.modal', '#shopping-bag-add-item-modal', function(event){
		hideMessage();
		$("#shopping-bag-edit-item-modal").find(".modal-body.kor-modal__content-body").html("");
    	$("#shopping-bag-add-item-modal .modal-body").load($(event.relatedTarget).attr("data-url"), function(){
			var targetModel = $("#shopping-bag-add-item-modal");
    		modelReset(targetModel);
    		bopusTooltipInit();/*<sukraj> fix for FRKSIT-284 on 16/09/2016*/
    		customProdTooltipInit();
    		/* <Hema> Click and collect MKCAB-12 JS Starts */
    		/*$(document).on('click','.details',function(e){
    			e.preventDefault();
    			$('.bopus-tooltip').show();
    		});
    		$(document).on('click','.bopus-tooltip .close-icon',function(){
    			$('.bopus-tooltip').hide();
    		});

    		if($('#pickupinstore:checked').parents('.pdp_clc_section').hasClass('active')){
    			getUserCurrentLocation();
    			$('.checkstore-editpopup').show();
    		}
    		$(document).on('click','input[name=shiptoaddress]',function(){
    			$('.pdp_clc_section').removeClass('active');
    			$(this).parents('.pdp_clc_section').addClass('active');
    			var pickupstore=$('#pickupinstore:checked').parents('.pdp_clc_section');
    			if(pickupstore.hasClass('active')){
    				getUserCurrentLocation();
    				$('.checkstore-editpopup').show();
    				//$('.available-msg-container').show();
    			}
    			else{
    				$('.checkstore-editpopup').hide();
    				$('.available-msg-container').hide();
    			}
    		});
    		$(document).on('click','.find-instore',function(e){
    			$('.not-avail-errormsg').show();
    		});*/

    		/* <Hema> Click and collect MKCAB-12 JS Ends */
    	});
    });

	$(document).on('show.bs.modal', '#size-guide-modal', function(event){
		if($(this).hasClass("dynamic_size_guide_link")){
			var sizeGuideUrl = $(this).attr("href");
			openStoreSizeGuidWindow(sizeGuideUrl);
		}
		else{
		$("#size-guide-modal").find("#sizeGuideImage").attr('src',$(event.relatedTarget).attr("data-url"));
    	var targetModel = $("#size-guide-modal");
    	modelReset(targetModel);
		}
    });
    /*<Baskar> GWUAT-102 fixed on 24-11-2015 starts*/
	$(document).on('hidden.bs.modal', '#size-guide-modal', function(event){
		$('body').addClass("modal-open");
    });
	/*<Baskar> GWUAT-102 fixed on 24-11-2015 ends*/
	var autoCompleteByAddress = $("#autoCompleteByAddress").val();
	var autoCompleteByZipCode = $("#autoCompleteByZipCode").val();
	var autoCompByAddressInBilling = $("#autoCompByAddressInBilling").val();
	var autoCompByZipCodeInBilling = $("#autoCompByZipCodeInBilling").val();


	if($('.checkout').length > 0){
		if(typeof autoCompleteByAddress != undefined && autoCompleteByAddress != null && autoCompleteByAddress){
			initializeAddress1();
		}
		if(typeof autoCompleteByZipCode != undefined && autoCompleteByZipCode != null && autoCompleteByZipCode){
			initializeZipcode();
		}
		if(typeof autoCompByAddressInBilling != undefined && autoCompByAddressInBilling != null && autoCompByAddressInBilling){
			initializeBillingAddress1();
		}
		if(typeof autoCompByZipCodeInBilling != undefined && autoCompByZipCodeInBilling != null && autoCompByZipCodeInBilling){
			initializeBillingZipcode();
		}
	}

    //Shopping Cart
    $(document).on('click', '.shipping-method', function(e) {
    	hideMessage();
    	/*waseem ECB-11973 12/07/2017*/
    	var addrParam = newCheckoutMkobj.shippingMethodAddrUpdate();
	    	$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $(e.currentTarget).val(), shippingMethodChanged: "true"}, function(data) {
	    		$("#shippingMethodsContainer").load(localeName+"/checkout/includes/shippingMethod.jsp", addrParam);
	    		$(".promoCodeMsgContainer").load(localeName+"/checkout/includes/appliedCouponDetail.jsp",function(){
	    			hidePromoCodeContainer("#checkoutPromotion");
	    		});
	    		$(".promoCodeMsgContainer").load(localeName+"/checkout/includes/appliedCouponDetailForMobile.jsp",function(){
	    			hidePromoCodeContainer("#shippingPromotion");
	    		});

	    		$("#totalOrderSummary").load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp?isShipping=true", function(){
	    			newCheckoutMkobj.promoToggle();
	    		});
	    		/*<dattaprasad> ECB-16319 on 30-07-2018 starts*/
	    		if(typeof $("#shippingMethodsContainer").data("stopShippingMethodFocusOnLoad") == "undefined" || $("#shippingMethodsContainer").data("stopShippingMethodFocusOnLoad") == "false") {
	    			var setTimer = setInterval(function(){$("#" + $('input.shipping-method:checked').attr("id")).focus()},50);
		    		setTimeout(function(){clearInterval(setTimer)},1000);
	    		}
	    		/*<dattaprasad> ECB-19854 on 26-10-2018*/
	    		$("#shippingMethodsContainer").data("stopShippingMethodFocusOnLoad","false");
	    		/*<dattaprasad> ECB-16319 on 30-07-2018 ends*/
	    	});
	    });



    $(document).on('click', '#gift-checkbox-top', function(e) {
    	$('#review-gift-checkbox').prop('checked', $(this).is(":checked"));
    });

    $(document).on('click', '#review-gift-checkbox', function(e) {
    	$('#gift-checkbox-top').prop('checked', $(this).is(":checked"));
    });



    if($("select#shippingMethod").val() == undefined || $("select#shippingMethod").val() == ""){
    	hideMessage();
    	$($('[data-id="shippingMethod"]').parent()).find("ul.dropdown-menu li a").first().click();
			if(mobileRequest == 'false') {
    		$('.selectpicker').selectpicker('refresh');
			}
    }

    $(document).on('change', 'select#shippingMethod', function(e) {
    	hideMessage();
    	$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $(e.currentTarget).val(), shippingMethodChanged: "true"}, function(data) {
    		/*$("#summary").load(localeName+"/checkout/common/orderSummaryOnCheckout.jsp", function(){
    			responseReset();
    		});*/
    		/*<dattaprasad> GWSIT-386 on 29-10-2015 starts*/
    		$.ajax({
                 url : localeName + '/checkout/common/orderSummaryOnCheckout.jsp',
                 type : "post",
                 dataType : "html",
                 cache : false,
                 success : function(data) {
					$("#summary").html(data);
					responseReset();
                 }
      		 });
    		/*<dattaprasad> GWSIT-386 on 29-10-2015 Ends*/
    		$(".promoCodeMsgContainer").load(localeName+"/checkout/includes/appliedCouponDetail.jsp",function(){
    			hidePromoCodeContainer('#cartPromotion');
    		});
    		$("#displayOrderTotal").load(localeName+"/checkout/includes/displayOrderTotal.jsp");
    	});
    });
    /*Start : Added to handle shipping price and tax on load document*/
    if($("#shippingMethod").length){
    	$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $("#shippingMethod").val()}, function(data) {
    		$("#summary").load(localeName+"/checkout/common/orderSummaryOnCheckout.jsp?disableCheckout="+$('input#disableCheckout').val(), function(){
    			responseReset();
    		});

    		$("#displayOrderTotal").load(localeName+"/checkout/includes/displayOrderTotal.jsp");
    	});
    }
    /*End : Added to handle shipping price and tax on load document*/
    /*Start : IRIS Defect 29 Fix*/
	$(document).on('select-change', '#shipping-form .selectpicker', function(e) {
		if(mobileRequest == 'false') {
				$(this).selectpicker('refresh');
		}
		/*waseem ECB-11973 12/07/2017*/
    	newCheckoutMkobj.updateShippingMethodParam();
    });

	   /*End : IRIS Defect 29 Fix*/
	$(document).on('change', '#shipping-form select#state', function(e) {
    	/*waseem ECB-11973 12/07/2017*/
    	newCheckoutMkobj.updateShippingMethodParam();
    });

	/*waseem ECB-11973 12/07/2017 added implementation of shipping restriction*/
	$(document).on('blur', '#shipping-form #addr-1, #shipping-form #addr-2', function(e) {
		setTimeout(function(){
			/*waseem ECB-12934 22/09/2017 a part canada post */
			if(!$('.pcaautocomplete').is(':visible')){
				newCheckoutMkobj.updateShippingMethodParam();
			}
		}, 100);
    });


    $(document).on('change', '.qtySubmitFormAjaxForCheckout', function(e) {
        e.preventDefault();
        if (typeof store !== undefined) {
          store.remove('minicart');
        }
        hideMessage();
        form = $(this);
        formId = $(this).attr("id");
        var FormIdStart = $(this).find('.productIndex').val();
        var CheckFormId = "qtyCartChange_"+FormIdStart;
        // To do, need to remove later if not require
        fieldsArray = form.serializeArray();
        fieldsArray.push({name:"formName", value:formId});
        fieldsArray = $.grep(fieldsArray, function(n, i){
            return n.name != "successUrl";
        });
        fieldsArray = $.grep(fieldsArray, function(n, i){
            return n.name != "errorUrl";
        });
        var orderNumber = $('#orderNumber').val();
        var orderLocale = $('#orderLocale').val();
        /*For DTM of product removal from Cart Line Item ECB-11957 starts on 27-06-2017*/
        var $this = $(this);
        var parentContainer = ".shopping-bag-item";
        var quantity = "";
        var changedQuantity = $this.find("#quantityCartSelector_ option:selected").val();
        changedQuantity=parseInt(changedQuantity);
        var trackRemoveItem = false;
        var eventParametersObj = createDTMEventParametersForCartRemoval($this,parentContainer);
        if($this.closest(parentContainer).find(".quantity").val()){
        	quantity = $this.closest(parentContainer).find(".quantity").val();
        	quantity=parseInt(quantity);
        }
        /*For DTM of product removal from Cart Line Item ECB-11957 ends on 27-06-2017*/
        $.ajax({
            url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
            type : "post",
            data : fieldsArray,
            dataType : "json",
            cache : false,
            success : function(data) {
                if(data.result == "success"){
                    $.ajax({
                        url: localeName+'/checkout/includes/updateShoppingCartItems.jsp?pageName=Shopping Cart&orderNumber='+orderNumber+'&orderLocale='+orderLocale,
                        type: "post",
                        data: fieldsArray,
                        dataType: "json",
                        cache: false,
                        success: function(data) {
                            //Suppress previous msg div
                            if($("#msgDiv").length) {
                                $("#msgDiv").hide();
                            }
                            if($("#msgDiv1").length) {
                                $("#msgDiv1").hide();
                            }
                            if($("#msgDiv1").length > 0 && data.messageGWPSummary != null) {
                                $("#msgDiv1").html(data.messageGWPSummary);
                                $("#msgDiv").hide();
                            } else if(data.messageGWPSummary != null){
                                $("#msgDiv").html(data.messageGWPSummary);
                                $("#msgDiv").show();
                            }
                            if("error" == data.result){
                                var errors = data.errors;
                                $('.alert-message--error').removeClass("hidden");
                                for(i in errors){
                                    $('.serverErrors').html(errors[i].message);
                                    $('.serverErrors').show();
                                    $('.noLongerErrorMsg').hide();
                                    $('.ajaxErrorMessage').hide();
                                }
                            } else {
                                if(data.shoppingCartItems != ""){
                                    $('#shoppingCartItems').html(data.shoppingCartItems);
                                }

								if(data.cartSummary != ""){
									$('#cartSummary').html(data.cartSummary);
								}
								if(data.orderTotal != ""){
									$('#orderTotal').html(data.orderTotal);
								}
								if(data.loyaltyPointShow != ""){
									$('.loyality_checkout').html(data.loyaltyPointShow);
								}

								$('#DTMUpdateContainer').load(localeName+"/includes/updateCartForDTM.jsp");
								$('.successMessage').show();
								$('.successMessage p').hide();
								$('.successMessage .quantityUpdate').show();
								$('.alert-message--error').addClass("hidden");
								$('.custom-product-error').addClass("hidden");
								if(mobileRequest=='true' && data.disableCheckout=='false') {
										$(".sticky-footer .btn--full-width.js-btnDisabled").off("click");
										$(".sticky-footer .btn--full-width").removeClass("js-btnDisabled");
										var cartQty = 0;
										$('.quantity').each(function(key,value){
										   cartQty += parseInt(this.value);
										});
										$(".shoppingBagTxt").html("SHOPPING BAG (" + cartQty + ")");
										$('.subtotalTxt span').html($('.shopping-bag-cart-total').html());
								}
								$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $("select#shippingMethod").val()}, function(data) {
									$.ajax({
										url : localeName + '/checkout/common/orderSummaryOnCheckout.jsp',
										type : "post",
										dataType : "html",
										cache : false,
										success : function(data) {
											$("#summary").html(data);
											$(".shopping-bag-order-summary-details").find('.selectpicker').selectpicker();
										}
									});
								});

								responseReset();
								/*For DTM of product removal from Cart Line Item ECB-11957 starts on 27-06-2017*/
                            	/*if(changedQuantity < quantity){
                            		trackRemoveItem = true;
                            		quantity = quantity - changedQuantity;
                            	}
                            	$this.closest(parentContainer).find(".quantity").val(changedQuantity);*/
								var multipleParametersArr = [];
			                 		var quantityArr =  [];
			                 		multipleParametersArr.push(eventParametersObj);
			                 		//quantity = changedQuantity;
			                 		var eventName = "productQtyUpdate";
	                            	if(changedQuantity < quantity){
	                            		trackRemoveItem = true;
	                            		var eventType = "decrease";
										quantity = quantity - changedQuantity;
	                            	}
	                            	else {

	                            		var eventType = "increase";
										quantity = changedQuantity - quantity;
	                            	}
	                            	//quantity = changedQuantity;
	                            	quantityArr.push(quantity);
									$this.closest(parentContainer).find(".quantity").val(changedQuantity);
                            	    screenLiveAnnounce($('.successMessage .quantityUpdate').text());
								    var eventFrom = eventType;
			                		var errorEvent = {};
			                    	triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom,errorEvent);
														DY.API('spa', {
															context: {
																type: 'CART',
												      	data: DY.recommendationContext.data
															},
															url: window.location.href,
															countAsPageview: true
														});
			                   /* if(trackRemoveItem == true){
			                    	var multipleParametersArr = [];
			                 		var quantityArr =  [];
			                 		multipleParametersArr.push(eventParametersObj);
			                 		quantityArr.push(quantity);
			                 		var eventName = "removeFromCart";
			                 		var eventType = "cart";
			                 		var eventFrom = eventType;
			                		var errorEvent = {};
			                    	triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom,errorEvent);
			                    }For Lakshmi Deepthi WEBA-1265 ends on 23/08/19*/
			                	/*For DTM of product removal from Cart Line Item ECB-11957 ends on 27-06-2017*/
							}
                            var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
                        	if(disableCheckoutMaxQty == "true"){
                        		$('#maxOrderQtyExceedError').removeClass('hidden');
                        		$('#maxOrderQtyExceedError .alert-message--error').removeClass('hidden');
                        		$(".apple-pay-button").addClass("hidden");
                        		if(!($("#mobExpressCheckoutBtn").hasClass("js-btnDisabled"))){
                        			$("#mobExpressCheckoutBtn").addClass("js-btnDisabled");
                        		}
                        		if(!($("#normalCheckout input.btn-primary").hasClass("js-btnDisabled"))){
                        			$("#normalCheckout input.btn-primary").addClass("js-btnDisabled");
                        		}
                        		if(!($(".expressCheckoutBtnContainer .paypalBtn").hasClass("disablepaypal-btn"))){
                        			$(".expressCheckoutBtnContainer .paypalBtn").addClass("disablepaypal-btn");
                        		}
                        		//ECB-24880 -- Sunil
                        		var maxqtyexceederrormsg = $('#maxOrderQtyExceedError .alert-message--error .alert-message__text').text().trim();
                        		if (maxqtyexceederrormsg.length > 0){
                        			addToDTMTrackEvent("cart update",maxqtyexceederrormsg,"Shopping car");
                        		}
                        		$('.js-btnDisabled').click(function(e) {
    							    e.preventDefault();
    							});
                        	}else{
                        		$("#mobExpressCheckoutBtn").removeClass("js-btnDisabled");
                        		$("#normalCheckout input.btn-primary").removeClass("js-btnDisabled");
                        		$(".expressCheckoutBtnContainer .paypalBtn").removeClass("disablepaypal-btn");
                        		if (window.ApplePaySession) {
	                        		var merchantIdentifier = $("#merchantIdentifier").val();
	                        	  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
	                        	  		if(($(".apple-pay-button").hasClass("hidden"))){
		                        	  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
		                        	  		promise.then(function (canMakePayments) {
		                        	  			if (canMakePayments){
		                        	  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
		                        	  				$(".apple-pay-button").removeClass("hidden");
		                        	  			}
		                        	  		});
	                        	  		}
	                        	  	}
                        		}
                        	}
						}
					});
				}
				if(data.result == "error"){
					var errors = data.errors;
					$('.alert-message--error').removeClass("hidden");
					$('.custom-product-error').addClass("hidden");
					for(i in errors){
						$('.serverErrors').html(errors[i].message);
						$('.serverErrors').show();
						//$('.noLongerErrorMsg').hide();
						$('.ajaxErrorMessage').hide();
					}
					$('#DTMUpdateContainer').load(localeName+"/includes/updateCartForDTM.jsp?changedQuantity="+changedQuantity);
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
		});

	});

	$(document).on('submit', '.express-order-form', function(e) {
		e.preventDefault();
		hideMessage();
		var valid= true;
		valid = $(this).parsley().validate();
		if(valid){
			ajaxFormSubmit(this);
		}
	});

	function applyPromoCode(trackEvent, pageName, action){
	    var promoCode = "";
	    if($("#couponCodeLine").length > 0){
	           promoCode = $('#couponCodeLine #globalError').val();
	    }else if($("#istcouponCodeLine").length > 0){
	           promoCode = $('#istcouponCodeLine #globalError').val();
	    }
	}


	$(document).on('click','.removeFromCoupons',function(e){
	    e.preventDefault();
	    hideMessage();
	    var $this = $(this);
	    var couponAppliedFromPayment = "false";
	    if($("#billingContainer").hasClass("current")){
	    	couponAppliedFromPayment = "true";
	    }
	    var removeCouponUrl = $this.attr('href') + "&couponAppliedFromPayment=" + couponAppliedFromPayment;
	    $.ajax({
	          url: removeCouponUrl,
	          type: "post",
	          dataType: "json",
	          success: function(data) {
	              if("failure" == data.result){
						var errors = data.errors;
						$('.alert-message--error').removeClass("hidden");
						for(i in errors){
							$('.serverErrors').html(errors[i].message);
							$('.serverErrors').show();
							$('.noLongerErrorMsg').hide();
							$('.ajaxErrorMessage').hide();
						}
	              } else {
	            	  if($('#pageFrom').val() == 'checkout'){
	            		  updateCheckoutOrderSummary(true);
	            	  } else {
	            		  updateShoppingBag(true);
	            	  }

	              }
								console.log("CALLING DY SPA");
								DY.API('spa', {
									context: {
										type: 'CART',
						      	data: DY.recommendationContext.data
									},
									url: window.location.href,
									countAsPageview: true
								});
	          },
	          error: function(xhr, ajaxOptions, thrownError) {
					newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
				}
	    });
	});

	$(document).on('click','.removeFromCouponsForMobile',function(e){
	    e.preventDefault();
	    hideMessage();
	    var $this = $(this);
	    var couponAppliedFromPayment = "false";
	    if($("#billingContainer").hasClass("current")){
	    	couponAppliedFromPayment = "true";
	    }
	    var removeCouponUrl = $this.attr('href') + "&couponAppliedFromPayment=" + couponAppliedFromPayment;
	    $.ajax({
	          url: removeCouponUrl,
	          type: "post",
	          dataType: "json",
	          success: function(data) {
	              if("failure" == data.result){
						var errors = data.errors;
						$('.alert-message--error').removeClass("hidden");
						for(i in errors){
							$('.serverErrors').html(errors[i].message);
							$('.serverErrors').show();
							$('.noLongerErrorMsg').hide();
							$('.ajaxErrorMessage').hide();
						}
	              } else {
	            	  	updateCheckoutOrderSummaryForMobile(true);
	              }
								console.log("CALLING DY SPA");
								DY.API('spa', {
									context: {
										type: 'CART',
						      	data: DY.recommendationContext.data
									},
									url: window.location.href,
									countAsPageview: true
								});
	          },
	          error: function(xhr, ajaxOptions, thrownError) {
					newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
				}
	    });
	});



	$(document).on('change','.change_size', function() {
		var $this=$(this);
		var ajaxUrl = $this.attr('data-url')+"&skuId="+$this.val();
		var identifier = $this.attr('data-identifier');
		if(identifier == 'true') {
			$("#shopping-bag-add-item-modal .modal-body").load(ajaxUrl, function(){
	    		var targetModel = $("#shopping-bag-add-item-modal");
				modelReset(targetModel);
	    	});
		} else {
			$("#shopping-bag-edit-item-modal .modal-body").load(ajaxUrl, function(){
	    		var targetModel = $("#shopping-bag-edit-item-modal");
				modelReset(targetModel);
	    	});
		}
	});


	$(document).on('click','.change_color', function(e) {
		e.preventDefault();
		var $this=$(this);
		var ajaxUrl = $this.attr('data-url');
		var identifier = $this.attr('data-identifier');
		if(identifier == 'true') {
			$("#shopping-bag-add-item-modal .modal-body").load(ajaxUrl, function(){
	    		var targetModel = $("#shopping-bag-add-item-modal");
				modelReset(targetModel);
	    	});
		} else {
			$("#shopping-bag-edit-item-modal .modal-body").load(ajaxUrl, function(){
	    		var targetModel = $("#shopping-bag-edit-item-modal");
				modelReset(targetModel);
	    	});
		}
	});
	$(document).on('click','.addOrRemoveToFav',function(e){
		e.preventDefault();
		hideMessage();
		var $this=$(this);
		addOrRemoveFavourite($this);
	});

	$(document).on('click','.singleItemAddTobag', function(e) {
		hideMessage();
		e.preventDefault();
		var $this=$(this);
		singleItemAddToBag($this);
	});
	function hidePromoCodeContainer(promoContainerName){
		setTimeout(function(){
		    if($(".promoCodeMsgContainer #promocodediscounttable").length == 0){
		    	$(promoContainerName).collapse("hide");
		    	$('[data-icon-href="'+promoContainerName+'"]').removeClass("icon-close-").addClass("icon-open");
		    }
	    }, 100);
	}
	function updateShoppingCart(className) {
		$.ajax({
			url: localeName+'/checkout/includes/shoppingCartInclude.jsp',
			type: "post",
			dataType: "html",
			cache: false,
			success: function(data) {
				$('#completeShoppingBag').html(data);
				var enableApple = true;
				var disableCheckoutMaxQty = $('#disableCheckoutMaxQty').val();
				if(disableCheckoutMaxQty == "true"){
					enableApple = false;
				}
				if (window.ApplePaySession && enableApple) {
				  	var merchantIdentifier = $("#merchantIdentifier").val();
				  	if(merchantIdentifier != undefined && merchantIdentifier != ""){
				  		var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
				  		promise.then(function (canMakePayments) {
				  			if (canMakePayments){
				  				HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
				  				$(".apple-pay-button").removeClass("hidden");
				  				$("#applePay-payment-method").removeClass("hidden");
				  			}
				  		});
				  	}
				}
				$('#DTMUpdateContainer').load("/includes/updateCartForDTM.jsp");
				$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $("select#shippingMethod").val()}, function(data) {
					$.ajax({
						url : localeName + '/checkout/common/orderSummaryOnCheckout.jsp',
						type : "post",
						dataType : "html",
						cache : false,
						success : function(data) {
							$("#summary").html(data);
							$(".shopping-bag-order-summary-details").find('.selectpicker').selectpicker();
						}
					});
				});
				$('.successMessage').show();
				$('.successMessage p').hide();
				$('.successMessage .'+className).show();
				responseReset();
			},
			error: function(xhr, ajaxOptions, thrownError) {
				location.reload();
			}
		});
	}
	function singleItemAddToBag($this) {
		var val0 = $this.find('.singleItemAddTobag').text();
		  $.ajax({
	  		url: $this.attr('href'),
	  		dataType:  "JSON",
	  		type: "POST",
	  		beforeSend:function(xhr) {},
	  		success: function(data){
	  			 if(data.result=="success"){
	  				localStorage.setItem("addedFromYouMayLike",'true');
	         		var nonPrimarylocale  = $("#nonPrimaryLocale").val();
	         		addItemToRRCart($this.attr('name'));
	         	 } else if (data.result == 'error') {
	         		for(i=0;i<data.errors.length;i++) {
	                     var message = data.errors[i].message;
	                     $('.ajaxErrorMessage').html(message);
	            	 }
	         		$('.alert-message--error').removeClass('hidden');
					$('.ajaxErrorMessage').show();
	         	 }
	  		},
	  		error: function(xhr, status, msg){
	  			location.reload();
	  		}
	  	});
	}
	function addItemToRRCart(form){
		if(disabledRR == 'false') {
			var localeName = $("#nonPrimaryLocale").val();
			var catId = '';
			var formObj = $("#"+form);
			var skuId = '';
			var prodId = '';
			var isSingle = false;
			if(form == 'addCartItem') {
				skuId = $("#"+form).find('#rrSkuId').val();
				prodId = $("#"+form).find('#rrProductId').val();
				catId = $('#rrCategoryId_'+prodId).val();
			} else {
				isSingle = true;
				prodId = form;
				skuId = $('#rrSkuId_'+prodId).val();
				catId = $('#rrCategoryId_'+prodId).val();
			}
			jQuery.ajax({
				url: localeName+'/rrRecommendations/rrFragments/rrAddToCartEvent.jsp',
				type: 'POST',
				data: {rrSkuId:skuId, rrProductId: prodId, rrCategoryId: catId},
				dataType:"html",
				async: false,
				success: function(data) {
					$('#pageType').val("addToCart");
					$('#rrAddTocartEvent').html("");
					$('#rrAddTocartEvent').html(data);
				},
				complete : function(){
					focusTop();
					location.reload();
				}
			});
		} else {
			focusTop();
			location.reload();
		}
	}
	function focusTop(){
		$(window).scrollTop(0);
	}
	function addOrRemoveFavourite($this){
		  $.ajax({
	  		url: $this.attr('href'),
	  		dataType:  "JSON",
	  		type: "POST",
	  		success: function(data){
	  			if(data.errorMessage != undefined) {
					var errors = data.errors;
					$('.alert-message--error').removeClass("hidden");
					for(i in errors){
						$('.serverErrors').html(errors[i].message);
						$('.serverErrors').show();
						$('.noLongerErrorMsg').hide();
						$('.ajaxErrorMessage').hide();
					}
	  			} else {
					var idValue = '#addOrRemoveToFav'+data.catalogRefID;
					var pageName = data.pageName;
					 $this.attr('href',data.url);
					 $this.attr('title',data.title);
					 $this.attr('class','link-secondary addOrRemoveToFav');
					 if(pageName == "quickViewPopup"){
						 $(idValue).text("");
						 $('.popSuccessMessage').show();
						 var addToFavSuccessMessage = data.successMessage;
						 if(typeof data.successMessage_productName != "undefined") {
							 addToFavSuccessMessage += " <span class='splitString'>"+data.successMessage_productName+"</span>";
						 }
						 $('.favorites').html(addToFavSuccessMessage);
						 $('.favorites').show();
					 } else {
						 $(idValue).text("");
						 $('.successMessage').show();
						 $('.successMessage p').hide();
						 var addToFavSuccessMessage = data.successMessage;
						 if(typeof data.successMessage_productName != "undefined") {
							 addToFavSuccessMessage += " <span class='splitString'>"+data.successMessage_productName+"</span>";
						 }
						 $('.addToFav').html(addToFavSuccessMessage);
						 $('.addToFav').show();
						 screenLiveAnnounce($('.successMessage .addToFav').text());
					 }
					 if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
							dtmAddToMyWishList($this);
					 }
	  			}
	  		},
	  		error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
	  	});

	}



	 /* start of edit gift card */

	$(document).on('show.bs.modal', '#shopping-bag-edit-gift-card-step-one-modal', function(event){
		hideMessage();
    	$("#shopping-bag-edit-gift-card-step-one-modal .modal-body").load($(event.relatedTarget).attr("data-url"), function(){
			var targetModel = $("#shopping-bag-edit-gift-card-step-one-modal");
    		modelReset(targetModel);
    	});
    });
	 /* maintains the state for showing the 2nd modal on edit gift card flow */
	 var IS_EMAIL_GIFT_CARD = false;
	 var modelTwo;
	 var giftcardAmount = '';
	 $(document).on('click', '#continue-gift-card-edit' ,function(e){
		 e.preventDefault();
		 var minAmount = $('#giftcardMinLimit').val();
		 var maxAmount = $('#giftcardMaxLimit').val();
		 var userAmount = $('#SelectInput').val();
		 giftcardAmount = $('#giftCardAmount option:selected').val();
		 if(giftcardAmount == "other"){
			 userAmount = userAmount;
		  }else{
			  userAmount = giftcardAmount;
		  }
		 if(userAmount != undefined && userAmount != ''){
			 userAmount = userAmount.replace('$', "");
			 userAmount = parseFloat(userAmount);
		 }
		 if(minAmount != undefined && minAmount != ''){
			 minAmount = parseFloat(minAmount);
		 }
		 if(maxAmount != undefined && maxAmount != ''){
			 maxAmount = parseFloat(maxAmount);
		 }
		 if(userAmount < minAmount || maxAmount < userAmount){
			 $('#giftCardMaxLimitErrors #minAmount').text('$'+minAmount);
			 $('#giftCardMaxLimitErrors #maxAmount').text('$'+maxAmount);
			 $('#giftCardMaxLimitErrors').css('display', 'block');
		 }else{
			 $('#giftCardMaxLimitErrors').css('display', 'none');
			 modelTwo = $(this).closest('form').find('#continue-gift-card-edit-modelTwo').val();

		 /* reset e-mail gift card state */
		 IS_EMAIL_GIFT_CARD = false;
		 $('#SelectInput').parsley({}).on('field:error', window.KOR.util.dontValidateHiddenField);

		 if($('#gift-card-edit-form').parsley().validate()){
			 $('#giftAmountPop').val(userAmount);
			  /* hide the edit gift card modal, step 1 */
			  $('#shopping-bag-edit-gift-card-step-one-modal').modal('hide');

			  IS_EMAIL_GIFT_CARD = ($('select[name=giftCardSendByDropdown]').val() === 'true');
			  if(IS_EMAIL_GIFT_CARD == false){
					//Write the ajax trigger function here
					ajaxFormSubmit($("#gift-card-edit-form"));
			  }
	    }
		}
	 });

	/* show the e-mail gift card modal if the state was selected and
	the first modal has closed completely */
	$('#shopping-bag-edit-gift-card-step-one-modal').on('hidden.bs.modal', function () {
		if (IS_EMAIL_GIFT_CARD) {
		  giftcardAmount = $(this).find('#giftCardAmount option:selected').val();
		  if(giftcardAmount == "other"){
			giftcardAmount = $('#SelectInput').val();
			giftcardAmount = giftcardAmount.replace('$', "");
		  }
		  IS_EMAIL_GIFT_CARD = false;
		  $('#shopping-bag-edit-gift-card-step-two-modal').modal('show');
	    }
	});

	/*e-mail gift card modal load content*/
	$("#shopping-bag-edit-gift-card-step-two-modal").on('show.bs.modal', function(event){
		$("#shopping-bag-edit-gift-card-step-two-modal .modal-body").load(modelTwo , function(){
			$('.js-tabsPanel').tabsPanel();
			$('#shopping-bag-edit-gift-card-step-two-modal').find('#giftAmountPop').val(giftcardAmount);

			var toName = $('#gift-card-edit-form').find('#toName').val();
			var fromName = $('#gift-card-edit-form').find('#fromName').val();
			var recipientEmail = $('#gift-card-edit-form').find('#recipientEmail').val();
			var message = $('#gift-card-edit-form').find('#message').val();

			$('#shopping-bag-edit-gift-card-step-two-modal').find('#giftCardTo').val(toName);
			$('#shopping-bag-edit-gift-card-step-two-modal').find('#giftCardFrom').val(fromName);
			$('#shopping-bag-edit-gift-card-step-two-modal').find('#recipientsEmail').val(recipientEmail);
			$('#shopping-bag-edit-gift-card-step-two-modal').find('#message').val(message);
			$('#shopping-bag-edit-gift-card-step-two-modal').find('#retypeEmail').val(recipientEmail);
			$('#shopping-bag-edit-gift-card-step-two-modal').find('#giftcardOtherAmount').val(giftcardAmount);

			var $form = $(this).find('form');
			$form.parsley().reset();
		});

	});

	$(document).on('change', '#giftCardAmount', function(){
		var val = $(this).val();
		if(val == 'other'){
			$('#SelectInput').parsley().reset();
			$('#edit_GiftCardOther_val').collapse('show');
		}
		else{
			$('#edit_GiftCardOther_val').collapse('hide');
		}

	  });
	$(document).on('change', '#send_by_dropdown', function(){
		$("#gift-card-edit-form .pdp-candc-section").show();
		if($("select[name=giftCardSendByDropdown]").val() =="true"){
			$("#gift-card-edit-form .pdp-candc-section").hide();
		}
	});

	/* end of edit gift card */
	disableSelectPicker();

	function updateCheckoutOrderSummary(promoApplied){
		var empPromotion = "";
		$("#shippingMethodsContainer").load(localeName+"/checkout/includes/shippingMethod.jsp", function(){
			$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $(".shipping-method:checked").val()}, function(data) {
				$.ajax({
					url: localeName+'/checkout/includes/updateCheckoutRightContent.jsp?promoApplied='+promoApplied+'&isShipping=true',
					type:'POST',
					dataType: "json",
					success: function(data) {
						if(data.promotionSection != ""){
							$('#applyPromotion').html(data.promotionSection);
						}
						var $deskCurrentstep = $('.panel-group .panel.current').index();
						if(data.orderSummarySection != "" && $deskCurrentstep == 0){
							$('#totalOrderSummary').html(data.orderSummarySection);
						}
						if(data.miniCartSection != ""){
							$('#miniCartSection').html(data.miniCartSection);
							$('#miniCartSectionMobile').html(data.miniCartSection);
						}


						if($deskCurrentstep == 1){
							$("#billingContainer").attr("data-submitvalidate", "false");
							$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
								$("#payment-step").removeClass("hidden");
								wizardInit(1);
								billingInit(true);
								initializeBillingZipcode();
							  initializeBillingAddress1();
								if(mobileRequest == 'false') {
							    $("#billingContainer").find('.selectpicker').selectpicker('refresh');
								}
							});
						}
						 $(".shipping-completed").load(localeName + "/checkout/includes/shippingFormInfo.jsp");
					},
					complete: function(){
						empPromotion = $(".empPromotion").val();
						newCheckoutMkobj.promoToggle();
						/*waseem -ECB-12794 24/08/2017*/
						if(empPromotion == "true"){
							$(".payPalCheckoutShipping").addClass('hidden');
						}else{
							$(".payPalCheckoutShipping").removeClass('hidden');
						}
					}
				});
			});
		});
		refreshLoyaltyPoints();
	}

	function updateCheckoutOrderSummaryForMobile(promoApplied){

		$("#shippingMethodsContainer").load(localeName+"/checkout/includes/shippingMethod.jsp", function(){
			$.post(localeName+'/checkout/includes/updateShipMethod.jsp', {shipMethod : $(".shipping-method:checked").val()}, function(data) {
				$.ajax({
					url: localeName+'/checkout/includes/updatePromotionContentForMobile.jsp?promoApplied='+promoApplied,
					type:'POST',
					dataType: "json",
					success: function(data) {
						if(data.promotionSectionForMobileShipping != ""){
							$('.promotionSectionForMobileShipping').html(data.promotionSectionForMobileShipping);
						}

						if(data.promotionSectionForMobileBilling != ""){
							$('.promotionSectionForMobileBilling').html(data.promotionSectionForMobileBilling);
						}

						var $mobCurrentstep = $('.panel-group .panel.slick-current').index();

						if(data.orderSummarySectionForMobile != "" && $mobCurrentstep == 0){
							$('#totalOrderSummary').html(data.orderSummarySectionForMobile);
						}
					},
					complete : function(){

						var $mobCurrentstep = $('.panel-group .panel.slick-current').index();

						if($mobCurrentstep == 1){
							$("#billingContainer").attr("data-submitvalidate", "false");
							$("#billingContainer").load(localeName+"/checkout/includes/containerBilling.jsp", function(){
								$("#payment-step").removeClass("hidden");
								wizardInit(1);
								billingInit(true);
								initializeBillingZipcode();
							    initializeBillingAddress1();
							    setTimeout(function(){
								    if($("#payment-step #promocodediscounttable").length > 0){
								    	$(".promotionSectionForMobileBilling .js-boxToggle").trigger('click');
								    }
							    }, 1000);
							});
						}else if($mobCurrentstep == 0){
							setTimeout(function(){
							var panelGroup = $('.panel-group');
						      if(panelGroup.hasClass('slick-initialized')){
						    	  panelGroup[0].slick.setOption("speed",0);
						        panelGroup[0].slick.setPosition();
						      }
							},10);
							newCheckoutMkobj.promoToggle();
						}
						/*setTimeout(function(){
					      var panelGroup = $('.panel-group');
					      if(panelGroup.hasClass('slick-initialized')){
					        panelGroup[0].slick.setPosition();
					      }
						});*/
					}

				});
			});
		});
		refreshLoyaltyPoints();
	}

	$(document).on("focus click dbclick", "#shopping-bag-promo", function(){
		setTimeout(function(){
		var panelGroup = $('.panel-group');
	      if(panelGroup.hasClass('slick-initialized')){
	    	  panelGroup[0].slick.setOption("speed",0);
	        panelGroup[0].slick.setPosition();
	      }
		},10);
	});
	/*<dattaprasad> for sign-in-form in shopping cart page starts*/
	$(document).on("submit", '#sign-in-form', function(e) {
		e.preventDefault();
		var localeName = $("#nonPrimaryLocale").val();
		if (localeName == null) {
			localeName = "";
		}
		form = $(this);
		formId = $(this).attr("id");
		form.find('label.error').addClass('hiddenErrorMsg'); /*<dattaprasad> GWSIT-550 fixed on 03-11-2015*/
		fieldsArray = form.serializeArray();
		fieldsArray.push({
			name : "formName",
			value : formId
		});
		successUrl = $(this).find('#successUrl').val();
		errorUrl = $(this).find('#errorUrl').val();
		jQuery.ajax({
			url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
			type : "post",
			data : fieldsArray,
			dataType : "json",
			cache : false,
			success : function(data) {
				renderAjaxSuccessCallBack(data, formId, successUrl);
			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
		});
	});
	/*<dattaprasad> for sign-in-form in shopping cart page ends*/


	$(document).on('click', '#shopping-bag-promo', function(){
		hideMessage();
		var errorMessage = $('#errorMessage').text();
		var errorMessageMobile = $('.errorMessageMobile').text();
		$('#wizardPanels .slick-list').css("height","auto");/* Baskar GWSIT-486 fixed*/
		if(errorMessage.length > 0 || errorMessageMobile.length > 0){
			$('#errorMessage').css("display","none");
			$('.errorMessageMobile').css("display","none");
		}
	});

	$(document).on('hide.bs.collapse' , '#cartPromotion , #checkoutPromotion , #billingPromotion , #shippingPromotion', function(){
		$(this).find('.promo-code-form').parsley().reset();
		$(this).find('#shopping-bag-promo').val('');
		$('#errorMessage').hide();
		$('.errorMessageMobile').hide();
	});

	/* gift card confirm email validation */
	$(document).on('change', '#recipientsEmail', function(){
		$('#retypeEmail').trigger('change');
	});

	function giftWrapNoteUpdate(){
		$('#gift_wrap_note').load(localeName+"/checkout/includes/giftWrapSelection.jsp", function(){
			setTimeout(function(){
		      var panelGroup = $('.panel-group');
		      if(panelGroup.hasClass('slick-initialized')){
		        panelGroup[0].slick.setPosition();
		      }
			});
		});
		$('#totalOrderSummary').load(localeName+"/checkout/includes/checkoutOrderTotalSummary.jsp");
		$('#miniCartSection').load(localeName+"/checkout/includes/checkOutCartLineItems.jsp");
		$('#miniCartSectionMobile').load(localeName+"/checkout/includes/checkOutCartLineItems.jsp", function(){
			newCheckoutMkobj.promoToggle();
		});

	}

	/*sign in model reset <waseem> GWSIT 270 date 4-11-15*/
	$("#checkout-sign-in-modal").on("hidden.bs.modal", function(){
		$('#checkout-sign-in-modal').find('label.error').addClass('hiddenErrorMsg');
		$('#sign-in-submit').removeClass('btn-primary');
		$('#sign-in-submit').addClass('btn-disabled');

	});
	$("#checkout-sign-in-modal").on("shown.bs.modal", function(e){
		if($(e.relatedTarget).hasClass('fromWishList')){
			var productId = $('#anonyProductId').val();
			var skuId = $('#anonyCatRefId').val();
			var cartURLForAnony = $('#cartURLForAnony').val();
			if(productId != null || productId != undefined){
				$.ajax({
					url: localeName+"/myaccount/anonyAddToFav.jsp?productId="+productId+"&skuId="+skuId+"&cartURLForAnony="+cartURLForAnony,
					contentType: 'text/plain',
					type:'GET',
					dataType: 'html',
					success: function(data) {
						//window.location=localeName+successUrl;
					},
					error: function(xhr, ajaxOptions, thrownError) {
						newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
					}
				});
			}
		}
	});
	/*Added for ECOSIT-762*/
	displayPayPalLogo();

	/* <Hema> Click and collect MKCAB-12 JS Starts */

		if($('#designated-location:checked').parent('.store_clc_label').hasClass('active')){
			$('.checkout-cc-pickupdetails').hide();
		}
		$(document).on('click','input[name=storelocation]',function(){
			$('.store_clc_label').removeClass('active');
			$(this).parent('.store_clc_label').addClass('active');
			var pickupstore=$('#designated-person:checked').parent('.store_clc_label');
			if(pickupstore.hasClass('active')){
				$('.checkout-cc-pickupdetails').show();
			}
			else{
				$('.checkout-cc-pickupdetails').hide();
			}
		});

	/* <Hema> Click and collect MKCAB-12 JS End */
});
	/*Added for ECOSIT-762*/
	function displayPayPalLogo(){
		var isPaypalEnabled = $("#isPaypalEnabled").val();
		if(isPaypalEnabled == 'true'){
		   $('#payment-methods, .payment-methods').find('.icon-paypal').removeClass('hide');
		 }
		 else{
		   $('#payment-methods, .payment-methods').find('.icon-paypal').addClass('hide');
		 }
	}

	/* <Lakshmi Deepthi> WEBA-1289 data layer promo code */
	function promoCodeSuccess(prcode,dtmpromo)

	{
		var  type;
		var eventType;
		if(prcode=="shoppingCart"){
			type=prcode;
		}else{
			type ="checkout:" + prcode;
			}

		eventType = type;
		var errorEvent = {};
		var promocode;
		var eventFrom = eventType;
		var ddPromoCodeEvent = {

				eventInfo: {
                   eventName: "promoCodeApplied",
                   promoCode: dtmpromo,
                   type: eventType, // Page type : checkout:Billing/checkout:Review/checkout:shipping/shoppingCart
                   timeStamp: new Date(),
                   processed: {
                	   "adobeAnalytics": false, //dtm will change this to true once processed
                	   "vendorTags": false //dtm will change this to true once processed
                	   }
		}
		};

		window.mkorsData = window.mkorsData || {};
		window.mkorsData.event = window.mkorsData.event || [];
		window.mkorsData.event.push(ddPromoCodeEvent);
		sendCustomEvent('promoCodeSuccess');
		}
	/* <Lakshmi Deepthi> WEBA-1289 data layer promo code */
function updateBagPopupChangeQty(productId , qty) {
	var qtyId = "#qty_sel_"+productId
	$(qtyId).val(qty);
}

var autocompleteZip={};
var autocompleteAdd={};
var autocompleteBillingZip={};
var autocompleteBillingAdd={};
var componentForm = {
	administrative_area_level_1 : 'short_name',
	locality : 'long_name',
	postal_code : 'short_name',
	street_number : 'long_name',
	route : 'long_name',
	sublocality_level_1 : 'long_name',
	country: 'short_name'
};

var formFields = {
	administrative_area_level_1 : 'state',
	locality : 'locality',
	postal_code : 'zip-code',
	street_number : 'addr-1',
	route : 'addr-1',
	sublocality_level_1 : 'addr-2',
	country: "country-select"
};

var countryCode = $("#defaultCntry").val();
var canadaPostApiEnable = $("#canadaPostApiEnable").val() || "false";

if(canadaPostApiEnable == "true" && countryCode != "CA"){
	canadaPostApiEnable = "false";
}

function initializeZipcode() {
	if(canadaPostApiEnable != "true"){
		// Create the autocomplete object, restricting the search
		// to geographical location types.
		autocompleteZip = new google.maps.places.Autocomplete((document.getElementById('shipping-form').elements.namedItem("zip-code")),{types: ['geocode'],componentRestrictions: {country: countryCode}});
		// When the user selects an address from the dropdown,
		// populate the address fields in the form.
		google.maps.event.addListener(autocompleteZip, 'place_changed', function() {
			fillInAddress(autocompleteZip, "shipping-form");
			$('#shipping-form').find("#addr-1, #zip-code, #locality").trigger('change');
			$('#shipping-form').find("#state").trigger("focusout");
		});
	}
}
function initializeAddress1() {
	var formName= "shipping-form";
	if(canadaPostApiEnable != "true"){
		// Create the autocomplete object, restricting the search
		// to geographical location types.
		autocompleteAdd = new google.maps.places.Autocomplete((document.getElementById('shipping-form').elements.namedItem("addr-1")),{types: ['address'],componentRestrictions: {country: countryCode}});
		// When the user selects an address from the dropdown,
		// populate the address fields in the form.
		google.maps.event.addListener(autocompleteAdd, 'place_changed', function() {
			fillInAddress(autocompleteAdd, "shipping-form");
			$('#shipping-form').find("#addr-1, #zip-code, #locality").trigger('change');
			$('#shipping-form').find("#state").trigger("focusout");
		});
	}else{
		canadapostAPI.call(this, formName);
	}
}

function initializeBillingZipcode() {
	// Create the autocomplete object, restricting the search
	// to geographical location types.
	autocompleteBillingZip = new google.maps.places.Autocomplete((document.getElementById('payment-form').elements.namedItem("zip-code")),{types: ['geocode']});
	// When the user selects an address from the dropdown,
	// populate the address fields in the form.
	google.maps.event.addListener(autocompleteBillingZip, 'place_changed', function() {
		fillInAddress(autocompleteBillingZip, "payment-form");
		$('#payment-form').find("#addr-1, #zip-code, #locality, #country-select").trigger('change');
	});
}
function initializeBillingAddress1() {
	// Create the autocomplete object, restricting the search
	// to geographical location types.
	autocompleteBillingAdd = new google.maps.places.Autocomplete((document.getElementById('payment-form').elements.namedItem("addr-1")),{types: ['address']});
	// When the user selects an address from the dropdown,
	// populate the address fields in the form.
	google.maps.event.addListener(autocompleteBillingAdd, 'place_changed', function() {
		fillInAddress(autocompleteBillingAdd, "payment-form");
		$('#payment-form').find("#addr-1, #zip-code, #locality, #country-select").trigger('change');
	});
}



function fillInAddress(autocompleteValue, formName) {
	var clocality = false, updateShippingMethod = true;
	// Get the place details from the autocomplete object.
	var place = autocompleteValue.getPlace();
	for ( var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		if(addressType == "locality"){
			clocality = true;
		}
	}
	for (var component in formFields) {
		// document.getElementById(formName).elements.namedItem(formFields[component]).value = '';
		if(component != 'street_number' && component != 'route' && component != 'sublocality_level_1') {
			document.getElementById(formName).elements.namedItem(formFields[component]).value = '';
		} else if(autocompleteValue.types[0] == 'address') {
			document.getElementById(formName).elements.namedItem(formFields[component]).value = '';
		}
	}
	// Get each component of the address from the place details
	// and fill the corresponding field on the form.
	for ( var i = 0; i < place.address_components.length; i++) {
		var addressType = place.address_components[i].types[0];
		var isCanada=$('#isCanadaflag').val();
		if (componentForm[addressType]) {
			var val = document.getElementById(formName).elements.namedItem(formFields[addressType]).value;
			if(val == undefined || val==""){
				val = place.address_components[i][componentForm[addressType]];
			}else{
				if(formName == "payment-form"){
					val = val + " " + place.address_components[i][componentForm[addressType]];
				}
				else{
					if(isCanada){
						val = val + ", " + place.address_components[i][componentForm[addressType]];
					}
					else{
						val = val + " " + place.address_components[i][componentForm[addressType]];
					}
				}
			}
			if(formFields[addressType] == 'state'){
				if(formName == "payment-form"){
					billingstate = val;
				}

				if(formName == "payment-form"){
					var states = document.getElementById(formName).elements.namedItem(formFields[addressType]);
					for(var j = 0; j < states.length; j++){
						if(!states[j].disabled){
							states[j].value = val;
							fireCustomEvent(states[j], "select-change");
							updateShippingMethod = false;
							break;
						}
					}
				}else{
					document.getElementById(formName).elements.namedItem(formFields[addressType]).value = val;
					fireCustomEvent(document.getElementById(formName).elements.namedItem(formFields[addressType]), "select-change");
					updateShippingMethod = false;
				}
			}else{
				document.getElementById(formName).elements.namedItem(formFields[addressType]).value = val;
			}
			if(clocality && formFields[addressType] == 'addr-2' && isCanada && formName != "payment-form"){
				document.getElementById(formName).elements.namedItem(formFields['locality']).value = val;
			}
			if(!clocality && formFields[addressType] == 'addr-2'){
				document.getElementById(formName).elements.namedItem(formFields[addressType]).value = '';
				document.getElementById(formName).elements.namedItem(formFields['locality']).value = val;
			}
			if(formFields[addressType] == 'country-select' && updateShippingMethod){
				fireCustomEvent(document.getElementById(formName).elements.namedItem(formFields[addressType]), "select-change");
			}
		}
	}
}

function fireCustomEvent(element, eventName){
	var event;
	if (document.createEvent) {
	  event = document.createEvent("HTMLEvents");
	  event.initEvent(eventName, true, true);
	} else {
	  event = document.createEventObject();
	  event.eventType = eventName;
	}
	event.eventName = eventName;
	if (document.createEvent) {
	  element.dispatchEvent(event);
	} else {
		element.fireEvent("on" + event.eventType, event);
	}

}
/*Fix for MKPROD-1777 start waseem 19-05-2016*/
var shareGeolocate = false;
var shareGeolocateAdd = false;
var shareGeolocateBillZip = false;
var shareGeolocateBillAdd = false;

/*waseem ECB-12934 12/08/2017*/
/*To be invoked for canadapostcode api*/
function canadapostAPI(formName){
	var canadaPostKey = $("#canadaPostKey").val() || "";
	var addr_1 = document.getElementById(formName).elements.namedItem("addr-1"),
	addr_2 = document.getElementById(formName).elements.namedItem("addr-2"),
	locality = document.getElementById(formName).elements.namedItem("locality"),
	state = document.getElementById(formName).elements.namedItem("state"),
	zip_code = document.getElementById(formName).elements.namedItem("zip-code"),
	country = document.getElementById(formName).elements.namedItem("country-select");
	var field1 = document.getElementById("street-addresss");
	var fields = [
		{ element: addr_1, field: "Line1"},
		{ element: addr_2, field: "Line2", mode: pca.fieldMode.POPULATE },
		{ element: locality, field: "City", mode: pca.fieldMode.POPULATE },
		{ element: state, field: "ProvinceName", mode: pca.fieldMode.POPULATE },
		{ element: zip_code, field: "PostalCode" },
		{ element: country, field: "CountryName", mode: pca.fieldMode.POPULATE }
	],
	options = {
		key: canadaPostKey,
		culture: localeName
	};
	cpc = new pca.Address(fields, options);

	cpc.listen('ready', function() {
		console.log("canadaAC ready");
		cpc.setCountry(countryCode);
	});

	cpc.listen("populate", function (address) {
		console.log("canadaAC populate");
		if(address.Province != ""){
			state.value = address.Province;
			fireCustomEvent(state, "select-change");
			$('#shipping-form').find("#addr-1, #zip-code, #locality").trigger('change');
			$('#shipping-form').find("#state").trigger("focusout");
		}
	});
}

function canadapostbillingAPI(formName){
	var canadaPostKey = $("#canadaPostKey").val() || "";
	var addr_1 = document.getElementById(formName).elements.namedItem("addr-1"),
	addr_2 = document.getElementById(formName).elements.namedItem("addr-2"),
	locality = document.getElementById(formName).elements.namedItem("locality"),
	states = document.getElementById(formName).elements.namedItem("state"),
	zip_code = document.getElementById(formName).elements.namedItem("zip-code"),
	country = document.getElementById(formName).elements.namedItem("country-select"),state;
	if(formName == "payment-form"){
		for(var i = 0; i < states.length; i++){
			if(!states[i].disabled){
				state = states[i];
			}
		}
	}else{
		state = states;
	}
	var field1 = document.getElementById("street-addresss");
	var fields = [
		{ element: addr_1, field: "Line1"},
		{ element: addr_2, field: "Line2", mode: pca.fieldMode.POPULATE },
		{ element: locality, field: "City", mode: pca.fieldMode.POPULATE },
		{ element: state, field: "ProvinceName", mode: pca.fieldMode.POPULATE },
		{ element: zip_code, field: "PostalCode" },
		{ element: country, field: "CountryName", mode: pca.fieldMode.POPULATE }
	],
	options = {
		key: canadaPostKey,
		culture: localeName
	};
	cpcbilling = new pca.Address(fields, options);

	cpcbilling.listen('ready', function() {
		cpcbilling.setCountry(countryCode);
	});

	cpcbilling.listen("populate", function (address) {
		console.log("canadaAC populate");
		if(address.Province != "" && formName == "payment-form"){
			billingstate = address.Province;
			fireCustomEvent(state, "select-change");
			$('#payment-form').find("#addr-1, #zip-code, #locality, #country-select").trigger('change');
		}
	});
}
/*To be invoked for canadapostcode api*/

function geolocate() {
	if (navigator.geolocation && shareGeolocate == false && canadaPostApiEnable == "false" ) {
		shareGeolocate = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);
			var circle = new google.maps.Circle({
				center : geolocation,
				radius : position.coords.accuracy
			});
			autocompleteZip.setBounds(circle.getBounds());

		});
	}else if(typeof(cpc) != "undefined" && cpc.country != "CAN"){
		/*waseem ECB-12934 12/08/2017 canadapostcode api*/
		cpc.setCountry(countryCode);
	}
}
function geolocateAdd() {
	if (navigator.geolocation && shareGeolocateAdd == false && canadaPostApiEnable == "false" ) {
		shareGeolocateAdd = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);
			var circle = new google.maps.Circle({
				center : geolocation,
				radius : position.coords.accuracy
			});
			autocompleteAdd.setBounds(circle.getBounds());
		});
	}else if(typeof(cpc) != "undefined" && cpc.country != "CAN"){
		/*waseem ECB-12934 12/08/2017 canadapostcode api*/
		cpc.setCountry(countryCode);
	}
}

//$("#shopping-bag-edit-gift-card-step-one-modal").on('show.bs.modal', function(event){
//    $("#shopping-bag-edit-gift-card-step-one-modal .modal-body").load($(event.relatedTarget).attr("data-url"));
//
//}); //Commented as part of defect fix GWSIT-215 - Manjula - Editgiftcard modal is getting called twice

function geolocateBillZip() {
	if (navigator.geolocation && shareGeolocateBillZip == false) {
		shareGeolocateBillZip = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);
			var circle = new google.maps.Circle({
				center : geolocation,
				radius : position.coords.accuracy
			});
			autocompleteBillingZip.setBounds(circle.getBounds());

		});
	}
}
function geolocateBillAdd() {
	if (navigator.geolocation && shareGeolocateBillAdd == false) {
		shareGeolocateBillAdd = true;
		navigator.geolocation.getCurrentPosition(function(position) {
			var geolocation = new google.maps.LatLng(position.coords.latitude,
					position.coords.longitude);
			var circle = new google.maps.Circle({
				center : geolocation,
				radius : position.coords.accuracy
			});
			autocompleteBillingAdd.setBounds(circle.getBounds());
		});
	}
}
/*Fix for MKPROD-1777 end waseem 19-05-2016*/

//Starts - Added for monogramming - MKFP-175
function updateSessionVariables(cid, hrefValue){
	var successUrl = hrefValue;
	$.ajax({
		url: localeName+'/checkout/includes/setSessionVariable.jsp?cid='+cid,
		contentType: 'text/plain',
		type:'GET',
		dataType: 'html',
		success: function(data) {
			window.location=localeName+successUrl;
		},
		error: function(xhr, ajaxOptions, thrownError) {
			newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
		}
		});
}

function initializeEditAddMonoLink(){
	$('.edit_monogram').on('click',function(e){
		e.preventDefault();
		var hrefValue = $(this).attr('href');
		var cid = $(this).closest('.monoItem').find('#commItemId').val();
		 updateSessionVariables(cid,hrefValue);
	});

	$('.addAmonogramCart').on('click',function(e){
		e.preventDefault();
		var hrefValue = $(this).attr('href');
		var cid = $(this).closest('.nonMonoItem').find('#commItemId').val();
		 updateSessionVariables(cid, hrefValue);
	});
}
//ends - Added for monogramming - MKFP-175
function disableSelectPicker(){
	$('.selectpicker.disabledSelectBox').each(function(){
		$(this).attr("disabled","disabled");
	});
}

function chekcoutSingIn(){
	mkorsData.page.name="Checkout:Login";
	mkorsData.page.channel="checkout";
	mkorsData.page.type="Checkout:Login";
	mkorsData.page.siteSectionLevel2="Checkout:Login";
	mkorsData.page.siteSectionLevel3="Checkout:Login";
	_satellite.track("Checkout login");
}
function updatedtmSessionVariables(rrPagename){
	$.ajax({
		url: localeName+'/checkout/includes/dtmSessionVariable.jsp?rrPagename='+rrPagename,
		contentType: 'text/plain',
		type:'GET',
		dataType: 'json',
		success: function(data) {
			 return true;
		},error: function(err){
			return false;
		}
		});
}

/*<Dattaprasad> starts here*/
$(function(){
	/*waseem LYLT-381 30/10/2016*/
	if($("#createAccountForm").length > 0){
		$('#createAccountForm').parsley();
	}

	$(document).on('input','#birth_month,#birth_day',function(){
		/*<dattaprasad> LYLTUAT-46 Fixed on 01-12-2017 starts*/
		var thisObj = $(this);
		var limitLength = 2;
		if (thisObj.val().length > limitLength) {
			thisObj.val(thisObj.val().slice(0,limitLength));
	    }
		/*<dattaprasad> LYLTUAT-46 Fixed on 01-12-2017 ends*/
		if($(this).attr("id") == "birth_day") {
			if($("#birth_month").parsley().isValid()){
				$("#birth_month").parsley().validate();
			}
		}
		if($(this).attr("id") == "birth_month") {
			if($("#birth_month").parsley().isValid()){
				$("#birth_day").parsley().validate();
			}
			if($(this).val().length < 1){
				$('#birth_day').attr("data-parsley-required", "false");
				$("#birth_day").parsley().reset();
			}
		}

	});
	/*waseem LYLTUAT-47 14/12/2017*/
	if($('#createAccountForm').length > 0) {
	  $('#createAccountForm').parsley().on('field:validated', function (fieldInstance) {
	   if ($(fieldInstance.$element).attr("id") == "birth_month") {
		   if(fieldInstance.value != ""){
			   $('#birth_day').attr("data-parsley-required", "true");
		   }else {
			   $('#birth_day').attr("data-parsley-required", "false");
		   }
		  }
	   // return fieldInstance.validationResult;
	  });
	}


	$("#createAccountForm").submit(function(e){
		e.preventDefault();
		$('.accountErrorMessage').addClass('hidden');
		if($('#createAccountForm').parsley().validate()){
			var localeName = $("#nonPrimaryLocale").val();
			if (localeName == null) {
				localeName = "";
			}
			var currentObj = $(this);
			var formId = currentObj.attr("id");
			var form = $("#" + formId);
			var fieldsArray = currentObj.serializeArray();
			fieldsArray.push({
				name : "formName",
				value : formId
			});
			$.ajax({
				url : localeName + '/checkout/common/ajaxFormSubmit.jsp',
				type : "post",
				data : fieldsArray,
				dataType : "json",
				cache : false,
				success : function(data) {
					if(data.result == "success"){
						localStorage.setItem("accountCreate",'true');
						if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
							try {
								registrationConfirmPage();
							}catch(err)  {
							}
						}
						var currentURL = location.href;
						if(currentURL.indexOf('?') > 0){
							currentURL += '&isReload=true';
						}else{
							currentURL += '?isReload=true';
						}

						var onLanding = false;

						location.href = currentURL;
						//location.reload();
					}else if(data.result == "error"){
						var currentSiteId = $('#mkSiteId').val();
						for(i=0;i<data.errors.length;i++) {
		                     var message = data.errors[i].message;
		                     if(message.indexOf(currentSiteId) != -1){
		                    	 message = message.replace(currentSiteId,"");
		                    	 $('.accountErrorMessage .ajaxErrorMessage').html(message);
		                     } else {
		                    	 $('.accountErrorMessage .ajaxErrorMessage').html(message);
		                     }

		            	 }
						korscheckoutobj.displayError(data, form, formId);
		         		$('.accountErrorMessage').removeClass('hidden');
		         		$('.alert-message--error').removeClass('hidden');
		         		$('.ajaxErrorMessage').show();
					}
				},
				error: function(xhr, ajaxOptions, thrownError) {
					newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
				}
			});
		}
	})
	billingstate = "";
	$(document).on('change', '#country-select', function(){
		var countryVal = $(this).val();
		$.ajax({
			url : localeName + '/checkout/includes/billingAddressStates.jsp?selectedCountry='+countryVal+'&selectedState='+billingstate,
			type : "post",
			dataType : "html",
			cache : false,
			beforeSend : function() {
				$("#custState").val("");
			},
			success : function(data) {
				$("#payment-form").find("#statedropdown").show();
				$("#payment-form").find("#custStateText").hide();
				$("#payment-form").find('#statedropdown select[name="state"]').prop("disabled",false);
				$("#payment-form").find('#custStateText input[name="state"]').prop("disabled",true);
				if(typeof data != undefined && data != "" && data != null){
					$("#payment-form").find("#state").html(data);
				}else{
					$('#custState').parsley().reset();
					$("#payment-form").find("#statedropdown").hide();
					$("#payment-form").find("#custStateText").show();
					$("#payment-form").find('#statedropdown select[name="state"]').prop("disabled",true);
					$("#payment-form").find('#custStateText input[name="state"]').prop("disabled",false);
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			},
			complete: function(){				
				billingstate = "";
			}
		});
	});
	$("#createAccountForm").on('change','input[name="gender"]', function(){
		$("#genderInfo").val($(this).val());
	});
});
/*<Dattaprasad> ends here*/

function setCurrentURLInCookie(obj) {
	var $this=$(obj);
	var name = $this.attr('name');
	var expires = "expires=-1"
	 var rlCurrentURL;
	if(name != undefined) {
		rlCurrentURL = name;
	} else {
		rlCurrentURL = $('#rlCurrentURL').val();
	}
	if(rlCurrentURL != undefined) {
		var path = "path=/";
		//console.log("Setting cookie for the current URL"+rlCurrentURL);
		document.cookie = "rlCurrentURL" + "=" + rlCurrentURL + "; path=/;";
	}
}
function trackRRLinkURL(productId){
	var rrLinkURL = $('#rrLinkURL_'+productId).val();
	if(rrLinkURL != undefined && rrLinkURL != '' && rrLinkURL != null){
		$('#rrQvTrack').attr('src', rrLinkURL);
	}
}

function hideMessage() {
	$('.popUpErrorMessage .alert-message--error').addClass('hidden');
	$('.errorMessage .alert-message--error').addClass('hidden');
	$('.alert-message--error').addClass('hidden');
	$('.custom-product-error').removeClass("hidden");
	$('.successMessage').hide();
	$('.popSuccessMessage').hide();
	$('.serverErrors').hide();
	//$('.noLongerErrorMsg').hide();
	$('.ajaxErrorMessage').hide();
	$('.successMessage').hide();
	$('.AnonyFavorites').hide();
	$(".alert-message__text").each(function(key,value){
		var currentObj = $(this);
		var customMessage = currentObj.find('p.p--no-margin').text().trim();
		var serverError = currentObj.find('p.serverErrors').text().trim();
		var ajaxErrorMessage = currentObj.find('p.ajaxErrorMessage').text().trim();
		if(typeof customMessage!=undefined && customMessage!="") {
			currentObj.closest('.alert-message--error').removeClass("hidden");
			currentObj.find('.serverErrors, .ajaxErrorMessage').show();
		}
		if(typeof serverError!=undefined && serverError!="") {
			currentObj.closest('.alert-message--error').removeClass("hidden");
			currentObj.find('.serverErrors, .ajaxErrorMessage').show();
		}
		if(typeof ajaxErrorMessage!=undefined && ajaxErrorMessage!="") {
			currentObj.closest('.alert-message--error').removeClass("hidden");
			currentObj.find('.serverErrors, .ajaxErrorMessage').show();
		}
	});
}

$(function(){
	/*Fix for GWSIT-405 starts*/
	$(document).on('click',".address-add-collection-link",function(){
		$('#saved-address-dropdown option[value="new"]').prop('selected', true);
		if(mobileRequest == 'false') {
			$("#saved-address-dropdown").selectpicker('refresh');
		}
	});
	/*Fix for GWSIT-405 ends*/
	/*Fix for GWSIT-428 starts*/
	$(document).on('click',".credit-add-collection-link",function(){
		$('#saved-cards-dropdown option[value="new"]').prop('selected', true);
		if(mobileRequest == 'false') {
			$("#saved-cards-dropdown").selectpicker('refresh');
		}
	});
	/*Fix for GWSIT-428 ends*/

	/*<dattaprasad> GWSIT-626 Fixed on 23-11-2015*/
	$('#gift-wrap-modal').on('hidden.bs.modal', function () {
		$.ajax({
			url : localeName + '/checkout/includes/giftWrapSelection.jsp',
			type : "post",
			dataType : "html",
			cache : false,
			success : function(data) {
				$("#gift_wrap_note").html(data)
			},
			error: function(xhr, ajaxOptions, thrownError) {
				newCheckoutMkobj.errorHandle(xhr, ajaxOptions, thrownError);
			}
		});
	});
	/*<dattaprasad> GWSIT-626 Fixed on 23-11-2015 ends*/
	$(document).on('click','.size_guide_link',function(e){
		e.preventDefault();
		var sizeGuideUrl = $(this).attr("href");
		openStoreSizeGuidWindow(sizeGuideUrl);
	});
	/* <Hema> Click and collect MKCAB-12 JS Starts */
	/*<sukraj> fix for FRKSIT-284 starts on 16/09/2016*/
	/*$(document).on('click','.details',function(e){
		e.preventDefault();
		$('.bopus-tooltip').show();
	});
	$(document).on('click','.bopus-tooltip .close-icon',function(){
		$('.bopus-tooltip').hide();
	});*/
	/*<sukraj> fix for FRKSIT-284 ends on 16/09/2016*/
	if($('#pickupinstore:checked').parents('.pdp_clc_section').hasClass('active')){
		/*Invoke GEO Code for findPosition*/
		getUserCurrentLocation();
		$('.checkstore-editpopup').show();
	}
	$(document).on('click','input[name=shiptoaddress]',function(){
		$('.pdp_clc_section').removeClass('active');
		$(this).parents('.pdp_clc_section').addClass('active');
		var pickupstore=$('#pickupinstore:checked').parents('.pdp_clc_section');
		if(pickupstore.hasClass('active')){
			/*Invoke GEO Code for findPosition*/
			getUserCurrentLocation();
			// $('.checkstore-editpopup').show();
			$(".checkstore-editpopup").css("cssText", "display: block !important;");
			$('.check-store-avail').show();
			$("#updateCart .submitFormAjaxForCheckout, #addCartItem #addToBag").attr("disabled","disabled");
			$('.customize-product, .item-meta').addClass('disabledCSS');
			$('.customize-product a, .item-meta a').addClass('disabledCSS');
			$('.customize-product a, .item-meta a').attr('disabled','disabled');
		}
		else{
			$('.checkstore-editpopup').hide();
			$('.hide-show').hide();
			$('.available-msg-container').hide();
			$("#updateCart .submitFormAjaxForCheckout, #addCartItem #addToBag").removeAttr("disabled");
			$('.customize-product, .item-meta').removeClass('disabledCSS');
			$('.customize-product a, .item-meta a').removeClass('disabledCSS');
			$('.customize-product a, .item-meta a').removeAttr('disabled','disabled');
		}
	});
	$(document).on('click','.find-instore',function(e){
		/*$('.not-avail-errormsg').show();*/	/*ECB-13686 Fix*/
		$('.checkstoreLabel').show();  /*<sathya> FRKSIT-433 21Sept2016*/
	});
	/* <Hema> Click and collect MKCAB-12 JS Ends */
});
var myWindow;
function openStoreSizeGuidWindow(sizeGuideUrl){
	  if(myWindow != undefined){
          myWindow.close();
	}
	var leftPos=($(window).width()-865)/2;
	var topPos=($(window).height()-650)/2;
	myWindow = window.open(sizeGuideUrl,"sizeGuideWindow","toolbar=no,scrollbars=yes,resizable=no,top="+topPos+",left="+leftPos+",width=865,height=650");
}
//START:DTM Implementation for wishlist page
/**
 * @author Ravi Prakash
 * DTM Implementation -while adding to wishlist
 * create object with eventInfo and product object
 */
function dtmAddToMyWishList($this){

	var productId = "";
	var mfr = "";
	var mfrItem = "";
	var pricePer = "";
	var upc = "";

	if($this.parent().find(".dtm_catalogRefId").val()){
		productId = $this.parent().find(".dtm_catalogRefId").val();
	}
	if($this.parent().find(".dtm_mfrBrand").val()){
		mfr = $this.parent().find(".dtm_mfrBrand").val();
	}
	if($this.parent().find(".dtm_mfrItemNum").val()){
		mfrItem = $this.parent().find(".dtm_mfrItemNum").val();
	}
	if($this.parent().find(".dtm_ci_salePrice").val()){
		pricePer = $this.parent().find(".dtm_ci_salePrice").val();
	}
	if($this.parent().find(".dtm_ci_productCode").val()){
		upc = $this.parent().find(".dtm_ci_productCode").val();
	}

	var ddAddToWishListEvent = {
			eventInfo: {
				"eventName"	: "addToWishList",
				 "type"	   	: "wishList",
			     "timeStamp": new Date(),
				 "processed": {
					 "adobeAnalytics": false, //dtm will change this to true once processed
              	   	  "vendorTags": false //dtm will change this to true once processed
				}
			},
			product:  {
				 "productId": productId,
				 "pricePer" :pricePer,
				 "mfr":mfr,
				 "mfrItemNum":mfrItem,
				 "upc":upc,
				 "quantity":1
				}
			};
			//Push it onto the event array on mkorsData object
			window.mkorsData = window.mkorsData || {};
			delete mkorsData.event;
			window.mkorsData.event = window.mkorsData.event || [];
			window.mkorsData.event.push(ddAddToWishListEvent);
			sendCustomEvent('addToWishList');
}

/**
 * @author Ravi Prakash
 * Creates and dispatches an event trigger
 * @param {String} evt - The name of the event
 */

function sendCustomEvent(evt){
	if (document.createEvent && document.body.dispatchEvent) {
		var event = document.createEvent('Event');
		event.initEvent(evt, true, true); //can bubble, and is cancellable
		document.body.dispatchEvent(event);
	} else if (window.CustomEvent && document.body.dispatchEvent) {
		var event = new CustomEvent(evt, {
			bubbles : true,
			cancelable : true
		});
		document.body.dispatchEvent(event);
	}
}

//END:DTM Implementation for wishlist page

$(document).ready(function() {
	if($("#AnonyFav_addWishList").val() == 'true'){
		AnonyFav_addWishList();
	}
	/*<dattaprasad> For DTM of product removal for edit Pop up & Custom Product ECB-11957 starts on 19-07-2017*/
	if($(".shoppingBagForCartLineItemDTM").length > 0){
		var shoppingBagForCartLineItemDTMObj = $(".shoppingBagForCartLineItemDTM");
		checkForDTMEditOrCustomProductRemoval(shoppingBagForCartLineItemDTMObj);
	    $(".shoppingBagForCartLineItemDTMContainer").remove();
	}
    /*<dattaprasad> For DTM of product removal for edit Pop up & Custom Product ECB-11957 ends on 19-07-2017*/
    if($(".signInSuccessDTM").length > 0) {
		var parentDTMContainer = $(".signInSuccessDTM");
		var type = parentDTMContainer.find("#userType").val();
		var loginStatus = parentDTMContainer.find("#transient").val();
		var loyaltyTier = parentDTMContainer.find("#loyaltyTier").val();
		var hashedID = parentDTMContainer.find("#email").val();
		var hashedID2 = parentDTMContainer.find("#emailSHA").val();
		var emailOptIn = "";
		var loyaltyOptIn = "";
		createSignInSuccessDTM(type,loginStatus,loyaltyTier,hashedID,hashedID2);
		parentDTMContainer.remove();
	}
});
function getEventInfo() {/*<Sukraj> added for WEBA-1272, WEBA-1273 on 23/09/2019*/
	var eventInfo = {};
	var removePrd = $(".shoppingBagForCartLineItemDTM[data-action='remove']");
	var addProd = $(".shoppingBagForCartLineItemDTM[data-action='add']");
	if(addProd.length > 0 && removePrd.length > 0) {
		eventInfo.prdSku = {};
		eventInfo.prdSku.isChange = addProd.find(".productID").val() != removePrd.find(".productID").val();
		eventInfo.shipMethod = {};
		eventInfo.shipMethod.isChange = addProd.find(".shippingMethod").val() != removePrd.find(".shippingMethod").val();
		if(eventInfo.shipMethod.isChange) {
			eventInfo.shipMethod.eventName = "shippingMethodUpdate";
			eventInfo.shipMethod.type = addProd.find(".shippingMethod").val();
		}
		eventInfo.quantity = {};
		var addPrdQty = parseInt(addProd.find(".quantity").val());
		var removePrdQty = parseInt(removePrd.find(".quantity").val());
		eventInfo.quantity.isChange = addPrdQty != removePrdQty;
		if(eventInfo.quantity.isChange) {
			eventInfo.quantity.eventName = "productQtyUpdate";
			eventInfo.quantity.type = addPrdQty > removePrdQty ? "increase" : "decrease";
			eventInfo.quantity.qtyDiff = Math.abs(addPrdQty - removePrdQty);
		}

	}
	return eventInfo;
}
/*<dattaprasad> For DTM of product removal for edit Pop up & Custom Product ECB-11957 starts on 19-07-2017*/
function checkForDTMEditOrCustomProductRemoval(shoppingBagForCartLineItemDTMObj){
	var isRemoveItem= "remove";
	var isCustom = "custom";
	var isAddItem = "add";
	var isOutOfStock = "outOfStock";
	var createSingleEvent = "";
	var shoppingBagForCartLineItemDTMObj = shoppingBagForCartLineItemDTMObj;
	var multipleParametersArr = [];
	var quantityArr = [];
	var eventName = "removeFromCart";
	var eventType = "cart";
	var eventFrom = eventType;
	var errorEvent = {};
	var eventInfo = getEventInfo();

	shoppingBagForCartLineItemDTMObj.each(function(i,val){
		var $this = $(this);
		var dataAction  = $(this).attr("data-action");
		if(eventInfo.prdSku && eventInfo.prdSku.isChange) {
			setDTMEventParameters($this,i,val,multipleParametersArr,quantityArr);
			if(dataAction == isAddItem){
				eventName = "addToCart";
			}
			if((dataAction == isAddItem) || (dataAction == isRemoveItem)){
				triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom,errorEvent);
				multipleParametersArr = [];
				quantityArr = [];
			}
		} else {/*<Sukraj> added for WEBA-1272, WEBA-1273 on 23/09/2019*/
			if (eventInfo.shipMethod && eventInfo.shipMethod.isChange && dataAction == isAddItem) {
				setDTMEventParameters($this,i,val,multipleParametersArr,quantityArr);
				eventName = eventInfo.shipMethod.eventName;
				eventFrom = eventName;
				triggerDTMEventParametersForCartRemoval(quantityArr, multipleParametersArr, eventName, eventInfo.shipMethod.type, eventFrom, errorEvent);
				multipleParametersArr = [];
				quantityArr = [];
			}
			if (eventInfo.quantity && eventInfo.quantity.isChange && dataAction == isAddItem) {
				setDTMEventParameters($this,i,val,multipleParametersArr,quantityArr);
				eventName = eventInfo.quantity.eventName;
				eventFrom = eventName;
				var qty = Array.from(String(eventInfo.quantity.qtyDiff), Number);
				triggerDTMEventParametersForCartRemoval(qty, multipleParametersArr, eventName, eventInfo.quantity.type, eventFrom, errorEvent);
				multipleParametersArr = [];
				quantityArr = [];
			}
		}
		if(dataAction == isCustom || dataAction == isOutOfStock){
			createSingleEvent = true;
		}
	});
	if(createSingleEvent == true){
		triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom,errorEvent);
	}
}
function setDTMEventParameters($this,i,val,multipleParametersArr,quantityArr){
	var parentContainer = $this.attr("class")+"_"+i;
    parentContainer = "#"+parentContainer;
    var quantity = "";
    var eventParametersObj = createDTMEventParametersForCartRemoval($this,parentContainer);
    multipleParametersArr.push(eventParametersObj);
    if($this.closest(parentContainer).find(".quantity").val()){
    	quantity = $this.closest(parentContainer).find(".quantity").val();
    	quantityArr.push(quantity)
    }
}
/*<dattaprasad> For DTM of product removal for edit Pop up & Custom Product ECB-11957 ends on 19-07-2017*/
/*<sukraj> fix for FRKSIT-284 starts on 16/09/2016*/
function bopusTooltipInit(){
	 var bopusTooltipContent=$(".bopus-tooltip").html();
	 $('.details').tooltip({
		    placement: 'bottom',
		    html: true,
		    container: $('.details'),
		    title: bopusTooltipContent,
		    trigger: 'manual'
		  }).click(function(e) {
			  $(this).tooltip('show');
			  e.stopPropagation();
			  if($(e.target).is('.close-icon')){
			        $(this).tooltip('hide');
			    }
		  });
}
/*<sukraj> fix for FRKSIT-284 ends on 16/09/2016*/
function AnonyFav_addWishList(){
	var productId = "";
	var mfr = "";
	var mfrItem = "";
	var pricePer = "";
	var upc = "";

	var parentObj = $(".dtmAnonyContainer");
	if(parentObj.find(".dtmAnony_catalogRefId").val()){
		productId =parentObj.find(".dtmAnony_catalogRefId").val();
	}
	if(parentObj.find(".dtmAnony_mfrBrand").val()){
		mfr = parentObj.find(".dtmAnony_mfrBrand").val();
	}
	if(parentObj.find(".dtmAnony_mfrItemNum").val()){
		mfrItem = parentObj.find(".dtmAnony_mfrItemNum").val();
	}
	if(parentObj.find(".dtmAnony_ci_salePrice").val()){
		pricePer = parentObj.find(".dtmAnony_ci_salePrice").val();
	}
	if(parentObj.find(".dtmAnony_ci_productCode").val()){
		upc = parentObj.find(".dtmAnony_ci_productCode").val();
	}


	var ddAddToWishListEvent = {
			eventInfo: {
				"eventName"	: "addToWishList",
				 "type"	   	: "wishList",
			     "timeStamp": new Date(),
				 "processed": {
					 "adobeAnalytics": false, //dtm will change this to true once processed
              	   	 "vendorTags": false //dtm will change this to true once processed
				}
			},
			product:  {
				 "productId": productId,
				 "pricePer" :pricePer,
				 "mfr":mfr,
				 "mfrItemNum":mfrItem,
				 "upc":upc,
				 "quantity":1
				}
			};
			//Push it onto the event array on mkorsData object
			window.mkorsData = window.mkorsData || {};
			delete mkorsData.event;
			window.mkorsData.event = window.mkorsData.event || [];
			window.mkorsData.event.push(ddAddToWishListEvent);
			sendCustomEvent('addToWishList');
}

/* Start: MKCAB-12 Click and Collect */
function checkStore_Person(checkedRadio){
	$('input[name=selected_store]').parent().removeClass('active');
	$(checkedRadio).parent().addClass('active');
	var radioId=$(checkedRadio).attr('id');
	var buttonId=radioId.split('_');
	if(buttonId[1]=='designated-person'){
		var activeClass=$('#'+buttonId[0]+'_designated-person:checked').parent().hasClass('active');
    	if(activeClass){
    		$('#checkout-cc-pickupdetails_'+buttonId[0]).show();
    		 /*<sukraj> fix for FRKSIT-535 starts on 26/09/2016*/
		 	var j = $('#checkout-cc-pickupdetails_'+buttonId[0]).find("input,select").toArray();
	        for (var k = 0; k < j.length; k++) {
	            $(j[k]).parsley().reset()
	        }
	        /*<sukraj> fix for FRKSIT-535 ends on 26/09/2016*/
    	}
	}
	else{
    		$('#checkout-cc-pickupdetails_'+buttonId[0]).hide();
    	}

	/*waseem fix for FRKSIT-246 on 18/09/2016*/
	newCheckoutMkobj.resizeSlick();
}
function geolocationSuccess(position) {
	var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': pos }, function (results, status){
		if (status == google.maps.GeocoderStatus.OK) {
			var address_components = results[0].address_components;
			var countryName = "";
			var zipCode = "";
			$.each(address_components, function(key,value){
				var typeComponentArr = value.types;
				var isCountry = $.inArray( "country", typeComponentArr );
				var isZipCode = $.inArray( "postal_code", typeComponentArr );
				if(isCountry != -1){
					countryName = value.long_name;
				}
				if(isZipCode != -1){
					zipCode = value.long_name;
				}
			});
			$('#find_store_field').val(zipCode);
		}
	})
}

function geolocationError(error) {
	console.log(error);
	//Any Error in GEO Location findPosition; then nothing
	/*var url=contextRoot+nonPrimarylocale+'/stores/';
	location.href=url;*/

}
function get_browser() {
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
        return {name:'IE',version:(tem[1]||'')};
        }
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
}
function getUserCurrentLocation(){
	var browser=get_browser();
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
	}
}
/*Starts: MKCAB-12 code added by Sujata */
function findPickUpStores(flag){
	$('.not-avail-errormsg').hide();
	$("#find_store_field-error").hide();
	//$('.check-store-avail').hide();
	var addressField = $('input#find_store_field').val();
	var userCountry = $('input#user_country').val();
	var address = $('input#find_store_field').val();
	var skuVal = $('input#skuId').val();
	var pageType = $('#pageType').val();
	if(pageType == undefined){
		pageType = "";
	}
	var searchRadius = null;
	if(skuVal  === undefined){
		$(".selSizeErrMsg").show();
		return false;
	}
	var prodVal = $('input#productId').val();
	var tempRadius = "";
	if(flag=='first'){
		tempRadius = $('#default_radius').val();
	}else{
		tempRadius = $('.store_distance').find(".filter-option").text();
	}
	searchRadius = tempRadius.substring(0,tempRadius.indexOf(" ")).trim();
	var geocoder = new google.maps.Geocoder();
	var lookForNextAvailStore = false;
	var emptySearchString='?skuId='+skuVal +'&lookForNextAvailStore='+lookForNextAvailStore+'&productId='+prodVal+'&pageType='+pageType;
	var storeType = "";
	//Start : Santhos Added fr_CA locale as part of ajax call 4/2/15
	var nonPrimarylocale = $("#nonPmyLocale").val();
	//End : Santhos Added fr_CA locale as part of ajax call 4/2/15
	var searchString= "";
	$("#find_store_field").keydown(function(){
		$('.errormessages').hide();
	});
	var flag=false;
	var placeHolder =  $('input#find_store_field').attr('placeholder');
	if(addressField == "" || addressField == placeHolder){
		$("#find_store_field-error").text($("#find_store_field").attr("data-msg-required")).show();
		return false;
	}else if(/^[a-zA-Z0-9-/, ]*$/.test(addressField) == false) {
		$("#find_store_field-error").hide();
		$("#find_store_field-error").text($("#find_store_field").attr("data-msg-required")).show();/* <dattaprasad> <FRKSIT-155> Fixed on 17-09-2015  */
		return false;
	}else{
		//findInStoreOmniture
		//starts-changed by adding sku value for findinstore
		/*Mohan Modified MKFP-304 DTM  */
		if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
		findInStoreOmniture(skuVal);
		}
		//ends-changed by adding sku value for findinstore
		var status = google.maps.GeocoderStatus.OK;
		geocoder.geocode({ 'address':address}, function(results, status){
			if(status == google.maps.GeocoderStatus.OK) {
				address = results[0].geometry.location;
				//:::::::: pass search string with latitude, longitude and search radius
				searchString = '?storetype=' + storeType + '&lat=' + results[0].geometry.location.lat() + '&lng=' + results[0].geometry.location.lng() + '&rad=' + searchRadius + '&addressField=' + addressField + '&country=' + userCountry + '&skuId='+skuVal +'&lookForNextAvailStore='+lookForNextAvailStore+'&productId='+prodVal+'&pageType='+pageType;
				$.ajax({
					url:nonPrimarylocale+'/checkout/common/responseStorePickUp.jsp'+searchString,
					type:'GET',
					dataType: 'html',
					success: function(data){
						loadPickUpStore(data);
					},
					error: function(xhr, ajaxOptions, thrownError) {
						if(xhr.status=='409'){
							location.href = sessionexpurl;
						}
						else{
							location.href = internalServerError;
						}
					}
				});
			}else{
				emptySearchString = emptySearchString + '&rad=' + searchRadius + '&addressField=' + addressField; /*<dattaprasad> FRKSIT-377 Fixed on 19-09-2016*/
				$.ajax({
					url:nonPrimarylocale+'/checkout/common/responseStorePickUp.jsp'+emptySearchString,
					type:'GET',
					dataType: 'html',
					success: function(data){
						loadPickUpStore(data);
					},
					error: function(xhr, ajaxOptions, thrownError) {

						if(xhr.status=='409'){
							location.href = sessionexpurl;
						}
						else{
							location.href = internalServerError;
						}
					}
				});
			}
		});
	}
}
function loadPickUpStore(data) {
	var htmldata = $.trim(data);
	var errorMessage = $(htmldata).find('.errorMessage').text();
	if(dtmEnabledFlag == "true" || adobeLaunchEnabledFlag  == "true"){
		var errortTypeDTM = "pickupInStore";
		var errorMessageDTM = errorMessage;
		var errorPageType = "";
		if(pageName == "checkout") {
			errorPageType = "checkout";
		} else {
			errorPageType = "cart";
		}
		addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType);
	}
	var len = $(htmldata).find('.errorMessage').length;
	if(len > 0) {
		$('.not-avail-errormsg').html(errorMessage);
		$('.not-avail-errormsg').show();
		$('.checkstoreLabel').show();  /*<sathya> FRKSIT-433 21Sept2016*/
		return;
	} else {
		var addressField = $('input#find_store_field').val();
		var skuVal = $('input#skuId').val();
		var prodVal = $('input#productId').val();
		var storeId ='';
		for(var i=0; i<$('input[name="availstore"]').length; i++){
			if($('input[name="availstore"]')[i].checked){
				storeId = $('input[name="availstore"]')[i].value;
			}
		}
	}
	$(".checkstore-editpopup").hide();
	$(".available-msg-container").html(data);
	$(".available-msg-container").show();
	if($('.hide-show').length>0){
		$('.hide-show').show();
	}
	else{
		$('.hide-show').hide();
	}
	var availedStores=[];
	availedStores=$(".available-msg-container").find('.avail-store-section');
	if($('.store_out_of_stock.no-location').length>0){
		$('.store_out_of_stock.no-location').parent('.location-label').find('label').addClass('disabled');
		var zipcode = $('input#find_store_field').val();
		var skuNo = $('input#skuId').val();
		var prodNo = $('input#productId').val();
		var storeNo = $('.avail-store-section input[name=availstore]').length ? $('.avail-store-section input[name=availstore]').val() : '',
			storeName = $('.avail-store-section input[name=availstore]').length ? $('.avail-store-section input[name=availstore]:first').data("store") : '';
		/* for(var i=0; i<$('input[name="availstore"]').length; i++){
			if($('input[name="availstore"]')[i].checked){
				var storeSel = $('input[name="availstore"]')[i];
				storeName = $(storeSel).data("storeName");
				storeNo = storeSel.value;
			}
		} */
		firePickUpInStoreSearchEvent(storeNo,zipcode,skuNo,prodNo,storeName);
	}
	var storesLen=availedStores.length;
	var splitCnt = 5;
	if(storesLen <= 0){
		$('.available-msg-container').hide();
		$('.checkstoreLabel').show();
		$('.checkstore-editpopup').show();
	}else{
		$('.not-avail-errormsg').hide();
		$('.checkstoreLabel').hide();
		$('.checkstore-editpopup').hide();
	}
	if(storesLen<=splitCnt){
		$('.show-more-stores').attr('disabled','disabled');
		$('.show-more-stores:disabled').css('color','#ccc');
	}
	for(var i=splitCnt;i<storesLen;i++){
		$(availedStores[i]).addClass('hide');
	}
	$(document).on('click','.show-more-stores',function(e){
		e.preventDefault();
		var hideStores=[];
		hideStores=$('.avail-store-section.hide');
		var hideStoresLen = hideStores.length;
		for(var m=0;m<hideStoresLen;m++){
			$(hideStores[m]).removeClass('hide');
			if(m===4){
				break;
			}
		}
		$(this).attr('disabled','disabled');
		$(this).addClass('disabledCSS');
		if($(".available-msg-container .avail-store-section").not('.hide').hasClass("active")){
			$("#updateCart .submitFormAjaxForCheckout").removeAttr("disabled");
		}
	});
	if($(this).hasClass("pqv")) {
		$('.show-more-stores').hide();
	}
	$(document).on('click','.edit-location',function(e){
		e.preventDefault();
		$('.checkstore-editpopup').show();
		$('.checkstoreLabel').show();
		$('.available-msg-container').hide();
		$('.hide-show').hide();
		$('.checkstore-editpopup').show();
		$("#updateCart .submitFormAjaxForCheckout, #addCartItem #addToBag").attr("disabled","disabled");
	});
	//$('.store_out_of_stock').parents().find('input[name=availstore]').attr('disabled','disabled');
	$(document).on('click','input[name=availstore]',function(){
		$('.avail-store-section').removeClass('active');
		$(this).parents('.avail-store-section').addClass('active');

	});
	if($(".available-msg-container .avail-store-section").not('.hide').hasClass("active")){
		$("#updateCart .submitFormAjaxForCheckout").removeAttr("disabled");
	}
	if($(".available-msg-container .avail-store-section").not('.hide').hasClass("active")){
		$("#addCartItem").find("#addToBag").removeAttr("disabled");
	}
}

$(document).ready(function(){

	$("body").on("keydown","#updateCart .check-store-text",function(e){
		e.stopImmediatePropagation();
	    var keyCode = e.keyCode || e.which;
	    var hasFocus=$("#updateCart .check-store-text").is(":focus");
	    if(keyCode==13){
	        if(hasFocus=== true){
	        	$('#updateCart .find-instore').trigger('click');
	        }
	        return false;
	    }
	});

	$("body").on("keydown","#shopping-bag-add-item-modal .check-store-text",function(e){
		e.stopPropagation();
		var keyCode = e.keyCode || e.which;
	    var hasFocus=$("#shopping-bag-add-item-modal .check-store-text").is(":focus");
	    if(keyCode==13){
	        if(hasFocus=== true){
	        	$('#shopping-bag-add-item-modal .find-instore').trigger('click');
	        }
	        return false;
	    }
	});
	/*RESDGN-417*/
	$('body').on('click','#shopping-bag-add-item-modal button.close, #shopping-bag-edit-item-modal button.close',function () {
	  $('.popUpErrorMessage').addClass('hidden');
	  $('#error-container').find('.serverErrors,.ajaxErrorMessage').show();
      if(window.s7videoplayer) {
    	  window.s7videoplayer.remove();
      }
	});
	$( ".showCheckoutSignInModal" ).click(function( e ) {
		e.stopImmediatePropagation();
		e.stopPropagation();
		e.preventDefault();
		$("#checkout-sign-in-modal").modal('show');
		$(".showCheckoutSignInModal").data("currenthref",$(this).closest("a").attr("data-redirect-href"));
	});
	$('body').on('click','.header-account-tooltip .sessionTimedOutmyAccountLinks',function () {
		var currentObj = $(this);
		$(".showCheckoutSignInModal").data("currenthref",currentObj.attr("data-redirect-href"));
		/*console.log($(".showCheckoutSignInModal").data("currenthref"));*/
	});
});
function validateEditedAdressShippingAndBilling() {
	/*ECB-21515 starts*/
	var addressFields = "#shipping-form #addr-1, #shipping-form #addr-2, #shipping-form #zip-code, #shipping-form #locality, #payment-form #addr-1, #payment-form #addr-2,#payment-form #zip-code, #payment-form #locality";
	$(document).off('blur',addressFields,checkEditedFields);
	$(document).on('blur',addressFields,checkEditedFields);
	$(document).off('change',"#shipping-form #state, #payment-form #state, #shipping-form #saved-address-dropdown",checkEditedFields);
    $(document).on('change',"#shipping-form #state, #payment-form #state, #shipping-form #saved-address-dropdown",checkEditedFields);
    /*ECB-21515 ends*/
}
function checkEditedFields(currentObj) {
	$("#"+$(currentObj.currentTarget.form).attr("id")).find("#editedAddress").val("true");
}
/*<dattaprasad> ECB-19572 Added on 25-09-2018 starts*/
$("body").on("click",".shoppingCartCheckoutBtn",function(e){
	e.stopPropagation();
	if($(".shoppingCartCheckoutBtn").data("clicked") == "true") {
		return false;
	}
	else {
		$(".shoppingCartCheckoutBtn").data("clicked","true");
		setTimeout(function(){
			$(".shoppingCartCheckoutBtn").data("clicked","false");
		},6000)
	}
});
/*<dattaprasad> ECB-19572 Added on 25-09-2018 emds*/

/*ECB-18111 - Start*/
function rfkmkorsdataResponse(){
	$.ajax({
		url: "/checkout/includes/rfkmkorsdataResponse.jsp",
		type: "post",
		cache : false,
		dataType: "json",
		success: function(data) {
			mkorsData.crossSellGroup = data;
			console.log("Firing from checkout js rfkmkorsdataResponse");
			sendCustomEvent('dataLayerReady');
		},
		error: function(xhr, status, error){
			console.log("Firing from checkout js rfkmkorsdataResponse error scenario");
			sendCustomEvent('dataLayerReady');
	     }
	})
}
/*ECB-18111 - End*/

/* End: MKCAB-12 Click and Collect */
/*For DTM of product removal for Cart Products ECB-11957 starts on 27-06-2017*/
function createDTMEventParametersForCartRemoval($this,parentContainer){
	var productID = "";
    var pricePer = "";
    var basePrice = "";
    var priceType = "";
    var mfr = "";
    var mfrItemNum = "";
    var upc = "";
    var isBaseItem = "";
    var outfitID = "";
    var customized = "";
    var gwp = "";
    var gwpSku = "";
    var pickUpInStore = "";
    var pickUpStoreID = "";
    var available = "";
    var storeID = "";
    var shippingMethod = "";
	var lookID = "";
    var engraved ="";
    var monogrammed ="";
    var storeName = "";
    var pickUpStoreName = "";
    var orderType = "";

    if($this.closest(parentContainer).find(".productID").val()){
    	productID = $this.closest(parentContainer).find(".productID").val();
    }
    if($this.closest(parentContainer).find(".pricePer").val()){
    	pricePer = $this.closest(parentContainer).find(".pricePer").val();
    }
    if($this.closest(parentContainer).find(".basePrice").val()){
    	basePrice = $this.closest(parentContainer).find(".basePrice").val();
    }
    if($this.closest(parentContainer).find(".priceType").val()){
    	priceType = $this.closest(parentContainer).find(".priceType").val();
    }
    if($this.closest(parentContainer).find(".mfr").val()){
    	mfr = $this.closest(parentContainer).find(".mfr").val();
    }
    if($this.closest(parentContainer).find(".mfrItemNum").val()){
    	mfrItemNum = $this.closest(parentContainer).find(".mfrItemNum").val();
    }
    if($this.closest(parentContainer).find(".upc").val()){
    	upc = $this.closest(parentContainer).find(".upc").val();
    }
    if($this.closest(parentContainer).find(".isBaseItem").val()){
    	isBaseItem = $this.closest(parentContainer).find(".isBaseItem").val();
    }
    /* if($this.closest(parentContainer).find(".outfitID").val()){<Sukraj> added for WEBA-1272, WEBA-1273 on 23/09/2019
   		outfitID = $this.closest(parentContainer).find(".outfitID").val();
    }*/
    if($this.closest(parentContainer).find(".customized").val()){
    	customized = $this.closest(parentContainer).find(".customized").val();
    }
    if($this.closest(parentContainer).find(".gwp").val()){
    	gwp = $this.closest(parentContainer).find(".gwp").val();
    }
    if($this.closest(parentContainer).find(".gwpSku").val()){
    	gwpSku = $this.closest(parentContainer).find(".gwpSku").val();
    }
    if($this.closest(parentContainer).find(".pickUpInStore").val()){
    	pickUpInStore = $this.closest(parentContainer).find(".pickUpInStore").val();
    }
    if($this.closest(parentContainer).find(".pickUpStoreName").val()){
    		pickUpStoreName = $this.closest(parentContainer).find(".pickUpStoreName").val();
    }
    /* if($this.closest(parentContainer).find(".storeName").val()){<Sukraj> added for WEBA-1272, WEBA-1273 on 23/09/2019
  		storeName = $this.closest(parentContainer).find(".storeName").val();
    } */
    if($this.closest(parentContainer).find(".pickUpStoreID").val()){
    	pickUpStoreID = $this.closest(parentContainer).find(".pickUpStoreID").val();
    }
    if($this.closest(parentContainer).find(".available").val()){
    	available = $this.closest(parentContainer).find(".available").val();
    }
    if($this.closest(parentContainer).find(".storeID")){
    	storeID = $this.closest(parentContainer).find(".storeID").val();
    }
    if($this.closest(parentContainer).find(".shippingMethod")){
    	shippingMethod = $this.closest(parentContainer).find(".shippingMethod").val();
    }
	if($this.closest(parentContainer).find(".engraved")){
    	engraved = $this.closest(parentContainer).find(".engraved").val();
    }
    if($this.closest(parentContainer).find(".monogrammed")){
    	monogrammed = $this.closest(parentContainer).find(".monogrammed").val();
    }
    if($this.closest(parentContainer).find(".orderType")){
    	orderType = $this.closest(parentContainer).find(".orderType").val();
    }
    var obj = {
    		productID:  productID,
    		pricePer: pricePer,
    		basePrice: basePrice,
    		priceType: priceType,
    		mfr: mfr,
    		mfrItemNum: mfrItemNum,
    		upc: upc,
    		isBaseItem: isBaseItem,
    		gwp: gwp,
    		gwpSku: gwpSku,
    		pickUpInStore: pickUpInStore,
    		pickUpStoreID: pickUpStoreID,
    		available: available,
    		storeID: storeID,
    		shippingMethod: shippingMethod,
            pickUpStoreName:pickUpStoreName,
            orderType: orderType

	};
    return obj;
}
function triggerDTMEventParametersForCartRemoval(quantityArr,multipleParametersArr,eventName,eventType,eventFrom,errorEvent){
	var ddRemoveFromCartEvent = {
    		"eventInfo": {
    			"eventName": eventName,
    			"type": eventType,
    			"timeStamp": new Date(),
    			"processed": {
    				"adobeAnalytics": false, //dtm will change this to true once processed
             	   	"vendorTags": false //dtm will change this to true once processed
    			}
    		},
    		"product": []
    	};
		if(eventFrom == "orderConfirmation"){	/*The condition gets executed for the Order Confirmation page*/
			$.extend( ddRemoveFromCartEvent, errorEvent );
		}
		$(multipleParametersArr).each(function(i,val){
			var isCrossSell = crossSellCartridge = '';
			var item = {};
			if(mkorsData != undefined && mkorsData.cart != undefined) {
				for (var x in mkorsData.cart.product){
					item = mkorsData.cart.product[x];
					if(val.mfrItemNum == item.mfrItemNum) {
						isCrossSell = item.isCrossSell;
						crossSellCartridge = item.crossSellCartridge;
					}
				}
			};

			var productObj= {
					"productID": val.productID,
	    			"pricePer": val.pricePer,
	    			"basePrice": val.basePrice,
	    			"priceType": val.priceType,
	    			"mfr": val.mfr,
	    			"mfrItemNum": val.mfrItemNum,
	    			"upc": val.upc,
	    			"isBaseItem": val.isBaseItem,
	    			"gwp": val.gwp,
	    			"gwpSku": val.gwpSku,
	    			"isCrossSell": isCrossSell,
					"crossSellCartridge": crossSellCartridge,
	    			"quantity": quantityArr[i],
					"lookID":"",
		            "pickUpStoreName":val.pickUpStoreName,
		            "storeID": val.storeID,
		    		"shippingMethod": val.shippingMethod

	    		}
			/*insert pickupinstore data*/
			if(val.storeID != "" && (eventName == "addToCart" || eventName == "removeFromCart")) {
				productObjForCIS = {
					"storeID": val.storeID,
					"shippingMethod": val.shippingMethod
				}
				$.extend( productObj, productObjForCIS );
			}
			/*waseem WEBA-1271 10/10/2019*/
			if(eventName == "addToCart") {
				var productObjUpdate = {
					"orderType": val.orderType
				}
				$.extend( productObj, productObjUpdate );
			}
				if(eventFrom == "orderConfirmation"){	/*The condition gets executed for the Order Confirmation page*/
					productObjForOrderConfirmation= {
						"pickUpInStore": val.pickUpInStore,
						"pickUpStoreID": val.pickUpStoreID,
			    		"available": val.available
					}
					$.extend( productObj, productObjForOrderConfirmation );
				}
			ddRemoveFromCartEvent.product.push(productObj);
		});

    	window.mkorsData = window.mkorsData || {};
    	window.mkorsData.event = window.mkorsData.event || [];
    	window.mkorsData.event.push(ddRemoveFromCartEvent);
    	//Create and dispatch an event trigger (using predefined sendCustomEvent function)
    	var customEvent = "removeFromCart";
    	if(eventFrom == "orderConfirmation"){ /*The condition gets executed for the Order Confirmation page*/
    		customEvent = "errorEventOrderSubmit"
    	}
    	if(eventFrom == "productQtyUpdate" || eventFrom == "shippingMethodUpdate"){
    		customEvent = eventFrom;
    	}
    	/*Added the condition for ECB-24867*/
    	if(eventFrom == "increase" || eventFrom == "decrease"){
    		customEvent = "productQtyUpdate";
    	}
    	
    	/*Added the condition for ECB-24894*/
    	if(eventName == "addToCart" && eventFrom == "cart"){
    		customEvent = "addToCart";
    	}
    	
    	sendCustomEvent(customEvent);
}
/*For DTM of product removal for Cart Products ECB-11957 ends on 27-06-2017*/
/*<dattaprasad> ECB-12702 Added on 29-06-2017 starts*/
function addToDTMTrackEvent(errortTypeDTM,errorMessageDTM,errorPageType){
	var ddErrorEvent = {
		 eventInfo: {
		   eventName: "errorEvent",
		   type: "customer facing error",
		   timeStamp: new Date(),
		   processed: {
			   "adobeAnalytics": false, //dtm will change this to true once processed
        	   "vendorTags": false //dtm will change this to true once processed
		   },
		 error:[{
		   errorType: errortTypeDTM,
		   errorCode: " ", //If possible. Allows for language neutral reporting
		   errorMessage: errorMessageDTM, //Not needed is errorCode exists
		   errorPageType: errorPageType
		 }]
	}};
	window.mkorsData = window.mkorsData || {};
	window.mkorsData.event = window.mkorsData.event || [];
	window.mkorsData.event.push(ddErrorEvent);
	sendCustomEvent('errorEvent');
}
/*<dattaprasad> ECB-12702 Added on 29-06-2017 ends*/
/*Start - ECB-13750*/
function updateDTMcookieForATGtoNode(rrPagename){
	document.cookie = "dtm_categorycookie="+rrPagename+"; path=/";
}
function updateRFKcookieForATGtoNode(widgetName){
	document.cookie = "dtm_crosssellcategory="+widgetName+"; path=/";
}
/*End - ECB-13750*/
function dtmCrossSellQVEvent(productId,mfr,mfrItem,crossSellCartridge,highSalePrice,highListPrice,priceType,customizable_product,is_novelty_product,upc, engravable_product, monogrammable_product){
	var productobj = {
		 "categoryID": "Cross Sell",
		 "categoryName": "Cross Sell",
		 "productID": productId,
		 "pricePer": highSalePrice,
		 "mfr": mfr,
		 "mfrItemNum": mfrItem,
		 "isCrossSell": "y",
		 "crossSellCartridge": crossSellCartridge,
		 "basePrice" : highListPrice,
		 "priceType" : priceType,
		 "gwp" : is_novelty_product,
		 "upc" : upc
	 };
	 /*waseem WEBA-1290 03/10/2019*/
	 if(customizable_product == "true") {
		var prodCustomData = {
			customized: customizable_product || "",
			monogrammed: monogrammable_product || "",
			engraved: engravable_product || ""
		}
		$.extend( productobj, prodCustomData );
	 }
	 var ddQuickViewEvent = {
	    eventInfo: {
	        "eventName" : "quickView",
	         "type"     : "product interaction",
	         "timeStamp": new Date(),
	         "processed": {
	        	 "adobeAnalytics": false, //dtm will change this to true once processed
          	   	 "vendorTags": false //dtm will change this to true once processed
	        }
	    },
	    product: productobj
	};

    //Push it onto the event array on mkorsData object
    window.mkorsData = window.mkorsData || {};
    delete mkorsData.event;
    window.mkorsData.event = window.mkorsData.event || [];
    window.mkorsData.event.push(ddQuickViewEvent);
    sendCustomEvent('quickView');
}
function createSignInSuccessDTM(userType,loginStatus,loyaltyTier,hashedID,hashedID2) {
	var ddSignInSuccessEvent = {
			 eventInfo: {
			   eventName: "signInSuccess",
			   type: "account",
			   timeStamp: new Date(),
			   processed: {
				   "adobeAnalytics": false, //dtm will change this to true once processed
            	   "vendorTags": false //dtm will change this to true once processed
			   }
			 },
			 user: [{  //future object for carrying user info. Later in 2017.
			   profile: [{
			     profileInfo: {
			       type: userType, //"guest", "registered", �loyalist�
			       loginStatus: loginStatus, //"logged in", "logged out", "unknown"
			       //string indication of tier - set to �down� if 500 friends service is unavailable
			       loyaltyTier: loyaltyTier, //�backstage�,�runway�, �red carpet�
			       hashedID: hashedID, //md5 hash of email address
			       hashedID2: hashedID2 // SHA256 hash of email address
			     }
			   }]
			 }]
			};

			//Push it onto the event array on mkorsData object
			window.mkorsData = window.mkorsData || {};
			window.mkorsData.event = window.mkorsData.event || [];
			window.mkorsData.event.push(ddSignInSuccessEvent);
}

function createRegistraionSuccessDTM(onLanding) {
	var parentDTMContainer = $("#signInConfirmationSuccessDTM");
			var applePayEnabled = parentDTMContainer.find("#applePayEnabled").val();
			var userType = parentDTMContainer.find("#userType").val();
			var loginStatus = parentDTMContainer.find("#transient").val();
			var loyaltyTier = parentDTMContainer.find("#loyaltyTier").val();
			var hashedID = parentDTMContainer.find("#email").val();
			var hashedID2 = parentDTMContainer.find("#emailSHA").val();
			var emailOptIn = parentDTMContainer.find("#emailOptIn").val();
			var loyaltyOptIn = parentDTMContainer.find("#loyaltyOptIn").val();
			var zipCode = parentDTMContainer.find("#zipCode").val();
		var ddAccountCreationSuccessEvent = {
		 eventInfo: {
		   eventName: "accountCreationSuccess",
		   type: "account",
		   timeStamp: new Date(),
		   processed: {
			   "adobeAnalytics": false, //dtm will change this to true once processed
        	   "vendorTags": false //dtm will change this to true once processed
		   }
		 },
	      user: [{  //future object for carrying user info. Later in 2017.
				   profile: [{
				     profileInfo: {
					   applePayEnabled: applePayEnabled,
					   emailOptIn:emailOptIn,
				       type: userType,
				       loginStatus: loginStatus,
				       loyaltyOptIn: loyaltyOptIn,
					   loyaltyTier: loyaltyTier,
				       hashedID: hashedID,
				       hashedID2: hashedID2 ,
					   zipCode: zipCode
				     }
				   }]
				 }]
		};
		/*<dattaprasad> LYLTUAT-6 Fixed on 30-11-2017 starts*/
		if(onLanding == true){
			window.mkorsData = window.mkorsData || {};
			window.mkorsData.event = window.mkorsData.event || [];
			window.mkorsData.event.push(ddAccountCreationSuccessEvent);
			sendCustomEvent('accountCreationSuccess');
		}
		else if(onLanding == false) {
			document.cookie = "dtm_ddAccountCreationSuccessEvent="+JSON.stringify(ddAccountCreationSuccessEvent)+"; path=/";
		}
		/*<dattaprasad> LYLTUAT-6 Fixed on 30-11-2017 ends*/
	}
//ECB-19227
function refreshLoyaltyPoints() {
	$.ajax({
		url: localeName+"/checkout/includes/refreshLoyaltyPoints.jsp",
		contentType: 'text/plain',
		type:'GET',
		dataType: 'html',
		success: function(data) {
		},
		error: function(xhr, ajaxOptions, thrownError) {
		}
	});
}

function firePickUpInStoreSearchEvent(selectedStoreId,searchLoc,skuId,prodId,selectedStoreName) {

	var ddPickUpInStoreSearchEvent = {
		eventInfo: {
			eventName: "pickUpInStoreSearch",
			type: "search",
			timeStamp: new Date(),
			processed: {
				"adobeAnalytics": false, //dtm will change this to true once processed
         	   	"vendorTags": false //dtm will change this to true once processed
			}
		},
		product: [
	      /*array of product object relating to the product being searched on */
	      {
	    	  productID: skuId,
	    	  pricePer : $('.pricePer').val(),
	    	  basePrice : $('.basePrice').val(),
	    	  priceType : $('.priceType').val(),
	    	  mfr: $('.mfr').val(),
	    	  mfrItemNum: prodId,
	    	  upc: $('.upc').val(),
	    	  customized : $('.customized').val()
	      }
		],
		searchInfo: {
			/*first store id from the result set*/
			storeID: selectedStoreId,
			/*location value used for the search*/
			searchQuery: searchLoc,
			storeName: selectedStoreName

		}
	};

	/*Push it onto the event array on mkorsData object */
	window.mkorsData = window.mkorsData || {};
	window.mkorsData.event = window.mkorsData.event || [];
	window.mkorsData.event.push(ddPickUpInStoreSearchEvent);
	/*Create and dispatch an event trigger (using predefined sendCustomEvent function)*/
	sendCustomEvent("pickUpInStoreSearch");
}

//ECB-21449
$(document).on('blur', '#gfgdf:visible', function(e) {
	if( $('.parsley-errors-list li:visible').text() != '') {
		addToDTMTrackEvent('Shopping Cart',$('.parsley-errors-list li:visible').text(),'cart Page');
	}
	});

$(document).ready(function(){
    var invErrMsg = $(document).find('#error-container .noLongerErrorMsg').text().trim();
    var qvErrMsg = $('.popUpErrorMessage .ajaxErrorMessage').text().trim();
    var alertMsg = $('.alert-message--error .alert-message__text').text().trim();
    if(invErrMsg.length > 0 && $('#error-container .noLongerErrorMsg').is(":visible") ) {
        addToDTMTrackEvent("cart update",invErrMsg,"Shopping cart");/*<Sukraj> WEBA-1293 Added on 18-09-2019*/
    }
    if(qvErrMsg.length > 0 && $('.popUpErrorMessage .ajaxErrorMessage').is(":visible")) {
        addToDTMTrackEvent("cart update",qvErrMsg,"Shopping car");
    }

    if(alertMsg.length > 0 && $('.alert-message--error').is(":visible")) {
        addToDTMTrackEvent("cart update",alertMsg,"Shopping car");
    }
});
function screenLiveAnnounce(text, delay, node) {
    node = node || null;
    var timeOut = delay || 2000;
    var target = null;
    /* istanbul ignore if */
    if (node) {
      target = node;
    } else {
      target = document ? document.querySelector('#liveAnnounce') : undefined;
    }
    /* istanbul ignore if */
    if (typeof (text) !== "undefined" && target) {
      target.innerHTML = text || '';
      setTimeout(function() {
        target.innerHTML = '';
      }, timeOut);
    }
 }

/* Introduced the method as part of ECB-24813*/
function getResponsiveView() {
    console.log("Entered into getResponsiveView checkout js");
    var responsiveView = "large";
    if (typeof window !== 'undefined') {
      const windowInnerWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      switch (true) {
        case (windowInnerWidth < 640):
        responsiveView = "small";
        break;
        case (windowInnerWidth < 768):
        responsiveView = "smedium";
        break;
        case (windowInnerWidth < 1024):
        responsiveView = "medium";
        break;
        case (windowInnerWidth < 1440):
        responsiveView = "large";
        break;
        case (windowInnerWidth < 1900):
        responsiveView = "xlarge";
        break;
        default:
        responsiveView = "xxlarge";
        break;
      }
    }
    console.log("Entered into getResponsiveView checkout js :: "+responsiveView);
    return responsiveView;
}
