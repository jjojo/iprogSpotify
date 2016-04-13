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

	var getTopArtists = function (argument) {

		Model.getTopArtists().then(function (response) {
			//console.log(response.data.items)
			$scope.topartists = response.data.items; 
		});
	}

	var getTopTracks = function (argument) {
		Model.getTopTracks().then(function (response) {
			//console.log(response.data.items)
			$scope.toptracks = response.data.items; 
		});
	}

	$scope.checkLink = function (playlist) {
		// returns the voteURL for one playlist
		try {
			fbService.getPlaylist(playlist.id).then(function (response) {
				if (response.shared) {
					playlist.link = response.voteUrl
					playlist.shared = true
				} else {
					playlist.shared = false
				}
			})
		} catch (err) {
			console.log(err)
		}
	}

	$scope.genLink = function (playlist) {
		// body...
		playlist.status = "Generating link...";
		Model.getPlaylistSongs(playlist.owner.id,playlist.id).then(function (response) {
			playlist.status = " ";
			var data = {
				'playlistApiUrl': playlist.href,
				'spotifyUrl': playlist.external_urls.spotify,
				'voteUrl':'#/vote/' + playlist.id,
				'id': playlist.id,
				'owner': playlist.owner.id,
				'name': playlist.name,
				'playlist': response.data,
				'shared': true
			}
		fbService.addPlayVoteUrl(data)
		playlist.shared = true
		playlist.link = data.voteUrl
		});
	}


	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists(), getTopArtists(), getTopTracks();

});
