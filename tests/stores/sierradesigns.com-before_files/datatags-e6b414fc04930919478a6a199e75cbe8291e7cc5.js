!function(){var t,n,o,e={};for(i=1;i<=200;i++)e["metric"+i]=null,e["dimension"+i]=null;function c(t,n){return(t.matches||t.msMatchesSelector).call(t,n)}function a(t,n){if(t.forEach)return t.forEach(n);for(var o=0;o<t.length;o++)n(t[o])}function r(t,n){const o=function(t,n){if(t.closest)return t.closest(n);if(!document.documentElement.contains(t))return null;do{if(c(t,n))return t;t=t.parentElement||t.parentNode}while(null!==t&&1===t.nodeType);return null}(t,"["+n+"]");if(null!==o)return o.getAttribute(n)}function u(){"function"==typeof ga&&ga("set",e)}const d="[data-event-type]";function s(o,e){function i(t,n){return f(t)===n}const c={},d={list:function(t){const n=l(t);if(""===n.variant&&(n.variant=void 0),!i(n,t.getAttribute("data-analytics-sent"))){const o=n.list;delete n.list,c.list=c.list||{},c.list[o]=c.list[o]||[],c.list[o].push(n),n.list=o,n.el=t}return n},product:function(o){const e=l(o);return t.forEach(function(t){e[t]=r(o,t)}),n.forEach(function(t){e[t]=r(o,t)}),i(e,o.getAttribute("data-analytics-sent"))||(c.product=c.product||[],c.product.push(e)),e},"product-click":function(t){const n=l(t);return i(n,t.getAttribute("data-analytics-sent"))||p(t,"Product Clicked",n),n},promotion:function(o){const e=y(o);return t.forEach(function(t){e[t]=r(o,t)}),n.forEach(function(t){e[t]=r(o,t)}),i(e,o.getAttribute("data-analytics-sent"))||(c.promotion=c.promotion||[],c.promotion.push(e)),e},"promotion-click":function(t){const n=y(t);return i(n,t.getAttribute("data-analytics-sent"))||p(t,"Promotion Clicked",n),n}};a(o,function(t){const n=t.getAttribute("data-event-type");var o="";n in d&&d[n]instanceof Function&&(o=d[n](t)),t.setAttribute("data-analytics-sent",f(o))}),a(Object.keys(c),function(o){switch(o){case"list":a(Object.keys(c[o]),function(i){const d={},s=c[o][i]&&c[o][i][0]&&c[o][i][0].currency?c[o][i][0].currency:"";var l=c[o][i].map(function(t){var n=t.el;return delete t.el,n}),f={list_id:i,category:i,currency:s,products:c[o][i].filter(function(t){const n=t.product_id+":"+t.position;return!d[n]&&(d[n]=!0,!0)})};a(l,function(o){a(t,function(t){f[t]=r(o,t)}),a(n,function(t){f[t]=r(o,t)})}),e.track("Product List Viewed",f),u()});break;case"product":a(c[o],function(t){e.track("Product Viewed",t),u()});break;case"promotion":a(c[o],function(t){e.track("Promotion Viewed",t),u()})}})}function l(t){const n={product_id:r(t,"data-entity-id"),name:r(t,"data-name"),category:r(t,"data-product-category"),brand:r(t,"data-product-brand"),price:r(t,"data-product-price"),sku:r(t,"data-product-sku"),variant:r(t,"data-product-variant"),properties:o},e=r(t,"data-list-name"),i=r(t,"data-position");i&&(n.position=i),e&&(n.list=e);const c=r(t,"data-currency-code");return c&&(n.currency=c),n}function f(t){return JSON.stringify(t,function(t,n){return void 0===n?null:n})}function p(t,n,o){analytics.trackLink(t,n,o)}function y(t){return{promotion_id:r(t,"data-entity-id"),name:r(t,"data-name"),creative:r(t,"data-banner-id"),position:r(t,"data-position"),properties:o}}window.initDataTags=function(e,i,r,u){const l=["data-banner-id","data-entity-id","data-event-type","data-list-name","data-name","data-position","data-product-brand","data-product-category","data-product-price","data-product-sku","data-product-variant","data-currency-code"].concat(e).concat(i);t=e,n=i,o=u,r.ready(function(){setTimeout(function(){const t=[];a(document.body.querySelectorAll(d),function(n){t.push(n)}),s(t,r),new MutationObserver(function(t){const n=[];function o(t){c(t,d)&&n.push(t),a(t.querySelectorAll(d),function(t){n.push(t)})}a(t,function(t){"childList"===t.type?a(t.addedNodes,function(t){t instanceof Element&&o(t)}):"attributes"===t.type&&o(t.target)}),s(n,r)}).observe(document.body,{childList:!0,attributes:!0,subtree:!0,attributeFilter:l})},100)})}}();