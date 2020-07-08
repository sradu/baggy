_satellite.pushAsyncScript(function(event, target, $variables){
  if (typeof window.Krux === 'function') {
  _satellite.notify('DMP Page Bottom', 5);
  if (_satellite.getVar('DMPFirstLoad') === 'false') {
  	// Note: Requires JavaScript ControlTag to be deployed on the page
  	// BEGIN Salesforce DMP AJAX ControlTag
    window.Krux('ns:michaelkors', 'page:load', function(err) {
      /* Optional, called just after the tags are finished loading.
       If err is not null, then something went wrong. (err will be an instanceof Error or null.)
       */
    }, {pageView: true /* Set to false if you don't want this counted as a page view. */});
    // END Salesforce DMP AJAX ControlTag
  	_satellite.notify('DMP AJAX Fired', 5);
  }
	
	_satellite.setVar('DMPFirstLoad', 'false');
} else {
  if (_satellite.getVar('DMPScriptsLoaded') === 'false') {
    // DMP scripts failed to load on page top
    // load scripts now
    var siteID = _satellite.getVar('salesForceDMPSiteID');

    window.Krux||((Krux=function(){Krux.q.push(arguments)}).q=[]);
    (function(){
      var k=document.createElement('script');k.type='text/javascript';k.async=true;
      k.src=(location.protocol==='https:'?'https:':'http:')+'//cdn.krxd.net/controltag/' + siteID + '.js';
      var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(k,s);
    }());
    _satellite.notify('DMP Scripts Loaded Page Bottom', 5);
    _satellite.setVar('DMPScriptsLoaded', 'true');
  	_satellite.setVar('DMPFirstLoad', 'false');
  }
}
});
