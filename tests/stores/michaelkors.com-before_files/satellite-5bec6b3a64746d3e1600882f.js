_satellite.pushAsyncScript(function(event, target, $variables){
  var pageType = '';

// home, searchresults, category, product, cart, purchase, or other
switch (_satellite.getVar('pageType').toLowerCase()) {
  case "home page":
    pageType = "home";
    break;
  case "search results":
    pageType = "searchresults";
    break;
  case "category":
  case "subcategory":
  case "trend":
    pageType = "category";
    break;
  case "product detail":
  case "product detail monogramming":
  case "product detail the look":
    pageType = "product";
    break;
  case "shopping cart":
    pageType = "cart";
    break;
  case "checkout:confirmation":
    pageType = "purchase";
    break;
  default:
    pageType = "other";
    break;
}
_satellite.notify('Bing Page View. pageType: ' + pageType, 5);
window.uetq = window.uetq || [];
window.uetq.push('event', 'page_view', {'ecomm_pagetype': pageType});

});
