_satellite.pushAsyncScript(function(event, target, $variables){
  _satellite.notify('Floodlight Footer Start', 5);
function sendgtagFooterEvent() {
  _satellite.notify('Floodlight Footer Fired', 5);
  /*
   Start of DoubleClick Floodlight Tag: Please do not remove
   Activity name of this tag: MK-US-D-Global Footer
   URL of the webpage where the tag is expected to be placed: http://www.michaelkors.com
   This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
   Creation Date: 10/13/2016
   */
  var activityId = '4350594';
  var mcid = _satellite.getVar('mcid');
  var activityType = 'categ429';
  var activityCategory = 'mk-d-774';
  var siteType = _satellite.getVar('siteType');
  var country = _satellite.getVar('country');
  if (siteType.indexOf('desktop') > -1) {
    if (country == "US") {
      activityCategory = "mk-d-774";
    } else if (country == "CA") {
      activityCategory = "mk-d-294";
    }
  }
  if (siteType.indexOf('mobile') > -1) {
    if (country == "US") {
      activityCategory = "mk-m-494";
    } else if (country == "CA") {
      activityCategory = "mk-m-432";
    }
  }

  var flData = {};
  flData.allow_custom_scripts = true;
  flData.send_to ='DC-4350594/' + activityType + '/' + activityCategory + '+unique';
  flData.u19 = '';
  flData.u20 = mcid;

  gtag('js', new Date());

  gtag('config', 'DC-4350594');

  gtag('event', 'conversion', flData);
  //<!-- End of DoubleClick Floodlight Tag: Please do not remove -->
}

if (typeof window.gtag === "function") {
  sendgtagFooterEvent();
} else {
  var attempts = 0;
  _satellite.notify('setinterval in floodlight footer', 5);
  var wait = setInterval(function () {
    attempts++;
    if (typeof window.gtag === "function") {
      sendgtagFooterEvent();
      clearInterval(wait);
    } else {
      if(attempts >= 3) {
        clearInterval(wait);
        console.log('footer timed out waiting for gtag to initialize');
      }
    }
  }, 5000);
}

});
