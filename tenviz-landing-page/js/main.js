$(document).on('ready', function() {
	console.log('test');
	// $('.autoplay').slick({
	//   slidesToShow: 2,
	//   slidesToScroll: 1,
	//   autoplay: true,
	//   autoplaySpeed: 2000,
	// });
	// $('.multiple-items').slick({
	// 	 vertical: true,
 //      infinite: true,
 //      dots: true,
 //      slidesToShow: 1,
 //      slidesToScroll: 1
 //    });


	// $(".vertical-center").slick({
      //   dots: true,
      //   vertical: true,
      //   // centerMode: true,
      //   slidesToShow: 2,
      // 	slidesToScroll: 1
      // });

	// console.log($('.ag-content-slider .slick-slide'))
	// let $alphaGenerationContent = $('.alpha-generation-content');
	// console.log($alphaGenerationContent);
	// let $agContentSlider = $alphaGenerationContent.find('.ag-content-slider');
	// console.log($agContentSlider)
	// let $agContentSlides = $agContentSlider.find('.slick-slide');
	// console.log($agContentSlides)

	// console.log($agContentSlider.offsetHeight)
	// $agContentSlider.offsetHeight

	// for (var i = 0; i < $agContentSlides.length; i++) {
	// 	console.log($agContentSlides[i].dataset)
	// 	$agContentSlides[i].dataset = i;
	// 	console.log($agContentSlides[i].dataset)
	// 	// $agContentSlides[i]
	// }
	// $(".regular").slick({
 //        dots: true,
 //        infinite: true,
 //        slidesToShow: 2,
 //        slidesToScroll: 1
 //      });
	// console.log($(".lazy"))
	$(".lazy").slick({
		lazyLoad: 'ondemand', // ondemand progressive anticipated
		infinite: true,
		dots: true,
		// autoplay: true,
		autoplaySpeed: 3000,
		// fade: true,
		// centerMode: true,
  // 	variableWidth: true,
  	// slidesToShow: 3,
	});
	// console.log($(".ag-content-slider"))
	// $(".ag-content-slider").slick({
	// 	slidesToShow: 3,
	// })
});
