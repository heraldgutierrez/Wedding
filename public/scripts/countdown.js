
$(document).ready(function() {
	var clock;

	// Grab the current date
	var currentDate = new Date();
	var currentDateSeconds = currentDate.getTime() / 1000;

	// Wedding Date: June 30, 2018
	var futureDate  = new Date('6/30/2018 11:00 UTC-06:00');
	var futureDateSeconds = futureDate.getTime() / 1000;

	// Calculate the difference in seconds between the future and current date
	var difference = futureDateSeconds - currentDateSeconds;

	var clockSettings;

	// Use DailyCounter: Days, Hours, Minutes
	if (difference >= 86400) {
		clockSettings = {
			clockFace: 'DailyCounter',
			countdown: true,
			showSeconds: false
		}
	} else {
		// Use HourlyCounter (default); Hours, Minutes, Seconds
		clockSettings = {
			countdown: true
		}
	}

	// Instantiate a coutdown FlipClock
	clock = $('.clock').FlipClock(difference, clockSettings);
});