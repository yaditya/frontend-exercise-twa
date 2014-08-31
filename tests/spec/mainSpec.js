var data = {
    "lightbox": {
        "start": 0,
        "finish": 100,
        "duration": 2000
    }
};

function setUpHTMLFixture() {
	setFixtures('<h4><a id="reset">Reset progress</a></h4>'
		+ '<div id="myModal" class="reveal-modal tiny" data-reveal>'
		+ '<div class="bar-container">'
		+ '		<div id="bar"></div>'
		+ '		<p id="progress-container">Progress <span id="progress">0</span>%</p>'
		+ ' 	<p id="completed-container" class="hide">This task is 100% completed</p>'
		+ '</div> '
		+ '</div> '
	);

};

describe ('main js', function () {
	beforeEach(function () {
		setUpHTMLFixture();
	});

	describe('when calling runProgress method', function () {
		beforeEach(function () {
			var callback = jasmine.createSpy('callback');
		    spyOn(window, 'loadData').and.returnValue({
		    	done: function(callback) { callback(data); }
		    });

		    spyOn(window, 'triggerModal');
		    spyOn(window, 'startBarAnimation');

			runProgress();
		});

		it ('should call loadData', function () {
			expect(window.loadData).toHaveBeenCalled();
		});

		it ('should call triggerModal', function () {
			expect(window.triggerModal).toHaveBeenCalled();
		});

		it ('should call startBarAnimation', function () {
			expect(window.startBarAnimation).toHaveBeenCalledWith(data);
		});
	});

	describe ('when calling resetData', function () {
		beforeEach(function () {
			setUpHTMLFixture();
			// set modal display manually
			$('#myModal').css('display', 'block');
			resetData();
		});

		it ('should show div#bar with 0px width', function () {
			expect($('#bar').width()).toEqual(0);

		});

		it ('should show progress percentage', function () {
			expect($('#progress-container').is(':visible')).toEqual(true);
		});

		it ('should hide completed message', function () {
			expect($('#completed-container').is(':visible')).toEqual(false);
		});

		it ('should show in progress bar with blue color', function () {
			expect($('#bar').hasClass('completed')).toEqual(false);
		});

		describe ('and the start value is negative', function () {

		});

	});
});
