app.factory('Utility', [function () {
	return {
		dhms: function (time) {
			var days = 0;
			var hours = 0;
			var minutes = 0;
			var seconds = 0;

			if (time >= 0) {
				days = Math.floor(time / 86400);		// 86400 seconds per day

				time -= days * 86400;
				hours = Math.floor(time / 3600) % 24;	// 3600 seconds per hour

				time -= hours * 3600;
				minutes = Math.floor(time / 60) % 60;	// 60 seconds per minute
				
				time -= minutes * 60;
				seconds = time % 60;
			}
			return [
				days + 'd',
				hours + 'h',
				minutes + 'm',
				seconds + 's'
			].join(' ');
		}
	}
}]);