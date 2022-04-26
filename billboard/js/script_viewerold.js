window.onload = function() {
    load_entries();
}



function load_entries() {
    // Put your channel's slug here.
    // Remember only closed or public channels work; private channels don't work.
    // The channel slug comes after the username in the URL.
    let channel = "billboard-bf-fp0bj2wg";
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
                        // if(entry.title == trying:not_trying) {
                            const titleArray = entry.title.split(":");
                            var option1 = document.getElementById("opt1");
                            var option2 = document.getElementById("opt2");
                            option1.insertAdjacentHTML("afterbegin", titleArray[0]);
                            option2.insertAdjacentHTML("afterbegin", titleArray[1]);
                            makeEntry(entry);
                        // }
                    });
                });
            });
        });

    // This function takes the data from Are.na and adds it to the HTML.
    // we're going to do this makeEntry function for each block in the channel.
    function makeEntry(entry) {
        console.log(entry);
        //do all the string parsing
        let text = entry.content;
        const myArray = text.split("_");
        var opt1_count = myArray[1];
        var opt2_count = myArray[3];
        document.getElementById("count1").innerHTML = opt1_count;
        document.getElementById("count2").innerHTML = opt2_count;
        console.log(myArray);
        if (opt1_count >= opt2_count) {
            document.getElementById("opt1").classList.add("winner");
        } 
        if (opt2_count >= opt1_count) {
            document.getElementById("opt2").classList.add("winner");
        } 

        
    } 
}

