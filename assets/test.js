/* Function declarations */
function setBGColor(image, color) {
	document.getElementById(image).style.fill = color;
}

function setMGColor(image, color) {
	document.getElementById(image).style.fill = color;
}

function setFGColor(image, color) {
	document.getElementById(image).style.background = color;
}

function randColor() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

/************************/
/* BEGIN CODE THAT RUNS */
/************************/

// Image One: Data Source = ???

setBGColor('BG1', randColor());
setMGColor('MG1', randColor());
setFGColor('FG1', randColor());
