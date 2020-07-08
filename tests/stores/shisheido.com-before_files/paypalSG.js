'use strict';

/* global pageContext paypalUtils $ */

(function () {
    var console = paypalUtils.console;

    function paypalSGHandleBillingAgreementFlow(config) {
        var startBillingAgreementCheckoutUrl = config.startBillingAgreementCheckoutUrl;
        if (config.isShippingAddressExist === true) {
            window.location.href = startBillingAgreementCheckoutUrl;
            return;
        }
        function initEditDefaultShippingAddressForm() {
            var $form = $('#paypalEditDefaultShippingAddress');
            window.Countries = $('.js_paypal_countries_field').data('countries');
            $form.on('click', '.apply-button', function () {
                if (!$form.valid()) {
                    return false;
                }
                var applyName = $form.find('.apply-button').attr('name');
                var options = {
                    url: $form.attr('action'),
                    data: $form.serialize() + '&' + applyName + '=x',
                    type: 'POST'
                };
                $.ajax(options).done(function (data) {
                    if (typeof (data) !== 'string') {
                        if (data.success) {
                            window.sgDialog.close();
                            window.location.href = startBillingAgreementCheckoutUrl;
                        } else {
                            window.alert(data.message); // eslint-disable-line no-alert
                            return false;
                        }
                    } else {
                        $('#dialog-container').html(data);
                        initEditDefaultShippingAddressForm();
                    }
                    return false;
                });
                return false;
            });
            $form.on('click', '.cancel-button, .close-button', function () {
                window.sgDialog.close();
                return false;
            });
            $('#paypalSelectSavedAddress').change(function () {
                var data = $(this).val();
                try {
                    data = JSON.parse(data);
                    for (var name in data) { // eslint-disable-line guard-for-in, no-restricted-syntax
                        var val = data[name];
                        if (typeof val === 'string') {
                            val = val.replace(/\^/g, "'");
                        }
                        $('#dwfrm_profile_address_' + name).val(val);
                    }
                } catch (e) {
                    $form.find('input:text').val('');
                    $form.find('select').val('');
                }
            });
            $('select[id$="_country"]', $form).on('change', function () {
                window.sgUtil.updateStateOptions($form);
            });
            return false;
        }
        window.sgDialog.open({
            url: config.editShppingAddressUrl,
            options: {
                title: config.editShppingAddressPopupTitle,
                open: initEditDefaultShippingAddressForm
            }
        });
    }

    $('.js_paypal_button').each(function () {
        var $btn = $(this);
        if ($btn.data('isInited')) {
            return;
        }
        var config = $btn.data('paypalConfig');
        if (typeof config !== 'object' || config === null) {
            console.error('paypalUtils: not valid data-paypal-config');
            return;
        }
        if (config.billingAgreementFlow) {
            var billingAgreementFlowConfig = {
                isShippingAddressExist: config.billingAgreementFlow.isShippingAddressExist,
                startBillingAgreementCheckoutUrl: config.billingAgreementFlow.startBillingAgreementCheckoutUrl,
                editShppingAddressUrl: config.billingAgreementFlow.editShppingAddressUrl,
                editShppingAddressPopupTitle: config.billingAgreementFlow.editShppingAddressPopupTitle
            };
            if (!config.style) {
                config.style = {
                    layout: 'horizontal',
                    label: 'paypal',
                    maxbuttons: 1,
                    fundingicons: false,
                    shape: 'rect',
                    size: 'medium',
                    tagline: false
                };
            }
            config.style.maxbuttons = 1;
            config.payment = function () {};
            config.onAuthorize = function () {};
            config.validate = function (actions) {
                return actions.disable();
            };
            config.onClick = function () {
                paypalSGHandleBillingAgreementFlow(billingAgreementFlowConfig);
            };
            delete config.billingAgreementFlow;
        }
        paypalUtils.initButton(config, $btn[0]);
        $btn.data('isInited', true);
    });

    if (pageContext.ns === 'checkout') {
        var $form = $('form[id$="billing"]');
        var $continueButton = $('button[name$="billing_save"]:last');
        var $continueButtonWrap = $continueButton.parent();
        var $selectPaymentMethods = $('[name$="billing_paymentMethods_selectedPaymentMethodID"]');

        $('.js_paypal_button_on_billing_form').each(function () {
            var $paypalButton = $(this);
            if ($paypalButton.data('isInited')) {
                return;
            }

            var config = $paypalButton.data('paypalConfig');
            if (typeof config !== 'object') {
                console.error('paypalUtils: not valid data-paypal-config');
                return;
            }

            var $paypalContent = $paypalButton.parents('.js_paypal-content:first');
            var $useAnotherAccountCheckbox = $paypalContent.find('[name$="billing_paypal_useAnotherAccount"]');
            var $useAnotherAccountCheckboxWrap = $paypalContent.find('.js_paypa-use-another-account-wrap');
            var $saveBillingAgreementCheckbox = $('input[name$="billing_paypal_saveBillingAgreement"]');
            var $saveBillingAgreementWrap = $('.js_paypa-save-ba-wrap');
            var $useCustomerBillingAgreementCheckbox = $paypalContent.find('[name$="billing_paypal_useCustomerBillingAgreement"]');
            var $errorContainer = $paypalContent.find('.js_paypal_error');

            if ($useAnotherAccountCheckbox.length) {
                $useAnotherAccountCheckbox[0].checked = false;
                $useAnotherAccountCheckbox.change(function () {
                    //$paypalButton.parent().toggle(this.checked);
                    //$continueButtonWrap.toggle(!this.checked);
                    $paypalContent.data('paypalIsHideContinueButton', this.checked);
                    $saveBillingAgreementWrap.toggle(this.checked);
                    if ($useCustomerBillingAgreementCheckbox.length && this.checked) {
                        $useCustomerBillingAgreementCheckbox[0].checked = !this.checked;
                    }
                });
            }

            if ($useCustomerBillingAgreementCheckbox.length) {
                $useCustomerBillingAgreementCheckbox.change(function () {
                    $useAnotherAccountCheckboxWrap.toggle(!this.checked);
                    $paypalButton.parent().toggle(!this.checked);
                    $continueButtonWrap.toggle(this.checked);
                    $paypalContent.data('paypalIsHideContinueButton', !this.checked);
                    if ($saveBillingAgreementCheckbox.length) {
                        $saveBillingAgreementCheckbox[0].checked = false;
                        $saveBillingAgreementWrap.toggle(!this.checked);
                    }
                    if (this.checked === false) {
                        $useAnotherAccountCheckbox.change();
                    }
                });
                $useCustomerBillingAgreementCheckbox[0].checked = $paypalContent.find('.js_useCustomerFillingAgreementState').val();
            }

            if ($saveBillingAgreementCheckbox.length) {
                $saveBillingAgreementCheckbox[0].checked = false;
            }

            var formValidationConrol = function (validateActions, isInitFormChangeEvent) {
                if ($continueButton.is(':disabled')) {
                    validateActions.disable();
                } else {
                    validateActions.enable();
                }
                if (isInitFormChangeEvent) {
                    $form.on('change keyup focusout', ':input, textarea', function () {
                        formValidationConrol(validateActions);
                    });
                }
            };

            config.validate = function (validateActions) {
                formValidationConrol(validateActions, true);
            };
            config.onClick = function () {
                $errorContainer.hide();
                
                /*disabling credit card fields validation on paypal click based on lauramercier design */
                $('[data-method="CREDIT_CARD"]').find('.required').addClass('not-required').removeClass('required').attr('aria-required', false);
                $('[data-method="CREDIT_CARD"]').find('.number').addClass('not-number').removeClass('number').attr('aria-required', false);
                $('[data-method="CREDIT_CARD"]').find('.cvn').addClass('not-cvn').removeClass('cvn').attr('aria-required', false);
                $('[data-method="CREDIT_CARD"]').find('.field-error').text('');
                $('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"][value="PayPal"]').prop('checked', true);
                /* end of credit card fields validation disable*/
                
                if (!$form.valid()) {
                    $('html, body').animate({
                        scrollTop: $('input.error:first, textarea.error:first, .billing-address-section span.error:first').offset().top - 50
                    }, 200);
                }
            };


            /*This is to handle paypal cancel scenario.*/
            config.onCancel = function () {
                $('[data-method="CREDIT_CARD"]').find('.not-required').addClass('required').removeClass('not-required').attr('aria-required', true);
                $('[data-method="CREDIT_CARD"]').find('.not-number').addClass('number').removeClass('not-number').attr('aria-required', true);
                $('[data-method="CREDIT_CARD"]').find('.not-cvn').addClass('cvn').removeClass('not-cvn').attr('aria-required', true);
                $('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"][value="PayPal"]').prop('checked', false);
                $('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"][value="CREDIT_CARD"]').prop('checked', true)
             }

            var createPaymentUrl = config.createPaymentUrl;
            var summaryPageUrl = config.summaryPageUrl;
            delete config.summaryPageUrl;
            $form.submit(function () {
                $errorContainer.hide();
                if ($useCustomerBillingAgreementCheckbox[0] && $useCustomerBillingAgreementCheckbox[0].checked) {
                    var data = $form.serialize();
                    $.post(createPaymentUrl, data, function (data) { // eslint-disable-line no-shadow
                        if (data.error && data.paypalBillingAgreementNotActaual) {
                            window.location.reload();
                        } else {
                            window.location = summaryPageUrl;
                        }
                    });
                    return false;
                }
                return true;
            });

            config.payment = function (resolve, reject) {
                $errorContainer.hide();
                
                /*If the billing form is not valid then do not continue. Ask user to enter billing address first.*/
                if(!$form.valid()) {
                	/*Select Credit card by default when user returns back to billing form*/
                	$('[data-method="CREDIT_CARD"]').find('.not-required').addClass('required').removeClass('not-required').attr('aria-required', true);
                    $('[data-method="CREDIT_CARD"]').find('.not-number').addClass('number').removeClass('not-number').attr('aria-required', true);
                    $('[data-method="CREDIT_CARD"]').find('.not-cvn').addClass('cvn').removeClass('not-cvn').attr('aria-required', true);
                    $('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"][value="PayPal"]').prop('checked', false);
                    $('input[name="dwfrm_billing_paymentMethods_selectedPaymentMethodID"][value="CREDIT_CARD"]').prop('checked', true);
                	return false;
                }
                
                console.log('paypalUtils: payment', 'payment url:', createPaymentUrl);
                var data = $form.serialize();
                $.post(createPaymentUrl, data, function (data) { // eslint-disable-line no-shadow
                    console.log('paypalUtils: Getting token data response', data);
                    if (data.error) {
                        $errorContainer.text(data.error).show();
                        console.error('paypalUtils: ' + createPaymentUrl + ' returned data with error');
                        reject(data.error);
                    } else {
                        if (!data.token) {
                            $form.submit();
                            console.error('paypalUtils: data does not have token property');
                            reject('system_error or billing form is not valid');
                            return;
                        }
                        resolve(data.token);
                    }
                });
            };

            paypalUtils.initButton(config, $paypalButton[0]);
            $paypalButton.data('isInited', true);
        });

        function resolvButtonsVisibility(paymentMethodName) { // eslint-disable-line no-inner-declarations
            var $currentTabContent = $('.js_paypal-content[data-paypal-method="' + paymentMethodName + '"]');
            if ($currentTabContent.find('.js_paypal_button_on_billing_form').length) {
                $continueButtonWrap.toggle(!$currentTabContent.data('paypalIsHideContinueButton'));
            } else {
                $continueButtonWrap.show();
            }
        }
        $selectPaymentMethods.change(function (e) {
            resolvButtonsVisibility($(e.target).val());
        });
        resolvButtonsVisibility($('[name$="billing_paymentMethods_selectedPaymentMethodID"]:checked').val());
    }

    if ($('.js_paypal_fraudnet_data').length) {
        paypalUtils.initFraudnet();
    }
}());
