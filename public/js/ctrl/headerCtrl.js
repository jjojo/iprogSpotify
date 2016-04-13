/*
Copy this to create a new controller
This is not to be included in the project
*/
spotifyApp.controller('HeaderCtrl', function ($scope, Model, $location) {
	
	$scope.active = function(linkname){
		//console.log($location.path().match(/\/(.*)\//).pop())
		if ($location.path().match(/\/(.*)\//) !== null) {
			var viewPath = $location.path().match(/\/(.*)\//).pop()
		};
		
		if (linkname === viewPath) {
			return {'opacity':1};
		};
		return {'opacity':0.5};
	}

	$scope.access_token = 'access_token=' + Model.settings.access_token;
});