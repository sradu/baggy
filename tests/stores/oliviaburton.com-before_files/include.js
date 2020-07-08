var _inside=_inside||[];var _insideLoaded=_insideLoaded||false;var _insideJQ=_insideJQ||null;(function(){if(_insideLoaded)
return;_insideLoaded=true;var accountKey="IN-1000725";var trackerURL="eu2-track.inside-graph.com";var subsiteId="";var insideOrderTotal=insideOrderTotal||0;var _insideMaxLoop=15;var _insideCurLoop=0;var _insideFirstLoad=_insideFirstLoad||false;function processInside(tracker){var useCustomFunctionForCheckout=false;var detectSearchByUrl=true;var searchUrl="/Search-Show";var searchQueryString=null;var detectProductCategoryByUrl=true;var productCategoryUrl="/shop-watches/collections";var productCategoryQueryString=".product-grid";var detectProductByUrl=true;var productUrl=null;var productQueryString=".product-detail";var detectCheckoutByUrl=true;var checkoutUrl="/shopping-bag";var checkoutQueryString=null;var detectOrderConfirmedByUrl=true;var orderConfirmedUrl=null;var orderConfirmedQueryString=null;function log(){if(typeof(console)!="undefined"&&typeof(console.log)!="undefined"){}}
function deferWait(callback,test){if(test()){callback();return;}
var _interval=10;var _spin=function(){if(test()){callback();}
else{_interval=_interval>=1000?1000:_interval*2;setTimeout(_spin,_interval);}};setTimeout(_spin,_interval);}
function keepWait(callback,test){if(test()){callback();if(_insideCurLoop>=_insideMaxLoop){return;}}
var _interval=1000;var _spin=function(){if(test()){_insideCurLoop=_insideCurLoop+1;callback();if(_insideCurLoop>=_insideMaxLoop){return;}}
setTimeout(_spin,_interval);};setTimeout(_spin,_interval);}
var indexOf=[].indexOf||function(prop){for(var i=0;i<this.length;i++){if(this[i]===prop)
return i;}
return-1;};function myTrim(text){if(typeof(text)!="undefined"&&text!=null)
return typeof(text.trim)==="function"?text.trim():text.replace(/^\s+|\s+$/gm,'');return null;}
function isNumber(o){try{return!isNaN(parseFloat(n))&&isFinite(n);}
catch(tempex){}
return false;}
function setCookie(cname,cvalue,exdays){var hostName=window.location.hostname;var siteNameFragments=hostName.split(".");var siteName=siteNameFragments[1];var domain=siteNameFragments.slice(1,siteNameFragments.length).join(".");var d=new Date();d.setTime(d.getTime()+(exdays*24*60*60*1000));var expires="expires="+d.toGMTString();document.cookie=cname+"="+cvalue+"; "+expires+";path=/"+";domain=."+domain;}
function getCookie(cname){var name=cname+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=myTrim(ca[i]);if(c.indexOf(name)==0)
return c.substring(name.length,c.length);}
return null;}
function deleteCookie(cname){document.cookie=cname+"="+0+"; "+"expires=01 Jan 1970 00:00:00 GMT"+";path=/";}
function roundToTwo(num){if(Math!="undefined"&&Math.round!="undefined")
return+(Math.round(num+"e+2")+"e-2");else
return num;}
function getSearchParameters(){var prmstr=window.location.search.substr(1);return prmstr!=null&&prmstr!=""?transformToAssocArray(prmstr):[];}
function transformToAssocArray(prmstr){var params=[];var prmarr=prmstr.split("&");for(var i=0;i<prmarr.length;i++){params[i]=prmarr[i];}
return params;}
function getDecimalSign(number){try{var tempnum=myTrim(number);if(number.length>3){return number.charAt(number.length-3);}}
catch(signex){}
return ".";}
function getViewData(){try{var data={};data.action="trackView";data.type="article";data.url=window.location.href;data.name="Page: "+window.location.href;var temppath=window.location.pathname;var temp_loc=temppath.split("/");var page="";var add_tags=[];var params=getSearchParameters();var searchterm="Search";if(params!=null&&params.length>0){for(var i=0;i<params.length;i++){if(params[i].indexOf("q=")==0){searchterm=params[i].split("q=")[1];}}}
for(var i=1;i<temp_loc.length;i++){if(temp_loc[i]!=null&&temp_loc[i].length>0)
page=temp_loc[i];}
var curpage=page.split("?")[0];data.name=curpage;var temppagetype="other";if(typeof(google_tag_params)!="undefined"&&google_tag_params!=null&&typeof(google_tag_params.ecomm_pagetype)!="undefined"&&google_tag_params.ecomm_pagetype!=null&&google_tag_params.ecomm_pagetype.length>0){temppagetype=google_tag_params.ecomm_pagetype.toLowerCase();}
if((temppath=="/"||curpage=="home")&&temp_loc.length<3){data.type="homepage";}
else if(temppagetype=="home"){data.type="homepage";}
else if(temppagetype=="searchresults"){data.type="search";}
else if(temppagetype=="category"){data.type="productcategory";}
else if(temppagetype=="product"){data.type="product";}
else if(temppagetype=="cart"||temppagetype=="checkout"){data.type="checkout";}
else if(data.url.indexOf("/account")!=-1||data.url.indexOf("/Account")!=-1){data.type="login";}
if(detectProductCategoryByUrl&&productCategoryUrl!=null){if(data.url.indexOf(productCategoryUrl)!=-1){data.type="productcategory";}}
else if(productCategoryQueryString!=null){var tempelem=_insideJQ(productCategoryQueryString);if(tempelem!=null&&tempelem.length>0){data.type="productcategory";}}
if(detectSearchByUrl&&searchUrl!=null&&temppagetype!="category"){if(data.url.indexOf(searchUrl)!=-1||data.url.indexOf("/search")!=-1){data.type="search";}}
else if(searchQueryString!=null){var tempelem=_insideJQ(searchQueryString);if(tempelem!=null&&tempelem.length>0){data.type="search";}}
if(detectProductByUrl&&productUrl!=null){if(data.url.indexOf(productUrl)!=-1){data.type="product";}}
else if(productQueryString!=null){var tempelem=_insideJQ(productQueryString);if(tempelem!=null&&tempelem.length>0){data.type="product";}}
if(detectCheckoutByUrl&&checkoutUrl!=null){if(data.url.indexOf(checkoutUrl)!=-1||data.url.indexOf("/checkout")!=-1){data.type="checkout";}}
else if(checkoutQueryString!=null){var tempelem=_insideJQ(checkoutQueryString);if(tempelem!=null&&tempelem.length>0){data.type="checkout";}}
if(detectOrderConfirmedByUrl&&orderConfirmedUrl!=null){if(data.url.indexOf(orderConfirmedUrl)!=-1){data.type="orderconfirmed";}}
else if(orderConfirmedQueryString!=null){var tempelem=_insideJQ(orderConfirmedQueryString);if(tempelem!=null&&tempelem.length>0){data.type="orderconfirmed";}}
if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.purchase)!="undefined"&&dataLayer[i].ecommerce.purchase!=null&&typeof(dataLayer[i].ecommerce.purchase.actionField)!="undefined"&&dataLayer[i].ecommerce.purchase.actionField!=null&&typeof(dataLayer[i].ecommerce.purchase.actionField.id)!="undefined"&&dataLayer[i].ecommerce.purchase.actionField.id!=null&&typeof(dataLayer[i].ecommerce.purchase.actionField.revenue)!="undefined"&&dataLayer[i].ecommerce.purchase.actionField.revenue!=null){data.type="orderconfirmed";}}}
switch(data.type){case "homepage":data.name="Home";break;case "search":data.name="Search Result Page";if(searchterm!=null&&searchterm.length>0)
data.name=decodeURIComponent(searchterm);try{if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){var productExists=false;for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].event)!="undefined"&&dataLayer[i].event!=null&&dataLayer[i].event=="productImpressions"){productExists=true;break;}}
if(!productExists)
add_tags.push("emptysearch");}}catch(tempex){}
break;case "productcategory":var tempcat=getCategory();if(tempcat!=null&&tempcat.length>0)
data.category=tempcat;var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
data.name=tempPageName;break;case "product":var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
data.name=tempPageName;tempPageName=getProductName();if(tempPageName!=null&&tempPageName.length>0)
data.name=tempPageName;var tempcat=getCategory();if(tempcat!=null&&tempcat.length>0)
data.category=tempcat;var tempval=getProductImage();if(tempval!=null&&tempval.length>0)
data.img=tempval;var tempsku=getProductSku();if(tempsku!=null&&tempsku.length>0){data.sku=tempsku;data.name=data.sku+" - "+data.name;}
var tempprice=getProductPrice();if(tempprice!=null&&tempprice>0)
data.price=tempprice;break;case "orderconfirmed":data.name="Order Confirmed";break;case "login":data.name=curpage;break;default:var tempPageName=getPageName();if(tempPageName!=null&&tempPageName.length>0)
data.name=tempPageName;}
if(add_tags.length>0){data.tags=add_tags.join(",");}
return data;}
catch(ex){if(typeof(console)!="undefined"&&typeof(console.log)!="undefined")
log("getViewData error: ",ex);return null;}}
function getPageName(){var content=document.getElementsByTagName("title");if(typeof(content)!="undefined"&&content!=null&&content.length>0){var result=content[0].textContent||content[0].innerText;if(typeof(result)!="undefined"&&result!=null&&result.length>0){if(result.indexOf("| Olivia")!=-1)
result=result.split("| Olivia")[0];if(result.indexOf("Olivia Burton |")!=-1)
result=result.split("Olivia Burton |")[1];return myTrim(result);}}
return null;}
function getProductImage(){try{var tempcontent=_insideJQ(".product-images .main li.selected img");if(tempcontent!=null&&tempcontent.length>0)
return tempcontent.get(0).src;}catch(imageex){}
try{var metaTags=document.getElementsByTagName("meta");var fbAppIdContent="";for(var i=0;i<metaTags.length;i++){if(metaTags[i].getAttribute("property")=="og:image"){fbAppIdContent=metaTags[i].getAttribute("content");return fbAppIdContent;}}}
catch(imageex){}
return null;}
function getProductName(){try{for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.detail)!="undefined"&&dataLayer[i].ecommerce.detail!=null&&typeof(dataLayer[i].ecommerce.detail.products)!="undefined"&&dataLayer[i].ecommerce.detail.products!=null&&dataLayer[i].ecommerce.detail.products.length>0){return myTrim(dataLayer[i].ecommerce.detail.products[0].name);}}}
catch(tempex){}
return null;}
function getProductPrice(){try{for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.detail)!="undefined"&&dataLayer[i].ecommerce.detail!=null&&typeof(dataLayer[i].ecommerce.detail.products)!="undefined"&&dataLayer[i].ecommerce.detail.products!=null&&dataLayer[i].ecommerce.detail.products.length>0){return dataLayer[i].ecommerce.detail.products[0].price;}}}
catch(tempex){}
return null;}
function getProductSku(){try{for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.detail)!="undefined"&&dataLayer[i].ecommerce.detail!=null&&typeof(dataLayer[i].ecommerce.detail.products)!="undefined"&&dataLayer[i].ecommerce.detail.products!=null&&dataLayer[i].ecommerce.detail.products.length>0){var sku=dataLayer[i].ecommerce.detail.products[0].id;try{sku=sku.replace(/[^a-zA-Z0-9]/g,'');}
catch(skuex){}
return sku;}}}
catch(tempex){}
return null;}
function getCategory(){try{for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.detail)!="undefined"&&dataLayer[i].ecommerce.detail!=null&&typeof(dataLayer[i].ecommerce.detail.products)!="undefined"&&dataLayer[i].ecommerce.detail.products!=null&&dataLayer[i].ecommerce.detail.products.length>0){return dataLayer[i].ecommerce.detail.products[0].category;}}}
catch(tempex){}
return null;}
function getOrderData(){try{var data=[];var totalprice=0;var orderId="auto";var itemrows=_insideJQ(".mini-cart-content .mini-cart-products .mini-cart-product");if(itemrows!=null&&itemrows.length>0){itemrows.each(function(rowindex){var itemrow=_insideJQ(this);var rowdata={};rowdata.action="addItem";rowdata.orderId=orderId;rowdata.name=myTrim(itemrow.find(".mini-cart-image img").attr("alt"));rowdata.img=itemrow.find(".mini-cart-image img").get(0).src;var itemqty=itemrow.find(".mini-cart-quantity .value:first").text();itemqty=parseFloat(itemqty);rowdata.qty=itemqty;var itemprice=itemrow.find(".mini-cart-price").text();itemprice=parseFloat(itemprice.replace(/[^0-9\.\-\+]/g,""));totalprice=totalprice+itemprice;itemprice=itemprice/itemqty;rowdata.price=itemprice;rowdata.sku=rowdata.name;var itemsku=itemrow.find(".sku .value");if(itemsku!=null&&itemsku.length>0){var tempskudata=myTrim(itemsku.text());if(tempskudata!=null&&tempskudata.length>0)
rowdata.sku=tempskudata;}
data.push(rowdata);});}
if(data.length>0){try{var temptotal=_insideJQ(".estimated-total .sub-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".mini-cart-totals .mini-cart-subtotals .value").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".totals .grand-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".order-totals-table .order-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
data.push({"action":"trackOrder","orderId":orderId,"orderTotal":totalprice});return data;}}
catch(ex){log("getOrderData error. ",ex);}
try{var data=[];var totalprice=0;var orderId="auto";var itemrows=_insideJQ(".cart .product-summary .row .product-line-item");if(itemrows!=null&&itemrows.length>0){itemrows.each(function(rowindex){var itemrow=_insideJQ(this);var rowdata={};rowdata.action="addItem";rowdata.orderId=orderId;rowdata.name=myTrim(itemrow.find("img.product-image").attr("alt"));rowdata.img=itemrow.find("img.product-image").get(0).src;var itemqty=itemrow.find(".qty-card-quantity-count").text();itemqty=parseFloat(itemqty);rowdata.qty=itemqty;var itemprice=itemrow.find(".line-item-total-price-amount").first().text();itemprice=parseFloat(itemprice.replace(/[^0-9\.\-\+]/g,""));totalprice=totalprice+itemprice;itemprice=itemprice/itemqty;rowdata.price=itemprice;rowdata.sku=rowdata.name;var itemsku=itemrow.find(".item-attributes .item-model").first();if(itemsku!=null&&itemsku.length>0){var tempskudata=myTrim(itemsku.text());if(tempskudata!=null&&tempskudata.length>0&&tempskudata.indexOf(":")!=-1)
rowdata.sku=myTrim(tempskudata.split(":")[1]);}
data.push(rowdata);});}
if(data.length>0){try{var temptotal=_insideJQ(".estimated-total .sub-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".mini-cart-totals .mini-cart-subtotals .value").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".totals .grand-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".order-totals-table .order-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
data.push({"action":"trackOrder","orderId":orderId,"orderTotal":totalprice});return data;}}
catch(ex){log("getOrderData error. ",ex);}
try{var data=[];var totalprice=0;var orderId="auto";if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.checkout)!="undefined"&&dataLayer[i].ecommerce.checkout!=null&&typeof(dataLayer[i].ecommerce.checkout.products)!="undefined"&&dataLayer[i].ecommerce.checkout.products!=null&&dataLayer[i].ecommerce.checkout.products.length>0){for(var l=0;l<dataLayer[i].ecommerce.checkout.products.length;l++){var itemrow=dataLayer[i].ecommerce.checkout.products[l];var rowdata={};rowdata.action="addItem";rowdata.orderId=orderId;rowdata.name=itemrow.name;if(typeof(itemrow.quantity)!="undefined"&&itemrow.quantity!=null)
rowdata.qty=itemrow.quantity;else rowdata.qty=1;rowdata.price=itemrow.price;totalprice=totalprice+(rowdata.price*rowdata.qty);rowdata.sku=itemrow.id;rowdata.category=itemrow.category;try{var tempimgs=_insideJQ(".cart .row img.product-image");for(var p=0;p<tempimgs.length;p++){var tempsrc=tempimgs.get(p).src;if(tempsrc.toLowerCase().indexOf(rowdata.sku.toLowerCase())!=-1){rowdata.img=tempsrc;}}}catch(imgex){}
data.push(rowdata);}
break;}}}
if(data.length>0){try{var temptotal=_insideJQ(".estimated-total .sub-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".mini-cart-totals .mini-cart-subtotals .value").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".totals .grand-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".grand-total .grand-total-sum:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
try{var temptotal=_insideJQ(".order-totals-table .order-total:last").text();if(temptotal!=null&&temptotal.length>0){var temptotalval=parseFloat(temptotal.replace(/[^0-9\.\-\+]/g,""));if(isNumber(temptotalval))
totalprice=temptotalval;}}catch(totalex){}
data.push({"action":"trackOrder","orderId":orderId,"orderTotal":totalprice});return data;}}
catch(ex){log("getOrderData error. ",ex);}
return null;}
function getOrderDataCheckout(){try{var data=[];var totalprice=0;var tables=null;if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.checkout)!="undefined"&&dataLayer[i].ecommerce.checkout!=null&&typeof(dataLayer[i].ecommerce.checkout.products)!="undefined"&&dataLayer[i].ecommerce.checkout.products!=null&&dataLayer[i].ecommerce.checkout.products.length>0){tables=dataLayer[i].ecommerce.checkout.products;break;}}}
if(tables!=null&&tables.length>0){for(var i=0;i<tables.length;i++){var row=tables[i];var item_name=row.name;var sku=row.id
var category=row.category;var price=row.price
price=parseFloat(price);var qty=row.quantity;totalprice=totalprice+(price*qty);data.push({"action":"addItem","orderId":"auto","name":myTrim(item_name),"price":price,"sku":myTrim(sku),"category":myTrim(category),"qty":qty});}
if(data.length>0){try{var tempcontent=getElementsByClassNameManual("order-total",document);if(tempcontent!=null&&tempcontent.length>0){var temptext=tempcontent[tempcontent.length-1].innerText||tempcontent[tempcontent.length-1].textContent;totalprice=parseFloat(temptext.replace(/[^0-9\.\-\+]/g,""));}}
catch(totalex){}
data.push({"action":"trackOrder","orderId":"auto","orderTotal":totalprice});}
return data;}
return null;}
catch(ex){log("getOrderDataCheckout error. ",ex);return null;}}
function orderConfirmProcess(){try{var data=[];var detail=null;if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].ecommerce)!="undefined"&&dataLayer[i].ecommerce!=null&&typeof(dataLayer[i].ecommerce.purchase)!="undefined"&&dataLayer[i].ecommerce.purchase!=null&&typeof(dataLayer[i].ecommerce.purchase.actionField)!="undefined"&&dataLayer[i].ecommerce.purchase.actionField!=null&&typeof(dataLayer[i].ecommerce.purchase.actionField.id)!="undefined"&&dataLayer[i].ecommerce.purchase.actionField.id!=null&&dataLayer[i].ecommerce.purchase.actionField.id.length>0){detail=dataLayer[i].ecommerce.purchase;}}}
if(detail!=null){var totalprice=detail.actionField.revenue;var decimalSign=getDecimalSign(myTrim(totalprice.replace(/[^\d.,]/g,'')));if(decimalSign==","){totalprice=totalprice.replace(/[.]/g,"");totalprice=totalprice.replace(",",".");}
totalprice=parseFloat(totalprice.replace(/[^0-9\.\-\+]/g,""));var orderID=detail.actionField.id;if(typeof(orderID)!="undefined"&&orderID!=null&&orderID.length>0&&orderID!="auto"){try{var lastOrderID=sessionStorage.getItem("insidelastorderid");if(lastOrderID==orderID){return null;}}
catch(orderidex){}
data.push({"action":"trackOrder","orderId":"auto","newOrderId":orderID,"orderTotal":totalprice,"data":detail.actionField,"update":true,"complete":true});}
return data;}
return null;}
catch(ex){log("orderConfirmProcess error. ",ex);return null;}}
function getVisitorData(){try{if(typeof(dataLayer)!="undefined"&&dataLayer!=null&&dataLayer.length>0){for(var i=0;i<dataLayer.length;i++){if(typeof(dataLayer[i].email)!="undefined"&&dataLayer[i].email!=null&&dataLayer[i].email.length>0){return dataLayer[i];}}}}
catch(visitidex){}
return null;}
function insertInsideTag(){try{_insideGraph.processQueue();}
catch(tempex){}}
function sendToInside(){try{tracker.url=window.location.href;var visitorData=getVisitorData();if(visitorData!=null){tracker.visitorData=visitorData;if(typeof(visitorData.email)!="undefined"&&visitorData.email!=null){tracker.visitorId=visitorData.email;tracker.visitorData.user_email=visitorData.email;}
if(typeof(visitorData.firstName)!="undefined"&&visitorData.firstName!=null)
tracker.visitorName=visitorData.firstName;if(typeof(visitorData.lastName)!="undefined"&&visitorData.lastName!=null)
tracker.visitorName=tracker.visitorName+" "+visitorData.lastName;if(typeof(tracker.visitorName)!="undefined"&&tracker.visitorName!=null&&tracker.visitorName.length>0)
tracker.visitorData.user_name=tracker.visitorName;}
var view=getViewData();if(view!=null){if(view.type=="orderconfirmed"){var tempconfirm=orderConfirmProcess();if(tempconfirm!=null&&tempconfirm.length>0){for(var i=0;i<tempconfirm.length;i++){_inside.push(tempconfirm[i]);try{if(tempconfirm[i].action=="trackOrder")
sessionStorage.setItem("insidelastorderid",tempconfirm[i].newOrderId);}
catch(tempex){}}}}
else{var orderData=getOrderData();if(useCustomFunctionForCheckout&&view.type=="checkout"){orderData=getOrderDataCheckout();}
if(orderData!=null&&orderData.length>0){for(var i=0;i<orderData.length;i++){_inside.push(orderData[i]);if(orderData[i].action=="trackOrder"){view.orderId=orderData[i].orderId;view.orderTotal=orderData[i].orderTotal;insideOrderTotal=orderData[i].orderTotal;}}}}
_inside.push(view);log("Inside Debug: ",_inside);}}
catch(sendex){_inside=[];_inside.push({"action":"trackView","type":"other","name":"Check: "+window.location.href});log(sendex);}
insertInsideTag();if(!_insideFirstLoad)
_insideFirstLoad=true;}
var tempview=getViewData();if(tempview!=null&&typeof(tempview.type)!="undefined"&&tempview.type!=null&&tempview.type=="orderconfirmed"){deferWait(sendToInside,function(){var tempconfirm=orderConfirmProcess();if(tempconfirm!=null&&tempconfirm.length>0){return true;}
return document.readyState!='loading'&&document.readyState!='interactive';});}
else{deferWait(sendToInside,function(){if(document.readyState!='loading'&&document.readyState!='interactive'){keepWait(sendToInside,function(){if(!_insideFirstLoad)
return false;if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null){var temporderdata=getOrderData();if(useCustomFunctionForCheckout&&tempview.type=="checkout"){temporderdata=getOrderDataCheckout();}
if(temporderdata!=null&&temporderdata.length>0){for(var i=0;i<temporderdata.length;i++){if(temporderdata[i].action=="trackOrder"){if(insideOrderTotal!=temporderdata[i].orderTotal){return true;}}}}
else if(insideOrderTotal>0){insideOrderTotal=0;return true;}}
return false;});return true;}
return false;});}}
if(typeof(_insideGraph)!="undefined"&&_insideGraph!=null&&typeof(_insideGraph.current)!="undefined"&&_insideGraph.current!=null){processInside(_insideGraph.current)}
else{var _insideTracker={"action":"getTracker","account":accountKey};try{var tempweburl=window.location.href.toLowerCase();if(tempweburl.indexOf("www.oliviaburton.com/uk")!=-1){subsiteId="44";}
else if(tempweburl.indexOf("us.oliviaburton.com")!=-1){subsiteId="45";}}catch(subsitex){}
if(subsiteId!=null){_insideTracker.subsiteId=subsiteId;}
_inside.push(_insideTracker);_inside.push({"action":"bind","name":"onload","callback":function(tracker){if(_insideFirstLoad)
return;_insideJQ=_insideGraph.jQuery;processInside(tracker)}});(function(w,d,s,u){a=d.createElement(s),m=d.getElementsByTagName(s)[0];a.async=1;a.src=u;m.parentNode.insertBefore(a,m);})(window,document,"script","//"+trackerURL+"/ig.js");}})();