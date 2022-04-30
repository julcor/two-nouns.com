window.onload = function() {
    document.getElementById("opt1").addEventListener("click", addVote);
    document.getElementById("opt2").addEventListener("click", addVote);
}

function addVote(e) {
    console.log("vote!");
    console.log(e.target.id);
}
