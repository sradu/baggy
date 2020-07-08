if (typeof window.pintrk !== 'function') {
  ! function(e) {
    if (!window.pintrk) {
      window.pintrk = function() {
        window.pintrk.queue.push(Array.prototype.slice.call(arguments));
      };
      var n = window.pintrk;
      n.queue = [], n.version = "3.0";
      var t = document.createElement("script");
      t.async = !0, t.src = e;
      var r = document.getElementsByTagName("script")[0];
      r.parentNode.insertBefore(t, r);
    }
  }("https://s.pinimg.com/ct/core.js");
  pintrk('load', '2613775416561');
}
pintrk('page');
if ((_satellite.getVar('channel') == 'Home Page') && (window.location.hostname.indexOf('destination') == -1)) {
  pintrk('track', 'pagevisit');
}