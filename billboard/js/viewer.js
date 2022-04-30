var opt1_count_old = 999;
var opt2_count_old = 999;

// load the airtable library
var Airtable = require('airtable');

// configure the site to point to your Airtable
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keycQ3bwr3IWxgzNi'
});
var base = Airtable.base('appIHMcRLeyJU2GhY');

// set up a blank array for all your rows
const rows = [];

pullAir();

var intervalID = setInterval(pullAir, 500);

function pullAir() {
    base('Billboard').find('recfUP9ku8ijjZR7O', function(err, record) {
    if (err) { console.error(err); return; }
        showVotes(record);
    });
}

// showRows is what puts the content onto the HTML page
function showVotes(curVote) {
    console.log("updating votes");

    var opt1_count = curVote.fields.Opt1_Count;
    var opt2_count = curVote.fields.Opt2_Count;
    var option1 = document.getElementById("ct1");
    var option2 = document.getElementById("ct2");
    option1.innerHTML = curVote.fields.Opt1;
    option2.innerHTML = curVote.fields.Opt2;

    //playing sounds when vote count updates
    if(opt1_count_old < opt1_count) {
        let count = opt1_count - opt1_count_old;
        for(let i=0; i < count; i++) {
            var sounds = [];
            sounds[i] = new Audio('assets/trying.mp3');
            sounds[i].addEventListener("canplaythrough", event => {
              /* the audio is now playable; play it if permissions allow */
              sounds[i].play();
            });
        }
    } else if (opt2_count_old < opt2_count) {
        let count = opt2_count - opt2_count_old;
        for(let i=0; i < count; i++) {
            var sounds = [];
            sounds[i] = new Audio('assets/not-trying.mp3');
            sounds[i].addEventListener("canplaythrough", event => {
                /* the audio is now playable; play it if permissions allow */
                sounds[i].play();
            });
        }
    }

    opt1_count_old = opt1_count;
    opt2_count_old = opt2_count;
   
    document.getElementById("count1").innerHTML = opt1_count;
    document.getElementById("count2").innerHTML = opt2_count;
    if (opt1_count > opt2_count) {
        document.getElementById("opt1").classList.add("winner");
        document.getElementById("opt2").classList.remove("winner")

        document.getElementById("opt1").style.order = "1";
        document.getElementById("opt2").style.order = "2";
    } else if (opt2_count > opt1_count) {
        document.getElementById("opt2").classList.add("winner");
        document.getElementById("opt1").classList.remove("winner")

        document.getElementById("opt2").style.order = "1";
        document.getElementById("opt1").style.order = "2";
    } else {
        document.getElementById("opt1").classList.add("winner");
        document.getElementById("opt2").classList.add("winner");
    }
}
