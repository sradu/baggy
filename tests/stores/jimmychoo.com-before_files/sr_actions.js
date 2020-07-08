(function(srApp,$,undefined){var $cache;function initSRCache(){$cache={blockFrm:$("#dwfrm_ineligiblecart"),keepItemsBtn:$("button[name='dwfrm_ineligiblecart_keepitems']"),srCartDiv:$('div[name="sr_payRunnerCartDiv"]')};}
function initSREvents(){$cache.keepItemsBtn.on("click",function(e){e.preventDefault();sr_$.signOut();if($cache.blockFrm){setTimeout(function(){$cache.blockFrm.submit();},900);}});refreshSRCart();}
function refreshSRCart(){if($cache.srCartDiv.length){setTimeout(function(){sr_pageRefreshes=true;},800);}}
initSRCache();initSREvents();}(window.srApp=window.srApp||{},jQuery));