(function (window) {
	var constructor = function () {
		this.initCarousels = function () {
			$('.content-carousel').each(function (index, item) {
				ContentCarousel.initCarousel($(item));
			});
		};

        this.initCarousel = function ($item) {
            // expecting "0:1,600:3,1000:5,etc..." format
            var responsiveData = $item.data("responsive");
            var options = responsiveData.split(",");
            var responsive = {};
            for (var i = 0; i < options.length; i++) {
                var keyval = options[i].split(":");
                var resolution = keyval.length > 0 ? StoreFront.toInt(keyval[0], null) : null;
                var count = keyval.length > 1 ? StoreFront.toInt(keyval[1], null) : null;
                if (resolution != null && count != null) {
                    responsive[resolution] = { items: count };
                }
            }

			// Custom navigation
			var $nav = $('#' + $item.attr('id') + '_nav');
			$nav.css("userSelect", "none");
			$nav.find('.content-carousel-prev').on('click', function (e) {
				$item.trigger('prev.owl.carousel');
			});
			$nav.find('.content-carousel-next').on('click', function (e) {
				$item.trigger('next.owl.carousel');
			});

            $item.on('changed.owl.carousel', function (e) {
                if (e.page.index < 0) {
                    $nav.find('.content-carousel-item-index').html(1);
                    $nav.find('.content-carousel-item-count').html(Math.ceil(e.item.count / e.page.size));
                } else {
                    $nav.find('.content-carousel-item-index').html(e.page.index + 1);
                    $nav.find('.content-carousel-item-count').html(e.page.count);
                }
            });

            setTimeout(function () {
                var autoWidth = false;

                $item.each(function (index, el) {
                    var containerHeight = $(el).height();
                    var h = $(el).find("img").first().prop('naturalHeight');
                    $(el).find("img:first").each(function (index, img) {
                        var w = $(img).prop('naturalWidth');
                        if ($(img).prop('naturalHeight') != h)
                            autoWidth = true;
                        //$(img).css({
                        //    'width': Math.round(containerHeight * w / h) + 'px',
                        //    'height': containerHeight + 'px'
                        //});
                    });
                });
                console.log('autowidth: ' + autoWidth);
			    $item.owlCarousel({
				    loop: false,
				    margin: 10,
				    nav: true,
				    dots: true,
				    responsive: responsive,
                    slideBy: 'page',
                    autoWidth: autoWidth,
                    mouseDrag: true,
                    touchDrag: true,
                    pullDrag: true,
                    freeDrag: false,
			    });


            }, 2000);


		};
	};

	window.ContentCarousel = new constructor();
})(window);

$(window).load(function () {
	ContentCarousel.initCarousels();
});