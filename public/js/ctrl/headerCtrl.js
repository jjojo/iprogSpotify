spotifyApp.controller('HeaderCtrl', function ($scope, Model, $location, Model) {

	$scope.active = function(linkname){
		//console.log($location.path().match(/\/(.*)\//).pop())
		
		if (linkname === $location.path()) {
			return {'opacity':1};
		};
		return {'opacity':0.5};
	}

	$scope.clearCookie = function() {
		Model.clearCookie();
	}
	$scope.getPlaylistId = function(){
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
		//console.log($scope.userData)
			fbService.addPlayVoteUrl(data)
			playlist.shared = true
			playlist.link = data.voteUrl
			playlist.generating = false;
		});
	}

	$scope.signOut = function () {
		// signing out
		Model.signOut();
	}
});