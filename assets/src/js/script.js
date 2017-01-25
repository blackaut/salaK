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
		months : ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
		days : ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"],
		$selectedform : {},
		// js detection
		mobileMode:false,
		tabletMode:false,
		desktopMode:false,
		// value holders
		swapToMobileBreakpoint:500,
		swapToTabletBreakpoint:1024,
		date : new Date(),
		dropdown : "",
		currentSection : "#cartelera",
		slideshowDescription : [],
		clock: {},
		time: 10000,
		currentImage:0,
		totalImage:0,
		imagesInDOM:0,
		ifCuandernoKHasNoContent: false,

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
		$bgPicture			:$('.bg-picture'),
		$iconBurger 		:$('.icon-burger'),
		$images 			:$('images'),
	},

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('SALA K is running');
			FBZ.control.populateBackground();
			FBZ.control.getTime();
			FBZ.control.populateLeftContainer();
			FBZ.control.gotoCorrectURL();
			// FBZ.control.masterLoader();
			FBZ.control.checkIfCuadernoK();

		},

		checkIfCuadernoK : function () {

			for ( var i = 0 ; i < FBZ.model.noBrain.cuadernoK.elements.length ; i ++ ) { 

				if(FBZ.model.noBrain.cuadernoK.elements[i].Privacidad != "PRIVADO") {  

					FBZ.model.ifCuandernoKHasNoContent = true; 

				}
			}

			if (!FBZ.model.ifCuandernoKHasNoContent) { 
				FBZ.control.hideCuadernoK()
			} 
		},

		hideCuadernoK : function () {
			$(".cuadernoK").hide();
		}, 

		masterLoader : function (container) {

			FBZ.view.images = $(container).find("img");
			var source = $(container).find("source");

			source.each(function( index,element ) {

				element.srcsetSave = element.srcset;
				element.srcset = "#";
				if(!element.complete) {

					$(element).hide();
				}

			});

			FBZ.view.images.each(function( index,element ) {
				element.srcSave = element.src;
				element.src = "#";

			});

			// images.attr("srcset","src-data");
			

			FBZ.control.recursiveLoader();

		},

		recursiveLoader : function () {

			// console.log("recursiveLoader");
			FBZ.view.images[FBZ.model.imagesInDOM].addEventListener('load', FBZ.control.loaded)
			FBZ.view.images[FBZ.model.imagesInDOM].src = FBZ.view.images[FBZ.model.imagesInDOM].srcSave;

			$(FBZ.view.images[FBZ.model.imagesInDOM]).show();

			$(FBZ.view.images[FBZ.model.imagesInDOM]).parent().find("source").each(function( index,element ) {

				element.srcset = element.srcsetSave;

			});


		},
		loaded : function () {

			FBZ.view.images[FBZ.model.imagesInDOM].removeEventListener('load', FBZ.control.loaded)
			// console.log("loaded",FBZ.model.imagesInDOM,FBZ.view.images.length );
			if (FBZ.model.imagesInDOM < FBZ.view.images.length-1) {
				FBZ.model.imagesInDOM ++;
				FBZ.control.recursiveLoader();
			}

		},



			gotoCorrectURL: function () {

			//check if the URL is home and if not go to it. 
			var currentURL = window.location.hash;
			// split it per value so we can work with it 
			var pathArray = window.location.hash.split( '/' );

		//	console.log("the URL : ",currentURL, pathArray , pathArray[0], pathArray[1] );
		//	console.dir(pathArray);
			
			
			if(pathArray.length >= 3 ) { 
				currentURL  = pathArray[0] +"/"+ pathArray[1];		
			}
			// KO.Config.gotoSectionByURL(currentURL);


			if(currentURL !== "") { 

			//	console.log("not initial section");
			//	console.log("currentURL :",currentURL);
				FBZ.control.displayCategory(currentURL);

			} else {

				FBZ.control.displayCategory("#cartelera");
			}
		},

		gotoSectionByURL: function (currentURL) {

			// find the section name match it with the exisitng ones and goes there.
			var sectionURL = currentURL.replace(/^.*#!/,'');
			var matchedNumber;
				for(var i=0 ; i < KO.Config.$sectionsAmount ; i++ ) { 
			//	console.log(KO.Config.$sections[i].currentArticleName, sectionURL);

				if ("/"+KO.Config.$sections[i].currentArticleName == sectionURL ) {
					KO.Config.currentSection = i;
					matchedNumber = i;
					KO.Config.moveContentByIndexVertically(matchedNumber);
					break;
					}
				}
				
		},



		activateMenu : function () {

			FBZ.view.$btnMenu.on("click",FBZ.control.displayCategory);
			FBZ.view.$iconBurger.on("click",FBZ.control.onClickBurger);


		},

		onClickBurger : function() {
			// console.log("burger clicked");
			FBZ.view.$iconBurger.find(".burger-part").toggleClass("cross");
			FBZ.view.$leftContainer.toggleClass("active" );
			FBZ.view.$centralContainer.toggleClass( "active");
		},

		displayCategory : function (e) {

			// if was send here by url or button pressed. 
			if(e.currentTarget) {
				FBZ.model.currentSection = e.currentTarget.hash;
				// detect if mobile toggle opened close it 
				if(FBZ.view.$leftContainer.hasClass("active" )) {

					FBZ.control.onClickBurger();
				} 

			}else {
				FBZ.model.currentSection = e;
			}
			// e.preventDefault();
			FBZ.control.hideSections();
			FBZ.control.fadeShow(FBZ.view.$centralContainer);

			switch (FBZ.model.currentSection) {
				case "#cartelera": 
					FBZ.control.displayCartelera();
				break;
				case "#cuadernoK":
					FBZ.control.displayCuadernoK();
				break;
					case "#salaK":
					FBZ.control.displaySalaK();
				break;
				case "#fundacionKine":
					FBZ.control.displayFundacionKine();
				break;
				case "#contacto":
					FBZ.control.displayContacto();
				break;
			}

		},

		activateCurrentSection : function (sectionString) {

			FBZ.view.$btnMenu.removeClass("active");
			FBZ.view.$siteMenu.find("."+sectionString).addClass("active");
			// console.log("section string :", FBZ.view.$siteMenu.find(sectionString))

		},

		injectTopTitle : function (topTileText) {


			FBZ.model.topTitle= "<div class='top-title-holder'>"+
										"<div class='top-title-vertical'>"+
										"<h3 class='top-title'>"+topTileText+"</h3>"+
									"</div>"+
								"</div>"; 

			if( topTileText  === "" ) {
				FBZ.model.topTitle= "<div class='top-title-holder no-border'>"+
										"<div class='top-title-vertical '>"+
									"</div>"+
								"</div>"; 
			}

			FBZ.view.$centralContainer.prepend(FBZ.model.topTitle);
		},

		displayCartelera : function () {

			FBZ.control.createCartelera();
			// console.log("displayCartelera");
			FBZ.control.activateCurrentSection("cartelera");
			FBZ.control.injectTopTitle("Cartelera");
			FBZ.control.activateCarteleraExpansion();

		},


		displayCuadernoK : function () {

			// console.log("displayCuadernoK");
			FBZ.control.createCuadernoK();
			FBZ.control.activateCurrentSection("cuadernoK");
			FBZ.control.injectTopTitle("Cuaderno K");
			// FBZ.control.masterLoader();
		},


		displaySalaK : function () {

			// console.log("displaySalaK");
			FBZ.control.createSalaK();
			FBZ.control.activateCurrentSection("salaK");

			if (!FBZ.model.mobileMode) {
				FBZ.control.injectTopTitle("Sala K");
			}else {
				FBZ.control.injectTopTitle("");
			}
		},

		displayFundacionKine : function () {

			// console.log("displayFundacionKine");
			FBZ.control.createFundacionKine();
			FBZ.control.activateCurrentSection("fundacionKine");


		},

		displayContacto : function () {

			// console.log("displayContacto");
			FBZ.control.createContacto();
			FBZ.control.activateCurrentSection("contacto");
			FBZ.control.injectTopTitle("Contacto");

		},

		hideSections : function () {
			FBZ.view.$centralContainer.children().remove(); 
		},


		getTimeStampFromString : function (elementDate,elementHour) {

			var isDateInfuture; 
			var dateString = elementDate+' '+elementHour,
    		dateTimeParts = dateString.split(' '),
    		timeParts = dateTimeParts[1].split(':'),
   			dateParts = dateTimeParts[0].split('/'),
    		date;

			date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);

			return date;
		}, 

		compareDate : function (elementDate,elementHour) {

			var isDateInfuture; 
			var dateString = elementDate+' '+elementHour,
    		dateTimeParts = dateString.split(' '),
    		timeParts = dateTimeParts[1].split(':'),
   			dateParts = dateTimeParts[0].split('/'),
    		date,currentDate;

			date = new Date(dateParts[2], parseInt(dateParts[1], 10) - 1, dateParts[0], timeParts[0], timeParts[1]);
			currentDate = FBZ.model.date.getTime();

			if(date.getTime() > currentDate ) {
				isDateInfuture = true;
			}else {
				isDateInfuture = false;
			}
			console.log(isDateInfuture)
			return isDateInfuture;
		}, 

		createCartelera: function () {

			FBZ.model.centralContainer = "";

			for ( var i = 0 ; i < FBZ.model.noBrain.cartelera.elements.length ; i ++ ) { 
				
    			// key: the name of the object key
				// console.log(key,index);
				if(FBZ.model.noBrain.cartelera.elements[i].Privacidad != "PRIVADO" && FBZ.control.compareDate(FBZ.model.noBrain.cartelera.elements[i].Fecha, FBZ.model.noBrain.cartelera.elements[i].Hora)) {  
	
				var currentDate   =  FBZ.control.getTimeStampFromString(FBZ.model.noBrain.cartelera.elements[i].Fecha,FBZ.model.noBrain.cartelera.elements[i].Hora);

				var stringDay 	  = FBZ.model.days[currentDate.getDay()];
				var numberDay  	  = currentDate.getDate();
				var stringMonth   =  FBZ.model.months[currentDate.getMonth()];; 
				
				FBZ.model.centralContainer += 

					"<div class='cartelera-block'>"+
						"<div class='cartelera-imagen-container'>"+
				 			"<picture class='cartelera-imagen'>"+
								"<source srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_S+"' media='(max-width: 500px)'/>"+
								"<source srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_M+"' media='(max-width: 1000px)'/>"+
								"<source srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_L+"' media='(max-width: 1500px)'/>"+
								"<img srcset='"+FBZ.model.noBrain.cartelera.elements[i].Imagen_M+"' alt='"+FBZ.model.noBrain.cartelera.elements[i].Titulo+"-imagen'/>"+
							"</picture>"+
						"</div>"+

						"<div class='info-box'>"+
							"<div class='date-info-box'>"+
								"<p class='cartelera-fecha'>"+stringDay+" "+numberDay+"</p>"+
								"<p class='cartelera-fecha'>"+stringMonth+"</p>"+
								"<p class='cartelera-hora'>"+FBZ.model.noBrain.cartelera.elements[i].Hora+"</p>"+
							"</div>"+
							"<div class='movie-info-box'>"+
								"<p class='cartelera-titulo'>"+FBZ.model.noBrain.cartelera.elements[i].Titulo+"</p>"+
								"<p class='cartelera-director'> "+FBZ.model.noBrain.cartelera.elements[i].Director+" / "
								+FBZ.model.noBrain.cartelera.elements[i].Pais+" / "
								+FBZ.model.noBrain.cartelera.elements[i].Duracion+"' / "
								+FBZ.model.noBrain.cartelera.elements[i].Ano+"</p>"+
							"</div>"+
							"<div class='guest-info-box'>"+
								"<p class='cartelera-invitado'>"+FBZ.model.noBrain.cartelera.elements[i].Invitado+"</p>"+
							"</div>"+
						"</div>"+
							"<div class='sinopsis-info-box'>"+
								"<p class='cartelera-sinopsis'>"+FBZ.model.noBrain.cartelera.elements[i].Sinopsis+"</p>"+
							"</div>"+
					"</div>";
				}
			}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer );

		},

		createCuadernoK: function () {

			FBZ.model.centralContainer = ""; 

			for ( var i = 0 ; i < FBZ.model.noBrain.cuadernoK.elements.length ; i ++ ) { 
				// console.log(key,index);
				if(FBZ.model.noBrain.cuadernoK.elements[i].Privacidad != "PRIVADO") {  


				var currentDate   =  FBZ.control.getTimeStampFromString(FBZ.model.noBrain.cuadernoK.elements[i].Fecha,"15:30");

				var numberDay 	  = currentDate.getDay();
				var numberYear  	  = currentDate.getFullYear();
				var stringMonth   =  FBZ.model.months[currentDate.getMonth()];; 

				FBZ.model.centralContainer += 

					"<div class='cuaderno-k-block'>"+
						"<div class='cuaderno-k-imagen-container'>"+
							"<picture class='cuaderno-k-imagen'>"+
								"<source srcset='"+FBZ.model.noBrain.cuadernoK.elements[i].Imagen_S+"' media='(max-width: 500px)'/>"+
								"<source srcset='"+FBZ.model.noBrain.cuadernoK.elements[i].Imagen_M+"' media='(max-width: 1000px)'/>"+
								"<source srcset='"+FBZ.model.noBrain.cuadernoK.elements[i].Imagen_L+"' media='(max-width: 1500px)'/>"+
								"<img srcset='"+FBZ.model.noBrain.cuadernoK.elements[i].Imagen_M+"' alt='"+FBZ.model.noBrain.cuadernoK.elements[i].Titulo+"-imagen'/>"+
							"</picture>"+
						"</div>"+
						"<div class='cuaderno-k-texto-container'>"+
							"<h2 class='cuadernoK-titulo'>"+FBZ.model.noBrain.cuadernoK.elements[i].Nombre+"</h2>"+
							"<h3 class='cuadernoK-fecha'>"+numberDay+" "+stringMonth+" "+numberYear+"</h3>"+
						"</div>"+
						"<div class='cuaderno-k-descripcion-container'>"+
							"<p class='cuadernoK-descripcion'>"+FBZ.model.noBrain.cuadernoK.elements[i].Descripcion_larga+"</p>"+
						"</div>"+
					"</div>";
				}
			}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

		},

		createSalaK: function () {

			FBZ.model.centralContainer = ""; 
			for ( var i = 0 ; i < FBZ.model.noBrain.salaK.elements.length ; i ++ ) { 

				FBZ.model.centralContainer += 

					"<div class='salaK-block'>"+
						"<p class='salaK-descripcion'>"+FBZ.model.noBrain.salaK.elements[i].Descripcion+"</p>"+
						"<div class='salaK-slideshow-container'>"+
							"<div class='salaK-slideshow'></div>"+
						"</div>"+
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
							"<source srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_S+"' media='(max-width: 500px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_M+"' media='(max-width: 1000px)'/>"+
							"<source srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_L+"' media='(max-width: 1500px)'/>"+
							"<img srcset='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_M+"' alt='"+FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_descripcion+"-imagen'/>"+
						"</picture>";

				FBZ.model.slideshowDescription.push(FBZ.model.noBrain.slideshow_salaK.elements[i].Imagen_descripcion);

				FBZ.model.slideshowControl += "<div class='slider-dot'></div>";
			}

			FBZ.view.salaKSlideshow.append(FBZ.model.slideshow);

			FBZ.control.getImageSize($('.slideshow-imagen')[0], function(height) {
					FBZ.view.salaKSlideshow.height(height);
					console.log("callback : ",height);
			});

			FBZ.view.sliderControl.append(FBZ.model.slideshowControl);

			FBZ.control.createSliderControl();
// 			populate logos 
			FBZ.view.salaKLogos = $(".salaK-logos");
			FBZ.model.logos = "";

			for ( var i = 0 ; i < FBZ.model.noBrain.logos.elements.length ; i ++ ) { 
//				
				FBZ.model.logos += "<a class='salak-logo' target='_blank' href='"+FBZ.model.noBrain.logos.elements[i].Link+"'>"+
										"<img class='logo-small' src="+FBZ.model.noBrain.logos.elements[i].Logo+" alt="+FBZ.model.noBrain.logos.elements[i].Titulo+">"+
									"</a>";
			}
			FBZ.view.salaKLogos.append(FBZ.model.logos);
		},

	getImageSize : function (img, callback) {
		
		console.log("var and width");
		var $img = $(img).find("img");

		var wait = setInterval(function() {
		var h = $img[0].height;
        if (h) {
            clearInterval(wait);
            callback.apply(this, [h]);
        }
    }, 100);
},

/// slider stuff 

		createInterval : function () { 
			 FBZ.model.clock = setInterval( function() 
		{
				console.log("interval");
				FBZ.control.playSlider();
			}, FBZ.model.time);
		},
		deleteInterval : function () { 
			clearInterval(FBZ.model.clock);
		},
		createSliderControl : function () {
			//FBZ.slider.currentImage = 0;
			FBZ.model.totalImage  = FBZ.view.sliderControl.children().length-1;
			// console.log("	FBZ.slider.totalImage :",	FBZ.model.totalImage );

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
			$(FBZ.view.salaKSlideshow.children().get(index+1)).addClass('active');
			$(FBZ.view.sliderControl.children().get(index)).addClass('active');

		},

		playSlider: function () { 

			// console.log(FBZ.model.currentImage, FBZ.model.totalImage);
			if(FBZ.model.currentImage < FBZ.model.totalImage) { 
				FBZ.model.currentImage ++;
			}else { 

				FBZ.model.currentImage = 0;
			}
				FBZ.control.changeImageToIndex(FBZ.model.currentImage);

	},

		createFundacionKine: function () {

			FBZ.model.centralContainer = ""; 
    		for ( var i = 0 ; i < FBZ.model.noBrain.fundacion_Kine.elements.length ; i ++ ) { 			
				
				// console.log(key,index);
				FBZ.model.centralContainer += 
				"<div class='fundacion-kine-container'>"+
					"<div class='fundacion-kine-block'>"+
					"<h2 class='fundacion-kine-titulo'>"+FBZ.model.noBrain.fundacion_Kine.elements[i].Titulo+"</h2>"+
						"<p class='fundacion-kine-descripcion'>"+FBZ.model.noBrain.fundacion_Kine.elements[i].Descripcion+"</p>"+
						"<div class='fundacion-kine-logos'></div>"+
					"</div>"+
				"</div>";
				}

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

		},


		createContacto: function () {

			FBZ.model.centralContainer = ""; 
			FBZ.model.centralContainer +=

			"<div class='contacto-block'>"+
				// "<link href='//cdn-images.mailchimp.com/embedcode/classic-10_7.css' rel='stylesheet' type='text/css'>"+
				"<div id='mc_embed_signup'>"+
					"<form action='//k-i.us13.list-manage.com/subscribe/post?u=61e392528256ac7a8e5ea3ac3&amp;id=1eb7ae6282' method='post' id='mc-embedded-subscribe-form' name='mc-embedded-subscribe-form' class='validate' target='_blank' novalidate>"+
						"<div id='mc_embed_signup_scroll'>"+
							"<h2>Inscríbete en nuestra lista de mail</h2>"+
							"<div class='indicates-required'><span class='asterisk'>*</span> campo requerido</div>"+
							"<div class='mc-field-group'>"+
								"<label for='mce-EMAIL'>Correo Electronico<span class='asterisk'>*</span>"+
								"</label>"+
								"<input type='email' value='' name='EMAIL' class='required email' id='mce-EMAIL'>"+
							"</div>"+
							
							"<div class='mc-field-group'>"+
								"<label for='mce-FNAME'>Nombre </label>"+
								"<input type='text' value='' name='FNAME' class='' id='mce-FNAME'>"+
							"</div>"+

							"<div class='mc-field-group'>"+
								"<label for='mce-LNAME'>Apellido  <span class='asterisk'>*</span>"+
								"</label>"+
								"<input type='text' value='' name='LNAME' class='required' id='mce-LNAME'>"+
							"</div>"+

							"<div id='mce-responses' class='clear'>"+
								"<div class='response' id='mce-error-response' style='display:none'></div>"+
								"<div class='response' id='mce-success-response' style='display:none'></div>"+
							"</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->"+

							"<div style='position: absolute; left: -5000px;' aria-hidden='true'><input type='text' name='b_61e392528256ac7a8e5ea3ac3_1eb7ae6282' tabindex='-1' value=''></div>"+
							"<div class='clear'><input type='submit' value='Suscríbete' name='subscribe' id='mc-embedded-subscribe' class='button'></div>"+
						"</div>"+
					"</form>"+
				"</div>"+

				"<script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>"+

				"<h2 class='contact-sub-title'>Tambien puedes contactarnos aquí</h2>"+
				"<div class='mailto'></div>"+
				"<div class='telephone'></div>";

			FBZ.view.$centralContainer.append(FBZ.model.centralContainer);

			FBZ.view.$telephone	= $('.telephone');
			FBZ.view.$mailto	= $('.mailto');

			// console.log(FBZ.view.$telephone,FBZ.view.$mailto);
				// <!--End mc_embed_signup-->
			FBZ.model.currentEmailAddress = "<a href='mailto:"+FBZ.model.noBrain.contacto.elements[0].Mail+"'>"+FBZ.model.noBrain.contacto.elements[0].Mail +"</a>";
			FBZ.model.currentTelephoneAddress = "<a href='tel:"+FBZ.model.noBrain.contacto.elements[0].Fono+"'>"+FBZ.model.noBrain.contacto.elements[0].Fono +"</a>";

			FBZ.view.$mailto.append(FBZ.model.currentEmailAddress);
			FBZ.view.$telephone.append(FBZ.model.currentTelephoneAddress);

		},




		getMonthString : function(index) {
			if(index > 11 ) {
				index -=12;
			}
			// console.log(index, FBZ.model.months[index]);
			return FBZ.model.months[index];
		},

		activateCarteleraExpansion : function  () {

			FBZ.view.CarteleraBlocks = $(".cartelera-block");
			// console.log("car",FBZ.view.CarteleraBlocks);
			FBZ.view.CarteleraBlocks.on("click",FBZ.control.onClickCarteleraBlock);

		},
		onClickCarteleraBlock : function (e) {
			// console.log($(e.currentTarget).find('.sinopsis-info-box'));
			$(e.currentTarget).find('.sinopsis-info-box').toggleClass("active");
			$(e.currentTarget).find('.cartelera-imagen-container').toggleClass("active");
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

				FBZ.model.day = FBZ.model.days[FBZ.model.date.getDay()];
				// getDate()	Get the day as a number (1-31)
				// getDay()	Get the weekday as a number (0-6)
				// getFullYear()	Get the four digit year (yyyy)
				// getHours()	Get the hour (0-23)
				// getMilliseconds()	Get the milliseconds (0-999)
				// getMinutes()	Get the minutes (0-59)
				// getMonth()	Get the month (0-11)
				// getSeconds()	Get the seconds (0-59)
				// getTime()	Get the time (milliseconds since January 1, 1970)
				// console.log(FBZ.model.date.getDate());
				// console.log(FBZ.model.date.getTime());
		},


		detectPlatform : function () {

			// console.log("js platform detection : ");
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
			console.log(FBZ.model.currentSection);
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
					// console.dir(data) 
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

			FBZ.model.currentAddress = "<a target='_blank' href='https://www.google.com/maps/place/Sala+K/@-33.4468032,-70.6282056,17z/data=!4m13!1m7!3m6!1s0x9662c57e98f6f6b5:0xee82689ba2896ef8!2sAv.+Condell+1307,+Providencia,+Regi%C3%B3n+Metropolitana,+Chile!3b1!8m2!3d-33.4468032!4d-70.6260169!3m4!1s0x9662c57e98f6f6cb:0xfbc685fe762e8d86!8m2!3d-33.4468032!4d-70.6260169'>"+
     									"<div class='icon-location'> <img  src='http://salak.cl/assets/img/location.svg'/></div>"+
       									"<p class='address-text'>"+FBZ.model.noBrain.contacto.elements[0].Direccion+"</p>"+
       									"</a>";
			
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




			FBZ.view.$address.append(FBZ.model.currentAddress);

				// console.log("left left-container")
				// console.log(FBZ.model.noBrain);
				// <a class='menu-btn' href='/#cartelera'>CARTELERA</a>

		},


		populateCentralContainer :  function () { 

			
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

