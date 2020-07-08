    //---------------------------
    //
    //  analytics Module Code 0.0.3
    //
    //---------------------------
    ORA.analyticsModule = function(){};

    //Object to contain custom configs
    ORA.analyticsModule.prototype.oraConfigObj = {
  "i18n":false,
  "s_disableSeed":false,
  "alwaysLoad":true,
  "ora-plugins":{
    "pp":{
      "enable":true,
      "cookieDays":365,
      "priority":100,
      "defPrefix":"DCSext",
      "params":[
        "customer_id",
        "e_rid",
        "e_mid"
      ],
      "useMostRecent":true,
      "cookieName":"WTPERSIST"
    },
    "cookieCutter":{
      "readCookies":[
        {
          "cookie":{
            "TEST":"ora.cook_a"
          },
          "options":{
            "persist":true
          }
        },
        {
          "cookie":{
            "ORA_FPC":{
              "id":"ora.c_id",
              "ss":"ora.c_ss",
              "lv":"ora.c_lv"
            }
          },
          "options":{
            "parseOn":":",
            "parseLv":"="
          }
        },
        {
          "cookie":{
            "ELOQUA":{
              "GUID":"ora.eloqua"
            }
          }
        },
        {
          "cookie":{
            "utag_main":{
              "_ss":"ora.u_ss",
              "_st":"ora.u_st",
              "v_id":"ora.u_vid",
              "_sn":"ora.u_sn",
              "ses_id":"ora.u_ses_id"
            }
          },
          "options":{
            "parseOn":"$",
            "parseLv":":",
            "persist":false
          }
        }
      ],
      "enable":true
    },
    "cg":{
      "enable":true,
      "cgDefs":[
        "wt.cg_l1",
        "wt.cg_l2",
        "wt.cg_l3",
        "wt.cg_l4",
        "wt.cg_l5"
      ],
      "blockCollect":true
    }
  },
  "timezone":0,
  "DNTBehavior":"honorDNT",
  "s_dependencies":"common:running",
  "defaultCollectionServer":"dc.oracleinfinity.io",
  "s_useTrackingPipeline":true,
  "libUrl":"//c.oracleinfinity.io/acs/account/zc9tyu5qpy/js/main/analytics-production/analytics.js",
  "accountGuid":"zc9tyu5qpy",
  "tagId":"main",
  "secureCookie":false,
  "destinations":[
    {
      "accountGuid":"zc9tyu5qpy"
    }
  ],
  "s_TrackingPipelineTimeout":4000
};

    ORA.analyticsModule.prototype.preinit = function() {
    };

    // run rules
    ORA.analyticsModule.prototype.init = function() {
        try {
                         if(true) {
                           //Rule - simple
                                    this.oraConfigObj.key="value";
                
                                if (this.oraConfigObj.doLoad === undefined) {
                 this.oraConfigObj.doLoad=true;
                }
           }
                    // handle case where it matches none of the rules
            this.oraConfigObj.doLoad = this.oraConfigObj.doLoad || this.oraConfigObj.alwaysLoad;

                    } catch(e) {
            ORA.abortModuleHelper("analytics", e);
        }
   };


    // run any preload scripts
    ORA.analyticsModule.prototype.preload = function() {
        try {
            // get the max conversion timeout from the products for click functionality
            var currTimeout = 0;
            if (ORA.analyticsModule.prototype.oraConfigObj["s_conversionTimeout"]) {
                currTimeout = ORA.analyticsModule.prototype.oraConfigObj["s_conversionTimeout"];
            }
            ORA.setLoaderConversionTimeoutDefault(Math.max(currTimeout, ORA.loaderConversionTimeoutDefault()));
            ORA.Debug.debug("PRELOAD:  Executing preload script");
            

        } catch(e) {
            ORA.abortModuleHelper("analytics", e);
        }
    };


    // load the analytics tag
    ORA.analyticsModule.prototype.load = function(callback){
        try {
            ORA.Debug.debug("LOAD:  Executing load phase");
            var productName="analytics";
            var attachId="head";
            //Load script
            
    var fail = function(){
        ORA.fireEvent(new ORA.Event(productName+"_"+ORA.Event.LOADER_MODULE_ABORT, ORA.Event.STATUS_SUCCESS));
    };
    ORA.downloadLib(attachId, callback, fail, 0, true, this.oraConfigObj.libUrl);

        } catch(e) {
            ORA.abortModuleHelper("analytics", e);
        }
    };


    ORA.analyticsModule.prototype.postload = function(){
        ORA.Debug.debug("POSTLOAD:  Executing postload analytics complete");
        try {
            ORA.Debug.info("LOADER:  ORA.analyticsModule.prototype: postload");
            //PostLoad script
            
        ORA.analytics.setup(ORA.analyticsModule.prototype.oraConfigObj);
    
        } catch(e) {
            ORA.abortModuleHelper("analytics", e);
        }
    };


    // abort gracefully on timer expire
    ORA.analyticsModule.prototype.abort = function(){
        try{
            ORA.Debug.debug("ABORT:  Executing analyticsModule abort");
            //Abort script
            

        } catch(e){
            ORA.abortModuleHelper("analytics", e);
        }
    };

    //  setup the product Name
    ORA.analyticsModule.ProductName = "analytics";

    // register plugin
    ORA.registerPlugin(ORA.analyticsModule, "production");