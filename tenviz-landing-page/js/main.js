$(document).on('ready', function() {
	console.log('test');
	$(".lazy").slick({
		lazyLoad: 'ondemand', // ondemand progressive anticipated
		infinite: true,
		dots: true,
		autoplay: true,
		autoplaySpeed: 3000,
		// fade: true,
		// centerMode: true,
  // 	variableWidth: true,
	});
});
