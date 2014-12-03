
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

//Global function to turn numerical data into numbers ranged on a blue scale
function numberToColor(number){
	colorint = Math.round(number); //Cut off
	colorint = colorint * 1000; //make the contrast of volume larger. We can change this later.
	return 'rgb( 0, 0 , ' + colorint + ')'
}

console.log(numberToColor(data));

/************************/
/* BEGIN CODE THAT RUNS */
/************************/

//This will show the volume on the web console to make sure it is being passed in. Now we need to translate it into a color.

setBGColor('BG1', numberToColor(data)); setBGColor('BG2', randColor()); setBGColor('BG3', randColor());
setFGColor('FG1', randColor()); setFGColor('FG2', randColor()); setFGColor('FG3', randColor());

setBGColor('BG4',randColor()); setBGColor('BG5', randColor()); setBGColor('BG6', randColor());
setFGColor('FG4', randColor()); setFGColor('FG5', randColor()); setFGColor('FG6', randColor());

setBGColor('BG7', randColor()); setBGColor('BG8', randColor()); setBGColor('BG9', randColor());
setFGColor('FG7', randColor()); setFGColor('FG8', randColor()); setFGColor('FG9', randColor());		    			    			    

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
