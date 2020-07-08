/**
* Oracle Infinity
* @preserve Copyright (c) 2017, 2018, 2019, Oracle and/or its affiliates. All rights reserved.
* common.js v0.0.22
* Copyright (c) 2017, 2018, 2019, Oracle and/or its affiliates. All rights reserved.
* Created: 2019-07-30T17:47:30+0000
*/
if(void 0===ORA)var ORA={};ORA.t||(ORA.t={}),ORA.t.i||(ORA.t.i={}),ORA.t.o||(ORA.t.o={}),ORA.t.u=function(n,t){var i=ORA.O(t.config)?t.config:{},e=ORA.O(t.data)?t.data:{},r=ORA.s(JSON.parse(JSON.stringify(n)),i),o=n.data?ORA.s(n.data,e):e;return ORA.O(o)&&(r.data=JSON.parse(JSON.stringify(o))),r},ORA.t.R=function(){return ORA.analyticsModule?ORA.analyticsModule.prototype.oraConfigObj:{}},ORA.t.A=function(n,t,i){for(var e in n)if(n.hasOwnProperty(e)&&"[object Object]"===Object.prototype.toString.call(n[e]))t[e]=i(t[e]||{},n[e]);else{if(!n.hasOwnProperty(e))return;t[e]=n[e]}},ORA.t.l=function(n,t){var i=n,e=t;return"[object Object]"===Object.prototype.toString.call(e)&&ORA.t.A(e,i,ORA.t.l),i},ORA.t.h=function(){for(var n={},t=[].splice.call(arguments,0);0<t.length;){var i=t.splice(0,1)[0];"[object Object]"===Object.prototype.toString.call(i)&&ORA.t.A(i,n,ORA.t.h)}return n},ORA.t.g=function(n,t){var u,c={},O=!1,s=n||function(n){return n},R=t||function(n){return n},a=function(){if(u=document.cookie)for(var n=u.split(";"),t=0;t<n.length;t++){var i,e=n[t].split("="),r=e.shift().replace(/^\s+|\s+$/g,"");1<=e.length&&(i=e.join("=")),o=r,a=R(i),o.replace(/\s/g,""),c[o]=a}var o,a;O=!0};this.p=function(n,t,i,e,r,o){var a=null;"session"!==e&&i!==undefined&&(a=new Date).setTime(a.getTime()+i);var u="";ORA.O(r)&&""!==r&&(u="; domain="+r);var c="";null!==o&&""!==o&&void 0!==o&&(c="; path="+o);var O="";null!==a&&(O="; expires="+a.toGMTString()),this.setCookie(n,t,u+c+O)},this.getCookie=this.m=function(n){return O||a(),ORA.Debug.debug("getCookie: ["+n+", "+c[n]+"]"),c[n]},this.getCookieAsObj=function(n,t){!1===O&&a();var i=t||":",e=function(n){var r={};return n&&(-1===n.indexOf("=")?r[n]=n:ORA.t.P(n.split(i)).forEach(function(n){var t=n.split("="),i=t.shift();if(0<t.length&&i){var e=t.join("=");r[i]=e}})),r},r={};if(n)return e(c[n]);for(var o in c)c.hasOwnProperty(o)&&(r[o]=e(c[o]));return r},this.setCookie=function(n,t,i,e){var r,o=i||"";r="object"==typeof t?function(n,t){var i=[];for(var e in n)if(n.hasOwnProperty(e)&&"function"!=typeof n[e]){var r=[];r.push(e,n[e]),i.push(r.join("="))}return i.join(t)}(t,e||":"):t!==undefined?t:"";var a=!0;ORA.t.R()&&!1===ORA.t.R().secureCookie&&(a=!1);var u="; secure";a&&"http:"!==document.location.protocol.toLowerCase()||(u=""),document.cookie=n+"="+s(r)+o+u,ORA.Debug.debug("setCookie: "+n+" with data: ["+s(r)+"]"+i+u),f(n+"="+r+o+u),O=!1},this.S=this.setCookie,this.deleteCookie=this.N=function(n,t,i){var e=n+"=";e+="; expires=Thu, 01 Jan 1970 00:00:01 GMT",t&&(e+="; path="+t),i&&(e+="; domain="+i),document.cookie=e,ORA.Debug.debug("deleteCookie: ["+n+", "+c[n]+"]"),delete c[n],r(n)},this.doesCookieExist=function(n){return O||a(),ORA.Debug.debug("doesCookieExist: "+n+" = "+!!c[n]+"]"),!!c[n]};var f=function(n){try{var t=n.split("=")[0],i=localStorage.getItem("ORA_COOK_STORE"),e={};i&&(e=JSON.parse(i));var r=n.match(/expires=(.*?)(;|$)/);r&&0<r.length&&(new Date(r[1])>new Date?e[t]=n:delete e[t],localStorage.setItem("ORA_COOK_STORE",JSON.stringify(e)))}catch(o){ORA.Debug.debug("Error writing local storage: "+o.message)}},r=function(n){try{var t=localStorage.getItem("ORA_COOK_STORE"),i={};t&&(i=JSON.parse(t)),i&&i[n]&&(delete i[n],localStorage.setItem("ORA_COOK_STORE",JSON.stringify(i)))}catch(e){ORA.Debug.debug("Error deleting local storage: "+e.message)}};this.C=function(n,t){return!!(-1<document.cookie.indexOf(t))&&(this.deleteCookie(t,"/","."+n),!0)},this.T=function(){var n,t=window.location.hostname,i=t.split("."),e="test_cookie"+Math.floor(9e4*Math.random()).toString();if(1===i.length)return t;for(var r=i.length-1;0<=r;--r){var o=i.slice(r).join("."),a=new Date;a.setDate(a.getDate()+1);var u=";domain=."+o+";path=/;expires="+a.toUTCString();if(this.setCookie(e,"cookie",u),this.C(o,e)){n=o;break}}return"."+n};try{var i=localStorage.getItem("ORA_COOK_STORE"),e={};if(i){for(var o in e=JSON.parse(i))e.hasOwnProperty(o)&&!this.doesCookieExist(e[o].split("=")[0])&&(document.cookie=e[o]);O=!1}}catch(A){ORA.Debug.debug("Error reading local storage: "+A.message)}return this},ORA.t.D=function(n,t,i){var e=this,r=i||"CountdownLatchClass",o=n||0,a=t&&ORA.t.M(t)?t:null,u=!1;e.J=function(){o++},e.j=function(n){o=n},e.I=function(){return o},e._=function(){o=0<o?o-1:0,ORA.Debug.trace("Countdown Latch counting down by 1, new count: "+o,r);try{0===o&&a&&!1===u&&(a(),u=!0,ORA.Debug.trace("Countdown Latch running callback",r))}catch(n){ORA.Debug.error("CountDownLatch error:  failed to execute callback","020",n,r)}},e.F=function(n){a=n&&ORA.t.M(n)?n:null},e.reset=function(){o=0,a=null}},ORA.t.q=function(n,t,i,e){var r={type:"text/javascript",async:"true",defer:"true"};r.onerror=e||function(){"_comm"===t?(ORA.Debug.error("OTS request fail: '"+n+"'",145),ORA.Debug.error("basic protocol failure ... aborting.  Check _comm url/payload",145)):ORA.Debug.error("_createScriptEl - aborting ... "+t,137)},r.src=n,setTimeout(function(){ORA.t.H("script",r,null,document.getElementsByTagName("head")[0]),i?i():ORA.Debug.trace("OTS request w/ basic protocol success")},0)},ORA.t.H=function(n,t,i,e,r){var o=r;o||(e&&(o=e.ownerDocument),o||(o=document));var a=o.createElement(n);if(t)for(var u in t)t[u]&&t.hasOwnProperty(u)&&("onerror"===u?a.onerror=t[u]:a.setAttribute(u,t[u]));if(i)for(var c in evnts)i[c]&&i.hasOwnProperty(c)&&ORA.L(a,c,i[c]);return e&&e.appendChild(a),a},ORA.t.U=function(n){return ORA.t.M(n)?n:"string"==typeof n&&0<n.length?new Function(n):null},ORA.t.W=function(script,local){try{if(!script||0===script.length||""===script)return null;if(local)return eval(script);if(window.execScript)return window.execScript(script);var w=window;return w.eval(script)}catch(e){throw ORA.Debug.error("_execScript failure:\n"+script,138,e),e}},ORA.t.getQryParams=function(n){var t=n.split(/[#]/g),i=(0<t.length?t[0]:n).split(/[&?]/g),e={};try{for(var r=0,o=i.length;r<o;++r){var a=i[r].match(/^([^=]+)(?:=([\s\S]*))?/);if(a&&a[1]){var u="";try{u=decodeURIComponent(a[1])}catch(O){try{u=unescape(a[1])}catch(s){u=a[1]}}var c="";try{c=decodeURIComponent(a[2])}catch(O){try{c=unescape(a[2])}catch(s){c=a[2]}}e[u]?(e[u]=[e[u]],e[u].push(c)):e[u]=c}}}catch(O){ORA.Debug.error("problem getting params from: "+n)}return e},ORA.t.B=function(){return"yes"===navigator.doNotTrack||"1"===navigator.doNotTrack||1===navigator.doNotTrack||"1"===navigator.msDoNotTrack||"1"===window.doNotTrack},ORA.t.X=function(n){return n.ELOQUA&&n.ELOQUA.GUID!==undefined&&"00000000000000000000000000000000"===n.ELOQUA.GUID},ORA.t.K=function(n){return n.OPTOUT&&n.OPTOUT.s33!==undefined&&"0"===n.OPTOUT.s33},ORA.t.$=function(n){return n["Infinity.optout"]&&n["Infinity.optout"].state!==undefined&&"1"===n["Infinity.optout"].state},ORA.t.Y=function(n){return!!n.WTOPTOUT&&n.WTOPTOUT[1]},ORA.t.V=function(n){if(ORA.t.V.invalidate===undefined&&(ORA.t.V.invalidate=!1),this.G===undefined||n!==undefined||ORA.t.V.invalidate){ORA.t.V.invalidate=!1;var t=n||ORA.t.Z();this.nn=ORA.t.X(t),this.tn=ORA.t.K(t),this["in"]=ORA.t.$(t),this.en=ORA.t.Y(t),this.G=this.nn||this.tn||this["in"]||this.en}if(this.G){var i="OPTOUT reason- isEloqua: "+this.nn+", isOPTOUT: "+this.tn+", isInfinityOptout: ";i+=this["in"]+", isWTOPTOUT: "+this.en,ORA.Debug.info(i)}return this.G},ORA.t.rn=function(n){var t=n,i=new Date,e="";isNaN(t)||(t=t||31536e7,e=";expires="+(i=new Date(i.getTime()+t)).toUTCString()),ORA.t.on("Infinity.optout","state=1",e+";path=/"),ORA.t.V.invalidate=!0},ORA.t.an=function(n,t,i){var e=t;arguments.length<2&&(e=!0);var r=document.createElement("script");r.type="text/javascript",r.async=e,r.src=n;var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(r,o)},ORA.t.un=function(n){var t=void 0!==n?n:navigator.userAgent;return/msie\s|trident\/|edge\//i.test(t)&&parseInt(+/(edge\/|rv:|msie\s)([\d.]+)/i.exec(t)[2],10)||null},ORA.t.cn=function(n,t,i){var e,r=t||window.document;if(r.documentElement)e=r.getElementsByTagName("meta");else{if(!r.all)return;e=r.all.tags("meta")}for(var o=e.length,a=0;a<o;a++){var u=e.item(a).name,c=e.item(a).content;0<u.length&&n(u,c,i)}},ORA.t.On=function(n){var t=ORA.sn()(n);return!(!t||0===t.length)},ORA.t.Rn=function(n,i){try{if("undefined"==typeof MutationObserver)return ORA.Debug.error("handleSPARules:  browser does not support MutationObserver",303),null;var t=ORA.t.P;return(0,ORA.t.On)(n)?(t(ORA.sn()(n)).forEach(function(t){new MutationObserver(function(n){n.forEach(function(n){ORA.Debug.superfine("OBSERVER: "+n.type+" on "+t+", executing callback"),ORA.Debug.superfine("executing callback: "+i.toString()),i(n)})}).observe(t,{attributes:!0,childList:!0,characterData:!0,subtree:!0}),ORA.Debug.debug("createObserver:  Observing "+t.toString())}),!0):(ORA.Debug.trace("handleSPARules:  failed to attach observer to '"+n+"'"),!1)}catch(e){return ORA.Debug.debug("createObserver:  MutationObserver API unavailable"),null}},ORA.t.fn||(ORA.t.fn={}),ORA.t.fn={An:function(i,e,r,o){var a=i.timeout||2e3,n=i.endpoint,u=!1,t=function(){if(!u&&ORA.O(i.ln)){var n=ORA.t.dn,t=n.vn(ORA.t.gn.hn);null!==(t=null!==t?t:n.vn(ORA.t.gn.pn))?(ORA.Debug.debug("Falling back to "+i.ln,"COMM"),u=!0,t({endpoint:i.ln,timeout:a},e,r,o)):ORA.Debug.error("Couldnt find a fallback protocol","COMM")}},c=function(n){u||(ORA.Debug.trace('corsPost: handling response="'+n+'"'),r&&r(n),u=!0)},O=function(n){return function(){u||(ORA.Debug.error(n+": payload:"+ORA.t.JSONPrettify(e)),!ORA.O(i.ln)&&o?o(n):t(),u=!0)}},s={events:[e]};ORA.Debug.debug("DCApi v2 payload: "+ORA.t.JSONPrettify(s));var R,f=JSON.stringify(s);try{"withCredentials"in new XMLHttpRequest?(ORA.Debug.debug("CORS supported, attempting XHR"),(R=new XMLHttpRequest).open("POST",n,!0),R.withCredentials="true",R.setRequestHeader("Content-type","application/json;charset=UTF-8"),R.onreadystatechange=function(){try{if(200===R.status)switch(R.readyState){case 0:case 1:case 2:case 3:ORA.Debug.superfine("corsPost: in progress, state: "+R.readyState);break;case 4:ORA.Debug.debug("corsPost: response received"),c(R.responseText+"corsPost xhrRespHandler response");break;default:ORA.Debug.debug("corsPost: unusual readyState="+R.readyState)}else if(4===R.readyState&&200!==R.status)throw"corsPost xhrResponseHandler:  communication error, http(cor) status: "+R.status+' response"'+R.responseText+'"'}catch(n){O(n)()}},R.send(f)):"undefined"!=typeof XDomainRequest?(ORA.Debug.debug("CORS supported, attempting XDR"),(R=new XDomainRequest).open("POST",n),R.onload=function(){ORA.Debug.trace('xdrRespHandler response="'+R.responseText+'"'),c(R.responseText)},R.ontimeout=O("corsPost timeout"),R.onerror=O("corsPost error"),R.send(f)):ORA.Debug.debug("No CORS Support or Disabled, using basic protocol"),ORA.Debug.debug("endpoint: "+n),5<=ORA.Debug.wn()&&ORA.Debug.trace("payload: "+ORA.t.JSONPrettify(e)),window.setTimeout(function(){u||(ORA.Debug.debug("Timed out....trying fallback"),t(),u=!0)},a)}catch(A){O(A)()}},mn:{name:"collection.v2.post",protocol:function(n,t,i,e){if(!t)throw new Error("Payload is not defined");var r=i||function(){},o=e||function(){};try{ORA.t.fn.An(n,t,r,o)}catch(a){ORA.Debug.error("DcApi v2 failed: "+a)}}},yn:function(n,t,i){var e,r,o,a=n,u=[],c=i;for(var O in t.dcsdat=(new Date).getTime(),t)t.hasOwnProperty(O)&&u.push((o=r=void 0,o=t[e=O],c.i18n&&""!==c.exre&&!c.exre.test(e)&&(r=o,o="function"==typeof encodeURIComponent?encodeURIComponent(r):escape(r)),e+"="+function(n,t){var i=n;if(""===t)return escape(i);if(null===i||i===undefined)return"";for(var e in i=i.toString(),t)t[e]instanceof RegExp&&(i=i.replace(t[e],e));return i}(o,c.re)));0<u.length&&(a+="?"+u.join("&"));var s=ORA.t.un();return s&&s<9&&2048<a.length&&(a=a.substring(0,2040)+"&wt.tu=1",ORA.Debug.debug("Warning: exceeded max size of limit 2047. Truncating payload.")),a},bn:function(n,t,i,e){var r=n.endpoint,o=n.timeout,a=n.Pn||{},u=!1;if(!t)throw new Error("Payload is not defined");var c=o||2e3,O=i||function(){},s=e||function(){};if(ORA.t.V()&&n.protocolType&&"default"!==n.protocolType)return ORA.Debug.debug("Sending no data due to opted out"),u=!0,ORA.t.Sn(s),!0;var R=ORA.t.fn.yn(r,t,a),f=new Image;f.onload=function(){if(!u)return u=!0,ORA.t.Sn(O),!0},f.onerror=function(){if(!u)return u=!0,ORA.t.Sn(s),!0},window.setTimeout(function(){u||(u=!0,ORA.t.Sn(s))},c);var A=R;return ORA.Debug.debug("gifProtocol sending:"+A),f.src=A,!0}},ORA.t.M=function(n){return"[object Function]"===Object.prototype.toString.call(n)},ORA.t.isArray=function(n){return"object"==typeof n&&n instanceof Array},ORA.t.Nn=function(n){return"object"==typeof n&&n.constructor===RegExp},ORA.t.Sn=function(n,t){try{t?n(t):n()}catch(i){ORA.Debug.error("Error Invoking function "+i)}},ORA.t.P=function(n){return n&&(n.forEach||(n.forEach=function(n,t){for(var i=t||window,e=0,r=this.length;e<r;++e)n.call(i,this[e],e,this)}),n.filter||(n.filter=function(n,t){for(var i=t||window,e=ORA.t.P([]),r=0,o=this.length;r<o;++r)n.call(i,this[r],r,this)&&e.push(this[r]);return e}),n.indexOf||(n.indexOf=function(n){for(var t=0;t<this.length;++t)if(this[t]===n)return t;return-1})),n},ORA.t.extendObject=function(r){return r&&(r.forEach||(r.forEach=function(n,t){var i=t||window;for(var e in this)this.hasOwnProperty(e)&&r.forEach!==r[e]&&r.length!==r[e]&&n.call(i,this[e],e,this)}),r.length||(r.length=function(){var n=0;for(var t in this)this.hasOwnProperty(t)&&"function"!=typeof this[t]&&n++;return n})),r},ORA.t.kn=function(n){if(!n)return!0;if(Object.keys&&0===Object.keys(n).length)return!0;for(var t in n)if(n.hasOwnProperty(t))return""===t&&"undefined"==typeof n[t];return!0},ORA.t.Cn=function(n){var t=[];for(var i in n)n.hasOwnProperty(i)&&""!==n[i]&&n[i]!==undefined&&"function"!=typeof n[i]&&t.push({k:i,v:n[i]});return t},ORA.t.xn=function(n,t,i){for(var e in t)(i||"undefined"==typeof n[e])&&(n[e]=t[e]);return n},ORA.t.JSONPrettify=function(n){try{if("undefined"!=typeof JSON)return JSON.stringify(n,null,2)}catch(t){ORA.Debug.debug(t.toString())}},ORA.t.trim=function(n){return n.trim?n.trim():n.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},ORA.t.En=function(n,t,i){if(ORA.O(n[t]))return n[t];if(ORA.O(i))return i;throw"ORA.common.getAttrIfExistsElseDefault: missing fieldName: "+t},ORA.t.isInteger=function(n){return t=n,!isNaN(t)&&(i=parseFloat(t))==i;var t,i},ORA.t.Tn=function(){var a={};this.Dn="ots",this.Mn="jsonp",this.hn="gif",this.pn="default";var u=this.pn,n=ORA.t.fn.bn;this.Jn=function(n){if(n.isSendEnabled()){if(0===n.endpoints.length)return void ORA.Debug.debug("Warning: no endpoint for "+JSON.stringify(n));for(var t=0;t<n.endpoints.length;t++){var i,e=n.endpoints[t];i=e.desc?e.desc:"";var r=e.protocolType||u;if(!r)throw"Unable to determine protocol from message "+i;var o=a[r];o?o(e,n.payload,n.success,n.fail):ORA.Debug.error('No comm protocol registered for msg:"'+JSON.stringify(n,null,2)+'"')}}else ORA.Debug.trace("Payload is not being sent, the sendDisasble flag is set :"+JSON.stringify(n,null,2)),ORA.t.Sn(n.success);ORA.fireEvent(new ORA.Event(ORA.Event.jn,ORA.Event.In))},this._n=function(n,t,i){a[n]&&ORA.Debug.debug('warning: protocol "+name+" exists, so overwriting'),i&&!0===i&&(u=n),ORA.Debug.debug("setProtocol() - name: "+n),ORA.Debug.trace("setProtocol() - protocol: "+t.toString()),a[n]=t},this.Fn=function(n,t){a[n]?(delete a[n],ORA.Debug.debug("removing protocol: "+n)):ORA.Debug.debug("warning: delete of protocol "+n+", because doesn't exist")},this.qn=function(n){return a[n]?a[n]:null},this._n(this.pn,n)},ORA.t.gn=new ORA.t.Tn,ORA.t.Hn=function(n){var r=this;if(!n.endpoints)throw new Error("Message created w/o endpoint, params: "+JSON.stringify(n));if(!n.payload)throw new Error("Message created w/o payload, params: "+JSON.stringify(n));for(var t=0;t<n.endpoints;t++)if(!n.endpoints[t].endpoint)throw new Error("Message must contain an endpoint"+JSON.Ln(n.endpoints));if(r.params=JSON.parse(JSON.stringify(n)),r.endpoints=this.params.endpoints,r.payload=this.params.payload,r.desc=this.params.desc,n.success)var i=n.success;if(n.fail)var e=n.fail;r.params.userDefinedParams&&(r.userDefinedParams=r.params.userDefinedParams);var o=function(n,t){try{void 0!==n&&n(r,t)}catch(i){ORA.Debug.error("Failure in message callback for: "+r.desc)}};r.fail=function(n){o(e,n)},r.success=function(n){o(i,n)},r.setParam=function(n,t,i){if(ORA.O(n)&&ORA.O(t)){var e=n.toLowerCase();r.payload[e]&&!0!==i?ORA.Debug.trace("Not overriding payload param '"+e+"' to '"+t+"'"):r.payload[e]=t}else ORA.Debug.error("setParam - missing either key or val, not setting")},r.getParam=function(n){if(!n)return ORA.Debug.error("getParam - missing key"),null;var t=n.toLowerCase();return r.payload[t]?r.payload[t]:null};var a=!0;r.sendDisable=function(){a=!1},r.sendEnable=function(){a=!0},r.isSendEnabled=function(){return a}},ORA.t.Un=function(){var r,o,n=this,u=(o={1:{},2:{},3:{}},(r={}).put=function(n,t,i){var e=2;void 0!==i&&(e=i),null!==r.get(n)&&(ORA.Debug.debug("Warning: mutant id: '"+n+"' already registered, overwriting mutation and priority "),r.Wn(n)),o[e][n]=t},r.get=function(n){for(var t in o)if(o[t][n])return o[t][n];return null},r.Wn=function(n){for(var t in o)o[t][n]&&delete o[t][n]},r.Bn=function(){var e=new ORA.t.Xn,n=function(n,t,i){e.zn({id:t,mutant:i[t]})};return ORA.t.extendObject(o[1]).forEach(n),ORA.t.extendObject(o[2]).forEach(n),ORA.t.extendObject(o[3]).forEach(n),e},r);n.register=function(n,t,i){try{u.get(n)&&ORA.Debug.debug("Warning:  "+n+" has a registered mutation, overwriting"),u.put(n,t,i),ORA.Debug.debug("mutant id: '"+n+"' registered per mutant registration act"),ORA.Debug.superfine("mutation: '"+t+"'")}catch(e){ORA.Debug.error("Error:  MutationMgr unable to register mutation id: "+n+", mutation: "+t,null,e)}},n.Kn=function(n){try{u.get(n)&&(u.Wn(n),ORA.Debug.debug("mutant id: '"+n+"' deregistered"))}catch(t){ORA.Debug.error("Error:  MutationMgr unable to deregister mutation id: "+n,null,t)}},n.$n=function(n){return u.get(n)?u.get(n):null},n.Yn=function(n){try{for(var t,i=u.Bn();!i.kn();){if(t=i.Vn(),ORA.Debug.superfine("mutant: '"+t.id+"', before(unmutated) msg: "+ORA.t.JSONPrettify(n)),n.params&&"collect"===n.params.desc){var e="analyticsAnnotate"===t.id,r=n.params.applyMutations||!1,o=n.params.sendSessionInfo||n.params.sendSessionInfo===undefined;(r||o)&&(o&&e||r&&!e)&&t.mutant(n)}else t.mutant(n);ORA.Debug.trace("mutant: '"+t.id+"' has processed msg"),ORA.Debug.superfine("mutant: '"+t.id+"', after(mutated) msg: "+ORA.t.JSONPrettify(n))}}catch(a){ORA.Debug.error("Problem with mutation error: '"+a+"'","019",a,"mutationMgrClass")}},n.Gn=function(){for(var n,t=u.Bn(),i=[];!t.kn();)n=t.Vn(),ORA.Debug.debug(JSON.stringify(n)),i.push(n);return i}},ORA.t.Xn=function(){var t=[],i=0;this.Qn=function(){return t.length-i},this.kn=function(){return 0===t.length},this.zn=function(n){t.push(n)},this.Vn=function(){if(0===t.length)return undefined;var n=t[i];return 2*++i>=t.length&&(t=t.slice(i),i=0),n},this.Zn=function(){return 0<t.length?t[i]:undefined}},ORA.t.nt=function(n){var t=!0,i=this,o={},a=0,e={},r=!1,u=new ORA.t.Xn,c=new ORA.t.Tn,O=new ORA.t.Un,s=ORA.t.Hn;this.tt=function(n,t,i){if(!n)throw new Error("Product must have a name");if(o[n])ORA.Debug.debug("Product "+n+"already registered");else{var e={name:n,timeout:4e3,it:function(){},et:!1,rt:!1};void 0!==t&&(e.timeout=t),i&&(e.it=i),o[e.name]=e,a++,ORA.Debug.debug("registering product "+e.name+" to TrackingPipeline");var r=this;setTimeout(function(){if(!e.et&&(e.rt=!0,r.ot(),ORA.Debug.debug("Product "+JSON.stringify(e)+" timed out"),e.it))try{e.it()}catch(n){ORA.Debug.error("Failure in product callback for: "+e)}},e.timeout)}},this.at=function(n){return o[n]},this.ut=function(n){if(o[n]){var t=o[n];!0!==t.et?t.rt?ORA.Debug.debug("Product "+t.name+" has timed out"):(t.et=!0,ORA.Debug.debug("Pipeline product: "+n+" set to ready"),this.ot()):ORA.Debug.debug("Product "+t.name+" is already 'ready'")}else ORA.Debug.debug("Product "+n+" isn't registered. Can't set to ready")},this.ct=function(){return a},this.ot=function(){var n;0!==a&&a--,0===a&&!1===r&&(!0===t?(n=new s({endpoints:[],desc:"seed message",payload:i.Ot(),mutation:{pageview:!0}}),i.zn(n),ORA.Debug.debug("TrackingPipeline enqueued the seed msg")):ORA.Debug.trace("Seed Message disabled, not enqueueing"),this.flush())};var R=function(n){var t=ORA.t.R(),i=t&&t.DNTBehavior||"honorDNT";if(ORA.t.B())switch(i){case"honorDNT":return void ORA.Debug.debug("*** DNTBehavior: DNT is set in the browser - canceling payload ***");case"anonymize":n.payload.dcsipa="1",ORA.Debug.debug("DNTBehavior: DNT is set to anonymize the session, adding dcsipa=1 to payload");break;case"ignoreDNT":ORA.t.B()&&ORA.Debug.debug("DNTBehavior: DNTBehavior is set to ignore the browser DNT setting")}O.Yn(n),c.Jn(n)};this.zn=function(n){if(!n)throw new Error("Message isn't defined!");return ORA.Debug.trace("enqueueing message: "+JSON.stringify(n,null,2)),u.zn(n),1},this.flush=function(){for(;!u.kn();){var n=u.Vn();R(n)}this.zn=function(n){R(n)},r=!0,ORA.fireEvent(new ORA.Event(ORA.Event.st,ORA.Event.In)),ORA.Debug.debug("TrackingPipeline has been flushed")},this.Qn=u.Qn,this.Rt=c._n,this.ft=c.Fn,this.vn=c.qn,this.At=O.register,this.lt=O.Kn,this.$n=O.$n,this.Gn=O.Gn,this.dt=function(){if(ORA&&ORA.vt){var n=ORA.vt();for(var t in n)n.hasOwnProperty(t)&&(n[t].timeout?this.tt(n[t].name,n[t].timeout):this.tt(n[t].name))}},this.ht=function(){ORA.Debug.debug("Seed Message disabled, initial seed message will not be enqueued"),t=!1},this.gt=function(){return t},this.pt=function(n){e=n},this.Ot=function(){return e},this.wt=function(){return r}},ORA.t.yt=function(n){var R,f=this,v=n||"ora-plugins",h={},g=new ORA.t.D(0,null,v+":PluginMgrClass"),A=0,t=!1,i=!1;f.bt=function(){i=!0},f.Pt=function(){return i},f.St=function(n){return h[n]?h[n]:null},f.Nt=function(){h={},g.reset()},f.kt=function(n){R=n},f.Ct=function(n){g.F(n)},f.xt=function(n){ORA.Debug.trace("setNumExpectedPlugins("+n+")",v),g.j(n),A=n},f.Et=function(){return A};var p=function(){ORA.Debug.debug("asyncReady initPluginLatch.countDown()",v),g._()},l=function(n){ORA.t.M(n)?n():ORA.t.U(n)()};f.Tt=function(){return ORA.Debug.info(JSON.stringify(h),v),h},f.Dt=function(){!0!==t&&(t=!0,ORA.t.extendObject(h).forEach(function(n,t){ORA.Debug.debug("pluginMgr running init for "+t,v);var i,e,r,o,a,u,c,O,s,R,f,A,l=ORA.t.M;try{l(n.Mt)&&(r=t,o=(i=n).Mt,a=i.async,u=i.Jt,c=i.jt,O=i.It,s=i.timeout,R=function(){var n;!0!==(h[n=r]&&ORA.O(h[n].succeeded))&&(ORA.Debug.debug('Running fail callback for "'+r+'"',v),O(),ORA.Debug.debug("plugin fail initPluginLatch.countDown()",v),g._())},f=window.setTimeout(R,s),A=function(){ORA.Debug.debug('Running success callback for "'+r+'"',v),c(),h[r]&&(h.succeeded=!0),window.clearTimeout(f)},e=!0===u?function(){try{o(i,p),A()}catch(n){ORA.Debug.error('Error executing "'+r,'"',v),R()}}:function(){try{o(i),A(),ORA.Debug.debug("plugin success initPluginLatch.countDown()",v),g._()}catch(n){ORA.Debug.error('Error executing "'+r,'"',v),R()}},!0===a?window.setTimeout(e,0):e())}catch(d){ORA.Debug.error('pluginMgr problem in init of "'+t+'" '+d.toString(),v)}}))},f._t=function(n,t,i,e){var r={};i&&(r=i);var o=ORA.t.M,a=ORA.t.extendObject,u="ora-plugins";e&&(u=e),ORA.Debug.debug("Start process of registering Plugin "+n,v),o(R)&&a(R(n,u)).forEach(function(n,t){r[t]=n});var c=!1;r.blockCollect!==undefined&&(c=r.blockCollect);var O=null;ORA.t.M(t)&&(O=t);var s={Mt:O,Jt:c,timeout:r.timeout||4e3,async:!1!==r.async,jt:ORA.t.U(r.success)||function(){ORA.Debug.debug("plugin: "+u+":"+n+" init callback has executed successfully",v)},It:ORA.t.U(r.fail)||function(){ORA.Debug.error("plugin: "+u+":"+n+" init callback execution has failed",v)},config:r,pluginName:n};h[n]?ORA.Debug.debug("Plugin "+n+" is a duplicate - over writing with new plugin",v):ORA.Debug.debug("Plugin "+n+" is a new - adding new plugin",v),h[n]=s,A--,ORA.Debug.debug("loadPlugin Count is "+A,v),f.Ft()},f.Ft=function(){if(A<=0&&!1===t){var n=ORA.Event.qt;"ora-plugins"===v&&(n=ORA.Event.Ht),ORA.fireEvent(new ORA.Event(n,ORA.Event.In)),ORA.Debug.trace("checkInitReady:  loadPluginCount("+A+"), plugins have loaded so running initPlugins()",v),f.Dt()}else ORA.Debug.trace("checkInitReady:  loadPluginCount("+A+"), not running initPlugins()",v)},f.Lt=function(n){ORA.Debug.debug("Processing Hosted Plugins "+JSON.stringify(n),v);var t,i,e,r,o,a,u=function(n){return function(){n.loaded||(ORA.Debug.debug("Hosted Plugin "+n.pluginName+" src:"+n.src+" timed out",v),n.Ut=!0,g._(),n.fail&&l(n.fail))}};for(var c in n)if(n.hasOwnProperty(c)&&"function"!=typeof n[c]){var O=n[c],s=!0;O.enable!==undefined&&(s=O.enable),s?(O.pluginName=c,O.loaded=!1,ORA.Debug.debug("Found Hosted Plugin "+c+" Processing",v),t=c,i=ORA.analytics.plugins[c]=O,a=o=r=e=void 0,a=i.src,ORA.t.M(a)||(o=a.split("/"),!/\.js$/i.test(o.pop()))?(ORA.Debug.debug("Plugin "+t+" is a function - executing function",v),window.setTimeout((e=a,(r=i).loaded=!0,ORA.Debug.debug("Executing function ("+e+")",v),function(){try{l(e)}catch(n){ORA.Debug.debug("Hosted plugin execution failed: "+n.message,v),g._(),r.fail&&l(r.fail)}}()),1)):(ORA.Debug.debug("Plugin "+t+" is a hosted script "+a+" - executing loadJS()",v),ORA.analytics.an(a,i.async||!0)),O.timeout||(O.timeout=4e3),window.setTimeout(u(O),O.timeout)):(g._(),ORA.Debug.debug("Plugin "+c+" is disabled",v))}}},function(){ORA.Debug.superfine=ORA.Debug.superfine,ORA.Debug.trace=ORA.Debug.trace,ORA.Debug.error=ORA.Debug.error,ORA.Debug.debug=ORA.Debug.debug,ORA.Debug.info=ORA.Debug.info;var a=function(n){ORA.Debug.debug(n,"COMMON")},f=function(n,t){var i=ORA.t.extendObject(n),e={};return i.forEach(function(n,t){var i=t.toLowerCase();e[i]=n}),!e["wt.dl"]&&t&&(e["wt.dl"]=t),e};ORA.Wt=new ORA.t.g,ORA.t.on=ORA.Wt.setCookie,ORA.t.Z=ORA.Wt.getCookieAsObj,ORA.t.Bt=ORA.Wt.deleteCookie,ORA.t.m=ORA.Wt.getCookie,ORA.t.Xt=ORA.Wt.p,ORA.t.zt=ORA.Wt.doesCookieExist,ORA.t.setup=function(n){ORA.Debug.debug("Common setup() started"),ORA.t.dn=new ORA.t.nt;var t=n&&n.data?n.data:{};ORA.t.dn.pt(f(t)),ORA.t.Kt=new ORA.t.yt("ora-plugins"),ORA.t.$t=new ORA.t.yt("hosted-plugins");var i,e,r,o=new ORA.t.i.Yt;ORA.t.Vt=o,ORA.t.dn.dt(),ORA.t.dn.Rt(ORA.t.fn.mn.name,ORA.t.fn.mn.protocol),ORA.t.dn.At("pageAnalyzeMutant",o.mutation,1),i=function(n){var t=ORA.t.Hn,i=ORA.t.dn,e=new t(n);i.zn(e),a('Common enqueued: "'+n.desc+'"')},e=function(n,t,i){ORA.Debug.info("ORA."+t);var e,r,o,a,u,c,O=(r=(e=n)&&e.params&&e.params.config&&e.params.config.endpoints?e.params.config.endpoints:[],ORA.t.P(r).forEach(function(n,t,i){n.protocolType||(i[t].protocolType="gif")}),r),s=(o=n,a=ORA.t.extendObject(o&&o.params&&o.params.data?o.params.data:{}),f(a,i));n&&n.params&&n.params.config&&n.params.config.callbacks&&n.params.config.callbacks.success&&(u=n.params.config.callbacks.success),n&&n.params&&n.params.config&&n.params.config.callbacks&&n.params.config.callbacks.fail&&(c=n.params.config.callbacks.fail);var R={};return R[t]=!0,ORA.s(n.params.config,{endpoints:O,desc:t,payload:s,mutation:R,success:u,fail:c})},r=function(){ORA.t.dn=undefined,ORA.t.Kt=undefined,ORA.O(ORA.t.id.Gt)&&!0===ORA.t.id.Gt&&(ORA.t.id.Gt=!1),ORA.t.Vt=undefined},ORA.Qt(ORA.Event.Zt,function(n){var t=e(n,"click",1);n.params&&n.params.config&&n.params.config.testAlias?t.testAlias=n.params.config.testAlias:n.params&&n.params.testAlias&&(t.testAlias=n.params.testAlias),n.params&&n.params.config&&n.params.config.conversionPoint?t.conversionPoint=n.params.config.conversionPoint:n.params&&n.params.conversionPoint&&(t.conversionPoint=n.params.conversionPoint),t.userDefinedParams=n.params,i(t)}),ORA.Qt(ORA.Event.ni,function(n){var t=e(n,"collect",0);i(t)}),ORA.Qt(ORA.Event.ii,function(n){var t=e(n,"view",0);i(t)}),ORA.Qt(ORA.Event.ei,r),ORA.Qt(ORA.Event.ri,function(n){r();var t=n.params&&ORA.O(n.params)?n.params:{};ORA.t.setup(t)}),a("Common setup() finished")},ORA.isOptedOut=ORA.t.V,ORA.setInfinityOptOut=ORA.t.rn,ORA.setCookie=ORA.t.on,ORA.deleteCookie=ORA.t.Bt,ORA.getCookieRaw=ORA.getCookie=ORA.t.m,ORA.getCookieAsObj=ORA.t.Z,ORA.doesCookieExist=ORA.t.zt,ORA.getIEVer=ORA.t.un,ORA.JSONPrettify=ORA.t.JSONPrettify,ORA.extendObject=ORA.t.extendObject,ORA.getQryParams=ORA.t.getQryParams}(),ORA.t.i.Yt=function(n){var t=n||{},o="Common",i=/WT\.|DCSEXT\.|DCS\./,e=/ORA\./,a={},u={},r={},c={},O=0,s=t.window||window,R=t.document||window.document,f=t.navigator||window.navigator,A=t.location||window.location;this.oi=function(n){ORA.Debug.error("",101,n,"PageAnalyze")};var l=function(){a={},u={},r={},c={},ORA.Debug.debug("Running Page Analysis",o),function(){ORA.Debug.trace("Running StandardParams",o);var n=new Date;if(a.tz=parseInt(n.getTimezoneOffset()/60*-1,10)||"0",a.bh=n.getHours()||"0",a.ul=f.language||f.userLanguage,"object"==typeof screen&&(a.cd="Netscape"===f.appName?screen.pixelDepth:screen.colorDepth,a.sr=screen.width+"x"+screen.height),"boolean"==typeof f.javaEnabled()&&(a.jo=f.javaEnabled()?"Yes":"No"),R.title)if(s.RegExp){var t=new RegExp("^"+A.protocol+"//"+A.hostname+"\\s-\\s");a.ti=R.title.replace(t,"")}else a.ti=R.title;a.js="Yes";var i=0,e=0;"number"==typeof s.innerWidth?(i=s.innerWidth,e=s.innerHeight):R.documentElement&&(R.documentElement.clientWidth||R.documentElement.clientHeight)?(i=R.documentElement.clientWidth,e=R.documentElement.clientHeight):R.body&&(R.body.clientWidth||R.body.clientHeight)&&(i=R.body.clientWidth,e=R.body.clientHeight),a.bs=i+"x"+e,a.dl=0,a.ssl=0===A.protocol.indexOf("https:")?"1":"0",u.dcsdat=n.getTime(),u.dcssip=A.hostname,u.dcsuri=A.pathname,a.es=u.dcssip+u.dcsuri,ORA.t.ui.ai().forEach(function(n,t){u[t]=n}),""!==R.referrer&&"-"!==R.referrer&&("Microsoft Internet Explorer"===f.appName&&parseInt(f.appVersion,10)<4||(u.dcsref=R.referrer));var r=A.href.match(/wm_IP_override=([^#&]+)/i);r&&(u.dcscip=r[1])}(),ORA.Debug.trace("Running defaultMeta()",o),ORA.t.cn(function(n,t){null!==n.toUpperCase().match(i)&&(a[n.split(".")[1]]=t)},R),ORA.Debug.trace("Running altMeta()",o),ORA.t.cn(function(n,t){null!==n.toUpperCase().match(e)&&(c[n]=t)},R),O++},d=function(n,t,i){for(var e in t)if(t.hasOwnProperty(e)){var r=ORA.O(i)?i+e:e;if(ORA.O(n.getParam(e))||!t.hasOwnProperty(e))continue;n.setParam(r,t[e])}};this.mutation=function(n){n.params.mutation&&!0===n.params.mutation.runAnalysis&&l(),d(n,u),d(n,r),d(n,a,"WT."),d(n,c),ORA.Debug.debug("Annotating Common Page Analysis",o),ORA.Debug.trace(ORA.t.JSONPrettify(n.payload),o)},this.data=function(){return{ci:u,Oi:a,si:r,Ri:c,fi:O}},l()},ORA.t.Ai=function(){var n=this,i=ORA.t.extendObject,r=i({});n.reset=function(n){var t="";n?t=n:window&&window.location&&window.location.search&&(t=window.location.search),r=i(ORA.t.getQryParams(t))},n.clear=function(){r=i({})},n.ai=function(){return r},n.contains=function(i,n){if(n){var e=!1;return r.forEach(function(n,t){"string"==typeof i&&"string"==typeof t&&t.toLowerCase()===i.toLowerCase()&&(e=!0)}),e}return"undefined"!=typeof r[i]},n.set=function(n,t){r[n]=t},n.reset()},ORA.t.ui=new ORA.t.Ai,function(){var c="MOBILE_HYBRID",n=!1,t=!1,o=ORA.t.extendObject({}),O=ORA.t.o;O.li=function(){n=!0},O.di=function(){n=!1},O.vi=function(){return n},O.hi=function(){t=!0},O.gi=function(){return t},O.reset=function(){n=!1,o=ORA.t.extendObject({})},O.pi=function(t,i,n){var e=n.mobileDelayTimeout?n.mobileDelayTimeout:3e3,r=function(){try{ORA.Debug.trace(i+": executing callback: "+t.toString(),c),t()}catch(n){ORA.Debug.error("Error in mobile delayed callback for: "+i,301,n)}};if(!n||!0!==n.mobileDelay)return ORA.Debug.debug(i+": no mobileDelay flag so executing cb immediately",c),void t();O.hi(),O.li(),ORA.Debug.debug(i+": to delay until ORA.common.mobile.resume() or time in "+e+" ms ",c),o[i]={cb:r,timer:window.setTimeout(r,e)}},O.resume=function(){o.forEach(function(n,t){window.clearTimeout(n.timer),ORA.Debug.debug("ORA.common.mobile.resume() called, executing callback for "+t,c),n.cb()}),o=ORA.t.extendObject({})},O.wi=function(n){var t="wtapp://cookie?data="+JSON.stringify(n);if("undefined"!=typeof window.external&&"undefined"!=typeof window.external.mi)window.external.mi(t);else{var i=document.createElement("iframe");i.setAttribute("src",t),i.setAttribute("style","display:none;"),i.setAttribute("frameborder","0"),i.setAttribute("height","0px"),i.setAttribute("width","0px"),document.getElementsByTagName("body")[0].appendChild(i),i.parentNode.removeChild(i)}ORA.Debug.superfine("Wrote cookie to native app",c),ORA.Debug.superfine("cookies to Native App: "+JSON.stringify(n),c)},O.yi=function(n){try{if(!0!==O.gi()||!0!==O.vi())return void ORA.Debug.superfine("Do not try to write cookies to app because 'nativeAppCkTx' is false or not in 'mobileMode'",c);if(!n||!n.name||!n.value)return ORA.Debug.superfine("Not writing to native app, missing cookie info",c),void ORA.Debug.superfine("mapCookieInfo: "+JSON.stringify(n),c);var t={};t[n.name]={value:n.value,path:n.path,domain:n.domain,date:n.date,type:n.type,timeout:n.timeout},O.wi(t)}catch(i){ORA.Debug.error("Problem sending cookie to hybrid app","300",i,c)}},O.bi=function(n,t,i){try{if(n){var e=t||window.location.hostname,r=i||"/";for(var o in n)if(n.hasOwnProperty(o)){var a=n[o];ORA.t.Xt(o,a.value,a.timeout||null,a.type,e,r)}}}catch(u){ORA.Debug.error("Problem in hybrid writing cookie","302",u,c)}finally{ORA.Debug.debug("setting Native App Cookie Write"),O.hi(),O.resume()}}}(),ORA.setExecuteState("common","ready"),ORA.fireEvent(new ORA.Event(ORA.Event.Pi,ORA.Event.In),!0),ORA.getQryParams=ORA.t.getQryParams;