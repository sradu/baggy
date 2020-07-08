$(function(){
	/** // ANY element added to DOM (at any time) 
	 * with this class .atc-btn will have this event handling (even on ajax) */
	$('body').on('click', '.atc-btn', atc);   
	
	loadCookieCartItems();
});
function countCart(){
    ajaxWithoutAuth(js_site_var['context_path'] + '/app/cart/view.json', null, 'GET', function(data) {
    	var itemCount = data.cart.itemCount;
    	for(item in data.cart.cartItems) {
    		if(data.cart.cartItems[item].ecommerceItemType == "FOOTWEAR") {
    			itemCount--;
    		}
    	}
        $('.header-bar .shopping-bag-count').html(itemCount);
    });
}

function showCart(autohide) {
    window.scrollTo(0, 0);
    
    // if cart summary isn't open, then open it   
    countCart();
    ajaxWithoutAuth(js_site_var['context_path'] + '/app/cart/view', null, 'GET', function(data) {
     	var $target = $('.cart-mini');	       
        $target.html(data);
        countCart();
        $target.addClass('expanded');
        
       	//initialize the remove item buttons
		$('.remove-cart-product').click(function(e){
			var items = new Array();
			var removeItemId = $(this).attr('item-id'); // skuId
			var removeCartItemIds = $(this).attr('cart-item-ids'); // grouped unique cartItemIds
		
			//apparently addToCart handles removal of items too
			addToCart(items, function() {
				$('html, body').animate({scrollTop: 0}, 1000);
				
				showCart();
			}, removeItemId, removeCartItemIds);
		});
    });
    return false;
}
function hideCart(){
	var $target = $('.cart-mini');
	$target.removeClass('expanded');	       
}
function showHideCart(){
	var $target = $('.cart-mini');
	if($target.hasClass('expanded')){
		showCart();
	} else {
		hideCart();
	}
}
function gaAtcTracking(ga_productdata, sku_info){
	ga('send', 'event', 'Add to Cart' , ga_productdata.homeCat, ga_productdata.productName, sku_info.price);
}
function atc() {
	// .po-on-selector is either pdp or quickview
	var sku_info = $(this).closest('.po-on-selector').data('product-options').getOneAndOnlySku();
	var qty = $('#qty-field').val();
	
	if (!qty) {
		alert('Please enter a quantity');
		return false;
	}
	
	if ($('#size-field').val() == ''){
		alert('Please select a size');
		return false;
	}
		
	if (sku_info.inStock){
		
		gaAtcTracking(ga_productdata, sku_info);

	    ajaxWithoutAuth(js_site_var['context_path'] + '/app/cart/view.json', null, 'GET', function(data) {
	    	if (data.cart.cartItems.length + parseInt(qty) > 50) {
	    		alert('Your cart is full. For orders larger than 50 items please contact our Customer Service team at info@havaianasus.com');
	    		return false;
	    	}
	    	var skuCount = 0;
	    	console.log(sku_info.itemId + ' :id');
	    	for(item in data.cart.cartItems) {
		    	console.log(' > ' + data.cart.cartItems[item].itemId);
	    		if(data.cart.cartItems[item].itemId === sku_info.itemId) {
	    			skuCount++;
	    		}
	    	}
	    	console.log('available: ' + sku_info.qtyAvailable);
	    	console.log(skuCount + ' + ' + qty + ' = ' + (skuCount + parseInt(qty)));
	    	if (sku_info.qtyAvailable >= skuCount + parseInt(qty)) {
	    		var items = [];
	    		items.push({
	    			itemId: sku_info.itemId,
	    			quantity: qty
	    		});
	    		addToCart(items, function() {
	    	    	if (parseInt(sku_info.qtyAvailable) === (skuCount + parseInt(qty))) {
	    	    		$('#atc-btn').html('<i class="fa fa-cart-plus"></i>OUT OF STOCK').prop('disabled', false).addClass('disabled');
	    	    	}
	    			$.fancybox.close();
	    	        $('.cart-mini').parents('.nav').addClass('expanded');
	    			showCart(true);
	    		});
	    	} else {
	    		alert(
	    			'The requested quantity ('+(skuCount + parseInt(qty))+') is not currently available.\n'+
	    			'There ' + (skuCount == 1?'is':'are') + ' '+skuCount+' item' + (skuCount == 1?'':'s') + ' in your cart, and an additional quantity of ' + qty + ' was requested.\n'+
	    			'Please choose a quantity less than: ' + (1 + parseInt(sku_info.qtyAvailable)));
	    		if (parseInt(sku_info.qtyAvailable) <= skuCount) {
	    			$('#atc-btn').html('<i class="fa fa-cart-plus"></i>OUT OF STOCK').prop('disabled', false).addClass('disabled');
	    		}
	    	}
	    });
	}
}

function loadCookieCartItems(callback){
	  //dummy call  to trigger SessionCookieFilter
	  doSomethingWithCart(function(){
	    var cookieName = 'session-already_loaded';
	    var already_loaded =  getCookieWithHelper(false, cookieName);

	    addItemsFromCookieToCart(cookieName, 'remember_cart_items', function() {
	      doSomethingWithCart(function(cart) {
	        if (cart.cart.cartItems.length > 0) {
	          countCart();
	        }
	        if(typeof callback === 'function'){
	          callback();
	        }

	        if (typeof already_loaded == 'undefined'
	            && window.location.href.indexOf('/app/cart') != -1){
	          window.location.href =  js_site_var['context_path'] + '/app/cart/update';
	        }
	      });
	    });
	  });
	}