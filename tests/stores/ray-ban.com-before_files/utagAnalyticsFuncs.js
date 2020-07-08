(function(window, document) {
    window.utagreadcookie = function (name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1,c.length);
            }
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length,c.length);
            }
        }
        return null;
    }
    window.utagdeletecookie = function (name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/';
    }
    window.utagupdatefromcookie = function () {
        if(typeof window.utag_data === 'undefined' || window.utag_data === null) {
            window.utag_data = {};
        }
        if (utagreadcookie("rbuser_status")=='R') {
            utag_data.User_LoginStatus = "Logged";
            tmpuserid = utagreadcookie("utagdata_override_user_id");
            if (tmpuserid!=null) {
                window.utag_data.User_Id = tmpuserid;
            }
            tmpmd5 = utagreadcookie("utagdata_override_emailmd5");
            if (tmpmd5!=null) {
                window.utag_data.User_Email_MD5 = tmpmd5;
            }
            tmpemailoptin = utagreadcookie("utagdata_override_emailoptin");
            if (tmpemailoptin!=null) {
                window.utag_data.User_EmailOptin = tmpemailoptin;
            }
            tmpusersegments = utagreadcookie("utagdata_override_usersegments");
            tmpusershopsunner = utagreadcookie("sr_token");
            tmpusercsr = utagreadcookie("isCSRSession");
            tmpsegments = "";
            if (tmpusersegments!=null) {
                tmpsegments=tmpusersegments;
            }
            if (tmpusershopsunner!=null) {
                tmpsegments=tmpsegments+",Shoprunner";
            }
            if (tmpusercsr!=null) {
                tmpsegments=tmpsegments+",CSR";
            }
            if (tmpsegments!='') {
                window.utag_data.User_Segments = tmpsegments;
            }

            tmpeventsuseraccountnew = utagreadcookie("utagdata_override_event_useraccountnew");
            if (tmpeventsuseraccountnew!=null) {
                window.utag_data.Events_UserAccountNew = tmpeventsuseraccountnew;
                utagdeletecookie("utagdata_override_event_useraccountnew");
            }
            tmpeventsuseremailsub = utagreadcookie("utagdata_override_event_useremailsub");
            if (tmpeventsuseremailsub!=null) {
                window.utag_data.Events_UserEmailSub = tmpeventsuseremailsub;
                utagdeletecookie("utagdata_override_event_useremailsub");
            }
            
        } else if (utagreadcookie("rbuser_status")=='G') {
            utag_data.User_LoginStatus = "Guest";
            utagdeletecookie("utagdata_override_user_id");
            utagdeletecookie("utagdata_override_emailmd5");
            utagdeletecookie("utagdata_override_emailoptin");
            utagdeletecookie("utagdata_override_usersegments");
            utagdeletecookie("utagdata_override_event_useraccountnew");
            utagdeletecookie("utagdata_override_event_useremailsub");
            delete utag_data.User_Id;
            delete utag_data.User_Email_MD5;
            delete utag_data.User_EmailOptin;
            delete utag_data.User_CrmId;
            delete utag_data.User_Segments;
        }
    }
    window.utagtrackSignupForm = function () {
        tealium_data2track = tealium_data2track || [];
        tmpeventsuseremailsub = utagreadcookie("utagdata_override_event_useremailsub");
        tmpeventsuseremailmd5 = utagreadcookie("utagdata_override_event_useremailmd5");
        if (tmpeventsuseremailsub!=null && tmpeventsuseremailsub=='1') {
            tealium_data2track.push({
                Tracking_EventId: 'SignupForm',
                User_Email_MD5: tmpeventsuseremailmd5
            });
            utagdeletecookie("utagdata_override_event_useremailsub");
            utagdeletecookie("utagdata_override_event_useremailmd5");
        }
    }
    window.utagtrackPaymentPxPGateway = function (paymode) {
        tealium_data2track = tealium_data2track || [];
        var trkgateway = {};
        trkgateway.id="X-X-Checkout-Step-Gateway";
        trkgateway.Order_PaymentType=paymode;
        if (utag_data!=undefined && utag_data.ProductsOnPage!=undefined) {
            trkgateway.Products = utag_data.ProductsOnPage;
        }
        tealium_data2track.push(trkgateway);
    }
    window.utagtrackPaymentGateway = function (paymode, cctype) {
        tealium_data2track = tealium_data2track || [];
        var trkgateway = {};
        trkgateway.id="X-X-Checkout-Step-Gateway";
        if (paymode=='CC') {
            trkgateway.Order_PaymentType=cctype;
        } else {
            trkgateway.Order_PaymentType=paymode;
        }
        tealium_data2track.push(trkgateway);
    }
    if(typeof utag_data === 'undefined' || utag_data === null) {
        window.utag_data = {};
    }
})(window, document);