app.controller('mainController', ['$scope', function($scope) {
	var self = this;

	self.showMobile = false;
	
	self.mobileMenuClick = function()
	{
		self.showMobile = !self.showMobile;
	}
}]);