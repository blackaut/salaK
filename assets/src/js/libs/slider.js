// this is a slider 
//var sliderBoy = {};

(function(FBZ, $) {

FBZ.slider = {

		clock: {} ,
		time: 5000,
		currentImage:0,
		totalImage:0,

		init : function () {
			FBZ.slider.setupSlider();
			FBZ.slider.createSliderControl();
		//	FBZ.slider.createInterval();
		//	FBZ.slider.deleteInterval();
		},
		createInterval : function () { 
			 FBZ.slider.clock = setInterval( function() 
		{
	//			console.log("interval");
				FBZ.slider.playSlider();
        }, FBZ.slider.time);
		}, 

		deleteInterval : function () { 
			clearInterval(FBZ.slider.clock);
		},

		createSliderControl : function () {
			//FBZ.slider.currentImage = 0;
			FBZ.slider.totalImage  = FBZ.view.sliderControl.children().length-1;
		//	console.log("	FBZ.slider.totalImage ",	FBZ.slider.totalImage );
			FBZ.view.sliderControl.children().on("click",FBZ.slider.onDotClick);
			FBZ.slider.changeImageToIndex(FBZ.slider.currentImage);

		},
		onDotClick : function (e) {

		//	console.log($(e.currentTarget).index());
			FBZ.slider.changeImageToIndex($(e.currentTarget).index());
			FBZ.slider.deleteInterval();
		},

		changeImageToIndex : function (index) {

			FBZ.view.slider.children().removeClass("active");
			FBZ.view.sliderControl.children().removeClass('active');
			
			$(FBZ.view.slider.children().get(index)).addClass('active');
			$(FBZ.view.sliderControl.children().get(index)).addClass('active');

		},

		playSlider: function () { 

			console.log(FBZ.slider.currentImage, FBZ.slider.totalImage);
			if(FBZ.slider.currentImage < FBZ.slider.totalImage) { 
				FBZ.slider.currentImage ++;
			}else { 

				FBZ.slider.currentImage = 0;
			}
				FBZ.slider.changeImageToIndex(FBZ.slider.currentImage);

		}

	};



} )(window.FBZ = window.FBZ || {}, jQuery);

