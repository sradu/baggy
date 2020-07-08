_satellite.pushAsyncScript(function(event, target, $variables){
  (function (win, doc, sdk_url) {
  if (win.snaptr) return;
  var tr = win.snaptr = function () {
    tr.handleRequest ? tr.handleRequest.apply(tr, arguments) : tr.queue.push(arguments);
  };
  tr.queue = [];
  var s = 'script';
  var new_script_section = doc.createElement(s);
  new_script_section.async = !0;
  new_script_section.src = sdk_url;
  var insert_pos = doc.getElementsByTagName(s)[0];
  insert_pos.parentNode.insertBefore(new_script_section, insert_pos);
})(window, document, 'https://sc-static.net/scevent.min.js');

var hashedEmail = _satellite.getVar('hashedID');
snaptr('init', '36b55a36-1511-4c86-a72a-5b93a1587f8a',
  {'user_hashed_email': hashedEmail});
snaptr('track', 'PAGE_VIEW');
});
