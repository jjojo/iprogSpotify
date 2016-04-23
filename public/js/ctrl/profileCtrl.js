spotifyApp.controller('ProfileCtrl', function ($scope, Model, fbService) {

	//Booleans for loading and disable info/buttons
	$scope.loading = true;
	$scope.dontShowAgain = false;
	$scope.showModal = Model.showModal();
	$scope.disabled = true;
	$scope.isCollapsed = true;
	$scope.isCollapsed2 = true;

	//These values are fetched and resolved by the router to be rady on load.
	// $scope.userData = Model.profileData.userData.data;
	// console.log(Model.profileData.playlists)
	var mpd = Model.profileData;

	if (mpd.userData !== $scope.userData) {
		
		mpd.userData.then(function(res){
			$scope.userData = res.data;
		});
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

	$scope.getUser = function() {
		//Returns info about user
		return Model.getUser();
	}
	
	$scope.checkLink = function (playlist) {
		// assigns t/f for shared/not shared playlists
		$scope.loading = true;
		fbService.getPlaylist(playlist.id).then(function (response) {
			try {
				playlist.shared = true;
				playlist.link = response.voteUrl;
				$scope.loading = false;
				$scope.disabled = false;
			} catch (error) {
				/*this would catch respones = null
				could be solved with anif-else statement as well */
				playlist.shared = false;
				$scope.loading = false;
				$scope.disabled = false;
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
				'image': playlist.images[0].url,
				'totalTracks': playlist.tracks.total
			}
			fbService.addPlayVoteUrl(data)
			playlist.shared = true
			playlist.link = data.voteUrl
			playlist.generating = false;

		});
	}

	$scope.submitModal = function (dontShowAgain) {
		//sets if modal is to show again and closes popup
		Model.setShowModal(!dontShowAgain);
		$scope.showModal = false;
	}

	$scope.stopSharing = function (playlist) {
		//removes a playlist from voting and clears votes
		playlist.shared = false
		fbService.deletePlaylistUrl(playlist)
	}
});
