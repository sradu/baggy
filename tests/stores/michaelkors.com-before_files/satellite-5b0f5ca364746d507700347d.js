_satellite.pushAsyncScript(function(event, target, $variables){
  if(_satellite.getVar('isUS_CA') !== "true") {
  function sendSPAEvent() {
    _satellite.notify('DY SPA Fired', 5);
    var pageType = '';
    if (window.mkorsData && window.mkorsData.page && window.mkorsData.page.type) {
      pageType = window.mkorsData.page.type;
    }
    var recommendationObject = {};
    switch (pageType.toLowerCase()) {
      case "home page":
        recommendationObject.type = "HOMEPAGE";
        break;
      case "category":
      case "subcategory":
      case "trend":
        recommendationObject.type = "CATEGORY";
        var categoriesString = mkorsData.page.siteSectionLevel3;
        var categoriesArray = categoriesString.split(">");
        if(Array.isArray(categoriesArray)) {
          for(var x = 0; x < categoriesArray.length; x++) {
            categoriesArray[x] = categoriesArray[x].replace('>', '');
            categoriesArray[x] = categoriesArray[x].trim();
          }
          recommendationObject.data = categoriesArray;
        } else {
          categoriesArray = categoriesArray.replace('>', '');
          categoriesArray = categoriesArray.trim();
          recommendationObject.data = [categoriesArray];
        }
        break;
      case "product detail":
      case "product detail monogramming":
        recommendationObject.type = "PRODUCT";
        var productId = '';
        if(Array.isArray(window.mkorsData.product)){
          productId = window.mkorsData.product[0].productID;
        }else {
          productId = window.mkorsData.product.productID;
        }
        recommendationObject.data = [productId.toString()];
        break;
      case "product detail the look":
        recommendationObject.type = "CATEGORY";
        recommendationObject.data = ['Bundle'];
        break;
      case "shopping cart":
        recommendationObject.type = "CART";
        var productArray = [];
        var cartProducts = {};
        if (mkorsData.cart && mkorsData.cart.product) {
          cartProducts = mkorsData.cart.product;
        }
        for (var key in cartProducts) {
          if (cartProducts.hasOwnProperty(key)) {
            var productId = cartProducts[key].productID;
            productArray.push(productId.toString());
          }
        }
        recommendationObject.data = productArray;
        break;
      default:
        recommendationObject.type = "OTHER";
        break;
    }
    recommendationObject.lng = _satellite.getVar('language');
    window.DY.API('spa', {

      context: recommendationObject,

      url: window.location.href,

      countAsPageview: true

    });
  }
  _satellite.notify('DY Page Bottom', 5);
  if (_satellite.getVar('DYScriptsLoaded') === 'true') { //DYScriptsLoaded set in All Pages TOP Rule
    if (typeof window.DY !== 'undefined' && typeof window.DY.API === 'function') { //Ensure DY object set before using to avoid errors
      if (_satellite.getVar('DYFirstLoad') === 'false') { // we do not want to fire spa event if it is the initial landing page
        sendSPAEvent();
      }
    } 
  } else {
    _satellite.track('loadDYScripts'); // if scripts not loaded, load scripts now
    _satellite.setVar('DYScriptsLoaded', 'true');
    _satellite.setVar('DYFirstLoad', 'false'); // we want spa event to fire next time
  }
  _satellite.setVar('DYFirstLoad', 'false'); // set this flag to false so the next navigation calls spa event
}

});
