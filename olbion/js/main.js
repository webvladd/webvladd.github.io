window.onload = function() {
	// Preloader
	function stopPreloader() {
		setTimeout( function() {
			if (!getEssence('.preloader').classList.contains('hide_lode')) {
				getEssence('.preloader').classList.add('hide_lode');
			}
		}, 5);
	}
	stopPreloader();

	// loading graphics
	(function(){var c=document.getElementById("maanimo-widget_crypto-currency-chart_style_swap");c.innerHTML='<ifr'+'ame src="//maanimo.com/widget/crypto?'+c.id+'='+encodeURIComponent(c.innerHTML.split('<scr')[0])+'" scrolling="no" frameborder="0" style="width:100%;height:100%;"></ifr'+'ame>';})();

	// getEssence
	function getEssence (arg) {
		return document.querySelector(arg);
	};	
	
	// Pop-up
	function popUpBehavior() {
	 	getEssence('.login_form_popup').classList.toggle('active_popup');
	 };

	getEssence('.register_btn').onclick = function(arg) {
		arg.preventDefault();
		popUpBehavior();
	};

	getEssence('.form_popup_cancel_btn').onclick = function(arg) {
		arg.preventDefault();
		popUpBehavior();
	};

	getEssence('.login_form_popup').onclick = function(arg) {
		arg.preventDefault();
		popUpBehavior();
	};

	getEssence('.form_popup_wrapper').onclick = function(arg) {
		 arg.stopPropagation();
	};

	// Mobile navigation
	function mobMenuBehavior() {
		getEssence('.nav_open_btn').classList.toggle('mobile_nav_active');
		getEssence('.nav_open_btn').classList.toggle('mobile_nav_inactive');
		getEssence('.nav_cancel_btn').classList.toggle('mobile_nav_inactive');
		getEssence('.nav_cancel_btn').classList.toggle('mobile_nav_active');
		getEssence('.header_navigation').classList.toggle('mobile_nav_buttons');
	};

	getEssence('.nav_open_btn').onclick = function(arg) {
		arg.preventDefault();
		mobMenuBehavior();
	};

	getEssence('.nav_cancel_btn').onclick = function(arg) {
		arg.preventDefault();
		mobMenuBehavior();
	};

	// Language selection menu
	function changeLanguage() {
		if (!getEssence('.languages_drop_down').classList.contains('lang_drop_active')) {
			getEssence('.languages_drop_down').classList.add('lang_drop_active');
		} else {
			getEssence('.languages_drop_down').classList.remove('lang_drop_active');
		};
	};

	getEssence('.language_page_now').onclick = function(arg) {
		arg.preventDefault();
		changeLanguage();
	};
};