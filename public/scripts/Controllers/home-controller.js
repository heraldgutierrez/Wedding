app.controller('homeController', ['$scope', function($scope) {
	var self = this;

	var clock;

	// Grab the current date
	var currentDate = new Date();
	var currentDateSeconds = currentDate.getTime() / 1000;

	// Wedding Date: June 30, 2018
	self.weddingDate  = new Date('6/30/2018 13:00 UTC-05:00');
	var weddingDateSeconds = self.weddingDate.getTime() / 1000;

	// Calculate the difference in seconds between the future and current date
	var difference = weddingDateSeconds - currentDateSeconds;

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
}]);