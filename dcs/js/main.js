$(document).ready(function(){

	// Параметры слайдера:
	$('.laundri_salon_slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
	});

	$('.our_partners_slider').slick({
		slidesToShow: 6,
		slidesToScroll: 6,
		autoplay: true,
		autoplaySpeed: 5000,
		dots: true,
		arrows: false,
		responsive: [
	    {
	      breakpoint: 1150,
		      settings: {
		        slidesToShow: 5,
		        slidesToScroll: 5,
		      }
	    	},

	    	{
	      breakpoint: 900,
		      settings: {
		        slidesToShow: 4,
		        slidesToScroll: 4,
		      }
	    	},

	    	{
	      breakpoint: 750,
		      settings: {
		        slidesToShow: 3,
		        slidesToScroll: 3,
		      }
	    	},

	    	{
	      breakpoint: 500,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2,
		      }
	    	},	   
	  	] 
	});

	// Параметры валидации:

	$('#form_request_call').validate({
		// Перечисляем поля который хотим валидирывать
		rules: {
			form_name: {
				 required: true,
				 minlength: 2,
			},

			form_phone: {
				 required: true,
				 digits: true,
				 minlength: 10
			}
		},

		messages: {
			form_name:{
				required: "Поле обязательное для заполнения",
				minlength: "Поле должно содержать не менее двух букв",
			},

			form_phone: {
				required: "Поле обязательное для заполнения",
				minlength: "Поле должно содержать не менее десяти цифр, <br/> без пробелов и скобок",
				digits: "Поле должено состоять только из цифр, от 0 до 9"
			}
		},

		focusInvalid: false,
		focusCleanup: true,		
		onfocusout: true
	});

	$('#open_popap').validate({
		rules: {
			name: {
				 required: true,
				 minlength: 2,
			},

			phone: {
				 required: true,
				 digits: true,
				 minlength: 10
			},
		},
		messages: {
			name:{
				required: "Поле обязательное для заполнения",
				minlength: "Поле должно содержать не менее двух букв",
			},

			phone:{
				required: "Поле обязательное для заполнения",
				minlength: "Поле должно содержать не менее десяти цифр, <br/> без пробелов и скобок",
				digits: "Поле должено состоять только из цифр, от 0 до 9"
			}
		},

		focusInvalid: false,
		focusCleanup: true,		
		onfocusout: true
		
	});

	// Стили формы:
	$('select').styler();

	// Popap:
	$('.form_submit_application').magnificPopup();	

	// Открываем выпадающзее меню:

	$('.open_nav_btn').click(function(arg){
		arg.preventDefault();
     $('nav').addClass('popap_active');
     $('.open_nav').addClass('open_nav_activ');
	});

	$('.close_nav_btn').click(function(arg){
		arg.preventDefault();
     $('nav').removeClass('popap_active');
     $('.open_nav').removeClass('open_nav_activ');     
	});
	
	new WOW().init();

	// Плавная прокрутка по якорям:
	$('a[href^="#"]').click(function(){
	// Сохраняем значение атрибута href в переменной:
	var target = $(this).attr('href');
	$('html, body').animate({scrollTop: $(target).offset().top}, 1000);
	return false;
	});

	window.addEventListener("scroll", function (e) {
    var scrollTop = $("html, body").scrollTop() || document.body.scrollTop;
    
    $(".wrap_fix_navig").toggleClass("after-scroll", scrollTop > 100);
  });
});