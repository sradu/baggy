(function(Rayban, ko, undefined){
    var storeIdentifier = $('#storeIdentifier').val() || $('#country_value').val();
    var virtualGiftCard = $('#isVirtualGiftCardPage').val();
    var savedFormForGiftCardFields = undefined;
    var $physicalGiftCardForm = $('#physicalGiftCardForm');
	var deliveryAddress,
		addressMetaData,
		isGoogleApiEnabled,
		isFAZMode,
		isTaxRecalculated,
		$autocompleteField,
		AddressModel = function(address){
			var that = this;
			that.firstName = ko.observable(address.firstName);
			that.lastName = ko.observable(address.lastName);
			if (virtualGiftCard === 'Y') {
			    that.email = address.email;
			} else {
			    that.email = ko.observable(address.email);
			}
			that.telephone = ko.observable(address.telephone);
			that.addressLineOne = ko.observable(address.addressLineOne);
			that.addressLineTwo = ko.observable(address.addressLineTwo);
			that.city = ko.observable(address.city);
			that.state = ko.observable(address.state);
			that.zipcode = ko.observable(address.zipcode);
			that.country = ko.observable(address.country);
			that.fiscalCode = ko.observable(address.fiscalCode);
			that.rfc = ko.observable(address.rfc);
			that.colony = ko.observable(address.colony);
			that.municipality = ko.observable(address.municipality);
			that.middleName = ko.observable(address.middleName);
			that.CPForCNPJ = ko.observable(address.CPForCNPJ);
			that.date = ko.observable(address.date);
			that.month = ko.observable(address.month);
			that.year = ko.observable(address.year);
			that.houseNumber = ko.observable(address.houseNumber);
			that.neighborhood = ko.observable(address.neighborhood);
			that.razaoSocial = ko.observable(address.razaoSocial);
			that.subscriptionState = ko.observable(address.subscriptionState);
			that.subscriptionStateCheck = ko.observable(address.subscriptionStateCheck);
			that.customerType = ko.observable(address.customerType);
		},
		BlankAddressData = {
			firstName : undefined,
			lastName : undefined,
			email : undefined,
			telephone : undefined,
			addressLineOne : undefined,
			addressLineTwo : undefined,
			city : $('#country_value').val() === 'HK' ? '' : undefined,
			state : '',
			zipcode : undefined,
			country : undefined,
			fiscalCode: undefined,
			rfc: undefined,
			colony: undefined,
			municipality: undefined,
			middleName: undefined,
			CPForCNPJ: undefined,
			date: undefined,
			month: undefined,
			year: undefined,
			houseNumber: undefined,
			neighborhood: undefined,
			razaoSocial: undefined,
			subscriptionState: undefined,
			subscriptionStateCheck: false,
			customerType: undefined
		},
		AddressMetaData = function(data){
			var that = this;
			that.isAddressSuggestedShown = ko.observable(data.isAddressSuggestedShown || false);
			that.isGoogleApiSubscriptionActive = ko.observable($.isEmptyObject(data) ? true : data.isGoogleApiSubscriptionActive );
			that.isSameDeliveryBilling = ko.observable(!!data.isSameDeliveryBilling && true);
			that.isRegisteredCustomer = ko.observable(data.isRegisteredCustomer || false);
			that.isAddressEdited = ko.observable(data.isAddressEdited || false);
			that.isAddressSelected = ko.observable(data.isAddressSelected || false);
			that.isAddNewAddress = ko.observable(data.isAddNewAddress || false);
			that.isGoogleAddressDataMissing = ko.observable(data.isGoogleAddressDataMissing || false);
		},
		saveState = function(model, storageKey, stringify){
			ko.computed(function () {
				return ko.toJS(this);
			}, model)
			.subscribe(function(){
				Rayban.storage.save(storageKey, ko.toJS(model), stringify);
			});
		},
		updateModel = function(model, newData){
			for(var key in newData){
				if(model.hasOwnProperty(key)){
					model[key](newData[key]);
				}
				if(key=='email'){
					$('div.help-us-offline form#help_contact_us_form input[name="email"]').val(newData[key]);
				}
				if(key=='telephone'){
					$('div.help-us-offline form#help_contact_us_form input[name="mobile_number"]').val(newData[key]);
				}
			}
		},
		fetchGuestUserAddress = function(){
			var guestAddress;
			if($('#country').val() === 'BR' || $('#country_value').val() === 'BR'){
				guestAddress = $('.presaved-address-details-store');
			}else{
				guestAddress = $('.guestuser-address');
			}
			var guestUserAddresses = $.map(guestAddress, function(address){ return $(address).data(); });
			if(guestUserAddresses.length === 0){
				return {};
			}else if(guestUserAddresses.length === 1){
				return guestUserAddresses[0];
			}else{
				return $.grep(guestUserAddresses, function(address){
					return parseInt(address.addressId, 10) === Math.max.apply(Math,guestUserAddresses.map(function(addr){
						return parseInt(addr.addressId, 10);
					}));
				})[0] || {};
			}
		},
		init = function () {
			var guestUserAddress = fetchGuestUserAddress(),
				fetchDeliveryAddressData = Rayban.storage.fetch('DeliveryAddress', { stringify: true }) || guestUserAddress || {},
				isDataFromDB = $.isEmptyObject(Rayban.storage.fetch('DeliveryAddress', { stringify: true })) && !$.isEmptyObject(guestUserAddress),
				storeIdentifier = $('#storeIdentifier').val();
			isTaxRecalculated = $.cookie('ClearDeliveryFormData') === 'yes';
			if(isTaxRecalculated && $('#userType').val() === 'G'){
				fetchDeliveryAddressData.addressLineOne = undefined;
				fetchDeliveryAddressData.addressLineTwo = undefined;
				fetchDeliveryAddressData.city = sessionStorage["rayban." + $("#store").val() + ".address.delivery.city"];
				fetchDeliveryAddressData.state = sessionStorage["rayban." + $("#store").val() + ".address.delivery.state"];
				fetchDeliveryAddressData.zipcode = sessionStorage["rayban." + $("#store").val() + ".address.delivery.zipCode"];

				$.each(fetchDeliveryAddressData, function(k, v){
					if(!fetchDeliveryAddressData[k] && !!guestUserAddress && !!guestUserAddress[k]){
						fetchDeliveryAddressData[k] = guestUserAddress[k];
					}
				});
				$.removeCookie('ClearDeliveryFormData', { path: '/' });
				Rayban.storage.save('DeliveryAddress', fetchDeliveryAddressData, { stringify: true });
			}
			deliveryAddress = new AddressModel(fetchDeliveryAddressData);
			addressMetaData = new AddressMetaData(Rayban.storage.fetch('AddressMetaData', { stringify: true }) || {});

			isGoogleApiEnabled = $('#enableGoogleApi').val();
			isFAZMode = $('[name="isFAZMode"]').val() === 'true';

			// FAZ = Find Address from Zip (es: GB store)
			if (isFAZMode) {
				$('body').addClass('faz-mode-enabled');
				$(function() {
					window.geoCodeObj.bindFAZApiCallback(saveAddressFromFAZ);
				});
			}

			saveState(deliveryAddress, 'DeliveryAddress', { stringify: true });
			saveState(addressMetaData, 'AddressMetaData', { stringify: true });

			bindEvents();
			subscriptions();

      // Conditional check to bind / unbind google api
       if (!isTaxRecalculated) {
        if(isGoogleApiEnabled === 'true'){
          if(Rayban.storage.fetch('AddressMetaData',{ stringify: true }) && !Rayban.storage.fetch('AddressMetaData',{ stringify: true }).isGoogleApiSubscriptionActive){
            Rayban.GoogleApi.unbindApi($('#address_line_one')[0]);
          }else {
            Rayban.GoogleApi.bindApi($('#address_line_one')[0], saveAddressFromGoogle);
          }
        }
      }

			ko.applyBindings(deliveryAddress, document.getElementById('addFields'));

			if (window.deliveryShippingMethodBRViewModel) {
				$.extend(addressMetaData, window.deliveryShippingMethodBRViewModel);
			}
			ko.applyBindings(addressMetaData, document.getElementById('delivery_information'));

			// check for edit address from payment page
			if( urlParam('fromPaymentPage') === 'yes' ){
				addressMetaData.isAddressEdited(true);
			}
			// Conditional check for guest + registered user to show / hide address input fields and google suggested address container
			if($('#userType').val() === 'R'){
				if(parseInt($('#totalAddress').val(), 10) > 0){
					$('#addFields').hide();
					addressMetaData.isAddNewAddress(false);
				}else{
					deliveryAddress.email($('#registeredEmailId').val());
					deliveryAddress.firstName($('#registeredPersonFirstName').val());
					deliveryAddress.lastName($('#registeredPersonlastName').val());
					deliveryAddress.telephone($('#registeredPersonTelephone1').val());
					addressMetaData.isAddNewAddress(true);
				}
				if( urlParam('fromPaymentPage') === 'yes' ){
		    		$('#saved_addresses > div.selected .edit-btn').trigger('click');
				}
			}
			if($('#userType').val() === 'G'){
	    		addressMetaData.isAddNewAddress(true);
			}

			selectDeliveryAddress();
			addressMetaDataObj = Rayban.storage.fetch('AddressMetaData',{ stringify: true });
			if(addressMetaDataObj){
				if(addressMetaDataObj.isAddressSuggestedShown){
					$('#delivery_address').show();
					$('#delivery_address').addClass('delivery-address-active');
					$('#address_autofill').hide();
					if (storeIdentifier === "USA") {
					if ($('.state-value').text() === "CA") {
							$('#delivery_information_form .prop65-container').addClass('prop65-active');
					} else {
							$('#delivery_information_form .prop65-container').removeClass('prop65-active');
					}
				}
				}
				if(addressMetaDataObj.isAddressEdited){
					$('#delivery_address').hide();
					$('#address_autofill').show();
					$('#delivery_address').removeClass('delivery-address-active');
					$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
				}
				if (isFAZMode && (addressMetaDataObj.isAddressSuggestedShown || addressMetaDataObj.isAddressEdited)) {
					//show hidden fields
					$('.address-container').addClass('enter-address-manually-enabled');
				}
			}
			deliveryAddress.country($('#country').val());
			if($("#isVirtualGiftCardPage").val() !== "Y"){
				tax_button_fn(true);
			}
			if(window.location.pathname.indexOf('ShippingSaveControllerCmd') !== -1 ||
				window.location.pathname.indexOf('ShippingSaveControllerHKCmd') !== -1 ||
				window.location.pathname.indexOf('ShippingSaveControllerCHCmd') !== -1 ||
				window.location.pathname.indexOf('ShippingSaveControllerDKCmd') !== -1 ||
				window.location.pathname.indexOf('ShippingSaveControllerIECmd') !== -1 ||
				window.location.pathname.indexOf('ShippingSaveControllerBRCmd') !== -1 ){
        $('#addFields').removeClass('wcs-hide');
				$('#addFields').show();
				$('#delivery_address').hide();
				$('#delivery_address').removeClass('delivery-address-active');
				$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
				$('#address_autofill').show();
			}else if((isTaxRecalculated || isDataFromDB) && $('#userType').val() === 'G'){
        $('#addFields').removeClass('wcs-hide');
				$('#addFields').show();
				$('#delivery_address').hide();
				$('#delivery_address').removeClass('delivery-address-active');
				$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
				$('#address_autofill').show();
			}
			addressStyler();
			//Italy pick up address selected
			if($('#country_value').val() === 'IT' && Rayban.storage.fetch('isShipping') !== null && !Rayban.storage.fetch('isShipping')){
				$('#saved_addresses').hide();
			}
		},
		urlParam = function(name){
		    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
		    if (results === null){
		       return null;
		    }
		    else{
		       return decodeURIComponent(results[1]) || 0;
		    }
		},
		pickupToggleSavedAddresses = function(){
			if($('#D_CheckoutDelivery_Options_PickupLabel').hasClass('wcs-r-on')){
				$('#saved_addresses').hide();
				if($physicalGiftCardForm.children().length){
          savedFormForGiftCardFields = $physicalGiftCardForm.html();
          $physicalGiftCardForm.empty();
				}
			}else{
				$('#saved_addresses').show();
				if (storeIdentifier === "USA") {
					$("#saved_addresses .saved_address .state").each(function () {
						if ($(this).text() === "CA") {
							$(this).siblings('.prop65-container-text').addClass('prop65-active');
							$('.wcs-details-address-book').addClass('adjust-height');
						} else {
							$(this).siblings('.prop65-container-text').removeClass('prop65-active');
						}
					})
				} 
				if(savedFormForGiftCardFields){
				  $physicalGiftCardForm.append(savedFormForGiftCardFields);
				  savedFormForGiftCardFields= undefined;
				 }
			}
		},
		bindEvents = function(){
			$('body').on('click', '#delivery_address .edit-btn', editDeliveryAddress);
			$('body').on('click', '#saved_addresses .edit-btn', editSavedAddress);
			$('body').on('click', '#saved_addresses .add-new-delivery-address', addNewAddress);
			$('body').on('click', '.google-no-address .manual-address-trigger', function(){
				editDeliveryAddress();
				$('.google-no-address').hide();
			});
			$('body').on('click change', '#D_CheckoutDelivery_Options_Radio input:radio',pickupToggleSavedAddresses);
			$('body').ready(pickupToggleSavedAddresses);

			$('body').on('blur', '#city, #WC_State_DropDown', function(){
				deliveryAddress.city($('#city').val() || $('#WC_City_DropDown').val());
				deliveryAddress.state($('#WC_State_DropDown').val());
			});
		    $('body').on('click', '#saved_addresses > div:not(".selected"):not(".add-new-delivery-address")', function(){
				$('#addFields').hide();
				$('#saved_addresses .selected .edit-btn').removeClass('invisible');
				$('.delivery-edit-address').hide();
				var addressData = $(this).children('.address-details-store').data();
		    	$('#saved_addresses > div.selected').removeClass('selected');
		    	$(this).addClass('selected');
	    		$('#shipAddId, #selectedAddressId').val(addressData.addressId);
	    		addressMetaData.isAddNewAddress(false);
				addressMetaData.isAddressEdited(false);
		    	updateModel(deliveryAddress, BlankAddressData);
		    	updateModel(deliveryAddress, addressData);
				$('.add-new-delivery-address').show();
				$('.delivery-new-address').hide();
				if (addressData.state && addressData.city && addressData.zipcode) {
					$('#zip_code').val(addressData.zipcode);
					$("#city").val(addressData.city);
					$("#WC_State_DropDown").val(addressData.state);
					tax_button_fn(true);
				}
				if($('#country').val() === 'BR' && $('#userType').val() === 'R'){
					Rayban.checkout.delivery.store.convertToDropDown($('#saved_addresses .selected .address-details-store').data().city);
					Rayban.checkout.delivery.store.revalidateCPForCPNJ($('#userCpfOrCnpj'));
					Rayban.checkout.delivery.store.revalidateCep();
					setTimeout(function(){
					},100);
				}
			});
			$('body').on('click', '#next', function(e){
				var addressInvalidFlag = false,
					persistedDeliveryAddress = Rayban.storage.fetch('DeliveryAddress', { stringify: true }),
					fetchedDeliveryAddress = $('#saved_addresses .selected').length? $('#saved_addresses .selected .address-details-store').data() : {};

				if(addressMetaData && !addressMetaData.isAddNewAddress() && !addressMetaData.isAddressEdited()){
					for(var key in persistedDeliveryAddress){
						if (fetchedDeliveryAddress.hasOwnProperty(key) && normalizeValue(fetchedDeliveryAddress[key]) === normalizeValue(persistedDeliveryAddress[key])) {
							addressInvalidFlag = false;
						} else {
							addressInvalidFlag = true;
							break;
						}
					}
				}
				if(!persistedDeliveryAddress.city || !persistedDeliveryAddress.state || !persistedDeliveryAddress.zipcode){
					$('#delivery_address').hide();
					$('#delivery_address').removeClass('delivery-address-active');
					$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
					$('#address_autofill').show();
				}
				if(addressMetaData.isGoogleAddressDataMissing()){
					$('#delivery_address').hide();
					$('#delivery_address').removeClass('delivery-address-active');
					$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
					$('#address_autofill').show();
				}
				if($('#saved_addresses .selected').length && addressInvalidFlag){
          addressMetaData.isAddressEdited(true);
          $('#addFields').removeClass('wcs-hide');
					$('#addFields').show();
					$('#address_autofill').show();
					e.preventDefault();
				}
				//fix for RB-25154
				if ($('#isSameAddress').val() === 'true'){
					sessionStorage["rayban." + $("#store").val() + ".address.billing.state"] = Rayban.storage.fetch('DeliveryAddress', { stringify: true }).state;
				}
			});
			$('.enter-address-manually').on('click', function() { $(this).closest('.address-container').addClass('enter-address-manually-enabled'); });
		},
		subscriptions = function(){
			$.subscribe("BillingAddressUpdated", function(topic, data){
				addressMetaData.isSameDeliveryBilling(data.isSameDeliveryBilling);
			});
			$.subscribe("CreateGoogleApiBindings", function(){
				if(isGoogleApiEnabled === 'true'){
					Rayban.GoogleApi.bindApi($('#address_line_one')[0], saveAddressFromGoogle);
				}
			});
			$.subscribe('CreateDeliveryBindings', function(){
				ko.applyBindings(deliveryAddress, document.getElementById('addFields'));
				ko.applyBindings(addressMetaData, document.getElementById('delivery_information'));
			});
			$.subscribe("SelectDeliveryAddress", function(){
				selectDeliveryAddress();
			});
			$.subscribe("CustomerLoggedIn", function(){
				addressMetaData.isRegisteredCustomer(true);
				addressStyler();
				if(parseInt($('#totalAddress').val(), 10) > 0){
					$('#addFields').hide();
					addressMetaData.isAddNewAddress(false);
				}else{
					addressMetaData.isAddNewAddress(true);
				}
				selectDeliveryAddress();
				deliveryAddress.email($('#registeredEmailId').val());
				if($('#country_value').val() === 'IT' && Rayban.storage.fetch('isShipping') !== null && !Rayban.storage.fetch('isShipping')){
					$('#saved_addresses').hide();
				}
			});
			$.subscribe('CustomAddress', function(){
				editDeliveryAddress();
			});
			$.subscribe('userSubscriptionStateCheckUpdated', function(topic, data){
				deliveryAddress.subscriptionStateCheck(data);
			});
		},
		addressStyler = function(){
			var maxTitleHeight = 0,
				maxAddressDetailContainerHeight = 0;
			if( $('#saved_addresses > div').length > 1 ){
				$.each($('#saved_addresses h4'), function(index, e1){
				    if($(e1).height() > maxTitleHeight){
				    	maxTitleHeight = $(e1).height();
				    }
				});
				$.each($('#saved_addresses h4'), function(index, e1){
				    $(e1).height(maxTitleHeight);
				});
				$.each($('#saved_addresses .wcs-details-address-book'), function(index, e1){
				    if($(e1).height() > maxAddressDetailContainerHeight){
				    	maxAddressDetailContainerHeight = $(e1).height();
				    }
				});
				$.each($('#saved_addresses .wcs-details-address-book'), function(index, e1){
				    $(e1).height(maxAddressDetailContainerHeight);
				});
			}
		},
		editDeliveryAddress = function () {
			$('#delivery_address').hide();
			$('#delivery_address').removeClass('delivery-address-active');
			$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
			$('#address_autofill').show();
			if(isGoogleApiEnabled === 'true'){
				Rayban.GoogleApi.unbindApi($('#address_line_one')[0]);
			}
			addressMetaData.isAddressSuggestedShown(false);
			addressMetaData.isAddressEdited(true);
			addressMetaData.isGoogleApiSubscriptionActive(false);
			fieldsValidation('#delivery_information_form');
		},
		saveAddressFromGoogle = function(model){
			var isEmptyModel = $.isEmptyObject(model);
			var isEmptyAddressLine = $('#address_line_one').length === 0;
			/*deliveryAddress.city($('#country_value').val() === 'HK' ? '' : undefined);
			deliveryAddress.zipcode(undefined);
			deliveryAddress.state('');*/
			reset_form_errors('delivery_information_form');
			/*updateModel(deliveryAddress, {
				addressLineOne : undefined,
				city : undefined,
				state : '',
				zipcode : undefined,
				country : undefined
			});*/
			if(isEmptyModel || !isEmptyAddressLine){
				model.addressLineOne = $('#address_line_one').val().split(',')[0];
			}
			Rayban.storage.save('DeliveryAddress', model, { stringify: true });
			addressMetaData.isGoogleAddressDataMissing(false);
			if (model.state && model.city && model.zipcode) {
				$('#zip_code').val(model.zipcode);
				$("#city").val(model.city);
				$("#WC_State_DropDown").val(model.state);
				tax_button_fn(true);
			}

			updateModel(deliveryAddress, Rayban.storage.fetch('DeliveryAddress', { stringify: true }));
			if(!$('#address_autofill').is(':visible')){
				$('#delivery_address').show();
				$('#delivery_address').addClass('delivery-address-active');
				if (storeIdentifier === "USA") {
				if ($('.state-value').text() === "CA") {
						$('#delivery_information_form .prop65-container-text').addClass('prop65-active');
				} else {
						$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
					}
				}
			}
			addressMetaData.isAddressSuggestedShown(true);
			// Check on completeness of google suggested data
			if((!model.state || !model.city || !model.country || !model.zipcode) && !isEmptyModel){
				addressMetaData.isGoogleAddressDataMissing(true);
        addressMetaData.isAddressEdited(true);
          $('#addFields').removeClass('wcs-hide');
		    	$('#addFields').show();
		    	$('#address_autofill').show();
				$('#delivery_address').hide();
				$('#delivery_address').removeClass('delivery-address-active');
				$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
			}else if(isEmptyModel){
				$('input[name=address1]').after('<div class="google-no-address wcs-hidden">' +
					 '<span class="wcs-icon"></span>' +
					'<p class="error-message">Sorry, we can\'t find your address.</p>' +
					'<div class="manual-address-trigger wcs-text-decoration-underline wcs-cursor-pointer">Click here to enter manually</div>' +
				'</div>');
				$('.google-no-address').show();
				$('#delivery_address').hide();
				$('#delivery_address').removeClass('delivery-address-active');
				$('#delivery_information_form .prop65-container-text').removeClass('prop65-active');
				deliveryAddress.city($('#country_value').val() === 'HK' ? '' : undefined);
				deliveryAddress.state('');
				deliveryAddress.zipcode(undefined);
			}
			if(storeIdentifier !== "USA" && storeIdentifier !== "US") {
				$( "#delivery_address .edit-btn" ).click();
			}

			if (storeIdentifier === "USA") {
			if ($('#WC_State_DropDown').val() === "CA") {
					$('#delivery_information_form #address_autofill .prop65-container').addClass('prop65-active');
			} else {
					$('#delivery_information_form #address_autofill .prop65-container').removeClass('prop65-active');
				}
			}
		},
		saveAddressFromFAZ = function(model){
			var isEmptyModel = $.isEmptyObject(model);
			reset_form_errors('delivery_information_form');
			Rayban.storage.save('DeliveryAddress', model, { stringify: true });
			updateModel(deliveryAddress, Rayban.storage.fetch('DeliveryAddress', { stringify: true }));
			addressMetaData.isAddressSuggestedShown(true);
			//show hidden fields
			$('.address-container').addClass('enter-address-manually-enabled');
			if (storeIdentifier === 'GB') {
				fieldsValidation('#delivery_information_form', '#address_autofill');
			}
		},
		editSavedAddress = function(){
			reset_form_errors('delivery_information_form');
			updateModel(deliveryAddress, BlankAddressData);
			updateModel(deliveryAddress, $(this).parent().children('.address-details-store').data());
      addressMetaData.isAddressEdited(true);
        $('#addFields').removeClass('wcs-hide');
	    	$('#addFields').show();
				$('#address_autofill').show();
				if (storeIdentifier === "USA") {
					if ($('#WC_State_DropDown').val() === "CA") {
						$('#delivery_information_form #address_autofill .prop65-container').addClass('prop65-active');
					} else {
						$('#delivery_information_form #address_autofill .prop65-container').removeClass('prop65-active');
					}
        }
        manageProp65();
				$('#saved_addresses .selected .edit-btn').addClass('invisible');
				$('.delivery-edit-address').show();
				fieldsValidation('#delivery_information_form');
		},
		selectDeliveryAddress = function(){
			var defaultAddress = $('#saved_addresses .address-details-store')
				.filter(function(index){
					return $(this).data().addressId === parseInt($('#selectedAddressId').val(), 10);
				});
			if(addressMetaData.isAddNewAddress()){
          $('#addFields').removeClass('wcs-hide');
	    		$('#addFields').show();
	    		$('#saved_addresses .selected').removeClass('selected');
			}
			else if(!!$('#selectedAddressId').val() && defaultAddress.length){
				defaultAddress
				.parent()
				.addClass('selected');
			}else if($('#saved_addresses > div:not(".add-new-delivery-address")').length){
				$('#saved_addresses > div:not(".add-new-delivery-address")')
					.first()
					.addClass('selected');
				var addressData = $('#saved_addresses > div:not(".add-new-delivery-address")')
					.first()
					.children('.address-details-store')
					.data();
	    		$('#shipAddId, #selectedAddressId').val(addressData.addressId);
			}
			updateModel(deliveryAddress, $('#saved_addresses .selected .address-details-store').data());
			if($('#country').val() === 'BR' && $('#userType').val() === 'R'){

				var addressSelectedByCep = false;
				$('.saved_address').each(function() {
					  var addressData = $(this).children('.address-details-store').data();
					  if (addressData.zipcode != '' && addressData.zipcode == $('.presaved-address-details-store').data().zipcode){
						  addressSelectedByCep = true;
						  $('#zip_code').val(addressData.zipcode);
						  $(this).trigger( "click" );
					  }
				});

				if (!addressSelectedByCep) {
					addNewAddress();
				}

				Rayban.checkout.delivery.store.revalidateCep();

				if($('#saved_addresses > div:not(".add-new-delivery-address")').length === 0){
					updateModel(deliveryAddress, Rayban.checkout.delivery.store.replaceAddressData($('#userType').val()));
					$.publish('CreateReadOnlyFields', {
						city: {
							field: $('#city'),
							value: $('.presaved-address-details-store').data().city
						},
						state: {
							field: $('#WC_State_DropDown'),
							value: $('.presaved-address-details-store').data().state
						}
					});
				}else{
					if ($('#saved_addresses .selected .address-details-store').size() > 0) {
						Rayban.checkout.delivery.store.convertToDropDown($('#saved_addresses .selected .address-details-store').data().city);
						Rayban.checkout.delivery.store.revalidateCPForCPNJ($('#userCpfOrCnpj'));
						$.publish('CreateReadOnlyFields', {
							city: {
								field: $('#city'),
								value: $('#saved_addresses .selected .address-details-store').data().city
							},
							state: {
								field: $('#WC_State_DropDown'),
								value: $('#saved_addresses .selected .address-details-store').data().state
							}
						});
					}
				}
			}

			if($('#userType').val() === 'R'){
				tax_button_fn(true);
			}
		},

		fieldsValidation = function ($form, $selector) {
			if (!$selector) {
				$selector = '';
			}
			var $selectors = $($form + ' ' + $selector + ' input[type="text"]')
				.add($($form + ' ' + $selector + ' input[type="email"]'))
				.add($($form + ' ' + $selector + ' input[type="tel"]'))
				.add($($form + ' ' + $selector + ' select'));
			var result = $($form).h5Validate('allValid');
			if (!result) {
				$selectors.each(function () {
					hide_error($($selectors));
				})
			}
		}

		addNewAddress = function(){
			if(typeof Rayban.checkout === "object" && typeof Rayban.checkout.delivery === "object"){
				BlankAddressData = Rayban.checkout.delivery.store.replaceAddressData($('#userType').val());
				Rayban.checkout.delivery.store.generateCityOptions($('#city'),[BlankAddressData.city]);
			}
			BlankAddressData.email = $('#registeredEmailId').val() || undefined;
			reset_form_errors('delivery_information_form');
			updateModel(deliveryAddress, BlankAddressData);
			if(typeof Rayban.checkout === "object" && typeof Rayban.checkout.delivery === "object"){
			}
			$('#shipAddId, #selectedAddressId').val('');
    		if(isGoogleApiEnabled === 'true'){
				Rayban.GoogleApi.bindApi($('#address_line_one')[0], saveAddressFromGoogle);
    			$('#address_autofill').hide();
        }
      manageProp65();
      $('#addFields').removeClass('wcs-hide');
			$('#addFields').show();
			$('.add-new-delivery-address').hide();
			$('.delivery-new-address').show();
			$('.delivery-edit-address').hide();
			$('#saved_addresses .selected .edit-btn').removeClass('invisible');
			addressMetaData.isAddNewAddress(true);
			$('#saved_addresses > div.selected').removeClass('selected');
			fieldsValidation('#delivery_information_form');
    },
    manageProp65 = function () {
      // initialize prop65 overlay
      if(!overlays){
        var $trigger = $('.prop65-trigger');
        if ($trigger.size() > 0) {
          var overlays = new Rayban.OverlayManager({
            triggerCssClass: 'prop65-trigger'
          });
          overlays.initAll();
        }
      }
      $("#WC_State_DropDown, #address_line_one").change(function () {
        if (storeIdentifier === "USA") {
          if ($('#WC_State_DropDown').val() === "CA") {
            $('#delivery_information_form #address_autofill .prop65-container').addClass('prop65-active');
          } else {
            $('#delivery_information_form #address_autofill .prop65-container').removeClass('prop65-active');
          }
        }
      });
    },
		normalizeValue = function(rawValue) {
			if (rawValue === 'yes') {
				return true;
			} else if (rawValue === 'no') {
				return false;
			} else {
				return rawValue
			}
    };
  if ($('#pageName').val() == 'CheckoutLogon' || $('#pageName').val() == 'Delivery') {
  init();
  }
}(window.Rayban = window.Rayban || {}, ko));
