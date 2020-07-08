_satellite.pushAsyncScript(function(event, target, $variables){
  if (window.location.hostname.indexOf('destinationkors') === -1) {
  if (typeof window.mkorsData !== "undefined" && typeof window.mkorsData.page !== "undefined" &&
  typeof window.mkorsData.page.type !== 'undefined') {

  	var siteID = _satellite.getVar('salesForceDMPSiteID');

    window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
    (function(){
      var k=document.createElement('script');k.type='text/javascript';k.async=true;
      k.src=(location.protocol==='https:'?'https:':'http:')+'//cdn.krxd.net/controltag/' + siteID + '.js';
      var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
    }());
    
     _satellite.setVar('DMPScriptsLoaded', 'true');
    _satellite.setVar('DMPFirstLoad', 'true');
    _satellite.notify('DMP Scripts Loaded Page TOP', 5);
  } else {
    _satellite.notify('DMP Scripts Not Loaded Page Top - DL Not Init', 5);
    _satellite.setVar('DMPScriptsLoaded', 'false');
  }
}
});
