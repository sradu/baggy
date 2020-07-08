_satellite.pushAsyncScript(function(event, target, $variables){
  (function(d, c) {
  var a = window,
    b = document,
    s = "script",
    a = a[d] = a[d] || {};
  a.c = {};
  a.c[c] = {};
  a.c[c].d = [];
  a.c[c].d.push("init:" + (new Date).getTime());
  a = b.getElementsByTagName(s)[0];
  b = b.createElement(s);
  b.async = !0;
  b.src = "//t.a3cloud.net/" + c + "/tag.js?ns=" + d;
  a.parentNode.insertBefore(b, a);
})("am", "AM-141090");
});
