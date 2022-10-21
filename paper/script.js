var odd = document.querySelector('.folded-itm:nth-child(1)');
var even = document.querySelector('.folded-itm:nth-child(2)');
var originalWidth = window.innerWidth;
var skew = 0;
var shadowOpacity = 0;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function foldPaper() {
	console.log("fold!!!");
	//calculate skew based on window width
	var curWidth = window.innerWidth;
	if(curWidth < originalWidth) {
		skew = map_range(curWidth, originalWidth, 0, 0, 89);
		shadowOpacity = map_range(curWidth, originalWidth, 0, 0, .5);
		console.log(originalWidth, curWidth, "skew:", skew, "opacity:", shadowOpacity);
		odd.style.transform = 'skewY(' + skew + 'deg)';
		even.style.transform = 'skewY(-' + skew +'deg';
		even.style.boxShadow = "inset 20px 0px 50px rgba(0,0,0," + shadowOpacity + ")";
	} else {
		even.style.boxShadow = "none";
	}
}


window.addEventListener("resize", foldPaper);