/*Variable Definitions*/
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

function rgbString(redValue, greenValue, blueValue) {
	return 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
}


/*********************/
/* Scaling functions */
/*********************/

function volumeColor(number){
	colorint = Math.round(number); 
	colorint *= 2;

	var redValue = 100 + colorint;
	var blueValue = 100;
	var greenValue = 40;

	return rgbString(redValue, greenValue, blueValue);
}

function frequency1Color(number){
	colorint = Math.round(number); 
	colorint *= 10;

	var redValue = 0 + (2 * colorint);
	var blueValue = 100 - colorint;
	var greenValue = 20;

	return rgbString(redValue, greenValue, blueValue);
}

function frequency2Color(number){
	colorint = Math.round(number); 
	colorint *= 10;

	var redValue = 40;
	var blueValue = 40;
	var greenValue = 100 + colorint;

	return rgbString(redValue, greenValue, blueValue);

}

function windColor(number) {
	value = Math.round(number);
	var scale = d3.scale.linear().domain([0, 50]).range([100, 250]);

	var redValue = 100;
	var blueValue = 100;
	var greenValue = scale(value);
		if (greenValue > 255) greenValue = 255;

	var color = rgbString(redValue, blueValue, greenValue);
	console.log("windColor = " + color);
	return color;
}

function tempColor(number) {
	value = Math.round(number);
	var scale = d3.scale.linear().domain([0, 80]).range([0, 255]);

	var redValue = Math.round(scale(value));
		if (redValue > 255) redValue = 255;
	var blueValue = 255 - redValue;
	var greenValue = 0;

	var color = rgbString(redValue, blueValue, greenValue);
	console.log("tempColor = " + color);
	return color;
}

function windDirectionColor(number) {
	value = Math.round(number);
	var scale = d3.scale.linear().domain([0, 360]).range([0, 255]);

	var redValue = 100;
	var blueValue = 100;
	var greenValue = Math.round(scale(value));
		if (greenValue > 255) greenValue = 255;

	var color = rgbString(redValue, blueValue, greenValue);
	console.log("windDirectionColor = " + color);
	return color;
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

// Image One: Data Source = Sound Data Server

function updateSoundData() {
	$.get( '/', function( sound ) {
//console.log(sound);
setBGColor('BG1', volumeColor(data));
setMGColor('MG1', frequency1Color(sum));
setFGColor('FG1', frequency2Color(sum2));
	});
  	} 

  	updateSoundData();
// Image Two: Data Source = ???

setBGColor('BG2', randColor());
setMGColor('MG2', randColor());
setFGColor('FG2', randColor());

setBGColor('BG3', randColor());
setMGColor('MG3', randColor());
setFGColor('FG3', randColor());

// Image Four: Data Source = ???
setBGColor('BG4', randColor());
setMGColor('MG4', randColor());
setFGColor('FG4', randColor());

// Image Five: Data Source = ???
setBGColor('BG5', randColor());
setMGColor('MG5', randColor());
setFGColor('FG5', randColor());

// Image Six: Data Source = Weather
queryWeather();

// Start update timers
setInterval(updateTweets, 6000); // interval to update tweets from node stream
setInterval(queryWeather, 6000); // interval to update picture 6 weather info
setInterval(updateSoundData, 6000); // interval to update picture 1 from SoundDB


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

function queryWeather() {
	$.ajax({
		url : "http://api.wunderground.com/api/bee95dd5ac38cd3e/geolookup/conditions/q/CO/Copper_Mountain.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var windSpeed = parsed_json['current_observation']['wind_mph'];
			var temperature = parsed_json['current_observation']['temp_f'];
			var windDirection = parsed_json['current_observation']['wind_degrees'];

			setFGColor('FG6', windColor(windSpeed));
			setBGColor('BG6', tempColor(temperature));
			setMGColor('MG6', windDirectionColor(windDirection));
		}
	});
}

function updateTweets() {
	$.get( "twitter", function( data ) {
		console.log(data);
  		var tweets = data;
  		console.log("number of tweets: " + tweets.length);
  	});
}

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
*/
