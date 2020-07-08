//was "experian". now "Cheetah Digital Marketing Suite"
var pageType = _satellite.getVar('pageType') || '';
if (pageType !== 'checkout:confirmation') {
  //CCMP SDK
  window.cnvAsyncInit = function() {
    Cnv.init({
      custId: '356',
      entityId: '100',
      restLink: 'sts.eccmp.com',
      enableFacebook: false,
      enableSocialEvents: false
    });
  };
  (function() {
    var cnv = document.createElement('script');
    cnv.async = true;
    var cnvJsHost = (("https:" == document.location.protocol) ? "https://sts.eccmp.com" : "http://sts.eccmp.com");
    cnv.src = cnvJsHost + '/sts/scripts/conversen-SDK.js';
    document.body.appendChild(cnv);
  }());
}