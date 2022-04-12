function load_entries() {
    // Put your channel's slug here.
    // Remember only closed or public channels work; private channels don't work.
    // The channel slug comes after the username in the URL.
    let channel = "words-i-repeat-to-myself-often";
    let makeURL = (per, page) =>
        `https://api.are.na/v2/channels/${channel}?per=${per}&page=${page}`;

    fetch(makeURL(1, 1))
        .then(res => res.json())
        .then(json => {

            // this line puts your channel's title in the #title element of the HTML.
            $("#title").html(json.title);

            // This line logs your channel's metadata to the console.
            console.log("Channel info");
            console.log(json);
            console.log("entries");
        });

    fetch(makeURL(1, 1))
        .then(res => res.json())
        .then(json => (count = json.length))
        .then(count => {
            let per = 100;
            let pages = Math.ceil(count / per);

            let fetches = [];
            for (let page = 1; page <= pages; page++) {
                fetches.push(
                    fetch(makeURL(per, page))
                    .then(res => res.json())
                    .then(json => json.contents)
                );
            }

            Promise.all(fetches).then(contents => {
                contents.forEach(content => {
                    content.forEach(entry => {
                        makeEntry(entry);
                    });
                });
            });
        });

    // This function takes the data from Are.na and adds it to the HTML.
    // we're going to do this makeEntry function for each block in the channel.
    function makeEntry(entry) {
        console.log(entry);
        
        // First you clone the entry-template, which is set up in your HTML.
        let entryTemplate = document.getElementById("entry-template");
        let entryEl = entryTemplate.content.cloneNode(true);
        let entryItem = entryEl.querySelector("li");

        // Find the class of the block. 
        // Class refers to block type-- remember you can add images, links, texts, media, 
        // and other channels to an Are.na channel.
        let entryClass = entry.class;

        // If the current block is text..
        if (entryClass == "Text") {
            entryItem.querySelector(".title").innerHTML = entry.title;
            entryItem.querySelector(".description").innerHTML = entry.content_html;
            
            // This line inserts the newly-created 'entry' into the HTML
            let entriesEl = document.getElementById("entries");
            entriesEl.insertBefore(entryEl, entriesEl.firstChild);
        } 

    }

    function fontInterrupt() {
        
    }
}

// Finally, we need to run the load_entries function to make the content appear.
load_entries();