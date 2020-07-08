(function () {
    var xsrfToken = 'X-XSRF-TOKEN';
    function getToken() {
        var cookie = document.cookie.match('(^|[^;]+)\\s*' + 'XSRF-TOKEN' + '\\s*=\\s*([^;]+)');
        return cookie ? cookie.pop() : '';
    }

    function isLocalRequest(url) {
        if (url.match(new RegExp('^(https?:)?\/\/' + window.location.hostname))) {
            return true;
        }

        return !url.match(new RegExp('^(https?:)?\/\/'));
    }

    function isAssetRequest(method, url) {
        if (method && method.toUpperCase() !== 'GET') {
            return false;
        }

        return /\.(png|gif|jpe?g|css|js|json|svg|html?)$/.test(url.split('?')[0]);
    }

    function isWhiteListed(action, whitelist) {
        for (var i = 0; i < whitelist.length; i++) {
            if (action && action.match(whitelist[i])) {
                return true;
            }
        }

        return false;
    }

    function patchRequestHeaders(requestOrOptions) {
        requestOrOptions.headers = requestOrOptions.headers || {};

        if (requestOrOptions.headers.append) {
            requestOrOptions.headers.delete(xsrfToken);
            requestOrOptions.headers.append(xsrfToken, getToken());
        } else {
            requestOrOptions.headers[xsrfToken] = getToken();
        }
    }

    var xmlHttpRequestPrototype = Object.getPrototypeOf(new window.XMLHttpRequest());
    var open = xmlHttpRequestPrototype.open;
    var send = xmlHttpRequestPrototype.send;

    xmlHttpRequestPrototype.open = function () {
        this._isLocalRequest = isLocalRequest(arguments[1]);
        this._isAssetRequest = isAssetRequest(arguments[0], arguments[1]);

        return open.apply(this, arguments);
    };

    xmlHttpRequestPrototype.send = function () {
        if (this._isLocalRequest && !this._isAssetRequest) {
            this.setRequestHeader(xsrfToken, getToken());
        }

        return send.apply(this, arguments);
    };

    function handleSubmit(event) {
        var csrfInput = document.createElement('input');
        var action = event.target.getAttribute('action');

        if (action != null && isWhiteListed(action, whiteListActions)) {
            event.target.method = 'POST';
        }

        if (event.target.querySelector('input[name="authenticity_token"')) {
            return;
        }

        if (event.target.method.toLowerCase() !== 'post') {
            return;
        }

        csrfInput.setAttribute('type', 'hidden');
        csrfInput.setAttribute('name', 'authenticity_token');
        csrfInput.setAttribute('value', getToken());
        event.target.appendChild(csrfInput);
    }

    if (window.$ && window.$.fn && window.$.fn.jquery) {
        $(document).submit(handleSubmit);
    } else {
        document.addEventListener('submit', handleSubmit);
    }

    if (window.fetch) {
        var _fetch = window.fetch;

        window.fetch = function (urlOrRequest, options) {
            if (window.Request) {
                var request = new Request(urlOrRequest, options);
                if (isLocalRequest(request.url) && !isAssetRequest(request.method, request.url)) {
                    patchRequestHeaders(request);
                }
                return _fetch(request);
            }

            var url = urlOrRequest;
            var opt = options || {};

            if (isLocalRequest(url) && !isAssetRequest(opt.method, url)) {
                patchRequestHeaders(opt);
            }

            return _fetch(url, opt);
        };
    }

    var whiteListActions = [
        new RegExp('^' + window.location.origin + '/wishlist.php'),
        new RegExp('^/?wishlist.php'),
    ];
})();
