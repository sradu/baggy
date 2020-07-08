if (_satellite.getVar('country') !== "CA") {
  if (window.location.hostname.indexOf('destinationkors') === -1) {
    var dtmLibVersion = 'production';
    if (_satellite.settings.isStaging) {
      dtmLibVersion = 'staging';
    }
    var cbScript = document.createElement('script');
    cbScript.src = 'https://www.glancecdn.net/cobrowse/CobrowseJS.ashx?group=19943&site=' + dtmLibVersion;
    cbScript.setAttribute('id', 'cobrowsescript');
    cbScript.setAttribute('data-inputevents', '{"ctrl-13":"startSession"}');
    cbScript.setAttribute('data-groupid', '19943');
    cbScript.setAttribute('data-site', dtmLibVersion);
    cbScript.setAttribute('charset', 'UTF-8');
    document.body.appendChild(cbScript);
  }
}