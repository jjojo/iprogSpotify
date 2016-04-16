spotifyApp.controller('HeaderCtrl', function ($scope, Model, $location, Model) {
	
	$scope.active = function(linkname){
		//console.log($location.path().match(/\/(.*)\//).pop())
		
		if (linkname === $location.path()) {
			return {'opacity':1};
		};
		return {'opacity':0.5};
	}

	$scope.clearCookie = function() {
		Model.clearCookie();
	}

	$scope.signOut = function () {
		// signing out
		Model.signOut();
	}
});