_satellite.pushAsyncScript(function(event, target, $variables){
  if (_satellite.getVar('country') == 'US') {
  var getHostname = function(href) {
    var link = document.createElement('a');
    link.href = href;
    return link.hostname;
  };
  var hostname = getHostname(window.location.href),
    gnScript = document.createElement('script');
  if ((hostname.indexOf('sit1') === 0) || (hostname.indexOf('sit') === 0)) {
    gnScript.src = 'https://qa.loopassets.net/app/michaelkors/loop.js';
  } 
  if (hostname.indexOf('uat1') === 0) {
    gnScript.src = 'https://qa.loopassets.net/app/michaelkors_uat/loop.js';
  }
  if (hostname.indexOf('www') === 0) {
    gnScript.src = 'https://www.loopassets.net/app/michaelkors/loop.js';
  } 
  if (gnScript.src !== '') {
    document.body.appendChild(gnScript);
  }
}
});
