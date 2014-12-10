/*Variable Definitions*/

/* Function declarations */

function setLabelText(image, text) {
	document.getElementById(image).contentDocument.getElementById('labelText').textContent = text;
}

function setBGColor(image, color) {
	document.getElementById(image).contentDocument.getElementById('BG').style.fill = color;
}

function setMGColor(image, color) {
	document.getElementById(image).contentDocument.getElementById('MG').style.fill = color;
}

function setFGColor(image, color) {
	document.getElementById(image).contentDocument.getElementById('FG').style.background = color;
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

window.onload = function() {
	// Image One: Data Source = Sound Data Server
	updateSoundData();

	// Image Two: Data Source = josh's shit
	setBGColor('image2', randColor());
	setMGColor('image2', randColor());
	setFGColor('image2', randColor());

	// Image Five: Data Source = ???
	setBGColor('image5', randColor());
	setMGColor('image5', randColor());
	setFGColor('image5', randColor());

	// Image Six: Data Source = Weather
	queryWeather();

	updateReddit();

	// Start update timers
	setInterval(updateTweets, 6000); // interval to update tweets from node stream
	setInterval(queryWeather, 6000); // interval to update picture 6 weather info
	setInterval(updateSoundData, 6000); // interval to update picture 1 from SoundDB
	setInterval(updateReddit, 6000); // interval to update picture 3 from Reddit API
}


/********************/
/* Update functions */
/********************/

function updateReddit() {
	$.get( "reddit", function( data ) {
		var reddit = data;
  		console.log("number of reddit: " + reddit.ups);
  		
  		var colornumComments = d3.scale.linear()
	    .domain([0, 30])
	    .range(["#E3037D", "#7FB9F8"]);

	    var colorUps = d3.scale.linear()
	    .domain([0, 3000])
	    .range(["#7FB9F8", "#E3037D"]);

	    var colorDowns = d3.scale.linear()
	    .domain([0, 50])
	    .range(["#E3037D", "green"]);

	    var colorCountApple = d3.scale.linear()
	    .domain([ 0, 30])
	    .range(["#7FB9F8", "#F1740F"]);

	    var colorCountWoz = d3.scale.linear()
	    .domain([0, 10])
	    .range(["#7FB9F8", "purple"]);

	    var colorCountMoney = d3.scale.linear()
	    .domain([0, 3])
	    .range(["#E3037D", "blue"]);

	    console.log("color"+colornumComments);

		setBGColor('image3', colornumComments(reddit.numComments));
		setMGColor('image3', colorUps(reddit.ups));
		setFGColor('image3', colorDowns(reddit.downs));
		setLabelText('image3', "> Score: " + reddit.numComments);

		setBGColor('image4', colorCountApple(reddit.countApple));
		setMGColor('image4', colorCountWoz(reddit.countWoz));
		setFGColor('image4', colorCountMoney(reddit.countMoney));
		setLabelText('image4', "> Reddit: " + reddit.title);

		console.log(data);
	});	
} 

function updateSoundData() {
	var sum = 0;
	var sum2 = 0;

	$.get( 'sound', function( data ) {
		var frequencies = data['frequencies'];
		var volume = data['volume'];

		// Averaging the sound frequencies of buckets 1-9

		for(i = 0; i < 9; i++) {
		    sum = sum + frequencies[i];
		} 
		sum = sum/ 9;

		// Averaging the sound frequencies of buckets 10-18

		for(i = 9; i < 18; i++) {
		    sum2 = sum2 + frequencies[i];
		} 
		sum2 = sum2 / 9;
		
		setBGColor('image1', volumeColor(volume));
		setMGColor('image1', frequency1Color(sum));
		setFGColor('image1', frequency2Color(sum2));
		setLabelText('image1', "> Volume of ATLAS: " + Math.round(volume*100));
	});
} 

function queryWeather() {
	$.ajax({
		url : "http://api.wunderground.com/api/2f48e8646549e88f/geolookup/conditions/q/CO/Boulder.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var windSpeed = parsed_json['current_observation']['wind_mph'];
			var temperature = parsed_json['current_observation']['temp_f'];
			var windDirection = parsed_json['current_observation']['wind_degrees'];

			var string = " > Temperature of Boulder: " + temperature + " degF";

			setFGColor('image6', windColor(windSpeed));
			setBGColor('image6', tempColor(temperature));
			setMGColor('image6', windDirectionColor(windDirection));
			setLabelText('image6', string);
		}
	});
}

function updateTweets() {
	$.get( "twitter", function( data ) {
		var tweets = data;
  		console.log("number of tweets: " + tweets.length);
  		if (tweets.length > 0) {
  			console.log(data);
  		}
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
