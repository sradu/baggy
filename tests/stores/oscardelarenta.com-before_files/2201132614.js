!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){"object"==typeof window.Pepperjam&&null!==window.Pepperjam||(window.Pepperjam={})}]);

!function(t){var e={};function i(a){if(e[a])return e[a].exports;var r=e[a]={i:a,l:!1,exports:{}};return t[a].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=t,i.c=e,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(a,r,function(e){return t[e]}.bind(null,r));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=0)}([function(t,e,i){"use strict";function a(t){if(this.constructor===a)throw new Error("Cannot instantiate abstract class");this._data=null,this.window=t}function r(t,e,i){a.call(this,t),this._cookieName=e,this._cookieMaxAge=i;var r=this;return this.getCookieName=function(){return this._cookieName},this.getCookieMaxAge=function(){return this._cookieMaxAge},this.saveData=function(t){this._data=t,this.window.document.cookie=this._cookieName+"="+t+";path=/;max-age="+this._cookieMaxAge},this.getData=function(){var t=null;return this.window.document.cookie.split(";").forEach(function(e){var i=(e=e.trim()).split("="),a=i[0],o=i[1];a===r._cookieName&&(t=o)}),t},this}function o(t,e){return a.call(this,t),this._storageKey=e,this.getStorageKey=function(){return this._storageKey},this.saveData=function(e){this._data=e,t.localStorage.setItem(this._storageKey,e)},this.getData=function(){return t.localStorage.getItem(this._storageKey)},this}i.r(e),a.prototype.getData=function(){return this._data},a.prototype.setData=function(t){this._data=t},r.prototype=Object.create(a.prototype),Object.defineProperty(r.prototype,"constructor",{value:r,enumerable:!1,writable:!0}),o.prototype=Object.create(a.prototype),Object.defineProperty(o.prototype,"constructor",{value:o,enumerable:!1,writable:!0}),window.PepperjamTracking=function(t){var e=this;return this.window=t,this.clickIdQueryParamIframe="CLICK_ID",this.clickIdQueryParam="clickId",this.gclidQueryParam="gclid",this.cookieName="pjn-click",this.cookieMaxAge=5184e3,this.localStorageKey="pjnClickData",this.domains=["t.pepperjamnetwork.com"],this.messageNoCookies="pjn-no-cookies",this.messageCookiesOk="pjn-cookies-ok",this.pjPrefix="p",this.gclidPrefix="g",this.iframeAdded=!1,this.maxClicks=30,this.lookBackPeriod=60,this.platformKey="PLATFORM",this.platform="ITC2",this.parsedIframeClass="pjIframeParsed",this.cookieStorage=new r(this.window,this.cookieName,this.cookieMaxAge),this.localStorage=new o(this.window,this.localStorageKey),this.getAnchor=function(t){var e=this.window.document.createElement("a");return e.href=t,e},this.getQueryParam=function(t,e){for(var i=e.split("&"),a=0;a<i.length;a++){var r=i[a].split("=");if(decodeURIComponent(r[0])===t)return decodeURIComponent(r[1])}return!1},this.getCookieData=function(){return this.cookieStorage.getData()},this.saveCookieData=function(t){this.cookieStorage.saveData(t)},this.getLocalStorageData=function(){return this.localStorage.getData()},this.saveLocalStorageData=function(t){this.localStorage.saveData(t)},this.getClickId=function(){return this.getQueryParam(this.clickIdQueryParam,this.window.location.search.substring(1))},this.getGclid=function(){var t=this.getQueryParam(this.gclidQueryParam,this.window.location.search.substring(1));return!1!==t?t:""},this.transformClickId=function(t,e){return(e||this.pjPrefix)+t},this.getToday=function(){var t=Date.now();return t=Math.ceil(t/864e5)},this.getClickData=function(){var t=[],e=this.getCookieData(),i=this;if(e&&null!==e){var a=JSON.parse(e),r=this.getToday();a.forEach(function(e){i.clickWithinLookback(e,r)&&t.push(e)})}return t},this.getPjClickData=function(){var t=this.getClickData(),i=[];return t.forEach(function(t){t.hasOwnProperty("type")&&t.type===e.pjPrefix&&i.push(t)}),i},this.clickDataToQueryParam=function(t){var i="",a=0;if("string"==typeof t&&"dynamic"===t.toLowerCase())var r=this.getClickData();else{var o=this.getClickData(),s=[];r=[];o.forEach(function(t){t.hasOwnProperty("type")&&t.type===e.gclidPrefix?r.push(t):s.push(t)}),r.push(s.pop())}return r.forEach(function(t){t&&(i+=0!==a&&t.id?","+encodeURIComponent(e.transformClickId(t.id,t.type)):encodeURIComponent(e.transformClickId(t.id,t.type)),a++)}),i||""},this.daySort=function(t,e){return(t.hasOwnProperty("days")&&t.days?t.days:0)-(e.hasOwnProperty("days")&&e.days?e.days:0)},this.mergeClickData=function(){var t=JSON.parse(this.getCookieData()),e=JSON.parse(this.getLocalStorageData()),i=this,a=[],r=[];if(t&&(a=a.concat(t)),e&&(a=a.concat(e)),a.length>0){a=a.sort(function(t,e){return i.daySort(t,e)});var o=[];a.forEach(function(t){var e=t.id;o.indexOf(e)<0&&(o.push(e),r.push(t))})}return this.trimCookie(r,!1)},this.getTrackingIframeUrls=function(){for(var t=[],i=this.window.document.querySelectorAll("iframe"),a=0;a<i.length;a++){var r=i[a],o=this.getAnchor(r.src),s=new RegExp(e.parsedIframeClass);this.domains.indexOf(o.hostname)>=0&&!r.className.match(s)&&(t.push(o),""===r.className?r.className=e.parsedIframeClass:r.className+=" "+e.parsedIframeClass)}return t},this.handleClickId=function(t,e){var i=t;if(i){for(var a=this.getToday(),r=this.getClickData(),o=!1,s=r,n=0;n<s.length;n++)if(i===s[n].id){o=!0;break}o||(r.push({id:i,days:a,type:e}),r.length>this.maxClicks&&(r=this.trimCookie(r,!0)),this.saveCookieData(JSON.stringify(r)))}},this.trimCookie=function(t,e){return t.length>this.maxClicks&&(t=e?(t=t.reverse().splice(0,this.maxClicks)).reverse():t.splice(0,this.maxClicks)),t},this.clickWithinLookback=function(t,e){return Math.abs(e-t.days)<=this.lookBackPeriod},this.handleConversion=function(t){var i=e.getAnchor(t.origin),a=e.domains.indexOf(i.hostname)>=0;if((t.data===e.messageNoCookies||t.data===e.messageCookiesOk)&&a){var r=e.getTrackingIframeUrls();r.length&&!e.iframeAdded&&(r.forEach(function(t,i){var a=e.window.document.createElement("iframe"),r=t.href,o=e.clickDataToQueryParam(e.getQueryParam("INT",t.search.substring(1))),s=e.getQueryParam(e.clickIdQueryParamIframe,t.search.substring(1).toUpperCase());if(s){var n=s.split(","),c=o?o.split(","):[],h=[],u=n.length,l=c.length,f=e.getPjClickData();if(e.getQueryParam("INT",t.search.substring(1))&&"dynamic"===e.getQueryParam("INT",t.search.substring(1)).toLowerCase()||0===f.length)for(i=0;i<u;i++)h.push(e.transformClickId(n[i],e.pjPrefix));for(var d=0;d<l;d++)h.indexOf(c[d])<0&&h.push(c[d]);o="";for(var g=0;g<h.length;g++)o+=h[g]+",";o=o.substr(0,o.length-1),r=r.replace(/&CLICK_ID(=[^&]*)?|^CLICK_ID(=[^&]*)?&?/i,"")}if(a.setAttribute("id","pjn-tracking-"+i),a.setAttribute("width","0"),a.setAttribute("height","0"),a.setAttribute("frameborder","0"),a.setAttribute("class",e.parsedIframeClass),t.href.match("/track/v2"))p=r;else var p=r.replace("/track","/track/v2");var m=p+"&"+e.clickIdQueryParamIframe+"="+o;m+="&"+e.platformKey+"="+e.platform,a.setAttribute("src",m),e.window.document.body.appendChild(a)}),e.iframeAdded=!0)}},this.handle=function(){this.handleClickId(this.getClickId(),this.pjPrefix),this.handleClickId(this.getGclid(),this.gclidPrefix),this.window.addEventListener("message",this.handleConversion);var t=this.mergeClickData();t&&t.length>0&&(this.saveCookieData(JSON.stringify(t)),this.saveLocalStorageData(JSON.stringify(t)))},this.handle()},new window.PepperjamTracking(window)}]);

