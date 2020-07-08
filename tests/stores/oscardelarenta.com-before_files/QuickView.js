/// <reference path="http://code.jquery.com/jquery-1.9.1.min.js"/>
/// <reference path="/js/SwatchContainer.js"/>
/// <reference path="/js/ColorContainer.js"/>

(function (window) {
    var constructor = function () {
        var __context = {
            cdnUrl: "",
            visibleThumbs: 4, // Number of alt image thumbs visible in the slider
            thumbsSlideBy: 99 // Number of pixels the slider advances with each slide (left or right)
        };
        var __product = null;
        var __swatches = null;
        var __category = null;
        var __selectedVariant = null;

        this.switchSwatch = function (productID) {
            var oldProduct = null;
            if (__product.ProductID != productID) {
                oldProduct = __product;
            }
            $('.qvSwatches img').removeClass('selectedSize');
            for (var i = 0; i < __swatches.length; i++) {
                if (productID == __swatches[i].ProductID) {
                    __product = __swatches[i];
                    $('.qvSwatches img[data-productid="' + productID + '"]').addClass('selectedSize');
                    break;
                }
            }

            $('#divColorSwatch a').removeClass('active');
            $('#divColorSwatch a[data-productid='+productID+']').addClass('active');

            $('.quickview-modal #selectedColorLabel').html(__product.ColorName);
            $('#hdnQVVariantIDs').val('');
            // Only update the price if is different from the prior product
            if (oldProduct != null) {
                var doPriceRefresh =
                    oldProduct.LowestMSRP != __product.LowestMSRP
                    || oldProduct.LowestListPrice != __product.LowestListPrice
                    || oldProduct.LowestSalePrice != __product.LowestSalePrice
                    || oldProduct.HighestSalePrice != __product.HighestSalePrice
                    || oldProduct.MemberPrice != __product.MemberPrice
					|| oldProduct.IsPreOrder != __product.IsPreOrder
                if (doPriceRefresh) {
                    __refreshPrice(__product);
                }
            }

            if (__product.NotReturnable)
                $('.final_sale_text').show();
            else
                $('.final_sale_text').hide();


            $('#imgQuickView').attr('src', __context.cdnUrl + "/images/resized/800" + __product.DetailImage)

            // Alt Images
            $('#qvAltImgs').html("").css("left", 0);
            for (var i = 0; i < __product.AlternateImages.length; i++) {
                var $altimg = $('<img/>');
                $altimg.attr('src', __context.cdnUrl + "/images/resized/83" + __product.AlternateImages[i].ZoomImage);
                $altimg.data('detail-img', __context.cdnUrl + "/images/resized/800" + __product.AlternateImages[i].ZoomImage);
                $altimg.attr('alt', __product.AlternateImages[i].AltText);
                var $link = $('<a></a>').attr('href', 'javascript:QuickView.ShowAltImg("'+$altimg.data('detail-img')+'")').append($altimg);
    
                $('#qvAltImgs').append($link);
            }

            // black border around first image
            $('#qvAltImgs img').css('border', '1px solid #e0e0e0');
            $('#qvAltImgs img').first().css('border', 'solid 1px #000');

            var thumbCount = __product.AlternateImages.length;

            // Video
            if (__product.Video != null) {
                thumbCount++;
                var thumbUrl = __context.cdnUrl + '/images/resized/83' + __product.Video.FilePath.replace(/\.mp4/i, '.jpg');
                var videoDiv = $('<div class="video_thumb_container" style="width: 85px; display: inline-block"></div>');
                var videoWrapper = $('<a><img src="/sitefiles/images/product_play_btn.png" class="thumb_play_btn anim_all" /><img src="' + thumbUrl + '" title="View Product Video" class="play_prod_vid"></img></a>')
                videoWrapper.data("video-url", __context.cdnUrl + __product.Video.FilePath);
                videoWrapper.data("mime-type", __product.Video.MimeType);
                videoWrapper.on('click', function () {
                    __showVideo($(this).data('video-url'), $(this).data('mime-type'));
                });
                videoWrapper.attr('class', 'active video-thumb');
                videoDiv.append(videoWrapper);
                $('#qvAltImgs').append(videoDiv);
            }

            if (thumbCount > 4) {
                $('#qvAltImgsContainer .slider-left').removeClass('disabled');
                $('#qvAltImgsContainer .slider-right').removeClass('disabled').addClass('enabled');
            }
            else {
                $('#qvAltImgsContainer .slider-left').addClass('disabled');
                $('#qvAltImgsContainer .slider-right').removeClass('enabled').addClass('disabled');
            }

            if (__product.IsPreOrder) {
                $('#divQuickViewBadges .br_badge.preorder').show();
                $('#btnAddToCart').html($('#btnAddToCart').html().replace('Add To Cart', 'Preorder').replace('Add To Bag','Preorder'));
            } else {
                $('#btnAddToCart').html($('#btnAddToCart').data("orightml"));
            }

            $('.quickview-modal .brand_name').html("By " + __product.BrandName);

            $('.quickview-modal .product_rating_cr i').removeClass('fa-star').removeClass('fa-star-half-o').addClass('fa-star-o');
            if (__product.xAvgRating >= 0.5 && __product.xAvgRating < 1.0) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star-half-o');
            }
            else if (__product.xAvgRating >= 1.0 && __product.xAvgRating < 1.5) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
            }
            else if (__product.xAvgRating >= 1.5 && __product.xAvgRating < 2.0) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star-half-o');
            }
            else if (__product.xAvgRating >= 2.0 && __product.xAvgRating < 2.5) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star');
            }
            else if (__product.xAvgRating >= 2.5 && __product.xAvgRating < 3.0) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(2)').removeClass('fa-star-o').addClass('fa-star-half-o');
            }
            else if (__product.xAvgRating >= 3.0 && __product.xAvgRating < 3.5) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(2)').removeClass('fa-star-o').addClass('fa-star');
            }
            else if (__product.xAvgRating >= 3.5 && __product.xAvgRating < 4.0) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(2)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(3)').removeClass('fa-star-o').addClass('fa-star-half-o');
            }
            else if (__product.xAvgRating >= 4.0 && __product.xAvgRating < 4.5) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(2)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(3)').removeClass('fa-star-o').addClass('fa-star');
            }
            else if (__product.xAvgRating >= 4.5 && __product.xAvgRating < 5) {
                $('.quickview-modal .product_rating_cr i:eq(0)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(1)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(2)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(3)').removeClass('fa-star-o').addClass('fa-star');
                $('.quickview-modal .product_rating_cr i:eq(4)').removeClass('fa-star-o').addClass('fa-star-half-o');
            }
            else if (__product.xAvgRating >= 5) {
                $('.quickview-modal .product_rating_cr i').removeClass('fa-star-o').addClass('fa-star');
            }
            $('.quickview-modal .product_rating_cr a').attr('href', __product.xCanonicalUrl + "#writeReview");
            if (__product.xProductReviews.length > 0) {
                $('.quickview-modal .product_rating_cr span').html(__product.xAvgRating.toFixed(1));
                $('.quickview-modal .product_rating_cr a').html(__product.xProductReviews.length + (__product.xProductReviews.length == 1 ? " review" : " reviews"));
            }
            else {
                $('.quickview-modal .product_rating_cr span').html("");
                $('.quickview-modal .product_rating_cr a').html("Be the first to write a review");
            }

            $("#lblQuickViewProdTitle").text(__product.ProductName);
            $("#spnQuickViewProdCode").html(__product.ProductCode);
            $(".quickview-modal .stockMessage").html(__product.AvailabilityDisplay);
            $("#qvProductID").html(__product.ProductCode);
            $("#spnProductDesc").html(__product.ProductDescriptionShort);
            $("#spnProductDescLong").html(__product.ProductDescription);
            $('.quickview-modal .badge_cr').html(__product.BadgeHtml);
            __updateVariants();
            $("#lblPrice").html("from $" + __product.LowestListPrice);
            $(".qv-details-btn, .qv-details-btn2, #qvImgLink").attr("href", __product.xCanonicalUrl);
            if (__product.IsWishlist == true) {
                $(".wish-btn").html("- Remove from Wishlist");
                $(".wish-btn").addClass("in-wishlist").removeClass("not-in-wishlist");
                $(".wish-btn").attr("title", $("#aQuickViewWishList").html());
            } else {
                $(".wish-btn").html("+ Add to Wishlist");
                $(".wish-btn").addClass("not-in-wishlist").removeClass("in-wishlist");
                $(".wish-btn").attr("title", $("#aQuickViewWishList").html());
            }

            $('.quickview-modal .add_to_wishlist_btn').data('productid', __product.ProductID);
            StoreFront.bind();
        };

        var __refreshPrice = function (priceInfo) {

            // MSRP
            if (eval(priceInfo.LowestMSRPDecimal) > 0 && eval(priceInfo.LowestMSRPDecimal) > eval(priceInfo.LowestListPriceDecimal)) {
                $('.quickViewPrice .msrpPriceDiv').hide();
                $('#qvMsrp').html(priceInfo.MsrpDisplay);
            }
            else {
                $('.quickViewPrice .msrpPriceDiv').hide();
            }

            // From
            if (eval(priceInfo.LowestSalePriceDecimal) != eval(priceInfo.HighestSalePriceDecimal)) {
                $('.quickViewPrice .priceFrom').show();
            }
            else {
                $('.quickViewPrice .priceFrom').hide();
            }

            if (eval(priceInfo.LowestSalePriceDecimal) < eval(priceInfo.LowestListPriceDecimal)) {
                // Price
                $('#qvPrice').attr('class', 'strikePrice');
                $('#qvPrice').html(priceInfo.LowestListPrice);
                $('.quickViewPrice .salePriceDiv').show();

                // Sale Price
                $('#qvSalePrice').html(priceInfo.LowestSalePrice);
                $('.quickViewPrice .salePriceDiv .youSave span').html(priceInfo.PctSavings);
            }
            else {
                // Price
                $('#qvPrice').attr('class', 'salePrice');
                $('#qvPrice').html(priceInfo.LowestSalePrice);

                // Sale Price
                $('#qvSalePrice').html("");
                $('.quickViewPrice .salePriceDiv').hide();
            }

            // Member Price
            if (priceInfo.MemberPrice != null) {
                $('.quickViewPrice .price_member').show();
                $('#qvMemberPrice').html(priceInfo.MemberPrice);
            }
            else {
                $('.quickViewPrice .price_member').hide();
            }

        	// CTA Price
            $('.cta-message-container.qv-price').data("listprice", priceInfo.LowestListPriceDecimal);
            $('.cta-message-container.qv-price').data("saleprice", priceInfo.LowestSalePriceDecimal);

            __broadcastPriceChange(priceInfo);
        };

        function __updateVariants() {
            if (__product != null) {
            	var outOfStock = false;

                // Clear existing variants
                var container = $('.quickview-modal .qvVariantContainer');
                container.html('');

                var outOfStock = __product.Variants.length>0;

                // Loop through each variant and create the ui controls				
                for (var i = 0; i < __product.Variants.length; i++) {
                    var variant = __product.Variants[i];

                    // Create the label (SELECT <Variant>:)
                    container.append($('<h6></h6>').addClass('variantLabel').html(variant.VariantType + ": "));

                    // Create the values in a UL
                    var variantHTMLString = $('<ul></ul>').attr('id', 'ddlVariant' + i);
                    for (var j = 0; j < variant.Choices.length; j++) {
                        option = $('<li></li>');
                        var choice = variant.Choices[j];

                        if (choice.AllowBackorders || (choice.QtyOnHand > 0 && choice.QtyOnHand >= choice.MinQty)) {
                            optionlink = $('<a ></a>').html(choice.VariantName).attr('href', 'javascript:VariantSelectionChanged(' + choice.VariantID + ',"' + variant.VariantType + '",' + '"' + __product.ProductID + '");');
                            optionlink.attr('data-variantid', choice.VariantID);
                            
                        }
                        else {
                        	optionlink = $('<a class="oos_item"></a>').html(choice.VariantName);
                        	outOfStock = true;
                        }
                        option.append(optionlink);
                        variantHTMLString.append(option);
                    }

                    var valueContainer = $('<div></div>').addClass('variantValue').attr('variantType', variant.VariantType);
                    valueContainer.append(variantHTMLString);
                    container.append(valueContainer);
                }

                //if (outOfStock) {
                //    $("#txtQuantity").hide();
                //    $("#btnAddToCart").hide();
                //    $(".stockMessage").html("Out of Stock");
                //}
                //else {
                //    $("#txtQuantity").show();
                //    $("#btnAddToCart").show();
                //    $(".stockMessage").html("In Stock");
                //}

                //attachVariantOnChange();
            }
        }

        this.updateDetailsForSelectedSku = function (productId, selectedVariants) {
            var data = JSON.stringify({
                productId: productId,
                variantIds: selectedVariants
            });

            $.ajax({
                type: "POST",
                url: "/webservices/ProductService.asmx/GetProductSkuDetails",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var priceInfo = msg.d;
                    __refreshPrice(priceInfo);
                },
                error: function (error) {
                    alert(
                        "Failed to retrieve product details for productId = " + productId + "\r\n\r\n - " +
                        error.status + ": " + error.statusText
                    );
                }
            });
        };

        var __updateVariantDetails = function (productID, variantIDs) {
            var data = JSON.stringify({
                productId: productID,
                variantIds: variantIDs
            });

            $.ajax({
                type: "POST",
                url: "/webservices/ProductService.asmx/GetQuickViewSkuDetails",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    __refreshPrice(msg.d.Data);
                },
                error: function (error) {
                    alert(
                        "Failed to retrieve product details for productId = " + productId + "\r\n\r\n - " +
                        error.status + ": " + error.statusText
                    );
                }
            });
        };

        this.ShowAltImg = function (imgUrl) {
            $('#qvVideo .video_container video').detach();
            $('#qvVideo').hide();
            $('#qvImgLink').show();
            //$('#imgQuickView').attr('src', imgUrl);


        	var image = new Image();

        	image.onload = function () {
        		$('#imgQuickView').stop(true,true).fadeTo(250, 0, function () {
        			$('#imgQuickView').attr("src", imgUrl);
        		}).fadeTo(250, 1);

        	}
        	image.src = imgUrl;

        }

        var __showVideo = function (vidUrl, mimeType) {
            $('#qvImgLink').hide();
            $('#qvVideo').show();
            $('#qvVideo .video_container').html("<video loop controls>Your browser does not support HTML5 video.</video>");
            $('#qvVideo video').append($('<source src="' + vidUrl + '" type="' + mimeType + '" />'));
            $('#qvVideo video').get(0).play();
        }

        var __attachToProductImages = function () {
            if (window.innerWidth>1024) {
                var template = $('#qvOverlayTemplate').detach();
                $('.product-img').each(function (index, item) {
                    var productID = $(item).data('productid');
                    var imgurl = $(item).data('imgurl');
                    var category = $(item).data('category');
                    var isredirect = $(item).data('isredirect');

                    if (productID && isredirect != "true") {
                        var overlay = template.clone();
                        overlay.attr("id", null);
                        overlay.data("productid", productID);
                        overlay.data("category", category);
                        overlay.data("imgurl", imgurl);
                        overlay.on('click', __overlayClicked);
                        $(item).append(overlay);
                    }
                });
            }
        };

        var __overlayClicked = function () {
            var productID = $(this).data("productid");
            var imgurl = $(this).data("imgurl");
            var category = $(this).data("category");
            var altText = $(this).parent().find("img").attr("alt");
            QuickView.show(productID, category, imgurl, altText);
        };

        this.bind = function (context) {
            __context = $.extend({}, __context, context);
            __attachToProductImages();
        };

        this.show = function (productID, category, imgUrl, altText, callback) {
            callback = callback || function (swatches, product) {
                //console.log('QuickView loaded ' + swatches.length + ' swatches for productID ' + product.ProductID);
            };
            __product = null;
            __swatches = null;
            __category = category;
            __selectedVariant = null;

            $('.quickview-modal').modal();
            $('#qvImgLink').show();
            $('#qvVideo').hide();
            $('#imgQuickView').attr('src', imgUrl);
            $('#imgQuickView').attr('alt', altText);
            $("#lblQuickViewProdTitle").text(altText)
            $("#divSwatchContainer").empty();
			$("#divColorSwatch").empty();
			$('#txtQuantity').val("1");
			if ($('#ddlqty'))
                $('#ddlqty').val("1");
            $('.quickview-modal .qvVariantContainer').empty();
            __variantIDs = new Array();


            $.ajax({
                type: "POST",
                url: "/webservices/ProductService.asmx/GetQuickViewProductDetails",
                data: JSON.stringify({ productId: productID }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d.Success) {
                        __swatches = msg.d.Data;
                        // Identify the matching product from the swatch list
                        var i = 0;
                        while (i < __swatches.length) {
                            if (__swatches[i].ProductID == productID) {
                                __product = __swatches[i];
                                i = __swatches.length;
                            }
                            i++;
                        }
                        __refreshPrice(__product);
 
                        if (__swatches.length > 0) {
                            $('.modal_select_color').show();

                            $('#divColorSwatch').append('<h6 class="variantLabel">Color: <span id="selectedColorLabel"></span></h6>');

                            if (typeof quickViewSwatchImgSize == 'undefined')
                                quickViewSwatchImgSize = "35/35";

                            for (var s = 0; s < __swatches.length; s++) {
                                if (__swatches[s].QtyOnHand > 0) {
                                    var div = $('<div></div>').attr("class","color_swatches_repeater");
                                    var anchor = $('<a></a>').attr("data-productid", __swatches[s].ProductID);
                                    var image = $("<img></img>").attr("src", __context.cdnUrl + '/images/resized/' + quickViewSwatchImgSize + __swatches[s].xColorSwatchUrl);
                                    anchor.attr("href", "javascript:QuickView.switchSwatch(" + __swatches[s].ProductID + ");");
                                    image.attr("alt", __swatches[s].ColorName);
                                    image.attr("title", __swatches[s].ColorName);
                                    image.attr("data-productid", __swatches[s].ProductID);
                                    image.addClass("ec_SwatchImage");
                                    $("#divColorSwatch").append(div.append(anchor.append(image)));
                                }
                            }
                        } else {
                            $('.modal_select_color').hide();
                        }

                        QuickView.switchSwatch(__product.ProductID);

						callback(__swatches, __product);

						__broadcastShow(__product);
                    }
                    else {
                        alert(msg.d.ErrorMessage);
                    }
                },
                error: function (error) {
                    alert(
                        "Failed to retrieve product details for productId = " + productID + "\r\n\r\n - " +
                        error.status + ": " + error.statusText
                    );
                }
            });

        };

        this.toggleWishlist = function () {
            var isWishlist = !__product.IsWishlist;
            var data = JSON.stringify({
                productId: __product.ProductID,
                isWishlist: isWishlist,
                sku: "",
                variants: ""
            });
            var msg = $.ajax({
                type: "POST",
                url: "/webservices/ProductService.asmx/ToggleWishlist",
                data: data,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    if (msg.d.IsSuccess) {
                        var isNowInWishlist = msg.d.IsWishlist;
						__product.IsWishlist = isNowInWishlist;
						
						if (isNowInWishlist) {
						    $(".wish-btn").html("- Remove from Wishlist");
						    $(".wish-btn").addClass("in-wishlist").removeClass("not-in-wishlist");
						    $(".wish-btn").attr("title", $("#aQuickViewWishList").html());
						} else {
						    $(".wish-btn").html("+ Add to Wishlist");
						    $(".wish-btn").addClass("not-in-wishlist").removeClass("in-wishlist");
						    $(".wish-btn").attr("title", $("#aQuickViewWishList").html());
						}

                        $('.addedToWishlist-modal').modal();
                        $('.quickview-modal').modal('hide');
						
						var items = new Array();
						items.push({
							productName: msg.d.ProductName,
							productCode: msg.d.ProductCode,
							styleNumber: msg.d.xStyleNumber,
							sku: msg.d.Sku,
							quantity: msg.d.Qty,
							category: msg.d.Category,
							price: msg.d.Price,
							color: msg.d.Color,
							basketcount: msg.d.BasketCount
						});
						if (isWishlist) {
							StoreFront.broadcastAddedToWishListEvent(items);
						} else {
							StoreFront.broadcastRemovedFromWishListEvent(items);
						}

                    } else if (!msg.d.IsLoggedIn) {
                        alert(msg.d.Message);
                    } else {
                        alert("Failed to " + (isWishlist ? "add to" : "remove from") + " wish list.\r\n\r\n" + msg.d.Message);
					}


                },
                error: function (error) {
                    alert(
                        "Failed to productId = " + productID + " to wishlist\r\n\r\n - " +
                        error.status + ": " + error.statusText
                    );
                }
			});

        };

        this.addToCart = function () {
            var qty = $('#txtQuantity').val();
            var hasVariants = __product.Variants.length > 0;
            var variants = $('#hdnQVVariantIDs').val() == null ? null : $('#hdnQVVariantIDs').val().split(',');
            var allowAdditionOfProductsWithoutVariant = false;
            var category = $('#hdnCategory').val();

            if (hasVariants && (variants.length != __product.Variants.length || (variants.length == 1 && variants[0] == ''))) {
            //if (variants == null || variants == "") {
                alert('Please select a size first.');
                return;
            }

            if (!allowAdditionOfProductsWithoutVariant && hasVariants && (variants == null || (variants.length == 1 && variants[0] == ''))) {
                $('.qvVariantContainer .variantValue select').each(function (idx, el) {
                    var $select = $(el);
                    var color = $select.val() === '' ? 'red' : 'black';
                    $select.css('color', color);
                    $select.css('border-color', color);
                    $select.children('option').css('color', 'black');

                    if ($select.val() === '') {
                        $select.children('option[value=""]').text('Please select ' + $select.closest('.variantValue').attr('varianttype').toLowerCase());
                    } else {
                        $select.children('option[value=""]').text($select.closest('.variantValue').attr('varianttype'));
                    }
                });
            }
            else {
                //If this is a giftcard, we need some extra stuff
                var giftcardName = "";
                var giftcardEmail = "";
                var giftcardMessage = "";

                //Make sure variants is populated with an array, so that the signature of the AddToCart web method is matched. Set the first item in the array to 0 if empty.
                if (variants == undefined || variants == null || (variants.length==1 && variants[0]=="")) {
                    variants = [];
                }
                //if (variants.length <= 1 && (typeof (variants[0]) === "undefined" || typeof (variants[0]) === null || variants[0] == '')) {
                //    variants[0] = 0;
                //}

                var data = JSON.stringify({
                    productId: __product.ProductID,
                    variantIds: variants, //If variants is null or empty at this point the AddToCart web method will not be called - the signature will not match
                    quantity: qty,
                    giftcardName: giftcardName,
                    giftcardEmail: giftcardEmail,
                    giftcardMessage: giftcardMessage,
                    category: category
                });

                $('#btnAddToCart').prop('disabled', true);
                $('#btnAddToCart').html("<i class='fa fa-spin fa-spinner'></i>");
                $('#btnAddToCart').attr('href', 'javascript:void()');

                $.ajax({
                    type: "POST",
                    url: "/webservices/ProductService.asmx/AddToCart",
                    data: data,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json"
                }).done(function (msg) {
                    if (msg.d.Success) {
                        var items = new Array();
                        items.push({
							productName: msg.d.ProductName,
							productCode: msg.d.ProductCode,
                            styleNumber: msg.d.xStyleNumber,
                            sku: msg.d.Sku,
                            quantity: msg.d.Qty,
                            category: msg.d.Category,
                            price: msg.d.Price,
                            color: msg.d.Color,
                            basketcount: msg.d.BasketCount
                        });
						StoreFront.broadcastAddedToCartEvent(items);

                        //Clear the selected variantID since the modal is closing. Otherwise opening a new modal will hold onto the previous variant selection. (Wouldn't make user select a size before adding to the cart, would add the previous size by default, but wouldn't be selected.)
                        __selectedVariant = null;
                        $('.quickview-modal').modal('hide');
                        $('#hdnQVVariantIDs').val('');

                        if (window.innerWidth > 630) {
                            $('.prodLink').attr('href', msg.d.ProductUrl);
                            $('.prodLink.inner').text(msg.d.ProductName);
                            $('#cartSummary').html(msg.d.CartSummary);
                            //update image
                            $('#addedToCartProductImage').attr('src', __context.cdnUrl + '/images/resized/' + addedToCartImgSize + msg.d.ProductImageUrl);
                            $('#addedToCartQty').html('Qty. ' + msg.d.Qty + ' @ ' + msg.d.FormattedPrice);

                            $('.addedToCart-modal').modal();
                        }

                        // main.js call
                        BindTopCart(true,true);
                        if (window.location.toString().toUpperCase().indexOf("VIEWCART") != -1) {
                            window.location = "/viewcart";
                        }
                    } else {
                        alert(msg.d.ErrorMessage);
                    }

                }).always(function () {
                    $('#btnAddToCart').prop('disabled', false);
                    $('#btnAddToCart').html($('#btnAddToCart').data("orightml"));
                    $('#btnAddToCart').attr('href','javascript:QuickView.addToCart()');
                });
            }
		}


		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Customer Event Handlers (i.e. for 3rd Party integrations)
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var __onShowHandlers = new Array();
        var __onPriceChangeHandlers = new Array();

		this.onShow = function (handler) {
			if (typeof (handler) === "function") {
				__onShowHandlers.push(handler);
			}
			else {
				alert("Parameter handler for method QuickView.onShow is not a valid function");
			}
		};
        var __broadcastShow = function (prod) {
			for (var i = 0; i < __onShowHandlers.length; i++) {
				__onShowHandlers[i](prod);
			}
        };

        this.onPriceChange = function (handler) {
        	if (typeof (handler) === "function") {
        		__onPriceChangeHandlers.push(handler);
        	}
        	else {
        		alert("Parameter handler for method QuickView.onPriceChange is not a valid function");
        	}
        }
        var __broadcastPriceChange = function (priceInfo) {
        	for (var i = 0; i < __onPriceChangeHandlers.length; i++) {
        		__onPriceChangeHandlers[i](priceInfo);
        	}
        }

    };

    window.QuickView = new constructor();
})(window);

$(function () {
    $('.quickview-modal').on("hidden.bs.modal", function () {
        $('#qvVideo .video_container video').detach();
    });

    // put black border around clicked alt image
    $('#qvAltImgs').on('click', function (event) {
        
        var $target = $(event.target);

        

        if ($target.hasClass('thumb_play_btn') || $target.hasClass('play_prod_vid')) {
            $('#qvAltImgs img').css('border', '1px solid #e0e0e0');
        } else {
            $('#qvAltImgs img').css('border', '1px solid #e0e0e0');
            $target.css('border', 'solid 1px #000');
        }
    });

    if ($('#ddlqty'))
        $('#ddlqty').on('change', function () {
            $('#txtQuantity').val($('#ddlqty').val());
        });
    
    $('#btnAddToCart').data("orightml", $('#btnAddToCart').html());

});

// change the dropdown colors based on selected option
function attachVariantOnChange() {
    $('.qvVariantContainer .variantValue select').each(function (idx, el) {
        $(el).change(function (e) {
            var $sel = $(e.currentTarget);
            $sel.css('color', 'black');
            $sel.css('border-color', 'black');
        });
    });
}


var VariantSelectionChanged = function (selectedVariantID, variantType, prodId) {
    $('#hdnQVVariantIDs').val(selectedVariantID);
    var variants = $('#hdnQVVariantIDs').val().split(',');

    //update the classes for selected size
    $(".quickview-modal [varianttype=" + variantType + "] ul li a").each(function () {
        $(this).removeClass("selectedSize");
        if ($(this).data('variantid') == selectedVariantID) {
            $(this).addClass("selectedSize");
        }
    });

    QuickView.updateDetailsForSelectedSku(prodId, variants);
};