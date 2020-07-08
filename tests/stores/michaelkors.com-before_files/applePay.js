var applePayCardTypes = {
	"Visa" : "visa",
	"AmEx" : "americanExpress",
	"MasterCard" : "masterCard",
	"Discover" : "discover"
}

function applePayButtonClicked() {
	var localeName = $("#nonPrimaryLocale").val();
	if (localeName == null) {
		localeName = "";
	}
	
	var paymentRequest = {};
	$.ajax({
		url: localeName + "/checkout/common/ajaxRestFormSubmit.jsp",
		method: "POST",
		dataType: "json",
		cache : false,
		data: {isFromPDP : "false", handleMethod : "applePayPaymentRequest"},
		async: false,
		success : function(data){
			paymentRequest = filter(data.paymentRequest);
		}
	});
	const session = new ApplePaySession(2, paymentRequest);
	session.onvalidatemerchant = function(event) {
		console.log(event.validationURL);
        $.ajax({
        	url: localeName + "/checkout/common/ajaxRestFormSubmit.jsp",
    		method: "POST",
                dataType: "json",
    		cache : false,
    		data: {validationURL : event.validationURL, handleMethod : "applePaySession"},
    		success : function(data){
    			session.completeMerchantValidation(data.paymentRequest.map);
    		},
    		error: function(xhr, status, error) {
    			console.log("Error : "+ xhr.responseText);
    			console.log(status);
    			console.log(error);
    		}
        });			   
    };
    session.onshippingcontactselected = function(event) {
    	var addressData = getAddressData(event.shippingContact, 'ship');
    	addressData.handleMethod="updateShipAddress";
    	$.ajax({
    		url: localeName + "/checkout/common/ajaxRestFormSubmit.jsp",
    		method: "POST",
    		dataType: "json",
    		async: false,
    		data: addressData,
    		cache : false,
    		success : function(data){
    			if(data.paymentRequest == undefined){
    				session.completeShippingContactSelection(ApplePaySession.STATUS_FAILURE, null, null, null);
    			}else{
    				var paymentRequest = filter(data.paymentRequest);
	    			if(paymentRequest != undefined && paymentRequest.status != undefined && paymentRequest.status =="success"){
	    				session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, paymentRequest.shippingMethods, paymentRequest.total, paymentRequest.lineItems);
	    			}else{
	    				session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, paymentRequest.shippingMethods, paymentRequest.total, paymentRequest.lineItems);
	    			}
    			}
    		}, 
    		error : function(){
    			session.completeShippingContactSelection(ApplePaySession.STATUS_FAILURE, null, null, null);
    		}
        });			        
    };
    session.onshippingmethodselected = function(event) {
        $.ajax({
        	url: localeName + "/checkout/common/ajaxRestFormSubmit.jsp",
    		method: "POST",
    		dataType: "json",
    		async: false,
    		data: {shippingDetail : event.shippingMethod.identifier+"::"+event.shippingMethod.amount, handleMethod : "updateShipMethod"},
    		success : function(data){
    			if(data.paymentRequest == undefined){
    				session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE, null, null);
    			}else{
    				var paymentRequest = filter(data.paymentRequest);
	    			if(paymentRequest != undefined && paymentRequest.status != undefined && paymentRequest.status =="success"){
	    				session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, paymentRequest.total, paymentRequest.lineItems);
	    			}else{
	    				session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE, paymentRequest.total, paymentRequest.lineItems);
	    			}
    			}
    		}, 
    		error : function(){
    			session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE, null, null);
    		}
        });		        
    };;
    
    session.onpaymentauthorized = function(event) {
    	hideMessage();
    	var formData = {};
    	
    	var shippingAddress = getAddressData(event.payment.shippingContact, 'ship');
    	for (var key in shippingAddress) {
    		if (shippingAddress.hasOwnProperty(key)) {
    			formData[key] = shippingAddress[key];
    		}
    	}
        var billingAddress = getAddressData(event.payment.billingContact, 'bill')
        for (var key in billingAddress) {
    		if (billingAddress.hasOwnProperty(key)) {
    			formData[key] = billingAddress[key];
    		}
    	}
        const token = event.payment.token;
        const displayName = token.paymentMethod.displayName;;
        formData.paymentData = JSON.stringify(token.paymentData);
        console.log("Card Type : "+ token.paymentMethod.network);
        formData.cardType = applePayCardTypes[token.paymentMethod.network];
        formData.cardNumber = "XXXXXXXXXXXX" + displayName.substr(displayName.length - 4);
        formData.handleMethod="updatePaymentInfo";
        $.ajax({
        	url: localeName + "/checkout/common/ajaxRestFormSubmit.jsp",
    		method: "POST",
    		dataType: "json",
    		cache : false,
    		data: formData,
    		success : function(data){
    			if(data != undefined && data.paymentRequest != undefined && data.paymentRequest.status != undefined){
    				if(data.paymentRequest.status =="success"){
    					session.completePayment(ApplePaySession.STATUS_SUCCESS);
    	    			var localeName = $("#nonPrimaryLocale").val();
    					if (localeName == null || localeName == undefined) {
    						localeName = "";
    					}
    					$.ajax({
    						url : localeName + '/checkout/includes/applePayOrderSubmitForm.jsp',
    						type : "GET",
    						dataType : "html",
    						cache : false,
    						success : function(data) {
    							if($("#apple-pay-order-submit").length < 1){
    								$('body').append(data);
    							}
    							 var deferred = $.Deferred();
    							 korscheckoutobj.formRequest(deferred , "apple-pay-order-submit");
    							 return deferred.promise();
    						}
    					});
    				} else if(data.paymentRequest.status =="invalidShipAddress"){
    					session.completePayment(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS);
    				} else if(data.paymentRequest.status =="invalidBillAddress"){
    					session.completePayment(ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS);
    				} else if(data.paymentRequest.status =="invalidPhoneNo"){
    					session.completePayment(ApplePaySession.STATUS_INVALID_SHIPPING_CONTACT);
					} else{
    					session.completePayment(ApplePaySession.STATUS_FAILURE);
    				}
    			}else {
    				session.completePayment(ApplePaySession.STATUS_FAILURE);
    			}
    		}
        });
    };
    session.begin();
}

function getAddressData(addressContact, addressPrefix){
	var addressData = {};
	var address1 = "";
	var address2 = "";
	var addressLines = addressContact.addressLines;
	if(addressLines != undefined && $.isArray(addressLines)){
		var arrayLength = addressLines.length;
    	for (var i = 0; i < arrayLength; i++) {
    	   if(i==0){
    		   address1 = addressLines[i];
    	   }else{
    		   address2 = address2 + addressLines[i];
    	   }
    	}
	}
	if(address1 == undefined || address1.trim() == ""){
		address1 = address2;
	}
	address1 = trimNewLine(address1);
	address2 = trimNewLine(address2);
	if(address1.length > 35 && address2.length > 35){
		addressData[addressPrefix + 'Address1'] = address1.substring(0, 35);
		addressData[addressPrefix + 'Address2'] = address1.substring(35) + " "+ address2;
		addressData[addressPrefix + 'Address2'] = addressData[addressPrefix + '.Address2'].substring(0, 35);
	}else if(address1.length > 35){
		addressData[addressPrefix + 'Address1'] = address1.substring(0, 35);
		addressData[addressPrefix + 'Address2'] = address1.substring(35) + " "+ address2;
		if(addressData[addressPrefix + 'Address2'].length > 35){
			addressData[addressPrefix + 'Address2'] = addressData[addressPrefix + '.Address2'].substring(0, 35);
		}
	}else if(address2.length > 35){
		addressData.address2 = address2.substring(0, 35);
	}else{
		addressData[addressPrefix + 'Address1'] = address1;
		addressData[addressPrefix + 'Address2'] = address2;
	}
	addressData[addressPrefix + 'FirstName'] = trimNewLine(addressContact.givenName);
	addressData[addressPrefix + 'LastName'] = trimNewLine(addressContact.familyName);
	if(addressContact.emailAddress != undefined){
		addressData[addressPrefix + 'Email'] = trimNewLine(addressContact.emailAddress);
	};
	addressData[addressPrefix + 'City'] = trimNewLine(addressContact.locality);
	addressData[addressPrefix + 'State'] = trimNewLine(addressContact.administrativeArea.toUpperCase());
	addressData[addressPrefix + 'PostalCode'] = trimNewLine(addressContact.postalCode);
	addressData[addressPrefix + 'Country'] = trimNewLine(addressContact.countryCode.toUpperCase());
	if(addressContact.phoneNumber != undefined){
		addressData[addressPrefix + 'PhoneNumber'] = trimNewLine(addressContact.phoneNumber);
	};
	return addressData;
}

function filter(obj) {
    $.each(obj, function(key, value){
        if (value === "" || value === null || key === "@class"){
            delete obj[key];
        } else if (Object.prototype.toString.call(value) === '[object Object]') {
        	obj[key] = filter(value);
        } else if ($.isArray(value)) {
            $.each(value, function (k,v) { 
            	if (Object.prototype.toString.call(v) === '[object Object]') {
            		filter(v); 
            	} else if(v === "" || v === null || k === "@class"){
            		delete value[k]
            	}
            });
        }
    });
    return obj
}


// This function added for trimming the new line getting appeneded.
function trimNewLine(name) {
	
	if (name != undefined && name != null) {
	 return name.replace(/(\r\n|\n|\r)/gm,"").trim();
	}
}