// <reference path="http://code.jquery.com/jquery-1.9.1.min.js"/>
var DEBUG = true;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Pattern for ajax calls
/*
		var payload = {
			someID: 123,
			someValue: "hello world"
		};

		$('#SomeButton').prop("disabled", true);

		$.ajax({

			async: true,
			type: "POST",
			url: "https://site.domain/api/method",
			data: JSON.stringify(payload),
			contentType: "application/json; charset=utf-8",
			dataType: "json"
    
		// Success
		}).done(function(data, textStatus, jqXHR) {
	
			console.log( "Response Data: ", JSON.stringify(data));
		
		}).fail(function(jqXHR, textStatus, errorThrown) {
	
			console.log("Ajax failed: (" + textStatus + ") - " + errorThrown);
	
		}).always(function() {
	
			console.log("Whether success or fail, the ajax call is now complete.");
			$('#SomeButton').prop("disabled", false);	

		});
*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////




(function (window) {
	var constructor = function () {
		var __context = {
			isLoggedIn: false,
			cdnUrl: '',
			appName: ''
		};

		var __initWishlistToggles = function () {
			StoreFront.getWishlistItems(function (wishlist) {
				// Find all product-img containers and apply the wishlist toggle (if ProductID can be determined)
				$('.add_to_wishlist_btn').each(function (index, item) {
					// Cannot show a wishlist toggle if the image doesn't have the ProductID data attribute
					var productid = $(item).data('productid');
					if (productid === undefined) return false;

					// Determine the current state of the item (is it in the user's wishlist or not)
					if (wishlist != null) {
						var isInWishlist = false;
						for (var i = 0; i < wishlist.length; i++) {
							if (wishlist[i].ProductID == productid) {
								isInWishlist = true;
								break;
							}
						}
					}

					var icon = $(item).find('.wishlist_ico');
					if (isInWishlist) {
						icon.addClass("active");
						$(item).attr('title', 'Added to Wishlist');
					}
					else {
						icon.removeClass("active");
						$(item).attr('title', 'Add to Wishlist');
					}

					// Wire up the click event
					$(item).off('click');
					$(item).on('click', function () {
						var $ico = $(this).find('.wishlist_ico');
						$ico.addClass('fa-spin');
						StoreFront.toggleWishlistItem(
							$(this).data("productid"),
							$ico.hasClass("active") ? "remove" : "add",
							function (args) {
								$ico.removeClass('fa-spin');
								if (args.isInWishlist) {
									$ico.addClass("active");
									$(item).attr('title', 'Added to Wishlist');
								}
								else {
									$ico.removeClass("active");
									$(item).attr('title', 'Add to Wishlist');
								}
							}
						);
					});
				});
			});
		};

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Customer Event Handlers (i.e. for 3rd Party integrations)
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		var __onAddedToCartHandlers = new Array();
		var __onRemovedFromCartHandlers = new Array();
		var __onAddedToWishListHandlers = new Array();
		var __onRemovedFromWishListHandlers = new Array();
		var __onCategoryDetailLandedHandlers = new Array();
		var __onCartEmptiedHandlers = new Array();
		var __onOrderPlacedHandlers = new Array();
		var __onProductViewedHandlers = new Array();
		var __onAddedToCartHandlersFullCart = new Array();
		var __onRemovedFromCartHandlersRemainingCart = new Array();
		var __onEmailAddedToMailingList = new Array();


		this.onAddedToCart = function (handler) {
			if (typeof (handler) === "function") {
				__onAddedToCartHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onAddedToCart is not a valid function");
			}
		};
		this.onEmailAddedToMailingList = function (handler) {
			if (typeof (handler) === "function") {
				__onEmailAddedToMailingList.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onEmailAddedToMailingList is not a valid function");
			}
		};
		this.broadcastEmailAddedToMailingList = function (email_address, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onEmailAddedToMailingList.length; i++) {
				__onEmailAddedToMailingList[i](email_address);
			}

			callback();
		};
		this.onAddedToCartFullCart = function (handler) {
			if (typeof (handler) === "function") {
				__onAddedToCartHandlersFullCart.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onAddedToCartFullCart is not a valid function");
			}
		};
		this.onRemovedFromCart = function (handler) {
			if (typeof (handler) === "function") {
				__onRemovedFromCartHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onRemovedFromCart is not a valid function");
			}
		};

		this.onAddedToWishList = function (handler) {
			if (typeof (handler) === "function") {
				__onAddedToWishListHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onAddedToWishList is not a valid function");
			}
		};

		this.onRemovedFromWishList = function (handler) {
			if (typeof (handler) === "function") {
				__onRemovedFromWishListHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onRemovedFromWishList is not a valid function");
			}
		};

		this.onCategoryDetailLanded = function (handler) {
			if (typeof (handler) === "function") {
				__onCategoryDetailLandedHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onCategoryDetailLanded is not a valid function");
			}
		};
		this.onCartEmptied = function (handler) {
			if (typeof (handler) === "function") {
				__onCartEmptiedHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onCartEmptied is not a valid function");
			}
		};
		this.onOrderPlaced = function (handler) {
			if (typeof (handler) === "function") {
				__onOrderPlacedHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onOrderPlaced is not a valid function");
			}
		};
		this.onRemovedFromCartRemainingCartEvent = function (handler) {
			if (typeof (handler) === "function") {
				__onRemovedFromCartHandlersRemainingCart.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onRemovedFromCartRemainingCartEvent is not a valid function");
			}
		};
		this.broadcastOrderPlaced = function (items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onOrderPlacedHandlers.length; i++) {
				__onOrderPlacedHandlers[i](items);
			}

			callback();
		};
		this.onProductViewed = function (handler) {
			if (typeof (handler) === "function") {
				__onProductViewedHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method StoreFront.onProductViewed is not a valid function");
			}
		};
		this.broadcastProductViewed = function (item, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onProductViewedHandlers.length; i++) {
				__onProductViewedHandlers[i](item);
			}

			callback();
		};
		this.broadcastCartEmptied = function (callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onCartEmptiedHandlers.length; i++) {
				__onCartEmptiedHandlers[i]();
			}

			callback();
		};
		// items: must be an array of objects with json format = { productName, productCode, styleNumber, sku, quantity }
		this.broadcastAddedToCartEvent = function (items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onAddedToCartHandlers.length; i++) {
				__onAddedToCartHandlers[i](items);
			}

			callback();
		};
		this.broadcastAddedToCartEventFullCart = function (all_items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onAddedToCartHandlersFullCart.length; i++) {
				__onAddedToCartHandlersFullCart[i](all_items);
			}

			callback();
		};
		// current_cart_items: must be an array of objects with json format = { productName, productCode, styleNumber, sku, quantity }
		this.broadcastRemovedFromCartRemainingCartEvent = function (current_cart_items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onRemovedFromCartHandlersRemainingCart.length; i++) {
				__onRemovedFromCartHandlersRemainingCart[i](current_cart_items);
			}

			callback();
		};
		// items: must be an array of objects with json format = { productName, productCode, styleNumber, sku, quantity }
		this.broadcastRemovedFromCartEvent = function (items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onRemovedFromCartHandlers.length; i++) {
				__onRemovedFromCartHandlers[i](items);
			}

			callback();
		};

		// items: must be an array of objects with json format = { productName, productCode, styleNumber, sku }
		this.broadcastAddedToWishListEvent = function (items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onAddedToWishListHandlers.length; i++) {
				__onAddedToWishListHandlers[i](items);
			}

			callback();
		};

		// items: must be an array of objects with json format = { productName, productCode, styleNumber, sku }
		this.broadcastRemovedFromWishListEvent = function (items, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onRemovedFromWishListHandlers.length; i++) {
				__onRemovedFromWishListHandlers[i](items);
			}

			callback();
		};

		// detail: must be object with {hierachy: [], filters: []}
		// hierarchy: must be array of category names with first element the top most parent and last element the landed category child
		// filters: must be array of objects {name: "name", value: "value"}
		this.broadcastCategoryDetailLanded = function (detail, callback) {
			callback = callback || function () { };

			for (var i = 0; i < __onCategoryDetailLandedHandlers.length; i++) {
				__onCategoryDetailLandedHandlers[i](detail);
			}

			callback();
		};

		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		this.proceedToCheckout = function () {
			document.location = "/viewcart";
		};

		this.bind = function (context) {
			__context = $.extend({}, __context, context);

			//console.log('init wishlist items...');
			__initWishlistToggles();
			//console.log(__context.isLoggedIn);
		};

		this.getCdnUrl = function () {
			return __context.cdnUrl;
		}

		this.getAppName = function () {
			return __context.appName;
		}

		this.getWishlistItems = function (callback) {
			callback = callback || function () { };
			if (__context.isLoggedIn) {
				$.ajax({
					type: "POST",
					url: "/webservices/ProductService.asmx/GetWishlistItems",
					data: JSON.stringify({}),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (msg) {
						if (msg.d.Success) {
							__context.isLoggedIn = msg.d.Data.IsLoggedIn;
							callback(msg.d.Data.Wishlist);
						}
						else {
							console.error(
								"Failed to get wish list items\r\n\r\n - " +
								msg.d.ErrorMessage
							);
							callback(null);
						}
					},
					error: function (error) {
						console.error(
							"Failed to get wish list items\r\n\r\n - " +
							error.status + ": " + error.statusText
						);
						callback(null);
					}
				});
			}
			else {
				callback(null);
			}
		};

		this.toggleWishlistItem = function (productId, toggleState, callback) {
			callback = callback || function () { };
			if (__context.isLoggedIn) {
				$.ajax({
					type: "POST",
					url: "/webservices/ProductService.asmx/ToggleWishlistItem",
					data: JSON.stringify({ productId: productId, toggleState: toggleState }),
					contentType: "application/json; charset=utf-8",
					dataType: "json",
					success: function (msg) {
						if (msg.d.Success) {
							__context.isLoggedIn = msg.d.Data.IsLoggedIn;
							if (__context.isLoggedIn) {
								callback({ success: true, isInWishlist: msg.d.Data.IsInWishlist });
							}
							else {
								alert('Please login to add items to your wishlist.');
								document.location = "/login?ReturnUrl=" + encodeURI(document.location);
								callback({ success: false, isInWishlist: false });
							}
						}
						else {
							alert(
								"Failed to add product to wishlist for productId = " + productId + "\r\n\r\n - " +
								msg.d.ErrorMessage
							);
							callback({ success: false, isInWishlist: false });
						}
					},
					error: function (error) {
						alert(
							"Failed to add product to wishlist for productId = " + productId + "\r\n\r\n - " +
							error.status + ": " + error.statusText
						);
						callback({ success: false, isInWishlist: false });
					}
				});
			}
			else {
				alert('Please login to add items to your wishlist.');
				document.location = "/login?ReturnUrl=" + encodeURI(document.location);
				callback({ success: false, isInWishlist: false });
			}
		};


		this.getBadges = function (productId) {

		        $.ajax({
		            type: "POST",
		            url: "/api/Content/GetBadges",
		            data: JSON.stringify({ productId: productId }),
		            contentType: "application/json; charset=utf-8",
		            dataType: "json",
		            success: function (msg) {
		                if (msg.d.Success) {
		                    return msg.d;
		                }
		                else {
		                    console.warn("Failed to GetBadges for productid = " + productId + "\r\n\r\n - " +
								msg.d.ErrorMessage
							);
		                    
		                }
		            },
		            error: function (error) {
		                console.warn(
							"Failed to GetBadges for productid = " + productId + "\r\n\r\n - " +
							error.status + ": " + error.statusText
						);
		            }
		        });
		};

		this.formatError = function (error) {
			var msg = null;
			try {
				msg = eval('(' + error.responseText + ')');
			}
			catch (e) {
				msg = null;
			}
			var message = msg == null ? 'Error (' + error.status + '): ' + error.statusText : msg.Message; // + "\r\n\r\n" + msg.StackTrace;

			return message;
		};

		this.toJsonString = function (value, doublequote) {
			if (value == null) return "null";

			if (doublequote)
				return '"' + value.replace(/"/g, '\\"') + '"';
			else
				return "'" + value.replace(/'/g, "\\'") + "'";
		};

		this.imageResize = function () {
			$('img[data-originalimg]').each(function (index) {

				var parentWidth = $(this).parent().closest('div:not(.ig-loading)').width();
				var finalWidth;
				if (parentWidth == 0)
					finalWidth = 1920;
				else if (parentWidth <= 576)
					finalWidth = 576;
				else if (parentWidth <= 768)
					finalWidth = 768;
				else if (parentWidth <= 992)
					finalWidth = 992;
				else if (parentWidth <= 1200)
					finalWidth = 1200;
				else
					finalWidth = 1920;

				//if (parentWidth > 0) {
				$(this).attr('src', $(this).attr('data-originalimg').replace("/images/original", "").replace("/sitefiles", "/images/resized/" + finalWidth + "/sitefiles"));
				//}
				//else
				//	$(this).attr('src', $(this).attr('data-originalsrc'));
			});
		};
		// Deprecated
		//this.search = function () {
		//	var txtSearch = $('#txtSearch');

		//	document.location = '/search?q=' + encodeURIComponent(txtSearch.val());
		//};

		// Deprecated
		//this.searchAutoPopData = function (request, response) {
		//	var data = JSON.stringify(
		//	{
		//		term: request.term
		//	});

		//	$.ajax({
		//		type: "POST",
		//		url: "/webservices/ProductService.asmx/Search",
		//		contentType: "application/json; charset=utf-8",
		//		data: data,
		//		dataType: "json"
		//	}).done(function (msg) {
		//		if (msg.d.Success) {
		//			response(msg.d.Data);
		//		}
		//		else {
		//			console.error(msg.d.ErrorMessage);
		//		}
		//	});
		//};


		this.openWindow = function (args) {
			/// <summary>Opens a new window using window.open but with more options and easier positioning.</summary>
			/// <param name="args">
			///		Object with the following properties:
			///		<para>name - name of the window (default is "winPopup")</para>
			///		<para>url - url to open within the window (default is "." i.e. the current page)</para>
			///		<para>width - width of the window in pixels (default is 800)</para>
			///		<para>height - height of the window in pixels (default is 600)</para>
			///		<para>showStatus - show the status bar of the window (default is false)</para>
			///		<para>showToolbar - show the window toolbar (default is false)</para>
			///		<para>showLocation - show the window address bar (default is false)</para>
			///		<para>showDirectories - show the window diretories (default is false)</para>
			///		<para>showScrollbars - show/enable the window scrollbars for scrolling content (default is true)</para>
			///		<para>isResizable - enable the window to be resizable (default is false)</para>
			///		<para>
			///			position - if provided, positions the window either by top/left params or by relation to the screen (default is null)
			///			<para>-----example positions:</para>
			///			<para>-----exact - indicates top and left parameters should be used</para>
			///			<para>-----top-left - positions the window at the top left of the screen (i.e. 0/0)</para>
			///			<para>-----top-center - positions the window at top center of the screen</para>
			///			<para>-----etc... (top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right)</para>
			///		</para>
			///     <para>top - if provided specifies the top position of the window (position parameter must be "exact") (default is null)</para>
			///     <para>left - if provided specifies the left position of the window (position parameter must be "exact") (default is null)</para>
			/// </param>
			var defaultArgs = {
				name: "winPopup",
				url: ".",
				width: 800,
				height: 600,
				showStatus: false,
				showToolbar: false,
				showLocation: false,
				showMenu: false,
				showDirectories: false,
				showScrollbars: true,
				isResizable: false,
				position: null, // exact, top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right

				// Must specify "exact" in position parameter
				top: null,
				left: null
			};

			args = $.extend({}, defaultArgs, args);

			var features =
				"width=" + args.width + ",height=" + args.height + "," +
				"status=" + (args.showStatus ? "1" : "0") + "," +
				"toolbar=" + (args.showToolbar ? "1" : "0") + "," +
				"location=" + (args.showLocation ? "1" : "0") + "," +
				"menubar=" + (args.showMenu ? "1" : "0") + "," +
				"directories=" + (args.showDirectories ? "1" : "0") + "," +
				"resizable=" + (args.isResizable ? "1" : "0") + "," +
				"scrollbars=" + (args.showScrollbars ? "1" : "0");

			// Positioning
			if (args.position) {
				var dimensions = StoreFront.getBrowserWindowDimensions();
				switch (args.position) {
					case "exact":
						args.top = args.top || 0;
						args.left = args.left || 0;
						break;

					case "top-left":
						args.top = 0;
						args.left = 0;
						break;

					case "top-center":
						args.top = 0;
						args.left = (dimensions.width - args.width) / 2;
						break;

					case "top-right":
						args.top = 0;
						args.left = (dimensions.width - args.width);
						break;

					case "center-left":
						args.top = (dimensions.height - args.height) / 2;
						args.left = 0;
						break;

					case "center":
						args.top = (dimensions.height - args.height) / 2;
						args.left = (dimensions.width - args.width) / 2;
						break;

					case "center-right":
						args.top = (dimensions.height - args.height) / 2;
						args.left = (dimensions.width - args.width);
						break;

					case "bottom-left":
						args.top = (dimensions.height - args.height);
						args.left = 0;
						break;

					case "bottom-center":
						args.top = (dimensions.height - args.height);
						args.left = (dimensions.width - args.width) / 2;
						break;

					case "bottom-right":
						args.top = (dimensions.height - args.height);
						args.left = (dimensions.width - args.width);
						break;
				}

				args.top += dimensions.top;
				args.left += dimensions.left;

				features += ",top=" + args.top + ",left=" + args.left;
			}

			return window.open(args.url, args.name, features);
		};

		this.showAlert = function (args) {
			var $win = $('#modAlert');

			// Simple message with no title
			if (typeof (args) === "string") {
				$win.find('.modal-title').html("").hide();
				$win.find('.modal-body').html(args);
			}
			// Message with title
			else {
				$win.find('.modal-title').html(args.title).show();
				$win.find('.modal-body').html(args.message);

				if (args.hideCloseIcon) {
					$('#modAlertCloseIcon').hide();
				}
				else {
					$('#modAlertCloseIcon').show();
				}
			}
			$win.modal('show');
		}

		this.getBrowserWindowDimensions = function () {
			return {
				width: $(window).width(),
				height: $(window).height(),
				top: (window.screenY || window.screenTop || 0),
				left: (window.screenX || window.screenLeft || 0)
			};
		};
		this.getUrlParameter = function (name) {
			name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
			var results = regex.exec(window.location.search);
			return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
		};


		this.isLoggedIn = function () {
			var result = false;

			$.ajax({
				async: false,
				type: "POST",
				url: "/webservices/CheckoutService.asmx/IsLoggedIn",
				data: "{ }",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (msg) {
					result = msg.d;
				},
				error: function (error) {
					if (DEBUG) {
						alert(
							"Failed to retrieve login status\r\n\r\n" +
							StoreFront.formatError(error) + "\r\n\r\n" +
							"Set DEBUG=false to disable this alert"
						);
					}
				}
			});

			return result;
		};

		this.isValidCcNumber = function (ccNumber) {

			var ccType = String(ccNumber).substring(0, 1);

			switch (ccType) {
				case "4": // Visa
					return /^([4]{1})([0-9]{12,15})$/.test(ccNumber);
					break;

				case "2": // MasterCard
					var prefix = parseInt(ccNumber.substring(0, 6));
					console.log('prefix ' + prefix);
					if (prefix < 222100 || prefix > 272099) {
						return false;
					}

					return /^([0-9]{16})$/.test(ccNumber);

				case "5": // MasterCard
					return /^([51|52|53|54|55]{2})([0-9]{14})$/.test(ccNumber);
					break;

				case "6": // Discover
					return /^([6011]{4})([0-9]{12})$/.test(ccNumber);
					break;

				case "3": // American Express
					return /^([34|37]{2})([0-9]{13})$/.test(ccNumber);
					break;

				default:
					return false;
					break;
			}
		};

		this.isValidEmailAddress = function (value) {
			var re = new RegExp("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*");
			return re.test(value);
		};

	    /**
        * Shares item on social network of choice.
        *
        *@param {string} network Pick your poison.
        *@param {string} url Url to share on said network.
        */
		this.share = function (network, url, msg) {
			if (!url)
				url = window.location;

			switch (network.toLowerCase()) {
				case 'facebook':
					window.open("http://www.facebook.com/share.php?u=" + encodeURIComponent(url));
					break;
				case 'twitter':
					if (msg)
						msg += ": " + url;
					else
						msg = url;
					window.open("https://twitter.com/share?text=" + encodeURIComponent(msg) + "&url=");
					break;
				case 'google+':
					window.open("https://plus.google.com/share?url=" + encodeURIComponent(url));
					break;
				case 'linkedin':
					window.open("http://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url));
					break;
				case 'pinterest':
					var imgPath = "";
					window.open("https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(url) + "&media=" + encodeURIComponent(imgPath));
					break;
				default:
					console.warn('Need to designate a social network to share on...');
					break;
			}
		};

		this.validateLogin = function (sender, args) {
			var username = $('#txtUsername').val();
			var password = $('#txtPassword').val();

			var data = {
				'username': username,
				'password': password
			};

			data = JSON.stringify(data);

			$.ajax({
				async: false,
				type: "POST",
				url: "/webservices/ValidationService.asmx/ValidateLogin",
				data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (msg) {
					args.IsValid = msg.d;
				},
				error: function (error) {
					if (DEBUG) {
						alert(
							"Failed to retrieve login status\r\n\r\n" +
							StoreFront.formatError(error) + "\r\n\r\n" +
							"Set DEBUG=false to disable this alert"
						);
					}
				}
			});
		};

		this.getParameterByName = function getParameterByName(name, url) {
			if (!url) url = window.location.href;
			name = name.replace(/[\[\]]/g, "\\$&");
			var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
				results = regex.exec(url);
			if (!results) return null;
			if (!results[2]) return '';
			return decodeURIComponent(results[2].replace(/\+/g, " "));
		};

		this.SendSimpleEmail = function (fromName, fromEmail, fromPhone, message) {
			var data = { 'fromName': fromName, 'fromEmail': fromEmail, 'fromPhone': fromPhone, 'message': message };
			data = JSON.stringify(data);
			var result = "";
			$.ajax({
				async: false,
				type: "POST",
				url: "/baseapi/SendSimpleEmail",
				data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (msg) {
					result = msg;
				},
				error: function (error) {
					// Ignore the error and rely on server side validation
					result = StoreFront.formatError(error);
				}
			});

			return result;
		}

		this.ValidateEmail = function validateEmail(sEmail) {
			var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
			if (filter.test(sEmail)) {
				return true;
			}
			else {
				return false;
			}
		}

		this.exitSiteVersionPreview = function () {
			if (location.search.indexOf("sver=") >= 0) {
				window.history.replaceState("{}", document.title, [location.protocol, '//', location.host, location.pathname].join(''));
			}
			$.cookie("PreviewSiteVersionID", "", { expires: -1, path: "/" });
			document.location = document.location;
		}

		this.scrollTo = function (el, offeset) {
			var pos = (el && el.size() > 0) ? el.offset().top : 0;
			if (el) {
				if ($('body').hasClass('page-header-fixed')) {
					pos = pos - $('.header').height();
				}
				pos = pos + (offeset ? offeset : -1 * el.height());
			}

			jQuery('html,body').animate({
				scrollTop: pos
			}, 'slow');
		}

		// This function only returns true if the value is a number and contains no other characters
		this.isNumeric = function (value) {
			if (value == undefined) return false;
			if (value == "") return false;
			if (value == null) return false;

			return !isNaN(value) && !isNaN(parseFloat(value));
		};

		// This funciton only returns true if the value is a whole number (integer) and contains no other characters or decimal parts
		this.isInteger = function (value) {
			if (!StoreFront.isNumeric(value)) return false;

			var float = parseFloat(value);
			var int = parseInt(value);

			return !isNaN(value) && !isNaN(int) && (int == float);
		};

		// Returns the value as an int only if the value is exactly an int, otherwise the default value is returned
		// Example: 123abc is not an int
		//			123.12 is not an int
		//			123 is an int
		this.toInt = function (value, defaultValue) {
			if (!StoreFront.isNumeric(value)) return defaultValue;

			return parseInt(value);
		};

		// Returns the value as a decimal only if the value is exactly a decimal, otherwise the default value is returned
		// Example: 123abc is not a decimal
		//			123.12abc is not a decimal
		//			123 is a decimal
		//          123.12 is a decimal
		this.toFloat = function (value, defaultValue) {
			if (!StoreFront.isNumeric(value)) return defaultValue;

			return parseFloat(value);
		};

		this.imageUrlToDataUrl = function (url, callback) {
			callback = callback || function () { console.error("StoreFront.imageUrlToDataUrl callback undefined"); };

			var tmp = new Image();
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");

			tmp.crossOrigin = "Anonymous";

			tmp.onload = function () {
				canvas.width = tmp.naturalWidth;
				canvas.height = tmp.naturalHeight;
				ctx.drawImage(tmp, 0, 0);
				callback(canvas.toDataURL("image/png"));//.replace(/^data:image\/(png|jpg);base64,/, "");
			}
			tmp.src = url;

			// make sure the load event fires for cached images too
			if (tmp.complete || tmp.complete === undefined) {
				tmp.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				tmp.src = url;
			}
		};

		this.updateMediaViewPort = function (viewport) {
			// Pending mobile images need to be downloaded
			if (viewport == "xs") {
				$('.visible-xs .ig-loading').each(function () {
					$(this).find('img').attr("data-originalimg", $(this).data("imgsrc"));
					$(this).removeClass('lg-loading');
				});
			}
			// Pending non-mobile images need to be downloaded
			else { 
				$('.hidden-xs .ig-loading').each(function () {
					$(this).find('img').attr("data-originalimg", $(this).data("imgsrc"));
					$(this).removeClass('lg-loading');
				});
			}
			StoreFront.imageResize();
		};

		this.calculateCart = function () {
			$.ajax({
				type: "POST",
				url: "/webservices/ProductService.asmx/GetCartHeaderSummary",
				contentType: "application/json; charset=utf-8",
				dataType: "json"
			}).done(function (msg) {

				window.cart = msg.d;
			}
			);
		};
		this.applyCallToActionMessages = function (cartsummary) {
			var cartItems = [];

				$.each(cartsummary.lines, function (index, item) {
					cartItems.push({ "ProductID": item.ProductID, "ItemPrice": item.ItemPrice, "ExtPrice": item.ExtPrice, "Quantity":item.Quantity, "ItemDiscount": item.ItemDiscount, "PickupLocationNumber": item.PickupLocationNumber })
				});

			$.ajax({
				async: true,
				type: "POST",
				traditional: true,
				data: JSON.stringify(cartItems),
				url: "/api/CallToAction/GetCTADTOs",
				contentType: "application/json; charset=utf-8",
				dataType: "json"

				// Success
			}).done(function (data, textStatus, jqXHR) {

			    if (data.Success) {
			        var rule = data.Data[0];
			        if (rule != undefined) {

			            if (rule.CTAType == "Shipping") {
			                var ShippingRule = rule.Rule;
			                if (ShippingRule.AdjustedCartTotal == -1) {
			                    //hide the cta
			                } else {
			                    var amtToGo = ShippingRule.Threshold - ShippingRule.AdjustedCartTotal;
			                    var preMsg = ShippingRule.PreMessage.replace("{amt}", "$" + amtToGo.toFixed(2));
			                    var postMsg = ShippingRule.PostMessage;
			                    if (ShippingRule.Location.indexOf('header') != -1) {
			                        $('.cta-rule-container').slideDown();
			                        if (ShippingRule.Threshold > ShippingRule.AdjustedCartTotal) {
			                            $('#spnCTARuleHeader').text(preMsg);
			                        } else {
			                            $('#spnCTARuleHeader').text(postMsg);
			                        }
			                    }
			                    if (ShippingRule.Location.indexOf('cart') != -1) {
			                        $('.cta-rule-cart-container').slideDown();
			                        if (ShippingRule.Threshold > ShippingRule.AdjustedCartTotal) {
			                            $('#spnCTARuleCart').text(preMsg);
			                            $('#cta-rule-togo').attr('style', 'width:' + eval(ShippingRule.AdjustedCartTotal / ShippingRule.Threshold) * 100 + '%');
			                        } else {
			                            $('#spnCTARuleCart').text(postMsg);
			                        }
			                    }
			                }

			                //display messages now
			                $('.product_detail_page .shipping-cta').each(function (index, item) {
			                    if ($.inArray(rule.CTAID.toString(), $(item).data("ctaid").toString().split(',')) > -1) {
			                    //if ($(item).data("ctaid") == rule.CTAID) {
			                        var msg = "";
			                        for (var i = 0; i < rule.Messages.length; i++) {
			                            if (rule.Messages[i].Location.indexOf('pdp') > -1)
			                                msg += rule.Messages[i].Message + "<br />";
			                        }
			                        $(item).html(msg);
			                    }
			                });
			                
			                $('.cd_product_cr .shipping-cta').each(function (index, item) {
			                    if ($.inArray(rule.CTAID.toString(), $(item).data("ctaid").toString().split(',')) > -1)
			                    {
			                        var msg = "";
			                        for (var i = 0; i < rule.Messages.length;i++)
			                        {
                                        if (rule.Messages[i].Location.indexOf('plp')>-1)
			                                msg+=rule.Messages[i].Message+"<br />";
			                        }
			                        $(item).html(msg);
			                    }
			                });
			                
			            }


			        };
				}

			}).fail(function (jqXHR, textStatus, errorThrown) {

				console.log("Ajax failed: (" + textStatus + ") - " + errorThrown);

			}).always(function () {

			});
		};

	};

	// Expose global singleton instance
	window.StoreFront = new constructor();
})(window);

function createCookie(name, value, days) {
	var expires;

	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; secure; path=/";
}

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name, "", -1);
}

$(document).ready(function () {
	$("textarea[maxlength]").bind('input propertychange', function () {
		var maxLength = $(this).attr('maxlength');
		if ($(this).val().length > maxLength) {
			$(this).val($(this).val().substring(0, maxLength));
		}
	})

	// set color for spans that overlay hero images
	$('.hero_cr span[data-color]').each(function (idx, el) {
		var $el = $(el);
		var color = $el.data('color');
		var $breadcrumb = $el.parents('.breadcrumb_br');

		if ($breadcrumb.length) {

			// color the entire breadcrum
			$breadcrumb.css('color', color);
			$breadcrumb.find('a').css('color', color);
		} else {
			$el.css('color', color);
		}
	});

	$('span[role="button"],a[role="button"]').each(function (i, button) {
		$(button).on('keydown', function (evt) {
			if (evt.keyCode == 13 || evt.keyCode == 32) {
				button.click();
			}
		});
	});

	$('.swatch-img').each(function (index, item) {
	    var $itemimg = $(item).closest('.cp-list').find('.product-img img');
	    var productimg = $(item).data('product-img');
	    var productlink = $(item).data('product-lnk');
	    var $itemlnk = $(item).closest('a');
	    $itemlnk.on('click mouseover', function () {
	        $itemimg.attr('src', productimg);
	        $itemimg.closest('a').attr('href', productlink);
	        return false;
	    });
	});

});

function SetCurrency(currencyCode) {
	$.ajax({
		type: "POST",
		url: "/webservices/ProductService.asmx/SetCurrency",
		data: "{currencyCode: '" + currencyCode + "'}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (msg) {
			window.location.reload();
		},
		error: function (error) {
			alert(
				"Failed to set currency." +
				error.status + ": " + error.statusText
			);
		}
	});
}

function SetCurrencyRate(currencyCodeRate) {
	$.ajax({
		type: "POST",
		url: "/webservices/ProductService.asmx/SetCurrencyRate",
		data: "{currencyCodeRate: '" + currencyCodeRate + "'}",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (msg) {
			window.location.reload();
		},
		error: function (error) {
			alert(
				"Failed to set currency rate." +
				error.status + ": " + error.statusText
			);
		}
	});
}
//end currency code


function RemoveItemFromCart(basketlineid, refreshpage) {
	$('.tooltip_remove_item').html('Removing...');
	$.ajax({
		type: "POST",
		url: "/webservices/ProductService.asmx/RemoveItemFromCart",
		data: "{basketLineID: " + basketlineid + " }",
		contentType: "application/json; charset=utf-8",
		dataType: "json"
	}).done(
		function (msg) {
			if (msg.d.Success) {
				var items = new Array();
				items.push({
					productCode: msg.d.ProductCode,
					sku: msg.d.Sku,
					quantity: msg.d.Qty,
					color: msg.d.Color,
					category: msg.d.Category,
					productName: msg.d.ProductName,
					price: msg.d.Price,
					cart: msg.d.Cart
				});
				StoreFront.broadcastRemovedFromCartEvent(items, function () {
					if (refreshpage)
						window.location.reload();
					else
						BindTopCart(true);
				});
				if (items[0].cart.length == 0) {
					StoreFront.broadcastCartEmptied();
				}
				else {
					StoreFront.broadcastRemovedFromCartRemainingCartEvent(items[0].cart);
				}
			}

		});
}

/**
* Re-assigns the ASP.NET validation JS function to
* provide a more flexible approach
*/
function UpgradeASPNETValidation() {
	if (typeof (Page_ClientValidate) != "undefined") {
		AspValidatorUpdateDisplay = ValidatorUpdateDisplay;
		ValidatorUpdateDisplay = NicerValidatorUpdateDisplay;

		$.each(Page_Validators, function (index, validator) {
			if (validator.evaluationfunction.name != null) {
				if (validator.evaluationfunction.name.indexOf('RequiredFieldValidator') == 0) {
					$('#' + validator.controltovalidate).attr('aria-required', "true");
				}
			}
		});

		$.each($('input'), function (index, item) {
			if ($(item).attr('placeholder') != "") {
				$(item).attr('aria-label', $(item).attr('placeholder'));
			}
		});
	}
}

/**
* This function is called once for each Field Validator, passing in the 
* Field Validator span, which has helpful properties 'isvalid' (bool) and
* 'controltovalidate' (string = id of the input field to validate).
*/
//<!--
var currentcontrol = "";
function NicerValidatorUpdateDisplay(val) {
	// Do the default asp.net display of validation errors (remove if you want)
	//AspValidatorUpdateDisplay(val);
	// Add our custom display of validation errors
	if (val.isvalid) {
		if ($('#' + val.id).is(':visible')) {
			// do whatever you want for invalid controls
			$('#' + val.controltovalidate).removeClass('error');
			$('#' + val.controltovalidate).removeAttr('aria-describedby');
			$('#' + val.controltovalidate).removeAttr('aria-invalid');
			$('#' + val.id).css('display', 'none');
		}
	} else {
		if (!$('#' + val.id).hasClass('error')) {
			// reset invalid controls so they display as valid
			$('#' + val.controltovalidate).addClass('error');
			$('#' + val.controltovalidate).attr('aria-describedby', val.id);
			$('#' + val.controltovalidate).attr('aria-invalid', "true");
			//once it is invalid, don't check it again
			currentcontrol = val.controltovalidate;
			$('#' + val.id).css('display', '').css('visibility', 'visible').css('color', 'red').css('padding-bottom', '10px');
		}
	}
}
//-->
// Call UpgradeASPNETValidation after the page has loaded so that it 
// runs after the standard ASP.NET scripts.
$(document).ready(UpgradeASPNETValidation);


function txtSearchTermsKeydown(event) {
	if (event.which == 13 || event.keyCode == 13) {
		//event.preventDefault();
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		PerformSearch($('#txtSearchTerms').val().trim());
	}
}

function txtMobileSearchTermsKeydown(event) {
	if (event.which == 13 || event.keyCode == 13) {
		//event.preventDefault();
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
		PerformSearch($('#txtMobileSearchTerms').val());
	}
}

function PerformSearch(searchTerm) {
	var newLocation = '/search?q=' + encodeURIComponent(searchTerm);

	if (searchTerm != "")
		window.location = newLocation;
	else {
		$('#txtSearchTerms').val('');
		$('#txtMobileSearchTerms').val('');
	}

}

function consentToCookiePolicy() {
	$('#divCookiePolicyBanner').hide();
	$.cookie("CookiePolicyConsent", "1", { path: "/" });
}

//visual search
$(document).ready(function () {
	var delay = (function () {
		var timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();


	$('#txtSearchTerms').keyup(function () {
		delay(function () {
			var $results = $('.search_dd_cr');
			$results.show();
			var cdnurl = $('#cdnUrl').html();
			var appname = $('#appName').html();
			var $productresults = $('.search_products_cr');
			var $categoryresults = $('.search_cat_cr');
			var $suggestresults = $('.search_suggestions_cr');
			var $totalresults = $('#search-result-total');

			var $producttemplate = $('#search-result-products').html();

			var searchterm = $('#txtSearchTerms').val();

			var data = JSON.stringify(
				{
					term: searchterm,
					numResults: 5
				});

			$.ajax({
				type: "POST",
				url: "/webservices/ProductService.asmx/Search",
				contentType: "application/json; charset=utf-8",
				data: data,
				dataType: "json"
			}).done(function (msg) {
				searchresults = msg.d.Data;
				$productresults.empty();
				$categoryresults.empty();
				$suggestresults.empty();
				$totalresults.empty();
				showcategory = false;
				if (searchterm != '' && searchresults.length > 1) {
					var $suggestitems = $("<ul>");
					$.each(searchresults, function (index, item) {
						if (item.Category == "Product") {
							$thisProducttemplate = $producttemplate.replace('{#productname}', item.Name.replace(new RegExp('(' + searchterm + ')', "gi"), "<b>$1</b>"))
								.replace('{#productimage}', '<img class="img-responsive p_img" src="' + cdnurl + '/images/resized/100/sitefiles/' + appname + '/products/' + item.ItemID + '/images/' + item.ZoomImage + '" />')
								.replace('{#brandname}', item.BrandName);
							$thisProducttemplate = '<a href="' + item.xCanonicalUrl + '">' + $thisProducttemplate + '</a>';
							$productresults.append($thisProducttemplate);
						}
						if (item.Category == "Suggest") {
							$suggestitems.append("<li><a href='/search?q=" + encodeURIComponent(item.Name) + "'>" + item.Name.toLowerCase().replace(new RegExp('(' + searchterm + ')', "gi"), "<b>$1</b>") + "</a></li>");
						}
						if (item.Category == "Category") {
							showcategory = true;
							$categoryresults.append("<p><a href='" + item.xCanonicalUrl + "'>" + item.Name.replace(new RegExp('(' + searchterm + ')', "gi"), "<b>$1</b>") + "</a></p>");
						}
						if (item.Category == "Total" && item.Name != "0") {
							$totalresults.append("<div><a href='/search?q=" + encodeURIComponent(searchterm) + "'>View all product results</a></div>");
						}
					});
					$suggestresults.append($suggestitems);
					if (showcategory == false)
						$('.search_cat_title').hide();
					else
						$('.search_cat_title').show();

				} else {
					$results.hide();
				}
			});
		}, 400);
	});


	$(document).mouseup(function (e) {
		var container = $('.search_dd_cr');

		// if the target of the click isn't the container nor a descendant of the container
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			container.hide();
		}
	});

});
//end visual search

