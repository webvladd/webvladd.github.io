$(document).on('ready', function() {
	console.log('test');

	//*****Smooth scrolling to the anchor*****
	var $page = $('html, body');
	$('a[href*="#"]').click(function() {
		$page.animate({
			scrollTop: $($.attr(this, 'href')).offset().top -= $('header')[0].offsetHeight
		}, 400);
		return false;
	});
	//***END Smooth scrolling to the anchor***

	//********SLIDER***********
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
  //*****END SLIDER********
});
