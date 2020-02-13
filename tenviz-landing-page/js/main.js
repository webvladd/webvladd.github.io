$(document).on('ready', function() {
	console.log('test');
	//***DOM ELEMENTS****
	let $landingPageContainer = $('body');
	let $lpHeaderNav = $landingPageContainer.find('.lp-header-nav');
	let $lpHeaderNavLogin = $lpHeaderNav.find('.lp-header-nav-login');

	//***form-sign-up-now***
	let $formSignUpNow = $landingPageContainer.find('.form-sign-up-now-section');
	let $formSignUpNowBtnClose = $formSignUpNow.find('.form-sign-up-now-btn-close');
	let $startFreeTrialBtnBannerTop = $landingPageContainer.find('.banner-top-btn .start-free-trial-btn');
	let $formSignUpNowSignInBtn = $formSignUpNow.find('.form-sign-up-now .sign-in-btn');
	//***end form-sign-up-now***

	//***form-sign-in-to-tenviz***
	let $formSignTenviz = $landingPageContainer.find('.form-sign-in-to-tenviz-section');
	let $formSignTenvizBtnClose = $formSignTenviz.find('.form-sign-in-to-tenviz-btn-close');
	let $formSignTenvizHereBtn = $formSignTenviz.find('.form-sign-in-to-tenviz .form-sign-in-to-tenviz-here-btn');
	//***end form-sign-in-to-tenviz***

	//***form-get-in-touch-with-us***
	let $formGetInTouchWithUs = $landingPageContainer.find('.form-get-in-touch-with-us-section');
	let $formGetInTouchWithUsBtnClose = $formGetInTouchWithUs.find('.form-get-in-touch-with-us-btn-close');
	let $formGetInTouchWithUsBtnOpen = $landingPageContainer.find('.form-get-in-touch-with-us-btn-open');
	//***end form-get-in-touch-with-us***

	//***container-enlarging-img***
	let $containerEnlargingImg = $landingPageContainer.find('.container-enlarging-img');
	let $imageEnlargementTtems = $landingPageContainer.find('img.image-enlargement-item');
	let $blockEnlargingImg = $containerEnlargingImg.find('.block-enlarging-img');
	//***end container-enlarging-img***
	//***END DOM ELEMENTS****

	//******EVENT********
	//***container-enlarging-img event***
	$imageEnlargementTtems.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$blockEnlargingImg.empty();
		$blockEnlargingImg.append(`<img src="${e.target.dataset.src}" alt="img">`);
		$containerEnlargingImg.removeClass('hidden');
	});

	$blockEnlargingImg.click(function(e) {
		console.log(e)
		e.preventDefault();
		e.stopPropagation();
		$containerEnlargingImg.addClass('hidden');
	});
	//***end container-enlarging-img event***

	//***form-sign-up-now event***
	$formSignUpNowBtnClose.click(function(e) {
		$formSignUpNow.addClass('hidden');
	});

	$startFreeTrialBtnBannerTop.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$formSignUpNow.removeClass('hidden');
	});

	$formSignUpNowSignInBtn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$formSignUpNow.addClass('hidden');
		$formSignTenviz.removeClass('hidden');
	});
	//***end form-sign-up-now event***

	//***form-sign-in-to-tenviz event***
	$lpHeaderNavLogin.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$formSignTenviz.removeClass('hidden');
	});

	$formSignTenvizBtnClose.click(function(e) {
		$formSignTenviz.addClass('hidden');
	});

	$formSignTenvizHereBtn.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$formSignUpNow.removeClass('hidden');
		$formSignTenviz.addClass('hidden');
	});
	//***end form-sign-in-to-tenviz event***

	//***form-get-in-touch-with-us event***
	$formGetInTouchWithUsBtnClose.click(function(e) {
		$formGetInTouchWithUs.addClass('hidden');
	});

	$formGetInTouchWithUsBtnOpen.click(function(e) {
		e.preventDefault();
		e.stopPropagation();
		$formGetInTouchWithUs.removeClass('hidden');
	});
	//***end form-get-in-touch-with-us event***
	//******END EVENT********

	//*****Smooth scrolling to the anchor*****
	var $page = $('html, body');
	$('.lp-header-nav a[href*="#"]').click(function(e) {
		if(e.target.dataset.class !== 'lp-header-nav-login' &&
				e.target.dataset.class !== 'lp-header-nav-contact-us') {
			$page.animate({
				scrollTop: $($.attr(this, 'href')).offset().top -= $('header')[0].offsetHeight
			}, 400);
			return false;
		};
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
