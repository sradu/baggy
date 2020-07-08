if (_satellite.getVar('country') !== "CA") {
  if (window.location.hostname.indexOf('destinationkors') === -1) {
    var country = _satellite.getVar('country') || '';
    country = country.toLowerCase();

    if (_satellite.settings.isStaging) {
      // EU SITES USING LIVE TENANTS FOR TESTING!! DO NOT CHANGE
      if(_satellite.getVar('isUS_CA') === "true") {
        var conciergeTenantName = 'michaelkorstest';
      } else {
        var conciergeTenantName = _satellite.getVar('moxieTenant');
      }
    } else {
      var conciergeTenantName = _satellite.getVar('moxieTenant');
    }


    if (country) {
      (function(config) {
        var conTag = document.createElement('script');
        var host = config.isUK ? 'uk.gomoxie.solutions' : 'gomoxie.solutions';
        conTag.src = 'https://asset.gomoxie.solutions/concierge/' + config.tenantName +
          '/client/concierge-client.js';
        conTag.setAttribute('data-concierge', '1');
        conTag.setAttribute('defer', 'true');
        conTag.setAttribute('data-concierge-host', host);
        document.body.appendChild(conTag);
      }({
        /* Replace 'tenant_name' with your actual tenant name.
          If your tenant is hosted in the UK, set the isUK attribute to be true.
          */
        tenantName: conciergeTenantName,
        isUK: false
      }));
    }

    // SPA timer
    // resetPageTimer function will be called at page bottom if defined
    var timeOnPage = 1;
    window.addEventListener("GoMoxie:conciergeReady", function(e) {
      window.MoxieData = window.MoxieData || {};
      MoxieData.pageTimeInSecs = timeOnPage;
      setInterval(function() {
        updatePageTimer();
      }, 1000);
    });

    function updatePageTimer() {
      timeOnPage++;
      MoxieData.pageTimeInSecs++;
    }

    function resetPageTimer() {
      timeOnPage = 0;
      MoxieData.pageTimeInSecs = 0;
    }
  }
}
