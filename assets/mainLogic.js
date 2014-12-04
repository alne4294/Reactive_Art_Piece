/*Variable Definitions*/
var freqscale = 20;

/* Function declarations */
function setBGColor(image, color) {
document.getElementById(image).style.fill = color;
}
function setFGColor(image, color) {
document.getElementById(image).style.background = color;
}
function randColor() {
return '#'+Math.floor(Math.random()*16777215).toString(16);
}

//Global function to turn numerical data into numbers ranged on a purple-red scale

function numberToColor(number, scale){
colorint = Math.round(number); 
colorint = (colorint) * scale  ; 
return 'rgb( ' + (100 + colorint) + ', 40 , ' + (100) + ')'
}

//console.log(sounds[1]);
/************************/
/* BEGIN CODE THAT RUNS */
/************************/
//This will show the volume on the web console to make sure it is being passed in. Now we need to translate it into a color.

var frequencies = JSON.parse(sounds);

console.log(frequencies);

setBGColor('BG1', numberToColor(frequencies[0], freqscale)); setBGColor('BG2', numberToColor(frequencies[1], freqscale)); setBGColor('BG3', numberToColor(frequencies[2], freqscale));
setFGColor('FG1', randColor()); setFGColor('FG2', randColor()); setFGColor('FG3', randColor());
setBGColor('BG4',numberToColor(frequencies[3], freqscale)); setBGColor('BG5', numberToColor(data, 4)); setBGColor('BG6', numberToColor(frequencies[5], freqscale));
setFGColor('FG4', randColor()); setFGColor('FG5', randColor()); setFGColor('FG6', randColor());
setBGColor('BG7', numberToColor(frequencies[6], freqscale)); setBGColor('BG8', numberToColor(frequencies[7], freqscale)); setBGColor('BG9', numberToColor(frequencies[7], freqscale));
setFGColor('FG7', randColor()); setFGColor('FG8', randColor()); setFGColor('FG9', randColor());
/*

Pictures:

1. Foreground:  Background: Sound Frequency[First Bucket]
2. Foreground:  Background: Sound Frequency[Second Bucket]
3. Foreground:  Background: Sound Frequency[Third Bucket]
4. Foreground:  Background: Sound Frequency[Fourth Bucket]
5. Foreground:  Background: Sound Volume
6. Foreground:  Background: Sound Frequency[Fifth Bucket]
7. Foreground:  Background: Sound Frequency[Sixth Bucket]
8. Foreground:  Background: Sound Frequency[Seventh Bucket]
9. Foreground:  Background: Sound Frequency[Eighth Bucket]


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
/*
var mongo = require('mongoskin');
var db = mongo.db("mongodb://readuser:ReadUserPassword@ds051980.mongolab.com:51980/soundtest", {native_parser:true});
db.bind('noise');
db.noise.findOne({},{ "noise.level": true}, function(err, result) {
JSON.stringify(result);
var num = result['noise']['level'];//noise level
var color = d3.scale.linear()
.domain([0, 50, 100])
.range(["red", "white", "green"]);
document.getElementById('woz3').style.background = color(num); //insert noise level into the vizualization
document.getElementById('G3').style.fill = "red";
db.close();
});
*/
/* This is a timer, where its last line is the number of milliseconds
it ticks on. Eventually we need to implement transitions or something,
and this will help.
*/
setInterval(function(){
console.log('timer tick');
}, 3000);


setInterval(function() {
$.get( "twitter", function( data ) {
	console.log(data)
  var tweets = JSON.stringify(data);
  console.log(tweets.length)
  console.log('hihi')
});

},6000)
