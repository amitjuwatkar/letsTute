$(document).ready(function(){

				  //Owl Carousel Script

				  var owl = $('.owl-carousel');

				  owl.owlCarousel({

				  	margin: 15,

				  	nav: true,

				  	navText: [

				  	"<i class='fa fa-chevron-left'></i>",

				  	"<i class='fa fa-chevron-right'></i>"],

				  	autoplay: true,

				  	loop: true,

				  	responsive: {

				  		0: {

				  			items: 1

				  		},

				  		600: {

				  			items: 2

				  		},

				  		800: {

				  			items: 3

				  		},

				  		1000: {

				  			items: 5

				  		}

				  	}

				  });

				});