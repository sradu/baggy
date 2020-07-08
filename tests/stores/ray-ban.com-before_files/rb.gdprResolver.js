(function(doc) {
    var anExecutingScript = doc.currentScript || (function(doc) {
        var gdprScriptNodeList = doc.querySelectorAll('script[gdprsection]');
        return gdprScriptNodeList[gdprScriptNodeList.length - 1];
    })(doc);
    var gdprSection = anExecutingScript.getAttribute('gdprSection');
    var scriptUrl = anExecutingScript.getAttribute('scriptUrl');
    var isAsync = anExecutingScript.getAttribute('scriptAsync') === 'true';
    var isDefer = anExecutingScript.getAttribute('scriptDefer') === 'true';
    var scriptLabel = anExecutingScript.getAttribute('scriptLabel');
    var cookieValue = getCookie('CONSENTMGR');
    var targetCountries = getTargetCountries();

    if (targetCountries === 'true') {
        if (cookieValue !== undefined && cookieValue.indexOf('consent:true') >= 0) {
            if (gdprSection === 'analytics') {
                if (cookieValue.indexOf('c1:1') >= 0 || cookieValue.split('|').length === 2) {
                    loadBazaarVoiceScript(doc, scriptUrl, isAsync, isDefer);
                }
            } else if (gdprSection === 'marketing') {
                if (cookieValue.indexOf('c9:1') >= 0 || cookieValue.split('|').length === 2) {
                    if (scriptLabel === 'bounceExchange') {
                        loadBounceExchangeScript(doc, doc.location.protocol + scriptUrl, isAsync, isDefer);
                    }
                    if (scriptLabel === 'qubit') {
                        loadQubitScript(doc, scriptUrl, isAsync, isDefer);
                    }
                }
            }
        }
    } else {
        if (gdprSection === 'analytics') {
            loadBazaarVoiceScript(doc, scriptUrl, isAsync, isDefer);
        } else if (gdprSection === 'marketing') {
            if (scriptLabel === 'bounceExchange') {
                loadBounceExchangeScript(doc, doc.location.protocol + scriptUrl, isAsync, isDefer);
            }
            if (scriptLabel === 'qubit') {
                loadQubitScript(doc, scriptUrl, isAsync, isDefer);
            }
        }
    }
}(document));

function getTargetCountries() {
    var result = 'false';

    if (document.getElementById('restrictedCountries')) {
        result = document.getElementById('restrictedCountries').value.toLowerCase();
    } else if (document.querySelector('meta[name="restrictedCountries"]')) {
        result = document.querySelector('meta[name="restrictedCountries"]').getAttribute('content').toLowerCase();
    }

    return result;
}

function loadQubitScript(doc, scriptUrl, isAsync, isDefer) {
    addScriptToPage(doc, scriptUrl, isAsync, isDefer);
}

function loadBazaarVoiceScript(doc, scriptUrl, isAsync, isDefer) {
    addScriptToPage(doc, scriptUrl, isAsync, isDefer);
}

function loadBounceExchangeScript(doc, scriptUrl, isAsync, isDefer) {
    addScriptToPage(doc, scriptUrl, isAsync, isDefer);
}

function addScriptToPage(doc, scriptUrl, isAsync, isDefer) {
    var scriptElement = doc.createElement('script');
    scriptElement.async = isAsync;
    scriptElement.defer = isDefer;
    scriptElement.src = scriptUrl;
    doc.querySelector('head').appendChild(scriptElement);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
