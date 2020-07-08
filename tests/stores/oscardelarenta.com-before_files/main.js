
$(document).ready(function () {
    /* detect ipad then remove href to make mega menu active on ipad */
    var is_iPad = navigator.userAgent.match(/iPad/i) != null;
    if (is_iPad || $(window).width() < 992) {
        $('.header .main_nav .mega-menu > ul > li').each(function (index, item) {
            var $item = $(item);
            var $mm = $item.find(".megamenu");

            if ($mm.length > 0) {
                $item.find('> a').removeAttr('href')
            }
        });
    }

    var cdnurl = $('#cdnUrl').html();

    $(".mobile_search_btn").click(function () {
        var $header_search = $(".header .header_search");
        var $m_search_btn = $(".mobile_search_btn");

        $header_search.css('top', '36px');
        $header_search.slideToggle(200, function () { });

        $header_search.on('click', function (searchMob) {
            searchMob.stopPropagation();
        });

        $(document).on("click", function (searchMob) {
            if ($m_search_btn !== searchMob.target && !$m_search_btn.has(searchMob.target).length) {
                $header_search.slideUp("fast");
            }
        });
    });

    if ($(window).width() < 992) {
        $('#new-mmenu ul:first').append($('<li></li>').append("<a href='/memberaccount'>My Account</a>"));
        $('#new-mmenu ul:first').append($('#cur_li'));
        $('#new-mmenu').mmenu({
            "navbar": {
                "title": "Shop"
            },
            "navbars": [
               {
                   "position": "top",
                   "content": $('.header_search')
               }
            ]
        });

        $('#new-mmenu').removeClass('hide');
    }

    //new currency container
    $("#cur_dd_btn, #cur_close").click(function () {
        currencyToggle();
    });
    $("body").click(function (e) {
        if ($(e.target).closest("#cur_li").length == 0) {
            if ($('#cur_dd_cr').hasClass('opened')) {
                currencyToggle();
            }
        }
    });

    function currencyToggle() {
        if ($('#cur_dd_cr').hasClass('opened')) {
            $('#cur_dd_cr').removeClass('opened');
        } else {
            $('#cur_dd_cr').addClass('opened');
            $('.cur-flag').each(function () {
                if ($("img", this).length==0)
                    $(this).prepend("<img src='" + $(this).data("src") + "' alt='" + $(this).data("alt") + "'></img>");
            });
        }
    }
    $('#cur_dd').change(function () {
        var newcurrency = $('#cur_dd').val();
        switch (newcurrency) {
            case "US:USD":
            case "CA:CAD":
                SetCurrency(newcurrency);
                break;
            default:
                SetCurrencyRate(newcurrency);
                break;
        }

    })
    //currency code
$(document).ajaxComplete(function () {
    var countrycode = readCookie("CountryCode");
    var currencyrate = readCookie('CurrencyCodeRate');
    if (currencyrate) {
        $('#cur_dd_btn .current_cur').html(currencyrate);
        $flagimg = $('#cur_dd_btn > img');
        //if (countrycode == "US" || countrycode == "AU" || countrycode == "CA" || countrycode == "CO" || countrycode == "MX" || countrycode=="UK")
        //    $flagimg.attr('src', '/images/flags/flag_' + countrycode + '.png');
        //else if (currencyrate == "EUR"){
        //	$flagimg.attr('src', '/images/flags/flag_' + countrycode + '.png');
        //}
        //else if (currencyrate == "GBP") {
        //    $flagimg.attr('src', '/images/flags/flag_' + countrycode + '.png');
        //}
        //else
    	//    $flagimg.attr('src', '/images/flags/flag_US.png');
        $flagimg.attr('src', StoreFront.getCdnUrl() + '/sitefiles/' + StoreFront.getAppName() + '/images/flags/' + countrycode + '.gif');
    }

    if (countrycode && currencyrate) {
        $('#cur_dd').val(countrycode + ':' + currencyrate);
    }
});
    $('.num_inc').focus(function () {
        if ($(this).val() == 0 || $(this).val() < 0) {
            $(this).val('1');
        }
    });

    $(".num_inc").focusout(function () {
        if ($(this).val() == 0 || $(this).val() < 0) {
            $(this).val('1');
        }
    });

    $(".inc_btn").on("click", function () {
        var $button = $(this);
        var oldValue = $button.parent().find("input").val();

        if ($button.text() == "+") {
            if (oldValue < 10) {
                var newVal = parseFloat(oldValue) + 1;
            } else {
                newVal = 10;
            }
        } else {
            if (oldValue > 1) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 1;
            }
        }
        $button.parent().find("input").val(newVal);

    });
    
});

var addedToCartImgSize = "106/106";

if ($('div.page_div').hasClass('category_detail_page')) {
    $(function () {
        $('.p-filter .items_num_of_num_holder_top .PagingStripContainer').appendTo('.pagination_holder_top');
        $('.p-filter .items_num_of_num_holder_bottom .PagingStripContainer').appendTo('.pagination_holder_bottom');
    });
}

// FLEXSLIDER - PRODUCT
$(window).load(function () {
    $('.productSlider').each(function () {
        var controlObj = "." + $(this).attr("id") + " a";
        if ($(this).find('.slides').children('li').length > 1) {
            $(this).flexslider({
                animation: "slide",
                manualControls: controlObj,
                controlnav: true,
                directionNav: false,
                slideshow: false
            });
        }
    });
    $('.img-thumbimage').removeClass('hide');
});



jQuery(document).ready(function ($) {
    $('.toggle a.toggle-trigger').click(function () {
        var el = $(this),
			parent = el.closest('.toggle');
        if (el.hasClass('active')) {
            parent.find('.toggle-content').hide();
            el.removeClass('active');
        } else {
            parent.find('.toggle-content').show();
            el.addClass('active');
        }
        return false;
    });

    $('.pi-2').each(function (index, item) {
        var $imgsrc = $(item).data("imgurl");
        $(item).closest('a').on("mouseover", function () {
            //var $hiddenimg = $('<img/>');
            //if ($(item).attr('src') != $imgsrc) {
            //    $hiddenimg.on('load', function () {
            //        $(item).css('opacity', '0');
                    $(item).attr('src', $imgsrc);
            //        $(item).animate({ opacity: '1' }, 600);
            //    });
            //    $hiddenimg[0].src = $imgsrc;
            //}
        });
       
    });

    if ($(window).width() > 992) {
        $(document).on('scroll', function () {
            //console.log($(window).scrollTop());
            if ($(window).scrollTop() > 136) {
                $('.navmenu').addClass('collapsed');
                $('.nav_replacement').addClass("navstuck");
            } else {
                $('.navmenu').removeClass('collapsed');
                $('.nav_replacement').removeClass("navstuck");
            }
            //console.log($(window).scrollTop());
        }).trigger('scroll');
    }

});

jQuery(document).ready(function ($) {
    $('.toggle2').each(function () {
        $(this).find('.toggle-content2').show();
    });
    //$('.color-filter').parent().css("display", "none");
    //$('.color-filter').parent().parent().find(".toggle-trigger2").addClass("active");
    $('.toggle2 a.toggle-trigger2').click(function () {
        var el = $(this),
			parent = el.closest('.toggle2');
        if (el.hasClass('active')) {
            parent.find('.toggle-content2').hide();
            el.removeClass('active');
        } else {
            parent.find('.toggle-content2').show();
            el.addClass('active');
        }
        return false;
    });
});

$(document).ready(function () {
    BindTopCart();
});
function BindTopCart(displaycart, raiseEvents) {

    var cdnurl = $('#cdnUrl').html();

    $("#cart-items").empty();
    $.ajax({
        type: "POST",
        url: "/webservices/ProductService.asmx/GetCartHeaderSummary",
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(
        function (msg) {
            StoreFront.applyCallToActionMessages(msg.d);
            window.cart = msg.d;
            $('#cartHeaderSummary').html(msg.d.summary);
            $('.shopCount').html(msg.d.count);
            $('.cb-total > span').html(msg.d.subtotal);
            if (msg.d.lines) {
                if (raiseEvents) {
                    StoreFront.broadcastAddedToCartEventFullCart(msg.d.lines, function () { });
                }
                $.each(msg.d.lines, function (index, item) {
                    if (index < 5) {
                        var cartline = $("#cart-template").clone().prop("id", "cartline-" + index);
                        $(cartline).find(".product-title > a").prop("href", item.xCanonicalUrl);
                        $(cartline).find(".product-title > a").html(item.ProductName);
                        //if (item.Color) {
                        //	$(cartline).find(".product-color").html("color: " + item.Color);
                        //}

                        $(cartline).find(".product-price").html(item.xExtPriceDisplay);
                        $(cartline).find(".product-variants").html(item.Variants);
                        $(cartline).find(".close").click(function () {
                            RemoveItemFromCart(item.BasketLineID);
                        });
                        $(cartline).find(".img-responsive").prop("src", cdnurl + "/images/resized/80/104/" + item.xThumbUrl);
                        $(cartline).find(".p-qty").html(item.Quantity);
                        $("#cart-items").append(cartline);
                    }
                });
            }

            if ($('.shopCount').text() == 0) {
                shopCountHide()
            } else {
                shopCountShow()
            }

            if (displaycart === true) {
                ShowCart();
            }

            ////listrak
            if (displaycart == true || document.location.href.toLowerCase().indexOf('viewcart') > 0) {
                if (msg.d.lines) {
                    SendCartToListrak(msg.d.lines);
                }
            }
        }
);
}


function ToggleCart() {

    if ($('.cart-bag').css('visibility') == "visible")
        $('.cart-bag').css('visibility', 'hidden').css('opacity', '0');
    else
        $('.cart-bag').css('visibility', 'visible').css('opacity', '100');
};

function ShowCart() {
    if ($('.cart-bag').css('visibility') != "visible")
        $('.cart-bag').css('visibility', 'visible').css('opacity', '100');

    setTimeout(function () {
        ToggleCart();
        $('.cart-bag').removeAttr("style");
    }, 3000);
}





$(document).ready(function () {
    var tabs = $('.sizes_container .sizes_menu li');
    var contents = $('.sizes_container .sizes_section');
    tabs.bind('click', function () {
        contents.hide();
        tabs.removeClass('current');
        $(contents[$(this).index()]).show();
        $(this).addClass('current');
    });
});


//mobile footer accordions
$(document).ready(function () {

    var cdnurl = $('#cdnUrl').html();


    //adds extra space to allow for a second row of color swatches
    $('.pi-slider').each(function () {
        if ($(this).children().length > 10) {
            $(this).css('margin-top', '-48px')
        } else {
            $(this).css('margin-top', '-36px')
        }
    });

    $(window).load(function () {
        $('.category_detail_page #inner_loading_shade').addClass('removed', function () {
            setTimeout(function () {
                $('.category_detail_page #inner_loading_shade').remove();
            }, 400);
        });
    });

});



//product share
(function ($) {
    $.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {
        e.preventDefault();

        intWidth = intWidth || '500';
        intHeight = intHeight || '400';
        strResize = (blnResize ? 'yes' : 'no');

        var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
			strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
			objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
    }

    $(document).ready(function ($) {
        $('.customer.share').on("click", function (e) {
            $(this).customerPopup(e);
        });
    });

}(jQuery));


function shopCountShow() {
    $('.shopCount').css('display', 'inline-block');
    $('.header .sticky_header_container .tw-right.sticky_header  li.cart-li').addClass('shopCountShown');
    setTimeout(function () {
        $(".shopCount").prepend("(");
        $(".shopCount").append(")");
    }, 100);
}

function shopCountHide() {
    $('.shopCount').css('display', 'none');
    $('.header .sticky_header_container .tw-right.sticky_header  li.cart-li').removeClass('shopCountShown');
}


$('.shopCount').clone().appendTo('#mobileShopCount');


$(document).ready(function () {
    $(".cb_holder input[type=checkbox]").click(function () {
        var $this = $(this);

        if ($this.is(':checked')) {
            $this.closest('.returnableItem').addClass('returningItem');
            $this.closest('.returnableItem').find('.divReceiptLine').css('display', 'block');
        } else {
            $this.closest('.returnableItem').removeClass('returningItem');
            $this.closest('.returnableItem').find('.divReceiptLine').css('display', 'none');
        }
    });

    $('#ChangePasswordWindow').keypress(function (e) {
        if (e.which == 13) {
            e.preventDefault();
            MemberAccount.savePassword();
        }
    });
});


/* home page only */
