spotifyApp.controller('ProfileCtrl', function ($scope, Model, fbService) {

	//Booleans for loading and disable info/buttons
	$scope.loading = true;
	$scope.dontShowAgain = false;
	$scope.showModal = Model.showModal();
	$scope.isCollapsed = true;
	$scope.topData = {};
	//These values are fetched and resolved by the router to be rady on load.
	// $scope.userData = Model.profileData.userData.data;
	// console.log(Model.profileData.playlists)
	var mpd = Model.profileData;

	if (mpd.userData !== $scope.userData) {
		
		mpd.userData.then(function(res){
			
			$scope.userData = res.data;
			$scope.dispName = res.data.display_name;
			$scope.userId = res.data.id;
			if (typeof(res.data.images[0]) === 'undefined') {
				$scope.userImg = '../resources/avatar.png';
			}else{
				$scope.userImg = res.data.images[0].url;
			}
			
		});
		mpd.playlists.then(function(res){
			$scope.playlists = res.data.items;
		});

		mpd.topArtists.then(function(res){
			$scope.topData.topArtists = res.data.items;
			$scope.topData.topArtists.title = "Top Artists"
		});

		mpd.topTracks.then(function(res){
			$scope.topData.topTracks = res.data.items;
			$scope.topData.topTracks.title = "Top Tracks"
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
			} catch (error) {
				/*this would catch respones = null
				could be solved with anif-else statement as well */
				playlist.shared = false;
				$scope.loading = false;
			}
		});
	}

	$scope.genLink = function (playlist) {
		// Generate link and adds data to database.
		playlist.generating = true;
		Model.getPlaylistSongs(playlist.owner.id,playlist.id).then(function (response) {
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

	$scope.buttonType = function(shared){
		if (shared) {
			return 'btn btn-danger'
		}else{
			return 'btn btn-success'
		}
	}

	$scope.shareToggle = function (playlist) {
		// body...
		if (playlist.shared) {
			playlist.shared = false
			fbService.deletePlaylistUrl(playlist)
		}else{
			$scope.genLink(playlist)
		}
	}


	$scope.buttonState = function (playlist) {
		// returns button text depending on playlist status.
		if (playlist.shared) {
			return 'Close vote'
		} else if (playlist.generating) {
			return 'Generating...'
		}else{
			return 'Put up for vote'
		}
	}

	$scope.stopSharing = function (playlist) {
		// body...
		playlist.shared = false
		fbService.deletePlaylistUrl(playlist)
	}
});
