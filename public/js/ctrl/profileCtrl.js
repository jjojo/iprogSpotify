spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams, $timeout) {
	console.log("profile controller loaded")

	var getUserData = function (argument) {
		// retrievs user data from Model.
		Model.getUser().then(function (response) {
			$scope.userData = response.data;
		});
	}

	$scope.getProfile = function (argument) {
		$scope.profile = Model.getProfileInfo();
	}

	$scope.getPlaylists = function (argument) {
		$scope.playlists = Model.getTopPlaylists();
	}


	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData();
});