_satellite.pushAsyncScript(function(event, target, $variables){
  (function(w, d, s, sr, c) {
  w[sr] = w[sr] || [];
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.async = true;
  j.src = d.location.protocol + '//d1n00d49gkbray.cloudfront.net/js/' + c + '.js';
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', '_smtr', _satellite.getVar('smarterHQclientName'));
});
