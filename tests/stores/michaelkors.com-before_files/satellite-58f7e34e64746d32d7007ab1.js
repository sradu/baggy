_satellite.pushAsyncScript(function(event, target, $variables){
  //quantcast
try{
  var _qevents = _qevents || [];
  var caseType = _satellite.getVar('channel');
  const regex = /Men|Womens|Watches|Handbags|Accessories|Sale/i;
  const str = caseType;
  let m;
  //Making sure the pixel fired on the apporirate pages.
  if ((m = regex.exec(str)) !== null) {
    (function() {
    var elem = document.createElement('script');
    elem.src = (document.location.protocol == "https:" ? "https://secure" : "http://edge") + ".quantserve.com/quant.js";
    elem.async = true;
    elem.type = "text/javascript";
    var scpt = document.getElementsByTagName('script')[0];
    scpt.parentNode.insertBefore(elem, scpt);
    })();
  }
  switch (_satellite.getVar('channel')){
    case 'Accessories':
      _qevents.push({
        qacct:"p-UULkyjsWmmLsJ",
        labels:"_fp.event.Accessories"
      });
    break;
      case 'Men':
          _qevents.push({
            qacct:"p-UULkyjsWmmLsJ",
            labels:"_fp.event.Men"
          });
      break;
      case 'Womens':
          _qevents.push({
            acct:"p-UULkyjsWmmLsJ",
            labels:"_fp.event.Women"
          });
      break;
      case 'Sale':
        _qevents.push({
          qacct:"p-UULkyjsWmmLsJ",
          labels:"_fp.event.Sale"
        });
        break;
    case 'Watches':
      _qevents.push({
        qacct:"p-UULkyjsWmmLsJ",
        labels:"_fp.event.Watches"
      });
    break;	
    case 'Handbags':
      _qevents.push({
        qacct:"p-UULkyjsWmmLsJ",
        labels:"_fp.event.Bags"
      });	
    break;
  }
}catch(e){}
});
