// this is a slider 
//var sliderBoy = {};

(function(FBZ, $) {

FBZ.sliderHome = {

		clock: {} ,
		time: 5000,
		currentImage:0,
		totalImage:0,

		init : function () {
			FBZ.sliderHome.setupSlider();
			FBZ.sliderHome.createSliderControl();
		//	FBZ.sliderHome.createInterval();
		//	FBZ.sliderHome.deleteInterval();
		},
		createInterval : function () { 
			 FBZ.sliderHome.clock = setInterval( function() 
		{
	//			console.log("interval");
				FBZ.sliderHome.playSlider();
        }, FBZ.sliderHome.time);
		}, 

		deleteInterval : function () { 
			clearInterval(FBZ.sliderHome.clock);
		},

		setupSlider : function () {
			//do some more stuff in here
			FBZ.view.sliderHome = $(".slideshow");
			
			FBZ.view.sliderHome.parent().append(
				"<div class='slider-control slider-home-control'></div>"
			);
			FBZ.view.sliderHomeControl = $(".slider-home-control");

			//console.dir(FBZ.model.noBrain.SliderHome.elements.length);
			for ( var i = 0 ; i < FBZ.model.noBrain.SliderHome.elements.length ; i ++ ) { 

				if(FBZ.model.noBrain.SliderHome.elements[i].Privacy != "PRIVATE") {  

					FBZ.view.sliderHome.append(
						"<div class='slider-card'>"+
						"</div><!--slider card-->"
						);
					FBZ.view.sliderHome.children().last().css("background-image","url("+FBZ.model.noBrain.SliderHome.elements[i].picUrl+")");

					FBZ.view.sliderHomeControl.append("<div class='slider-dot'></div>")
					

					}

				};
		},
		createSliderControl : function () {
			//FBZ.slider.currentImage = 0;
			FBZ.sliderHome.totalImage  = FBZ.view.sliderHomeControl.children().length-1;
		//	console.log("	FBZ.slider.totalImage ",	FBZ.slider.totalImage );
			FBZ.view.sliderHomeControl.children().on("click",FBZ.sliderHome.onDotClick);
			FBZ.sliderHome.changeImageToIndex(FBZ.sliderHome.currentImage);

		},
		onDotClick : function (e) {

		//	console.log($(e.currentTarget).index());
			FBZ.sliderHome.changeImageToIndex($(e.currentTarget).index());
			FBZ.sliderHome.deleteInterval();
		},

		changeImageToIndex : function (index) {

			FBZ.view.sliderHome.children().removeClass("active");
			FBZ.view.sliderHomeControl.children().removeClass('active');
			
			$(FBZ.view.sliderHome.children().get(index)).addClass('active');
			$(FBZ.view.sliderHomeControl.children().get(index)).addClass('active');

		},

		playSlider: function () { 

			console.log(FBZ.sliderHome.currentImage, FBZ.sliderHome.totalImage);
			if(FBZ.sliderHome.currentImage < FBZ.sliderHome.totalImage) { 
				FBZ.sliderHome.currentImage ++;
			}else { 

				FBZ.sliderHome.currentImage = 0;
			}
				FBZ.sliderHome.changeImageToIndex(FBZ.sliderHome.currentImage);

		}

	};



} )(window.FBZ = window.FBZ || {}, jQuery);

