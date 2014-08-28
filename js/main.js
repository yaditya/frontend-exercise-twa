'use strict';

/**
 * this method loads the data.json and returns data object with a promise method
 * @return {object} data object
 */
function loadData () {
	return $.getJSON('js/data.json').then(function (data) {
		return data.data;
	});

}

function runProgress () {
	loadData().done(function (data) {

		var start = data.lightbox.start,
			finish = data.lightbox.finish,
			duration = data.lightbox.duration;

		// reset the progress
		// passing initial start data
		resetData(start);

		// trigger the foundation modal
		$('#myModal').foundation('reveal', 'open');

		// start animating the progress bar
		$('#bar')
	    .animate({
	    	// animate the width
	        width: finish + "%"
	    }, {
	        duration: duration,
	        step: function( now, fx ) {
	        	fx.start = 0;
	        	// update the progress percentage for each step
	            $('#progress').text(Math.floor(now));
	        },
	        complete: function () {
	        	// when the animation completes, show the complete text
	            $('#progress-container').addClass('hide');
	            $('#completed-container').removeClass('hide');
	            $('#bar').addClass('completed');
	        }
	    });
	});
}

function resetData(startValue) {
	var start = startValue || 0;

	// make sure start value is not negative
	if (start < 0) {
		start = 0;
	}

	$('#bar').css({
		width: start
	});

	$('#progress-container').removeClass('hide');
	$('#completed-container').addClass('hide');
	$('#bar').removeClass('completed');
}

$(function() {
	runProgress();

	$('#reset').click(function () {
		resetData();
		runProgress();
	});
});
