/*Variable Definitions*/
var freqscale = 15;
 var frequencies = JSON.parse(sounds);
 var sum = 0;
 var sum2 = 0;

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


//Global function to turn numerical data into color ranged on a purple-red scale

function numberToColor(number, scale){
colorint = Math.round(number); 
colorint = (colorint) * scale  ; 
return 'rgb( ' + (100 + colorint) + ', 40 , ' + (100) + ')'
}

/************************/
/* BEGIN CODE THAT RUNS */
/************************/

var frequencies = JSON.parse(sounds);

for(i = 0; i < 4; i++) {
    sum = sum + frequencies[i];
} 
sum = sum/ 4;

// Averaging the sound frequencies of buckets 5-8

for(i = 4; i < 8; i++) {
    sum2 = sum2 + frequencies[i];
} 
sum2 = sum2 / 4;

// Image One: Data Source = Sound Data Server
setBGColor('BG1', numberToColor(data, 2));
setMGColor('MG1', numberToColor(sum, freqscale));
setFGColor('FG1', numberToColor(sum2, freqscale));

// Image Two: Data Source = ???
setBGColor('BG2', numberToColor(frequencies[1], freqscale));
setMGColor('MG2', randColor());
setFGColor('FG2', randColor());

// Image One: Data Source = ???
setBGColor('BG3', numberToColor(frequencies[2], freqscale));
setMGColor('MG3', randColor());
setFGColor('FG3', randColor());

// Image Four: Data Source = ???
setBGColor('BG4',numberToColor(frequencies[3], freqscale));
setMGColor('MG4', randColor());
setFGColor('FG4', randColor());

// Image Five: Data Source = ???
setBGColor('BG5', numberToColor(data, 4));
setMGColor('MG5', randColor());
setFGColor('FG5', randColor());

// Image Six: Data Source = Weather??
setBGColor('BG6', numberToColor(frequencies[5], freqscale));
setMGColor('MG6', randColor());
setFGColor('FG6', randColor());

/*

WEATHER
See documentation: http://www.wunderground.com/weather/api/d/docs?d=index
No more than 500 calls per day (for free account)
*/
/*
jQuery(document).ready(function($) {
$.ajax({
url : "http://api.wunderground.com/api/431bf54052c58a0a/geolookup/conditions/q/CO/Boulder.json",
dataType : "jsonp",
success : function(parsed_json) {
var temp_f = parsed_json['current_observation']['temp_f'];
setBGColor('BG3', scaleColor(temp_f));
setFGColor('FG3', "DarkSlateBlue");
}
});
});
*/
/*
jQuery(document).ready(function($) {
$.ajax({
url : "http://api.wunderground.com/api/bee95dd5ac38cd3e/geolookup/conditions/q/CO/Copper_Mountain.json",
dataType : "jsonp",
success : function(parsed_json) {
var icon = parsed_json['current_observation']['icon'];
setBGColor('BG4', scaleColor(icon));
setFGColor('FG4', "orange");
}
});
});
*/
/*
jQuery(document).ready(function($) {
$.ajax({
url : "http://api.wunderground.com/api/bee95dd5ac38cd3e/geolookup/conditions/q/CO/Boulder.json",
dataType : "jsonp",
success : function(parsed_json) {
var wind_gust_mph = parsed_json['current_observation']['wind_gust_mph'];
setBGColor('BG5', scaleColor(wind_gust_mph));
setFGColor('FG5', "blue");
}
});
});
*/	
/*
jQuery(document).ready(function($) {
$.ajax({
url : "http://api.wunderground.com/api/bee95dd5ac38cd3e/geolookup/conditions/q/CO/Breckenridge.json",
dataType : "jsonp",
success : function(parsed_json) {
var precip_1hr_in = parsed_json['current_observation']['precip_1hr_in'];
setBGColor('BG6', scaleColor(precip_1hr_in));
setFGColor('FG6', "pink");
}
});
});
</script>

/* This is a timer, where its last line is the number of milliseconds
it ticks on. Eventually we need to implement transitions or something,
and this will help.
*/

setInterval(function() {
	$.get( "twitter", function( data ) {
		console.log(data);
  		var tweets = data;
  		console.log(tweets.length+"hihi");
  	});
},6000)
