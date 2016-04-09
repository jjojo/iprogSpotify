spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams, $timeout) {
	console.log("profile controller loaded")

	var getUserData = function (argument) {
		// retrievs user data from Model.
		Model.getUser().then(function (response) {
			$scope.userData = response.data;
		});
	}

	var getTopPlaylists = function (argument) {
		// retrievs user data from Model.
		Model.getPlaylists().then(function (response) {
			$scope.playlists = response.data.items;
		});
	}

	$scope.goToVote = function (argument) {
		// body...
		var url = '/vote/abc123'
		$location.url(url)
	}

	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists();
});