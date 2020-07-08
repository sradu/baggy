_satellite.pushAsyncScript(function(event, target, $variables){
  var url = '//c.oracleinfinity.io/acs/account/zc9tyu5qpy/js/main/odc.js';
var urlExt = "";
if (_satellite.settings.isStaging) {
	urlExt = "?_ora.context=analytics:development";
} else {
  urlExt = "?_ora.context=analytics:production";
}
url += urlExt;
var script = window.document.createElement('script');

script.type = 'text/javascript';
script.async = true;
script.src = url;

window.document.head.appendChild(script);

// From vendor documentation
// <script type="text/javascript" async src="//c.oracleinfinity.io/acs/account/{account_GUID}/{tag_ID}/odc.js"></script>
});
