var iframeElement   = document.querySelector('iframe');
var widget          = SC.Widget(iframeElement);
var i               = 0;
jQuery("#responsive_headline").fitText();

loadJSON('js/where_we_call_home.json',
         function(data) { karaoke(data); },
         function(xhr) { console.error(xhr); }
);

function karaoke (theData) {

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(pos) {
        
        //console.log(pos.currentPosition);
        //document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;

        if (pos.currentPosition >= theData.theLyrics[i].timeStamp - 300 && pos.currentPosition <= theData.theLyrics[i+1].timeStamp -300) {
            console.log(theData.theLyrics[i].lyric);
            document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;
            i++;
        };

    });

    widget.bind(SC.Widget.Events.SEEK, function(pos){
       /* var posish = pos.currentPosition;
        while(theData.theLyrics[i].timeStamp > posish && theData.theLyrics[i+1].timeStamp > posish){
            i++;
        }
        while(theData.theLyrics[i].timeStamp < posish && theData.theLyrics[i-1].timeStamp < posish){
            i--;
        }*/
        console.log(i);
    });
    widget.bind(SC.Widget.Events.PAUSE, function () {
        document.getElementsByTagName("H1")[0].innerHTML= 'What ye pausin\' for? Check out the lads <a href="http://redenemy.bandcamp.com/">Bandcamp</a>';
    });

    widget.bind(SC.Widget.Events.FINISH, function () {
        document.getElementsByTagName("H1")[0].innerHTML= 'Wasn\'t that delish? Check out the lads <a href="http://redenemy.bandcamp.com/">Bandcamp</a>';
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