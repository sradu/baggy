_satellite.pushAsyncScript(function(event, target, $variables){
  if (window.location.hostname.indexOf('destinationkors') === -1) {
  _satellite.notify('Reflektion Global Script TOP Fired', 5);
  var country = _satellite.getVar('country');
  var clientID = "";
  if (country === 'US') {
    clientID = '263221008';
  } else if (country === 'CA') {
    clientID = '154160804';
  } else {
    clientID = '187336372';
  }

  var testFlag = _satellite.settings.isStaging ? "?cv=test" : "";
  var url = '//' + clientID + '-prod.rfksrv.com/rfk/js/11275-' + clientID + '/init.js' + testFlag;
  var script = window.document.createElement('script');
  script.onload = function () {
    //do stuff with the script
  };
  script.type = 'text/javascript';
  script.async = true;
  script.src = url;

  window.document.head.appendChild(script);
}
});
