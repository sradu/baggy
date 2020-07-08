_satellite.pushAsyncScript(function(event, target, $variables){
  // Master FloodLight pixel for US & CA
_satellite.notify('Floodlight PMG Page Bottom Start', 5);
function sendPMGEvent() {
  _satellite.notify('Floodlight PMG Page Bottom Sent', 5);
  // Master FloodLight pixel for US & CA
  var flData = {};
  switch (_satellite.getVar('channel').toLowerCase()) {
    case 'shopping cart':
      flData.u5 = _satellite.getVar('cartProductCategoryID');
      flData.u10 = _satellite.getVar('cartProductPrice');
    	flData.u11 = _satellite.getVar('cartProductID');
    	flData.u12 = _satellite.getVar('cartProductName');
      break;
    default:
      break;
  }
  //This is to pick up the PDP page
  var pageType = _satellite.getVar('pageType').toLowerCase();
  if (pageType.match(/product detail/ig)) {
    flData.u5 = _satellite.getVar('productCategoryID');
    flData.u6 = _satellite.getVar('productID');
    flData.u10 = _satellite.getVar('productPrice');
    flData.u12 = _satellite.getVar('productName');
  }
  vipTier = _satellite.getVar('loyaltyTier');
  if (vipTier && vipTier !== "" && vipTier !== "Non-Loyalty") {
  	flData.u18 = vipTier;
  }
  flData.u16 = _satellite.getVar('mcid');
  flData.u3 = _satellite.getVar('country');
  flData.u4 = _satellite.getVar('language');
  flData.u7 = document.location.href;
  flData.allow_custom_scripts = true;
  flData.send_to ='DC-9973721/rtgco0/globa0+standard';

  
    window.gtag('js', new Date());

    window.gtag('config', 'DC-9973721');

    gtag('event', 'conversion', flData);
  
}

if (typeof window.gtag === "function") {
  sendPMGEvent();
} else {
  _satellite.notify('Setinterval in floodlight PMG page bottom', 5);
  var attempts = 0;
  var wait = setInterval(function () {
    attempts++;
    if (typeof window.gtag === "function") {
      sendPMGEvent();
      clearInterval(wait);
    } else {
      if(attempts >= 3) {
        clearInterval(wait);
        console.log('timed out waiting for gtag (PMGFL) to initialize');
      }
    }
  }, 5000);
}

});
