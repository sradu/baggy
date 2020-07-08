_satellite.pushAsyncScript(function(event, target, $variables){
  var ftRandom = Math.random() * 1000000;
var ftIframe = document.createElement('iframe');
ftIframe.style.display = 'none';
ftIframe.src = 'https://servedby.flashtalking.com/container/7072;48792;5364;iframe/?spotName=Michael_Kors_Shoping_cart&U1=' +
  _satellite.getVar('cartProductID') + '&cachebuster=' + ftRandom;
document.body.appendChild(ftIframe);
});
