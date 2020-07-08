// cart page
if(_satellite.getVar('bamxTagsEnabled') === 'true'){
  function countProperties(obj) {
    var count = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        ++count;
      }
    }
    return count;
  }
  var productsInCart = [];
  if (typeof _satellite.getVar('window.mkorsData.cart.product') !== 'undefined') {
    var cartLength = countProperties(window.mkorsData.cart.product);
    var i = 0;
    if (cartLength > 0) {
      while (i < cartLength) {
        var prodObj = {};
        prodObj.brand = 'Michael Kors';
        prodObj.id = window.mkorsData.cart.product[i].productID || null;
        prodObj.name = window.mkorsData.cart.product[i].name || null;
        prodObj.price = parseFloat(window.mkorsData.cart.product[i].pricePer) || null;
        prodObj.quantity = window.mkorsData.cart.product[i].qty || null;
        prodObj.size = window.mkorsData.cart.product[i].size || null;
        productsInCart.push(prodObj);
        i++;
      }
    }
    window.BAMX_EVENT_DATA = {
      page_type: _satellite.getVar('pageType'),
      site_type: _satellite.getVar('siteType'),
      ip: null,
      user_email: _satellite.getVar('md5HashedEmail') || null,
      user_id: null,
      is_new_visitor: _satellite.getVar('isNewVisitor').status || null,
      product_id: null,
      product_name: null,
      product_brand: null,
      product_category: null,
      product_price: null,
      product_size: null,
      product_quantity: null,
      products_in_cart: productsInCart || null,
      products_purchased: null,
      subscription_email: null,
      order_id: null,
      order_value: null,
      currency: _satellite.getVar('config-Currency') || null,
      name: null,
      billing_city: null,
      billing_state: null,
      billing_zip_code: null,
      billing_country: null,
      last_four: null,
      is_new_customer: null
    };
    (function(account) {
      try {
        var b = document.createElement("script");
        b.type = "text/javascript";
        b.src = "//static.bam-x.com/tags/" + account + ".js";
        b.async = true;
        var a = document.getElementsByTagName("script")[0];
        a.parentNode.insertBefore(b, a);
      } catch (e) {}
    }("michaelkors"));
  }
}