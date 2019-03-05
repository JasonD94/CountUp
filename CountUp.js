/*
* 	Count Up from a given a date
*/
window.onload = function() {
	// Month Day, Year Hour:Minute:Second, id-of-element-container
	// Change the Date to whatever you want
	// Formats include Unix Time Stamps in ms, dateStrings, 
	// or (year, monthIndex, day, hours, minutes, seconds). Reference:
	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
	// https://www.epochconverter.com/
	countUpFromTime(new Date(1525075200000), 'countUpDiv');
};

function countUpFromTime(countUp, id) {

	var timeFrom = new Date() - countUp;	// Time since the Count Up Date
	
	var seconds = Math.floor( (timeFrom/1000) % 60 ); 		// Convert ms to seconds and round down
	var minutes = Math.floor( (timeFrom/1000/60) % 60);		// ms to seconds to minutes & round down
	var hours = Math.floor ( (timeFrom/(1000*60*60)) % 24);	// ms to seconds to mins to hrs
	var days = Math.floor ( timeFrom/(1000*60*60*24));		// ms to days
	
	// seems like 365.2422 is close enough according to Washington Post ¯\_(?)_/¯
	var years = Math.floor ( timeFrom/(1000*60*60*24*365.2422));
	
	// also let's do years to the nearest 2 decimal places too
	var floatYears = Number(timeFrom/(1000*60*60*24*365.2422)).toFixed(2);
	
	// If years > 0, remove some days so it's X years <365 days etc
	if (years > 0) {
		days = Math.floor( days - (365.2422 * years) )
	}
	
	// Floating point years below the full X years Y days etc line. 
	// This would be something like "0.84 year(s)"
	$("#floatYears").text(floatYears);
	$("#timeRefFloatYears").text("years");

	// Disable years/days/hours/etc as they hit 0.
	if (years != 0) {
		$("#years").text(years);
		
		if (years == 1) {							// 1 year vs 2 year(S)
			$("#timeRefYears").text("year");
		}
		else {
			$("#timeRefYears").text("years");
		}
	}
	else {
		$("#years").text("");
		$("#timeRefYears").text("");
	}
	
	if (days != 0) {
		$("#days").text(days);
		
		if (days == 1)								// 1 day vs 2 day(S)
			$("#timeRefDays").text("day");
		else 
			$("#timeRefDays").text("days");
	}
	else {
		$("#days").text("");
		$("#timeRefDays").text("");
	}
	
	if (hours != 0) {
		$("#hours").text(hours);
		
		if (hours == 1) {
			$("#timeRefHours").text("hour");		// 1 hour vs 2 hour(Z)
		}
		else {
			$("#timeRefHours").text("hours");
		}
	}
	else {
		$("#hours").text("");
		$("#timeRefHours").text("");
	}
	
	if (minutes != 0) {
		$("#minutes").text(minutes);
		
		if (minutes == 1) {
			$("#timeRefMinutes").text("minute");	// 1 minute vs 2 minute(S)
		}
		else {
			$("#timeRefMinutes").text("minutes");
		}
	}
	else {
		$("#minutes").text("");
		$("#timeRefMinutes").text("");
	}
	
	if (seconds != 0) {
		$("#seconds").text(seconds);
		
		if (seconds == 1) {
			$("#timeRefSeconds").text("second");	// 1 second vs 2 second($)
		}
		else {
			$("#timeRefSeconds").text("seconds");
		}
	} 
	else {
		$("#seconds").text("");
		$("#timeRefSeconds").text("");
	}
	
	// Easter Egg at 1 Year mark
	if (timeFrom <= 0) {
		clearTimeout(id);
		
		// Change title of page / above count up to name of epic video
		document.title = "HAPPIER"
		$("#countUpTitle").text("HAPPIER");
		$("#countUpTitle").addClass("font-weight-bold font-italic");
		
		// Clear the count up div and replace it with an epic video
		$(countUpDiv).load("countUpDone.html");
	}
	else {
		clearTimeout(countUpFromTime.interval);
		countUpFromTime.interval = setTimeout(function(){ countUpFromTime(countUp, id); }, 1000);
	}
}