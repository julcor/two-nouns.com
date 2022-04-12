function load_entries() {
    // Put your channel's slug here.
    // Remember only closed or public channels work; private channels don't work.
    // The channel slug comes after the username in the URL.
    var ran_num = 0;
    let content_num = 0;
    let channel = "quarantime-l8kxkijt7pk";
    let makeURL = (per, page) =>
        `https://api.are.na/v2/channels/${channel}?per=${per}&page=${page}`;

    fetch(makeURL(1, 1))
        .then(res => res.json())
        .then(json => {

            // this line puts your channel's title in the #title element of the HTML.
            $("#title").html("<a href=\"https://www.are.na/" + json.owner.slug + "/" + channel + "/\">" + json.title + "</a>");

            // This line logs your channel's metadata to the console.
            console.log("Channel info");
            console.log(json);
            console.log("entries");
            ran_num = Math.floor(Math.random() *json.length);
            console.log(ran_num)
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
                        content_num++;
                        if(content_num == ran_num) {
                            makeEntry(entry);
                        }
                    });
                });
            });
        });
}


// This function takes the data from Are.na and adds it to the HTML.
    // we're going to do this makeEntry function for each block in the channel.
    function makeEntry(entry) {

        console.log(entry);
        
        // First you clone the entry-template, which is set up in your HTML.
        let entryTemplate = document.getElementById("entry-template");
        let entryEl = entryTemplate.content.cloneNode(true);
        let entryItem = entryEl.querySelector("div");

        // Find the class of the block. 
        // Class refers to block type-- remember you can add images, links, texts, media, 
        // and other channels to an Are.na channel.
        let entryClass = entry.class;

        // If the current block is an image....
        if (entryClass == "Image") {
            entryItem.querySelector("a").href = entry.image.original.url;
            entryItem.querySelector("img").src = entry.image.display.url;
            entryItem.querySelector(".title").innerHTML = entry.title;
            // entryItem.querySelector(".description").innerHTML = entry.description_html;
        } 

        // If the current block is a text...
        else if (entryClass == "Text") {
            if(entry.content == "") {
                entryItem.querySelector(".description").innerHTML = entry.title;
            } else {
                entryItem.querySelector(".description").innerHTML = entry.content_html;
                entryItem.querySelector(".title").innerHTML = entry.title;
            }
            
        } 

        // If the current block is a channel...
        else if (entryClass == "Channel") {
            entryItem.querySelector(".title").innerHTML = entry.title;
            entryItem.querySelector(".description").innerHTML =
            entry.metadata.description;
        } 

        // If the current block is a Media item (like a YouTube video)...
        else if (entryClass == "Media") {
            entryItem.querySelector(".title").innerHTML = entry.title;
            entryItem.querySelector(".embed").innerHTML = entry.embed.html;
        } 

        // If the current block is a link...
        else if (entryClass == "Link") {
            entryItem.querySelector(".link").href = entry.source.url;
            entryItem.querySelector(".link").innerHTML = entry.title;
        }   

        // This line inserts the newly-created 'entry' into the HTML
        let entriesEl = document.getElementById("entries");
        entriesEl.insertBefore(entryEl, entriesEl.firstChild);

    }

// Finally, we need to run the load_entries function to make the content appear.
load_entries();