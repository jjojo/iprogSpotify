spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams, $timeout, fbService) {
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

	$scope.genLink = function (playlist) {
		// body...
		console.log(playlist)
		
		var data = {
			'playlistApiUrl': playlist.href,
			'voteUrl':'/vote/' + playlist.id,
			'id': playlist.id,
			'owner': playlist.owner.id
		}

		fbService.addPlayVoteUrl(data)

	}

	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists();
});