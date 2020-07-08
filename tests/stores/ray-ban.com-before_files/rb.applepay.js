var ApplePay = Class({

  initialize: function () {
    this.paymentRequest = null;
    this.STATUS_SUCCESS = "success";
    this.STATUS_ERROR = "error";
    this.defaultShipModeId = "";
    this.selectedShippingContact = null;
    this.session = null;
    this.selectedShippingMethod = null;
    this.device = "";
    this.flow = "";
    this.page = "";
    this.countryCode = "";
    this.shipContactValidations = null;
    this.shipAddressInitialValidations = null;
    this.shipAddressFinalValidations = null;
    this.billAddressValidations = null;
    this.addrDebug = false;
    this.orderId = "";
  },
  setAddressValidationData: function () {
    var self = this;

    if (self.page !== 'payment') {
      self.shipContactValidations = {
        phoneNumber: {
          isValueRequired: true
        },
        emailAddress: {
          isValueRequired: true
        }
      };
      self.shipAddressInitialValidations = {
        locality: {
          isRegexRequired: false,
          pattern: '^[^0-9]+$',
          isValueRequired: true
        },
        administrativeArea: {
          isRegexRequired: false,
          pattern: '^[^0-9]+$',
          isValueRequired: true
        },
        postalCode: {
          isRegexRequired: false,
          pattern: self.zipcode_pattern(self.countryCode),
          isValueRequired: true
        }
      };
      self.shipAddressFinalValidations = {
        givenName: {
          isRegexRequired: false,
          pattern: '^[^0-9]+$',
          isValueRequired: true
        },
        familyName: {
          isRegexRequired: false,
          pattern: '^[^0-9]+$',
          isValueRequired: true
        },
        addressLines: [{
            isRegexRequired: false,
            pattern: '',
            isValueRequired: true
          },
          {
            isRegexRequired: false,
            pattern: '',
            isValueRequired: false
          }
        ]
      };
      self.billAddressValidations = {
        givenName: {
          isValueRequired: true
        },
        familyName: {
          isValueRequired: true
        },
        addressLines: [{
            isValueRequired: true
          },
          {
            isValueRequired: false
          }
        ],
        locality: {
          isValueRequired: true
        },
        administrativeArea: {
          isValueRequired: true
        },
        postalCode: {
          isValueRequired: true
        }
      };
    }
  },
  zipcode_pattern: function (country) {
    var pattern;
    switch (country.toLowerCase()) {
      case 'us':
        pattern = '(\\d{5}([\\-]\\d{4})?)';
        break;
      case 'ca':
        pattern = '[A-Za-z](\\s?)[0-9](\\s?)[A-Za-z](\\s?)[0-9](\\s?)[A-Za-z](\\s?)[0-9](\\s?)';
        break;
      case 'cn':
        pattern = '(\\d{6}?)';
        break;
      case 'pl':
        pattern = '(\\d{2}([\\-]\\d{3}))';
        break;
      case 'dk':
        pattern = '(\\d{3,4})';
        break;
      case 'ch':
        pattern = '^(?!(7563|8238|6911)).*(\\d{4})';
        break;
      case 'tr':
        pattern = '^(?!99).*(\\d{5})';
        break;
      case 'no':
        pattern = '(\\d{4})';
        break;
      case 'se':
        pattern = '^\\d{5}|(\\d{3}[\\s|\\d{1}]\\d{2})';
        break;
      case 'at':
        pattern = '(\\d{4})';
        break;
      case 'be':
        pattern = '(\\d{4})';
        break;
      case 'it':
        pattern = '^(?!(23030|22060)).*(\\d{5})';
        break;
      case 'fr':
        pattern = '^(?!(97[1-8])).*^(?!(98[6-8])).*(\\d{5})';
        break;
      case 'de':
        pattern = '^(?!(78266|27498)).*(^(\\d{4,5})$)';
        break;
      case 'es':
        pattern = '^(?!52).*^(?!51).*^(?!35).*^(?!38).*(\\d{5})';
        break;
      case 'gb':
        pattern = '^(?!BF1).*^(?!GY).*^(?!JE).*^(?!FO).*^(?!bf1).*^(?!gy).*^(?!je).*^(?!fo).*([A-Za-z0-9 ]{5,7})';
        break;
      case 'nl':
        pattern = '([0-9][0-9][0-9][0-9][\\s]?[A-Za-z][A-Za-z])';
        break;
      case 'ie':
        pattern = '(^([a-zA-Z0-9\\s]){7,8}$)';
        break;
      case 'pt':
        pattern = '^(?!(9[1-9][0-9][0-9])).*(\\d{4})';
        break;
      case 'fi':
        pattern = '^(?!22).*(\\d{5})';
        break;
      case 'mx':
        pattern = '^(|[0-9_-]{5})$';
        break;
      default:
        pattern = '';
        break;
    }
    return pattern;
  },
  isApplePayEnabledForStore: function () {
    var self = this;
    var isApplePayEnabled = false;
    if ($("#applePayEnabled") && $("#applePayEnabled").length > 0 && $("#applePayEnabled").val() === 'Y') {
      if (self.flow === 'returns') {
        if ($("#applePayEnabledForReturn") && $("#applePayEnabledForReturn").length > 0 && $("#applePayEnabledForReturn").val() === 'Y') {
          isApplePayEnabled = true;
        }
      } else if (self.flow === 'browse') {
        if ($("#applePayEnabledInPDP") && $("#applePayEnabledInPDP").length > 0 && $("#applePayEnabledInPDP").val() === 'Y') {
          isApplePayEnabled = true;
        } else if ($("#applePayEnabledInPCP") && $("#applePayEnabledInPCP").length > 0 && $("#applePayEnabledInPCP").val() === 'Y') {
          isApplePayEnabled = true;
        }
      } else {
        isApplePayEnabled = true;
      }
    }
    return isApplePayEnabled;
  },
  isEmpty: function (v) {
    if (typeof v === "object") {
      if (Array.isArray(v)) {
        if (v.length > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
    return !(typeof v === "string" && v.length > 0);
  },
  retrieveWCOrderInformation: function () {
    var self = this;

    $.ajax({
      url: "/GetPaymentRequestData",
      type: "GET",
      data: self.getCommonParameters(),
      async: false,
      success: function (data) {
        var jsonText = data.replace(/(\/\*|\*\/)/g, '');
        self.constructPaymentRequest(JSON.parse(jsonText));
      },
      error: function (data) {
        $('.fc-apple-pay').removeClass('applepay-loading');
        // $('.fc-apple-pay .fa-spinner').remove();
      }
    });
  },
  cancelApplePayOrder: function () {
    var self = this;

    $.ajax({
      url: "AjaxApplePayOrderItemDelete",
      type: "POST",
      async: false,
      data: self.getCommonParameters(),
      success: function (data) {
        self.updateBagQtyOnCancel();
        self.refreshWishList();
        $('.fc-apple-pay').removeClass('applepay-loading');
        // $('.fc-apple-pay .fa-spinner').remove();
      }
    });
  },
  constructPaymentRequest: function (resp) {
    var self = this;

    self.orderId = resp.orderId;
    self.defaultShipModeId = resp.defaultShipModeId;
    self.countryCode = resp.countryCode;
    if (self.page === 'payment') {
      self.paymentRequest = {
        countryCode: resp.countryCode,
        currencyCode: resp.currencyCode,
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        total: {
          label: 'Your Label',
          amount: '10.00'
        }
      };
      self.paymentRequest.total = resp.total;
      self.paymentRequest.lineItems = resp.lineItems;
    } else if (self.page === 'PDP' || self.page === 'PCP' || self.page === 'FL') {
      self.paymentRequest = {
        countryCode: resp.countryCode,
        currencyCode: resp.currencyCode,
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        shippingMethods: [],
        requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'],
        requiredBillingContactFields: ['postalAddress', 'name', 'phone', 'email'],
        total: {
          label: 'Your Label',
          amount: '10.00'
        }
      };
      self.paymentRequest.total = resp.total;
      self.paymentRequest.lineItems = resp.lineItems;
      self.paymentRequest.shippingMethods = resp.shippingMethods;
    } else {
      self.paymentRequest = {
        countryCode: resp.countryCode,
        currencyCode: resp.currencyCode,
        supportedNetworks: ['visa', 'masterCard', 'amex'],
        merchantCapabilities: ['supports3DS'],
        shippingMethods: [],
        requiredShippingContactFields: ['postalAddress', 'name', 'phone', 'email'],
        requiredBillingContactFields: ['postalAddress', 'name', 'phone', 'email'],
        total: {
          label: 'Your Label',
          amount: '10.00'
        }
      };
      self.paymentRequest.total = resp.total;
      self.paymentRequest.lineItems = resp.lineItems;
    }
  },

  renderPaymentSheet: function () {
    var self = this;
    console.log('>>>>> Starting Apple Session');
    self.session = new ApplePaySession(2, self.paymentRequest);
    console.log('>>>>> End Apple Session');
    self.session.onvalidatemerchant = function (event) {
      $.ajax({
        url: "/webapp/wcs/stores/servlet/AjaxApplePayMerchantValidation",
        type: "POST",
        data: self.getCommonParameters() + "&applePaySessionURL=" + event.validationURL,
        async: false,
        success: function (merchantSession) {
          var merchantSessionJson = JSON.parse(merchantSession);
          self.session.completeMerchantValidation(JSON.parse(merchantSessionJson.merchantSessionObject));
        },
        error: function (merchantSession) {
          console.log('Apple Pay Session Failed', merchantSession);
          $('.fc-apple-pay').removeClass('applepay-loading');
          // $('.fc-apple-pay .fa-spinner').remove();
        }
      });
    };

    self.session.onshippingcontactselected = function (event) {
      selectedShippingContact = event.shippingContact;
      self.updateShippingAddress(event.shippingContact);
    };
    self.session.onshippingmethodselected = function (event) {
      selectedShippingMethod = event.shippingMethod;
      self.updateShippingMethod(event.shippingMethod);
    };
    self.session.onpaymentauthorized = function (event) {
      if (self.flow === 'returns') {
        self.sendReturnPaymentToken(event.payment);
      } else {
        self.sendPaymentToken(event.payment);
      }
    };
    self.session.oncancel = function (event) {
      console.log("User cancelled the popup");
      if (self.page === 'FL') {
        $('.fc-apple-pay').removeClass('applepay-loading');
        // $('.fc-apple-pay .fa-spinner').remove();
      }
      if (self.page === 'PDP' || self.page === 'PCP' || self.page === 'FL') {
        self.cancelApplePayOrder();
      }
    };

    self.session.begin();
  },
  getShippingAndBillingContactParameters: function (payment) {
    var self = this;
    var address = '';
    if (self.page === 'payment') {
      address += '&billtoAddressId=' + $("#billtoAddressId").val(); // For apple pay in payment page
    } else {

      // For apple pay in shop cart page
      address += self.getSelectedShipModeIdParameter();
      if (!self.isEmpty(payment.shippingContact)) {
        if (!self.isEmpty(payment.shippingContact.givenName)) {
          address += '&firstName_s=' + payment.shippingContact.givenName;
        }
        if (!self.isEmpty(payment.shippingContact.familyName)) {
          address += '&lastName_s=' + payment.shippingContact.familyName;
        }
        if (!self.isEmpty(payment.shippingContact.locality)) {
          address += '&city_s=' + encodeURIComponent(payment.shippingContact.locality);
        }
        if (!self.isEmpty(payment.shippingContact.postalCode)) {
          address += '&zipCode_s=' + encodeURIComponent(payment.shippingContact.postalCode);
        }
        if (!self.isEmpty(payment.shippingContact.addressLines) && !self.isEmpty(payment.shippingContact.addressLines[0])) {
          address += '&address1_s=' + encodeURIComponent(payment.shippingContact.addressLines[0]);
        }
        if (!self.isEmpty(payment.shippingContact.addressLines) && !self.isEmpty(payment.shippingContact.addressLines[1])) {
          address += '&address2_s=' + encodeURIComponent(payment.shippingContact.addressLines[1]);
        }
        if (!self.isEmpty(payment.shippingContact.phoneNumber)) {
          address += '&mobilephone1_s=' + payment.shippingContact.phoneNumber;
        }
        var state_s = "";
        var country_s = payment.shippingContact.countryCode.toUpperCase();
        if (country_s === "FR" || country_s === "CH" || country_s === "GB") {
          state_s = country_s;
        } else {
          state_s = encodeURIComponent(payment.shippingContact.administrativeArea);
        }
        if (!self.isEmpty(state_s)) {
          address += '&state_s=' + state_s;
        }
        if (!self.isEmpty(payment.shippingContact.countryCode)) {
          address += '&country_s=' + payment.shippingContact.countryCode.toUpperCase();
        }
        if (!self.isEmpty(payment.shippingContact.emailAddress)) {
          address += '&email1_s=' + payment.shippingContact.emailAddress;
        }
      }
      if (!self.isEmpty(payment.billingContact)) {
        if (!self.isEmpty(payment.billingContact.givenName)) {
          address += '&firstName_b=' + payment.billingContact.givenName;
        }
        if (!self.isEmpty(payment.billingContact.familyName)) {
          address += '&lastName_b=' + payment.billingContact.familyName;
        }
        if (!self.isEmpty(payment.billingContact.locality)) {
          address += '&city_b=' + encodeURIComponent(payment.billingContact.locality);
        }
        if (!self.isEmpty(payment.billingContact.postalCode)) {
          address += '&zipCode_b=' + encodeURIComponent(payment.billingContact.postalCode);
        }
        if (!self.isEmpty(payment.billingContact.addressLines) && !self.isEmpty(payment.billingContact.addressLines[0])) {
          address += '&address1_b=' + encodeURIComponent(payment.billingContact.addressLines[0]);
        }
        if (!self.isEmpty(payment.billingContact.addressLines) && !self.isEmpty(payment.billingContact.addressLines[1])) {
          address += '&address2_b=' + encodeURIComponent(payment.billingContact.addressLines[1]);
        }
        if (!self.isEmpty(payment.billingContact.administrativeArea)) {
          address += '&state_b=' + encodeURIComponent(payment.billingContact.administrativeArea);
        }
        if (!self.isEmpty(payment.billingContact.countryCode)) {
          address += '&country_b=' + payment.billingContact.countryCode.toUpperCase();
        }
        if (!self.isEmpty(payment.shippingContact.emailAddress)) {
          address += '&email1_b=' + payment.shippingContact.emailAddress;
        }
        if (!self.isEmpty(payment.shippingContact.phoneNumber)) {
          address += '&mobilephone1_b=' + payment.shippingContact.phoneNumber;
        }
      }
    }
    return address;
  },
  getCommonParameters: function () {
    var self = this;

    var params = 'storeId=' + $('#storeId').val() + '&catalogId=' + $('#catalogId').val() + '&langId=' + $('#langId').val();

    if ($('#orderId') && $('#orderId').length > 0 && $('#orderId').val() !== 'undefined') {
      params = params + '&orderId=' + $('#orderId').val();
    } else if (self.orderId !== '' && self.orderId !== undefined) {
      params = params + '&orderId=' + self.orderId;
    }
    if (self.page === 'payment') {
      params = params + "&fromPaymentPage=true";
    } else if (self.page === 'PDP') {
      params = params + "&fromPDPPage=true";
    } else if (self.page === 'PCP') {
      params = params + "&fromPCPPage=true";
    } else if (self.page === 'FL') {
      params = params + "&fromPCPPage=true";
    }

    return params;
  },
  validateInitialShippingAddress: function (sc) {
    var self = this;

    // Validate basic shipping contact for shipping costs
    if (self.isEmpty(sc)) {
      return false;
    }
    if (sc.countryCode.toLowerCase() === self.countryCode.toLowerCase()) {
      return self.performValidation(sc, self.shipAddressInitialValidations);
    } else {
      return false;
    }
  },
  validateShippingContact: function (sc) {

    var self = this;

    return self.performValidation(sc, self.shipContactValidations);
  },
  validateFinalShippingAddress: function (sc) {

    var self = this;

    // Validate full contact for address book
    if (!self.validateInitialShippingAddress(sc)) {
      return false;
    }
    return self.performValidation(sc, self.shipAddressFinalValidations);
  },
  validateBillingContact: function (bc) {
    var self = this;

    // Validate full billing contact
    if (self.isEmpty(bc)) {
      return false;
    }
    return self.performValidation(bc, self.billAddressValidations);
  },
  performValidation: function (c, addressValidations) {
    var self = this;

    var isValidAddress = true;
    $.each(c, function (k, v) {

      if (!(k === 'administrativeArea' && (c.countryCode.toUpperCase() === 'GB' || c.countryCode.toUpperCase() === 'FR' || c.countryCode.toUpperCase() === 'CH' || c.countryCode.toUpperCase() === 'AT' || c.countryCode.toUpperCase() === 'NL'))) {
        var addressField = addressValidations[k];
        var data = c[k];
        if (!!addressField) {
          if (typeof data === 'object') {
            $.each(addressField, function (index) {
              var dataArr = data[index];
              var addressFieldArr = addressField[index];
              var isValid = self.validateField(addressFieldArr, dataArr);
              if (!isValid) {
                isValidAddress = false;
              }
            });
          } else {
            var isValid = self.validateField(addressField, data);
            if (!isValid) {
              isValidAddress = false;
            }
          }
        }
      }

    });
    return isValidAddress;
  },
  validateField: function (addressField, data) {
    var self = this;

    if (addressField.isValueRequired && self.isEmpty(data)) {
      return false;
    }
    if (addressField.isRegexRequired && addressField.pattern != undefined) {
      var regEx = new RegExp(addressField.pattern);
      if (!regEx.test(data)) {
        return false
      }
    }
    return true;
  },
  getDefaultShipModeIdParameter: function () {
    var self = this;

    return '&shipModeId=' + self.defaultShipModeId;
  },
  getSelectedShipModeIdParameter: function () {
    var self = this;

    if ($('input[name=shipping]:checked').val() !== undefined) {
      return '&shipModeId=' + $('input[name=shipping]:checked').val();
    } else {
      return '&shipModeId=' + self.defaultShipModeId;
    }
  },
  updateShippingMethod: function (shippingMethod) {
    var self = this;
    $.ajax({
      url: "AjaxShipChargeUpdate",
      type: "POST",
      async: false,
      data: "isApplePay=true&" + self.getCommonParameters() + '&shipModeId=' + shippingMethod.identifier,
      success: function (data) {
        self.retrieveWCOrderInformation();
        self.session.completeShippingMethodSelection(ApplePaySession.STATUS_SUCCESS, self.paymentRequest.total, self.paymentRequest.lineItems);
      },
      error: function (data) {
        self.session.completeShippingMethodSelection(ApplePaySession.STATUS_FAILURE);
      }
    });
  },
  updateShippingAddress: function (shippingContact) {
    var self = this;
    var caAddress = "false";
    if (self.addrDebug !== true) {
      if (self.page !== 'payment') {
        if (!self.validateInitialShippingAddress(shippingContact)) {
          self.session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, self.paymentRequest.shippingMethods, self.paymentRequest.total, self.paymentRequest.lineItems);
          return;
        }
      }
    }
    if (self.countryCode === 'CA' && self.page !== 'payment') {
      caAddress = "true";
    }
    $.ajax({
      url: "AjaxOrderCalculate",
      type: "POST",
      async: false,
      data: "isApplePay=true&isCAAddress=" + caAddress + "&" + self.getCommonParameters() + self.getShippingAddressDetails(shippingContact) + self.getAddtionalParameters() + self.getSelectedShipModeIdParameter(),
      success: function (data) {
        if (typeof data !== 'object') {
          data = JSON.parse(data);
        }

        if ((data.errorCode != undefined && data.errorCode != "") || (data.errorMessageKey != undefined && data.errorMessageKey != "")) {
          self.session.completeShippingContactSelection(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS, self.paymentRequest.shippingMethods, self.paymentRequest.total, self.paymentRequest.lineItems);
        } else {
          self.retrieveWCOrderInformation();
          self.session.completeShippingContactSelection(ApplePaySession.STATUS_SUCCESS, self.paymentRequest.shippingMethods, self.paymentRequest.total, self.paymentRequest.lineItems);
        }
        if (self.page !== 'payment') {
          var state = "";
          var country = shippingContact.countryCode.toUpperCase();
          if (country === "FR" || country === "CH" || country === "GB") {
            state = country.toUpperCase();
          } else {
            state = encodeURIComponent(shippingContact.administrativeArea);
          }
          self.updateOrderSummary(shippingContact.locality, state, shippingContact.postalCode);
        }
      },
      error: function (data) {
        self.session.completeShippingContactSelection(ApplePaySession.STATUS_FAILURE);
      }
    });
  },
  sendPaymentToken: function (payment) {
    var self = this;
    var applePayErrorView = self.getErrorView();

    if (self.addrDebug !== true) {
      if (self.page !== 'payment') {
        if (!self.validateShippingContact(payment.shippingContact)) {
          self.session.completePayment(ApplePaySession.STATUS_INVALID_SHIPPING_CONTACT);
          return;
        }
        if (!self.validateFinalShippingAddress(payment.shippingContact)) {
          self.session.completePayment(ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS);
          return;
        }
        if (!self.validateBillingContact(payment.billingContact)) {
          self.session.completePayment(ApplePaySession.STATUS_INVALID_BILLING_POSTAL_ADDRESS);
          return;
        }
      }
    }

    $.ajax({
      url: "AjaxApplePayOrderProcess",
      type: "POST",
      async: true,
      data: self.getCommonParameters() + "&URL=" + self.getSuccessView() + "&applePayErrorView=" + applePayErrorView + self.getShippingAndBillingContactParameters(payment) + "&jsonView=true&isApplePay=true" +
        '&paymentToken_applePay=' + btoa(JSON.stringify(payment.token.paymentData)) + self.getPaymentTokenParameters(payment.token) + "&checkoutTime=" + new Date().getTime(),
      success: function (data) {
        if ($(data).filter('#page').val() === 'ThankYouPage' || $(data).find('#page').val() === 'ThankYouPage') {
          self.session.completePayment(ApplePaySession.STATUS_SUCCESS);
          self.showNextPage("", 1, "", data);
        } else if ($(data).filter('#pageNameVal').val() === 'ShopCart' || $(data).find('#pageNameVal').val() === 'ShopCart') {
          self.session.completePayment(ApplePaySession.STATUS_FAILURE);
          Rayban.analytics.applePayAjaxError($(data).find('.wcs-server-error-message-p').html());
          if (self.page !== 'PDP' && self.page !== 'PCP' && self.page !== 'FL') {
            self.showNextPage(applePayErrorView, 0, $(data).find('.wcs-server-error-message-p').html(), data);
          } else {
            self.cancelApplePayOrder();
          }
        } else if ($(data).filter('#pageNameVal').val() === 'PaymentPage' || $(data).find('#pageNameVal').val() === 'PaymentPage') {
          self.session.completePayment(ApplePaySession.STATUS_FAILURE);
          Rayban.analytics.applePayAjaxError($(data).find(self.getError()).html());
          if (self.page !== 'PDP' && self.page !== 'PCP' && self.page !== 'FL') {
            self.showNextPage(applePayErrorView, 0, $(data).find(self.getError()).html(), data);
          } else {
            self.cancelApplePayOrder();
          }
        } else {
          self.session.completePayment(ApplePaySession.STATUS_SUCCESS);
          self.showNextPage("", 1, "", data);
        }
      },
      error: function (data) {
        tealium_data2track.push({
          id: 'Error',
          Error_Code: data.statusText,
          Error_Source: 'Server'
        });
        self.session.completePayment(ApplePaySession.STATUS_FAILURE);
        Rayban.analytics.applePayAjaxError($(data).find('.wcs-server-error-message-p').html());
        if (self.page !== 'PDP' && self.page !== 'PCP' && self.page !== 'FL') {
          self.showNextPage("ShopCartDisplayView", 0, $(data).find('.wcs-server-error-message-p').html(), data);
        } else {
          self.cancelApplePayOrder();
        }
      }
    });
  },
  sendReturnPaymentToken: function (payment) {
    var self = this;
    var params = $('input[name!=authToken][name!=cc_brand][name!=account][name!=cc_nameoncard][name!=expire_month][name!=expire_year][name!=cc_cvc]', '#payment_mode_form').serialize();
    params = params + '&paymentToken_applePay=' + btoa(JSON.stringify(payment.token.paymentData)) + self.getPaymentTokenParameters(payment.token) + "&payMethodId=ApplePay";
    $.ajax({
      url: "SubmitReturn",
      type: "POST",
      async: true,
      data: params,
      success: function (data) {
        if ($(data).filter('#pageTemplate').val() === 'returnPayment' || $(data).find('#pageTemplate').val() === 'returnPayment') {
          self.session.completePayment(ApplePaySession.STATUS_FAILURE);
          document.location.href = "ReturnPaymentDetailsView?" + self.getCommonParameters() + "&RMAId=" + $("input[name=RMAId]").val() + "&applePayErrorMessage=" + $(data).find(self.getError()).html();
        } else {
          self.session.completePayment(ApplePaySession.STATUS_SUCCESS);
          document.location.href = "ReturnConfirmationView?" + self.getCommonParameters() + "&RMAId=" + $("input[name=RMAId]").val();
        }
      },
      error: function (data) {
        self.session.completePayment(ApplePaySession.STATUS_FAILURE);
        document.location.href = "ReturnPaymentDetailsView?" + self.getCommonParameters() + "&RMAId=" + $("input[name=RMAId]").val() + "&applePayErrorMessage=" + $(data).find(self.getError()).html();
      }
    });
  },
  getPaymentTokenParameters: function (token) {

    var paymentToken = '&paymentToken_data=' + encodeURIComponent(token.paymentData.data);
    paymentToken = paymentToken + '&paymentData_header_publicKeyHash=' + encodeURIComponent(token.paymentData.header.publicKeyHash);
    paymentToken = paymentToken + '&paymentData_header_ephemeralPublicKey=' + encodeURIComponent(token.paymentData.header.ephemeralPublicKey);
    paymentToken = paymentToken + '&paymentData_header_transactionId=' + encodeURIComponent(token.paymentData.header.transactionId);
    paymentToken = paymentToken + '&paymentData_signature=' + encodeURIComponent(token.paymentData.signature);
    paymentToken = paymentToken + '&paymentData_version=' + encodeURIComponent(token.paymentData.version);
    paymentToken = paymentToken + '&paymentMethod_displayName=' + encodeURIComponent(token.paymentMethod.displayName);
    paymentToken = paymentToken + '&paymentMethod_network=' + encodeURIComponent(token.paymentMethod.network);
    paymentToken = paymentToken + '&paymentMethod_type=' + encodeURIComponent(token.paymentMethod.type);
    paymentToken = paymentToken + '&paymentMethod_paymentPass=' + encodeURIComponent(token.paymentMethod.paymentPass);
    paymentToken = paymentToken + '&transactionIdentifier=' + encodeURIComponent(token.transactionIdentifier);
    return paymentToken;
  },
  performApplePayActions: function () {
    var self = this;

    self.retrieveWCOrderInformation();
    self.setAddressValidationData();
    self.renderPaymentSheet();
  },
  getAddtionalParameters: function () {
    var self = this;
    var addressFlag = 'true';
    if (self.countryCode === 'CA' && self.page !== 'payment') {
      addressFlag = 'false';
    }
    return '&fromPageName=DeliveryDetailsView&updatePrices=0&addressFlag=' + addressFlag + '&calculationUsageId=-3&calculationUsageId=-1&calculationUsageId=-2&calculationUsageId=-4';
  },
  getShippingAddressDetails: function (shippingContact) {
    var self = this;

    var address = '';
    if (!self.isEmpty(shippingContact)) {
      address += '&addressType=S';
      if (!self.isEmpty(shippingContact.locality)) {
        address += '&city=' + encodeURIComponent(shippingContact.locality);
      }
      if (!self.isEmpty(shippingContact.postalCode)) {
        address += '&zipCode=' + encodeURIComponent(shippingContact.postalCode);
      }
      var state = "";
      var country = shippingContact.countryCode;
      if (country === "FR" || country === "CH" || country === "GB") {
        state = country.toUpperCase();
      } else {
        state = encodeURIComponent(shippingContact.administrativeArea);
      }
      if (!self.isEmpty(state)) {
        address += '&state=' + state;
      }
      if (!self.isEmpty(shippingContact.countryCode)) {
        address += '&country=' + shippingContact.countryCode.toUpperCase();
      }
    }
    return address;
  },
  triggerApplePay: function () {
    var self = this;

    if (self.isApplePayEnabledForStore() && window.ApplePaySession) {
      if (self.page === 'payment' || ((self.page !== 'payment') && !self.isGiftCardCart())) {
        if (self.page === 'PDP' || self.page === 'PCP') {
          if ($("#productName") && $("#productName").length > 0) {
            var productName = $("#productName").val();
            productName = productName.toLowerCase();
            if (!("virtual gift card" === productName || "physical gift card" === productName)) {
              if (!(Rayban.utilities.readCookie('EyeMedLogin') === "true")) {
                var merchantIdentifier = $("#applePayMerchantIdentifier").val();
                var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
                promise.then(function (canMakePayments) {
                  if (canMakePayments) {
                    if (!$(".apple-pay-button").is(':visible') || !$('.one-configurator-modal').hasClass('visible')) {
                      self.showApplePayButtons();
                    }
                  }
                });
              }
            }
          }
        } else if (self.page === 'FL') {
          var merchantIdentifier = $("#applePayMerchantIdentifier").val();
          var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
          promise.then(function (canMakePayments) {
            if (canMakePayments) {
              self.showApplePayButtons();
            }
          });
        } else if (self.isAmountToPayPresent()) {
          var showApplePay = false;
          var merchantIdentifier = $("#applePayMerchantIdentifier").val();
          var promise = ApplePaySession.canMakePaymentsWithActiveCard(merchantIdentifier);
          promise.then(function (canMakePayments) {
            if (canMakePayments) {
              if (!$(".apple-pay-button ").is(':visible')) {
                showApplePay = true;
                if (!$(".apple-pay-button ").is(':visible')) {
                  self.showApplePayButtons();
                }
              }
            }
          });
        } else {
          self.hideApplePayButtons();
        }
      }
    }
    //self.showApplePayButtons();
  }
});
