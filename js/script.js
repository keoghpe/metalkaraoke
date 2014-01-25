var iframeElement   = document.querySelector('iframe');
var widget          = SC.Widget(iframeElement);
var i=0;
jQuery("#responsive_headline").fitText();
/*
var theLyrics		= {
	line1: {
		timeStamp: 4500,
		lyric: 'I lie in a bed of snakes'
	}
}*/
loadJSON('js/where_we_call_home.json',
         function(data) { karaoke(data); },
         function(xhr) { console.error(xhr); }
);

function karaoke (theData) {
    widget.bind(SC.Widget.Events.PLAY, function(){
        widget.bind(SC.Widget.Events.PLAY_PROGRESS, function() {
           
            widget.getPosition(function(position){

                if (position >= theData.theLyrics[i].timeStamp - 300 && position <= theData.theLyrics[i].timeStamp + 300) {
                    console.log(theData.theLyrics[i].lyric);
                    document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;
                    i++;
                };
            });
        });
    });   
}

//This is from http://stackoverflow.com/questions/9838812/how-can-i-open-a-json-file-in-javascript-without-jquery
function loadJSON(path, success, error)
{
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));    
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}