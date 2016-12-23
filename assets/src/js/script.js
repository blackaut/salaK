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
		FBZ.control.activateMenu();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 

		windowH	: 0, //browser screen 
		windowW	: 0,
		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		stateObj : {},
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
		dropdown : "",
		currentSection : "#cartelera",
		slideshowDescription : [],
		clock: {},
		time: 5000,
		currentImage:0,
		totalImage:0,


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
		$btnMenu			:$('.menu-btn'),
		$address			:$('address'),
		$mailto				:$('.mailto'),
		$telephone			:$('.telephone'),
		$socialBlock		:$('.social-block'),
		$centralContainer 	:$('.central-container'),
		$rightContainer		:$('.right-container'),
		dropdownCartelera	: document.getElementById("dropdown-cartelera"),
		$bgPicture			:$('.bg-picture')
	},


	FBZ.control = {
		// add function here
		init : function () {
			console.debug('SALA K is running');
			FBZ.control.getTime();
			FBZ.control.populateLeftContainer();
			FBZ.control.populateCentralContainer();
			FBZ.control.populateRightContainer();
			FBZ.control.populateBackground();

		},

		activateMenu : function () {

			FBZ.view.$btnMenu.on("click",FBZ.control.displayCategory);

		},

		displayCategory : function (e) {
			// e.preventDefault();
			FBZ.model.currentSection = e.currentTarget.hash;
			FBZ.control.hideSections();
			FBZ.control.fadeShow(FBZ.view.$centralContainer);

			switch (FBZ.model.currentSection) {
				case "#cartelera": 
					FBZ.control.displayCartelera();
				break;
				case "#eventos":
					FBZ.control.displayEventos();
				break;
					case "#salaK":
					FBZ.control.displaySalaK();
				break;
				case "#nosotros":
					FBZ.control.displayNosotros();
				break;
				case "#contacto":
					FBZ.control.displayContacto();
				break;
			}

		},

		displayMovies : function () {

			console.log("displayMovies");
		},


		displayCartelera : function () {

			FBZ.control.createCartelera();
			console.log("displayCartelera");
		},


		displayEventos : function () {

			console.log("displayEventos");
			FBZ.control.createEventos();

		},

		displaySalaK : function () {

			console.log("displaySalaK");
			FBZ.control.createSalaK();
		},

		displayNosotros : function () {

			console.log("displayNosotros");
			FBZ.control.createNosotros();
		},

		displayContacto : function () {

			console.log("displayContacto");
			FBZ.control.createContacto();
		},

		hideSections : function () {
			FBZ.view.$centralContainer.children().remove(); 
		},

		createCartelera: function () {

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
				// console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
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
						"<h2 class='cartelera-titulo '>"+FBZ.model.noBrain.cartelera.elements[i].Titulo+"</h2>"+
						"<p class='cartelera-ano line_after'>"+FBZ.model.noBrain.cartelera.elements[i].Ano+"  </p>"+
						"<h3 class='cartelera-director line_after'> "+FBZ.model.noBrain.cartelera.elements[i].Director+"  </h3>"+
						"<p class='cartelera-pais'>"+FBZ.model.noBrain.cartelera.elements[i].Pais+"</p>"+
						"<br>"+
						"<p class='cartelera-fecha line_after'>"+FBZ.model.noBrain.cartelera.elements[i].Fecha+"  </p>"+
						"<p class='cartelera-hora'>"+FBZ.model.noBrain.cartelera.elements[i].Hora+"</p>"+
						"<p class='cartelera-duracion'>"+FBZ.model.noBrain.cartelera.elements[i].Duracion+"</p>"+
						"<p class='cartelera-sinopsis'>"+FBZ.model.noBrain.cartelera.elements[i].Sinopsis+"</p>"+
						"<p class='cartelera-invitado'>"+FBZ.model.noBrain.cartelera.elements[i].Invitado+"</p>"+
					"</div>";
				}
			}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

		},

		createEventos: function () {

			FBZ.model.centralContainer = ""; 

			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.eventos.elements.length ; i ++ ) { 
//				
				// console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
    				// key: the name of the object key
				// console.log(key,index);
				if(FBZ.model.noBrain.cartelera.elements[i].Privacidad != "PRIVADO") {  
				

				FBZ.model.centralContainer += 

					"<div class='eventos-block-big'>"+
				 		"<picture class='eventos-imagen'>"+
							"<source srcset='"+FBZ.model.noBrain.eventos.elements[i].Imagen_S+"' media='(max-width: 320px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.eventos.elements[i].Imagen_M+"' media='(max-width: 650px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.eventos.elements[i].Imagen_L+"' media='(max-width: 900px)'/>"+
							"<img srcset='"+FBZ.model.noBrain.eventos.elements[i].Imagen_M+"' alt='"+FBZ.model.noBrain.eventos.elements[i].Titulo+"-imagen'/>"+
						"</picture>"+
						"<h2 class='eventos-titulo'>"+FBZ.model.noBrain.eventos.elements[i].Nombre+"</h2>"+
						"<h3 class='eventos-fecha'>"+FBZ.model.noBrain.eventos.elements[i].Fecha+"</h3>"+
						"<p class='eventos-hora'>"+FBZ.model.noBrain.eventos.elements[i].Hora+"</p>"+
						"<p class='eventos-descripcion-larga'>"+FBZ.model.noBrain.eventos.elements[i].Descripcion_larga+"</p>"+
					"</div>";
				}
			}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

		},

		createSalaK: function () {

			FBZ.model.centralContainer = ""; 
			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.salaK.elements.length ; i ++ ) { 
//				
				// console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
    				// key: the name of the object key
				// console.log(key,index);
				FBZ.model.centralContainer += 

					"<div class='salak-block'>"+
				 		"<div class='salaK-slideshow'></div>"+
					"<h2 class='salaK-titulo'>"+FBZ.model.noBrain.salaK.elements[i].Titulo+"</h2>"+
						"<p class='salaK-descripcion'>"+FBZ.model.noBrain.salaK.elements[i].Descripcion+"</p>"+
						"<div class='salaK-logos'></div>"+
					"</div>";
				}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

			// to populate slideshow
			FBZ.view.salaKSlideshow = $(".salaK-slideshow");

			FBZ.view.salaKSlideshow.append(
				"<div class='slider-control slider-home-control'></div>"
			);

			
			FBZ.view.sliderControl = $(".slider-home-control");

			FBZ.model.slideshow = "";
			FBZ.model.slideshowControl = "";


			for ( var i = 0 ; i < FBZ.model.noBrain.slideshow_salaK.elements.length ; i ++ ) { 
//				
				FBZ.model.slideshow += "<picture class='slideshow-imagen'>"+
							"<source srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_S+"' media='(max-width: 320px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_M+"' media='(max-width: 650px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_L+"' media='(max-width: 900px)'/>"+
							"<img srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_M+"' alt='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_descripcion+"-imagen'/>"+
						"</picture>";

				FBZ.model.slideshowDescription.push(FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_descripcion);
				
				FBZ.model.slideshowControl += "<div class='slider-dot'></div>";
			}

			FBZ.view.salaKSlideshow.append(FBZ.model.slideshow);

			FBZ.view.sliderControl.append(FBZ.model.slideshowControl);

			FBZ.control.createSliderControl();
// 			populate logos 
			FBZ.view.salaKLogos = $(".salaK-logos");
			FBZ.model.logos = "";

			for ( var i = 0 ; i < FBZ.model.noBrain.logos.elements.length ; i ++ ) { 
//				
				FBZ.model.logos += "<a class='salak-logos' target='_blank' href='"+FBZ.model.noBrain.logos.elements[i].Link+"'>"+
										"<img class='logo-small' src="+FBZ.model.noBrain.logos.elements[i].Logo+" alt="+FBZ.model.noBrain.logos.elements[i].Titulo+">"+
									"</a>";
			}
			FBZ.view.salaKLogos.append(FBZ.model.logos);

		},


/// slider stuff 

		createInterval : function () { 
			 FBZ.model.clock = setInterval( function() 
		{
	//			console.log("interval");
				FBZ.control.playSlider();
        }, FBZ.model.time);
		}, 

		deleteInterval : function () { 
			clearInterval(FBZ.model.clock);
		},
		createSliderControl : function () {
			//FBZ.slider.currentImage = 0;
			FBZ.model.totalImage  = FBZ.view.sliderControl.children().length-1;
			console.log("	FBZ.slider.totalImage ",	FBZ.model.totalImage );
			$(".slider-dot").on("click",FBZ.control.onDotClick);
			FBZ.control.changeImageToIndex(FBZ.model.currentImage);
			FBZ.control.createInterval();
			FBZ.view.$btnMenu.on("click",FBZ.control.deleteIntervalOnClick);
		},

		deleteIntervalOnClick : function () {

			FBZ.view.$btnMenu.off("click",FBZ.control.deleteIntervalOnClick);
			FBZ.control.deleteInterval();

		},


		onDotClick : function (e) {

			console.log($(e.currentTarget).index());
			FBZ.control.changeImageToIndex($(e.currentTarget).index());
			FBZ.control.deleteInterval();
		},

		changeImageToIndex : function (index) {

			FBZ.view.salaKSlideshow.children().removeClass("active");
			FBZ.view.sliderControl.children().removeClass('active');
			$(FBZ.view.salaKSlideshow.children().get(index)).addClass('active');
			$(FBZ.view.sliderControl.children().get(index)).addClass('active');

		},

		playSlider: function () { 

			console.log(FBZ.model.currentImage, FBZ.model.totalImage);
			if(FBZ.model.currentImage < FBZ.model.totalImage) { 
				FBZ.model.currentImage ++;
			}else { 

				FBZ.model.currentImage = 0;
			}
				FBZ.control.changeImageToIndex(FBZ.model.currentImage);

	},

		createNosotros: function () {

			FBZ.model.centralContainer = ""; 
			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.nosotros.elements.length ; i ++ ) { 
//				
				// console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
    				// key: the name of the object key
				// console.log(key,index);
				FBZ.model.centralContainer += 

					"<div class='nosotros-block'>"+
					"<h2 class='nosotros-titulo'>"+FBZ.model.noBrain.nosotros.elements[i].Titulo+"</h2>"+
						"<p class='nosotros-descripcion'>"+FBZ.model.noBrain.nosotros.elements[i].Descripcion+"</p>"+
						"<div class='nosotros-logos'></div>"+
					"</div>";
				}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

		},


		createContacto: function () {

			FBZ.model.centralContainer = ""; 
			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.nosotros.elements.length ; i ++ ) { 
//				
				// console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
    				// key: the name of the object key
				// console.log(key,index);
					FBZ.model.centralContainer += "<iframe src='http://eepurl.com/bTgx0b'></iframe>";

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

			FBZ.view.$bgPicture.css("background-image", "url("+FBZ.model.background+")");  

		}, 


		populateLeftContainer :  function () { 

			FBZ.view.$leftContainer;

			FBZ.model.currentAddress = "<a target='_blank' href='https://maps.google.com/?q=Condell 1307, Providencia&t=m'>"+
     									"<img class='icon-location' src='http://salak.cl/assets/img/location.svg'/>"+
       									FBZ.model.noBrain.contacto.elements[0].Direccion+
       									"</a>";
			FBZ.model.currentEmailAddress = "<a href='mailto:"+FBZ.model.noBrain.contacto.elements[0].Mail+"'>"+FBZ.model.noBrain.contacto.elements[0].Mail +"</a>";
			FBZ.model.currentTelephoneAddress = "<a href='tel:"+FBZ.model.noBrain.contacto.elements[0].Fono+"'>"+FBZ.model.noBrain.contacto.elements[0].Fono +"</a>";
			// console.log(FBZ.model.currentAddress);


			FBZ.model.socialNetworks = ""; 
			// Object.keys(FBZ.model.noBrain.cartelera.elements[0]).forEach(function(key,index) {
    		for ( var i = 0 ; i < FBZ.model.noBrain.redes.elements.length ; i ++ ) { 
//				
				// console.log(FBZ.model.noBrain.cartelera.elements[i]);
				
    				// key: the name of the object key
				// console.log(key,index);
				FBZ.model.socialNetworks += 
					"<a class='social-link' target='_blank' href='"+FBZ.model.noBrain.redes.elements[i].Link+"' alt='"+FBZ.model.noBrain.redes.elements[i].Nombre+"'>"+
						"<img src='"+FBZ.model.noBrain.redes.elements[i].Icono_svg+"'/>"+
					"</a>";
				}

			FBZ.view.$socialBlock.append(FBZ.model.socialNetworks);




			FBZ.view.$mailto.append(FBZ.model.currentEmailAddress);
			FBZ.view.$telephone.append(FBZ.model.currentTelephoneAddress);
			FBZ.view.$address.append(FBZ.model.currentAddress);

				// console.log("left left-container")
				// console.log(FBZ.model.noBrain);
				// <a class='menu-btn' href='/#cartelera'>CARTELERA</a>

		},


		populateCentralContainer :  function () { 

			FBZ.control.createCartelera();
		
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
					"<a class='eventos-block-big' href='#"+FBZ.model.noBrain.eventos.elements[i].URL_articulo+"'>"+
				 		"<picture class='eventos-imagen'>"+
							"<img srcset='"+FBZ.model.noBrain.eventos.elements[i].Imagen_S+"' alt='"+FBZ.model.noBrain.eventos.elements[i].nombre+"-imagen'/>"+
						"</picture>"+
						"<h2 class='eventos-nombre'>"+FBZ.model.noBrain.eventos.elements[i].Nombre+"</h2>"+
						"<h3 class='eventos-fecha'>"+FBZ.model.noBrain.eventos.elements[i].Fecha+"</h3>"+
						"<p class='eventos-hora'>"+FBZ.model.noBrain.eventos.elements[i].Hora+"</p>"+
						"<p class='descripcion-corta'>"+FBZ.model.noBrain.eventos.elements[i].Descripcion_corta+"</p>"+
						"</a>"
						;
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

