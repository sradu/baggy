'use strict';
var gtCurPage = window.User.clickStream;
    
switch (gtCurPage) {
    case 'coshipping-singleshipping':
        // populate data layer for successful billing
        if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
            "event" : "eeCheckoutOption",
            "checkoutStep" : "3",
            "checkoutOption" : basketConfirmation.defaultShipping
            })
        }
        break;
    case 'cobilling-billing': case 'cobilling-start': case 'cosummary-start':
        // populate data layer for successful billing
        if (typeof basketConfirmation != 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
            "event" : "eeCheckoutOption",
                "checkoutStep" : "4",
                "checkoutOption" : basketConfirmation.paymentMethod 
            })
        }
        break;
    case 'cosummary-submit':
    case 'coplaceorder-submit':
    case 'afterpayredirect-placeorder':
    case 'cosummary-showconfirmation':
        /*Following condition is intentionally for Apple Pay as eeCheckoutOption SRS-2327*/
        if (gtCurPage == 'cosummary-showconfirmation' && orderConfirmation.paymentMethod === "ApplePay") {
           pushDtLayer({
               event: 'eeCheckoutOption',
               checkoutStep: '4',
               checkoutOption: orderConfirmation.paymentMethod,
               emailHashTwo: emailID_SHA1,
           });
        }
        if (gtCurPage == 'afterpayredirect-placeorder') {
            pushDtLayer({
                event: 'eeCheckoutOption',
                checkoutStep: '4',
                checkoutName: 'Checkout - Step Payment',
                checkoutOption: 'After Pay',
                checkoutErrorMessage: '',
                emailHashTwo: emailID_SHA1,
            });
        }
        break; 
    default: break;
}