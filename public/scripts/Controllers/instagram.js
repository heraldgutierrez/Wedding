app.controller('instagramController', ['$scope', 'Constants', function($scope, Constants) {
	var self = this;

	self.brideAndGroom = Constants.privateImages;
	self.instagramImages = Constants.publicImages;

	$.fancybox.defaults.thumbs = { showOnStart : true };
}]);