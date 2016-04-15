/*
Copy this to create a new controller
This is not to be included in the project
*/
spotifyApp.controller('HeaderCtrl', function ($scope, Model, $location) {
	
	$scope.active = function(linkname){
		//console.log($location.path().match(/\/(.*)\//).pop())
		
		if (linkname === $location.path()) {
			return {'opacity':1};
		};
		return {'opacity':0.5};
	}

	$scope.access_token = 'access_token=' + Model.settings.access_token;
});