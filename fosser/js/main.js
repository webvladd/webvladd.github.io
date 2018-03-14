$(document).ready(function(){

	// Параметры слайдера:
	$('.slider_banners').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		centerMode: false,
		arrows: false,
		dots: true
	});

	$('.our_production_slider').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		centerMode: false,
		arrows: true,
		responsive: [
	    {
	      breakpoint: 1200,
		      settings: {
		        slidesToShow: 3
		      }
	    	},
	    	{
	      breakpoint: 900,
		      settings: {
		        slidesToShow: 2
		      }
	    	},
	    	{
	      breakpoint: 600,
		      settings: {
		        slidesToShow: 1		        
		      }
	    	},  
	  	] 
	});

	$('.customer_reviews_slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		centerMode: false,
		arrows: true,
		responsive: [
	    {
	      breakpoint: 1150,
		      settings: {
		        slidesToShow: 2
		      }
	    	},
	    	{
	      breakpoint: 750,
		      settings: {
		        slidesToShow: 1		        
		      }
	    	},
	  	]
	});

	function navOpenBtn() {
		$('.nav_open_btn').click(function(e){
			e.preventDefault();
	     $('nav').addClass('activate_navigation');
		});
	};
	navOpenBtn();

	function navCancelBtn() {
		$('.nav_cancel_btn').click(function(e){
			e.preventDefault();
	    $('nav').removeClass('activate_navigation');    
		});
	};
	navCancelBtn();
	
	$('nav a').click(function(e){
    $('nav').removeClass('activate_navigation');    
	});		
	
	(function () {
		var options = {
  		offset: 500
		}

		var fixNnavig = new Headhesive('.wrap_fix_navig', options);
		navOpenBtn();
		navCancelBtn();
	}());	

	// Фиксация при скроле:
	window.addEventListener("scroll", function (e) {
    var scrollTop = $("html, body").scrollTop() || document.body.scrollTop;    
    $(".to_top_btn").toggleClass("to_top_btn_activ", scrollTop > 500);
  });

// Плавная прокрутка по якорям:
	$('a[href^="#"]').click(function(){
		// Сохраняем значение атрибута href в переменной:
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top - 75}, 1000);
		return false;
	});	

	// Эффекты при появлении:
		new WOW().init();
});