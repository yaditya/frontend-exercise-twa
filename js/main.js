'use strict';

$(function() {
	$("#bar")
    .animate({
        width: "100%"
    }, {
        duration: 2000,
        step: function( now, fx ) {
            $('#progress').text(Math.ceil(now));
        },
        complete: function () {
            $('p').html('This task is 100% completed');
            $('#bar').css('background-color', 'green');
        }
    });
});
