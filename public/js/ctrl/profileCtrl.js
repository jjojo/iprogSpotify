spotifyApp.controller('ProfileCtrl', function ($scope, Model, fbService) {
	//console.log("profile controller loaded")
	$scope.loading = true;

	//These values are fetched and resolved by the router to be rady on load.
	// $scope.userData = Model.profileData.userData.data;
	// console.log(Model.profileData.playlists)
	var mpd = Model.profileData;
	//console.log(typeof(mpd.userData))
	if (mpd.userData !== $scope.userData) {
		
		mpd.userData.then(function(res){
			$scope.userData = res.data;
		})
		mpd.playlists.then(function(res){
			$scope.playlists = res.data.items;
		});
		mpd.topArtists.then(function(res){
			$scope.topArtists = res.data.items;
		});
		mpd.topTracks.then(function(res){
			$scope.topTracks = res.data.items;
		});
	};
	
	
	$scope.checkLink = function (playlist) {
		// assigns t/f for shared/not shared playlists
		console.log(playlist)
		$scope.loading = true;
		fbService.getPlaylist(playlist.id).then(function (response) {
			try {
				playlist.shared = true
				playlist.link = response.voteUrl
				$scope.loading = false;
			} catch (error) {
				/*this would catch respones = null
				could be solved with anif-else statement as well */
				playlist.shared = false
				$scope.loading = false;
			}
		});
	}

	$scope.genLink = function (playlist) {
		// Generate link and adds data to database.
		playlist.generating = true;
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
			playlist.generating = false;
		});
	}


	$scope.stopSharing = function (playlist) {
		// body...
		playlist.shared = false
		fbService.deletePlaylistUrl(playlist)
	}

});
