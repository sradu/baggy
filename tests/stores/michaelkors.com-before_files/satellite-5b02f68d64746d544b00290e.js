_satellite.pushAsyncScript(function(event, target, $variables){
  var url = 'https://www.googletagmanager.com/gtag/js?id=DC-4350594';
var script = window.document.createElement('script');

script.type = 'text/javascript';
script.async = true;
script.src = url;

script.onload = function () {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){window.dataLayer.push(arguments);}
  gtag('set', 'allow_ad_personalization_signals', true);
};

window.document.head.appendChild(script);

});
