_satellite.pushAsyncScript(function(event, target, $variables){
  if(window.location.hostname.indexOf('destinationkors') === -1 && window.rfk && typeof window.rfk.push === 'function'){
  _satellite.notify('Reflektion Cart Status Event Fired', 5);
  var rfk = window.rfk || [];
  var cartProducts = [];
  if (typeof _satellite.getVar('window.mkorsData.cart.product') !== 'undefined') {
    var productLength = Object.keys(window.mkorsData.cart.product).length;
    var i = 0;
    if (productLength > 0) {
      while (i < productLength) {
        var prodObj = {};
        prodObj.sku = window.mkorsData.cart.product[i].productID || null;
        cartProducts.push(prodObj);
        i++;
      }
    }
  }
  //removing www/sit/uat prefixes from host
  var hostArray = window.location.host.split(".");
  var domain = hostArray.slice(hostArray.length -hostArray.length +1).join(".");
  
  var rfkObj = {
    "type": "status",
    "name": "cart",
    "value": {
      "products": cartProducts,
    },
    // Following 2 fields are OPTIONAL for US and CA
    // but REQUIRED for EU
    "dn": domain,
    "locale": {
      "lg": _satellite.getVar('language'),
      "co": _satellite.getVar('country').toLowerCase(),
      "cy": _satellite.getVar('currency').toLowerCase()
    }
  };
  rfk.push(["trackEvent", rfkObj]);
}
});
