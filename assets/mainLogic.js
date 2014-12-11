/*Variable Definitions*/
var lastText = 0;
var windSpeed;
var temperature;
var windDirString;
var oldTweets = 0;
var stock_price_string = '';
var stock_volume_string = '';
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
	document.getElementById(image).contentDocument.getElementById('FG').style.fill = color;
}

function randColor() {
	return '#'+Math.floor(Math.random()*16777215).toString(16);
}

function rgbString(redValue, greenValue, blueValue) {
	return 'rgb(' + redValue + ',' + greenValue + ',' + blueValue + ')';
}

function changeImage(image) {
	document.getElementById('image1').data = image;
	document.getElementById('image2').data = image;
	document.getElementById('image3').data = image;
	document.getElementById('image4').data = image;
	document.getElementById('image5').data = image;
	document.getElementById('image6').data = image;

	updateSoundData(); // Image One: Data Source = Sound Data Server
	breckWeather(); // Image Five: Data Source = WUndergroud
	queryWeather(); // Image Six: Data Source = Weather
	updateReddit(); // Image 3 and 4
	updateTweets();// image 2 twittz

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
	var scale = d3.scale.linear().domain([0, 30]).range([100, 250]);

	var redValue = 200;
	var blueValue = 200;
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
	var scale = d3.scale.linear().domain([0, 360]).range([150, 255]);

	var redValue = 100;
	var blueValue = 100;
	var greenValue = Math.round(scale(value));
		if (greenValue > 255) greenValue = 255;

	var color = rgbString(redValue, blueValue, greenValue);
	console.log("windDirectionColor = " + color);
	return color;
}

function windGustColor(number) {
	value = Math.round(number);
	var scale = d3.scale.linear().domain([0, 60]).range([0, 255]);

	var redValue = 0;
	var blueValue = 150 + redValue;
	var greenValue = Math.round(scale(value));
		if (redValue > 255) redValue = 255;

	var color = rgbString(redValue, blueValue, greenValue);
	console.log("windGustColor = " + color);
	return color;
}

function priceChangeColor(number){
	var scale = d3.scale.linear().domain([-0.3 , 0.3]).range([0, 20]);
	//var  value = Math.round(number * 100);

	if (number < 0){
		var redValue = 255;
		var blueValue = Math.round(20 - scale(number));
		var greenValue = Math.round(20 - scale(number));
	}else if(number > 0){
		var redValue = Math.round(20 - scale(number));
		var blueValue = Math.round(20 - scale(number));
		var greenValue = 255;

	}else{
		var redValue = 255;
		var blueValue = 0;
		var greenValue = 255; 

	}
	return rgbString(redValue, greenValue, blueValue);
}

function volumeChangeColor(number){
	var scale = d3.scale.linear().domain([- 1500 , 1500]).range([0, 40]);
	var  value = Math.round(number);
	console.log("volume number: " + number);

	if (number > 0){
		var redValue = 255;
		var blueValue = Math.round(20 - scale(value));
		var greenValue = Math.round(20 - scale(value));
	}else if(number < 0){
		var redValue = Math.round(20 - scale(value));
		var blueValue = 255; 
		var greenValue = Math.round(20 - scale(value));

	}else{
		var redValue =  255;
		var blueValue = 255;
		var greenValue = 255; 
	}

	return rgbString(redValue, greenValue, blueValue);

}

function iconColor(string) {
	var clear = "#189DFB"; 
	var overcast = "C0C0C0";
	var snow = "#FFFFFF";

	if (icon = "Clear"){
		return clear;
	}	
	else if(icon = "Overcast"){
		return overcast;
	} 
	else if(icon = "Snow"){
		return snow;
	}
	else
		return randColor();
}

function hrPrecipColor(number) {
	value = Math.round(number);
	var scale = d3.scale.linear().domain([0,72]).range([0,255]);

	var redValue = Math.round(scale(value));
		if (redValue > 255) redValue = 255;;
	var blueValue = 0;
	var greenValue = 100;

	var color = rgbString(redValue, blueValue, greenValue);
	return color;
}

/************************/
/* BEGIN CODE THAT RUNS */
/************************/

window.onload = function() {
	
	updateSoundData(); // Image One: Data Source = Sound Data Serve
	breckWeather(); // Image Five: Data Source = WUndergroud
	queryWeather(); // Image Six: Data Source = Weather
	updateReddit(); // Image 3 and 4
	updateTweets();// image 2 twittz
	updateStockData();

	// Start update timers
	setInterval(updateTweets, 600000); // interval to update tweets from node stream
	setInterval(queryWeather, 12000); // interval to update picture 6 weather info
	setInterval(breckWeather, 12000); // daniel's stuff
	setInterval(updateSoundData, 1000); // interval to update picture 1 from SoundDB
	setInterval(updateReddit, 6000); // interval to update picture 3 from Reddit API
	setInterval(updateLabels, 3000);
	setInterval(updateStockData, 3000);
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

	    console.log('reddit top title: ' + reddit.title);


		setBGColor('image3', colornumComments(reddit.numComments));
		setMGColor('image3', colorUps(reddit.ups));
		setFGColor('image3', colorDowns(reddit.downs));
		setLabelText('image3', "> Reddit Comments: " + reddit.numComments);
		setLabelText('image4', "> Reddit Upvotes: " + reddit.ups);

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
		setLabelText('image1', "> Volume of ATLAS: " +  Math.round(volume) + "dB");

	});
} 

function updateStockData() {
	$.get( 'stocks', function( data ) {
		var pricediff = data['price_change'];
		var volumediff = data['volume_change'];
		if (pricediff > 0){
			stock_price_string = 'Rising';

		} else if (pricediff < 0){
			stock_price_string = "Falling";
		}else{
			stock_price_string = "Steady";
		} 
		if (volumediff > 0){
			stock_volume_string = 'High';

		} else if (volumediff < 0){
			stock_volume_string = "Low";
		}else{
			stock_volume_string = "Steady";
		} 

		setMGColor('image5', rgbString(0, 0, 0));
		setFGColor('image5', priceChangeColor(pricediff));
		setBGColor('image5', volumeChangeColor(volumediff));



	});
} 

function breckWeather() {
	$.ajax({
		url : "http://api.wunderground.com/api/431bf54052c58a0a/geolookup/conditions/q/CO/Breckenridge.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			var windGustMph = parsed_json['current_observation']['wind_gust_mph'];
			var icon = parsed_json['current_observation']['icon'];
			var hrPrecip = parsed_json['current_observation']['precip_1hr_in'];

			var string = " > Forecast in Breckenridge: " + windGustMph;

			setFGColor('image4', windGustColor(windGustMph));
			setBGColor('image4', iconColor(icon));
			setMGColor('image4', hrPrecipColor(hrPrecip));
			//setLabelText('image6', string);
		}
	});
}

function updateLabels() {
	if (lastText == 0) {
		setLabelText('image6', " > Boulder's Temp: " + temperature + " degF");
		setLabelText('image5', "> Apple Stock: " +  stock_price_string);
	} else if (lastText == 1) {
		setLabelText('image6'," > Wind Speed: " + windSpeed + " mph");
		setLabelText('image5', "> Apple Trading: " +  stock_volume_string);
	} else {
		setLabelText('image6'," > Wind Direction: " + windDirString);
	}
	lastText = (lastText + 1) % 3;
}

function queryWeather() {
	$.ajax({
		url : "http://api.wunderground.com/api/431bf54052c58a0a/geolookup/conditions/q/CO/Boulder.json",
		dataType : "jsonp",
		success : function(parsed_json) {
			windSpeed = parsed_json['current_observation']['wind_mph'];
			temperature = parsed_json['current_observation']['temp_f'];
			windDirection = parsed_json['current_observation']['wind_degrees'];
			windDirString = parsed_json['current_observation']['wind_dir'];

			setFGColor('image6', windColor(windSpeed));
			setBGColor('image6', tempColor(temperature));
			setMGColor('image6', windDirectionColor(windDirection));
			
		}
	});

	
}

function updateTweets() {
	$.get( "twitter", function( data ) {
		tweets = data;
  		var delta = oldTweets - tweets.length;
  		oldTweets = delta
		console.log('heresdelta'+delta)
 		var colorTweets = d3.scale.linear()
	    .domain([0, 20])
	    .range(["#23B9F8", "#127343"]);

	    var colorTweets2 = d3.scale.linear()
	    .domain([0, 20])
	    .range(["#2F12F8", "#E2035D"]);
  		
  		var colorTweets3 = d3.scale.linear()
	    .domain([0, 20])
	    .range(["#7FB9F8", "#E3037D"]);


	    setFGColor('image2', colorTweets(delta));
		setBGColor('image2', colorTweets2(delta));
		setMGColor('image2', colorTweets3(delta));
		setLabelText('image2', " > Number of Tweets about CU Boulder:"+Math.abs(delta));


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
