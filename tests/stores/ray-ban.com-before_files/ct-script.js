/*

██╗    ██╗███████╗     █████╗ ██████╗ ███████╗     ██████╗ ██████╗ ███╗   ██╗████████╗███████╗███╗   ██╗████████╗
██║    ██║██╔════╝    ██╔══██╗██╔══██╗██╔════╝    ██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔════╝████╗  ██║╚══██╔══╝
██║ █╗ ██║█████╗      ███████║██████╔╝█████╗      ██║     ██║   ██║██╔██╗ ██║   ██║   █████╗  ██╔██╗ ██║   ██║
██║███╗██║██╔══╝      ██╔══██║██╔══██╗██╔══╝      ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██║╚██╗██║   ██║
╚███╔███╔╝███████╗    ██║  ██║██║  ██║███████╗    ╚██████╗╚██████╔╝██║ ╚████║   ██║   ███████╗██║ ╚████║   ██║
 ╚══╝╚══╝ ╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝   ╚═╝
by Tealium

*/

console.log('%cct-script on AKAMAI is running', 'color:#29623B; font-weight: bold');


  if($("#pdp_page").length && (($(window).width()> 767 && !$("#D_PDP_Prod").length) || ($(window).width()< 768 && !$("#rb-pdp-main").length))){
    tealium_data2track.push({
       id : 'Error',
       Error_Source : 'Server',
       Error_Code : 'PDP: missing content',
       Error_Details: document.location.pathname
    });
  }

  if(document.location.href.indexOf('ar=on') > -1){
    $('.rb-main').html('<a href="intent://arvr.google.com/scene-viewer/1.0?file=https://media.ray-ban.com/AR/testscaled2.glb#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;" style="color: #fff;font-size: 30px;height: 100px;display: block; text-align: center;vertical-align: middle;padding: 31px;">TEST FOR THE MAGIC!!!<br>New version<br>CLICK HERE</a>');
  }

