var applePayDesktop =  function(){
	this.initialize= function() {
	  var pageLabel = $("#pageLabel").val();

		ApplePay.prototype.initialize.apply(this);
		this.device = "desktop";
    if(pageLabel === 'PDP' ) {
      if ($('body').hasClass('oc-overlay-open')) {
        this.page = "FL";
        this.flow = "browse";
      } else {
        this.page = "PDP";
        this.flow = "browse";
      }
		} else if(pageLabel === 'PCP' ) {
			this.page = "PCP";
			this.flow = "browse";
		} else if($("#pageTemplate").val() === 'returnPayment' ) {
			this.page = "payment";
			this.flow = "returns";
		} else if($("#pgTemplate").val() === 'PaymentPage' ) {
			this.page = "payment";
			this.flow = "checkout";
		} else if ($('#productPageName').val() === 'fluidPcp') {
		  this.page = "FL";
		  this.flow = "browse";
		}
		try {
			if(applePayAddrDebug !== undefined && applePayAddrDebug === 'true') {
				this.addrDebug = true;
			}
		} catch(e) {
			//console.log(e);
		}
	};
  this.preprocess= function() {
    this.triggerApplePay();
    this.subscriptions();
  };
  this.showNextPage= function(errorview,response, errormessage, data) {
    var self = this;
    if(response === 0){
      document.location.href = errorview+"?" + self.getCommonParameters() + "&applePayErrorMessage=" + errormessage;
    } else if(self.page === 'PDP' || self.page === 'PCP' || self.page === 'FL'){
      document.location.href = "/webapp/wcs/stores/servlet/OrderOKView?" + self.getCommonParameters()+"&applePayType="+self.page;
    }
    else {
      document.location.href = "OrderOKView?" + self.getCommonParameters()+"&applePayType="+self.page;
    }
  };
	this.getSuccessView= function() {
		return "OrderOKView";
	};

	this.updateOrderSummary= function(city,state,zipCode) {
		var self = this;
		var countryCode = $("#countryCode").val() || $("#country").val();
		var $checkoutnow = $('#checkoutnow');

		if(self.page !== 'payment'){
			SetCookie("TaxChange", "yes");
	        SetCookie("ClearDeliveryFormData", "yes");
		}
		$.ajax({
			url: "CalculateView",
			type: "GET",
			async: false,
			data: self.getCommonParameters(),
			success: function (data){
				$('#orderSummary').html(data);
				$("#subTotal").html($("#subTotalCalc").html());
          calculate_tax_fn();
          checkout_giftcard_validation();
          giftcard_bindevents_fn();
          dropscrollerFn();
          select_dropbox_value();
          expand_dropbox();
          collapse_dropbox();
          key_nav_dropdown();
          tax_submit_fn();
          apply_promo_link_click();
          apply_promo_idme_link_click();
          idme_links();
          promo_textbox_focusBlur();
          apply_promotion();
          remove_promotion();
          dropscroller_hover_fn();
          if (countryCode === "US") {
            var link='&city='+city;
            var x = $checkoutnow.attr('href');
            var y = x.search('&city');

            if (y !== -1) {
              var newLink = x.slice(0,y).concat(link);

              $checkoutnow.attr('href', newLink);
            } else {
              $checkoutnow.attr('href',x + link);
            }
          }
			}
		});
	};

	this.getErrorView= function() {
		return (this.page === 'payment') ? "PaymentDetailsView" : "ShopCartDisplayView";
	};

	this.getError= function() {
		return ".delivery-information-note-red #err";
	};

	this.updateBagQtyOnCancel= function() {
    $('button[data-type=bag] .wcs-product-count-circle').addClass('wcs-hide');
    $('.fc-apple-pay').removeClass('applepay-loading');
		sessionStorage.clear();
	};

	this.updateBagQtyOnAddToCart= function(e) {
		$('button[data-type=bag] .wcs-product-count-circle')
      .css('padding-top', '3px')
      .html(1)
      .removeClass('wcs-hide');
		sessionStorage.clear();
	};

	this.showApplePayButtons= function() {
	  var $checkoutWithApplepay = $(".wcs-checkout-with-applepay");

    $('body').addClass('apple-device');
    $(".fc-apple-pay").addClass('display-apple-pay');
		$(".apple-pay-button").attr("style","display:block");
		if(this.page === 'payment') {
      $checkoutWithApplepay.attr("style","display:block");
      $checkoutWithApplepay.parent().parent().parent().parent().attr("style","display:block");
		}
    this.wcs_applepay_overlay();
	};

	this.hideApplePayButtons= function() {
    $(".fc-apple-pay").removeClass('display-apple-pay');
		$(".apple-pay-button").attr("style","display:none");
		if(this.page === 'payment' ) {
      $(".wcs-checkout-with-applepay").parent().parent().parent().parent().attr("style","display:none");
		}
	};

	this.isGiftCardCart= function() {
		return $("#containsGiftcard").val() === "true";
	};

	this.wcs_applepay_overlay= function() {
		var self = this;
		$(".wcs-checkout-with-applepay").on("click", function () {
			  $("#wcs-applepay-checkout .wcs-paypal-error").css("display", "none");
			  $("#wcs-applepay-checkout #agreeConcent_popup").removeAttr("checked");
			  $("#wcs-applepay-checkout .wcs-label-check.wcs-terms-and-conditions").removeClass("wcs-c-on");
		});

		$("#wcs-applepay-checkout .wcs-checkbox").on("click", function(){
			$(".wcs-paypal-error").css("display", "none");
    });

    var applePayButton = '';

    if (self.page === 'FL') {
      applePayButton = '.fc-apple-pay';
    } else {
      applePayButton = '.apple-pay-button-proceed';
    }

    $(applePayButton).off("click").on("click", function (e) {
      e.preventDefault();
      window.recipeLoading = true;
			var checked = true;

			if(checked){
				if(self.page !== 'payment') {
					$("#wcs-applepay-checkout .wcs-close-btn").click();
        }
        $('.fc-apple-pay').addClass('applepay-loading');
				self.applePayButtonClicked(e);
			}
	    });
	};
	this.subscriptions= function(){
		var self = this;

		if($("#orderSummary") && $("#orderSummary").length > 0) {
			$("#orderSummary").ajaxComplete(function(){
				if (!$(".apple-pay-button ").is(':visible') || !$(".fc-apple-pay").is(':visible')) {
					self.triggerApplePay();
				}
			});
		}
		if($(".gift_apply") && $(".gift_apply").length > 0) {
			$(".gift_apply").ajaxComplete(function(){
				$("#amountToPayApplePay").val($("#piAmount").val());
				self.triggerApplePay();
			});
		}
	};
	this.add_product_to_cart= function(e){
		var self = this;

		var getParentAttr = $(".d-pdp-prod-addtocart").parent().find('input[type="hidden"]');
		$.when({
			ajax: window.wcs_add_product(getParentAttr,false, true),
			context: e
		})
		.then(function(data){
            console.log('Add product AJAX call completed');
            return data.context;
        })
		.then(function(e){
			console.log('trigger Apple Session');
			self.updateBagQtyOnAddToCart();
			self.refreshWishList();
			self.performApplePayActions();
		});
	};
	this.refreshWishList = function(){
		var self = this;

		 $("#wcs-star-container").load("WishListView?storeId=" + $("#storeId").val() + "&catalogId=" + $("#catalogId").val() + "&langId=" + $("#langId").val(), function() {
        sidebarHideFavEmptyDiv();
        window.add_product_notification(star);
        window.shortlist_tray_length();
        if (!self.page === 'FL') {
          custom_scrollable_hover();
          scroller();
          resize_panel_header_footer();
          sharePlus_emailToFriend_bind();
          openLinksInNewTab();
        }
    });
	};
	this.add_product_to_cart_remix= function(e){
		var self = this;
		$.when({
			ajax: Remix.Main.AddToCart(true),
			context: e
		})
		.then(function(data){
            console.log('Add product AJAX call completed');
            return data.context;
        })
		.then(function(e){
			console.log('trigger Apple Session');
			self.updateBagQtyOnAddToCart();
			self.refreshWishList();
			self.performApplePayActions();
		});
  };

  this.add_product_to_cart_fluid = function (err, recipe) {
    utagtrackPaymentPxPGateway('ApplePayExpressChekout');
    var self = this;
    var params = recipe.custom.bom;
    var ocIdVal = $('#ocIdVal').val();
    var ocCountryVal = $('#ocCountryVal').val();
    var catalogId = $('#catalogId').val();
    var langId = $('#langId').val();
    var storeId = $('#storeId').val();
    var hostname = window.location.hostname;
    var url = "https://" + hostname + "/wcs/resources/store/remix/add-to-cart";
    $.ajax({
      url: "https://" + hostname + "/webapp/wcs/stores/servlet/CreateGuestUser?storeId=" + storeId,
      type: "POST",
      async: false,
      dataType: "json",
      success: function (dati, status, xhr) {
        var userId = dati.userId;
        window.recipeLoading = false;
        console.log('OC - CreateGuestUser call success: ' + xhr.status);
        $.ajax({
          url: url,
          headers: {
            'Ocp-Apim-Subscription-Key': '',
            'OC-Id': ocIdVal,
            'OC-Country': ocCountryVal,
          },
          type: "POST",
          data: JSON.stringify(params),
          dataType: "json",
          contentType: "application/json",
          async: false,
          success: function (data, status, xhr) {
            window.recipeLoading = false;
            console.log('OC call success: ' + xhr.status);
            self.updateBagQtyOnAddToCart();
            self.refreshWishList();
            self.performApplePayActions();
          },
          error: function (xhr, status, error) {
            window.recipeLoading = false;
            console.log('OC call failed: ' + xhr + ', stauts: ' + status + ', error: ' + error);
            $('.fc-apple-pay').removeClass('applepay-loading');
          },
        });
      },
      error: function (xhr, status, error) {
        window.recipeLoading = false;
        window.console.log('/add-to-cart Error');
        console.log('OC - CreateGuestUser call failed: ' + xhr.status + ', stauts: ' + status + ', error: ' + error);
        $('.fc-apple-pay').removeClass('applepay-loading');
      },
    });
  };

	this.applePayButtonClicked = function (e) {
	  if (this.page === 'PDP') {
      this.add_product_to_cart(e);
	  } else if (this.page === 'PCP') {
      this.add_product_to_cart_remix(e);
	  } else if (this.page === 'FL') {
      this.add_product_to_cart_fluid(null, window.recipe);
	  } else {
      this.performApplePayActions();
	  }
	};

	this.isAmountToPayPresent= function(){
		return $("#amountToPayApplePay").val() > 0;
	};
};

$(function(){
	window.applePayObj = new ApplePay();
	applePayDesktop.prototype = window.applePayObj;
	applePayDesktop.prototype.constructor = applePayDesktop;
	window.applePayDesktopInst = new applePayDesktop();
	applePayDesktopInst.initialize();
	applePayDesktopInst.preprocess();
});
