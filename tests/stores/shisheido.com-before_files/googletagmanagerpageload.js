'use strict';

var gtCurPage = window.User.clickStream;
var userid = '';
var emailID = window.emailID;
var emailID_SHA1 = window.emailID_SHA1;

var prodholder = new Array();
var customerNo = window.User.customerNo;
if (window.User.isCustomerAuthenticated === true) {
    userid = window.User.id;
}else if(typeof orderCustomerNo !== 'undefined' && orderCustomerNo){
	customerNo = orderCustomerNo;
}
if (gtCurPage == 'newsletter-optin' && typeof orderConfirmation !== 'undefined') {
    gtCurPage = 'cosummary-submit';
}

function filterArrDt(arr) {
    var finishedArr = new Array();

    arr.forEach(function(o) {
        if (typeof o === 'object') {
            var finishedObj = new Object();

            Object.keys(o).forEach(function(k) {
                if (!o[k]) {
                    return;
                }
                finishedObj[k] = o[k];
            });

            if (Object.keys(finishedObj).length > 0) {
                finishedArr.push(finishedObj);
            }
        } else if (o) {
            finishedArr.push(o);
        }
    });

    return finishedArr;
}

function filterDt(o) {
    var finishedObj = {};

    Object.keys(o).forEach(function(k) {
        if (!o[k]) {
        } else if (o[k] instanceof Array) {
            finishedObj[k] = filterArrDt(o[k]);
        } else {
            finishedObj[k] = o[k];
        }
    }, this);

    return finishedObj;
}
function pushDtLayer(o) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(filterDt(o));
    // alert(JSON.stringify(util.filterObj(o)));
}
function DtgetPageCategory() {
    // return window.pageContext.title || "Content"; ###### this throws product name
    switch (gtCurPage) {
        case 'product-showincategory':
            return 'Product Page';
            break;
        case 'product-show':
            return 'Product Page';
            break;
        case 'search-show':
            if (!searchItems.rs55) {
                return 'General Error';
            }
            if (typeof searchItems.search !== undefined) {
                if (searchItems.search) {
                    return 'Site Search';
                }
                return 'Product List Page';
            }
            return 'Product List Page';

            break;
        case 'search-showcontent':
            return 'Product List Page';
            break;
        case 'home-show':
        case 'default-start':
            return 'Home Page';
            break;
        case 'cart-show':
            return 'Cart Page';
            break;
        case 'cart-addtowishlist':
            return 'Cart Page';
            break;
        case 'customerservice-contactus':
            return 'Contact Customer Service';
            break;
        case 'customerservice-concierge':
            return 'Ask An Expert';
            break;
        case 'account-startregister':
            return 'My Account';
            break;
        case 'account-editprofile':
            return 'My Account';
            break;
        case 'address-list':
            return 'My Account';
            break;
        case 'paymentinstruments-list':
            return 'My Account';
            break;
        case 'wishlist-show':
            return 'My Account';
            break;
        case 'order-history':
            return 'My Account';
            break;
        case 'orderreplenishment-show':
            return 'My Account';
            break;
        case 'login-show':
            return 'Login Page';
            break;
        case 'coshipping-start':
            return 'Checkout Page';
            break;
        case 'coshipping-singleshipping':
            return 'Checkout Page';
            break;
        case 'cobilling-start':
            return 'Checkout Page';
            break;
        case 'cobilling-billing':
            return 'Checkout Page';
            break;
        case 'cosummary-start':
            return 'Checkout Page';
            break;
        case 'giftcert-purchase':
            return 'Gift Card Page';
            break;
        case 'cocustomer-loginform':
            return 'Customer Login';
            break;
        case 'login-checkorder':
            return 'Check Your Order';
            break;
        case 'search-brandify':
            return 'Store Locator';
            break;
        case 'cosummary-submit':
            if (typeof basketConfirmation !== 'undefined' && basketConfirmation != null) {
                if (basketConfirmation.checkoutErrorMessage) {
                    return 'Checkout Page';
                }
            } else {
                return 'Order Confirmation';
            }
            break;
        case 'afterpayredirect-placeorder':
            if(typeof basketConfirmation != "undefined" && basketConfirmation != null){
                if(basketConfirmation.checkoutErrorMessage){
                    return "Checkout Page";
                }
            }else{
                return "Order Confirmation";
            }
            break;
        case 'page-show':
            var pageurl = window.location.href;
            if (pageurl.indexOf('customer-service.html') > 0) {
                return 'Customer Service';
            }
            if (pageurl.indexOf('concierge-form.html') > 0) {
                return 'Ask An Expert';
            }
            if (pageurl.indexOf('replenishment.html') > 0) {
                return 'Replenishment';
            }
            if (pageurl.indexOf('privacy.html') > 0) {
                return 'Privacy Policy';
            }
            if (pageurl.indexOf('terms.html') > 0) {
                return 'Terms and Condition';
            }
            if (pageurl.indexOf('returns-and-exchanges.html') > 0) {
                return 'Returns and Exchange';
            }
            if (pageurl.indexOf('staticcountryselect.html') > 0) {
                return 'Select Country';
            }
            var pagecontext = '${pageContext.title}';
            if (pagecontext == 'Consultations') {
                return 'Consultation Tool';
            }
            return 'Content';

            break;
        case 'customerservice-submit':
            return 'Ask An Expert';
            break;
        case 'home-errornotfound':
            return 'Error Page';
            break;
        case 'login-loginform':
            return 'Login Page';
            break;
        case 'gatedlandingpage-show':
            return "Gated Landing Page";
            break;
        default:
            return 'Content';
            break;
    }
}
// Specific for checkout and cart page only
function CouponSubCategory() {
    switch (gtCurPage) {
        case 'cart-show':
            return 'Cart';
            break;
        case 'coshipping-start':
            if (basketConfirmation.noProductLineItems == true) {
                return 'Payment';
            }
            return 'Shipping';
            break;
        case 'coshipping-singleshipping':
            return 'Payment';
            break;
        case 'cobilling-start':
            return 'Payment';
            break;
        case 'cobilling-removegiftcertificate':
            return 'Payment';
            break;
        case 'cobilling-billing':
            if (basketConfirmation != null) {
                if (basketConfirmation.checkoutErrorMessage) {
                    return 'Payment';
                }
                return 'Review';
            }
            return 'Review';

            break;
        case 'cosummary-submit':
            if (typeof basketConfirmation !== 'undefined' && basketConfirmation != null) {
                if (basketConfirmation.checkoutErrorMessage) {
                    return 'Review';
                }
            } else {
                return '';
            }

            break;
        case 'account-editprofile':
            return 'Profile';
            break;
        case 'address-list':
            return 'Addresses';
            break;
        case 'paymentinstruments-list':
            return 'Payment Methods';
            break;
        case 'wishlist-show':
            return 'Saved For Later';
            break;
        case 'order-history':
            return 'Order History';
            break;
        case 'orderreplenishment-show':
            return 'Replenishment';
            break;
        case 'account-startregister':
            return 'Create Account';
            break;
        case 'tutorial-show':
            return 'Tutorial Page';
            break;
        default:
            break;
    }
}

function DtgetPageSubcategory() {
    return window.pageContext.title || 'Content';
}
function Dtgethashmap(paramName) {
    var output = '';

    var hashParams = window.location.hash.split('&');
    for (var i = 0; i < hashParams.length; i++) {
        if (hashParams[i].indexOf(paramName) > -1) {
            output = hashParams[i].split('=')[1];
        }
    }

    return output;
}
function DtgetLanguage() {
    if (window.location.href.indexOf('zh.shiseido') >= 0) {
        return 'Chinese';
    }
    if (window.location.href.indexOf('es.shiseido') >= 0) {
        return 'Spanish';
    }
    return 'English';
}
function DtisMobile() {
    return $(window).width() <= 640;
}
function DtgetPageError() {
    var $errorMsg = $('.error-form');
    if ($errorMsg.length === 0) {
        return '';
    }

    return $errorMsg.html().trim();
}
function Dtgetsrule() {
    var str = '';
    var params = '';
    if (window.location.href.split('?').length > 1) {
        var urlparam = window.location.href.split('?')[1];
        if (urlparam.indexOf('&') > -1) {
            params = urlparam.split('&');
        } else {
            params = urlparam;
        }
        var length = params.length;
        var b = length / 2;

        for (var i = 0; i < b; i++) {
            if (params[i].indexOf('srule') > -1) {
                str = params[i].split('=')[1];
            }
        }
    }
    return str;
}
// Specific for PDP
function DtgetProductCategory() {
    return jQuery('.breadcrumb')
        .find('.breadcrumb-element:eq(1)')
        .text()
        .trim();
}
// Specific for PDP
function DtgetProductsubCategory() {
    return $('.breadcrumb')
        .find('.breadcrumb-element:eq(2)')
        .text()
        .trim();
}
// Specific for PDP
function DtgetProductsubsubCategory() {
    return $('.breadcrumb')
        .find('.breadcrumb-element:eq(3)')
        .text()
        .trim();
}

function Dtgetdropdown() {
    var str = '';
    if (window.location.href.split('?').length > 1) {
        var urlparam;
        if (window.location.href.split('?')[1].indexOf('&') > -1) {
            urlparam = window.location.href.split('?')[1].split('&');
            var length = urlparam.length;
            var prefnval, prefnkey, prefvval, prefvkey;
            for (var i = 0; i < length; i++) {
                var prefn = urlparam[i].indexOf('prefn');
                if (prefn > -1) {
                    prefnkey = urlparam[i].split('=')[0];
                    prefnval = urlparam[i].split('=')[1];
                    console.log(prefnkey);
                    var num = prefnkey.charAt(5);
                    for (var a = 0; a < length; a++) {
                        var prefv = urlparam[a].indexOf('prefv');
                        prefvkey = urlparam[a].split('=')[0];
                        if (prefvkey == 'prefv' + num) {
                            prefvval = urlparam[a].split('=')[1];
                            str += '[' + prefnval + ':' + prefvval + ']';
                        }
                    }
                }
            }
        }
    }
    return str;
}

function listType() {
    return DtgetProductCategory() == 'Search Results' ? 'search result list' : 'product category list';
}
function listName() {
    return DtgetProductCategory() == 'Search Results' ? 'Search' : DtgetProductCategory();
}
// Specific for PDP
function DtgetProductBrand() {
    return 'Shiseido'; // $(".product-detail .product-brand").text();
}
function getCookie(name) {
    var re = new RegExp(name + '=([^;]+)');
    var value = re.exec(document.cookie);
    return value != null ? unescape(value[1]) : null;
}
function DtgetCountry() {
    var country = document.getElementById('websiteCountryCode').value;
    return country != '' ? country : 'US';
}
function Dtgeterror() {
    switch (DtgetPageCategory()) {
        case 'Checkout Page':
        case 'Cart Page':
            if (basketConfirmation != null) {
                return basketConfirmation.checkoutErrorMessage;
            }
            break;
        case 'General Error':
            return searchItems.error;
            break;
        case 'Error Page':
            return 'Page Not Found';
            break;
        default:
            break;
    }
}
function receiveMessage(event) {
    if (typeof event.data === 'object' && event.origin === 'https://hosted.where2getit.com') {
        pushDtLayer(event.data);
    }
}
function Dtgetpage() {
    var url = window.location.href;
    var splittedurl = url.split('?');
    var page = splittedurl[0].split('/');
    return page[page.length - 1];
}
/** Trigger the following datalayers before gtm.js container  * */

// document ready
window.addEventListener('load', function() {
    // fire when coupon is added after page load.
    if (DtgetPageCategory() == 'Checkout Page') {
        var error = basketConfirmation.checkoutErrorMessage
            ? basketConfirmation.checkoutErrorMessage
            : $('.error-form')
                  .text()
                  .trim();
        var errormsgtype = '';
        if (error.indexOf('Payment') > -1) {
            errormsgtype = 'Payment';
        } else if (error.indexOf('email') > -1) {
            errormsgtype = 'Email';
        } else if (error.indexOf('Server') > -1) {
            errormsgtype = 'Server';
        }
        if (error) {
            pushDtLayer({
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage
                    ? basketConfirmation.checkoutErrorMessage
                    : $('.error-form')
                          .text()
                          .trim(),
                event: 'transactionError',
                pageSubCategory: CouponSubCategory(),
                pageCategory: 'Checkout Page',
                emailhash : emailID,
        		emailHashTwo : emailID_SHA1,
                checkoutErrorType: errormsgtype,
            });
        }

        if ($('.gtpromochecker').length > 0) {
            if (!localStorage.getItem('couponvalidation')) {
                pushDtLayer({
                    productCoupon: $('.gtpromochecker').data('name'),
                    event: 'couponSubmission',
                    pageSubCategory: CouponSubCategory(),
                    pageCategory: DtgetPageCategory(),
                    emailhash : emailID,
        			emailHashTwo : emailID_SHA1,

                });
                localStorage.couponvalidation = true;
            }
        } else {
            localStorage.removeItem('couponvalidation');
        }
    }

    switch (gtCurPage) {
        case 'cart-show':
        case 'cart-addtowishlist':
            // fire when coupon is added after page load.
            if (
                $('.gtpromochecker').length > 0 &&
                $('.rowcoupons').length > 0 &&
                $('.rowcoupons .show-for-large .bonus-item')
                    .text()
                    .trim() == 'Applied'
            ) {
                if (!localStorage.getItem('couponvalidation')) {
                    pushDtLayer({
                        productCoupon: $('.gtpromochecker').data('name'),
                        event: 'couponSubmission',
                        pageSubCategory: CouponSubCategory(),
                        pageCategory: DtgetPageCategory(),
                        emailhash : emailID,
        				emailHashTwo : emailID_SHA1,

                    });
                    localStorage.couponvalidation = true;
                }
            } else if ($('.gtpromochecker').length > 0 && $('.rowcoupons').length == 0) {
                localStorage.couponvalidation = true;
            } else {
                localStorage.removeItem('couponvalidation');
            }
            break;
        case 'account-editprofile':
            // user loggedin
            if (window.User.isRegistered && !localStorage.getItem('uservalidation')) {
                pushDtLayer({
                    event: 'accountLogin',
                    userId: customerNo != null ? customerNo : null,
                    accountType: window.User.isExternallyAuthenticated,
                    pageSubCategory: 'Profile',
                    pageCategory: 'Account',
                    emailhash : emailID,
        			emailHashTwo : emailID_SHA1,

                });
                localStorage.uservalidation = true;
            }

            // Account Registration
            if (window.Resources.ACCOUNT_REGISTRATION) {
                pushDtLayer({
                    event: 'accountCreation',
                    userId: customerNo != null ? customerNo : null,
                    accountType: window.User.isExternallyAuthenticated,
                    pageSubCategory: 'Profile',
                    pageCategory: 'Account',
                    emailhash : emailID,
        			emailHashTwo : emailID_SHA1,

                });
            }
            break;
        default:
            break;
    }
});

switch (gtCurPage) {
    case 'cart-show':
    case 'cart-addtowishlist':
        // car show data layer
        if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
                giftWrapping: basketConfirmation.giftWrapping,
                pageSubCategory: 'Cart',
                funnelType: basketConfirmation.funnelType,
                eeAction: 'eeCheckout',
                checkoutStep: '1',
                pageCategory: 'Checkout',                
                products: basketConfirmation.productLineItems,
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
            });
        }

        break;
    case 'cocustomer-start':
        // populate data layer for checkout login page
        if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
                giftWrapping: basketConfirmation.giftWrapping,
                pageSubCategory: 'Checkout Login',
                funnelType: basketConfirmation.funnelType,
                eeAction: 'eeCheckout',
                checkoutStep: '2',
                pageCategory: 'Checkout',               
                products: basketConfirmation.productLineItems,
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
            });
        }

        break;
    case 'coshipping-start':
        // populate data layer for shipping
        var checkoutStepVal = '3';
        var pageSubCategoryVal = 'Shipping';
        if (basketConfirmation.noProductLineItems == true) {
            checkoutStepVal = '4';
            pageSubCategoryVal = 'Billing';
        }
        if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
                giftWrapping: basketConfirmation.giftWrapping,
                pageSubCategory: pageSubCategoryVal,
                funnelType: basketConfirmation.funnelType,
                eeAction: 'eeCheckout',
                checkoutStep: checkoutStepVal,
                pageCategory: 'Checkout',
                emailhash : emailID,
        		emailHashTwo : emailID_SHA1,
                products: basketConfirmation.productLineItems,
            });
        }
        break;
    case 'coshipping-singleshipping':
        // populate data layer for successful billing
        if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
                giftWrapping: basketConfirmation.giftWrapping,
                pageSubCategory: 'Billing',
                funnelType: basketConfirmation.funnelType,
                eeAction: 'eeCheckout',
                checkoutStep: '4',
                pageCategory: 'Checkout',                
                products: basketConfirmation.productLineItems,
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
            });
        }
        break;
    case 'cobilling-billing':
    case 'cobilling-start':
    case 'cosummary-start':
        // populate data layer for successful billing
        if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
            pushDtLayer({
                checkoutErrorMessage: basketConfirmation.checkoutErrorMessage,
                giftWrapping: basketConfirmation.giftWrapping,
                pageSubCategory: 'Review',
                funnelType: basketConfirmation.funnelType,
                eeAction: 'eeCheckout',
                checkoutStep: '5',
                pageCategory: 'Checkout',                
                products: basketConfirmation.productLineItems,
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
            });
        }
        break;
    case 'cosummary-submit':
    case 'coplaceorder-submit': case 'afterpayredirect-placeorder': case 'cosummary-showconfirmation':
        // populate data layer for sucessful transaction
        if (typeof orderConfirmation !== 'undefined') {
            // the push must be placed before the gtm.js container call
            pushDtLayer({
                transactionId: orderConfirmation.transactionId,
                transactionShipping: orderConfirmation.transactionShipping,
                transactionTotal: orderConfirmation.adjMerchandizeTotalNet,
                transactionCoupon: orderConfirmation.transactionCoupon,
                transactionTax: orderConfirmation.tax,
                currencyCode: orderConfirmation.currencyCode,
                transactionTotalWithoutCoupon: orderConfirmation.merchandizeTotalNet,
                giftWrapping: orderConfirmation.giftWrapping,
                pageSubCategory: 'Confirmation',
                funnelType: orderConfirmation.funnelType,
                paymentType: (orderConfirmation.paymentMethod === 'AFTERPAY_PBI') ? 'After Pay' : orderConfirmation.paymentMethod,
                pageCategory: 'Checkout',
                emailhash : emailID,
        		emailHashTwo : emailID_SHA1,
                products: orderConfirmation.productLineItems,
                orderDiscount : orderConfirmation.orderDiscount,                

            });
        }
        break;
    case 'search-show':
    case 'search-getsuggestions':
        if (typeof searchItems !== 'undefined' && searchItems.search) {
            pushDtLayer({
                cat55: 'Site Search',
                pageCategory: 'Site Search',                
                kw55: searchItems.kw55,
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
            });

            pushDtLayer({
                res55: searchItems.rs55,
                pageCategory: 'Site Search',
                emailhash : emailID,
        		emailHashTwo : emailID_SHA1,
                kw55: searchItems.kw55,
            });
        }

        // plp/search pageview
        /*
        if (typeof productData !== 'undefined') {
            pushDtLayer({
                event: 'eeListView',
                eeAction: 'eeListView',
                pageCategory: searchItems.search ? 'Site Search' : 'Product List Page',                
                dropDown: '',
                filterChoice: '',
                currencyCode: window.User.currencyCode,
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
                products: productData.product || new Array(),
            });
            prodholder.push(productData.product);
        }*/
        break;
    case 'product-showincategory':
    case 'product-show':
        // product detail page load page
        if (DtgetPageCategory() == 'Product Page') {
            var products = new Array();
            var price = '';
            var product = null;
            var fullCategory = null;
            if (typeof productCache !== 'undefined') {
                if (productCache.length > 1) {
                    for (var i = 0, len = productCache.length; i < len; i++) {
                        if (productCache[i] != null && productCache[i].pricing != null) {
                            if (productCache[i].pricing.sale) {
                                price = productCache[i].pricing.sale;
                            } else if (productCache[i].pricing.minprice != null) {
                                price = productCache[i].pricing.minprice;
                            }
                        }
                        product = {
                            name: productCache[i].name,
                            id: productCache[i].variant ? productCache[i].masterID : productCache[i].ID,
                            productVariantID: productCache[i].master
                                ? productCache[i].defalutvariant
                                : productCache[i].ID,
                            price: price,
                            brand: productCache[i].brand,
                            quantity: productCache[i].quantity,
                            category: productCache[i].catid,
                            variant: productCache[i].size,
                            size: productCache[i].size,
                            productOutOfStock: productCache[i].productOutOfStock,
                            subCategory: productCache[i].subcategory,
                            subSubCategory: productCache[i].subsubcategory,
                            productAutoReplen: productCache[i].productautoreplenish,
                            productNumReviews: productCache[i].productNumReviews,
                            productStarRating: productCache[i].productStarRating,
                            productColor: productCache[i].productColor,
                            productType: 'Product',
                            collectionName: productCache[i].customBrand,
                        };
                        products.push(product);
                    }
                } else {
                    product = {
                        listType: sessionStorage.getItem('listType'),
                        listName: sessionStorage.getItem('listName'),
                        id: productCache.variant ? productCache.masterID : productCache.ID,
                        productVariantID: productCache.master ? productCache.defalutvariant : productCache.ID,
                        category: productCache.catid,
                        price: productCache.pricing ? productCache.pricing.minprice : '',
                        name: productCache.name,
                        brand: productCache.brand,
                        quantity: productCache.quantity,
                        size: productCache.size,
                        subCategory: productCache.subcategory,
                        subSubCategory: productCache.subsubcategory,
                        productAutoReplen: productCache.productautoreplenish,
                        productOutOfStock: productCache.productOutOfStock,
                        productColor: productCache.productColor,
                        productType: 'Product',
                        collectionName: productCache.customBrand,
                        productNumReviews: productCache.productNumReviews,
                        productStarRating: productCache.productStarRating,
                    };
                    products.push(product);
                }
            }

            pushDtLayer({
                eeAction: 'eeProductDetail',
                pageCategory: 'Product Page',
                products: products,
                emailhash : emailID,
        		emailHashTwo : emailID_SHA1,
            });
            if (productCache.giaran_enabled) {
                pushDtLayer({
                    event: 'LiveCamTryOnInteraction',
                    tryOnInteraction: 'Feature Loaded',
                });
            }
        }
        sessionStorage.setItem('listType', '');
        sessionStorage.setItem('listName', '');

        $BV.configure('global', {
            events: {
                submissionSubmitted: function(data) {
                    // NEW Request fix for submit question in PDP
                    if ($(".bv-submission-button-submit:contains('Post Question')").length > 0) {
                        pushDtLayer({
                            page: Dtgetpage(),
                            event: 'submitQuestion',
                            productCategory: DtgetProductCategory(),
                            question: $('#bv-textarea-field-questionsummary').val(),
                            productName: productCache.name,
                            pageSubCategory: 'Ask a Question',
                            pageCategory: 'Product Page',
                            emailhash : emailID,
        					emailHashTwo : emailID_SHA1,


                        });
                    }
                    // NEW Request fix for submit review in PDP
                    if ($(".bv-submission-button-submit:contains('Post Review')").length > 0) {
                        pushDtLayer({
                            event: 'submitReview',
                            productCategory: DtgetProductCategory(),
                            productSubCategory: DtgetProductsubCategory(),
                            pageSubCategory: 'Reviews',
                            productName: productCache.name,
                            pageCategory: 'Product Page',                           
                            productId: data.Id,
                            emailhash : emailID,
                            emailHashTwo : emailID_SHA1,
                        });
                    }
                },
            },
        });
        break;
    case 'search-brandify':
        pushDtLayer({
            cat55: 'Store Locator',
            pageCategory: 'Store Locator',
            emailhash : emailID,
        	emailHashTwo : emailID_SHA1,
            kw55: kw55,
        });
        window.addEventListener('message', receiveMessage);
        break;
    case 'giftcert-purchase':
        if (DtgetPageCategory() == 'Gift Card Page') {
            if (typeof productCache !== 'undefined') {
                if (productCache.productType == 'Gift Card') {
                    pushDtLayer({
                        eeAction: 'eeProductDetail',
                        event: 'eeProductDetail',
                        pageCategory: 'Gift Card Page',
                        emailhash : emailID,
        				emailHashTwo : emailID_SHA1,
                        products: [
                            {
                                id: 'Gift Card',
                                productVariantID: 'Gift Card - ' + productCache.giftCardName,
                                category: 'Gift Card',
                                price: productCache.giftCardPrice,
                                name: 'Gift Card',
                                brand: productCache.brand,
                                quantity: 1,
                                subCategory: 'Gift Card',
                                productType: productCache.productType,
                            },
                        ],
                    });
                }
            }
        }
        break;
    default:
        break;
}

// Navigation click
if (typeof searchItems !== 'undefined') {
    if (searchItems.error === 'Page Not Found') {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: 'Error Page',
            pageSubCategory: '',
            navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',           
            navigationLinkNameClicked: sessionStorage.getItem('navlink'),
            navigationLocationClicked: sessionStorage.getItem('menuloc'),
            pageError: searchItems.error,
            emailhash : emailID,
            emailHashTwo : emailID_SHA1,
            dropDown: '',
            filterChoice: '',
            productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
        });
    } else if (DtgetPageCategory() == 'Product List Page') {
        if (
            searchItems.lastclk == 'account-editprofile' ||
            searchItems.lastclk == 'address-list' ||
            searchItems.lastclk == 'paymentinstruments-list' ||
            searchItems.lastclk == 'wishlist-show' ||
            searchItems.lastclk == 'order-history' ||
            searchItems.lastclk == 'orderreplenishment-show' ||
            searchItems.lastclk == 'customerservice-contactus'
        ) {
            pushDtLayer({
                userId: customerNo != null ? customerNo : null,
                language: DtgetLanguage(),
                websiteCountry: DtgetCountry(),
                pageCategory: DtgetPageCategory(),
                pageSubCategory: CouponSubCategory(),
                navigationLinkClicked: getCookie('navdata') ? '1' : '0',              
                navigationLinkNameClicked: sessionStorage.getItem('navlink')
                    ? sessionStorage.getItem('navlink')
                    : getCookie('navdata'),
                navigationLocationClicked: 'topmenu',
                pageError: Dtgeterror(),
                dropDown: '',
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
                filterChoice: '',
                productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
            });
        } else {
            pushDtLayer({
                userId: customerNo != null ? customerNo : null,
                language: DtgetLanguage(),
                websiteCountry: DtgetCountry(),
                pageCategory: DtgetPageCategory(),
                pageSubCategory: CouponSubCategory(),               
                navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',
                emailhash : emailID,
        		emailHashTwo : emailID_SHA1,
                navigationLinkNameClicked: sessionStorage.getItem('navlink'),
                navigationLocationClicked: sessionStorage.getItem('menuloc'),
                pageError: Dtgeterror(),
                dropDown: '',
                filterChoice: '',
                productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
            });
        }
    } else if (gtCurPage == 'customerservice-contactus') {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: DtgetPageCategory(),
            pageSubCategory: CouponSubCategory(),
            navigationLinkClicked: '0',
            emailhash : emailID,
        	emailHashTwo : emailID_SHA1,
            navigationLinkNameClicked: '',
            navigationLocationClicked: '',
            pageError: Dtgeterror(),
            dropDown: '',
            filterChoice: '',
            productUpdate: '0',
        });
    } else if (gtCurPage == 'account-editprofile') {
        if (sessionStorage.getItem('navlink') != 'Profile') {
            pushDtLayer({
                userId: customerNo != null ? customerNo : null,
                language: DtgetLanguage(),
                websiteCountry: DtgetCountry(),
                pageCategory: DtgetPageCategory(),
                pageSubCategory: CouponSubCategory(),
                navigationLinkClicked: '0',               
                navigationLinkNameClicked: '',
                navigationLocationClicked: '',
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
                pageError: Dtgeterror(),
                dropDown: '',
                filterChoice: '',
                productUpdate: '0',
            });
        } else {
            pushDtLayer({
                userId: customerNo != null ? customerNo : null,
                language: DtgetLanguage(),
                websiteCountry: DtgetCountry(),
                pageCategory: DtgetPageCategory(),
                pageSubCategory: CouponSubCategory(),
                navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',               
                navigationLinkNameClicked: sessionStorage.getItem('navlink'),
                navigationLocationClicked: sessionStorage.getItem('menuloc'),
                pageError: Dtgeterror(),
                dropDown: '',
                emailhash : emailID,
                emailHashTwo : emailID_SHA1,
                filterChoice: '',
                productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
            });
        }
    } else {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: DtgetPageCategory(),
            pageSubCategory: CouponSubCategory(),
            emailhash : emailID,
            emailHashTwo : emailID_SHA1,
            navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',           
            navigationLinkNameClicked: sessionStorage.getItem('navlink'),
            navigationLocationClicked: sessionStorage.getItem('menuloc'),
            pageError: Dtgeterror(),
            dropDown: '',
            filterChoice: '',
            productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
        });
    }
} else if (DtgetPageCategory() == 'Product List Page') {
    if (
        searchItems.lastclk == 'account-editprofile' ||
        searchItems.lastclk == 'address-list' ||
        searchItems.lastclk == 'paymentinstruments-list' ||
        searchItems.lastclk == 'wishlist-show' ||
        searchItems.lastclk == 'order-history' ||
        searchItems.lastclk == 'orderreplenishment-show' ||
        searchItems.lastclk == 'customerservice-contactus'
    ) {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: DtgetPageCategory(),
            emailhash : emailID,
            emailHashTwo : emailID_SHA1,
            pageSubCategory: CouponSubCategory(),
            navigationLinkClicked: getCookie('navdata') ? '1' : '0',           
            navigationLinkNameClicked: sessionStorage.getItem('navlink')
                ? sessionStorage.getItem('navlink')
                : getCookie('navdata'),
            navigationLocationClicked: 'topmenu',
            pageError: Dtgeterror(),
            dropDown: '',
            filterChoice: '',
            productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
        });
    } else {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: DtgetPageCategory(),
            emailhash : emailID,
            emailHashTwo : emailID_SHA1,
            pageSubCategory: CouponSubCategory(),
            navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',            
            navigationLinkNameClicked: sessionStorage.getItem('navlink'),
            navigationLocationClicked: sessionStorage.getItem('menuloc'),
            pageError: Dtgeterror(),
            dropDown: '',
            filterChoice: '',
            productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
        });
    }
} else if (gtCurPage == 'customerservice-contactus') {
    pushDtLayer({
        userId: customerNo != null ? customerNo : null,
        language: DtgetLanguage(),
        websiteCountry: DtgetCountry(),
        pageCategory: DtgetPageCategory(),
        pageSubCategory: CouponSubCategory(),
        navigationLinkClicked: '0',
        emailhash : emailID,
        emailHashTwo : emailID_SHA1,
        navigationLinkNameClicked: '',
        navigationLocationClicked: '',
        pageError: Dtgeterror(),
        dropDown: '',
        filterChoice: '',
        productUpdate: '0',
    });
} else if (gtCurPage == 'account-editprofile') {
    if (sessionStorage.getItem('navlink') != 'Profile') {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: DtgetPageCategory(),
            pageSubCategory: CouponSubCategory(),
            navigationLinkClicked: '0',
            emailhash : emailID,
        	emailHashTwo : emailID_SHA1,
            navigationLinkNameClicked: '',
            navigationLocationClicked: '',
            pageError: Dtgeterror(),
            dropDown: '',
            filterChoice: '',
            productUpdate: '0',
        });
    } else {
        pushDtLayer({
            userId: customerNo != null ? customerNo : null,
            language: DtgetLanguage(),
            websiteCountry: DtgetCountry(),
            pageCategory: DtgetPageCategory(),
            pageSubCategory: CouponSubCategory(),           
            navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',
            emailhash : emailID,
        	emailHashTwo : emailID_SHA1,
            navigationLinkNameClicked: sessionStorage.getItem('navlink'),
            navigationLocationClicked: sessionStorage.getItem('menuloc'),
            pageError: Dtgeterror(),
            dropDown: '',
            filterChoice: '',
            productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
        });
    }
} else {
    pushDtLayer({
        userId: customerNo != null ? customerNo : null,
        language: DtgetLanguage(),
        websiteCountry: DtgetCountry(),
        pageCategory: DtgetPageCategory(),      
        pageSubCategory: CouponSubCategory(),
        emailhash : emailID,
        emailHashTwo : emailID_SHA1,
        navigationLinkClicked: sessionStorage.getItem('navlink') ? '1' : '0',        
        navigationLinkNameClicked: sessionStorage.getItem('navlink'),
        navigationLocationClicked: sessionStorage.getItem('menuloc'),
        pageError: Dtgeterror(),
        dropDown: '',
        filterChoice: '',
        productUpdate: sessionStorage.getItem('productUpdate') ? '1' : '0',
    });
}

sessionStorage.setItem('navlink', '');
sessionStorage.setItem('menuloc', '');
sessionStorage.setItem('productUpdate', '');
sessionStorage.setItem('userid', userid);
sessionStorage.setItem('languange', DtgetLanguage());
sessionStorage.setItem('webCountry', DtgetCountry());
