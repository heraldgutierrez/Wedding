app.controller('mainController', ['$scope', function($scope) {
	var self = this;

	var showMobile = false;
	
	self.mobileMenuClick = function()
	{
		showMobile = !showMobile;

		if (showMobile) {
			$('nav ul').slideDown();
		} else {
			$('nav ul').slideUp();			
		}
	}
}]);