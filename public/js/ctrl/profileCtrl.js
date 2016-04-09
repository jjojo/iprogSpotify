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
			//console.log(response.data)
			$scope.playlists = response.data.items;
		});
	}

	$scope.getLink = function (playlist) {
		// body...
		fbService.getAllSharedPlaylists(playlist.id).then(function (response) {
			// body...
			for (var i = response.length - 1; i >= 0; i--) {
				if (response[i].$id === playlist.id){
					playlist.link = response[i].voteUrl
				}
			};
		})
	}

	$scope.genLink = function (playlist) {
		// body...
		console.log(playlist)
		
		var data = {
			'playlistApiUrl': playlist.href,
			'spotifyUrl': playlist.external_urls.spotify,
			'voteUrl':'#/vote/' + playlist.id,
			'id': playlist.id,
			'owner': playlist.owner.id,
			'name': playlist.name
		}

		fbService.addPlayVoteUrl(data)
	}

	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists();
});