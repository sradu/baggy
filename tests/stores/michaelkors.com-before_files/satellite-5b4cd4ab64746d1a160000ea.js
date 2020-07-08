_satellite.pushAsyncScript(function(event, target, $variables){
  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var cjEvent = getParameterByName('cjevent');
if (cjEvent !== null && cjEvent !== '') {
  _satellite.setCookie('cjEvent', cjEvent, 365);
}
});
