// <reference path="/assets/plugins/jquery-1.10.2.min.js"/>

(function (window) {
	var constructor = function () {
		this.cancelInStorePickup = function (sender, basketLineID) {
			$.ajax({
				type: "POST",
				url: "/api/Cart/CancelInStorePickup?basketLineID=" + basketLineID,
				success: function (msg) {
					if (msg.Success) {
						$(sender).closest(".in-store-pickup").detach();
					} 
					else {
						alert(msg.ErrorMessage);
					}
				},
				error: function (error) {
					alert(
                        "Failed to cancel in-store pickup.\r\n\r\n" +
                        " - " + error.status + ": " + error.statusText
                    );
				}
			});
		};

		this.validateDiscountCode = function (sender, args) {
			$.ajax({
				async: false,
				type: "POST",
				url: "/ViewCart.aspx/ValidateDiscountCode",
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				data: JSON.stringify({ discountCode: $('#txtDiscountCode').val() }),
				success: function (msg) {
					if (msg.d.Success) {
						args.IsValid = true;
					}
					else {
						args.IsValid = false;
						$(sender).html(msg.d.ErrorMessage);
					}
				},
				error: function (error) {
					args.IsValid = false;
					$(sender).html(error.status + ": " + error.statusText);
				}
			});
		}

		this.showDiscount = function () {

		    //lblDiscountCode.Text = "Discount Applied: " + discount.Description + " (<a href='/viewcart?rd=1'>remove</a>)";
		    //if (!String.IsNullOrEmpty(discount.FreeShippingServiceName))

		        $.ajax({

		            async: true,
		            type: "POST",
		            url: "/viewcart.aspx/GetDiscount",
		            contentType: "application/json; charset=utf-8",
		            dataType: "json"

		            // Success
		        }).done(function (msg, textStatus, jqXHR) {
		            if (msg.d.Data != null) {
		                $('#lblDiscountCode').html("Applied: " + msg.d.Data.Description + " (<a href='/viewcart?rd=1'>remove</a>)");
		            }

		        }).fail(function (jqXHR, textStatus, errorThrown) {

		            console.log("Ajax failed: (" + textStatus + ")");

		        });

		}
	}

	window.ViewCart = new constructor();
})(window);

function proceedToCheckout() {
	if (StoreFront.isLoggedIn()) {
		document.location = "/CheckoutShipping";
	}
	else {
		document.location = "/CheckoutLogin";
	}
}

function validateGiftCard(cardno, pin, callback) {
    callback = callback || new function () { };

    var params = {
        cardnumber: cardno,
        pin: pin
    };

    $.ajax({
        async: true,
        url: "/webservices/validationservice.asmx/ValidateGiftCard",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(params),
        success: function (data) {
            callback(data.d);
        },
        error: function (msg) {
            alert(msg.responseText)
        }
    });
}

function applyGiftCard(cardno, pin, amount, callback) {
    callback = callback || new function () { };

    var params = {
        cardnumber: cardno,
        pin: pin,
        amount: amount
    };

    $.ajax({
        async: true,
        url: "/webservices/validationservice.asmx/ApplyGiftCard",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(params),
        success: function (data) {
            callback(data.d);
        },
        error: function (msg) {
            alert(msg.responseText)
        }
    });}


$(function () {

	if ($('.cart-table').length > 0) {
		$('input.update_cart_btn').css('display', 'block')
	}


	if ($('.paypal_btn').length > 0 || $('#AmazonPayButton').length > 0) {
		$('.cart-totals .or_cr').show();
	}

	function togglePromo() {
		$('.enter_promo_code_cr').stop(true, true)
		if ($('.enter_promo_code_cr').hasClass('opened')) {
			$('.enter_promo_code_cr').removeClass('opened').slideUp();
			$('.enter_promo_title_cr .fa-minus').css('display', 'none');
			$('.enter_promo_title_cr .fa-plus').css('display', 'block');
			$('.enter_promo_tgle_btn').attr('aria-expanded', 'false');
		} else {
			$('.enter_promo_code_cr').addClass('opened').slideDown();
			$('.enter_promo_title_cr .fa-minus').css('display', 'block');
			$('.enter_promo_title_cr .fa-plus').css('display', 'none');
			$('.enter_promo_tgle_btn').attr('aria-expanded', 'true');
			$('.coupon-input').focus();
		}
	}

	function toggleGift() {
		$('.enter_gift_card_cr').stop(true, true)
		if ($('.enter_gift_card_cr').hasClass('opened')) {
			$('.enter_gift_card_cr').removeClass('opened').slideUp();
			$('.enter_gift_title_cr .fa-minus').css('display', 'none');
			$('.enter_gift_title_cr .fa-plus').css('display', 'block');
		} else {
			$('.enter_gift_card_cr').addClass('opened').slideDown();
			$('.enter_gift_title_cr .fa-minus').css('display', 'block');
			$('.enter_gift_title_cr .fa-plus').css('display', 'none');
			$('.coupon-input.gift-input').focus();
		}
	}

	$(".enter_promo_title_cr a.enter_promo_tgle_btn").click(function () {
		togglePromo();
	});

	$(".enter_gift_title_cr a.enter_gift_tgle_btn").click(function () {
		toggleGift();
	});

    $("input#applyGiftCard").click(function () {

        $('#lblGiftCardError').text("");

        var cardno = $("#txtCardNbr").val();
        var pin = $("#txtCardPin").val();

        if (cardno == "") {
            $("#txtCardNbr").addClass('error');
            $('#lblGiftCardError').text("Card Number is required");
            return;
        } else {
            $("#txtCardNbr").removeClass('error');
        }

        if (pin == "") {
            $("#txtCardPin").addClass('error');
            $('#lblGiftCardError').text("Pin is required");
            return;
        } else {
            $("#txtCardPin").removeClass('error');
        }

        if (cardno != "" && pin != "") {
            $(this).prop("disabled", true);
            validateGiftCard(cardno, pin, function (gc) {
                if (!(gc.Balance > 0)) {
                    $("#lblGiftCardError").text(gc.ErrorMessage);
                    $("input#applyGiftCard").removeAttr("disabled");
                } else {
                    $("#lblGiftCardError").text("");
                    // apply this gift card by creating a basketpayment for the value of this giftcard
                    applyGiftCard(cardno, pin, gc.Balance, function (x) {
                        window.location.reload();
                    });
                }
            });
        } 
    });

    ViewCart.showDiscount();
});
