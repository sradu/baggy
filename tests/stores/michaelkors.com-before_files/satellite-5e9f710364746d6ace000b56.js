if (_satellite.getVar('country') !== "CA") {
  if (window.location.hostname.indexOf('destinationkors') === -1) {
    var myTransactionTotal = 0.00; // Total transaction value.
    var myCurrentCartValue = 0.00; // Current cart value, updated throughout the journey
    var myCurrentCartItems = [];

    var productObj = _satellite.getVar('window.mkorsData.cart.product') || {};
    for (var key in productObj) {
      if (productObj.hasOwnProperty(key)) {
        var itemDetail = {};
        itemDetail.name = productObj[key].name;
        itemDetail.skuOrId = productObj[key].sku;
        itemDetail.value = parseFloat(productObj[key].pricePer);
        myCurrentCartValue = myCurrentCartValue + itemDetail.value;
        itemDetail.quantity = parseFloat(productObj[key].qty);
        itemDetail.description = '';
        itemDetail.uom = 'each';
        myCurrentCartItems.push(itemDetail);
      }
    }

    conciergeReady.then(function() {
      _satellite.notify("conciergeReady Promise has fired for cart update session.");
      window.GoMoxie.concierge.updateSession({
        transactionTotal: myTransactionTotal,
        currentCartValue: myCurrentCartValue,
        currentCartItems: myCurrentCartItems
      });
    });
  }
}
