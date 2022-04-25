// load the airtable library
var Airtable = require('airtable');

// configure the site to point to your Airtable
var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keyMtkwYmfTiXSzA3'
});
var base = Airtable.base('appNkLpqgLQR0DqvP');

// set up a blank array for all your rows
const rows = [];

// this line of code says to get all the info from AirTable
// put your table name in the quotes
base('Messages').select({
    // If you want to sort the records, include that here:
    //  sort: [
    //     {field: 'Title', direction: 'asc'}
    // ],
}).eachPage(gotPageofRows, gotAllRows);

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
    if (err) {
        console.log("Error loading rows");
        console.error(err);
        return;
    }
    consoleLogRows();

    // here, we want to show the first record only, 
    // which happens with the showRow function.
    showRow(rows[index]);
}

var index = 0;

// consoleLogRows simply logs each row to the console, 
// so you can see it's data and fields.
function consoleLogRows() {
    console.log("consoleLogRows()");
    rows.forEach((row) => {
        console.log("Row:", row);
    });
}

// showRows is what puts the content onto the HTML page.
// it only displays a single row.
function showRow(row) {

    console.log("showRow()");

    const slide = document.getElementById("slide");

    slide.style.backgroundColor = row.fields.Color;
    const div = document.getElementById("slide-text");
    div.innerHTML = row.fields.Message;
}

// This sets up an event.
// When you click on a slide, you replace the content with the message
// form the next row. 
// Some additional logic ensures that when you reach the last row,
// you loop back to the beginning.
document.getElementById("slide-text").addEventListener("click", () => {
    console.log(index);
    if (index < rows.length - 1) {
        index = index + 1;
        showRow(rows[index]);
    } else {
        index = 0;
        showRow(rows[index]);
    }
})


