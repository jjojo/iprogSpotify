spotifyApp.controller('ProfileCtrl', function ($scope, Model, fbService) {
	
	$scope.showModal = Model.showModal();
	$scope.loading = true;
	$scope.dontShowAgain = false;
	$scope.isCollapsed = true;
	$scope.topData = {};
	$scope.voteifyAvatar = '../resources/avatar.png';

	//loads user data if data is not in model it runs init() in model to det it
	if(Object.keys(Model.profileData).length === 1){
		Model.init().then(function(res){
			$scope.profileData = Model.profileData;
		})
	}else{
		$scope.profileData = Model.profileData;
	}


	$scope.isShared = function (playlist) {
	// checks t/f for shared/not shared playlists and sets scope accordinly
		fbService.getPlaylist(playlist.id).then(function (res) {
			try {
				playlist.shared = true;
				playlist.btnStyle = 'btn btn-danger';
				playlist.link = res.voteUrl;
				$scope.loading = false;
			} catch (error) {
				// this would catch respones = null could be solved with an if-else statement as well
				console.log(error)
				playlist.shared = false;
				playlist.btnStyle = 'btn btn-success'
				$scope.loading = false;
			}
		});
	}


	$scope.shareToggle = function (playlist) {
	// Put playlist up for votes or closes vote and deletes data
		if (playlist.shared) {
			playlist.shared = false
			playlist.btnStyle = 'btn btn-success'
			fbService.deletePlaylistUrl(playlist)
		}else{
			fbService.addPlayVoteUrl(playlist, $scope.profileData.userData.id)
			playlist.shared = true
			playlist.btnStyle = 'btn btn-danger'
			playlist.link = '#/vote/' + playlist.id
		}
	}


	$scope.submitModal = function (dontShowAgain) {
		//sets if modal is to show again and closes popup
		Model.setShowModal(!dontShowAgain);
		$scope.showModal = false;
	}
});

