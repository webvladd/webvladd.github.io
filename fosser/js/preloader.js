window.onload = function() {
	setTimeout( function() {
		var preloader = document.querySelector('.preloader');
		if (!preloader.classList.contains('hide_lode')) {
			preloader.classList.add('hide_lode');
		}
	}, 5);
 };