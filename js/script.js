var SourceJSON      = 'js/where_we_call_home.json';
var iframeElement   = document.querySelector('iframe');
var widget          = SC.Widget(iframeElement);
var i               = 0;

loadJSON( SourceJSON,
         function(data) { karaoke(data); },
         function(xhr) { console.error(xhr); }
);

function karaoke (theData) {

    widget.bind(SC.Widget.Events.PLAY_PROGRESS, function(pos) {
        
        //console.log(pos.currentPosition);
        //document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;
        console.log(pos.currentPosition);
        console.log(theData.theLyrics[i].lyric);
        document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;
        if (pos.currentPosition >= theData.theLyrics[i+1].timeStamp && pos.currentPosition < theData.theLyrics[i+2].timeStamp) {
            console.log(theData.theLyrics[i].lyric);
            document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;
            i++;
        }

    });

    widget.bind(SC.Widget.Events.SEEK, function(pos){
       var posish = pos.currentPosition;

       console.log("posish " + posish);
       for (var j = 0; j < theData.theLyrics.length-1; j++) {
           if (posish >= theData.theLyrics[j].timeStamp && posish < theData.theLyrics[j+1].timeStamp) {
            document.getElementsByTagName("H1")[0].innerHTML=theData.theLyrics[i].lyric;
            i = j;
           }
       }
        console.log("i Changed " + i);
    });
    widget.bind(SC.Widget.Events.PAUSE, function () {
        document.getElementsByTagName("H1")[0].innerHTML= 'What ye pausin\' for? Check out the lads <a href="http://redenemy.bandcamp.com/">Bandcamp</a>';
    });

    widget.bind(SC.Widget.Events.FINISH, function () {
        document.getElementById("lyrics").innerHTML= 
        '<p>Wasn\'t that delish? Check out the lads <a href="http://redenemy.bandcamp.com/">Bandcamp</a></p>' + '</br>' + '<iframe width="560" height="315" src="//www.youtube.com/embed/b0TrtA2ghxM" frameborder="0" allowfullscreen></iframe>' + '<iframe width="560" height="315" src="//www.youtube.com/embed/5126za7ugaQ" frameborder="0" allowfullscreen></iframe>';
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