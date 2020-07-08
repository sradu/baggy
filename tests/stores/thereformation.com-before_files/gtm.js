
// Copyright 2012 Google Inc. All rights reserved.
(function(w,g){w[g]=w[g]||{};w[g].e=function(s){return eval(s);};})(window,'google_tag_manager');(function(){

var data = {
"resource": {
  "version":"182",
  
  "macros":[{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__e"
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_useEcommerceDataLayer":true,
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_enableEcommerce":true,
      "vtp_trackingId":"UA-26305999-3",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_ecommerceIsEnabled":true
    },{
      "function":"__v",
      "vtp_setDefaultValue":false,
      "vtp_name":"first_time_purchase",
      "vtp_dataLayerVersion":2
    },{
      "function":"__e"
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"cartItems"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=[];",["escape",["macro",7],8,16],".forEach(function(b){a.push(b.item)});return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return parseFloat(document.querySelector(\"[data-ge-basket-totals]\").innerText.replace(\/[^0-9.]\/g,\"\"))})();"]
    },{
      "function":"__c",
      "vtp_value":"965437957"
    },{
      "function":"__u",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=",["escape",["macro",6],8,16],",a=\"other\";-1!=b.indexOf(\"\/products\/\")?a=\"product\":\"\/\"==b?a=\"home\":-1!=b.indexOf(\"\/categories\/\")?a=\"category\":-1!=b.indexOf(\"\/cart\")\u0026\u0026(a=\"cart\");return a})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.variant"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",13],8,16],";return a.slice(0,-3)})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return parseFloat(document.querySelector('.product-prices__price [itemprop\\x3d\"price\"]').getAttribute(\"content\").replace(\/[^0-9.]\/g,\"\"))})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var c=5,b=7,h=[{name:\"EMAIL\",regex:\/.{4}@.{4}\/g}],k=\"_ga_originalSendHitTask\";return function(a){window[k]=window[k]||a.get(\"sendHitTask\");\"number\"===typeof c\u0026\u0026a.set(\"dimension\"+c,a.get(\"clientId\"));\"number\"===typeof b\u0026\u0026a.set(\"dimension\"+b,a.get(\"hitType\"));a.set(\"sendHitTask\",function(a){var c=a,b=window[k],l=!0;try{if(\"undefined\"!==typeof h\u0026\u0026h.length){for(var d=a.get(\"hitPayload\").split(\"\\x26\"),e=0;e\u003Cd.length;e++){var f=d[e].split(\"\\x3d\");try{var g=decodeURIComponent(decodeURIComponent(f[1]))}catch(m){g=\ndecodeURIComponent(f[1])}h.forEach(function(a){g=g.replace(a.regex,\"[REDACTED \"+a.name+\"]\")});f[1]=encodeURIComponent(g);d[e]=f.join(\"\\x3d\")}a.set(\"hitPayload\",d.join(\"\\x26\"),!0)}l\u0026\u0026b(a)}catch(m){b(c)}})}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"userID"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=new Date,c=-a.getTimezoneOffset(),d=0\u003C=c?\"+\":\"-\",b=function(a){a=Math.abs(Math.floor(a));return(10\u003Ea?\"0\":\"\")+a};return a.getFullYear()+\"-\"+b(a.getMonth()+1)+\"-\"+b(a.getDate())+\"T\"+b(a.getHours())+\":\"+b(a.getMinutes())+\":\"+b(a.getSeconds())+\".\"+b(a.getMilliseconds())+d+b(c\/60)+\":\"+b(c%60)})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=(new Date).getTime();\"undefined\"!==typeof performance\u0026\u0026\"function\"===typeof performance.now\u0026\u0026(a+=performance.now());return\"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx\".replace(\/[xy]\/g,function(c){var b=(a+16*Math.random())%16|0;a=Math.floor(a\/16);return(\"x\"===c?b:b\u00263|8).toString(16)})})();"]
    },{
      "function":"__f",
      "vtp_component":"URL"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"pageType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"loginStatus"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"returningPurchaser"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"countrySelected"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"countrySelected"
    },{
      "function":"__gas",
      "vtp_cookieDomain":"auto",
      "vtp_doubleClick":false,
      "vtp_setTrackerName":false,
      "vtp_useDebugVersion":false,
      "vtp_fieldsToSet":["list",["map","fieldName","customTask","value",["macro",16]],["map","fieldName","userId","value",["macro",17]]],
      "vtp_useHashAutoLink":false,
      "vtp_decorateFormsAutoLink":false,
      "vtp_enableLinkId":false,
      "vtp_dimension":["list",["map","index","3","dimension",["macro",18]],["map","index","4","dimension",["macro",19]],["map","index","6","dimension",["macro",17]],["map","index","8","dimension",["macro",20]],["map","index","9","dimension",["macro",21]],["map","index","10","dimension",["macro",22]],["map","index","11","dimension",["macro",23]],["map","index","32","dimension",["macro",24]],["map","index","33","dimension",["macro",25]]],
      "vtp_enableEcommerce":false,
      "vtp_trackingId":"UA-26305999-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false
    },{
      "function":"__v",
      "vtp_name":"gtm.elementClasses",
      "vtp_dataLayerVersion":1
    },{
      "function":"__remm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",27],
      "vtp_fullMatch":false,
      "vtp_replaceAfterMatch":false,
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","page-footer","value","Footer"],["map","key","ui-dialog-email__button","value","Email Modal"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"filterType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"filterValue"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",30],
      "vtp_defaultValue":["macro",30],
      "vtp_map":["list",["map","key","featured","value","Best Of"],["map","key","newest","value","Newest"],["map","key","price_desc","value","Price High to Low"],["map","key","price_asc","value","Price Low to High"],["map","key","most_hearted","value","Most Favorited"]]
    },{
      "function":"__smm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",23],
      "vtp_map":["list",["map","key","Yes","value","0"],["map","key","No","value","1"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"paymentType"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"shippingMethod"
    },{
      "function":"__smm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",23],
      "vtp_map":["list",["map","key","Yes","value","No"],["map","key","No","value","Yes"]]
    },{
      "function":"__v",
      "vtp_name":"gtm.elementUrl",
      "vtp_dataLayerVersion":1
    },{
      "function":"__u",
      "vtp_component":"URL",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_name":"gtm.triggers",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":true,
      "vtp_defaultValue":""
    },{
      "function":"__aev",
      "vtp_varType":"TEXT"
    },{
      "function":"__remm",
      "vtp_setDefaultValue":false,
      "vtp_input":["macro",39],
      "vtp_fullMatch":false,
      "vtp_replaceAfterMatch":false,
      "vtp_ignoreCase":true,
      "vtp_map":["list",["map","key","Vintage Melrose 8253 Melrose Ave. Los Angeles CA, 90046","value","Vintage Melrose, Los Angeles"],["map","key","Valencia 914 Valencia St. San Francisco CA, 94110","value","Valencia, San Francisco"],["map","key","Platform 8810 Washington Blvd. Culver City CA, 90232","value","Platform, Culver City"],["map","key","Melrose 8000 Melrose Ave. Los Angeles CA, 90046","value","Melrose, Los Angeles"],["map","key","Fillmore 2360 Fillmore St. San Francisco CA, 94115","value","Fillmore, San Francisco"],["map","key","Santa Monica 2937 Main St. Santa Monica CA, 90405","value","Santa Monica"],["map","key","Miami 3914 NE 1st Ave. Miami FL, 33137","value","Miami"],["map","key","Boston 342 Newbury St. Boston MA, 02115","value","Boston"],["map","key","LES 156 Ludlow St. New York NY, 10002","value","LES, New York"],["map","key","SoHo 23 Howard St. New York NY, 10013","value","SoHo, New York"],["map","key","Bond 39 Bond St. New York NY, 10012","value","Bond, New York"],["map","key","Hamptons 85 Main St. East Hampton NY, 11937","value","Hamptons, New York"],["map","key","Dallas 2815 N Henderson Ave. Dallas TX, 75206","value","Dallas, Texas"],["map","key","Georgetown 3033 M St. NW Georgetown DC, 20007","value","Georgetown, DC"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":1,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=JSON.parse(JSON.stringify(",["escape",["macro",41],8,16],"));try{b.refund.products.forEach(function(a){\"SMALL\"==a.dimension30?a.dimension30=\"Too small\":\"NOT_FIT\"==a.dimension30?a.dimension30=\"Does not fit well\":\"BIG\"==a.dimension30?a.dimension30=\"Too big\":\"NOT_FAVORITE\"==a.dimension30?a.dimension30=\"Bought several styles, this wasnt my favorite\":\"FIT_ONE\"==a.dimension30?a.dimension30=\"Bought multiple sizes, kept the one that fit\":\"QUALITY\"==a.dimension30?a.dimension30=\"Quality issues\":\"FABRIC\"==\na.dimension30?a.dimension30=\"Fabric issue\":\"PICTURE\"==a.dimension30?a.dimension30=\"Not as pictured\":\"WRONG\"==a.dimension30?a.dimension30=\"Wrong item\":\"GIFT\"==a.dimension30\u0026\u0026(a.dimension30=\"Item was a gift\");\"isc\"==a.dimension29?a.dimension29=\"Ref credit\":\"standard\"==a.dimension29\u0026\u0026(a.dimension29=\"Standard refund\")})}catch(a){}return{ecommerce:b}})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.name"
    },{
      "function":"__vis",
      "vtp_elementSelector":"div.ui-dialog-email__confirmation",
      "vtp_outputMethod":"BOOLEAN",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50"
    },{
      "function":"__v",
      "vtp_name":"gtm.element",
      "vtp_dataLayerVersion":1
    },{
      "function":"__remm",
      "vtp_setDefaultValue":true,
      "vtp_input":["macro",27],
      "vtp_fullMatch":false,
      "vtp_replaceAfterMatch":false,
      "vtp_ignoreCase":true,
      "vtp_defaultValue":"Desktop",
      "vtp_map":["list",["map","key","button--mini-bag","value","Mobile"]]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"gtm.element.parentElement.classList.value"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"gtm.element.parentElement.innerText"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",49],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={id:b[a].dimension2,item_price:b[a].price,quantity:1};return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",49],8,16],",b=0;for(i=0;i\u003Ca.length;i++)b+=a[i].price;return b})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.category"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.color"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.size"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.price"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return document.getElementsByClassName(\"size-options__size-label--focused\")[0].innerHTML})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.remove.products.0.variant"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",57],8,16],";return a.slice(0,-3)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.remove.products.0.category"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.remove.products.0.dimension1"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.remove.products.0.name"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.remove.products.0.price"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.products"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.revenue"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.shipping"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.tax"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.coupon"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.first_name"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.last_name"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.email"
    },{
      "function":"__aev",
      "vtp_varType":"CLASSES"
    },{
      "function":"__aev",
      "vtp_varType":"TEXT"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return $(\"#log_in_email--dropdown\").val()||$(\"#log_in_email--mobile\").val()||$(\"#email\").val()})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.checkout.products"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=[],a=",["escape",["macro",76],8,16],";for(i=0;i\u003Ca.length;i++)b.push({productId:a[i].variant.slice(0,-3),category:a[i].category,name:a[i].name,price:a[i].price,quantity:a[i].quantity});return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=[],b=",["escape",["macro",63],8,16],";for(i=0;i\u003Cb.length;i++)a.push(b[i].sku.slice(0,-3));return a})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.revenue"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return function(a,b){for(;!a.matches(b)\u0026\u0026!a.matches(\"body\");)a=a.parentElement;return a.matches(b)?a:void 0}})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",80],8,16],"(",["escape",["macro",45],8,16],",\"form[data-product-id]\");return\"undefined\"!==typeof a?a.dataset.productId:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",80],8,16],"(",["escape",["macro",45],8,16],",\"form[data-product-id]\");return\"undefined\"!==typeof a?a.dataset.heartOption:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",80],8,16],"(",["escape",["macro",45],8,16],",\"form[data-product-id]\");return\"undefined\"!==typeof a?a.dataset.heartName:void 0})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return $('form.product-details__add-to-cart-form input[name\\x3d\"sku\"]:checked').val()})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products.0.variant"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",85],8,16],";return a.slice(0,-3)})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products.0.category"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products.0.dimension1"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products.0.name"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=$(",["escape",["macro",45],8,16],");a=a.closest(\".quickadd_size\");return a.text()})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products.0.price"
    },{
      "function":"__k",
      "vtp_decodeCookie":false,
      "vtp_name":"category"
    },{
      "function":"__c",
      "vtp_value":"36659"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return WORKAREA.currentUser.email})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){return\/iPad\/.test(navigator.userAgent)?\"t\":\/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Silk\/.test(navigator.userAgent)?\"m\":\"d\"})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.impressions"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=[],b=",["escape",["macro",96],8,16],";for(i=0;i\u003Cb.length;i++)a.push(b[i].variant.slice(0,-3));return a})();"]
    },{
      "function":"__u",
      "vtp_component":"PATH",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=[],a=",["escape",["macro",76],8,16],";for(i=0;i\u003Ca.length;i++)b.push({id:a[i].variant.slice(0,-3),price:a[i].price,quantity:a[i].quantity});return b})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.products"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",101],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={id:b[a].dimension2,price:b[a].price,quantity:b[a].quantity};return c})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"userEmail"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",101],8,16],",b=0;for(i=0;i\u003Ca.length;i++)b+=a[i].quantity;return b})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.actionField.coupon"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",101],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={product_name:b[a].name,product_id:b[a].dimension2,product_category:b[a].category,product_variant_id:b[a].dimension2,product_variant:b[a].variant,product_price:b[a].price,product_quantity:b[a].quantity};return c})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.add.products"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",107],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={product_name:b[a].name,product_id:b[a].dimension2,product_category:b[a].category,product_variant_id:b[a].dimension2,product_variant:b[a].variant,product_price:b[a].price,product_quantity:b[a].quantity};return c})();"]
    },{
      "function":"__u",
      "vtp_component":"QUERY",
      "vtp_queryKey":"q",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.impressions.0.list"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var catView=",["escape",["macro",110],8,16],";var trimCat=",["escape",["macro",110],8,16],".replace(\"Category:\",\"\");return trimCat})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",107],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={id:b[a].dimension2,content_name:b[a].name,item_price:b[a].price,quantity:b[a].quantity};return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",107],8,16],",b=0;for(i=0;i\u003Ca.length;i++)b+=a[i].price;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",101],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={id:b[a].dimension2,content_name:b[a].name,item_price:b[a].price,quantity:b[a].quantity};return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",49],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={product_name:b[a].name,product_id:b[a].dimension2,product_category:b[a].category,product_variant_id:b[a].dimension2,product_variant:b[a].variant,product_price:b[a].price};return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",101],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={quantity:b[a].quantity,unitPrice:b[a].price,unitPriceLessTax:b[a].price,SKU:b[a].dimension2,productName:b[a].name};return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",110],8,16],";return a=a.replace(\"Category:\",\"\").replace(\/:\/g,\" \\x3e \")})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":1,
      "vtp_setDefaultValue":false,
      "vtp_name":"cartItems"
    },{
      "function":"__v",
      "vtp_name":"price",
      "vtp_defaultValue":"0",
      "vtp_setDefaultValue":true,
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_name":"sku",
      "vtp_dataLayerVersion":2
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"revenue"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.purchase.products"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var b=[],a=",["escape",["macro",122],8,16],";for(i=0;i\u003Ca.length;i++)b.push({id:a[i].dimension2,price:a[i].price,quantity:a[i].quantity});return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=[];document.querySelectorAll('.size-options__size-button [name\\x3d\"sku\"]').forEach(function(b){a.push(b.getAttribute(\"value\"))});return a})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",101],8,16],",b=0;for(i=0;i\u003Ca.length;i++)b+=a[i].price;return b})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.checkout.products"
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){for(var b=",["escape",["macro",126],8,16],",c=[],a=0;a\u003Cb.length;a++)c[a]={id:b[a].dimension2,content_name:b[a].name,item_price:b[a].price,quantity:b[a].quantity,color:b[a].dimension1};return c})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",126],8,16],",b=0;for(i=0;i\u003Ca.length;i++)b+=a[i].price;return b})();"]
    },{
      "function":"__jsm",
      "vtp_javascript":["template","(function(){var a=",["escape",["macro",126],8,16],",b=0;for(i=0;i\u003Ca.length;i++)b+=a[i].quantity;return b})();"]
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.id"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecommerce.detail.products.0.dimension2"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecomm_prodid"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecomm_pagetype"
    },{
      "function":"__v",
      "vtp_dataLayerVersion":2,
      "vtp_setDefaultValue":false,
      "vtp_name":"ecomm_totalvalue"
    },{
      "function":"__u",
      "vtp_component":"HOST",
      "vtp_enableMultiQueryKeys":false,
      "vtp_enableIgnoreEmptyQueryParam":false
    },{
      "function":"__e"
    },{
      "function":"__v",
      "vtp_name":"gtm.elementId",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementTarget",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.element",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementClasses",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementId",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementTarget",
      "vtp_dataLayerVersion":1
    },{
      "function":"__v",
      "vtp_name":"gtm.elementUrl",
      "vtp_dataLayerVersion":1
    },{
      "function":"__aev",
      "vtp_varType":"TEXT"
    }],
  "tags":[{
      "function":"__html",
      "priority":3,
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Evar _sd=_sd||{};_sd.partnerId=\"8d63c563f6bcd0dea25fdc2af37b7166b9cd64bd\";_sd.domain=\".thereformation.com\";_sd.environment=\"staging\";\n(function(b,c,e){w=window;d=document;n=\"script\";l=Array.prototype.slice;w._sd.lib=c;w.SimonData=b;w[b]||(w[b]={send:function(){(w[b].q=w[b].q||[]).push(arguments)},identify:function(){a=l.call(arguments);a.unshift(\"identify\");w[b].send.apply(null,a)},track:function(){a=l.call(arguments);a.unshift(\"track\");w[b].send.apply(null,a)}});t=d.createElement(n);t.src=c;o=d.getElementsByTagName(e)[0];o.parentNode.insertBefore(t,o)})(\"sd\",\"\/\/static.simonsignal.com\/simon-ref-min.js\",\"script\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":172
    },{
      "function":"__ua",
      "vtp_overrideGaSettings":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",3],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":16
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventValue":"first-time-purchase",
      "vtp_eventCategory":"first-time-purchase",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",3],
      "vtp_eventAction":"first-time-purchase",
      "vtp_eventLabel":"first-time-purchase",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":25
    },{
      "function":"__paused",
      "vtp_originalTagType":"sp",
      "tag_id":45
    },{
      "function":"__gclidw",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_enableCrossDomain":false,
      "vtp_enableCookieOverrides":false,
      "vtp_enableCrossDomainFeature":true,
      "vtp_enableCookieUpdateFeature":false,
      "tag_id":116
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":117
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventValue":"workarea-existing-firstPurchase",
      "vtp_eventCategory":"workarea-existing-firstPurchase",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",3],
      "vtp_eventAction":"workarea-existing-firstPurchase",
      "vtp_eventLabel":"workarea-existing-firstPurchase",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":141
    },{
      "function":"__sp",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_customParams":["list",["map","key","ecomm_pagetype","value","cart"],["map","key","ecomm_prodid","value",["macro",8]],["map","key","ecomm_totalvalue","value",["macro",9]]],
      "vtp_enableDynamicRemarketing":false,
      "vtp_conversionId":["macro",10],
      "vtp_customParamsFormat":"USER_SPECIFIED",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",11],
      "vtp_enableRdpCheckbox":true,
      "tag_id":169
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"dynamic remarketing",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":"pageviewed",
      "vtp_dimension":["list",["map","index","36","dimension",["macro",12]]],
      "vtp_trackingId":"UA-26305999-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":170
    },{
      "function":"__sp",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_customParams":["list",["map","key","ecomm_pagetype","value",["macro",12]],["map","key","ecomm_prodid","value",["macro",14]],["map","key","ecomm_totalvalue","value",["macro",15]]],
      "vtp_enableDynamicRemarketing":false,
      "vtp_conversionId":["macro",10],
      "vtp_customParamsFormat":"USER_SPECIFIED",
      "vtp_enableOgtRmktParams":true,
      "vtp_url":["macro",11],
      "vtp_enableRdpCheckbox":true,
      "tag_id":171
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_overrideGaSettings":false,
      "vtp_trackType":"TRACK_PAGEVIEW",
      "vtp_gaSettings":["macro",26],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "tag_id":177
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Newsletter",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","10","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Signup",
      "vtp_dimension":["list",["map","index","20","dimension",["macro",28]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":178
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Account",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","13","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Logout",
      "vtp_dimension":["list",["map","index","10","dimension","Logged Out"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":179
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Filters",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","1","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Filter Applied",
      "vtp_eventLabel":["macro",21],
      "vtp_dimension":["list",["map","index","16","dimension",["macro",29]],["map","index","17","dimension",["macro",30]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":180
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Filters",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","2","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Filter Removed",
      "vtp_eventLabel":["macro",21],
      "vtp_dimension":["list",["map","index","16","dimension",["macro",29]],["map","index","17","dimension",["macro",30]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":181
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Filters",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","3","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Clear Filters",
      "vtp_eventLabel":["macro",21],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":182
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Filters",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","4","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"View Applied",
      "vtp_eventLabel":["macro",21],
      "vtp_dimension":["list",["map","index","16","dimension","View"],["map","index","17","dimension",["macro",30]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":183
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Filters",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","5","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Sort Applied",
      "vtp_eventLabel":["macro",21],
      "vtp_dimension":["list",["map","index","16","dimension","Sort"],["map","index","17","dimension",["macro",31]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":184
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Engagement",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","8","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Favorites",
      "vtp_dimension":["list",["map","index","19","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":185
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Engagement",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","9","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Unfavorites",
      "vtp_dimension":["list",["map","index","19","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":186
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Add to Cart",
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":187
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Product Click",
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":188
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Product Impression",
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":190
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Remove from Cart",
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":191
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Checkout",
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":192
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","6","metric",["macro",32]]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Purchase",
      "vtp_dimension":["list",["map","index","12","dimension",["macro",33]],["map","index","13","dimension",["macro",34]],["map","index","26","dimension",["macro",35]]],
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":193
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Account",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","11","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Signup",
      "vtp_dimension":["list",["map","index","21","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":194
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Account",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","12","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Login",
      "vtp_dimension":["list",["map","index","10","dimension","Logged In"],["map","index","22","dimension",["macro",21]],["map","index","11","dimension",["macro",23]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":195
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Retail Store",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","14","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Click",
      "vtp_eventLabel":["macro",40],
      "vtp_dimension":["list",["map","index","23","dimension",["macro",40]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":196
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Contact Us",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","15","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Phone Click",
      "vtp_eventLabel":["macro",39],
      "vtp_dimension":["list",["map","index","24","dimension","Phone Click"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":197
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Contact Us",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","15","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Email Click",
      "vtp_eventLabel":"love@thereformation.com",
      "vtp_dimension":["list",["map","index","24","dimension","Email Click"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":198
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Contact Us",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","15","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Form Submit",
      "vtp_dimension":["list",["map","index","24","dimension","Form Submit"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":199
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Contact Us",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","15","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Text Click",
      "vtp_eventLabel":["macro",39],
      "vtp_dimension":["list",["map","index","24","dimension","Text Click"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":200
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":true,
      "vtp_eventCategory":"Ecommerce",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Product Detail Impression",
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":202
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Account",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Forgot Password",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":203
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"First Time Purchase",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Success",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":205
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","16","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Step Viewed",
      "vtp_eventLabel":"My Orders",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]],["map","index","31","dimension","Order Search"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":223
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","16","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Step Viewed",
      "vtp_eventLabel":"Order Lookup",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]],["map","index","31","dimension","Order Search"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":224
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","16","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Step Viewed",
      "vtp_eventLabel":"View Order",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]],["map","index","31","dimension","View Order"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":225
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Return Option Selected",
      "vtp_eventLabel":["macro",39],
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":226
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Refund Option Selected",
      "vtp_eventLabel":["macro",39],
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":227
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Cancel Return",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":228
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","16","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Step Viewed",
      "vtp_eventLabel":"Review Page",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]],["map","index","31","dimension","Review Page"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":229
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_useEcommerceDataLayer":false,
      "vtp_ecommerceMacroData":["macro",42],
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","16","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Step Viewed",
      "vtp_eventLabel":"Confirmation Page",
      "vtp_dimension":["list",["map","index","9","dimension","My Account Page"],["map","index","31","dimension","Confirmation Page"]],
      "vtp_enableEcommerce":true,
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_ecommerceIsEnabled":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":230
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Print Return Label",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":231
    },{
      "function":"__ua",
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Social Share",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","17","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":["macro",39],
      "vtp_eventLabel":["macro",43],
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":233
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Newsletter",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"View Email Modal",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":236
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Newsletter",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Close Email Modal",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":237
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Bag Overlay",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"View Bag Clicks",
      "vtp_eventLabel":["macro",46],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":238
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Bag Overlay",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Close Bag",
      "vtp_eventLabel":"Mobile",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":239
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Bag Overlay",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Overlay Viewed",
      "vtp_eventLabel":"Mobile",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":242
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Bag Overlay",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Overlay Viewed",
      "vtp_eventLabel":"Desktop",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":243
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Refunds",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_metric":["list",["map","index","16","metric","1"]],
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Step Viewed",
      "vtp_eventLabel":"Returns and Exchanges",
      "vtp_dimension":["list",["map","index","9","dimension",["macro",21]],["map","index","31","dimension","Order Search"]],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":244
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"Waitlist",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Signup",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":253
    },{
      "function":"__paused",
      "vtp_originalTagType":"html",
      "tag_id":403
    },{
      "function":"__paused",
      "vtp_originalTagType":"ua",
      "tag_id":408
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"dynamic remarketing",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":"pageviewed",
      "vtp_dimension":["list",["map","index","35","dimension",["macro",14]],["map","index","36","dimension",["macro",12]],["map","index","37","dimension",["macro",15]]],
      "vtp_trackingId":"UA-26305999-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":411
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"dynamic remarketing",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":"pageviewed",
      "vtp_dimension":["list",["map","index","35","dimension",["macro",8]],["map","index","36","dimension","cart"],["map","index","37","dimension",["macro",9]]],
      "vtp_trackingId":"UA-26305999-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":412
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":true,
      "vtp_overrideGaSettings":true,
      "vtp_eventCategory":"dynamic remarketing",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_eventAction":"pageviewed",
      "vtp_dimension":["list",["map","index","36","dimension","purchase"]],
      "vtp_trackingId":"UA-26305999-1",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":413
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Product Detail Page",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Size",
      "vtp_eventLabel":["macro",39],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":416
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Product Detail Page",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Size Chart",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":418
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Product Detail Page",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Full Image",
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":420
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Product Detail Page",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Product Info Expansion",
      "vtp_eventLabel":["macro",48],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":424
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Product Detail Page",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Product Info Expansion",
      "vtp_eventLabel":["macro",39],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":426
    },{
      "function":"__ua",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_nonInteraction":false,
      "vtp_overrideGaSettings":false,
      "vtp_eventCategory":"Product Detail Page",
      "vtp_trackType":"TRACK_EVENT",
      "vtp_gaSettings":["macro",26],
      "vtp_eventAction":"Breadcrumb Click",
      "vtp_eventLabel":["macro",39],
      "vtp_enableRecaptchaOption":false,
      "vtp_enableUaRlsa":false,
      "vtp_enableUseInternalVersion":false,
      "vtp_enableFirebaseCampaignData":true,
      "vtp_trackTypeIsEvent":true,
      "tag_id":428
    },{
      "function":"__cl",
      "tag_id":429
    },{
      "function":"__cl",
      "tag_id":430
    },{
      "function":"__cl",
      "tag_id":431
    },{
      "function":"__cl",
      "tag_id":432
    },{
      "function":"__cl",
      "tag_id":433
    },{
      "function":"__cl",
      "tag_id":434
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_284",
      "tag_id":435
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_285",
      "tag_id":436
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_286",
      "tag_id":437
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_287",
      "tag_id":438
    },{
      "function":"__cl",
      "tag_id":439
    },{
      "function":"__cl",
      "tag_id":440
    },{
      "function":"__cl",
      "tag_id":441
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_325",
      "tag_id":442
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_335",
      "tag_id":443
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":"div.ui-dialog-email__signup",
      "vtp_firingFrequency":"ONCE",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"965830_353",
      "tag_id":444
    },{
      "function":"__cl",
      "tag_id":445
    },{
      "function":"__cl",
      "tag_id":446
    },{
      "function":"__cl",
      "tag_id":447
    },{
      "function":"__cl",
      "tag_id":448
    },{
      "function":"__cl",
      "tag_id":449
    },{
      "function":"__cl",
      "tag_id":450
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":"div.cart-summary__main ul",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"965830_370",
      "tag_id":451
    },{
      "function":"__evl",
      "vtp_useOnScreenDuration":false,
      "vtp_useDomChangeListener":true,
      "vtp_elementSelector":"div.cart-summary__main.cart-summary__main--mini-bag.hidden.hidden--for-medium div.cart-summary__add-to-bag",
      "vtp_firingFrequency":"ONCE_PER_ELEMENT",
      "vtp_selectorType":"CSS",
      "vtp_onScreenRatio":"50",
      "vtp_uniqueTriggerId":"965830_371",
      "tag_id":452
    },{
      "function":"__tg",
      "vtp_triggerIds":["list","965830_381_264","965830_381_290"],
      "vtp_uniqueTriggerId":"965830_381",
      "tag_id":453
    },{
      "function":"__tg",
      "vtp_isListeningTag":true,
      "vtp_firingId":"965830_381_264",
      "tag_id":454
    },{
      "function":"__tg",
      "vtp_isListeningTag":true,
      "vtp_firingId":"965830_381_290",
      "tag_id":456
    },{
      "function":"__tg",
      "vtp_triggerIds":["list","965830_382_281","965830_382_306"],
      "vtp_uniqueTriggerId":"965830_382",
      "tag_id":457
    },{
      "function":"__tg",
      "vtp_isListeningTag":true,
      "vtp_firingId":"965830_382_281",
      "tag_id":458
    },{
      "function":"__tg",
      "vtp_isListeningTag":true,
      "vtp_firingId":"965830_382_306",
      "tag_id":460
    },{
      "function":"__cl",
      "tag_id":461
    },{
      "function":"__cl",
      "tag_id":462
    },{
      "function":"__lcl",
      "vtp_waitForTags":false,
      "vtp_checkValidation":false,
      "vtp_waitForTagsTimeout":"2000",
      "vtp_uniqueTriggerId":"965830_419",
      "tag_id":463
    },{
      "function":"__cl",
      "tag_id":464
    },{
      "function":"__cl",
      "tag_id":465
    },{
      "function":"__cl",
      "tag_id":466
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_load":true,
      "vtp_html":"\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b,e,f,g,a,c,d){b.fbq||(a=b.fbq=function(){a.callMethod?a.callMethod.apply(a,arguments):a.queue.push(arguments)},b._fbq||(b._fbq=a),a.push=a,a.loaded=!0,a.version=\"2.0\",a.queue=[],c=e.createElement(f),c.async=!0,c.src=g,d=e.getElementsByTagName(f)[0],d.parentNode.insertBefore(c,d))}(window,document,\"script\",\"https:\/\/connect.facebook.net\/en_US\/fbevents.js\");fbq(\"init\",\"571594179652980\");fbq(\"track\",\"PageView\");\u003C\/script\u003E\n\u003Cnoscript\u003E\u003Cimg height=\"1\" width=\"1\" style=\"display:none\" src=\"https:\/\/www.facebook.com\/tr?id=571594179652980\u0026amp;ev=PageView\u0026amp;noscript=1\"\u003E\u003C\/noscript\u003E\n\n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":46
    },{
      "function":"__html",
      "setup_tags":["list",["tag",101,1]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Efbq(\"track\",\"ViewContent\",{content_type:\"product\",currency:\"USD\",contents:",["escape",["macro",50],8,16],",value:",["escape",["macro",51],8,16],"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":50
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Evar _sd=_sd||{};_sd.partnerId=\"8d63c563f6bcd0dea25fdc2af37b7166b9cd64bd\";_sd.domain=\".thereformation.com\";_sd.environment=\"production\";\n(function(b,c,e){w=window;d=document;n=\"script\";l=Array.prototype.slice;w._sd.lib=c;w.SimonData=b;w[b]||(w[b]={send:function(){(w[b].q=w[b].q||[]).push(arguments)},identify:function(){a=l.call(arguments);a.unshift(\"identify\");w[b].send.apply(null,a)},track:function(){a=l.call(arguments);a.unshift(\"track\");w[b].send.apply(null,a)}});t=d.createElement(n);t.src=c;o=d.getElementsByTagName(e)[0];o.parentNode.insertBefore(t,o)})(\"sd\",\"\/\/static.simonsignal.com\/simon-ref-min.js\",\"script\");\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":118
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"product_view\",{productId:\"",["escape",["macro",14],7],"\",variant:\"",["escape",["macro",13],7],"\",category:\"",["escape",["macro",52],7],"\",color:\"",["escape",["macro",53],7],"\",productName:\"",["escape",["macro",43],7],"\",size:\"",["escape",["macro",54],7],"\",price:\"",["escape",["macro",55],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":120
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"add_to_cart\",{productId:\"",["escape",["macro",14],7],"\",variant:\"",["escape",["macro",13],7],"\",category:\"",["escape",["macro",52],7],"\",color:\"",["escape",["macro",53],7],"\",productName:\"",["escape",["macro",43],7],"\",size:\"",["escape",["macro",56],7],"\",price:\"",["escape",["macro",55],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":125
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"remove_from_cart\",{productId:\"",["escape",["macro",58],7],"\",variant:\"",["escape",["macro",57],7],"\",category:\"",["escape",["macro",59],7],"\",color:\"",["escape",["macro",60],7],"\",productName:\"",["escape",["macro",61],7],"\",price:\"",["escape",["macro",62],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":126
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"complete_transaction\",{cartItems:\"",["escape",["macro",63],7],"\",transactionId:\"",["escape",["macro",64],7],"\",revenue:\"",["escape",["macro",65],7],"\",shipping:\"",["escape",["macro",66],7],"\",tax:\"",["escape",["macro",67],7],"\",promotion:\"",["escape",["macro",68],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":127
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"registration\",{firstName:\"",["escape",["macro",69],7],"\",lastName:\"",["escape",["macro",70],7],"\",optIn:!0,email:\"",["escape",["macro",71],7],"\"});sd.identify(\"",["escape",["macro",71],7],"\",{email:\"",["escape",["macro",71],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":129
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.identify(\"",["escape",["macro",74],7],"\",{email:\"",["escape",["macro",74],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":130
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"favorite\",{productId:\"",["escape",["macro",75],7],"\",color:\"",["escape",["macro",53],7],"\",productName:\"",["escape",["macro",43],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":131
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"cart\",{cartItems:",["escape",["macro",77],8,16],"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":142
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",101,0]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Efbq(\"track\",\"Purchase\",{content_type:\"product\",content_ids:",["escape",["macro",78],8,16],",value:",["escape",["macro",79],8,16],",currency:\"USD\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":149
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"favorite\",{productId:\"",["escape",["macro",81],7],"\",color:\"",["escape",["macro",82],7],"\",productName:\"",["escape",["macro",83],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":151
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"waitlist\",{productId:\"",["escape",["macro",14],7],"\",variant:\"",["escape",["macro",84],7],"\",category:\"",["escape",["macro",52],7],"\",color:\"",["escape",["macro",53],7],"\",productName:\"",["escape",["macro",43],7],"\",size:\"",["escape",["macro",56],7],"\",price:\"",["escape",["macro",55],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":152
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":"\n \n\u003Cscript type=\"text\/gtmscript\"\u003E(function(a){window.DataLayer||(window.DataLayer={});DataLayer.events||(DataLayer.events={});DataLayer.events.SiteSection=\"1\";var b=document.createElement(\"script\");b.type=\"text\/javascript\";b.async=!0;b.src=a;a=document.getElementsByTagName(\"script\")[0];a.parentNode.insertBefore(b,a)})(document.location.protocol+\"\/\/intljs.rmtag.com\/115232.ct.js\");\u003C\/script\u003E\n \n",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":153
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.identify(\"",["escape",["macro",74],7],"\",{email:\"",["escape",["macro",74],7],"\"});console.log(\"\\x3d\\x3d event sd.identify('",["escape",["macro",74],7],"') was fired \\x3d\\x3d\");\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":155
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Esd.track(\"add_to_cart\",{productId:\"",["escape",["macro",86],7],"\",variant:\"",["escape",["macro",85],7],"\",category:\"",["escape",["macro",87],7],"\",color:\"",["escape",["macro",88],7],"\",productName:\"",["escape",["macro",89],7],"\",size:\"",["escape",["macro",90],7],"\",price:\"",["escape",["macro",91],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":158
    },{
      "function":"__html",
      "teardown_tags":["list",["tag",1,2]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003E(function(){dataLayer.push({\"ecommerce\":{\"detail\":{\"products\":[{\"name\":\"",["escape",["macro",89],7],"\",\"id\":\"",["escape",["macro",86],7],"\",\"price\":\"",["escape",["macro",91],7],"\",\"category\":\"",["escape",["macro",92],7],"\"||\"",["escape",["macro",87],7],"\",\"variant\":\"",["escape",["macro",85],7],"\"}]}}})})();\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":160
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:",["escape",["macro",93],8,16],"},{event:\"setEmail\",email:",["escape",["macro",94],8,16],"},{event:\"setSiteType\",type:",["escape",["macro",95],8,16],"},{event:\"viewList\",tms:\"gtm-criteo-2.0.0\",item:",["escape",["macro",97],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":161
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:",["escape",["macro",93],8,16],"},{event:\"setEmail\",email:",["escape",["macro",94],8,16],"},{event:\"setSiteType\",type:",["escape",["macro",95],8,16],"},{event:\"viewItem\",tms:\"gtm-criteo-2.0.0\",item:[\"",["escape",["macro",14],7],"\"]});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":162
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:",["escape",["macro",93],8,16],"},{event:\"setEmail\",email:",["escape",["macro",94],8,16],"},{event:\"setSiteType\",type:",["escape",["macro",95],8,16],"},{event:\"viewBasket\",tms:\"gtm-criteo-2.0.0\",item:",["escape",["macro",99],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":163
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:",["escape",["macro",93],8,16],"},{event:\"setEmail\",email:",["escape",["macro",94],8,16],"},{event:\"setSiteType\",type:",["escape",["macro",95],8,16],"},{event:\"trackTransaction\",tms:\"gtm-criteo-2.0.0\",id:",["escape",["macro",100],8,16],",item:",["escape",["macro",102],8,16],"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":164
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\" data-gtmsrc=\"\/\/static.criteo.net\/js\/ld\/ld.js\" async=\"true\"\u003E\u003C\/script\u003E\n\u003Cscript type=\"text\/gtmscript\"\u003Ewindow.criteo_q=window.criteo_q||[];window.criteo_q.push({event:\"setAccount\",account:",["escape",["macro",93],8,16],"},{event:\"setEmail\",email:",["escape",["macro",94],8,16],"},{event:\"setSiteType\",type:",["escape",["macro",95],8,16],"},{event:\"viewHome\",tms:\"gtm-criteo-2.0.0\"});\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":165
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar variant=$(",["escape",["macro",45],8,16],").attr(\"value\"),product_id=variant.slice(0,7),impression_products=",["escape",["macro",96],8,16],",selected_products=impression_products.filter(function(a){return a.id==product_id});if(0\u003Cselected_products.length){var product=selected_products[0];sd.track(\"waitlist\",{productId:product.id,variant:variant,category:product.category,productName:product.name,price:product.price})};\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":173
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_load":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var a=window.pintrk;a.queue=[];a.version=\"3.0\";a=document.createElement(\"script\");a.async=!0;a.src=b;b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)}}(\"https:\/\/s.pinimg.com\/ct\/core.js\");pintrk(\"load\",\"2612949610740\",{em:\"",["escape",["macro",103],7],"\"});pintrk(\"page\");\u003C\/script\u003E\n\u003Cnoscript\u003E\n\u003Cimg height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https:\/\/ct.pinterest.com\/v3\/?tid=2612949610740\u0026amp;pd[em]=",["escape",["macro",103],12],"\u0026amp;noscript=1\"\u003E\n\u003C\/noscript\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":207
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var a=window.pintrk;a.queue=[];a.version=\"3.0\";a=document.createElement(\"script\");a.async=!0;a.src=b;b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)}}(\"https:\/\/s.pinimg.com\/ct\/core.js\");pintrk(\"load\",\"2612949610740\",{em:\"",["escape",["macro",103],7],"\"});pintrk(\"page\");\npintrk(\"track\",\"checkout\",{value:",["escape",["macro",79],8,16],",currency:\"USD\",order_quantity:",["escape",["macro",104],8,16],",order_id:\"",["escape",["macro",100],7],"\",promo_code:\"",["escape",["macro",105],7],"\",line_items:",["escape",["macro",106],8,16],"});\u003C\/script\u003E\n\u003Cnoscript\u003E\n\u003Cimg height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https:\/\/ct.pinterest.com\/v3\/?tid=2612949610740\u0026amp;pd[em]=",["escape",["macro",103],12],"\u0026amp;noscript=1\"\u003E\n\u003C\/noscript\u003E\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":208
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",125,1]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Epintrk(\"track\",\"addtocart\",{line_items:",["escape",["macro",108],8,16],"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":209
    },{
      "function":"__html",
      "once_per_event":true,
      "vtp_html":["template","\n\u003Cscript type=\"text\/gtmscript\"\u003E!function(b){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var a=window.pintrk;a.queue=[];a.version=\"3.0\";a=document.createElement(\"script\");a.async=!0;a.src=b;b=document.getElementsByTagName(\"script\")[0];b.parentNode.insertBefore(a,b)}}(\"https:\/\/s.pinimg.com\/ct\/core.js\");pintrk(\"load\",\"2612949610740\",{em:\"",["escape",["macro",103],7],"\"});pintrk(\"page\");pintrk(\"track\",\"search\",{search_query:\"",["escape",["macro",109],7],"\"});\u003C\/script\u003E\n\u003Cnoscript\u003E\n\u003Cimg height=\"1\" width=\"1\" style=\"display:none;\" alt=\"\" src=\"https:\/\/ct.pinterest.com\/v3\/?tid=2612949610740\u0026amp;pd[em]=",["escape",["macro",103],12],"\u0026amp;noscript=1\"\u003E\n\u003C\/noscript\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":210
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",125,1]],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Epintrk(\"track\",\"lead\",{lead_type:\"Newsletter\"});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":211
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",125,1]],
      "once_per_event":true,
      "vtp_html":"\u003Cscript type=\"text\/gtmscript\"\u003Epintrk(\"track\",\"lead\",{lead_type:\"Account Signup\"});\u003C\/script\u003E",
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":212
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",125,1]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Epintrk(\"track\",\"viewcategory\",{lead_type:\"",["escape",["macro",111],7],"\"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":214
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",101,1]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Efbq(\"track\",\"AddToCart\",{content_type:\"product\",currency:\"USD\",contents:",["escape",["macro",112],8,16],",value:",["escape",["macro",113],8,16],"});\u003C\/script\u003E\n\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":218
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",101,1]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Efbq(\"track\",\"Purchase\",{content_type:\"product\",currency:\"USD\",contents:",["escape",["macro",114],8,16],",value:",["escape",["macro",79],8,16],"});\u003C\/script\u003E\n\n\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":219
    },{
      "function":"__html",
      "metadata":["map"],
      "setup_tags":["list",["tag",125,1]],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Epintrk(\"track\",\"pagevisit\",{line_items:",["escape",["macro",115],8,16],"});\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":222
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\n\n\u003Cscript type=\"text\/gtmscript\"\u003Evar rm_trans={affiliateConfig:{ranMID:\"40090\",discountType:\"item\"},orderid:\"",["escape",["macro",100],7],"\",currency:\"USD\",conversionType:\"Sale\",taxAmount:",["escape",["macro",67],8,16],",lineitems:",["escape",["macro",116],8,16],"};window.DataLayer?(DataLayer.Sale=DataLayer.Sale||{Basket:rm_trans},DataLayer.Sale.Basket=DataLayer.Sale.Basket||rm_trans):window.DataLayer={Sale:{Basket:rm_trans}};DataLayer.Sale.Basket.Ready=!0;\nfunction __readRMCookie(a){a+=\"\\x3d\";for(var d=document.cookie.split(\";\"),c=0;c\u003Cd.length;c++){for(var e=d[c];\" \"==e.charAt(0);)e=e.substring(1,e.length);if(0==e.indexOf(a))return e.substring(a.length,e.length)}return\"\"}function __readRMCookiev2(a,d){for(var c=__readRMCookie(d||\"rmStore\");c!==decodeURIComponent(c);)c=decodeURIComponent(c);c=c.split(\"|\");for(var e=0;e\u003Cc.length;e++){var b=c[e].split(\":\")[0],f=c[e].split(\":\")[1];if(b===a)return f}return\"\"}\nfunction __readParam(a,d,c,e){a=a||\"\";d=d||\"\";c=c||\"\";e=e||{};a=__readRMCookiev2(a);d=e[d];e=(e.ignoreCookie?0:a)||d||c;return(\"string\"!=typeof e||\"false\"!==e.toLowerCase())\u0026\u0026e}\nfunction sRAN(){var a=DataLayer\u0026\u0026DataLayer.Sale\u0026\u0026DataLayer.Sale.Basket?DataLayer.Sale.Basket:{},d=a.affiliateConfig||{},c=__readParam(\"atm\",\"tagType\",\"pixel\",d),e=__readParam(\"adr\",\"discountType\",\"order\",d),b=__readParam(\"acs\",\"includeStatus\",\"false\",d),f=__readParam(\"arto\",\"removeOrderTax\",\"false\",d),y=__readParam(\"artp\",\"removeTaxFromProducts\",\"false\",d),g=__readParam(\"artd\",\"removeTaxFromDiscount\",\"false\",d),l=__readParam(\"atr\",\"taxRate\",0,d);l=Number(l);var k=__readParam(\"ald\",\"land\",!1,{})||\n(d.land\u0026\u0026!0===d.land?__readRMCookie(\"ranLandDateTime\"):d.land)||!1,p=__readParam(\"atrv\",\"tr\",!1,{})||(d.tr\u0026\u0026!0===d.tr?__readRMCookie(\"ranSiteID\"):d.tr)||!1,B=!1,C=__readParam(\"amid\",\"ranMID\",\"\",d)||a.ranMID;if(!C||void 0!==d.allowCommission\u0026\u0026\"false\"===d.allowCommission)return!1;d=a.orderid||\"OrderNumberNotAvailable\";var t=\"\",u=\"\",v=\"\",w=\"\",A=a.currency||\"\";A=A.toUpperCase();var D=a.taxAmount?Math.abs(Math.round(100*Number(a.taxAmount))):0,m=a.discountAmount?Math.abs(Math.round(100*Number(a.discountAmount))):\n0;g\u0026\u0026l\u0026\u0026(g=(100+Number(l))\/100,m=Math.round(m\/g));c=\"pixel\"===c?\"ep\":\"mop\"===c?\"eventnvppixel\":\"ep\";var q=a.customerStatus||\"\";c=document.location.protocol+\"\/\/track.linksynergy.com\/\"+c+\"?\";g=\"\";null!=q\u0026\u0026\"\"!=q\u0026\u0026(b\u0026\u0026\"EXISTING\"==q.toUpperCase()||b\u0026\u0026\"RETURNING\"==q.toUpperCase())\u0026\u0026(g=\"R_\");b=[];for(var n=q=0;n\u003C(a.lineitems?a.lineitems.length:0);n++){for(var z=!1,h=window.JSON?JSON.parse(JSON.stringify(a.lineitems[n])):a.lineitems[n],r=0;r\u003Cb.length;r++)b[r].SKU===h.SKU\u0026\u0026(z=!0,b[r].quantity=Number(b[r].quantity)+\nNumber(h.quantity));z||b.push(h);q+=Number(h.quantity)*Number(h.unitPriceLessTax||h.unitPrice)*100}for(n=0;n\u003Cb.length;n++){h=b[n];a=encodeURIComponent(h.SKU);var x=h.unitPriceLessTax||h.unitPrice;z=h.quantity;r=encodeURIComponent(h.productName)||\"\";x=Math.round(Number(x)*Number(z)*100);!y||!l||h.unitPriceLessTax\u0026\u0026h.unitPriceLessTax!==h.unitPrice||(x\/=(100+l)\/100);\"item\"===e.toLowerCase()\u0026\u0026m\u0026\u0026(x-=m*x\/q);t+=g+a+\"|\";u+=z+\"|\";v+=Math.round(x)+\"|\";w+=g+r+\"|\"}t=t.slice(0,-1);u=u.slice(0,-1);v=v.slice(0,\n-1);w=w.slice(0,-1);m\u0026\u0026\"order\"===e.toLowerCase()?(t+=\"|\"+g+\"DISCOUNT\",w+=\"|\"+g+\"DISCOUNT\",u+=\"|0\",v+=\"|-\"+m):m\u0026\u0026\"item\"===e.toLowerCase()\u0026\u0026(B=!0);f\u0026\u0026D\u0026\u0026(t+=\"|\"+g+\"ORDERTAX\",u+=\"|0\",v+=\"|-\"+D,w+=\"|\"+g+\"ORDERTAX\");c+=\"mid\\x3d\"+C+\"\\x26ord\\x3d\"+d+\"\\x26skulist\\x3d\"+t+\"\\x26qlist\\x3d\"+u+\"\\x26amtlist\\x3d\"+v+\"\\x26cur\\x3d\"+A+\"\\x26namelist\\x3d\"+w+\"\\x26img\\x3d1\\x26\";k\u0026\u0026(c+=\"land\\x3d\"+k+\"\\x26\");p\u0026\u0026(c+=\"tr\\x3d\"+p+\"\\x26\");B\u0026\u0026(c+=\"discount\\x3d\"+m+\"\\x26\");\"\\x26\"===c[c.length-1]\u0026\u0026(c=c.slice(0,-1));var E;e=document.createElement(\"img\");\ne.setAttribute(\"src\",c);e.setAttribute(\"height\",\"1px\");e.setAttribute(\"width\",\"1px\");(E=document.getElementsByTagName(\"script\")[0]).parentNode.insertBefore(e,E)}\nfunction sDisplay(){var a=window.DataLayer\u0026\u0026window.DataLayer.Sale\u0026\u0026window.DataLayer.Sale.Basket?window.DataLayer.Sale.Basket:{};var d=a.displayConfig||{};var c=a.customerStatus||\"\";var e=a.discountAmount?Math.abs(Number(a.discountAmount)):0,b=__readParam(\"dmid\",\"rdMID\",\"\",d);if(!b)return!1;var f=__readParam(\"dtm\",\"tagType\",\"js\",d);var y=\"if\"===(f=\"js\"===f||\"if\"===f||\"img\"===f?f:\"js\")?\"iframe\":\"img\"===f?f:\"script\";b=\"\/\/\"+__readParam(\"ddn\",\"domain\",\"tags.rd.linksynergy.com\",d)+\"\/\"+f+\"\/\"+b;f=__readParam(\"dis\",\n\"includeStatus\",\"false\",d);d=\"\";if(null!=c\u0026\u0026\"\"!=c\u0026\u0026(f\u0026\u0026\"EXISTING\"==c.toUpperCase()||f\u0026\u0026\"RETURNING\"==c.toUpperCase())\u0026\u0026(d=\"R_\"),!a.orderid||!a.conversionType)return!1;c=0;f=d+a.orderid;d=\"\";var g=\"conv\";var l=a.currency;for(var k=0;k\u003C(a.lineitems?a.lineitems.length:0);k++)c+=Number(a.lineitems[k].unitPriceLessTax)*Number(a.lineitems[k].quantity)||Number(a.lineitems[k].unitPrice)*Number(a.lineitems[k].quantity),d+=encodeURIComponent(a.lineitems[k].SKU)+\",\";c=Math.round(100*(c-e))\/100;(d=d.slice(0,-1))\u0026\u0026\n(b=-1\u003Cb.indexOf(\"?\")?b+\"\\x26prodID\\x3d\"+d:b+\"\/?prodID\\x3d\"+d);f\u0026\u0026(b=-1\u003Cb.indexOf(\"?\")?b+\"\\x26orderNumber\\x3d\"+f:b+\"\/?orderNumber\\x3d\"+f);c\u0026\u0026(b=-1\u003Cb.indexOf(\"?\")?b+\"\\x26price\\x3d\"+c:b+\"\/?price\\x3d\"+c);l\u0026\u0026(b=-1\u003Cb.indexOf(\"?\")?b+\"\\x26cur\\x3d\"+l:b+\"\/?cur\\x3d\"+l);g\u0026\u0026(b=-1\u003Cb.indexOf(\"?\")?b+\"\\x26pt\\x3d\"+g:b+\"\/?pt\\x3d\"+g);a=document.createElement(y);a.src=b;\"script\"===y?a.type=\"text\/javascript\":\"iframe\"===y\u0026\u0026a.setAttribute(\"style\",\"display: none;\");document.getElementsByTagName(\"body\")[0].appendChild(a)}\nfunction sSearch(){var a=window.DataLayer\u0026\u0026window.DataLayer.Sale\u0026\u0026window.DataLayer.Sale.Basket?window.DataLayer.Sale.Basket:{},d=a.searchConfig||{},c=__readParam(\"smid\",\"rsMID\",\"\",d);if(!c)return!1;var e=function(){var b=a.discountAmount?Math.abs(Number(a.discountAmount)):0,e=__readParam(\"sct\",\"conversionType\",\"conv\",d);if(!a.orderid)return!1;var f=0;var k=a.orderid;for(var p=0;p\u003C(a.lineitems?a.lineitems.length:0);p++)f+=Number(a.lineitems[p].unitPrice)*Number(a.lineitems[p].quantity);f=Math.round(100*\n(f-b))\/100;window.DataLayer.Sale.Basket;b=[];b[0]=\"id\\x3d\"+c;b[1]=\"type\\x3d\"+e;b[2]=\"val\\x3d\"+f;b[3]=\"orderId\\x3d\"+k;b[4]=\"promoCode\\x3d\"+a.discountCode||\"\";b[5]=\"valueCurrency\\x3d\"+a.currency||\"USD\";b[6]=\"GCID\\x3d\";b[7]=\"kw\\x3d\";b[8]=\"product\\x3d\";k_trackevent(b,\"113\")},b=-1\u003Cdocument.location.protocol.indexOf(\"s\")?\"https:\/\/\":\"http:\/\/\";b+=\"113.xg4ken.com\/media\/getpx.php?cid\\x3d\"+c;var f=document.createElement(\"script\");f.type=\"text\/javascript\";f.src=b;f.onload=e;f.onreadystatechange=function(){\"complete\"!=\nthis.readyState\u0026\u0026\"loaded\"!=this.readyState||e()};document.getElementsByTagName(\"head\")[0].appendChild(f)}sRAN();sDisplay();sSearch();\u003C\/script\u003E\n"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":235
    },{
      "function":"__html",
      "metadata":["map"],
      "once_per_event":true,
      "vtp_html":["template","\u003Cscript type=\"text\/gtmscript\"\u003Evar ecom=",["escape",["macro",41],8,16],",pagecat=",["escape",["macro",117],8,16],",cartcontent=",["escape",["macro",118],8,16],",ScarabQueue=ScarabQueue||[];(function(a){if(!document.getElementById(a)){var b=document.createElement(\"script\");b.id=a;b.src=\"\/\/cdn.scarabresearch.com\/js\/1BFBB8CDEA34505F\/scarab-v2.js\";a=document.getElementsByTagName(\"script\")[0];a.parentNode.insertBefore(b,a)}})(\"scarab-js-api\");null!==",["escape",["macro",103],8,16],"\u0026\u0026ScarabQueue.push([\"setEmail\",",["escape",["macro",103],8,16],"]);\necom\u0026\u0026ecom.detail\u0026\u0026ScarabQueue.push([\"view\",ecom.detail.products[0].dimension2]);pagecat\u0026\u0026\"undefined\"!=typeof pagecat\u0026\u0026\"\"!=pagecat\u0026\u0026ScarabQueue.push([\"category\",pagecat]);\"Search Page\"==",["escape",["macro",21],8,16],"\u0026\u0026ScarabQueue.push([\"searchTerm\",",["escape",["macro",109],8,16],"]);\"object\"==typeof cartcontent\u0026\u0026ScarabQueue.push([\"cart\",cartcontent]);\nif(ecom\u0026\u0026ecom.purchase){for(var emarsys_purchase_command={orderId:ecom.purchase.actionField.id,items:[]},i=0;i\u003Cecom.purchase.products.length;i++)emarsys_purchase_command.items.push({item:ecom.purchase.products[i].dimension2,quantity:ecom.purchase.products[i].quantity,price:ecom.purchase.products[i].price*ecom.purchase.products[i].quantity});ScarabQueue.push([\"purchase\",emarsys_purchase_command])}ScarabQueue.push([\"go\"]);\u003C\/script\u003E"],
      "vtp_supportDocumentWrite":false,
      "vtp_enableIframeMode":false,
      "vtp_enableEditJsMacroBehavior":false,
      "tag_id":249
    }],
  "predicates":[{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"products"
    },{
      "function":"_cn",
      "arg0":["macro",1],
      "arg1":"staging.thereformation.com"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.dom"
    },{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"confirmation"
    },{
      "function":"_cn",
      "arg0":["macro",4],
      "arg1":"true"
    },{
      "function":"_cn",
      "arg0":["macro",1],
      "arg1":"weblinc.com"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.js"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"pageView"
    },{
      "function":"_cn",
      "arg0":["macro",5],
      "arg1":"pdp-view-event"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"pdp-view-event"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"productView"
    },{
      "function":"_re",
      "arg0":["macro",2],
      "arg1":".*"
    },{
      "function":"_cn",
      "arg0":["macro",6],
      "arg1":"cart"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.load"
    },{
      "function":"_eq",
      "arg0":["macro",12],
      "arg1":"home"
    },{
      "function":"_eq",
      "arg0":["macro",12],
      "arg1":"category"
    },{
      "function":"_eq",
      "arg0":["macro",12],
      "arg1":"other"
    },{
      "function":"_eq",
      "arg0":["macro",12],
      "arg1":"product"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"newsletterSignup"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"accountLogout"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"categoryFilterApplied"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"categoryFilterRemoved"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"categoryClearFilters"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"categoryViewApplied"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"categorySortApplied"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"favorite"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"unfavorite"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"addToCart"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"productClick"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"productImpression"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"removeFromCart"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"checkout"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"purchase"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"accountSignup"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"accountLogin"
    },{
      "function":"_cn",
      "arg0":["macro",36],
      "arg1":"google.com\/maps"
    },{
      "function":"_cn",
      "arg0":["macro",37],
      "arg1":"\/pages\/stores"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.linkClick"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_284($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",36],
      "arg1":"tel"
    },{
      "function":"_cn",
      "arg0":["macro",37],
      "arg1":"\/contact"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_285($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",36],
      "arg1":"mailto"
    },{
      "function":"_re",
      "arg0":["macro",37],
      "arg1":"contact|\/other-contacts",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_286($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"formSubmit"
    },{
      "function":"_cn",
      "arg0":["macro",36],
      "arg1":"sms"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_287($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"productDetailImpression"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"accountForgotPassword"
    },{
      "function":"_eq",
      "arg0":["macro",23],
      "arg1":"No"
    },{
      "function":"_eq",
      "arg0":["macro",6],
      "arg1":"\/users\/orders"
    },{
      "function":"_eq",
      "arg0":["macro",6],
      "arg1":"\/orders\/status"
    },{
      "function":"_cn",
      "arg0":["macro",6],
      "arg1":"\/users\/orders\/"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"account-button--return"
    },{
      "function":"_re",
      "arg0":["macro",27],
      "arg1":"active|cancel"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.click"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"radio-button__text radio-button"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"account-button--cancel"
    },{
      "function":"_cn",
      "arg0":["macro",6],
      "arg1":"\/users\/returns\/review\/"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"refundConfirmation"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"button--large button--primary"
    },{
      "function":"_eq",
      "arg0":["macro",39],
      "arg1":"Print return label"
    },{
      "function":"_eq",
      "arg0":["macro",6],
      "arg1":"\/users\/returns"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_325($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"Product Detail Page"
    },{
      "function":"_eq",
      "arg0":["macro",27],
      "arg1":"share-buttons__button"
    },{
      "function":"_re",
      "arg0":["macro",39],
      "arg1":"Facebook|Pinterest|Twitter",
      "ignore_case":true
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_335($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.elementVisibility"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_353($|,)))"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"ui-dialog-email__close"
    },{
      "function":"_eq",
      "arg0":["macro",44],
      "arg1":"true"
    },{
      "function":"_cn",
      "arg0":["macro",37],
      "arg1":"\/orders\/status"
    },{
      "function":"_css",
      "arg0":["macro",45],
      "arg1":"div.cart-summary.cart-summary--add-cart.cart-summary--mini-bag p.cart-summary__cart-action a"
    },{
      "function":"_cn",
      "arg0":["macro",39],
      "arg1":"View bag"
    },{
      "function":"_css",
      "arg0":["macro",45],
      "arg1":"div.cart-summary.cart-summary--add-cart.cart-summary--mini-bag a.button.button--large.button--inverse-color.button--mini-bag"
    },{
      "function":"_css",
      "arg0":["macro",45],
      "arg1":"div.cart-summary.cart-summary--add-cart.cart-summary--mini-bag p.cart-summary__cart-action"
    },{
      "function":"_eq",
      "arg0":["macro",27],
      "arg1":"button button--large button--transparent"
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"cart-summary__close"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_371($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_370($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",6],
      "arg1":"\/orders\/returns"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"waitlistSignup"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gadynamic"
    },{
      "function":"_css",
      "arg0":["macro",45],
      "arg1":"div.pdp-size-options__size-button label.pdp-size-options__size-label"
    },{
      "function":"_cn",
      "arg0":["macro",37],
      "arg1":"\/products\/"
    },{
      "function":"_eq",
      "arg0":["macro",39],
      "arg1":"Size guide"
    },{
      "function":"_eq",
      "arg0":["macro",27],
      "arg1":"pdp-thumbs__primary-image-link"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_419($|,)))"
    },{
      "function":"_re",
      "arg0":["macro",47],
      "arg1":"pdp-accordion__header ui-accordion-header|collapsed",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",47],
      "arg1":"active"
    },{
      "function":"_re",
      "arg0":["macro",27],
      "arg1":"pdp-accordion__header ui-accordion-header|collapsed",
      "ignore_case":true
    },{
      "function":"_cn",
      "arg0":["macro",27],
      "arg1":"active"
    },{
      "function":"_eq",
      "arg0":["macro",27],
      "arg1":"pdp-breadcrumbs__link"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"Order Confirmation Page"
    },{
      "function":"_cn",
      "arg0":["macro",1],
      "arg1":"thereformation.com"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"addToCart"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"removeFromCart"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"checkoutOrderPlaced"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"signup"
    },{
      "function":"_cn",
      "arg0":["macro",72],
      "arg1":"login__button"
    },{
      "function":"_cn",
      "arg0":["macro",1],
      "arg1":"www.thereformation.com"
    },{
      "function":"_cn",
      "arg0":["macro",73],
      "arg1":"Sign up"
    },{
      "function":"_eq",
      "arg0":["macro",72],
      "arg1":"[object SVGAnimatedString]"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"favorite"
    },{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"\/checkout"
    },{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"categories"
    },{
      "function":"_cn",
      "arg0":["macro",73],
      "arg1":"Join the waitlist"
    },{
      "function":"_cn",
      "arg0":["macro",72],
      "arg1":"button--pdp"
    },{
      "function":"_cn",
      "arg0":["macro",72],
      "arg1":"button--inactive"
    },{
      "function":"_cn",
      "arg0":["macro",0],
      "arg1":"www.thereformation.com"
    },{
      "function":"_cn",
      "arg0":["macro",5],
      "arg1":"addToCart"
    },{
      "function":"_eq",
      "arg0":["macro",5],
      "arg1":"categoryView"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"categoryView"
    },{
      "function":"_cn",
      "arg0":["macro",98],
      "arg1":"cart"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"Home Page"
    },{
      "function":"_cn",
      "arg0":["macro",72],
      "arg1":"quickadd_size--waitlist"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"Search Page"
    },{
      "function":"_sw",
      "arg0":["macro",6],
      "arg1":"\/categories\/"
    },{
      "function":"_eq",
      "arg0":["macro",21],
      "arg1":"Category Page"
    },{
      "function":"_re",
      "arg0":["macro",21],
      "arg1":"Category Page|Order Confirmation Page|Product Detail Page",
      "ignore_case":true
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"gtm.triggerGroup"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_382($|,)))"
    },{
      "function":"_sw",
      "arg0":["macro",100],
      "arg1":"G"
    },{
      "function":"_re",
      "arg0":["macro",38],
      "arg1":"(^$|((^|,)965830_381($|,)))"
    },{
      "function":"_eq",
      "arg0":["macro",2],
      "arg1":"cartUpdate"
    }],
  "rules":[
    [["if",0,1,2],["add",1]],
    [["if",2,3,4,5],["add",2,6]],
    [["if",6],["add",3,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,92,95,96,97,98,99,100]],
    [["if",7],["add",4,10,90,101,115,125]],
    [["if",8,9],["add",5]],
    [["if",10,11],["add",5,120]],
    [["if",12,13],["add",7,57]],
    [["if",2,14],["add",8]],
    [["if",2,15],["add",8]],
    [["if",2,16],["add",8]],
    [["if",2,17],["add",9,56,104]],
    [["if",18],["add",11,129]],
    [["if",19],["add",12]],
    [["if",20],["add",13]],
    [["if",21],["add",14]],
    [["if",22],["add",15]],
    [["if",23],["add",16]],
    [["if",24],["add",17]],
    [["if",25],["add",18]],
    [["if",26],["add",19]],
    [["if",27],["add",20,127,132]],
    [["if",28],["add",21]],
    [["if",29],["add",22]],
    [["if",30],["add",23]],
    [["if",31],["add",24]],
    [["if",32],["add",25,58,93,122,126,133,135]],
    [["if",33],["add",26,130]],
    [["if",34],["add",27]],
    [["if",35,36,37,38],["add",28]],
    [["if",37,39,40,41],["add",29]],
    [["if",37,42,43,44],["add",30]],
    [["if",45],["add",31]],
    [["if",37,40,46,47],["add",32]],
    [["if",48],["add",33,91,102,134]],
    [["if",49],["add",34]],
    [["if",32,50],["add",35]],
    [["if",7,51],["add",36]],
    [["if",7,52],["add",37]],
    [["if",7,53],["add",38]],
    [["if",53,54,56],["unless",55],["add",39]],
    [["if",53,56,57],["add",40]],
    [["if",53,56,58],["add",41]],
    [["if",7,59],["add",42]],
    [["if",60],["add",43]],
    [["if",37,61,62,63,64],["add",44]],
    [["if",37,65,66,67,68],["add",45]],
    [["if",69,70],["add",46]],
    [["if",56,71],["unless",72,73],["add",47]],
    [["if",56,74,75],["add",48]],
    [["if",56,75,76],["add",48]],
    [["if",56,75,77],["add",48]],
    [["if",56,75,78],["add",48]],
    [["if",56,79],["add",49]],
    [["if",69,80],["add",50]],
    [["if",69,81],["add",51]],
    [["if",7,82],["add",52]],
    [["if",83],["add",53]],
    [["if",13],["add",54]],
    [["if",84],["add",55]],
    [["if",56,85,86],["add",59]],
    [["if",56,86,87],["add",60]],
    [["if",37,86,88,89],["add",61]],
    [["if",56,86,90],["unless",91],["add",62]],
    [["if",56,86,92],["unless",93],["add",63]],
    [["if",56,86,94],["add",64]],
    [["if",7,95],["add",94],["block",125]],
    [["if",6,96],["add",103]],
    [["if",0,11,97],["add",105]],
    [["if",11,98],["add",106]],
    [["if",2,3],["add",107,112]],
    [["if",99],["add",107]],
    [["if",11,100],["add",108]],
    [["if",56,101,102],["unless",103],["add",109]],
    [["if",0,56,104],["add",110]],
    [["if",11,105],["add",110]],
    [["if",6,106],["add",111]],
    [["if",56,104,107],["add",113]],
    [["if",56,108,109,111],["unless",110],["add",114]],
    [["if",5,56,101],["unless",103],["add",116]],
    [["if",11,97,102,107],["add",117]],
    [["if",5,11,107,112],["add",117,118]],
    [["if",113,114],["add",119]],
    [["if",31,115],["add",121]],
    [["if",7,116],["add",123]],
    [["if",5,6],["add",0]],
    [["if",56,102,117],["add",124]],
    [["if",7,118],["add",128],["block",125]],
    [["if",29,119],["add",131]],
    [["if",7,120],["add",136]],
    [["if",7],["unless",121],["add",136]],
    [["if",122,123],["add",136]],
    [["if",32,124],["add",136]],
    [["if",122,125],["add",136]],
    [["if",126],["add",136]]]
},
"runtime":[]




};
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var ba,ca="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},da;if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={Mf:!0},ha={};try{ha.__proto__=fa;ea=ha.Mf;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ia=da,ja=this||self,la=/^[\w+/_-]+[=]{0,2}$/,na=null;var oa=function(){},pa=function(a){return"function"==typeof a},g=function(a){return"string"==typeof a},qa=function(a){return"number"==typeof a&&!isNaN(a)},ra=function(a){return"[object Array]"==Object.prototype.toString.call(Object(a))},ta=function(a,b){if(Array.prototype.indexOf){var c=a.indexOf(b);return"number"==typeof c?c:-1}for(var d=0;d<a.length;d++)if(a[d]===b)return d;return-1},va=function(a,b){if(a&&ra(a))for(var c=0;c<a.length;c++)if(a[c]&&b(a[c]))return a[c]},wa=function(a,b){if(!qa(a)||
!qa(b)||a>b)a=0,b=2147483647;return Math.floor(Math.random()*(b-a+1)+a)},ya=function(a,b){for(var c=new xa,d=0;d<a.length;d++)c.set(a[d],!0);for(var e=0;e<b.length;e++)if(c.get(b[e]))return!0;return!1},za=function(a,b){for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b(c,a[c])},Aa=function(a){return Math.round(Number(a))||0},Ba=function(a){return"false"==String(a).toLowerCase()?!1:!!a},Ca=function(a){var b=[];if(ra(a))for(var c=0;c<a.length;c++)b.push(String(a[c]));return b},Da=function(a){return a?
a.replace(/^\s+|\s+$/g,""):""},Fa=function(){return(new Date).getTime()},xa=function(){this.prefix="gtm.";this.values={}};xa.prototype.set=function(a,b){this.values[this.prefix+a]=b};xa.prototype.get=function(a){return this.values[this.prefix+a]};
var Ga=function(a,b,c){return a&&a.hasOwnProperty(b)?a[b]:c},Ha=function(a){var b=!1;return function(){if(!b)try{a()}catch(c){}b=!0}},Ia=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])},Ja=function(a){for(var b in a)if(a.hasOwnProperty(b))return!0;return!1},Ka=function(a,b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]),c.push.apply(c,b[a[d]]||[]);return c},Ma=function(a,b){for(var c={},d=c,e=a.split("."),f=0;f<e.length-1;f++)d=d[e[f]]={};d[e[e.length-1]]=b;return c},Na=function(a){var b=
[];za(a,function(c,d){10>c.length&&d&&b.push(c)});return b.join(",")};/*
 jQuery v1.9.1 (c) 2005, 2012 jQuery Foundation, Inc. jquery.org/license. */
var Oa=/\[object (Boolean|Number|String|Function|Array|Date|RegExp)\]/,Pa=function(a){if(null==a)return String(a);var b=Oa.exec(Object.prototype.toString.call(Object(a)));return b?b[1].toLowerCase():"object"},Ra=function(a,b){return Object.prototype.hasOwnProperty.call(Object(a),b)},Sa=function(a){if(!a||"object"!=Pa(a)||a.nodeType||a==a.window)return!1;try{if(a.constructor&&!Ra(a,"constructor")&&!Ra(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}for(var b in a);return void 0===
b||Ra(a,b)},n=function(a,b){var c=b||("array"==Pa(a)?[]:{}),d;for(d in a)if(Ra(a,d)){var e=a[d];"array"==Pa(e)?("array"!=Pa(c[d])&&(c[d]=[]),c[d]=n(e,c[d])):Sa(e)?(Sa(c[d])||(c[d]={}),c[d]=n(e,c[d])):c[d]=e}return c};
var Ta=[],Ua={"\x00":"&#0;",'"':"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\x0B":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","\u0085":"&#133;","\u00a0":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"},Va=function(a){return Ua[a]},Wa=/[\x00\x22\x26\x27\x3c\x3e]/g;var $a=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g,ab={"\x00":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\x0B":"\\x0b",
"\f":"\\f","\r":"\\r",'"':"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","\u0085":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029",$:"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"},bb=function(a){return ab[a]};Ta[7]=function(a){return String(a).replace($a,bb)};
Ta[8]=function(a){if(null==a)return" null ";switch(typeof a){case "boolean":case "number":return" "+a+" ";default:return"'"+String(String(a)).replace($a,bb)+"'"}};var jb=/['()]/g,kb=function(a){return"%"+a.charCodeAt(0).toString(16)};Ta[12]=function(a){var b=
encodeURIComponent(String(a));jb.lastIndex=0;return jb.test(b)?b.replace(jb,kb):b};var lb=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g,mb={"\x00":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\x0B":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10",
"\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20",'"':"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","\u007f":"%7F","\u0085":"%C2%85","\u00a0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86",
"\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"},ob=function(a){return mb[a]};Ta[16]=function(a){return a};var qb;
var rb=[],sb=[],tb=[],ub=[],vb=[],wb={},xb,yb,zb,Ab=function(a,b){var c={};c["function"]="__"+a;for(var d in b)b.hasOwnProperty(d)&&(c["vtp_"+d]=b[d]);return c},Bb=function(a,b){var c=a["function"];if(!c)throw Error("Error: No function name given for function call.");var d=wb[c],e={},f;for(f in a)a.hasOwnProperty(f)&&0===f.indexOf("vtp_")&&(e[void 0!==d?f:f.substr(4)]=a[f]);return void 0!==d?d(e):qb(c,e,b)},Eb=function(a,b,c){c=c||[];var d={},e;for(e in a)a.hasOwnProperty(e)&&(d[e]=Db(a[e],b,c));
return d},Fb=function(a){var b=a["function"];if(!b)throw"Error: No function name given for function call.";var c=wb[b];return c?c.priorityOverride||0:0},Db=function(a,b,c){if(ra(a)){var d;switch(a[0]){case "function_id":return a[1];case "list":d=[];for(var e=1;e<a.length;e++)d.push(Db(a[e],b,c));return d;case "macro":var f=a[1];if(c[f])return;var h=rb[f];if(!h||b.Yc(h))return;c[f]=!0;try{var k=Eb(h,b,c);k.vtp_gtmEventId=b.id;d=Bb(k,b);zb&&(d=zb.mg(d,k))}catch(y){b.Ge&&b.Ge(y,Number(f)),d=!1}c[f]=
!1;return d;case "map":d={};for(var l=1;l<a.length;l+=2)d[Db(a[l],b,c)]=Db(a[l+1],b,c);return d;case "template":d=[];for(var m=!1,p=1;p<a.length;p++){var r=Db(a[p],b,c);yb&&(m=m||r===yb.Kb);d.push(r)}return yb&&m?yb.pg(d):d.join("");case "escape":d=Db(a[1],b,c);if(yb&&ra(a[1])&&"macro"===a[1][0]&&yb.Pg(a))return yb.hh(d);d=String(d);for(var u=2;u<a.length;u++)Ta[a[u]]&&(d=Ta[a[u]](d));return d;case "tag":var q=a[1];if(!ub[q])throw Error("Unable to resolve tag reference "+q+".");return d={te:a[2],
index:q};case "zb":var t={arg0:a[2],arg1:a[3],ignore_case:a[5]};t["function"]=a[1];var v=Gb(t,b,c),w=!!a[4];return w||2!==v?w!==(1===v):null;default:throw Error("Attempting to expand unknown Value type: "+a[0]+".");}}return a},Gb=function(a,b,c){try{return xb(Eb(a,b,c))}catch(d){JSON.stringify(a)}return 2};var Hb=function(){var a=function(b){return{toString:function(){return b}}};return{Cd:a("convert_case_to"),Dd:a("convert_false_to"),Ed:a("convert_null_to"),Fd:a("convert_true_to"),Gd:a("convert_undefined_to"),Oh:a("debug_mode_metadata"),ya:a("function"),kf:a("instance_name"),qf:a("live_only"),sf:a("malware_disabled"),tf:a("metadata"),Ph:a("original_vendor_template_id"),xf:a("once_per_event"),Nd:a("once_per_load"),Vd:a("setup_tags"),Xd:a("tag_id"),Yd:a("teardown_tags")}}();var Ib=null,Lb=function(a){function b(r){for(var u=0;u<r.length;u++)d[r[u]]=!0}var c=[],d=[];Ib=Jb(a);for(var e=0;e<sb.length;e++){var f=sb[e],h=Kb(f);if(h){for(var k=f.add||[],l=0;l<k.length;l++)c[k[l]]=!0;b(f.block||[])}else null===h&&b(f.block||[])}for(var m=[],p=0;p<ub.length;p++)c[p]&&!d[p]&&(m[p]=!0);return m},Kb=function(a){for(var b=a["if"]||[],c=0;c<b.length;c++){var d=Ib(b[c]);if(0===d)return!1;if(2===d)return null}for(var e=a.unless||[],f=0;f<e.length;f++){var h=Ib(e[f]);if(2===h)return null;
if(1===h)return!1}return!0},Jb=function(a){var b=[];return function(c){void 0===b[c]&&(b[c]=Gb(tb[c],a));return b[c]}};/*
 Copyright (c) 2014 Derek Brans, MIT license https://github.com/krux/postscribe/blob/master/LICENSE. Portions derived from simplehtmlparser, which is licensed under the Apache License, Version 2.0 */
var C={wa:"_ee",Kc:"_syn",Rh:"_uei",Ac:"event_callback",Jb:"event_timeout",F:"gtag.config",da:"allow_ad_personalization_signals",Bc:"restricted_data_processing",$a:"allow_google_signals",fa:"cookie_expires",Ib:"cookie_update",ab:"session_duration",ka:"user_properties",va:"transport_url",M:"ads_data_redaction"};C.Ce=[C.da,C.$a,C.Ib];C.Fe=[C.fa,C.Jb,C.ab];var D=window,F=document,gc=navigator,hc=F.currentScript&&F.currentScript.src,ic=function(a,b){var c=D[a];D[a]=void 0===c?b:c;return D[a]},jc=function(a,b){b&&(a.addEventListener?a.onload=b:a.onreadystatechange=function(){a.readyState in{loaded:1,complete:1}&&(a.onreadystatechange=null,b())})},kc=function(a,b,c){var d=F.createElement("script");d.type="text/javascript";d.async=!0;d.src=a;jc(d,b);c&&(d.onerror=c);var e;if(null===na)b:{var f=ja.document,h=f.querySelector&&f.querySelector("script[nonce]");
if(h){var k=h.nonce||h.getAttribute("nonce");if(k&&la.test(k)){na=k;break b}}na=""}e=na;e&&d.setAttribute("nonce",e);var l=F.getElementsByTagName("script")[0]||F.body||F.head;l.parentNode.insertBefore(d,l);return d},lc=function(){if(hc){var a=hc.toLowerCase();if(0===a.indexOf("https://"))return 2;if(0===a.indexOf("http://"))return 3}return 1},mc=function(a,b){var c=F.createElement("iframe");c.height="0";c.width="0";c.style.display="none";c.style.visibility="hidden";var d=F.body&&F.body.lastChild||
F.body||F.head;d.parentNode.insertBefore(c,d);jc(c,b);void 0!==a&&(c.src=a);return c},nc=function(a,b,c){var d=new Image(1,1);d.onload=function(){d.onload=null;b&&b()};d.onerror=function(){d.onerror=null;c&&c()};d.src=a;return d},oc=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,!!d):a.attachEvent&&a.attachEvent("on"+b,c)},pc=function(a,b,c){a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent("on"+b,c)},G=function(a){D.setTimeout(a,0)},qc=function(a,b){return a&&
b&&a.attributes&&a.attributes[b]?a.attributes[b].value:null},rc=function(a){var b=a.innerText||a.textContent||"";b&&" "!=b&&(b=b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,""));b&&(b=b.replace(/(\xa0+|\s{2,}|\n|\r\t)/g," "));return b},sc=function(a){var b=F.createElement("div");b.innerHTML="A<div>"+a+"</div>";b=b.lastChild;for(var c=[];b.firstChild;)c.push(b.removeChild(b.firstChild));return c},tc=function(a,b,c){c=c||100;for(var d={},e=0;e<b.length;e++)d[b[e]]=!0;for(var f=a,h=0;f&&h<=c;h++){if(d[String(f.tagName).toLowerCase()])return f;
f=f.parentElement}return null},uc=function(a){gc.sendBeacon&&gc.sendBeacon(a)||nc(a)},vc=function(a,b){var c=a[b];c&&"string"===typeof c.animVal&&(c=c.animVal);return c};var wc={},I=function(a,b){wc[a]=wc[a]||[];wc[a][b]=!0},xc=function(a){for(var b=[],c=wc[a]||[],d=0;d<c.length;d++)c[d]&&(b[Math.floor(d/6)]^=1<<d%6);for(var e=0;e<b.length;e++)b[e]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(b[e]||0);return b.join("")};var yc=[];function zc(){var a=ic("google_tag_data",{});a.ics||(a.ics={entries:{},set:Ac,update:Bc,addListener:Cc,notifyListeners:Dc,active:!1});return a.ics}
function Ac(a,b,c,d,e,f){var h=zc();h.active=!0;if(void 0!=b){var k=h.entries,l=k[a]||{},m=l.region,p=c&&g(c)?c.toUpperCase():void 0;d=d.toUpperCase();e=e.toUpperCase();if(p===e||(p===d?m!==e:!p&&!m)){var r=!!(f&&0<f&&void 0===l.update),u={region:p,initial:"granted"===b,update:l.update,quiet:r};k[a]=u;r&&D.setTimeout(function(){k[a]===u&&u.quiet&&(u.quiet=!1,Fc(a),Dc(),I("TAGGING",2))},f)}}}
function Bc(a,b){var c=zc();c.active=!0;if(void 0!=b){var d=Gc(a),e=c.entries,f=e[a]=e[a]||{};f.update="granted"===b;var h=Gc(a);f.quiet?(f.quiet=!1,Fc(a)):h!==d&&Fc(a)}}function Cc(a,b){yc.push({ne:a,Ag:b})}function Fc(a){for(var b=0;b<yc.length;++b){var c=yc[b];ra(c.ne)&&-1!==c.ne.indexOf(a)&&(c.Pe=!0)}}function Dc(){for(var a=0;a<yc.length;++a){var b=yc[a];if(b.Pe){b.Pe=!1;try{b.Ag.call()}catch(c){}}}}
var Gc=function(a){var b=zc().entries[a]||{};return void 0!==b.update?b.update:void 0!==b.initial?b.initial:void 0},Hc=function(a){return!(zc().entries[a]||{}).quiet},Ic=function(){return zc().active},Jc=function(a,b){zc().addListener(a,b)},Kc=function(a,b){function c(){for(var e=0;e<b.length;e++)if(!Hc(b[e]))return!0;return!1}if(c()){var d=!1;Jc(b,function(){d||c()||(d=!0,a())})}else a()},Lc=function(a,b){if(!1===Gc(b)){var c=!1;Jc([b],function(){!c&&Gc(b)&&(a(),c=!0)})}};var Mc=[C.o,C.J],Nc=function(a){var b=a[C.nh];b&&I("GTM",40);var c=a[C.uh];c&&I("GTM",41);for(var d=ra(b)?b:[b],e=0;e<d.length;++e)for(var f=0;f<Mc.length;f++){var h=Mc[f],k=a[Mc[f]],l=d[e];zc().set(h,k,l,"US","US-CA",c)}},Oc=function(a){for(var b=0;b<Mc.length;b++){var c=Mc[b],d=a[Mc[b]];zc().update(c,d)}zc().notifyListeners()},Pc=function(a){var b=Gc(a);return void 0!=b?b:!0},Qc=function(){for(var a=[],b=0;b<Mc.length;b++){var c=Gc(Mc[b]);a[b]=!0===c?"1":!1===c?"0":"-"}return"G1"+
a.join("")},Rc=function(a){Lc(a,C.o)},Sc=function(a,b){Kc(a,b)};var Uc=function(a){return Tc?F.querySelectorAll(a):null},Vc=function(a,b){if(!Tc)return null;if(Element.prototype.closest)try{return a.closest(b)}catch(e){return null}var c=Element.prototype.matches||Element.prototype.webkitMatchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector,d=a;if(!F.documentElement.contains(d))return null;do{try{if(c.call(d,b))return d}catch(e){break}d=d.parentElement||d.parentNode}while(null!==d&&1===d.nodeType);
return null},Wc=!1;if(F.querySelectorAll)try{var Xc=F.querySelectorAll(":root");Xc&&1==Xc.length&&Xc[0]==F.documentElement&&(Wc=!0)}catch(a){}var Tc=Wc;var kd={},ld=null,md=Math.random();kd.s="GTM-PWDHTK";kd.Ob="5e1";kd.Md="";var nd={__cl:!0,__ecl:!0,__ehl:!0,__evl:!0,__fal:!0,__fil:!0,__fsl:!0,__hl:!0,__jel:!0,__lcl:!0,__sdl:!0,__tl:!0,__ytl:!0,__paused:!0,__tg:!0},od="www.googletagmanager.com/gtm.js";
var qd=od,rd=null,sd=null,td=null,ud="//www.googletagmanager.com/a?id="+kd.s+"&cv=182",vd={},wd={},xd=function(){var a=ld.sequence||0;ld.sequence=a+1;return a};
var yd=function(){return"&tc="+ub.filter(function(a){return a}).length},Bd=function(){zd||(zd=D.setTimeout(Ad,500))},Ad=function(){zd&&(D.clearTimeout(zd),zd=void 0);void 0===Cd||Dd[Cd]&&!Ed&&!Fd||(Gd[Cd]||Hd.Rg()||0>=Id--?(I("GTM",1),Gd[Cd]=!0):(Hd.ph(),nc(Jd()),Dd[Cd]=!0,Kd=Ld=Fd=Ed=""))},Jd=function(){var a=Cd;if(void 0===a)return"";var b=xc("GTM"),c=xc("TAGGING");return[Md,Dd[a]?"":"&es=1",Nd[a],b?"&u="+b:"",c?"&ut="+c:"",yd(),Ed,Fd,Ld,Kd,"&z=0"].join("")},Od=function(){return[ud,"&v=3&t=t","&pid="+
wa(),"&rv="+kd.Ob].join("")},Pd="0.005000">Math.random(),Md=Od(),Qd=function(){Md=Od()},Dd={},Ed="",Fd="",Kd="",Ld="",Cd=void 0,Nd={},Gd={},zd=void 0,Hd=function(a,b){var c=0,d=0;return{Rg:function(){if(c<a)return!1;Fa()-d>=b&&(c=0);return c>=a},ph:function(){Fa()-d>=b&&(c=0);c++;d=Fa()}}}(2,1E3),Id=1E3,Rd=function(a,b){if(Pd&&!Gd[a]&&Cd!==a){Ad();Cd=a;Kd=Ed="";var c;c=0===b.indexOf("gtm.")?encodeURIComponent(b):"*";Nd[a]="&e="+c+"&eid="+a;Bd()}},Sd=function(a,b,c){if(Pd&&!Gd[a]&&
b){a!==Cd&&(Ad(),Cd=a);var d,e=String(b[Hb.ya]||"").replace(/_/g,"");0===e.indexOf("cvt")&&(e="cvt");d=e;var f=c+d;Ed=Ed?Ed+"."+f:"&tr="+f;var h=b["function"];if(!h)throw Error("Error: No function name given for function call.");var k=(wb[h]?"1":"2")+d;Kd=Kd?Kd+"."+k:"&ti="+k;Bd();2022<=Jd().length&&Ad()}},Td=function(a,b,c){if(Pd&&!Gd[a]){a!==Cd&&(Ad(),Cd=a);var d=c+b;Fd=Fd?Fd+
"."+d:"&epr="+d;Bd();2022<=Jd().length&&Ad()}};var Ud={},Vd=new xa,Wd={},Xd={},$d={name:"dataLayer",set:function(a,b){n(Ma(a,b),Wd);Yd()},get:function(a){return Zd(a,2)},reset:function(){Vd=new xa;Wd={};Yd()}},Zd=function(a,b){if(2!=b){var c=Vd.get(a);if(Pd){var d=ae(a);c!==d&&I("GTM",5)}return c}return ae(a)},ae=function(a){var b=a.split("."),c=!1,d=void 0;return c?d:be(b)},be=function(a){for(var b=Wd,c=0;c<a.length;c++){if(null===b)return!1;if(void 0===b)break;b=b[a[c]]}return b};
var ce=function(a,b){Xd.hasOwnProperty(a)||(Vd.set(a,b),n(Ma(a,b),Wd),Yd())},Yd=function(a){za(Xd,function(b,c){Vd.set(b,c);n(Ma(b,void 0),Wd);n(Ma(b,c),Wd);a&&delete Xd[b]})},de=function(a,b,c){Ud[a]=Ud[a]||{};var d=1!==c?ae(b):Vd.get(b);"array"===Pa(d)||"object"===Pa(d)?Ud[a][b]=n(d):Ud[a][b]=d},ee=function(a,b){if(Ud[a])return Ud[a][b]},fe=function(a,b){Ud[a]&&delete Ud[a][b]};var ie=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;var je=/:[0-9]+$/,ke=function(a,b,c){for(var d=a.split("&"),e=0;e<d.length;e++){var f=d[e].split("=");if(decodeURIComponent(f[0]).replace(/\+/g," ")===b){var h=f.slice(1).join("=");return c?h:decodeURIComponent(h).replace(/\+/g," ")}}},ne=function(a,b,c,d,e){b&&(b=String(b).toLowerCase());if("protocol"===b||"port"===b)a.protocol=le(a.protocol)||le(D.location.protocol);"port"===b?a.port=String(Number(a.hostname?a.port:D.location.port)||("http"==a.protocol?80:"https"==a.protocol?443:"")):"host"===b&&
(a.hostname=(a.hostname||D.location.hostname).replace(je,"").toLowerCase());return me(a,b,c,d,e)},me=function(a,b,c,d,e){var f,h=le(a.protocol);b&&(b=String(b).toLowerCase());switch(b){case "url_no_fragment":f=oe(a);break;case "protocol":f=h;break;case "host":f=a.hostname.replace(je,"").toLowerCase();if(c){var k=/^www\d*\./.exec(f);k&&k[0]&&(f=f.substr(k[0].length))}break;case "port":f=String(Number(a.port)||("http"==h?80:"https"==h?443:""));break;case "path":a.pathname||a.hostname||I("TAGGING",1);
f="/"==a.pathname.substr(0,1)?a.pathname:"/"+a.pathname;var l=f.split("/");0<=ta(d||[],l[l.length-1])&&(l[l.length-1]="");f=l.join("/");break;case "query":f=a.search.replace("?","");e&&(f=ke(f,e,void 0));break;case "extension":var m=a.pathname.split(".");f=1<m.length?m[m.length-1]:"";f=f.split("/")[0];break;case "fragment":f=a.hash.replace("#","");break;default:f=a&&a.href}return f},le=function(a){return a?a.replace(":","").toLowerCase():""},oe=function(a){var b="";if(a&&a.href){var c=a.href.indexOf("#");
b=0>c?a.href:a.href.substr(0,c)}return b},pe=function(a){var b=F.createElement("a");a&&(b.href=a);var c=b.pathname;"/"!==c[0]&&(a||I("TAGGING",1),c="/"+c);var d=b.hostname.replace(je,"");return{href:b.href,protocol:b.protocol,host:b.host,hostname:d,pathname:c,search:b.search,hash:b.hash,port:b.port}},qe=function(a){function b(m){var p=m.split("=")[0];return 0>d.indexOf(p)?m:p+"=0"}function c(m){return m.split("&").map(b).filter(function(p){return void 0!=p}).join("&")}var d="gclid dclid gclaw gcldc gclgp gclha gclgf _gl".split(" "),
e=pe(a),f=a.split(/[?#]/)[0],h=e.search,k=e.hash;"?"===h[0]&&(h=h.substring(1));"#"===k[0]&&(k=k.substring(1));h=c(h);k=c(k);""!==h&&(h="?"+h);""!==k&&(k="#"+k);var l=""+f+h+k;"/"===l[l.length-1]&&(l=l.substring(0,l.length-1));return l};function re(a,b,c){for(var d=[],e=b.split(";"),f=0;f<e.length;f++){var h=e[f].split("="),k=h[0].replace(/^\s*|\s*$/g,"");if(k&&k==a){var l=h.slice(1).join("=").replace(/^\s*|\s*$/g,"");l&&c&&(l=decodeURIComponent(l));d.push(l)}}return d};var se={},te=function(a){return void 0==se[a]?!1:se[a]};var ve=function(a,b,c,d){return ue(d)?re(a,String(b||document.cookie),c):[]},ye=function(a,b,c,d,e){if(ue(e)){var f=we(a,d,e);if(1===f.length)return f[0].id;if(0!==f.length){f=xe(f,function(h){return h.Ub},b);if(1===f.length)return f[0].id;f=xe(f,function(h){return h.yb},c);return f[0]?f[0].id:void 0}}};function ze(a,b,c,d){var e=document.cookie;document.cookie=a;var f=document.cookie;return e!=f||void 0!=c&&0<=ve(b,f,!1,d).indexOf(c)}
var De=function(a,b,c){function d(q,t,v){if(null==v)return delete h[t],q;h[t]=v;return q+"; "+t+"="+v}function e(q,t){if(null==t)return delete h[t],q;h[t]=!0;return q+"; "+t}if(!ue(c.Da))return 2;var f;void 0==b?f=a+"=deleted; expires="+(new Date(0)).toUTCString():(c.encode&&(b=encodeURIComponent(b)),b=Ae(b),f=a+"="+b);var h={};f=d(f,"path",c.path);var k;c.expires instanceof Date?k=c.expires.toUTCString():null!=c.expires&&(k=""+c.expires);f=d(f,"expires",k);f=d(f,"max-age",c.ai);f=d(f,"samesite",
c.gi);c.hi&&(f=e(f,"secure"));f=e(f,c.flags);var l=c.domain;if("auto"===l){for(var m=Be(),p=0;p<m.length;++p){var r="none"!==m[p]?m[p]:void 0,u=d(f,"domain",r);if(!Ce(r,c.path)&&ze(u,a,b,c.Da))return 0}return 1}l&&"none"!==l&&(f=d(f,"domain",l));return Ce(l,c.path)?1:ze(f,a,b,c.Da)?0:1},Ee=function(a,b,c){null==c.path&&(c.path="/");c.domain||(c.domain="auto");return De(a,b,c)};
function xe(a,b,c){for(var d=[],e=[],f,h=0;h<a.length;h++){var k=a[h],l=b(k);l===c?d.push(k):void 0===f||l<f?(e=[k],f=l):l===f&&e.push(k)}return 0<d.length?d:e}function we(a,b,c){for(var d=[],e=ve(a,void 0,void 0,c),f=0;f<e.length;f++){var h=e[f].split("."),k=h.shift();if(!b||-1!==b.indexOf(k)){var l=h.shift();l&&(l=l.split("-"),d.push({id:h.join("."),Ub:1*l[0]||1,yb:1*l[1]||1}))}}return d}
var Ae=function(a){a&&1200<a.length&&(a=a.substring(0,1200));return a},Fe=/^(www\.)?google(\.com?)?(\.[a-z]{2})?$/,Ge=/(^|\.)doubleclick\.net$/i,Ce=function(a,b){return Ge.test(document.location.hostname)||"/"===b&&Fe.test(a)},Be=function(){var a=[],b=document.location.hostname.split(".");if(4===b.length){var c=b[b.length-1];if(parseInt(c,10).toString()===c)return["none"]}for(var d=b.length-2;0<=d;d--)a.push(b.slice(d).join("."));var e=document.location.hostname;Ge.test(e)||Fe.test(e)||a.push("none");
return a},ue=function(a){if(!te("gtag_cs_api")||!a||!Ic())return!0;if(!Hc(a))return!1;var b=Gc(a);return null==b?!0:!!b};var He=function(){for(var a=gc.userAgent+(F.cookie||"")+(F.referrer||""),b=a.length,c=D.history.length;0<c;)a+=c--^b++;var d=1,e,f,h;if(a)for(d=0,f=a.length-1;0<=f;f--)h=a.charCodeAt(f),d=(d<<6&268435455)+h+(h<<14),e=d&266338304,d=0!=e?d^e>>21:d;return[Math.round(2147483647*Math.random())^d&2147483647,Math.round(Fa()/1E3)].join(".")},Ke=function(a,b,c,d,e){var f=Ie(b);return ye(a,f,Je(c),d,e)},Le=function(a,b,c,d){var e=""+Ie(c),f=Je(d);1<f&&(e+="-"+f);return[b,e,a].join(".")},Ie=function(a){if(!a)return 1;
a=0===a.indexOf(".")?a.substr(1):a;return a.split(".").length},Je=function(a){if(!a||"/"===a)return 1;"/"!==a[0]&&(a="/"+a);"/"!==a[a.length-1]&&(a+="/");return a.split("/").length-1};function Me(a,b,c){var d,e=a.wb;null==e&&(e=7776E3);0!==e&&(d=new Date((b||Fa())+1E3*e));return{path:a.path,domain:a.domain,flags:a.flags,encode:!!c,expires:d}};var Ne=["1"],Oe={},Se=function(a){var b=Pe(a.prefix);Oe[b]||Qe(b,a.path,a.domain)||(Re(b,He(),a),Qe(b,a.path,a.domain))};function Re(a,b,c){var d=Le(b,"1",c.domain,c.path),e=Me(c);e.Da="ad_storage";Ee(a,d,e)}function Qe(a,b,c){var d=Ke(a,b,c,Ne,"ad_storage");d&&(Oe[a]=d);return d}function Pe(a){return(a||"_gcl")+"_au"};function Te(){for(var a=Ue,b={},c=0;c<a.length;++c)b[a[c]]=c;return b}function Ve(){var a="ABCDEFGHIJKLMNOPQRSTUVWXYZ";a+=a.toLowerCase()+"0123456789-_";return a+"."}var Ue,We;function Xe(a){Ue=Ue||Ve();We=We||Te();for(var b=[],c=0;c<a.length;c+=3){var d=c+1<a.length,e=c+2<a.length,f=a.charCodeAt(c),h=d?a.charCodeAt(c+1):0,k=e?a.charCodeAt(c+2):0,l=f>>2,m=(f&3)<<4|h>>4,p=(h&15)<<2|k>>6,r=k&63;e||(r=64,d||(p=64));b.push(Ue[l],Ue[m],Ue[p],Ue[r])}return b.join("")}
function Ye(a){function b(l){for(;d<a.length;){var m=a.charAt(d++),p=We[m];if(null!=p)return p;if(!/^[\s\xa0]*$/.test(m))throw Error("Unknown base64 encoding at char: "+m);}return l}Ue=Ue||Ve();We=We||Te();for(var c="",d=0;;){var e=b(-1),f=b(0),h=b(64),k=b(64);if(64===k&&-1===e)return c;c+=String.fromCharCode(e<<2|f>>4);64!=h&&(c+=String.fromCharCode(f<<4&240|h>>2),64!=k&&(c+=String.fromCharCode(h<<6&192|k)))}};var Ze;var cf=function(){var a=$e,b=af,c=bf(),d=function(h){a(h.target||h.srcElement||{})},e=function(h){b(h.target||h.srcElement||{})};if(!c.init){oc(F,"mousedown",d);oc(F,"keyup",d);oc(F,"submit",e);var f=HTMLFormElement.prototype.submit;HTMLFormElement.prototype.submit=function(){b(this);f.call(this)};c.init=!0}},df=function(a,b,c,d,e){var f={callback:a,domains:b,fragment:2===c,placement:c,forms:d,sameHost:e};bf().decorators.push(f)},ef=function(a,b,c){for(var d=bf().decorators,e={},f=0;f<d.length;++f){var h=
d[f],k;if(k=!c||h.forms)a:{var l=h.domains,m=a;if(l&&(h.sameHost||m!==F.location.hostname))for(var p=0;p<l.length;p++)if(l[p]instanceof RegExp){if(l[p].test(m)){k=!0;break a}}else if(0<=m.indexOf(l[p])){k=!0;break a}k=!1}if(k){var r=h.placement;void 0==r&&(r=h.fragment?2:1);r===b&&Ia(e,h.callback())}}return e},bf=function(){var a=ic("google_tag_data",{}),b=a.gl;b&&b.decorators||(b={decorators:[]},a.gl=b);return b};var ff=/(.*?)\*(.*?)\*(.*)/,gf=/^https?:\/\/([^\/]*?)\.?cdn\.ampproject\.org\/?(.*)/,hf=/^(?:www\.|m\.|amp\.)+/,jf=/([^?#]+)(\?[^#]*)?(#.*)?/;function kf(a){return new RegExp("(.*?)(^|&)"+a+"=([^&]*)&?(.*)")}
var mf=function(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];void 0!==d&&d===d&&null!==d&&"[object Object]"!==d.toString()&&(b.push(c),b.push(Xe(String(d))))}var e=b.join("*");return["1",lf(e),e].join("*")},lf=function(a,b){var c=[window.navigator.userAgent,(new Date).getTimezoneOffset(),window.navigator.userLanguage||window.navigator.language,Math.floor((new Date).getTime()/60/1E3)-(void 0===b?0:b),a].join("*"),d;if(!(d=Ze)){for(var e=Array(256),f=0;256>f;f++){for(var h=f,k=0;8>k;k++)h=
h&1?h>>>1^3988292384:h>>>1;e[f]=h}d=e}Ze=d;for(var l=4294967295,m=0;m<c.length;m++)l=l>>>8^Ze[(l^c.charCodeAt(m))&255];return((l^-1)>>>0).toString(36)},of=function(){return function(a){var b=pe(D.location.href),c=b.search.replace("?",""),d=ke(c,"_gl",!0)||"";a.query=nf(d)||{};var e=ne(b,"fragment").match(kf("_gl"));a.fragment=nf(e&&e[3]||"")||{}}},pf=function(a){var b=of(),c=bf();c.data||(c.data={query:{},fragment:{}},b(c.data));var d={},e=c.data;e&&(Ia(d,e.query),a&&Ia(d,e.fragment));return d},nf=
function(a){var b;b=void 0===b?3:b;try{if(a){var c;a:{for(var d=a,e=0;3>e;++e){var f=ff.exec(d);if(f){c=f;break a}d=decodeURIComponent(d)}c=void 0}var h=c;if(h&&"1"===h[1]){var k=h[3],l;a:{for(var m=h[2],p=0;p<b;++p)if(m===lf(k,p)){l=!0;break a}l=!1}if(l){for(var r={},u=k?k.split("*"):[],q=0;q<u.length;q+=2)r[u[q]]=Ye(u[q+1]);return r}}}}catch(t){}};
function qf(a,b,c,d){function e(p){var r=p,u=kf(a).exec(r),q=r;if(u){var t=u[2],v=u[4];q=u[1];v&&(q=q+t+v)}p=q;var w=p.charAt(p.length-1);p&&"&"!==w&&(p+="&");return p+m}d=void 0===d?!1:d;var f=jf.exec(c);if(!f)return"";var h=f[1],k=f[2]||"",l=f[3]||"",m=a+"="+b;d?l="#"+e(l.substring(1)):k="?"+e(k.substring(1));return""+h+k+l}
function rf(a,b){var c="FORM"===(a.tagName||"").toUpperCase(),d=ef(b,1,c),e=ef(b,2,c),f=ef(b,3,c);if(Ja(d)){var h=mf(d);c?sf("_gl",h,a):tf("_gl",h,a,!1)}if(!c&&Ja(e)){var k=mf(e);tf("_gl",k,a,!0)}for(var l in f)if(f.hasOwnProperty(l))a:{var m=l,p=f[l],r=a;if(r.tagName){if("a"===r.tagName.toLowerCase()){tf(m,p,r,void 0);break a}if("form"===r.tagName.toLowerCase()){sf(m,p,r);break a}}"string"==typeof r&&qf(m,p,r,void 0)}}
function tf(a,b,c,d){if(c.href){var e=qf(a,b,c.href,void 0===d?!1:d);ie.test(e)&&(c.href=e)}}
function sf(a,b,c){if(c&&c.action){var d=(c.method||"").toLowerCase();if("get"===d){for(var e=c.childNodes||[],f=!1,h=0;h<e.length;h++){var k=e[h];if(k.name===a){k.setAttribute("value",b);f=!0;break}}if(!f){var l=F.createElement("input");l.setAttribute("type","hidden");l.setAttribute("name",a);l.setAttribute("value",b);c.appendChild(l)}}else if("post"===d){var m=qf(a,b,c.action);ie.test(m)&&(c.action=m)}}}
var $e=function(a){try{var b;a:{for(var c=a,d=100;c&&0<d;){if(c.href&&c.nodeName.match(/^a(?:rea)?$/i)){b=c;break a}c=c.parentNode;d--}b=null}var e=b;if(e){var f=e.protocol;"http:"!==f&&"https:"!==f||rf(e,e.hostname)}}catch(h){}},af=function(a){try{if(a.action){var b=ne(pe(a.action),"host");rf(a,b)}}catch(c){}},uf=function(a,b,c,d){cf();df(a,b,"fragment"===c?2:1,!!d,!1)},vf=function(a,b){cf();df(a,[me(D.location,"host",!0)],b,!0,!0)},wf=function(){var a=F.location.hostname,b=gf.exec(F.referrer);if(!b)return!1;
var c=b[2],d=b[1],e="";if(c){var f=c.split("/"),h=f[1];e="s"===h?decodeURIComponent(f[2]):decodeURIComponent(h)}else if(d){if(0===d.indexOf("xn--"))return!1;e=d.replace(/-/g,".").replace(/\.\./g,"-")}var k=a.replace(hf,""),l=e.replace(hf,""),m;if(!(m=k===l)){var p="."+l;m=k.substring(k.length-p.length,k.length)===p}return m},xf=function(a,b){return!1===a?!1:a||b||wf()};var yf=/^\w+$/,zf=/^[\w-]+$/,Af=/^~?[\w-]+$/,Bf={aw:"_aw",dc:"_dc",gf:"_gf",ha:"_ha",gp:"_gp"},Cf=function(){if(!te("gtag_cs_api")||!Ic())return!0;var a=Gc("ad_storage");return null==a?!0:!!a},Df=function(a,b){Hc("ad_storage")?Cf()?a():Lc(a,"ad_storage"):b?I("TAGGING",3):Kc(function(){Df(a,!0)},["ad_storage"])},Gf=function(a){var b=[];if(!F.cookie)return b;var c=ve(a,F.cookie,void 0,"ad_storage");if(!c||0==c.length)return b;for(var d=0;d<c.length;d++){var e=Ef(c[d]);e&&-1===ta(b,e)&&b.push(e)}return Ff(b)};
function Hf(a){return a&&"string"==typeof a&&a.match(yf)?a:"_gcl"}
var Jf=function(){var a=pe(D.location.href),b=ne(a,"query",!1,void 0,"gclid"),c=ne(a,"query",!1,void 0,"gclsrc"),d=ne(a,"query",!1,void 0,"dclid");if(!b||!c){var e=a.hash.replace("#","");b=b||ke(e,"gclid",void 0);c=c||ke(e,"gclsrc",void 0)}return If(b,c,d)},If=function(a,b,c){var d={},e=function(f,h){d[h]||(d[h]=[]);d[h].push(f)};d.gclid=a;d.gclsrc=b;d.dclid=c;if(void 0!==a&&a.match(zf))switch(b){case void 0:e(a,"aw");break;case "aw.ds":e(a,"aw");e(a,"dc");break;case "ds":e(a,"dc");break;case "3p.ds":te("gtm_3pds")&&
e(a,"dc");break;case "gf":e(a,"gf");break;case "ha":e(a,"ha");break;case "gp":e(a,"gp")}c&&e(c,"dc");return d},Lf=function(a){var b=Jf();Df(function(){return Kf(b,a)})};
function Kf(a,b,c){function d(m,p){var r=Mf(m,e);r&&(Ee(r,p,f),h=!0)}b=b||{};var e=Hf(b.prefix);c=c||Fa();var f=Me(b,c,!0);f.Da="ad_storage";var h=!1,k=Math.round(c/1E3),l=function(m){return["GCL",k,m].join(".")};a.aw&&(!0===b.li?d("aw",l("~"+a.aw[0])):d("aw",l(a.aw[0])));a.dc&&d("dc",l(a.dc[0]));a.gf&&d("gf",l(a.gf[0]));a.ha&&d("ha",l(a.ha[0]));a.gp&&d("gp",l(a.gp[0]));return h}
var Of=function(a,b){var c=pf(!0);Df(function(){for(var d=Hf(b.prefix),e=0;e<a.length;++e){var f=a[e];if(void 0!==Bf[f]){var h=Mf(f,d),k=c[h];if(k){var l=Math.min(Nf(k),Fa()),m;b:{for(var p=l,r=ve(h,F.cookie,void 0,"ad_storage"),u=0;u<r.length;++u)if(Nf(r[u])>p){m=!0;break b}m=!1}if(!m){var q=Me(b,l,!0);q.Da="ad_storage";Ee(h,k,q)}}}}Kf(If(c.gclid,c.gclsrc),b)})},Mf=function(a,b){var c=Bf[a];if(void 0!==c)return b+c},Nf=function(a){var b=a.split(".");return 3!==b.length||"GCL"!==b[0]?0:1E3*(Number(b[1])||
0)};function Ef(a){var b=a.split(".");if(3==b.length&&"GCL"==b[0]&&b[1])return b[2]}
var Pf=function(a,b,c,d,e){if(ra(b)){var f=Hf(e),h=function(){for(var k={},l=0;l<a.length;++l){var m=Mf(a[l],f);if(m){var p=ve(m,F.cookie,void 0,"ad_storage");p.length&&(k[m]=p.sort()[p.length-1])}}return k};Df(function(){uf(h,b,c,d)})}},Ff=function(a){return a.filter(function(b){return Af.test(b)})},Qf=function(a,b){for(var c=Hf(b.prefix),d={},e=0;e<a.length;e++)Bf[a[e]]&&(d[a[e]]=Bf[a[e]]);Df(function(){za(d,function(f,h){var k=ve(c+h,F.cookie,void 0,"ad_storage");if(k.length){var l=k[0],m=Nf(l),
p={};p[f]=[Ef(l)];Kf(p,b,m)}})})};function Rf(a,b){for(var c=0;c<b.length;++c)if(a[b[c]])return!0;return!1}
var Sf=function(){function a(e,f,h){h&&(e[f]=h)}var b=["aw","dc"];if(Ic()){var c=Jf();if(Rf(c,b)){var d={};a(d,"gclid",c.gclid);a(d,"dclid",c.dclid);a(d,"gclsrc",c.gclsrc);vf(function(){return d},3);vf(function(){var e={};return e._up="1",e},1)}}},Tf=function(){var a;if(Cf()){for(var b=[],c=F.cookie.split(";"),d=/^\s*_gac_(UA-\d+-\d+)=\s*(.+?)\s*$/,e=0;e<c.length;e++){var f=c[e].match(d);f&&b.push({rd:f[1],value:f[2]})}var h={};if(b&&b.length)for(var k=0;k<b.length;k++){var l=b[k].value.split(".");
"1"==l[0]&&3==l.length&&l[1]&&(h[b[k].rd]||(h[b[k].rd]=[]),h[b[k].rd].push({timestamp:l[1],Cg:l[2]}))}a=h}else a={};return a};var Uf=/^\d+\.fls\.doubleclick\.net$/;function Vf(a,b){Hc(C.o)?Pc(C.o)?a():Rc(a):b?I("GTM",42):Sc(function(){Vf(a,!0)},[C.o])}function Wf(a){var b=pe(D.location.href),c=ne(b,"host",!1);if(c&&c.match(Uf)){var d=ne(b,"path").split(a+"=");if(1<d.length)return d[1].split(";")[0].split("?")[0]}}
function Xf(a,b,c){if("aw"==a||"dc"==a){var d=Wf("gcl"+a);if(d)return d.split(".")}var e=Hf(b);if("_gcl"==e){c=void 0===c?!0:c;var f=!Pc(C.o)&&c,h;h=Jf()[a]||[];if(0<h.length)return f?["0"]:h}var k=Mf(a,e);return k?Gf(k):[]}
var Yf=function(a){var b=Wf("gac");if(b)return!Pc(C.o)&&a?"0":decodeURIComponent(b);var c=Tf(),d=[];za(c,function(e,f){for(var h=[],k=0;k<f.length;k++)h.push(f[k].Cg);h=Ff(h);h.length&&d.push(e+":"+h.join(","))});return d.join(";")},Zf=function(a,b){var c=Jf().dc||[];Vf(function(){Se(b);var d=Oe[Pe(b.prefix)],e=!1;if(d&&0<c.length){var f=ld.joined_au=ld.joined_au||{},h=b.prefix||"_gcl";if(!f[h])for(var k=0;k<c.length;k++){var l="https://adservice.google.com/ddm/regclk";l=l+"?gclid="+c[k]+"&auiddc="+d;uc(l);e=f[h]=
!0}}null==a&&(a=e);if(a&&d){var m=Pe(b.prefix),p=Oe[m];p&&Re(m,p,b)}})};var $f=/[A-Z]+/,ag=/\s/,bg=function(a){if(g(a)&&(a=Da(a),!ag.test(a))){var b=a.indexOf("-");if(!(0>b)){var c=a.substring(0,b);if($f.test(c)){for(var d=a.substring(b+1).split("/"),e=0;e<d.length;e++)if(!d[e])return;return{id:a,prefix:c,containerId:c+"-"+d[0],w:d}}}}},dg=function(a){for(var b={},c=0;c<a.length;++c){var d=bg(a[c]);d&&(b[d.id]=d)}cg(b);var e=[];za(b,function(f,h){e.push(h)});return e};
function cg(a){var b=[],c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];"AW"===d.prefix&&d.w[1]&&b.push(d.containerId)}for(var e=0;e<b.length;++e)delete a[b[e]]};var eg=function(){var a=!1;return a};var K=function(a,b,c,d){return(2===fg()||d||"http:"!=D.location.protocol?a:b)+c},fg=function(){var a=lc(),b;if(1===a)a:{var c=qd;c=c.toLowerCase();for(var d="https://"+c,e="http://"+c,f=1,h=F.getElementsByTagName("script"),k=0;k<h.length&&100>k;k++){var l=h[k].src;if(l){l=l.toLowerCase();if(0===l.indexOf(e)){b=3;break a}1===f&&0===l.indexOf(d)&&(f=2)}}b=f}else b=a;return b};
var tg=function(a){return Pc(C.o)?a:a.replace(/&url=([^&#]+)/,function(b,c){var d=qe(decodeURIComponent(c));return"&url="+encodeURIComponent(d)})};var ug=new RegExp(/^(.*\.)?(google|youtube|blogger|withgoogle)(\.com?)?(\.[a-z]{2})?\.?$/),vg={cl:["ecl"],customPixels:["nonGooglePixels"],ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],customScripts:["html","customPixels","nonGooglePixels","nonGoogleScripts","nonGoogleIframes"],nonGooglePixels:[],nonGoogleScripts:["nonGooglePixels"],nonGoogleIframes:["nonGooglePixels"]},wg={cl:["ecl"],customPixels:["customScripts","html"],
ecl:["cl"],ehl:["hl"],hl:["ehl"],html:["customScripts"],customScripts:["html"],nonGooglePixels:["customPixels","customScripts","html","nonGoogleScripts","nonGoogleIframes"],nonGoogleScripts:["customScripts","html"],nonGoogleIframes:["customScripts","html","nonGoogleScripts"]},xg="google customPixels customScripts html nonGooglePixels nonGoogleScripts nonGoogleIframes".split(" ");
var zg=function(a){var b=Zd("gtm.whitelist");b&&I("GTM",9);var c=b&&Ka(Ca(b),vg),d=Zd("gtm.blacklist");d||(d=Zd("tagTypeBlacklist"))&&I("GTM",3);d?
I("GTM",8):d=[];yg()&&(d=Ca(d),d.push("nonGooglePixels","nonGoogleScripts","sandboxedScripts"));0<=ta(Ca(d),"google")&&I("GTM",2);var e=d&&Ka(Ca(d),wg),f={};return function(h){var k=h&&h[Hb.ya];if(!k||"string"!=typeof k)return!0;k=k.replace(/^_*/,"");if(void 0!==f[k])return f[k];var l=wd[k]||[],m=a(k,l);if(b){var p;if(p=m)a:{if(0>ta(c,k))if(l&&0<l.length)for(var r=
0;r<l.length;r++){if(0>ta(c,l[r])){I("GTM",11);p=!1;break a}}else{p=!1;break a}p=!0}m=p}var u=!1;if(d){var q=0<=ta(e,k);if(q)u=q;else{var t=ya(e,l||[]);t&&I("GTM",10);u=t}}var v=!m||u;v||!(0<=ta(l,"sandboxedScripts"))||c&&-1!==ta(c,"sandboxedScripts")||(v=ya(e,xg));return f[k]=v}},yg=function(){return ug.test(D.location&&D.location.hostname)};var Bg={mg:function(a,b){b[Hb.Cd]&&"string"===typeof a&&(a=1==b[Hb.Cd]?a.toLowerCase():a.toUpperCase());b.hasOwnProperty(Hb.Ed)&&null===a&&(a=b[Hb.Ed]);b.hasOwnProperty(Hb.Gd)&&void 0===a&&(a=b[Hb.Gd]);b.hasOwnProperty(Hb.Fd)&&!0===a&&(a=b[Hb.Fd]);b.hasOwnProperty(Hb.Dd)&&!1===a&&(a=b[Hb.Dd]);return a}};var Cg={active:!0,isWhitelisted:function(){return!0}},Dg=function(a){var b=ld.zones;!b&&a&&(b=ld.zones=a());return b};var Eg=function(){};var Fg=!1,Gg=0,Hg=[];function Ig(a){if(!Fg){var b=F.createEventObject,c="complete"==F.readyState,d="interactive"==F.readyState;if(!a||"readystatechange"!=a.type||c||!b&&d){Fg=!0;for(var e=0;e<Hg.length;e++)G(Hg[e])}Hg.push=function(){for(var f=0;f<arguments.length;f++)G(arguments[f]);return 0}}}function Jg(){if(!Fg&&140>Gg){Gg++;try{F.documentElement.doScroll("left"),Ig()}catch(a){D.setTimeout(Jg,50)}}}var Kg=function(a){Fg?a():Hg.push(a)};var Lg={},Mg={},Ng=function(a,b,c,d){if(!Mg[a]||nd[b]||"__zone"===b)return-1;var e={};Sa(d)&&(e=n(d,e));e.id=c;e.status="timeout";return Mg[a].tags.push(e)-1},Og=function(a,b,c,d){if(Mg[a]){var e=Mg[a].tags[b];e&&(e.status=c,e.executionTime=d)}};function Pg(a){for(var b=Lg[a]||[],c=0;c<b.length;c++)b[c]();Lg[a]={push:function(d){d(kd.s,Mg[a])}}}
var Sg=function(a,b,c){Mg[a]={tags:[]};pa(b)&&Qg(a,b);c&&D.setTimeout(function(){return Pg(a)},Number(c));return Rg(a)},Qg=function(a,b){Lg[a]=Lg[a]||[];Lg[a].push(Ha(function(){return G(function(){b(kd.s,Mg[a])})}))};function Rg(a){var b=0,c=0,d=!1;return{add:function(){c++;return Ha(function(){b++;d&&b>=c&&Pg(a)})},Yf:function(){d=!0;b>=c&&Pg(a)}}};var Tg=function(){function a(d){return!qa(d)||0>d?0:d}if(!ld._li&&D.performance&&D.performance.timing){var b=D.performance.timing.navigationStart,c=qa($d.get("gtm.start"))?$d.get("gtm.start"):0;ld._li={cst:a(c-b),cbt:a(sd-b)}}};var Xg={},Yg=function(){return D.GoogleAnalyticsObject&&D[D.GoogleAnalyticsObject]},Zg=!1;
var $g=function(a){D.GoogleAnalyticsObject||(D.GoogleAnalyticsObject=a||"ga");var b=D.GoogleAnalyticsObject;if(D[b])D.hasOwnProperty(b)||I("GTM",12);else{var c=function(){c.q=c.q||[];c.q.push(arguments)};c.l=Number(new Date);D[b]=c}Tg();return D[b]},ah=function(a,b,c,d){b=String(b).replace(/\s+/g,"").split(",");var e=Yg();e(a+"require","linker");e(a+"linker:autoLink",b,c,d)};
var ch=function(a){},bh=function(){return D.GoogleAnalyticsObject||"ga"};function ih(a,b,c,d){var e=ub[a],f=jh(a,b,c,d);if(!f)return null;var h=Db(e[Hb.Vd],c,[]);if(h&&h.length){var k=h[0];f=ih(k.index,{C:f,B:1===k.te?b.terminate:f,terminate:b.terminate},c,d)}return f}
function jh(a,b,c,d){function e(){if(f[Hb.sf])k();else{var w=Eb(f,c,[]),y=Ng(c.id,String(f[Hb.ya]),Number(f[Hb.Xd]),w[Hb.tf]),x=!1;w.vtp_gtmOnSuccess=function(){if(!x){x=!0;var z=Fa()-B;Sd(c.id,ub[a],"5");Og(c.id,y,"success",z);h()}};w.vtp_gtmOnFailure=function(){if(!x){x=!0;var z=Fa()-B;Sd(c.id,ub[a],"6");Og(c.id,y,"failure",z);k()}};w.vtp_gtmTagId=f.tag_id;
w.vtp_gtmEventId=c.id;Sd(c.id,f,"1");var A=function(){var z=Fa()-B;Sd(c.id,f,"7");Og(c.id,y,"exception",z);x||(x=!0,k())};var B=Fa();try{Bb(w,c)}catch(z){A(z)}}}var f=ub[a],h=b.C,k=b.B,l=b.terminate;if(c.Yc(f))return null;var m=Db(f[Hb.Yd],c,[]);if(m&&m.length){var p=m[0],r=ih(p.index,{C:h,B:k,terminate:l},c,d);if(!r)return null;h=r;k=2===p.te?l:r}if(f[Hb.Nd]||f[Hb.xf]){var u=f[Hb.Nd]?vb:c.yh,q=h,t=k;if(!u[a]){e=Ha(e);var v=kh(a,u,e);h=v.C;k=v.B}return function(){u[a](q,t)}}return e}
function kh(a,b,c){var d=[],e=[];b[a]=lh(d,e,c);return{C:function(){b[a]=mh;for(var f=0;f<d.length;f++)d[f]()},B:function(){b[a]=nh;for(var f=0;f<e.length;f++)e[f]()}}}function lh(a,b,c){return function(d,e){a.push(d);b.push(e);c()}}function mh(a){a()}function nh(a,b){b()};var qh=function(a,b){for(var c=[],d=0;d<ub.length;d++)if(a.xb[d]){var e=ub[d];var f=b.add();try{var h=ih(d,{C:f,B:f,terminate:f},a,d);h?c.push({We:d,Qe:Fb(e),yg:h}):(oh(d,a),f())}catch(l){f()}}b.Yf();c.sort(ph);for(var k=0;k<c.length;k++)c[k].yg();return 0<c.length};function ph(a,b){var c,d=b.Qe,e=a.Qe;c=d>e?1:d<e?-1:0;var f;if(0!==c)f=c;else{var h=a.We,k=b.We;f=h>k?1:h<k?-1:0}return f}
function oh(a,b){if(!Pd)return;var c=function(d){var e=b.Yc(ub[d])?"3":"4",f=Db(ub[d][Hb.Vd],b,[]);f&&f.length&&c(f[0].index);Sd(b.id,ub[d],e);var h=Db(ub[d][Hb.Yd],b,[]);h&&h.length&&c(h[0].index)};c(a);}
var rh=!1,sh=function(a,b,c,d,e){if("gtm.js"==b){if(rh)return!1;rh=!0}Rd(a,b);var f=Sg(a,d,e);de(a,"event",1);de(a,"ecommerce",1);de(a,"gtm");var h={id:a,name:b,Yc:zg(c),xb:[],yh:[],Ge:function(){I("GTM",6)}};h.xb=Lb(h);var k=qh(h,f);"gtm.js"!==b&&"gtm.sync"!==b||ch(kd.s);if(!k)return k;for(var l=0;l<h.xb.length;l++)if(h.xb[l]){var m=ub[l];if(m&&!nd[String(m[Hb.ya])])return!0}return!1};function uh(a,b){}function vh(a,b){return wh()?uh(a,b):void 0}
function wh(){var a=!1;return a};var xh=function(){this.eventModel={};this.targetConfig={};this.containerConfig={};this.h={};this.globalConfig={};this.C=function(){};this.B=function(){};this.eventId=void 0},yh=function(a){var b=new xh;b.eventModel=a;return b},zh=function(a,b){a.targetConfig=b;return a},Ah=function(a,b){a.containerConfig=b;return a},Bh=function(a,b){a.h=b;return a},Ch=function(a,b){a.globalConfig=b;return a},Dh=function(a,b){a.C=b;return a},Eh=function(a,b){a.B=b;return a};
xh.prototype.getWithConfig=function(a){if(void 0!==this.eventModel[a])return this.eventModel[a];if(void 0!==this.targetConfig[a])return this.targetConfig[a];if(void 0!==this.containerConfig[a])return this.containerConfig[a];if(void 0!==this.h[a])return this.h[a];if(void 0!==this.globalConfig[a])return this.globalConfig[a]};
var Fh=function(a){function b(e){za(e,function(f){c[f]=null})}var c={};b(a.eventModel);b(a.targetConfig);b(a.containerConfig);b(a.globalConfig);var d=[];za(c,function(e){d.push(e)});return d};var Gh;if(3===kd.Ob.length)Gh="g";else{var Hh="G";Gh=Hh}
var Ih={"":"n",UA:"u",AW:"a",DC:"d",G:"e",GF:"f",HA:"h",GTM:Gh,OPT:"o"},Jh=function(a){var b=kd.s.split("-"),c=b[0].toUpperCase(),d=Ih[c]||"i",e=a&&"GTM"===c?b[1]:"OPT"===c?b[1]:"",f;if(3===kd.Ob.length){var h="w";f="2"+h}else f="";return f+d+kd.Ob+e};function Kh(){var a=!1;return a}
function Lh(a,b,c){function d(r){var u;ld.reported_gclid||(ld.reported_gclid={});u=ld.reported_gclid;var q=f+(r?"gcu":"gcs");if(!u[q]){u[q]=!0;var t=[],v=function(B,z){z&&t.push(B+"="+encodeURIComponent(z))},w="https://www.google.com";
v("gclid",Mh(b,f));v("gclsrc",h);v("gtm",Jh(!c));var A=w+"/pagead/landing?"+t.join("&");uc(A)}}var e=Jf(),f=e.gclid||"",h=e.gclsrc,k=e.dclid||"",l=!a&&(!f||h&&"aw.ds"!==h?!1:!0),m=Kh();if(l||m){var p=""+He();m?Sc(function(){d();Pc(C.o)||Rc(function(){return d(!0)})},[C.o]):d()}}
function Mh(a,b){return b}var Pi={},Qi=["G","GP"];Pi.Ye="";var Ri=Pi.Ye.split(",");function Si(){var a=ld;return a.gcq=a.gcq||new Ti}
var Ui=function(a,b,c){Si().register(a,b,c)},Vi=function(a,b,c,d){Si().push("event",[b,a],c,d)},Wi=function(a,b){Si().push("config",[a],b)},Xi={},Yi=function(a){return!0},Zi=function(){this.status=1;this.containerConfig={};this.targetConfig={};this.i={};this.m=null;this.h=!1},$i=function(a,b,c,d,e){this.type=a;this.m=b;this.ba=c||
"";this.h=d;this.i=e},Ti=function(){this.m={};this.i={};this.h=[]},aj=function(a,b){var c=bg(b);return a.m[c.containerId]=a.m[c.containerId]||new Zi},bj=function(a,b,c){if(b){var d=bg(b);if(d&&1===aj(a,b).status&&Yi(d.prefix)){aj(a,b).status=2;var e={};Pd&&(e.timeoutId=D.setTimeout(function(){I("GTM",38);Bd()},3E3));a.push("require",[e],d.containerId);Xi[d.containerId]=Fa();if(eg()){}else{var h="/gtag/js?id="+encodeURIComponent(d.containerId)+"&l=dataLayer&cx=c",k=("http:"!=D.location.protocol?"https:":"http:")+("//www.googletagmanager.com"+h),l=vh(c,h)||k;kc(l)}}}},cj=function(a,b,c,d){if(d.ba){var e=aj(a,d.ba),
f=e.m;if(f){var h=n(c),k=n(e.targetConfig[d.ba]),l=n(e.containerConfig),m=n(e.i),p=n(a.i),r=Zd("gtm.uniqueEventId"),u=bg(d.ba).prefix,q=Eh(Dh(Ch(Bh(Ah(zh(yh(h),k),l),m),p),function(){Td(r,u,"2");}),function(){Td(r,u,"3");});try{Td(r,u,"1");f(d.ba,b,d.m,q)}catch(t){
Td(r,u,"4");}}}};
Ti.prototype.register=function(a,b,c){if(3!==aj(this,a).status){aj(this,a).m=b;aj(this,a).status=3;c&&(aj(this,a).i=c);var d=bg(a),e=Xi[d.containerId];if(void 0!==e){var f=ld[d.containerId].bootstrap,h=d.prefix.toUpperCase();ld[d.containerId]._spx&&(h=h.toLowerCase());var k=Zd("gtm.uniqueEventId"),l=h,m=Fa()-f;if(Pd&&!Gd[k]){k!==Cd&&(Ad(),Cd=k);var p=l+"."+Math.floor(f-e)+"."+Math.floor(m);Ld=Ld?Ld+","+p:"&cl="+p}delete Xi[d.containerId]}this.flush()}};
Ti.prototype.push=function(a,b,c,d){var e=Math.floor(Fa()/1E3);bj(this,c,b[0][C.va]||this.i[C.va]);this.h.push(new $i(a,e,c,b,d));d||this.flush()};
Ti.prototype.flush=function(a){for(var b=this;this.h.length;){var c=this.h[0];if(c.i)c.i=!1,this.h.push(c);else switch(c.type){case "require":if(3!==aj(this,c.ba).status&&!a)return;Pd&&D.clearTimeout(c.h[0].timeoutId);break;case "set":za(c.h[0],function(l,m){n(Ma(l,m),b.i)});break;case "config":var d=c.h[0],e=!!d[C.hc];delete d[C.hc];var f=aj(this,c.ba),h=bg(c.ba),k=h.containerId===h.id;e||(k?f.containerConfig={}:f.targetConfig[c.ba]={});f.h&&e||cj(this,C.F,d,c);f.h=!0;delete d[C.wa];k?n(d,f.containerConfig):
n(d,f.targetConfig[c.ba]);break;case "event":cj(this,c.h[1],c.h[0],c)}this.h.shift()}};var dj=["GP","G"],ej="G".split(/,/);ej.push("GF");ej.push("HA");ej.push("DC");
ej.push("UA");ej.push("AW");var fj=!1;fj=!0;var gj=null,hj={},ij={},jj;function kj(a,b){var c={event:a};b&&(c.eventModel=n(b),b[C.Ac]&&(c.eventCallback=b[C.Ac]),b[C.Jb]&&(c.eventTimeout=b[C.Jb]));return c}
var pj={config:function(a){},event:function(a){var b=a[1];if(g(b)&&!(3<a.length)){var c;if(2<a.length){if(!Sa(a[2])&&void 0!=a[2])return;c=a[2]}var d=kj(b,c);return d}},js:function(a){if(2==a.length&&a[1].getTime)return{event:"gtm.js","gtm.start":a[1].getTime()}},policy:function(){},set:function(a){var b;2==a.length&&Sa(a[1])?b=n(a[1]):3==a.length&&g(a[1])&&(b={},
Sa(a[2])||ra(a[2])?b[a[1]]=n(a[2]):b[a[1]]=a[2]);if(b){b._clear=!0;return b}}};var qj={policy:!0};var rj=function(a,b){var c=a.hide;if(c&&void 0!==c[b]&&c.end){c[b]=!1;var d=!0,e;for(e in c)if(c.hasOwnProperty(e)&&!0===c[e]){d=!1;break}d&&(c.end(),c.end=null)}},tj=function(a){var b=sj(),c=b&&b.hide;c&&c.end&&(c[a]=!0)};var uj=!1,vj=[];function wj(){if(!uj){uj=!0;for(var a=0;a<vj.length;a++)G(vj[a])}}var xj=function(a){uj?G(a):vj.push(a)};var Pj=function(a){if(Oj(a))return a;this.h=a};Pj.prototype.Gg=function(){return this.h};var Oj=function(a){return!a||"object"!==Pa(a)||Sa(a)?!1:"getUntrustedUpdateValue"in a};Pj.prototype.getUntrustedUpdateValue=Pj.prototype.Gg;var Qj=[],Rj=!1,Sj=function(a){return D["dataLayer"].push(a)},Tj=function(a){var b=ld["dataLayer"],c=b?b.subscribers:1,d=0;return function(){++d===c&&a()}};
function Uj(a){var b=a._clear;za(a,function(f,h){"_clear"!==f&&(b&&ce(f,void 0),ce(f,h))});rd||(rd=a["gtm.start"]);var c=a.event,d=a["gtm.uniqueEventId"];if(!c)return!1;d||(d=xd(),a["gtm.uniqueEventId"]=d,ce("gtm.uniqueEventId",d));td=c;var e=Vj(a);td=null;switch(c){case "gtm.init":I("GTM",19),e&&I("GTM",20)}return e}
function Vj(a){var b=a.event,c=a["gtm.uniqueEventId"],d,e=ld.zones;d=e?e.checkState(kd.s,c):Cg;return d.active?sh(c,b,d.isWhitelisted,a.eventCallback,a.eventTimeout)?!0:!1:!1}
function Wj(){for(var a=!1;!Rj&&0<Qj.length;){Rj=!0;delete Wd.eventModel;Yd();var b=Qj.shift();if(null!=b){var c=Oj(b);if(c){var d=b;b=Oj(d)?d.getUntrustedUpdateValue():void 0;for(var e=["gtm.whitelist","gtm.blacklist","tagTypeBlacklist"],f=0;f<e.length;f++){var h=e[f],k=Zd(h,1);if(ra(k)||Sa(k))k=n(k);Xd[h]=k}}try{if(pa(b))try{b.call($d)}catch(v){}else if(ra(b)){var l=b;if(g(l[0])){var m=
l[0].split("."),p=m.pop(),r=l.slice(1),u=Zd(m.join("."),2);if(void 0!==u&&null!==u)try{u[p].apply(u,r)}catch(v){}}}else{var q=b;if(q&&("[object Arguments]"==Object.prototype.toString.call(q)||Object.prototype.hasOwnProperty.call(q,"callee"))){a:{if(b.length&&g(b[0])){var t=pj[b[0]];if(t&&(!c||!qj[b[0]])){b=t(b);break a}}b=void 0}if(!b){Rj=!1;continue}}a=Uj(b)||a}}finally{c&&Yd(!0)}}Rj=!1}
return!a}function Xj(){var a=Wj();try{rj(D["dataLayer"],kd.s)}catch(b){}return a}
var Zj=function(){var a=ic("dataLayer",[]),b=ic("google_tag_manager",{});b=b["dataLayer"]=b["dataLayer"]||{};Kg(function(){b.gtmDom||(b.gtmDom=!0,a.push({event:"gtm.dom"}))});xj(function(){b.gtmLoad||(b.gtmLoad=!0,a.push({event:"gtm.load"}))});b.subscribers=(b.subscribers||0)+1;var c=a.push;a.push=function(){var d;if(0<ld.SANDBOXED_JS_SEMAPHORE){d=[];for(var e=0;e<arguments.length;e++)d[e]=new Pj(arguments[e])}else d=[].slice.call(arguments,0);var f=c.apply(a,d);Qj.push.apply(Qj,d);if(300<
this.length)for(I("GTM",4);300<this.length;)this.shift();var h="boolean"!==typeof f||f;return Wj()&&h};Qj.push.apply(Qj,a.slice(0));Yj()&&G(Xj)},Yj=function(){var a=!0;return a};var ak={};ak.Kb=new String("undefined");
var bk=function(a){this.h=function(b){for(var c=[],d=0;d<a.length;d++)c.push(a[d]===ak.Kb?b:a[d]);return c.join("")}};bk.prototype.toString=function(){return this.h("undefined")};bk.prototype.valueOf=bk.prototype.toString;ak.Gf=bk;ak.Jc={};ak.pg=function(a){return new bk(a)};var ck={};ak.qh=function(a,b){var c=xd();ck[c]=[a,b];return c};ak.oe=function(a){var b=a?0:1;return function(c){var d=ck[c];if(d&&"function"===typeof d[b])d[b]();ck[c]=void 0}};ak.Pg=function(a){for(var b=!1,c=!1,d=2;d<a.length;d++)b=
b||8===a[d],c=c||16===a[d];return b&&c};ak.hh=function(a){if(a===ak.Kb)return a;var b=xd();ak.Jc[b]=a;return'google_tag_manager["'+kd.s+'"].macro('+b+")"};ak.Zg=function(a,b,c){a instanceof ak.Gf&&(a=a.h(ak.qh(b,c)),b=oa);return{Wc:a,C:b}};var dk=function(a,b,c){function d(f,h){var k=f[h];return k}var e={event:b,"gtm.element":a,"gtm.elementClasses":d(a,"className"),"gtm.elementId":a["for"]||qc(a,"id")||"","gtm.elementTarget":a.formTarget||d(a,"target")||""};c&&(e["gtm.triggers"]=c.join(","));e["gtm.elementUrl"]=(a.attributes&&a.attributes.formaction?a.formAction:"")||a.action||d(a,"href")||a.src||a.code||a.codebase||
"";return e},ek=function(a){ld.hasOwnProperty("autoEventsSettings")||(ld.autoEventsSettings={});var b=ld.autoEventsSettings;b.hasOwnProperty(a)||(b[a]={});return b[a]},fk=function(a,b,c){ek(a)[b]=c},gk=function(a,b,c,d){var e=ek(a),f=Ga(e,b,d);e[b]=c(f)},hk=function(a,b,c){var d=ek(a);return Ga(d,b,c)};var ik=["input","select","textarea"],jk=["button","hidden","image","reset","submit"],kk=function(a){var b=a.tagName.toLowerCase();return!va(ik,function(c){return c===b})||"input"===b&&va(jk,function(c){return c===a.type.toLowerCase()})?!1:!0},lk=function(a){return a.form?a.form.tagName?a.form:F.getElementById(a.form):tc(a,["form"],100)},mk=function(a,b,c){if(!a.elements)return 0;for(var d=b.getAttribute(c),e=0,f=1;e<a.elements.length;e++){var h=a.elements[e];if(kk(h)){if(h.getAttribute(c)===d)return f;
f++}}return 0};var nk=!!D.MutationObserver,ok=void 0,pk=function(a){if(!ok){var b=function(){var c=F.body;if(c)if(nk)(new MutationObserver(function(){for(var e=0;e<ok.length;e++)G(ok[e])})).observe(c,{childList:!0,subtree:!0});else{var d=!1;oc(c,"DOMNodeInserted",function(){d||(d=!0,G(function(){d=!1;for(var e=0;e<ok.length;e++)G(ok[e])}))})}};ok=[];F.body?b():G(b)}ok.push(a)};
var Ak=function(){var a=F.body,b=F.documentElement||a&&a.parentElement,c,d;if(F.compatMode&&"BackCompat"!==F.compatMode)c=b?b.clientHeight:0,d=b?b.clientWidth:0;else{var e=function(f,h){return f&&h?Math.min(f,h):Math.max(f,h)};I("GTM",7);c=e(b?b.clientHeight:0,a?a.clientHeight:0);d=e(b?b.clientWidth:0,a?a.clientWidth:0)}return{width:d,height:c}},Bk=function(a){var b=Ak(),c=b.height,d=b.width,e=a.getBoundingClientRect(),f=e.bottom-e.top,h=e.right-e.left;return f&&h?(1-Math.min((Math.max(0-e.left,0)+
Math.max(e.right-d,0))/h,1))*(1-Math.min((Math.max(0-e.top,0)+Math.max(e.bottom-c,0))/f,1)):0},Ck=function(a){if(F.hidden)return!0;var b=a.getBoundingClientRect();if(b.top==b.bottom||b.left==b.right||!D.getComputedStyle)return!0;var c=D.getComputedStyle(a,null);if("hidden"===c.visibility)return!0;for(var d=a,e=c;d;){if("none"===e.display)return!0;var f=e.opacity,h=e.filter;if(h){var k=h.indexOf("opacity(");0<=k&&(h=h.substring(k+8,h.indexOf(")",k)),"%"==h.charAt(h.length-1)&&(h=h.substring(0,h.length-
1)),f=Math.min(h,f))}if(void 0!==f&&0>=f)return!0;(d=d.parentElement)&&(e=D.getComputedStyle(d,null))}return!1};var Dk=[],Ek=!(!D.IntersectionObserver||!D.IntersectionObserverEntry),Fk=function(a,b,c){for(var d=new D.IntersectionObserver(a,{threshold:c}),e=0;e<b.length;e++)d.observe(b[e]);for(var f=0;f<Dk.length;f++)if(!Dk[f])return Dk[f]=d,f;return Dk.push(d)-1},Gk=function(a,b,c){function d(k,l){var m={top:0,bottom:0,right:0,left:0,width:0,
height:0},p={boundingClientRect:k.getBoundingClientRect(),intersectionRatio:l,intersectionRect:m,isIntersecting:0<l,rootBounds:m,target:k,time:Fa()};G(function(){return a(p)})}for(var e=[],f=[],h=0;h<b.length;h++)e.push(0),f.push(-1);c.sort(function(k,l){return k-l});return function(){for(var k=0;k<b.length;k++){var l=Bk(b[k]);if(l>e[k])for(;f[k]<c.length-1&&l>=c[f[k]+1];)d(b[k],l),f[k]++;else if(l<e[k])for(;0<=f[k]&&l<=c[f[k]];)d(b[k],l),f[k]--;e[k]=l}}},Hk=function(a,b,c){for(var d=0;d<c.length;d++)1<
c[d]?c[d]=1:0>c[d]&&(c[d]=0);if(Ek){var e=!1;G(function(){e||Gk(a,b,c)()});return Fk(function(f){e=!0;for(var h={Xa:0};h.Xa<f.length;h={Xa:h.Xa},h.Xa++)G(function(k){return function(){return a(f[k.Xa])}}(h))},b,c)}return D.setInterval(Gk(a,b,c),1E3)},Ik=function(a){Ek?0<=a&&a<Dk.length&&Dk[a]&&(Dk[a].disconnect(),Dk[a]=void 0):D.clearInterval(a)};var Kk=D.clearTimeout,Lk=D.setTimeout,P=function(a,b,c){if(eg()){b&&G(b)}else return kc(a,b,c)},Mk=function(){return D.location.href},Nk=function(a){return ne(pe(a),"fragment")},Ok=function(a){return oe(pe(a))},R=function(a,b){return Zd(a,b||2)},Pk=function(a,b,c){var d;b?(a.eventCallback=b,c&&(a.eventTimeout=c),d=Sj(a)):d=Sj(a);return d},Qk=function(a,b){D[a]=b},S=function(a,b,c){b&&(void 0===D[a]||c&&!D[a])&&(D[a]=
b);return D[a]},Rk=function(a,b,c){return ve(a,b,void 0===c?!0:!!c)},Sk=function(a,b,c){return 0===Ee(a,b,c)},Tk=function(a,b){if(eg()){b&&G(b)}else mc(a,b)},Uk=function(a){return!!hk(a,"init",!1)},Vk=function(a){fk(a,"init",!0)},Wk=function(a,b){var c=(void 0===b?0:b)?"www.googletagmanager.com/gtag/js":qd;c+="?id="+encodeURIComponent(a)+"&l=dataLayer";P(K("https://","http://",c))},Xk=function(a,b){var c=a[b];return c};
var Yk=ak.Zg;function ul(a,b){a=String(a);b=String(b);var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c}var vl=new xa;function wl(a,b){function c(h){var k=pe(h),l=ne(k,"protocol"),m=ne(k,"host",!0),p=ne(k,"port"),r=ne(k,"path").toLowerCase().replace(/\/$/,"");if(void 0===l||"http"==l&&"80"==p||"https"==l&&"443"==p)l="web",p="default";return[l,m,p,r]}for(var d=c(String(a)),e=c(String(b)),f=0;f<d.length;f++)if(d[f]!==e[f])return!1;return!0}
function xl(a){return yl(a)?1:0}
function yl(a){var b=a.arg0,c=a.arg1;if(a.any_of&&ra(c)){for(var d=0;d<c.length;d++)if(xl({"function":a["function"],arg0:b,arg1:c[d]}))return!0;return!1}switch(a["function"]){case "_cn":return 0<=String(b).indexOf(String(c));case "_css":var e;a:{if(b){var f=["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"];try{for(var h=0;h<f.length;h++)if(b[f[h]]){e=b[f[h]](c);break a}}catch(u){}}e=!1}return e;case "_ew":return ul(b,c);case "_eq":return String(b)==String(c);
case "_ge":return Number(b)>=Number(c);case "_gt":return Number(b)>Number(c);case "_lc":var k;k=String(b).split(",");return 0<=ta(k,String(c));case "_le":return Number(b)<=Number(c);case "_lt":return Number(b)<Number(c);case "_re":var l;var m=a.ignore_case?"i":void 0;try{var p=String(c)+m,r=vl.get(p);r||(r=new RegExp(c,m),vl.set(p,r));l=r.test(b)}catch(u){l=!1}return l;case "_sw":return 0==String(b).indexOf(String(c));case "_um":return wl(b,c)}return!1};var zl=function(a,b){var c=function(){};c.prototype=a.prototype;var d=new c;a.apply(d,Array.prototype.slice.call(arguments,1));return d};var Al={},Bl=encodeURI,W=encodeURIComponent,Cl=nc;var Dl=function(a,b){if(!a)return!1;var c=ne(pe(a),"host");if(!c)return!1;for(var d=0;b&&d<b.length;d++){var e=b[d]&&b[d].toLowerCase();if(e){var f=c.length-e.length;0<f&&"."!=e.charAt(0)&&(f--,e="."+e);if(0<=f&&c.indexOf(e,f)==f)return!0}}return!1};
var El=function(a,b,c){for(var d={},e=!1,f=0;a&&f<a.length;f++)a[f]&&a[f].hasOwnProperty(b)&&a[f].hasOwnProperty(c)&&(d[a[f][b]]=a[f][c],e=!0);return e?d:null};Al.Qg=function(){var a=!1;return a};var Wm=function(){var a=D.gaGlobal=D.gaGlobal||{};a.hid=a.hid||wa();return a.hid};var gn=window,hn=document,jn=function(a){var b=gn._gaUserPrefs;if(b&&b.ioo&&b.ioo()||a&&!0===gn["ga-disable-"+a])return!0;try{var c=gn.external;if(c&&c._gaUserPrefs&&"oo"==c._gaUserPrefs)return!0}catch(f){}for(var d=re("AMP_TOKEN",String(hn.cookie),!0),e=0;e<d.length;e++)if("$OPT_OUT"==d[e])return!0;return hn.getElementById("__gaOptOutExtension")?!0:!1};
function mn(a,b){delete b.eventModel[C.wa];if(a!==C.F){var c=b.getWithConfig(C.bc);if(ra(c)){I("GTM",26);for(var d={},e=0;e<c.length;e++){var f=c[e],h=b.getWithConfig(f);void 0!==h&&(d[f]=h)}b.eventModel=d}}on(b.eventModel)}var on=function(a){za(a,function(c){"_"===c.charAt(0)&&delete a[c]});var b=a[C.ka]||{};za(b,function(c){"_"===c.charAt(0)&&delete b[c]})};var rn=function(a,b,c){Vi(b,c,a)},sn=function(a,b,c){Vi(b,c,a,!0)},un=function(a,b){};
function tn(a,b){}var X={a:{}};

X.a.vis=["google"],function(){var a={};(function(b){X.__vis=b;X.__vis.b="vis";X.__vis.g=!0;X.__vis.priorityOverride=0})(function(b){var c,d=[];d.push("CSS"===b.vtp_selectorType?b.vtp_elementSelector:"#"+b.vtp_elementId);d.push(b.vtp_outputMethod);"BOOLEAN"==b.vtp_outputMethod&&d.push(b.vtp_onScreenRatio);c=d.join("&");var e=a[c],f=Number(new Date);if(e&&250>f-e.time)return e.value;e={time:f,value:null};var h=b.vtp_outputMethod,k=null;if("CSS"==b.vtp_selectorType){var l=Uc(b.vtp_elementSelector);l&&
0<l.length&&(k=l[0])}else k=F.getElementById(b.vtp_elementId);if(k)switch(h){case "BOOLEAN":var m=(Number(b.vtp_onScreenRatio)||50)/100;e.value=Bk(k)>=m&&!Ck(k);break;case "PERCENT":e.value=0,Ck(k)||(e.value=Math.round(1E3*Bk(k))/10)}a[c]=e;return e.value})}();

X.a.jsm=["customScripts"],function(){(function(a){X.__jsm=a;X.__jsm.b="jsm";X.__jsm.g=!0;X.__jsm.priorityOverride=0})(function(a){if(void 0!==a.vtp_javascript){var b=a.vtp_javascript;try{var c=S("google_tag_manager");return c&&c.e&&c.e(b)}catch(d){}}})}();
X.a.sp=["google"],function(){(function(a){X.__sp=a;X.__sp.b="sp";X.__sp.g=!0;X.__sp.priorityOverride=0})(function(a){var b=-1==navigator.userAgent.toLowerCase().indexOf("firefox")?"//www.googleadservices.com/pagead/conversion_async.js":"https://www.google.com/pagead/conversion_async.js",c=a.vtp_gtmOnFailure,d=function(){var f=S("google_trackConversion");if(pa(f)){var h={};"DATA_LAYER"==a.vtp_customParamsFormat?h=a.vtp_dataLayerVariable:"USER_SPECIFIED"==a.vtp_customParamsFormat&&(h=El(a.vtp_customParams,
"key","value"));var k={};a.vtp_enableDynamicRemarketing&&(a.vtp_eventName&&(h.event=a.vtp_eventName),a.vtp_eventValue&&(k.value=a.vtp_eventValue),a.vtp_eventItems&&(k.items=a.vtp_eventItems));var l={google_conversion_id:a.vtp_conversionId,google_conversion_label:a.vtp_conversionLabel,google_custom_params:h,google_gtag_event_data:k,google_remarketing_only:!0,onload_callback:a.vtp_gtmOnSuccess,google_gtm:Jh()};a.vtp_rdp&&(l.google_restricted_data_processing=!0);a.vtp_userId&&(l.google_user_id=a.vtp_userId);
f(l)||c()}else c()},e=function(){P(b,d,c)};Tg();e()})}();X.a.c=["google"],function(){(function(a){X.__c=a;X.__c.b="c";X.__c.g=!0;X.__c.priorityOverride=0})(function(a){return a.vtp_value})}();
X.a.e=["google"],function(){(function(a){X.__e=a;X.__e.b="e";X.__e.g=!0;X.__e.priorityOverride=0})(function(a){return String(ee(a.vtp_gtmEventId,"event"))})}();
X.a.f=["google"],function(){(function(a){X.__f=a;X.__f.b="f";X.__f.g=!0;X.__f.priorityOverride=0})(function(a){var b=R("gtm.referrer",1)||F.referrer;return b?a.vtp_component&&"URL"!=a.vtp_component?ne(pe(String(b)),a.vtp_component,a.vtp_stripWww,a.vtp_defaultPages,a.vtp_queryKey):Ok(String(b)):String(b)})}();
X.a.cl=["google"],function(){function a(b){var c=b.target;if(c){var d=dk(c,"gtm.click");Pk(d)}}(function(b){X.__cl=b;X.__cl.b="cl";X.__cl.g=!0;X.__cl.priorityOverride=0})(function(b){if(!Uk("cl")){var c=S("document");oc(c,"click",a,!0);Vk("cl")}G(b.vtp_gtmOnSuccess)})}();X.a.k=["google"],function(){(function(a){X.__k=a;X.__k.b="k";X.__k.g=!0;X.__k.priorityOverride=0})(function(a){return Rk(a.vtp_name,R("gtm.cookie",1),!!a.vtp_decodeCookie)[0]})}();

X.a.tg=["google"],function(){function a(k){h.push(k);1<h.length||G(function(){var l=h.join(",");h=[];Pk({event:"gtm.triggerGroup","gtm.triggers":l})})}function b(k,l){var m=d[l],p=m.indexOf(k);-1!==p&&(m.splice(p,1),m.length||a(l))}function c(k){G(k.vtp_gtmOnSuccess);var l=k.vtp_uniqueTriggerId,m=k.vtp_triggerIds,p=k.vtp_firingId;if(k.vtp_isListeningTag){var r=e[p];r?b(p,r):f.push(p)}else{d[l]=m;for(var u=0,q;q=m[u];u++)e[q]=l;for(var t=0;t<f.length;t++)b(f[t],l)}}var d={},e={},f=[],h=[];X.__tg=c;X.__tg.b="tg";X.__tg.g=!0;X.__tg.priorityOverride=0}();
X.a.u=["google"],function(){var a=function(b){return{toString:function(){return b}}};(function(b){X.__u=b;X.__u.b="u";X.__u.g=!0;X.__u.priorityOverride=0})(function(b){var c;b.vtp_customUrlSource?c=b.vtp_customUrlSource:c=R("gtm.url",1);c=c||Mk();var d=b[a("vtp_component")];if(!d||"URL"==d)return Ok(String(c));var e=pe(String(c)),f;if("QUERY"===d)a:{var h=b[a("vtp_multiQueryKeys").toString()],k=b[a("vtp_queryKey").toString()]||"",l=b[a("vtp_ignoreEmptyQueryParam").toString()],m;h?ra(k)?m=k:m=String(k).replace(/\s+/g,
"").split(","):m=[String(k)];for(var p=0;p<m.length;p++){var r=ne(e,"QUERY",void 0,void 0,m[p]);if(void 0!=r&&(!l||""!==r)){f=r;break a}}f=void 0}else f=ne(e,d,"HOST"==d?b[a("vtp_stripWww")]:void 0,"PATH"==d?b[a("vtp_defaultPages")]:void 0,void 0);return f})}();
X.a.v=["google"],function(){(function(a){X.__v=a;X.__v.b="v";X.__v.g=!0;X.__v.priorityOverride=0})(function(a){var b=a.vtp_name;if(!b||!b.replace)return!1;var c=R(b.replace(/\\\./g,"."),a.vtp_dataLayerVersion||1);return void 0!==c?c:a.vtp_defaultValue})}();
X.a.ua=["google"],function(){var a,b={},c=function(e){Sc(function(){d(e)},[C.J,C.o])},d=function(e){var f={},h={},k={},l={},m={};if(e.vtp_gaSettings){var p=e.vtp_gaSettings;n(El(p.vtp_fieldsToSet,"fieldName","value"),h);n(El(p.vtp_contentGroup,"index","group"),k);n(El(p.vtp_dimension,"index","dimension"),l);n(El(p.vtp_metric,"index","metric"),m);e.vtp_gaSettings=null;p.vtp_fieldsToSet=void 0;p.vtp_contentGroup=void 0;p.vtp_dimension=void 0;p.vtp_metric=void 0;var r=n(p);e=n(e,r)}n(El(e.vtp_fieldsToSet,
"fieldName","value"),h);n(El(e.vtp_contentGroup,"index","group"),k);n(El(e.vtp_dimension,"index","dimension"),l);n(El(e.vtp_metric,"index","metric"),m);var u=$g(e.vtp_functionName);if(pa(u)){var q="",t="";e.vtp_setTrackerName&&"string"==typeof e.vtp_trackerName?""!==e.vtp_trackerName&&(t=e.vtp_trackerName,q=t+"."):(t="gtm"+xd(),
q=t+".");var v={name:!0,clientId:!0,sampleRate:!0,siteSpeedSampleRate:!0,alwaysSendReferrer:!0,allowAnchor:!0,allowLinker:!0,cookieName:!0,cookieDomain:!0,cookieExpires:!0,cookiePath:!0,cookieUpdate:!0,cookieFlags:!0,legacyCookieDomain:!0,legacyHistoryImport:!0,storage:!0,useAmpClientId:!0,storeGac:!0},w={allowAnchor:!0,allowLinker:!0,alwaysSendReferrer:!0,anonymizeIp:!0,cookieUpdate:!0,exFatal:!0,forceSSL:!0,javaEnabled:!0,legacyHistoryImport:!0,nonInteraction:!0,useAmpClientId:!0,useBeacon:!0,storeGac:!0,
allowAdFeatures:!0,allowAdPersonalizationSignals:!0},y=function(O){var Q=[].slice.call(arguments,0);Q[0]=q+Q[0];u.apply(window,Q)},x=function(O,Q){return void 0===Q?Q:O(Q)},A=function(O,Q){if(Q)for(var Qa in Q)Q.hasOwnProperty(Qa)&&y("set",O+Qa,Q[Qa])},B=function(){var O=function(yn,Kj,zn){if(!Sa(Kj))return!1;for(var pd=Ga(Object(Kj),zn,[]),Ag=0;pd&&Ag<pd.length;Ag++)y(yn,pd[Ag]);return!!pd&&0<pd.length},Q;if(e.vtp_useEcommerceDataLayer){var Qa=
!1;Qa||(Q=R("ecommerce",1))}else e.vtp_ecommerceMacroData&&(Q=e.vtp_ecommerceMacroData.ecommerce);if(!Sa(Q))return;Q=Object(Q);var Tb=Ga(h,"currencyCode",Q.currencyCode);void 0!==Tb&&y("set","&cu",Tb);O("ec:addImpression",Q,"impressions");if(O("ec:addPromo",Q[Q.promoClick?"promoClick":"promoView"],"promotions")&&Q.promoClick){y("ec:setAction",
"promo_click",Q.promoClick.actionField);return}for(var Ea="detail checkout checkout_option click add remove purchase refund".split(" "),cb="refund purchase remove checkout checkout_option add click detail".split(" "),db=0;db<Ea.length;db++){var nb=Q[Ea[db]];if(nb){O("ec:addProduct",nb,"products");y("ec:setAction",Ea[db],nb.actionField);if(Pd)for(var Cb=0;Cb<cb.length;Cb++){var Ec=Q[cb[Cb]];if(Ec){Ec!==nb&&I("GTM",13);break}}break}}},
z=function(O,Q,Qa){var Tb=0;if(O)for(var Ea in O)if(O.hasOwnProperty(Ea)&&(Qa&&v[Ea]||!Qa&&void 0===v[Ea])){var cb=w[Ea]?Ba(O[Ea]):O[Ea];"anonymizeIp"!=Ea||cb||(cb=void 0);Q[Ea]=cb;Tb++}return Tb},E={name:t};z(h,E,!0);u("create",e.vtp_trackingId||f.trackingId,E);y("set","&gtm",Jh(!0));e.vtp_enableRecaptcha&&y("require","recaptcha","recaptcha.js");(function(O,Q){void 0!==e[Q]&&y("set",O,e[Q])})("nonInteraction","vtp_nonInteraction");A("contentGroup",k);A("dimension",l);A("metric",m);var H={};z(h,H,!1)&&y("set",H);var M;
e.vtp_enableLinkId&&y("require","linkid","linkid.js");y("set","hitCallback",function(){var O=h&&h.hitCallback;pa(O)&&O();e.vtp_gtmOnSuccess()});if("TRACK_EVENT"==e.vtp_trackType){e.vtp_enableEcommerce&&(y("require","ec","ec.js"),B());var N={hitType:"event",eventCategory:String(e.vtp_eventCategory||f.category),eventAction:String(e.vtp_eventAction||f.action),eventLabel:x(String,e.vtp_eventLabel||f.label),eventValue:x(Aa,e.vtp_eventValue||
f.value)};z(M,N,!1);y("send",N);}else if("TRACK_SOCIAL"==e.vtp_trackType){}else if("TRACK_TRANSACTION"==e.vtp_trackType){}else if("TRACK_TIMING"==
e.vtp_trackType){}else if("DECORATE_LINK"==e.vtp_trackType){}else if("DECORATE_FORM"==e.vtp_trackType){}else if("TRACK_DATA"==e.vtp_trackType){}else{e.vtp_enableEcommerce&&(y("require","ec","ec.js"),B());if(e.vtp_doubleClick||"DISPLAY_FEATURES"==e.vtp_advertisingFeaturesType){var V=
"_dc_gtm_"+String(e.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");y("require","displayfeatures",void 0,{cookieName:V})}if("DISPLAY_FEATURES_WITH_REMARKETING_LISTS"==e.vtp_advertisingFeaturesType){var ma="_dc_gtm_"+String(e.vtp_trackingId).replace(/[^A-Za-z0-9-]/g,"");y("require","adfeatures",{cookieName:ma})}M?y("send","pageview",M):y("send","pageview");}if(!a){var ua=e.vtp_useDebugVersion?"u/analytics_debug.js":"analytics.js";e.vtp_useInternalVersion&&!e.vtp_useDebugVersion&&(ua="internal/"+ua);a=!0;var La=vh(h._x_19,"/analytics.js"),ka=K("https:","http:","//www.google-analytics.com/"+ua,h&&h.forceSSL);P("analytics.js"===ua&&La?La:ka,function(){var O=Yg();O&&O.loaded||e.vtp_gtmOnFailure();},e.vtp_gtmOnFailure)}}else G(e.vtp_gtmOnFailure)};
X.__ua=c;X.__ua.b="ua";X.__ua.g=!0;X.__ua.priorityOverride=0}();





X.a.gclidw=["google"],function(){var a=["aw","dc","gf","ha","gp"];(function(b){X.__gclidw=b;X.__gclidw.b="gclidw";X.__gclidw.g=!0;X.__gclidw.priorityOverride=100})(function(b){G(b.vtp_gtmOnSuccess);var c,d,e,f;b.vtp_enableCookieOverrides&&(e=b.vtp_cookiePrefix,c=b.vtp_path,d=b.vtp_domain,b.vtp_enableCookieFlagsFeature&&(f=b.vtp_cookieFlags));var h=null;b.vtp_enableCookieUpdateFeature&&(h=!0,void 0!==b.vtp_cookieUpdate&&(h=!!b.vtp_cookieUpdate));var k={prefix:e,path:c,domain:d,flags:f};b.vtp_enableCrossDomainFeature&&
(b.vtp_enableCrossDomain&&!1===b.vtp_acceptIncoming||(b.vtp_enableCrossDomain||wf())&&Of(a,k));Lf(k);Qf(["aw","dc"],k);Zf(h,k);var l=e;if(b.vtp_enableCrossDomainFeature&&b.vtp_enableCrossDomain&&b.vtp_linkerDomains){var m=b.vtp_linkerDomains.toString().replace(/\s+/g,"").split(","),p=b.vtp_urlPosition,r=!!b.vtp_formDecoration;Pf(a,m,p,r,l);}var u=R(C.M);
Lh(!1,void 0!=u&&!1!==u);b.vtp_enableUrlPassthroughFeature&&b.vtp_enableUrlPassthrough&&Sf()})}();

X.a.aev=["google"],function(){function a(q,t){var v=ee(q,"gtm");if(v)return v[t]}function b(q,t,v,w){w||(w="element");var y=q+"."+t,x;if(p.hasOwnProperty(y))x=p[y];else{var A=a(q,w);if(A&&(x=v(A),p[y]=x,r.push(y),35<r.length)){var B=r.shift();delete p[B]}}return x}function c(q,t,v){var w=a(q,u[t]);return void 0!==w?w:v}function d(q,t){if(!q)return!1;var v=e(Mk());ra(t)||(t=String(t||"").replace(/\s+/g,"").split(","));for(var w=[v],y=0;y<t.length;y++)if(t[y]instanceof RegExp){if(t[y].test(q))return!1}else{var x=
t[y];if(0!=x.length){if(0<=e(q).indexOf(x))return!1;w.push(e(x))}}return!Dl(q,w)}function e(q){m.test(q)||(q="http://"+q);return ne(pe(q),"HOST",!0)}function f(q,t,v){switch(q){case "SUBMIT_TEXT":return b(t,"FORM."+q,h,"formSubmitElement")||v;case "LENGTH":var w=b(t,"FORM."+q,k);return void 0===w?v:w;case "INTERACTED_FIELD_ID":return l(t,"id",v);case "INTERACTED_FIELD_NAME":return l(t,"name",v);case "INTERACTED_FIELD_TYPE":return l(t,"type",v);case "INTERACTED_FIELD_POSITION":var y=a(t,"interactedFormFieldPosition");
return void 0===y?v:y;case "INTERACT_SEQUENCE_NUMBER":var x=a(t,"interactSequenceNumber");return void 0===x?v:x;default:return v}}function h(q){switch(q.tagName.toLowerCase()){case "input":return qc(q,"value");case "button":return rc(q);default:return null}}function k(q){if("form"===q.tagName.toLowerCase()&&q.elements){for(var t=0,v=0;v<q.elements.length;v++)kk(q.elements[v])&&t++;return t}}function l(q,t,v){var w=a(q,"interactedFormField");return w&&qc(w,t)||v}var m=/^https?:\/\//i,p={},r=[],u={ATTRIBUTE:"elementAttribute",
CLASSES:"elementClasses",ELEMENT:"element",ID:"elementId",HISTORY_CHANGE_SOURCE:"historyChangeSource",HISTORY_NEW_STATE:"newHistoryState",HISTORY_NEW_URL_FRAGMENT:"newUrlFragment",HISTORY_OLD_STATE:"oldHistoryState",HISTORY_OLD_URL_FRAGMENT:"oldUrlFragment",TARGET:"elementTarget"};(function(q){X.__aev=q;X.__aev.b="aev";X.__aev.g=!0;X.__aev.priorityOverride=0})(function(q){var t=q.vtp_gtmEventId,v=q.vtp_defaultValue,w=q.vtp_varType;switch(w){case "TAG_NAME":var y=a(t,"element");return y&&y.tagName||
v;case "TEXT":return b(t,w,rc)||v;case "URL":var x;a:{var A=String(a(t,"elementUrl")||v||""),B=pe(A),z=String(q.vtp_component||"URL");switch(z){case "URL":x=A;break a;case "IS_OUTBOUND":x=d(A,q.vtp_affiliatedDomains);break a;default:x=ne(B,z,q.vtp_stripWww,q.vtp_defaultPages,q.vtp_queryKey)}}return x;case "ATTRIBUTE":var E;if(void 0===q.vtp_attribute)E=c(t,w,v);else{var H=q.vtp_attribute,M=a(t,"element");E=M&&qc(M,H)||v||""}return E;case "MD":var N=q.vtp_mdValue,Y=b(t,"MD",wk);return N&&Y?zk(Y,N)||
v:Y||v;case "FORM":return f(String(q.vtp_component||"SUBMIT_TEXT"),t,v);default:return c(t,w,v)}})}();
X.a.gas=["google"],function(){function a(b,c,d){b.vtp_fieldsToSet=b.vtp_fieldsToSet||[];var e=b[c];void 0!==e&&(b.vtp_fieldsToSet.push({fieldName:d,value:e}),delete b[c])}(function(b){X.__gas=b;X.__gas.b="gas";X.__gas.g=!0;X.__gas.priorityOverride=0})(function(b){var c=n(b),d=c;d[Hb.ya]=null;d[Hb.kf]=null;c=d;a(c,"vtp_cookieDomain","cookieDomain");return c})}();

X.a.remm=["google"],function(){(function(a){X.__remm=a;X.__remm.b="remm";X.__remm.g=!0;X.__remm.priorityOverride=0})(function(a){for(var b=a.vtp_input,c=a.vtp_map||[],d=a.vtp_fullMatch,e=a.vtp_ignoreCase?"gi":"g",f=0;f<c.length;f++){var h=c[f].key||"";d&&(h="^"+h+"$");var k=new RegExp(h,e);if(k.test(b)){var l=c[f].value;a.vtp_replaceAfterMatch&&(l=String(b).replace(k,l));return l}}return a.vtp_defaultValue})}();
X.a.smm=["google"],function(){(function(a){X.__smm=a;X.__smm.b="smm";X.__smm.g=!0;X.__smm.priorityOverride=0})(function(a){var b=a.vtp_input,c=El(a.vtp_map,"key","value")||{};return c.hasOwnProperty(b)?c[b]:a.vtp_defaultValue})}();





X.a.paused=[],function(){(function(a){X.__paused=a;X.__paused.b="paused";X.__paused.g=!0;X.__paused.priorityOverride=0})(function(a){G(a.vtp_gtmOnFailure)})}();
X.a.html=["customScripts"],function(){function a(d,e,f,h){return function(){try{if(0<e.length){var k=e.shift(),l=a(d,e,f,h);if("SCRIPT"==String(k.nodeName).toUpperCase()&&"text/gtmscript"==k.type){var m=F.createElement("script");m.async=!1;m.type="text/javascript";m.id=k.id;m.text=k.text||k.textContent||k.innerHTML||"";k.charset&&(m.charset=k.charset);var p=k.getAttribute("data-gtmsrc");p&&(m.src=p,jc(m,l));d.insertBefore(m,null);p||l()}else if(k.innerHTML&&0<=k.innerHTML.toLowerCase().indexOf("<script")){for(var r=
[];k.firstChild;)r.push(k.removeChild(k.firstChild));d.insertBefore(k,null);a(k,r,l,h)()}else d.insertBefore(k,null),l()}else f()}catch(u){G(h)}}}var c=function(d){if(F.body){var e=
d.vtp_gtmOnFailure,f=Yk(d.vtp_html,d.vtp_gtmOnSuccess,e),h=f.Wc,k=f.C;if(d.vtp_useIframe){}else d.vtp_supportDocumentWrite?b(h,k,e):a(F.body,sc(h),k,e)()}else Lk(function(){c(d)},
200)};X.__html=c;X.__html.b="html";X.__html.g=!0;X.__html.priorityOverride=0}();






X.a.lcl=[],function(){function a(){var c=S("document"),d=0,e=function(f){var h=f.target;if(h&&3!==f.which&&!(f.Og||f.timeStamp&&f.timeStamp===d)){d=f.timeStamp;h=tc(h,["a","area"],100);if(!h)return f.returnValue;var k=f.defaultPrevented||!1===f.returnValue,l=hk("lcl",k?"nv.mwt":"mwt",0),m;m=k?hk("lcl","nv.ids",[]):hk("lcl","ids",[]);if(m.length){var p=dk(h,"gtm.linkClick",m);if(b(f,h,c)&&!k&&l&&h.href){var r=String(Xk(h,"rel")||""),u=!!va(r.split(" "),function(v){return"noreferrer"===v.toLowerCase()});
u&&I("GTM",36);var q=S((Xk(h,"target")||"_self").substring(1)),t=!0;if(Pk(p,Tj(function(){var v;if(v=t&&q){var w;a:if(u){var y;try{y=new MouseEvent(f.type)}catch(x){if(!c.createEvent){w=!1;break a}y=c.createEvent("MouseEvents");y.initEvent(f.type,!0,!0)}y.Og=!0;f.target.dispatchEvent(y);w=!0}else w=!1;v=!w}v&&(q.location.href=Xk(h,"href"))}),l))t=!1;else return f.preventDefault&&f.preventDefault(),f.returnValue=!1}else Pk(p,function(){},l||2E3);return!0}}};oc(c,"click",e,!1);oc(c,"auxclick",e,!1)}
function b(c,d,e){if(2===c.which||c.ctrlKey||c.shiftKey||c.altKey||c.metaKey)return!1;var f=Xk(d,"href"),h=f.indexOf("#"),k=Xk(d,"target");if(k&&"_self"!==k&&"_parent"!==k&&"_top"!==k||0===h)return!1;if(0<h){var l=Ok(f),m=Ok(e.location);return l!==m}return!0}(function(c){X.__lcl=c;X.__lcl.b="lcl";X.__lcl.g=!0;X.__lcl.priorityOverride=0})(function(c){var d=void 0===c.vtp_waitForTags?!0:c.vtp_waitForTags,e=void 0===c.vtp_checkValidation?!0:c.vtp_checkValidation,f=Number(c.vtp_waitForTagsTimeout);if(!f||
0>=f)f=2E3;var h=c.vtp_uniqueTriggerId||"0";if(d){var k=function(m){return Math.max(f,m)};gk("lcl","mwt",k,0);e||gk("lcl","nv.mwt",k,0)}var l=function(m){m.push(h);return m};gk("lcl","ids",l,[]);e||gk("lcl","nv.ids",l,[]);Uk("lcl")||(a(),Vk("lcl"));G(c.vtp_gtmOnSuccess)})}();
X.a.evl=["google"],function(){function a(f,h){this.element=f;this.h=h}function b(){var f=Number(R("gtm.start"))||0;return(new Date).getTime()-f}function c(f,h,k,l){function m(){if(!Ck(f.target)){h.has(e.Nb)||h.set(e.Nb,""+b());h.has(e.Dc)||h.set(e.Dc,""+b());var r=0;h.has(e.Pb)&&(r=Number(h.get(e.Pb)));r+=100;h.set(e.Pb,""+r);if(r>=k){var u=dk(f.target,"gtm.elementVisibility",[h.h]),q=Bk(f.target);u["gtm.visibleRatio"]=Math.round(1E3*q)/10;u["gtm.visibleTime"]=k;u["gtm.visibleFirstTime"]=Number(h.get(e.Dc));
u["gtm.visibleLastTime"]=Number(h.get(e.Nb));Pk(u);l()}}}if(!h.has(e.fb)&&(0==k&&m(),!h.has(e.Ia))){var p=S("self").setInterval(m,100);h.set(e.fb,p)}}function d(f){f.has(e.fb)&&(S("self").clearInterval(Number(f.get(e.fb))),f.i(e.fb))}var e={fb:"polling-id-",Dc:"first-on-screen-",Nb:"recent-on-screen-",Pb:"total-visible-time-",Ia:"has-fired-"};a.prototype.has=function(f){return!!this.element.getAttribute("data-gtm-vis-"+f+this.h)};a.prototype.get=function(f){return this.element.getAttribute("data-gtm-vis-"+
f+this.h)};a.prototype.set=function(f,h){this.element.setAttribute("data-gtm-vis-"+f+this.h,h)};a.prototype.i=function(f){this.element.removeAttribute("data-gtm-vis-"+f+this.h)};(function(f){X.__evl=f;X.__evl.b="evl";X.__evl.g=!0;X.__evl.priorityOverride=0})(function(f){function h(){var y=!1,x=null;if("CSS"===l){try{x=Uc(m)}catch(H){}y=!!x&&v.length!=x.length}else if("ID"===l){var A=F.getElementById(m);A&&(x=[A],y=1!=v.length||v[0]!==A)}x||(x=[],y=0<v.length);if(y){for(var B=0;B<v.length;B++){var z=
new a(v[B],q);d(z)}v=[];for(var E=0;E<x.length;E++)v.push(x[E]);0<=w&&Ik(w);0<v.length&&(w=Hk(k,v,[u]))}}function k(y){var x=new a(y.target,q);y.intersectionRatio>=u?x.has(e.Ia)||c(y,x,r,"ONCE"===t?function(){for(var A=0;A<v.length;A++){var B=new a(v[A],q);B.set(e.Ia,"1");d(B)}Ik(w);if(p&&ok)for(var z=0;z<ok.length;z++)ok[z]===h&&ok.splice(z,1)}:function(){x.set(e.Ia,"1");d(x)}):(d(x),"MANY_PER_ELEMENT"===t&&x.has(e.Ia)&&(x.i(e.Ia),x.i(e.Pb)),x.i(e.Nb))}var l=f.vtp_selectorType,m;"ID"===l?m=String(f.vtp_elementId):
"CSS"===l&&(m=String(f.vtp_elementSelector));var p=!!f.vtp_useDomChangeListener,r=f.vtp_useOnScreenDuration&&Number(f.vtp_onScreenDuration)||0,u=(Number(f.vtp_onScreenRatio)||50)/100,q=f.vtp_uniqueTriggerId,t=f.vtp_firingFrequency,v=[],w=-1;h();p&&pk(h);G(f.vtp_gtmOnSuccess)})}();


var vn={};vn.macro=function(a){if(ak.Jc.hasOwnProperty(a))return ak.Jc[a]},vn.onHtmlSuccess=ak.oe(!0),vn.onHtmlFailure=ak.oe(!1);vn.dataLayer=$d;vn.callback=function(a){vd.hasOwnProperty(a)&&pa(vd[a])&&vd[a]();delete vd[a]};function wn(){ld[kd.s]=vn;Ia(wd,X.a);yb=yb||ak;zb=Bg}
function xn(){se.gtm_3pds=!0;ld=D.google_tag_manager=D.google_tag_manager||{};if(ld[kd.s]){var a=ld.zones;a&&a.unregisterChild(kd.s);}else{for(var b=data.resource||{},c=b.macros||[],d=0;d<c.length;d++)rb.push(c[d]);for(var e=b.tags||[],f=0;f<e.length;f++)ub.push(e[f]);for(var h=b.predicates||[],k=0;k<h.length;k++)tb.push(h[k]);for(var l=b.rules||[],m=0;m<l.length;m++){for(var p=l[m],r={},u=0;u<p.length;u++)r[p[u][0]]=Array.prototype.slice.call(p[u],1);sb.push(r)}wb=X;xb=xl;wn();Zj();Fg=!1;Gg=0;if("interactive"==F.readyState&&!F.createEventObject||"complete"==F.readyState)Ig();
else{oc(F,"DOMContentLoaded",Ig);oc(F,"readystatechange",Ig);if(F.createEventObject&&F.documentElement.doScroll){var q=!0;try{q=!D.frameElement}catch(y){}q&&Jg()}oc(D,"load",Ig)}uj=!1;"complete"===F.readyState?wj():oc(D,"load",wj);a:{if(!Pd)break a;D.setInterval(Qd,
864E5);}sd=(new Date).getTime();}}
(function(a){
a()})(xn);

})()
