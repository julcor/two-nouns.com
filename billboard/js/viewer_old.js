console.log("Hello wikipedia");

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
    console.log("interval!!")
        // this line of code says to get all the info from AirTable
    base('Billboard').select({
        // If you want to sort the records, include that here:
        //  sort: [
        //     {field: 'Title', direction: 'asc'}
        // ],
    }).eachPage(gotPageofRows, gotAllRows);
}


// Here, we're going to get batches of rows from the airtable, 
// and add each row to our rows array.
function gotPageofRows(records, fetchNextPage) {
    console.log("gotPageofRows()");

    rows.push(...records);

    fetchNextPage();
}

// once we've got all rows in our array, the following code runs.
function gotAllRows(err) {
    console.log("gotAllRows()");

    // first, if there's an error we're going to log that.
    if (err) {
        console.log("Error loading rows");
        console.error(err);
        return;
    }

    // if no error, we're going to run two more functions.
    consoleLogRows();
    showRows();
}

// consoleLogRows simply logs each row to the console, 
// so you can see it's data and fields.
function consoleLogRows() {
    
    console.log("consoleLogRows()");
    
    rows.forEach((row) => {
        console.log("Row:", row);
    });

}

// showRows is what puts the content onto the HTML page
function showRows() {
    var curVote = rows[0];
    // var option1 = document.getElementById("opt1");
    // var option2 = document.getElementById("opt2");
    // option1.insertAdjacentHTML("afterbegin", curVote.fields.Opt1);
    // option2.insertAdjacentHTML("afterbegin", curVote.fields.Opt2);

    var option1 = document.getElementById("ct1");
    var option2 = document.getElementById("ct2");
    console.log(option1);
    option1.innerHTML = curVote.fields.Opt1;
    option2.innerHTML = curVote.fields.Opt2;

    var opt1_count = curVote.fields.Opt1_Count;
    var opt2_count = curVote.fields.Opt2_Count;
    document.getElementById("count1").innerHTML = opt1_count;
    document.getElementById("count2").innerHTML = opt2_count;
    if (opt1_count >= opt2_count) {
        document.getElementById("opt1").classList.add("winner");
    } 
    if (opt2_count >= opt1_count) {
        document.getElementById("opt2").classList.add("winner");
    } 
}
