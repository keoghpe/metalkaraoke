var iframeElement   = document.querySelector('iframe');
var widget          = SC.Widget(iframeElement);
var theLyrics		= {
	line1: {
		timeStamp: 4500,
		lyric: 'I lie in a bed of snakes'
	}
}


widget.bind(SC.Widget.Events.PLAY, function(){

	widget.bind(SC.Widget.Events.PLAY_PROGRESS, function() {
		var marker = 4500;
		widget.getPosition(function(position){

			if (position >= theLyrics.line1.timeStamp - 200 && position <= theLyrics.line1.timeStamp + 200) {
				console.log(theLyrics.line1.lyric);
			};

		});
	});
});