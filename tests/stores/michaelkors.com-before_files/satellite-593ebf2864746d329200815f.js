_satellite.pushAsyncScript(function(event, target, $variables){
  // Master FloodLight pixel for US & CA
_satellite.notify('Floodlight Page Bottom Start', 5);
function sendgtagEvent() {
  _satellite.notify('Floodlight Page Bottom Sent', 5);
  // Master FloodLight pixel for US & CA
  var flType = "categ429";
  var flCat = _satellite.getVar('master_floodLight_cat');
  _satellite.notify('Floodlight cat: ' + flCat, 5);
  var flData = {};
  switch (_satellite.getVar('channel').toLowerCase()) {
    case 'home Page':
      flType = 'homep370';
      break;
    case 'shopping cart':
      flType = 'shopp507';
      flData.u5 = _satellite.getVar('cartProductCategoryID');
      flData.u6 = _satellite.getVar('cartProductID');
      flData.u8 = _satellite.getVar('cartProductPrice');
      flData.u9 = _satellite.getVar('cartProductQuantity');
      flData.u17 = _satellite.getVar('cartProductName');
      break;
    default:
      flType = "categ429";
      break;
  }
  //This is to pick up the PDP page
  var pageType = _satellite.getVar('pageType').toLowerCase();
  if (pageType.match(/product detail/ig)) {
    flType = "produ026";
    flData.u5 = _satellite.getVar('productCategoryID');
    flData.u6 = _satellite.getVar('productID');
    flData.u8 = _satellite.getVar('productPrice');
    flData.u9 = "1";
    flData.u17 = _satellite.getVar('productName');
  }
  flData.allow_custom_scripts = true;
  flData.send_to ='DC-4350594/' + flType + '/' + flCat + '+unique';

  if (flCat !== '') {
    window.gtag('js', new Date());

    window.gtag('config', 'DC-4350594');

    window.gtag('event', 'conversion', flData);
  }
}

if (typeof window.gtag === "function") {
  sendgtagEvent();
} else {
  _satellite.notify('Setinterval in floodlight page bottom', 5);
  var attempts = 0;
  var wait = setInterval(function () {
    attempts++;
    if (typeof window.gtag === "function") {
      sendgtagEvent();
      clearInterval(wait);
    } else {
      if(attempts >= 3) {
        clearInterval(wait);
        console.log('timed out waiting for gtag to initialize');
      }
    }
  }, 5000);
}

});
