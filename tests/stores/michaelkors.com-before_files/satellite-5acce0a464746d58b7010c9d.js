_satellite.pushAsyncScript(function(event, target, $variables){
  if (window.location.hostname.indexOf('destinationkors') === -1 && typeof window.rfk === 'undefined') {
  if (typeof jQuery !== 'undefined') {
    _satellite.notify('Reflektion Global Script Fired', 5);
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
    jQuery.ajax({
      type: "GET",
      url: url,
      success: {},
      dataType: "script",
      cache: true
    });
  }
}
});
