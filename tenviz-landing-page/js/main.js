$(document).on('ready', function() {
	console.log('test');
	//***DOM ELEMENTS****
	let $landingPageContainer = $('body');
	console.log($landingPageContainer)
	let $lpHeaderNav = $landingPageContainer.find('.lp-header-nav');
	console.log($lpHeaderNav)
	let $lpHeaderNavLogin = $lpHeaderNav.find('.lp-header-nav-login');
	console.log($lpHeaderNavLogin)


	let $formSignTenviz = $landingPageContainer.find('.form-sign-in-to-tenviz-section');
	console.log($formSignTenviz)
	let $formSignTenvizBtnClose = $formSignTenviz.find('.form-sign-in-to-tenviz-btn-close');
	console.log($formSignTenvizBtnClose)
	//***END DOM ELEMENTS****

	//******EVENT********

	//***form-sign-in-to-tenviz event***
	$lpHeaderNavLogin.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$formSignTenviz.removeClass('hidden');
	});

	$formSignTenvizBtnClose.click(function(e) {
		$formSignTenviz.addClass('hidden');
	})
	//***end form-sign-in-to-tenviz event***

	//******END EVENT********

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
