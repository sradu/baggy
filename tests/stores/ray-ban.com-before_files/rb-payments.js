!function(a,s){a.AfterPay=(s(window).load(function(){a.AfterPay.initOverlay()}),{initOverlay:function(){a.OverlayManager&&new a.OverlayManager({triggerCssClass:"afterpay-overlay-link"}).initAll()},updateAfterpayAmount:function(a,t,e,r,n,i){var l,o,f=s(".wcs-afterpay-amount-js"),p=s(".wcs-afterpay-installments-number-js")[0];if(f.length&&(l=Number(p.textContent),!isNaN(l))){o=(-Math.round(-100*a/l)/100).formatMoney(t,e,r),"PL"===i?o+=n:o=n+o;for(var y=0;y<f.length;y++)f[y].textContent=o}},updateAfterpayAmountMobile:function(a){var t,e,r,n,i,l;void 0!==s("#afterpayEnabled")&&"Y"===s("#afterpayEnabled").val()&&(t=parseFloat(a),e=parseFloat(s("#afterpayThresholdMin").val()),r=parseFloat(s("#afterpayThresholdMax").val()),n=parseFloat(s("#afterpayNoInstallment").val()),i="ProductPage"===s('input[name="pageName"]').val()?s("#currentCurrencySymbol").val():"",0<t&&e<=t&&t<=r?"virtual gift card"!==s("#items .clearfix-label").text().trim()&&"Y"!==s("#isVirtualGiftCardPage").val()&&"true"!==s("#isEGiftCard").val()&&"true"!==s("#isPGiftCard").val()&&(s("#afterpayInScopeRange").show(),s("#afterpayOutsideScopeRange").hide(),l=parseFloat(Math.round(a/n*100)/100).toFixed(2),s("#afterpayAmount").text(i+" "+l),Utility.formatNo()):(s("#afterpayInScopeRange").hide(),s("#afterpayOutsideScopeRange").show()))}})}(window.Rayban=window.Rayban||{},$);
//# sourceMappingURL=rb-payments.js.map