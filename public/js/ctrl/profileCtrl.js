spotifyApp.controller('ProfileCtrl', function ($scope, playlists, topArtists, userData, topTracks, Model, fbService) {
	//console.log("profile controller loaded")
	$scope.loading = true;

	//These values are fetched and resolved by the router to be rady on load.
	$scope.userData = userData.data;
	$scope.playlists = playlists.data.items;
	$scope.topArtists = topArtists.data.items;
	$scope.topTracks = topTracks.data.items;


	$scope.checkLink = function (playlist) {
		// assigns t/f for shared/not shared playlists
		$scope.loading = true;
		fbService.getPlaylist(playlist.id).then(function (response) {
			try {
					playlist.shared = true
					playlist.link = response.voteUrl
					$scope.loading = false;
			} catch (err) {
					playlist.shared = false
					$scope.loading = false;
				}
		});
	}

	$scope.genLink = function (playlist) {
		// Generate link and adds data to database.
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
				'shared': true,
				'sharedBy': $scope.userData.id,
				'image': playlist.images[0].url
			}
		//console.log($scope.userData)
		fbService.addPlayVoteUrl(data)
		playlist.shared = true
		playlist.link = data.voteUrl
		});
	}


	$scope.stopSharing = function (playlist) {
		// body...
		playlist.shared = false
		fbService.deletePlaylistUrl(playlist)
	}

});
