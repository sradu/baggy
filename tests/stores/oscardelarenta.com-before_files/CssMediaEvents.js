(function (window) {
	var constructor = function () {
		var __currentViewPort = null;

		var __xsChanged = function (mq) {
			if (mq.matches) {
				__currentViewPort = "xs";
				__signalViewPortChangeEvent();
				//console.log('enter xs view port');
			}
			else {
				//console.log('leave xs view port');
			}
		}

		var __smChanged = function (mq) {
			if (mq.matches) {
				__currentViewPort = "sm";
				__signalViewPortChangeEvent();
				//console.log('enter sm view port');
			}
			else {
				//console.log('leave sm view port');
			}
		}

		var __mdChanged = function (mq) {
			if (mq.matches) {
				__currentViewPort = "md";
				__signalViewPortChangeEvent();
				//console.log('enter md view port');
			}
			else {
				//console.log('leave md view port');
			}
		}

		var __lgChanged = function (mq) {
			if (mq.matches) {
				__currentViewPort = "lg";
				__signalViewPortChangeEvent();
				//console.log('enter lg view port');
			}
			else {
				//console.log('leave lg view port');
			}
		}

		var __viewPortChangeHandlers = new Array();
		var __signalViewPortChangeEvent = function () {
			for (var i = 0; i < __viewPortChangeHandlers.length; i++) {
				__viewPortChangeHandlers[i](__currentViewPort);
			}
		};

		this.bind = function () {
			if (window.matchMedia) {
				const xs = window.matchMedia("(max-width:767px)");
				xs.addListener(__xsChanged);
				if (xs.matches) __xsChanged(xs);

				const sm = window.matchMedia("(min-width:768px) and (max-width:991px)");
				sm.addListener(__smChanged);
				if (sm.matches) __smChanged(sm);

				const md = window.matchMedia("(min-width:992px) and (max-width:1199px)");
				md.addListener(__mdChanged);
				if (md.matches) __mdChanged(md);

				const lg = window.matchMedia("(min-width:1200px)");
				lg.addListener(__lgChanged);
				if (lg.matches) __lgChanged(lg);
			}
		};

		this.getCurrentViewPort = function () {
			return __currentViewPort;
		};

		this.onViewPortChange = function (handler) {
			if (typeof (handler) === "function") {
				__viewPortChangeHandlers.push(handler);
			}
			else {
				console.error("Parameter handler for call to CssMediaEvents.onViewPortChange is not a valid function.");
			}
		};

	};

	window.CssMediaEvents = new constructor();
	window.CssMediaEvents.bind();
})(window);