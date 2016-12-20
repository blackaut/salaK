/**
 * Author:
 * Fabz
 */

// require("./libs/skrollr");
// require("./libs/picturefill");

// Create a closure to maintain scope of the '$' and FBZ
;(function(FBZ, $) {

		$(window).load(function() {

		});


	$(function() {

		// initial functions 
		FBZ.control.readFromGoogleDocs();
		FBZ.control.determineSection();
		FBZ.control.onResizeStage();
		FBZ.control.defineStage();
		FBZ.control.resizeContentBlock();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 

		windowH	: 0, //browser screen 
		windowW	: 0,
		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		stateObj : {},
		currentSection : "home",
		currentArticule : "",
		currentSectionIndex : 0,
		i18n : null,
		noBrain : {},
		currentLang:"es",
		months : ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"],
		$selectedform : {},
		// js detection
		mobileMode:false,
		tabletMode:false,
		desktopMode:false,
		// value holders
		swapToMobileBreakpoint:420,
		swapToTabletBreakpoint:1024,
		date : new Date(),
		dropdown : ""

	};

	FBZ.view = {

		// add dom elements here
		$stage 				:$(window),
		$header				:$('header'),
		$main				:$('.main'),
		$block				:$('.block'),
		$langBtn			:$('.lang-btn'),
		$footer				:$('footer'),
		$leftContainer 		:$('.left-container'),
		$siteMenu			:$('.site-menu'),
		$address			:$('address'),
		$centralContainer 	:$('.central-container'),
		$rightContainer		:$('.right-container'),
		dropdownCartelera	: document.getElementById("dropdown-cartelera"),
		$bgPicture			:$('.bg-picture')
	},


	FBZ.control = {
		// add function here
		init : function () {
			console.debug('FabzOff is running');
			FBZ.control.getTime();

			FBZ.control.populateLeftContainer();
			FBZ.control.populateCentralContainer();
			FBZ.control.populateRightContainer();
			FBZ.control.populateBackground();

		},



		displayMovies : function () {

			console.log("displayMovies");
		},

		createCarteleraDropdown: function () {

			FBZ.model.centralContainer = ""; 

			FBZ.model.dropdown = 
			"<div class='dropdown-container'>"+
				"<div class='dropdown'>"+
								"<button onclick='FBZ.control.activateCarteleraDropdown()' class='dropbtn'>"+FBZ.control.getMonthString(FBZ.model.date.getMonth())+"</button>"+
								"<div id='dropdown-cartelera' class='dropdown-content'>"+
									"<a href='"+FBZ.control.displayMovies(FBZ.model.date.getMonth()+1)+"'>"+FBZ.control.getMonthString(FBZ.model.date.getMonth()+1)+"</a>"+
									"<a href='"+FBZ.control.displayMovies(FBZ.model.date.getMonth()+2)+"'>"+FBZ.control.getMonthString(FBZ.model.date.getMonth()+2)+"</a>"+
									"<a href='"+FBZ.control.displayMovies(FBZ.model.date.getMonth()+3)+"'>"+FBZ.control.getMonthString(FBZ.model.date.getMonth()+3)+"</a>"+
								"</div>"+
							"</div>"+
						"</div>";

			FBZ.view.$centralContainer.append(FBZ.model.dropdown);



			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.cartelera.elements.length ; i ++ ) { 
//				
				console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
    				// key: the name of the object key
				// console.log(key,index);
				if(FBZ.model.noBrain.cartelera.elements[i].Privacidad != "PRIVADO") {  
				
				FBZ.model.centralContainer += 

					"<div class='cartelera-block'>"+
				 		"<picture class='cartelera-imagen'>"+
							"<source srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_S+"' media='(max-width: 320px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_M+"' media='(max-width: 650px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_L+"' media='(max-width: 900px)'/>"+
							"<img srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_M+"' alt='"+FBZ.model.noBrain.cartelera.elements[i].Titulo+"-imagen'/>"+
						"</picture>"+
						"<h2 class='cartelera-titulo'>"+FBZ.model.noBrain.cartelera.elements[i].Titulo+"</h2>"+
						"<h3 class='cartelera-director'>"+FBZ.model.noBrain.cartelera.elements[i].Director+"</h3>"+
						"<p class='cartelera-ano'>"+FBZ.model.noBrain.cartelera.elements[i].Ano+"</p>"+
						"<p class='cartelera-pais'>"+FBZ.model.noBrain.cartelera.elements[i].Pais+"</p>"+
						"<p class='cartelera-duracion'>"+FBZ.model.noBrain.cartelera.elements[i].Duracion+"</p>"+
						"<p class='cartelera-fecha'>"+FBZ.model.noBrain.cartelera.elements[i].Fecha+"</p>"+
						"<p class='cartelera-hora'>"+FBZ.model.noBrain.cartelera.elements[i].Hora+"</p>"+
						"<p class='cartelera-sinopsis'>"+FBZ.model.noBrain.cartelera.elements[i].Sinopsis+"</p>"+
						"<p class='cartelera-invitado'>"+FBZ.model.noBrain.cartelera.elements[i].Invitado+"</p>"+
					"</div><!--end cartelera block-->";
				}

			}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

		},

		getMonthString : function(index) {
			if(index > 11 ) {
				index -=12;
			}
			console.log(index, FBZ.model.months[index]);
			return FBZ.model.months[index];
		},

		activateCarteleraDropdown : function  () {

			FBZ.view.dropdownCartelera	= document.getElementById("dropdown-cartelera");

			FBZ.view.dropdownCartelera.classList.toggle("show");

			// Close the dropdown menu if the user clicks outside of it
			window.onclick = function(event) {
			  if (!event.target.matches('.dropbtn')) {

			    var dropdowns = document.getElementsByClassName("dropdown-content");
			    var i;
			    for (i = 0; i < dropdowns.length; i++) {
			      var openDropdown = dropdowns[i];
			      if (openDropdown.classList.contains('show')) {
			        openDropdown.classList.remove('show');
			      }
			    }
			  }
			}
		},

		getTime : function () {

				// getDate()	Get the day as a number (1-31)
				// getDay()	Get the weekday as a number (0-6)
				// getFullYear()	Get the four digit year (yyyy)
				// getHours()	Get the hour (0-23)
				// getMilliseconds()	Get the milliseconds (0-999)
				// getMinutes()	Get the minutes (0-59)
				// getMonth()	Get the month (0-11)
				// getSeconds()	Get the seconds (0-59)
				// getTime()	Get the time (milliseconds since January 1, 1970)
				console.log(FBZ.model.date.getDate());
		},


		detectPlatform : function () {

			console.log("js platform detection : ");
			if(FBZ.model.stageW < FBZ.model.swapToMobileBreakpoint) {

				console.log("mobile");
				// boolean to control the vertical positioning
				FBZ.model.mobileMode = true;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = false;

			// if this brakpoint condition is met display the tablet mode	
			}else if(FBZ.model.stageW < FBZ.model.swapToTabletBreakpoint) { 

				console.log("tablet");

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = true;
				FBZ.model.desktopMode = false;

			}else {

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = true;

				console.log("desktop");

			}

		},

		removeLoadingCurtain : function() { 
			FBZ.control.fadeHide($(".curtain"));
		},

		determineSection : function () { 
			// this function determines the current page and assign it to a string

			var section = window.location.href.split("/");

			// console.log("section length :",section.length);

			if ( section.length <= 4 ) {

					FBZ.model.currentSection = "home";

			} else {
					FBZ.model.currentSection  = section[section.length-2];
			}

			FBZ.model.currentArticule  = section[section.length-1];
			//console.log(FBZ.model.currentSection);
		}, 

		sectionMonitor : function (index) { 

			FBZ.control.determineSection();
			FBZ.model.currentSectionIndex = index;
		},

		animate : function (element,animClass) {

				if(element.hasClass("is-hidden")) {
					element.removeClass("is-hidden");
				}
				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);
		},

		animateAndHide : function (element,animClass,time) {

				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);

				setTimeout(function(){ 
					element.addClass("is-hidden");
				}, time);
		},
		parseBrain : function () {

			// triggers the init func
			FBZ.control.init();
			// FBZ.control.multilingualEngine(); 
			FBZ.control.removeLoadingCurtain();
			//FBZ.control.updateLanguage();
		},

		fadeHide : function (el) { 

			el.addClass("is-fading-out");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-fading-out");
			}, 701);
		},

		fadeShow : function (el) { 

			el.addClass("is-fading-in");
			el.removeClass("is-hidden");

			setTimeout(function(){ 

				el.removeClass("is-fading-in");
			}, 701);
		},


		readFromGoogleDocs : function () { 

			// https://docs.google.com/spreadsheets/d/1s7zqcKC7JnDC2gs0vhCyeJQXgyzTzbUhl-e8ED59xFU/pubhtml

			Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1s7zqcKC7JnDC2gs0vhCyeJQXgyzTzbUhl-e8ED59xFU/pubhtml',
				callback: function(data, tabletop) { 
					console.dir(data) 
					FBZ.model.noBrain = data;
					FBZ.control.parseBrain();
				} } )
		},



		getHeight : function (obj) {

			var value = obj.height();
			return value;
		},

		getWidth : function(obj) {

			var value = obj.width();
			return value;
		},
		defineStage : function ( ) { 

			FBZ.model.stageH = FBZ.control.getHeight(FBZ.view.$stage);
			FBZ.model.stageW = FBZ.control.getWidth(FBZ.view.$stage);
			FBZ.control.detectPlatform();

		//	console.log("def stage", FBZ.model.stageH, FBZ.model.stageW );

		},

		// function to trigger when you resize stage
		onResizeStage : function ()  { 

			$(window).resize(function() {
				// to re - resize the layout . 
				FBZ.control.defineStage();
				FBZ.control.resizeContentBlock();

			}.debounce(150));

		},

		resizeContentBlock : function () { 
			FBZ.view.$block.css("width",FBZ.model.stageW);
			FBZ.view.$block.css("height",FBZ.model.stageH);
		},

		toCamelCase: function (str){
			return str.toLowerCase().replace(/(\-[a-z])/g, function($1){
				return $1.toUpperCase().replace('-','');
			});
		},

		setCss3Style: function (el,prop,val){

			var vendors = ['-moz-','-webkit-','-o-','-ms-','-khtml-',''];

			for(var i=0,l=vendors.length;i<l;i++)
				{
					var p = FBZ.control.toCamelCase(vendors[i] + prop);
					if(p in el.style)
						el.style[p] = val;
				}
		},

///  SALA K Programming
		populateBackground :  function () { 

			FBZ.model.background;
			var month = FBZ.model.date.getMonth();

			if (FBZ.model.mobileMode) {
				FBZ.model.background = FBZ.model.noBrain.fondo.elements[month].Imagen_S;
			} else if (FBZ.model.tabletMode) {
				FBZ.model.background = FBZ.model.noBrain.fondo.elements[month].Imagen_M;
			} else {
				FBZ.model.background = FBZ.model.noBrain.fondo.elements[month].Imagen_L;
			}

			console.log("holiiii");
			FBZ.view.$bgPicture.css("background-image", "url("+FBZ.model.background+")");  

		}, 


		populateLeftContainer :  function () { 

			FBZ.view.$leftContainer;

			FBZ.model.currentAddress = FBZ.model.noBrain.contacto.elements[0].Direccion;
			// console.log(FBZ.model.currentAddress);
			FBZ.view.$address.append(FBZ.model.currentAddress);

				// console.log("left left-container")
				// console.log(FBZ.model.noBrain);
				// <a class='menu-btn' href='/#cartelera'>CARTELERA</a>

		},


		populateCentralContainer :  function () { 

			FBZ.control.createCarteleraDropdown();
		
			// FBZ.control.activateCarteleraDropdown();


		},

		populateRightContainer :  function () { 

			FBZ.view.$rightContainer;

			FBZ.model.rightContainer = ""; 

			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.eventos.elements.length ; i ++ ) { 
//				
					// console.log(FBZ.model.noBrain.eventos.elements[i]);
				
    // 				// key: the name of the object key
				// // console.log(key,index);
				if(FBZ.model.noBrain.eventos.elements[i].Privacidad != "PRIVADO") {  
				
				FBZ.model.rightContainer += 																			
					"<div class='eventos-block' articulo-URL='"+FBZ.model.noBrain.eventos.elements[i].URL_articulo+"'>"+
				 		"<picture class='eventos-imagen'>"+
							"<img srcset='"+FBZ.model.noBrain.eventos.elements[i].Imagen_avatar+"' alt='"+FBZ.model.noBrain.eventos.elements[i].nombre+"-imagen'/>"+
						"</picture>"+
						"<h2 class='eventos-nombre'>"+FBZ.model.noBrain.eventos.elements[i].Nombre+"</h2>"+
						"<h3 class='eventos-fecha'>"+FBZ.model.noBrain.eventos.elements[i].Fecha+"</h3>"+
						"<p class='eventos-hora'>"+FBZ.model.noBrain.eventos.elements[i].Ano+"</p>"+
						"<p class='descripcion-corta'>"+FBZ.model.noBrain.eventos.elements[i].Descripcion_corta+"</p>";
				}

			}

			FBZ.view.$rightContainer.append(FBZ.model.rightContainer);

		},


		//	console.log("populatecartelera");

// 			FBZ.model.totalAmountOfProjects  = FBZ.model.noBrain.Projects.elements.length;
// 			 /// ,this is an injection of content coming from the no brain 
// //			console.log(FBZ.model.noBrain.Projects.elements.length);
// 			for ( var i = 0 ; i < FBZ.model.noBrain.Projects.elements.length ; i ++ ) { 
// //				console.log(FBZ.model.noBrain.Projects.elements[i]);
// 				if(FBZ.model.noBrain.Projects.elements[i].Privacy != "PRIVATE") {  

// 					var link = FBZ.model.noBrain.Projects.elements[i].URL;
// 					if(link != "") {  
// 						link = "<a class='project-link is-hidden' href='"+link+"' target='_blank'><img class='web-icon-link' src='../assets/img/web_icon.svg' alt='web_icon'/>"+FBZ.model.noBrain.Projects.elements[i].URL+"</a>";
// 					}
// 				FBZ.view.$projectsCardHolder.append(

// 						"<div class='project-card'>"+ 

// 											"<h3  class='project-name'><span class='close-dash is-hidden'>–</span><span data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Name+"</span></h3>"+
// 											"<div class='project-image is-hidden'>"+
// 											FBZ.model.noBrain.Projects.elements[i].Image+"</div>"+
// 											// "<div class='project-text-wrapper is-hidden'>"+
// 										"<h3 data-translatable class='project-client is-hidden'>"+FBZ.model.noBrain.Projects.elements[i].Client +"</h3>"+
// 											"<p class='project-date is-hidden'>"+ FBZ.model.noBrain.Projects.elements[i].StartDate+"</p>"+
// 											"<p class='project-description is-hidden' data-translatable>"+FBZ.model.noBrain.Projects.elements[i].Description+"</p>"+
// 											link+
// 											// "</div><!--end project text-wrapper-->"+
// 											"<div class='project-keywords is-hidden'>"+FBZ.model.noBrain.Projects.elements[i].Keywords+"<span></span></div>"+
// 										"</div><!--end project card-->");
// 				}
// 			}
// 			// to activate accordeon.

	};

})(window.FBZ = window.FBZ || {}, jQuery);

// multilingual support obj
var i18n;

// debounce prototype
Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

