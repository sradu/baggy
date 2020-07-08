var isRRDisplay = false;
var disableRichRelevance = $('#disableRichRelevance').val();
if(disableRichRelevance == undefined || disableRichRelevance == '' || disableRichRelevance == null){
	disableRichRelevance = 'false';
}
var disabledRR = disableRichRelevance;
function displayAtgRecommendation() {
	var enabledEndecaForRR = $('#enabledEndecaForRR').val();
	if (enabledEndecaForRR == 'false'){
		$(".medium_products_container, .search_you_might, .search_otherproducts").show(); /* No Search Results Page <dattaprasad> added .search_otherproducts on 23-07-2015*/
		$(".need_help_container h3").css("visibility", "visible"); /* No Search Results Page added on 23-07-2015 */
		$(".you_might_also_like_container, .productDescp_list").show(); /* <dattaprasad> added .productDescp_list on 23-07-2015 */
		$("#shopping-bag-container").show();
		$('#BVRRSummaryContainer').css('pointer-events','all');
	}
	$('#BVRRSummaryContainer').css('pointer-events','all');
}
$(window).on('load',function() {
	/*IF RR Disabled, then show ATG Recommendations*/
	displayAtgRecommendation();
});

