var getCountries = function () {
  jQuery.ajax({
    url: 'https://api.ipstack.com/check?access_key=f9cab6b80e371fcf86793cc0d8841fde&legacy=1',
    type: 'POST',
    dataType: 'jsonp',
    success: function (location) {
      var country_code_ip = location.country_code;

      if (country_code_ip !== undefined) {
        if (country_code_ip == 'GB') {
          country_code_ip = 'EN';
        }

        var country_code_current = document.getElementById('country').value;

        if (country_code_current == 'GB') {
          country_code_current = 'EN';
        }
        if (country_code_current == 'USA') {
          country_code_current = 'US';
        }

        if (country_code_ip != "" && country_code_current != "") {
          var country_ip = getCountryByCountryCode(country_code_ip);
          var country_current = getCountryByCountryCode(country_code_current);

          var baseUrl;
          if (window.location.hostname == "localhost") {
            baseUrl = "http://localhost/webapp/wcs/stores/servlet/"
          } else {
            baseUrl = window.location.origin + '/';
          }

          if (country_code_ip != country_code_current) {
            var urlLabel = "ray-ban.com/";

            $('head').append('<style> body.overlay-country-bounce-open { overflow-y: hidden; position: fixed; width: 100%; } .wcs-close-btn {top: 0px; right: 1px;} .overlay-country-bounce { z-index: 3147483645; position: fixed; width: 100%; height: 100%; top: 0; left: 0; background: transparent; overflow-y: hidden; overflow-x: hidden; -webkit-overflow-scrolling: touch; visibility: hidden; -webkit-backface-visibility: hidden; backface-visibility: hidden; -webkit-transform: translateY(200%); transform: translateY(200%); -webkit-transition: -webkit-transform 0.7s, visibility 0.7s, background 0.2s; -moz-transition: -moz-transform 0.7s, visibility 0.7s, background 0.2s; transition: transform 0.7s, visibility 0.7s, background 0.2s; } .overlay-country-bounce.opacity { background: rgba(0,0,0,.8); } .overlay-country-bounce .content-country-bounce-top { background-color: transparent; position: relative; width: 100%; height: 45%; } @media all and (orientation:portrait) { .overlay-country-bounce .content-country-bounce-top { height: 45%; } } @media all and (orientation:landscape) { .overlay-country-bounce .content-country-bounce-top { height: 20%; } } @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-device-pixel-ratio: 2) and (device-aspect-ratio: 2/3) and (orientation:portrait) { .overlay-country-bounce .content-country-bounce-top { height: 35%; } } .overlay-country-bounce .content-country-bounce-bottom { background-color: white; position: relative; width: 100%; height: 55%; padding: 0 .625em; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; max-width: 650px; margin: 0 auto; } @media all and (orientation:portrait) { .overlay-country-bounce .content-country-bounce-bottom { height: 55%; } } @media all and (orientation:landscape) { .overlay-country-bounce .content-country-bounce-bottom { height: 400px; background: url(https://assets.ray-ban.com/is/image/RayBan/BG_Monetate_Campain2017_rectangle?$png-full$) no-repeat 0 0; } } @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-device-pixel-ratio: 2) and (device-aspect-ratio: 2/3) and (orientation:portrait) { .overlay-country-bounce .content-country-bounce-bottom { height: 65%; } } .overlay-country-bounce .content-country-bounce-bottom .title-bounce { text-align: center; border-bottom: 1px solid #666; padding: 1em 0; font-family: "Oswald-Medium", "HelveticaNeueBold", "Helvetica Neue", "TeXGyreHerosBold", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif; color:#000; } .overlay-country-bounce.open { visibility: visible; -webkit-transform: translateY(0%); transform: translateY(0%); } .overlay-country-bounce .content-country-bounce-bottom .rb-select-wrapper .rb-select-replacement { padding: 0 2.5em 0 1em; } .flags { display: table; margin: 1em auto 0 auto; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; width: 100%; } @media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-device-pixel-ratio: 2) and (device-aspect-ratio: 2/3) and (orientation:landscape) { .flags { margin: .5em auto 0 auto; } } .flags li { display: table-cell; line-height: 0; margin: 0; padding: 0; width: 50%; text-align: center; } .flags li a { outline: 0 none; display: block; } .flags li a img { width: 110px; } @media all and (orientation:portrait) { .flags li a img { width: 110px; } } @media all and (orientation:landscape) { .flags li a img { width: 150px; } } .flags li a span { display: inline-block; margin-top: 1.5em; font-family: "Oswald-Medium", "HelveticaNeueBold", "Helvetica Neue", "TeXGyreHerosBold", "Helvetica", "Tahoma", "Geneva", "Arial", sans-serif; font-size: .8em; text-decoration: underline; color:#666; } .overlay-country-bounce .rb-select-wrapper {  left: 0; right: 0; margin: 30px auto; width: 250px; text-align: center; } </style>');
            $('body').append('<div class="overlay-country-bounce"> <div class="content-country-bounce-top"> </div> <div class="content-country-bounce-bottom"><div class="wcs-close-btn"></div> <div class="title-bounce">SELECT YOUR STORE</div> <ul class="flags"> <li> <a href="" class="bounce-store-link"> <img class="bounce-store-img" src="" alt="" /><br /> <span class="bounce-store-text"></span> </a> </li> <li> <a href="javascript:void(0);" class="store-link-usa"> <img class="" src="https://assets.ray-ban.com/is/image/RayBan/' + country_code_current + '?$png-full$" alt="" /><br /> <span class="">' + urlLabel + country_current + "/" + '</span> </a> </li> </ul> <div class="rb-select-wrapper" data-prefix=""> <select name="country-select-bounce-location" id="country-select-bounce-location"> <option value="' + baseUrl + 'argentina">Argentina</option> <option class="AU-47" value="' + baseUrl + 'australia">Australia</option> <option class="AT-39" value="' + baseUrl + 'austria?cid=RB08_Overlay_Us_At">\u00d6sterreich</option> <option class="BE-40" value="' + baseUrl + 'belgium/fr?cid=RB08_Overlay_Us_BeFr">Belgique (FR)</option> <option class="BE-41" value="' + baseUrl + 'belgium/nl">Belgi\u00eb (NL)</option> <option value="' + baseUrl + 'brazil?cid=RB08_Overlay_Us_Br">Brasil</option> <option class="CA-24" value="' + baseUrl + 'canada/en?cid=RB08_Overlay_Us_CaEn">Canada (EN)</option> <option class="CA-25" value="' + baseUrl + 'canada/fr">Canada (FR)</option> <option class="CN-26" value="https://www.ray-ban.com.cn/en?cid=RB08_Overlay_Us_CnZh">China (EN)</option> <option class="CN-7" value="https://www.ray-ban.com.cn/zh">\u4e2d\u56fd (\u7b80\u4f53\u4e2d\u6587)</option> <option value="' + baseUrl + 'croatia">Croatia</option> <option value="' + baseUrl + 'czechrepublic">Czech Republic</option> <option class="DK-36" value="' + baseUrl + 'denmark?cid=RB08_Overlay_Us_Dk">Denmark</option> <option value="' + baseUrl + 'estonia">Estonia</option> <option class="FI-46" value="' + baseUrl + 'finland">Finland</option> <option class="FR-2" value="' + baseUrl + 'france?cid=RB08_Overlay_Us_Fr">France</option> <option class="DE-3" value="' + baseUrl + 'germany?cid=RB08_Overlay_Us_De">Deutschland</option> <option value="' + baseUrl + 'greece">Greece</option> <option class="HK-48" value="' + baseUrl + 'hongkong/en">Hong Kong</option> <option class="HK-49" value="' + baseUrl + 'hongkong/zh">\u9999\u6e2f</option> <option value="' + baseUrl + 'hungary">Hungary</option> <option value="' + baseUrl + 'india">India</option> <option value="' + baseUrl + 'indonesia">Indonesia</option> <option class="IE-45" value="' + baseUrl + 'ireland?cid=RB08_Overlay_Us_Ie">Ireland</option> <option value="' + baseUrl + 'israel">Israel</option> <option class="IT-4" value="' + baseUrl + 'italy?cid=RB08_Overlay_Us_It">Italia</option> <option value="' + baseUrl + 'japan?cid=RB08_Overlay_Us_Jp">\u65e5\u672c</option> <option value="' + baseUrl + 'korea">Korea</option> <option value="' + baseUrl + 'latam">Latin America</option> <option value="' + baseUrl + 'latvia">Latvia</option> <option value="' + baseUrl + 'lithuania">Lithuania</option> <option value="' + baseUrl + 'malaysia">Malaysia</option> <option value="' + baseUrl + 'malta">Malta</option> <option value="' + baseUrl + 'mea/ar">Middle East AR</option> <option value="' + baseUrl + 'mea/en">Middle East EN</option> <option value="' + baseUrl + 'mea/fr">Africa FR</option> <option class="MX-50" value="' + baseUrl + 'mexico">M\u00e9xico</option> <option class="NL-44" value="' + baseUrl + 'netherlands?cid=RB08_Overlay_Us_Nl">Netherlands</option> <option class="NO-38" value="' + baseUrl + 'norway?cid=RB08_Overlay_Us_No">Norway</option> <option value="' + baseUrl + 'pakistan">Pakistan</option> <option value="' + baseUrl + 'poland?cid=RB08_Overlay_Us_Po">Polska</option> <option class="PT-42" value="' + baseUrl + 'portugal?cid=RB08_Overlay_Us_Pt">Portugal</option> <option value="' + baseUrl + 'russia">Russia</option> <option value="' + baseUrl + 'singapore">Singapore</option> <option value="' + baseUrl + 'slovakia">Slovakia</option> <option value="' + baseUrl + 'southafrica">South Africa</option> <option value="' + baseUrl + 'southeasteurope">South East Europe</option> <option class="ES-5" value="' + baseUrl + 'spain?cid=RB08_Overlay_Us_Es">Espa\u00f1a</option> <option class="SE-37" value="' + baseUrl + 'sweden?cid=RB08_Overlay_Us_Se">Sweden</option> <option class="CH-29" value="' + baseUrl + 'switzerland/de?cid=RB08_Overlay_Us_ChDe">Schweiz (DE)</option> <option class="CH-30" value="' + baseUrl + 'switzerland/en">Switzerland (EN)</option> <option class="CH-28" value="' + baseUrl + 'switzerland/fr">Suisse (FR)</option> <option class="CH-27" value="' + baseUrl + 'switzerland/it">Svizzera (IT)</option> <option value="' + baseUrl + 'taiwan">Taiwan</option> <option value="' + baseUrl + 'thailand">Thailand</option> <option class="TR-31" value="' + baseUrl + 'turkey?cid=RB08_Overlay_Us_Tr">T\u00fcrkiye</option> <option class="GB-43" value="' + baseUrl + 'uk?cid=RB08_Overlay_Us_Gb">UK</option> <option value="' + baseUrl + 'ukraine">Ukraine</option> <option class="US-1" value="' + baseUrl + 'usa">USA</option> <option value="' + baseUrl + 'vietnam">Vietnam</option> </select> <a href="javascript:void(0);" onclick="$(\'#country-select-bounce-location\').click();"><div class="rb-select-replacement">CHOOSE A DIFFERENT STORE</div></a> </div> </div> </div>');

            $('.bounce-store-link').attr('href', baseUrl + country_ip + '?cid=RB08_Overlay_Us_' + country_code_ip);
            $('.bounce-store-img').attr('src', 'https://assets.ray-ban.com/is/image/RayBan/' + country_code_ip + '?$png-full$');
            $('.bounce-store-text').html(urlLabel + country_ip + "/");

            setTimeout(function () {
              showCountryBounce();
            }, 500);

            $('.content-country-bounce-top, .store-link-usa, .wcs-close-btn').off('click').on("click", function () {
              hideCountryBounce();
            });
            $("#country-select-bounce-location").change(function () {
              document.location.href = $('#country-select-bounce-location').val();
            });

          }
        }

        createCookie('countryBounceCookie', "", 1);
      }
    }
  });
};

var createCookie = function (name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
};
var readCookie = function (name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};
var showCountryBounce = function () {
  $('body').addClass('overlay-country-bounce-open');
  $('.overlay-country-bounce').addClass('open');
  $(".overlay-country-bounce").one('transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
    function () {
      $('.overlay-country-bounce').addClass('opacity');
    }
  );
};
var hideCountryBounce = function () {
  $('body').removeClass('overlay-country-bounce-open');
  $('.overlay-country-bounce').removeClass('open');
  $('.overlay-country-bounce').removeClass('opacity');
};

var getCountryByCountryCode = function (locale) {
  var countryName;
  switch (locale) {
    case 'AT':
      countryName = "austria"
      break;
    case 'AU':
      countryName = "australia"
      break;
    case 'BE':
      countryName = "belgium"
      break;
    case 'BR':
      countryName = "brazil"
      break;
    case 'CA':
      countryName = "canada"
      break;
    case 'CH':
      countryName = "switzerland"
      break;
    case 'CN':
      countryName = "china"
      break;
    case 'DE':
      countryName = "germany"
      break;
    case 'DK':
      countryName = "denmark"
      break;
    case 'EN':
      countryName = "uk"
      break;
    case 'GB':
      countryName = "uk"
      break;
    case 'ES':
      countryName = "spain"
      break;
    case 'FI':
      countryName = "finland"
      break;
    case 'FR':
      countryName = "france"
      break;
    case 'HK':
      countryName = "hongkong"
      break;
    case 'IE':
      countryName = "ireland"
      break;
    case 'IT':
      countryName = "italy"
      break;
    case 'MX':
      countryName = "mexico"
      break;
    case 'NL':
      countryName = "netherlands"
      break;
    case 'NO':
      countryName = "norway"
      break;
    case 'PL':
      countryName = "poland"
      break;
    case 'PT':
      countryName = "portugal"
      break;
    case 'SE':
      countryName = "sweden"
      break;
    case 'TR':
      countryName = "turkey"
      break;
    case 'US':
      countryName = "usa"
      break;
    case 'KR':
      countryName = "korea"
      break;

    default:
      countryName = ""
      break;
  }

  return countryName;
};

$(document).ready(function () {
  if (readCookie('isCSRSession') === null) {
    if (readCookie('countryBounceCookie') === null) {
      getCountries();
    }
  }
});
