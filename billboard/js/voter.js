
// load the airtable library
var Airtable = require('airtable');

// configure the site to point to your Airtable
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keycQ3bwr3IWxgzNi'
});
var base = Airtable.base('appIHMcRLeyJU2GhY');


window.onload = function() {
    document.getElementById("opt1").addEventListener("click", addVote);
    document.getElementById("opt2").addEventListener("click", addVote);

    base('Billboard').find('recfUP9ku8ijjZR7O', function(err, record) {
        if (err) { console.error(err); return; }
        console.log(record.fields.Opt1);
        console.log(record.fields.Opt2);
        document.getElementById("opt1").insertAdjacentHTML("afterbegin", record.fields.Opt1);
        document.getElementById("opt2").insertAdjacentHTML("afterbegin", record.fields.Opt2);
    });

}


function addVote() {
    var id = this.id;
 
    base('Billboard').find('recfUP9ku8ijjZR7O', function(err, record) {
        if (err) { console.error(err); return; }
        console.log("og1 count " + record.fields.Opt1_Count);
        console.log("og2 count " + record.fields.Opt2_Count);
        var opt1_count = record.fields.Opt1_Count;
        var opt2_count = record.fields.Opt2_Count;

        if(id == "opt1") {
            opt1_count++;
            console.log("you voted for option 1, new:" + opt1_count);
        } else if (id == "opt2") {
            opt2_count++;
            console.log("you voted for option 2, new:" + opt2_count);
        }

        base('Billboard').update("recfUP9ku8ijjZR7O", {
        "Opt1_Count": opt1_count,
        "Opt1": "TRYING",
        "Opt2_Count": opt2_count,
        "Name": "1",
        "Opt2": "NOT TRYING"
    }, function(err, record) {


        if (err) {
            console.error(err);
            return;
        }
    // console.log(record.get('Opt1_Count'));
    }
    );
    });

    
}
