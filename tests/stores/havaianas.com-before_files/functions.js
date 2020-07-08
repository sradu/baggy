/**
 * Big changes see below , search for 'KEEPING IT DRY'
 * In short, all global functionality will be accessed via this one global variable: Main_Functions 
 */


	
/**
 * ON DOCUMENT READY: NONE OF THIS IS AVAILABLE OUTSIDE OF THIS SCOPE
 */
$(function() {
		
	//stores height for dynamically adjusting page size relative to design summary size
	var initBodyHeight;
	
	// Remove Pin
	$('body').on('click', '.pins-holder .remove', function() {
		var $holder = $(this).closest('.pin-holder');
		$holder.removeClass('occupied').find('img').remove();
		updatePinDataJson();
	});
	
	// qty field
	$('body').on('click', '.quantity .quantity-plus, .quantity .quantity-minus', function(event) {
		var $quantifier = $(this);
		if($quantifier.parent().siblings().find("input[type=text]").length > 0) {
			var $field = $quantifier.parent().siblings().find("input[type=text]");
		} else {
			var $field = $quantifier.parent().siblings('input');
		}
		
		if ($field.val() == '') $field.val(0);
		var val = parseInt($field.val(), 10);
		if ($quantifier.hasClass('quantity-plus')) {
			$field.val(val + 1);
		} else {
			if ($field.val() > 1) {
				$field.val(val - 1);
			}
		}
	});
	
	initBodyHeight = $('.main-body').height();
	
	$('body').on('click', '.slider-thumbs ul a', function() {
		var index = parseInt($(this).attr('data-index'));
		$(".product-slider ul").trigger('slideTo', [index]);
		return false;
	});
	
	// Colors
	$('.list-strap-colors .radio-alpha input').each(function() {
		$(this).on('change', function() {
			$('.summary .summary-body .image > .strap').attr('src', 'css/images/strap-' + $(this).data('color') + '.png')
			$('.section-mobile .product-image-center .strap').attr('src', 'css/images/strap-' + $(this).data('color') + '.png')
		});
	});
	
	$('.list-base-colors .radio-alpha input').each(function() {
		$(this).on('change', function() {
			$('.summary .summary-body .image > .base').attr('src', 'css/images/base-' + $(this).data('color') + '.png')
			$('.section-mobile .product-image-center .base').attr('src', 'css/images/base-' + $(this).data('color') + '.png')
		});
	});
	
	// Fullscreen image
	$('.fullscreen-img').each(function() {
		$(this).parent().addClass('fullscreen-bg').css('background-image', 'url(' + $(this).attr("src") + ')');
	});
	
	// Nav Gamma Dropdown
	$('.nav-gamma > ul > li > span').on('click', function(event) {
		var $this = $(this);
		var $parent = $(this).parent();
		if ($parent.find('.nav-dropdown').length) {
			$parent.toggleClass('current');
			$parent.siblings().removeClass('current');
			event.preventDefault();
		}
	});
	
	$(document).on('click', function(event){
	    if( $(event.target).closest('.nav-gamma.expanded').length === 0 && $(event.target).closest('.trigger-nav').length === 0) {
	    		$('.nav-gamma').removeClass('expanded');
	    }
	});
	
	// Nav Beta Dropdown
	$('.nav-beta > ul > li > a').on('click', function(event) {
		var $this = $(this);
		var $parent = $(this).parent();
		if ($parent.find('.nav-dropdown').length) {
			$parent.toggleClass('current').find('.nav-dropdown').toggleClass('expanded');
			$parent.siblings().removeClass('current').find('.nav-dropdown').removeClass('expanded');
			
			event.preventDefault();
		}
	});
	
	// Footer Nav Dropdown
	$('.footer-nav > ul > li > a').on('click', function(event) {
		var $this = $(this);
		var $parent = $(this).parent();
		if ($parent.find('.nav-dropdown').length) {
			$parent.toggleClass('current').find('.nav-dropdown').toggleClass('expanded');
			$parent.siblings().removeClass('current').find('.nav-dropdown').removeClass('expanded');
			
			event.preventDefault();
		}
	});

	
	$('.quantity-secondary .quantity-plus, .quantity-secondary .quantity-minus').on('click', function(event) {
		var $quantifier = $(this);
		var $field = $quantifier.siblings('input');
		if ($field.val() == '') {
			$field.val(0);
		}
		var val = parseInt($field.val(), 10);
		if ($quantifier.hasClass('quantity-plus')) {
			$field.val(val + 1);
		} else {
			if ($field.val() > 0) {
				$field.val(val - 1);
			}
		}
	});
	
	$('.quantity-primary .quantity-plus, .quantity-primary .quantity-minus').on('click', function(event) {
		var $quantifier = $(this);
		var $field = $quantifier.parent().siblings('input');
		if ($field.val() == '') {
			$field.val(0);
		}
		var val = parseInt($field.val(), 10);
		if ($quantifier.hasClass('quantity-plus')) {
			$field.val(val + 1);
		} else {
			if ($field.val() > 0) {
				$field.val(val - 1);
			}
		}
	});
	
	// Faq
	$('.faq-title').on('click', function() {
		$(this).parent().toggleClass('expanded').find('.faq-content').stop().slideToggle(200);
	});
	
	// Accordion
	$('.accordion-title').on('click', function() {
		$(this).parent().toggleClass('expanded').find('.accordion-content').stop().slideToggle(200);
	});
	
	// Btn Top
	$('.btn-top').on('click', function(event) {
		$('html, body').animate({
			scrollTop: 0
		}, 700);
		event.preventDefault();
	});
	
	// Text Expand
	$('.text-expand').on('click', function(event) {
		$(this).closest('.text-collapsed').toggleClass('text-expanded').find('.text-more').stop(true, true).slideToggle(200);
		event.preventDefault();
	});
	
	// Triggers
	$('.trigger-cart').on('click', function(event) {
		$('.nav-gamma, .search').removeClass('expanded');
		$('.nav-beta').removeClass('expanded-logged');
		$(this).siblings().removeClass('active');
		$(this).toggleClass('active');
		$('.nav-beta').toggleClass('expanded')
		showCart();
		event.preventDefault();
	});
	
	$('.trigger-search').on('click', function(event) {
		$('.nav-gamma, .nav-beta').removeClass('expanded expanded-logged');
		$(this).siblings().removeClass('active');
		$(this).toggleClass('active');
		$('.search').toggleClass('expanded')
		event.preventDefault();
	});
	
	$('.trigger-nav').on('click', function(event) {
		$('.nav-beta, .search').removeClass('expanded expanded-logged');
		$(this).siblings().removeClass('active');
		$(this).toggleClass('active');
		$('.nav-gamma').toggleClass('expanded')
		event.preventDefault();
	});
	
	$('.header-logged-in .trigger-user').on('click', function(event) {
		$('.nav-gamma, .search').removeClass('expanded expanded-logged');
		$(this).siblings().removeClass('active');
		$(this).toggleClass('active');
		$('.nav-beta').toggleClass('expanded expanded-logged')
		event.preventDefault();
	});
	
	$(".popup-tight-open").fancybox({
		maxWidth: 630,
		maxHeight: '100%',
		fitToView: false,
		width: '100%',
		height: 'auto',
		autoSize: false,
		closeClick: false,
		helpers: {
			overlay: {
				locked: false
			}
		},
		beforeClose: function() {
			Main_Functions.removeZoom();
		},
		afterShow: function() {
			Main_Functions.initProductSlider($('.popup .product-slider .slides'));
			Main_Functions.initSliderThumbs();
			Main_Functions.initSelect();
			Main_Functions.initSelectPrimary();
			
			$('.text-expand').on('click', function(event) {
				$(this).closest('.text-collapsed').toggleClass('text-expanded').find('.text-more').stop(true, true).slideToggle(200);
				event.preventDefault();
			});
			
			Main_Functions.triggerMessageInput();
		}
	});
	
	var documentTitle = $(document).attr("title");
	// Popup
	$(".popup-open").fancybox({
		maxWidth: 1170,
		maxHeight: '100%',
		fitToView: false,
		width: '100%',
		height: 'auto',
		autoSize: false,
		closeClick: false,
		helpers: {
			overlay: {
				locked: false
			}
		},
		beforeClose: function() {
			$(document).attr("title", documentTitle);
			Main_Functions.removeZoom();
		},
		afterShow: function() {
			Main_Functions.initProductSlider($('.popup .product-slider .slides'));
			Main_Functions.initSliderThumbs();
			Main_Functions.initSelect();
			Main_Functions.initSelectPrimary();
			var productTitle = $(this.element).parent().find('.product-title').text();
			$(document).attr("title", productTitle);
			$('.text-expand').on('click', function(event) {
				$(this).closest('.text-collapsed').toggleClass('text-expanded').find('.text-more').stop(true, true).slideToggle(200);
				event.preventDefault();
			});
			
			Main_Functions.triggerMessageInput();
			
			if ($('.popup-pin').length) {
				$('.popup-pin .scroll-pane').mCustomScrollbar({
					scrollInertia: 250
				});
				
				$('.pin').on('click', function() {
					var $currentPin = $('.pin-holder.current');
					Main_Functions.selectPin($(this), $currentPin, true);
					
					$('.pins-mobile .pin-holder').removeClass('current');
					
					$.fancybox.close();
				});
			}
		}
	});
	
	// edialog
	$(".enrollBox").fancybox({
		maxWidth: '100%',
		maxHeight: '100%',
		fitToView: false,
		width: '100%',
		height: 'auto',
		autoSize: true,
		closeClick: false,
		helpers: {
			overlay: {
				locked: false
			}
		},
		content: $('.fbenroll')
	});
	// edialog
	
	$('.pins-mobile .pin-holder').on('click', function() {
		$(this).addClass('current');
	});
	
	// Selectbox
	if ($('.select').length) {
		Main_Functions.initSelect();
	}
	
	if ($('.select-primary').length) {
		Main_Functions.initSelectPrimary();
	}
	
	// Custom Scroll
	if ($('.scroll-pane').length) {
		$('.scroll-pane').mCustomScrollbar({
			scrollInertia: 250
		});
	}
	
	// Summary Dropdown
	$('.summary-button > .btn').on('click', function(event) {
		
		// Adjusts the height of the body to keep the summary on the page and not over the footer
		var summaryHeight = $('.summary-dropdown').height();		
		var expanded = $('.summary-dropdown').css('display') == 'block';
		if(summaryHeight > initBodyHeight) {
			if(!expanded) $('.footer').css('margin-top', $('.summary-dropdown').height());
			$('.footer').css('margin-top', getFooterMarginTop());
		} else if (isAnMyohPage()) {
			$('.footer').css('margin-top', getFooterMarginTop());
		}
		
		$(this).toggleClass('expanded').closest('.summary-button').find('.summary-dropdown').stop().slideToggle(200);	
		event.preventDefault();		
	});
	
	// datepicker
    $('.field-calendar').datepicker({
    	minDate: 0
    });
	
	/** ON WINDOW LOAD */
	$(window).load(function() {
		Main_Functions.initSliderProductSlider();
		Main_Functions.initRegularSlider();
		Main_Functions.initAlphaSlider();
		Main_Functions.triggerMessageInput();
		Main_Functions.reInitThumbSlider();
		
		// when the big images are loaded, let's initiate carosel on PDP
		$('.big-image').imagesLoaded(function(instance) {
			setTimeout(function() { // even after its loaded, lets wait 1/2 sec to init
				Main_Functions.initProductSlider($('.product-slider .slides'));
				Main_Functions.initSliderThumbs();
			}, 500);
		});
		
		if(Main_Functions.isMobile()) { $('.product-images').hide(); }
	}); // end on win load
	
	$('.hav3-checkout-login input#guestCheckoutEmail\\.email').on('keydown', function(event){
		if (event.keyCode === 13 && $(this).val !== '') {
			$('.hav3-checkout-guest').click();
		}
	}) ;
	
	$('.hav3-checkout-billing #use-shipping').change(function(event){
		if ($(this).is(':checked')) {
			$('.vb-billing-address-form').hide();
		} else {
			$('.vb-billing-address-form').show();
		}
	});
	
}); // end on doc ready


/** 
 * KEEPING IT DRY
 * Below is repeated (some code was repeated 3-4 times)
 * functionality that I took out of the monolithic on ready function  
 * to be available to use outside of this scope. If you see functionality above that you need
 * outside of this scope, take it out from above and make it a function like below.
 * Use that function in place of the code you removed in the $(doc).ready() 
 */
;var Main_Functions = (function($, window, document) {
	var $win = $(window);
	var $doc = $(document);
	var this_obj = {};
	
	this_obj.initSliderProductSlider = function() {
		$(".slider-products .slides").carouFredSel({
			auto: false,
			responsive: true,
			height: 'variable',
			items: {
				height: 'variable',
				visible: {
					min: 2,
					max: 5
				}
			},
			prev: {
				button: ".slider-products-actions .slider-prev",
				key: "left"
			},
			next: {
				button: ".slider-products-actions .slider-next",
				key: "right"
			}
		});
	};
	
	this_obj.initRegularSlider = function() {
		// Sliders - First remove all the ones outside time range
		var time = Date.now();
		$.each($('.slider .slides .slide'), function(i,v){
			var startTime = $(v).attr('start-time');
			var endTime = $(v).attr('end-time');
			if( startTime == '' &&  endTime ==''){
				console.log("Do nothing");
			}else if( startTime == ''){
				if(time > endTime)
					$(v).remove();
			}else if( endTime == ''){
				if(startTime > time){
					$(v).remove();
				}
			}else{
				if(time < startTime || time > endTime){
					$(v).remove();
				}
			}
			$(v).show();
		});
		
		$(".slider .slides").carouFredSel({
			auto: 4000,
			responsive: true,
			height: 'variable',
			items: {
				visible: 1,
				height: 'variable'
			},
			pagination: {
				container: '.slider-paging'
			}
		});
	};
	
	this_obj.initAlphaSlider = function() {
		$(".slider-products-alpha .slides").carouFredSel({
			auto: false,
			responsive: true,
			height: 'variable',
			items: {
				height: 'variable',
				visible: {
					min: 2,
					max: 4
				}
			},
			prev: {
				button: ".slider-products-alpha-actions .slider-prev",
				key: "left"
			},
			next: {
				button: ".slider-products-alpha-actions .slider-next",
				key: "right"
			}
		});
	};
	
	this_obj.initZoom = function($image) {
		var eZoom = $image.data('elevateZoom');
		
		if (eZoom && 'zoomContainer' in eZoom) {
			eZoom.zoomContainer.empty().remove();
		}
		
		$image.elevateZoom({
			zoomType: "inner",
			cursor: "crosshair"
		});
	};
	
	this_obj.initProductSlider = function($sliderHolder) {
		$sliderHolder.carouFredSel({
			auto: false,
			responsive: true,
			height: 'variable',
			items: {
				visible: 1,
				height: 'variable'
			},
			scroll: {
				onAfter: function(data) {
					// Removes all zoomContainer elements from the DOM to prevent
					// an element that is supposed to be hidden from being passed
					// to initZoom();
					$('.zoomContainer').remove();
					
					// Image Zoom
					if(!this_obj.isMobile()) {
						this_obj.initZoom($(data.items.visible).find("img"));
					}
					Main_Functions.removeZoom('.product-slider .slides img:hidden');					
				}
			}
		});
		if(!this_obj.isMobile()) {
			this_obj.initZoom($('.product-slider .slides .slide').find("img").first());
		}
	};
	
	this_obj.initSliderThumbs = function() {
		$('.slider-thumbs .slides').carouFredSel({
			auto: false,
			responsive: true,
			height: 'variable',
			infinite: true,
			onCreate: function() {
				$('.big-image .slides').imagesLoaded(function() {
					Main_Functions.initProductSlider($('.big-image .slides'));
				});
			},
			items: {
				visible: 3,
				height: 'variable'
			},
			prev: {
				button: ".slider-actions .slider-prev",
				key: "left"
			},
			next: {
				button: ".slider-actions .slider-next",
				key: "right"
			}
		});
		
		
		$(".slider-thumbs ul li a").each(function(idx, el) {
			$(this).attr('data-index', idx);
		});
	};
	
	this_obj.removeZoom = function(selctor) {
		if (!selector)
			var selector = '.product-slider .slides img';
		
		$('.popup').find(selector).each(function() {
			var eZoom = $(this).data('elevateZoom');
			
			if (eZoom && 'zoomContainer' in eZoom) {
				eZoom.zoomContainer.empty().remove();
				$(this).removeData('elevateZoom');
			}
		});
		
		$('.zoomContainer').remove();
	};
	
	this_obj.triggerMessageInput = function() {
		$('.product-mini-cart-alpha .trigger-message input').unbind('change');
		$('.product-mini-cart-alpha .trigger-message input').on('change', function() {
			$(this).closest('.product').find('.message').toggleClass('expanded');
		});
	};
	
	
	
	
	this_obj.initSelectPrimary = function() {
		$('.select-primary').select2({
			theme: 'primary',
			minimumResultsForSearch: Infinity,
			// copy over any classes on the original option element
			templateResult: function(data) {
				if (!data.id) {
					return data.text;
				}

				var attr_class = $(data.element).attr('class');
				
				if (typeof attr_class !== 'undefined') {
					var $opt = $('<span class="' + $(data.element).attr('class') + '">' + data.text + '</span>');
					return $opt;
				}

				return data.text;
			}
		});
	};
	
	this_obj.initSelect = function() {
		$('.select').select2({
			minimumResultsForSearch: Infinity
		});
	};
	

	// Check for mobile device
	this_obj.isMobile = function() {
		return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	}
	
	// Moves the 'Email is taken.' error message to a better location.
	this_obj.setEmailErrorMsgView = function() {
		if($('#ca-password-error p').text() === 'Email is taken.') {
			$('#ca-password-error').hide();
			$('#email-taken-error-msg').show();
			$('#ca-password-wrapper input').addClass('input-no-error');
			$('#ca-password-wrapper .form-row .form-label').addClass('label-no-error');
			$('#ca-email-wrapper input').addClass('input-error');
			$('#ca-email-wrapper .form-label').addClass('label-error');
		} else {
			$('#ca-password-error').show();
			$('#email-taken-error-msg').hide();
		}
	}
	
	this_obj.setPopupEmailErrorMsgView = function() {
		if($('#ca-password-error-popup p').text() === 'The email address is not valid or is already on our mailing list.') {
			$('#ca-password-error-popup').hide();
			$('#email-taken-popup-error-msg').show();
			$('#ca-password-popup-wrapper .form-row .form-controls input').addClass('input-no-error');
			$('#ca-password-popup-wrapper .form-row .form-label').addClass('label-no-error');
			$('#ca-email-popup-wrapper input').addClass('input-error');
			$('#ca-email-popup-wrapper .form-label').addClass('label-error');
		} else {
			$('#ca-password-error-popup').show();
			$('#email-taken-popup-error-msg').hide();
		}
	}
	
	this_obj.reInitThumbSlider = function() {
		//for product thumbs slider
		$('.product').each(function() {
			$(this).hover(function() {
				if(!this_obj.isMobile()) { 
					var slider = $(this).find('.product-images > ul');
					var sliderPrev = slider.parent('.product-images').find('.product-images-actions .slider-prev');
					var sliderNext = slider.parent('.product-images').find('.product-images-actions .slider-next');
		
					slider.carouFredSel({
						auto: false,
						responsive: true,
						width: '100%',
						align: 'center',
						items: {
							visible: 3
						},
						prev: {
							button: sliderPrev
						},
						next: {
							button: sliderNext
						}
					});
				}
			});
		});
		
	}
	
	/**
	 * one global variable / namespace instead of a million little functions
	 * Easily accessible via the webdev tools console
	 * without having to remember the names of functions, and where they are
	 */
	return this_obj;
	
})(jQuery, window, document);

(function($, window, document, undefined) {
	var $win = $(window);
	var $doc = $(document);
	var trigger = 0;
	$doc.ready(function() {
		$('.nav-beta .search-btn').on('click', function(event){
			if(trigger == 0) {
				event.preventDefault();
				$(this).addClass('active').siblings('.search-field').addClass('active').focus();
				trigger = 1;
			} else {
				//this is a bit of a hacky check for chrome,firefox and safari but it checks if the search button was clicked
				//or if it was clicked on by a press of the enter key. If enter key then search. If not then hide search. 
				if((event.clientX != 0 && event.clientY != 0) && (event.offsetX != 0 && event.offsetY != 0)) {		
					event.preventDefault();
					$(this).removeClass('active').siblings('.search-field').removeClass('active').focus();
					trigger = 0;
				}			
			}
		});
		$('.expand-trigger').on('click', function (e) {
            e.preventDefault();
            $(this).siblings('.expand-target').toggleClass('expand-open');
        })
	});
})(jQuery, window, document);
