'use strict';

var gtCurPage = window.User.clickStream;
/** Trigger the following datalayers for liveperson engagement attributes  * */

//document ready
window.addEventListener('load', function() {
	switch (gtCurPage) {
	    case 'cart-show':
	    case 'cart-addtowishlist':
	        // car show data layer
	        if (typeof basketConfirmation !== 'undefined' && basketConfirmation !== null) {
	            // engagement attribute for cart update to liveperson
	            var products = [];
	            for (var i = 0; i < window.basketConfirmation.productLineItems.length; i++) {
	                products[i] = {
	                    product: {
	                        name: window.basketConfirmation.productLineItems[i].name,
	                        category: window.basketConfirmation.productLineItems[i].category,
	                        sku: window.basketConfirmation.productLineItems[i].id,
	                        price: window.basketConfirmation.productLineItems[i].price,
	                    },
	                    quantity: window.basketConfirmation.productLineItems[i].quantity,
	                };
	            }
	            window.lpTag = window.lpTag || {};
	            lpTag.sdes = lpTag.sdes || [];
	            lpTag.sdes.push({
	                type: 'cart',
	                total: window.basketConfirmation.netStr.substr(1),
	                currency: window.basketConfirmation.currencyCode,
	                numItems: window.basketConfirmation.productLineItems.length,
	                products: products,
	            });
	        }
	        break;
	    case 'cosummary-submit':
	    case 'coplaceorder-submit':
	        if (typeof window.orderConfirmation !== 'undefined') {
	            // engagement attribute for transaction to liveperson
	            var products = [];
	            for (var i = 0; i < window.orderConfirmation.productLineItems.length; i++) {
	                products[i] = {
	                    product: {
	                        name: window.orderConfirmation.productLineItems[i].name,
	                        category: window.orderConfirmation.productLineItems[i].category,
	                        sku: window.orderConfirmation.productLineItems[i].id,
	                        price: window.orderConfirmation.productLineItems[i].price,
	                    },
	                    quantity: window.orderConfirmation.productLineItems[i].quantity,
	                };
	            }
	            window.lpTag = window.lpTag || {};
	            lpTag.sdes = lpTag.sdes || [];
	            lpTag.sdes.push({
	                type: 'purchase',
	                total: window.orderConfirmation.adjMerchandizeTotalNet,
	                currency: window.orderConfirmation.currencyCode,
	                orderId: window.orderConfirmation.transactionId,
	                cart: products,
	            });
	        }
	        break;
	    case 'search-show':
	    case 'search-getsuggestions':
	        if (window.searchItems.search) {
	            // engagement attribute for searched content to liveperson
	            window.lpTag = window.lpTag || {};
	            lpTag.sdes = lpTag.sdes || [];
	            lpTag.sdes.push({
	                type: 'searchInfo',
	                keywords: [window.searchItems.kw55],
	            });
	        }
	        break;
	    case 'product-showincategory':
	    case 'product-show':
	        // product detail page load page
	        if (DtgetPageCategory() == 'Product Page') {
	            if (typeof productCache !== 'undefined') {
	                // engagement attribute for viewed product to liveperson
	                window.lpTag = window.lpTag || {};
	                lpTag.sdes = lpTag.sdes || [];
	                lpTag.sdes.push({
	                    type: 'prodView',
	                    currency: 'USD',
	                    products: [
	                        {
	                            product: {
	                                name: window.productCache.name,
	                                category: window.productCache.catid,
	                                sku: window.productCache.variant ? window.productCache.masterID : window.productCache.ID,
	                                price: window.productCache.pricing ? window.productCache.pricing.minprice.toFixed(2) : '',
	                            },
	                        },
	                    ],
	                });
	            }
	        }
	        break;
	    	case 'account-editprofile':
	            // user loggedin
	            if(window.User.isRegistered){
	            	// engagement attribute for customer info to liveperson
	                window.lpTag = window.lpTag || {};
	                lpTag.sdes = lpTag.sdes || [];
	                lpTag.sdes.push({
	                    type: 'ctmrinfo',
	                    info: {
	                    	customerId: window.User.customerNo != null ? customerNo : null,
	                    	currency: window.User.currencyCode,
	                    },
	                });
	            }
            break;
	    default:
	        break;
	}
});