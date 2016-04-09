spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams) {
	console.log("profile controller loaded")

	$scope.getToken = function (argument) {
		// body...
		$scope.token = $routeParams.access_token.substring(13)
	}

	$scope.getProfile = function (argument) {
		$scope.profile = Model.getProfileInfo();
	}

	$scope.getPlaylists = function (argument) {
		$scope.playlists = Model.getTopPlaylists();
	}

	$scope.signed = function (argument) {
		// body...
		console.log(Model.signedIn())
	}

	$scope.getUser = function () {
		// body...
		Model.getUser().then(function (response) {
			// body...
			$scope.userdata = response.data
		})
	}


	window.onload = Model.setToken($routeParams.access_token.substring(13));
});