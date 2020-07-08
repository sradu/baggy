var isLoginFormCheckout = false;
var socialTitle = "";
var socialDescription = "";
function socialLogin(provider, isCheckoutLogin) {
/*	var locale = $("#nonPmyLocale").val();
	var language = (locale.split("_")[0]).split("/")[1];
	if(language == '' || language == null || language == undefined){
		language = "en";
	}*/
	if (isCheckoutLogin) {
		isLoginFormCheckout = true;
	}
	var login_params = {};
	if (provider == 'facebook') {
		login_params = {
				provider: provider,
				callback: onLogin,
				facebookExtraPermissions: 'email'
		}
	} else if (provider == 'twitter') {
		login_params = {
				provider: provider,
				callback: onLogin
		}
	}
	gigya.socialize.login(login_params);
}

function onLogin(response) {
	if ( response.errorCode == 0 ) {
		var socialLoginPatternURL=$("#socialLoginPatternURL").text(); 
		var firstname= response.user.firstName;
		var lastname=response.user.lastName;
		var nickname=response.user.nickname;
		var email=response.user.email;
		var socialMediaType=response.user.loginProvider;
		var country = response.user.country;
		var imageURL = response.user.thumbnailURL;
		var nonPrimarylocale = $("#nonPmyLocale").val();

		switch(socialMediaType)	{
		case "facebook":
			var userId=response.user.identities.facebook.providerUID;
			break;
		case "twitter":
			var userId=response.user.identities.twitter.providerUID;
			break;
		default:
		}
		var username=response.user.nickname;
		if(userId) {
			$.ajax({
				type: "POST",
				url: socialLoginPatternURL,
				data: {firstName:firstname,userId:userId,nickName:nickname,socialMediaType:socialMediaType,email:email,lastName:lastname,country:country,isLoginFormCheckout:isLoginFormCheckout,imageURL:imageURL},
				dataType: "json",
				success: function(data){
					var isCreateUser = data.isCreateUser;
					if (isCreateUser) {
						socialRegisterAjax(data);
					} else {
						socialSigninAjax(data);
					}
					/* Mohan Modified MKFP-304 DTM */
					if(dtmEnabledFlag == "true"){
					dtmLoginEvent(socialMediaType, email );
					}

				},
				error: function(xhr, ajaxOptions, thrownError) {

					if(xhr.status=='409'){
						location.href = nonPrimarylocale+'/account/createAccount.jsp?error=409';
					}
					else{
						location.href = nonPrimarylocale+'/common/serverError.jsp';
					}
				}
			});
		}
	} else {
		alert("Error occured: " + response.errorMessage);
	}
}

function linkSocialMediaToProfile(provider) {
	var login_params = {
			provider: provider,
			callback: linkSocialMediaCallBack
	}
	gigya.socialize.login(login_params);
}

function linkSocialMediaCallBack(response) {
	var socialMediaType=response.user.loginProvider;
	$("#linkSocialMedia").closest("form").find('#socialMediaType').val(socialMediaType);
	switch(socialMediaType)	{
	case "facebook":
		var userId=response.user.identities.facebook.providerUID;
		$("#linkSocialMedia").closest("form").find('#facebookUserId').val(userId);
		$("#linkSocialMedia").closest("form").find('#updateSocialUserId').click();
		break;
	case "twitter":
		var userId=response.user.identities.twitter.providerUID;
		$("#linkSocialMedia").closest("form").find('#twitterUserId').val(userId);
		$("#linkSocialMedia").closest("form").find('#updateSocialUserId').click();
		break;
	default:
	}
}

function socialRegisterAjax(data) {
	/*Start: Santhos Get locale for DEVCA-126*/
	//updating the id value to get global var : Saurav
	var nonPrimarylocale = $("#nonPmyLocale").val();
	/*End: Santhos Get locale for DEVCA-126*/
	var firstName = data.firstName;
	var lastName = data.lastName;
	var country = data.country;
	var email = data.email;
	var isLoginFormCheckout = data.isLoginFormCheckout;
	var socialMediaType = data.socialMediaType;
	var userId = data.userId;
	var isEmailExist = data.isEmailExist;
	var imageURL = data.imageURL;
	$.ajax({
		type: "POST",
		url: nonPrimarylocale+"/includes/socialConnect/socialRegisterAjax.jsp?nonPrimaryLocale="+nonPrimarylocale,
		data: {firstName:firstName,userId:userId,socialMediaType:socialMediaType,email:email,lastName:lastName,country:country,isLoginFormCheckout:isLoginFormCheckout,isEmailExist:isEmailExist,imageURL:imageURL},
		dataType: "html",
		success: function(res) {
			$("#light").html(res).find("form").each(function(){
				$("#light").show();
				$("#fade").show();
				if((typeof mkobj !== "undefined")){
					$(this).validate({
		        		submitHandler: function(form){
		            		ajax_result = mkobj.ajaxFormSubmit(form);
		            	}
		            });
				}else{
						$(this).parsley({});
					}
			});
			$(".dialog-close-button").click();
			$("#socialMKCreatehidden").click();
			if($('#checkout-sign-in-modal').length > 0){
				$('#checkout-sign-in-modal').modal('hide');
			}
		},
		error: function(xhr, ajaxOptions, thrownError) {

			if(xhr.status=='409'){
				location.href = nonPrimarylocale+'/account/createAccount.jsp?error=409';
			}
			else{
				location.href = nonPrimarylocale+'/common/serverError.jsp';
			}
		}
	});
}

function socialSigninAjax(data) {
	var email = data.email;
	var successUrl = document.URL;
	var errorUrl = successUrl;
	var isLoginFormCheckout = data.isLoginFormCheckout;
	var socialMediaType = data.socialMediaType;
	var userId = data.userId;
	var isEmailExist = data.isEmailExist;
	var isMigratedUser = data.migrated;
	var profileId = data.id;
	var imageURL = data.imageURL;
	/*Start: Santhos Get locale for DEVCA-126*/
	//updating the id value to get global var : Saurav
	var nonPrimarylocale = $("#nonPmyLocale").val();
	/*End: Santhos Get locale for DEVCA-126*/
	$.ajax({
		type: "POST",
		url: nonPrimarylocale+"/includes/socialConnect/socialSigninAjax.jsp?nonPrimaryLocale="+nonPrimarylocale,
		data: {userId:userId,socialMediaType:socialMediaType,email:email,successUrl:successUrl,errorUrl:errorUrl,isLoginFormCheckout:isLoginFormCheckout,isEmailExist:isEmailExist,isMigratedUser:isMigratedUser,profileId:profileId,imageURL:imageURL},
		dataType: "html",
		success: function(res) {
			$("#light").html(res).find("form").each(function(){
				$("#light").show();
				$("#fade").show();				
				if((typeof mkobj !== "undefined")){
					$(this).validate({
						submitHandler: function(form){
							ajax_result = mkobj.ajaxFormSubmit(form);
						}
					});
				}else{
						$(this).parsley({});
					}
				
			});
			$(".dialog-close-button").click();
			$("#socialMKLoginhidden").click();
			if($('#checkout-sign-in-modal').length > 0){
				$('#checkout-sign-in-modal').modal('hide');
			}

		},
		error: function(xhr, ajaxOptions, thrownError) {

			if(xhr.status=='409'){
				location.href = nonPrimarylocale+'/account/createAccount.jsp?error=409';
			}
			else{
				location.href = nonPrimarylocale+'/common/serverError.jsp';
			}
		}
	});
}

function shareProduct(title, description, imageSRC, socialProductId, socialSkuId, socialProductUrl, fromQuickView) {
	var linkBackUrl = socialProductUrl;
	var image = { type: 'image', src: imageSRC, href: linkBackUrl};
	var act = new gigya.socialize.UserAction();
	act.setUserMessage("This is the user message");
	act.setTitle(title);
	act.setLinkBack(linkBackUrl);
	act.setDescription(description);
	act.addMediaItem(image);
/*	var locale = $("#nonPmyLocale").val();
	var language = (locale.split("_")[0]).split("/")[1];
	if(language == '' || language == null || language == undefined){
		language = "en";
	}*/
	var showShareBarUI_params=
	{ 
			containerID: 'socialComponents' + socialProductId + fromQuickView,
			shareButtons: 'facebook-like,twitter-tweet,Pinterest-pinit',
			userAction: act,
			layout: 'vertical',
			onSendDone: function(event) {
				if(event.providers) {
					var providers = event.providers.split(",");
					for(omniVar = 0; omniVar < providers.length; omniVar++) {
                        var provider = providers[omniVar];
                        /* Mohan Modified MKFP-304 DTM */
                        if(dtmEnabledFlag == "true"){
                        dtmShareProduct( socialProductId, socialSkuId, provider ); 
                        }
                      }
				}
			}
	}

	var showShareBarUI_params_wishlist=
	{ 
			containerID: 'socialComponents' + socialProductId + fromQuickView,
			shareButtons: 'facebook-like,Pinterest-pinit',
			userAction: act,
			layout: 'vertical',
			onSendDone: function(event) {
				if(event.providers) {
					var providers = event.providers.split(",");
					for(omniVar = 0; omniVar < providers.length; omniVar++) {
                        var provider = providers[omniVar];
                        /* Mohan Modified MKFP-304 DTM */
                        if(dtmEnabledFlag == "true"){
                        dtmShareProduct( socialProductId, socialSkuId, provider ); 
                        }
                      }
				}
			}
	}

	if($(".wish-list-section").length > 0 || $(".someoneWishListContainer").length > 0){
		gigya.socialize.showShareBarUI(showShareBarUI_params_wishlist);
	}
	else{
		gigya.socialize.showShareBarUI(showShareBarUI_params);
	}

}

function PDPshareProduct(title, description, imageSRC, socialProductId, socialSkuId, socialProductUrl, fromQuickView) {
	var linkBackUrl = socialProductUrl;
	var image = { type: 'image', src: imageSRC, href: linkBackUrl};
	var act = new gigya.socialize.UserAction();
	act.setUserMessage("This is the user message");
	act.setTitle(title);
	act.setLinkBack(linkBackUrl);
	act.setDescription(description);
	act.addMediaItem(image);
/*	var locale = $("#nonPmyLocale").val();
	var language = (locale.split("_")[0]).split("/")[1];
	if(language == '' || language == null || language == undefined){
		language = "en";
	}*/
	var showShareBarUI_params=
	{ 
			containerID: 'socialComponents' + socialProductId + fromQuickView,
			/*shareButtons: 'facebook-like,twitter-tweet,Pinterest-pinit',*/
			shareButtons:
		        [
		           
		         { // Pinterest button
		            	provider: 'pinterest',
		                tooltip:'pin it on pinterest',
		                iconImgUp :'/img/pinterest-desktop.png',
		                font:'arial',
		                iconOnly: 'true'
		               
		            },
		            { // Facebook share button
		            	 provider:'facebook',
		                 tooltip:'Share this on Facebook',
		                 iconImgUp :'/img/facebook-desktop.png',
		                 font:'arial',
		                 iconOnly: 'true'
		              
		            },
		            { // Twitter share button
		            	 provider:'Twitter',
		                 tooltip:'Share this on Twitter',  /* <sathya> MKCAB11 - ECOSIT-623 - Aug 16 2016 */
		                 iconImgUp :'/img/twitter-desktop.png',
		                 font:'arial',
		                 iconOnly: 'true'
		            }
		        ],
		    showCounts:'none',
			userAction: act,
			layout: 'horizontal',
			onSendDone: function(event) {
				if(event.providers) {
					var providers = event.providers.split(",");
					for(omniVar = 0; omniVar < providers.length; omniVar++) {
                        var provider = providers[omniVar];
                        /* Mohan Modified MKFP-304 DTM */
                        if(dtmEnabledFlag == "true"){
                        dtmShareProduct( socialProductId, socialSkuId, provider ); 
                        }
                      }
				}
			},
			onLoad:function(){/*<sukraj> fix for ECOSIT-693 on 24/Aug/2016*/
				if($("#socialComponents" + socialProductId + fromQuickView +" .gig-button-container a").length == 0 ){
					var gigyaComponent = $('.gig-button-container img');
					for(var i=0;i<gigyaComponent.length;i++){
						if(!$(gigyaComponent[i]).parent().is('a')){
							$(gigyaComponent[i]).wrap("<a href='javascript:void(0)'/>");
						}
					}
				}
			}

	}



	gigya.socialize.showShareBarUI(showShareBarUI_params);

}

$(document).ready(function() { 
	loadWishListSocialLinks();
});
function loadWishListSocialLinks(){
	var url =window.location.href;
	var currentSiteUrl = location.protocol+"//"+location.hostname;/*<datta> fix for ECOSIT-974 on 20/09/2016*/
	if(url.indexOf("tabName=wishListTab") > -1){
	// Define an image media item:
    var image = {
        type: 'image',
        src: currentSiteUrl+'/img/share.png' //address should be public url for access <datta> fix for ECOSIT-974 on 20/09/2016
       }
    // Define a UserAction onject
    var GiftListId=$('#shareId').val();
    var shareUrl ="https://"+window.location.host+"/wishlists/wishListSearchLanding.jsp?giftlistId="+GiftListId;
    var ua = new gigya.socialize.UserAction();
    ua.setLinkBack(shareUrl);
    ua.setTitle("MK WishLIST");
    ua.addMediaItem(image);
    // Define Share Bar plugin's Parameters
    var shareBarParams ={
        userAction:ua,
        shareButtons:
        [
			{ // Pinterest button
				provider: 'pinterest',
			    tooltip:'pin it on pinterest',
			    iconImgUp :'../img/pinterest-desktop.png',
			    font:'arial',
			    iconOnly: 'true'
			   
			},
            
            { // Facebook share button
            	 provider:'facebook',
                 tooltip:'Share this on Facebook',
                 iconImgUp :'../img/facebook-desktop.png',
                 font:'arial',
                 iconOnly: 'true'
              
            }
           
            
        ],
        containerID: 'gigyaButtons', // location of the Share Bar plugin
        showCounts:'none',
        onLoad:function(){/*<sukraj> fix for ECOSIT-693 on 24/Aug/2016*/
			if($('#gigyaButtons .gig-button-container a').length == 0){
				$('.gig-button-container img').wrap("<a href='javascript:void(0)'/>");
				/* <dattaprasad> ECB-16291 Fixed on 19-09-2018 starts*/
				$("#gigyaButtons *").removeAttr("tabindex");
				$('.gig-button-container img').each(function(){
					var currentObj = $(this);
					var currentImage = currentObj.attr("src");
					if(currentImage.indexOf('pinterest') > 0) {
						currentObj.parent("a").attr("aria-label","Share on Pinterest");
					}
					else if(currentImage.indexOf('facebook') > 0) {
						currentObj.parent("a").attr("aria-label","Share on Facebook");
					}
				})
				/* <dattaprasad> ECB-16291 Fixed on 19-09-2018 ends*/
			}
		}
    }
    // Load Share Bar plugin
    gigya.socialize.showShareBarUI(shareBarParams);
	}
}
