spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams, $timeout, fbService, $http) {
	//console.log("profile controller loaded")

	var getUserData = function () {
		// retrievs user data from Model.
		Model.getUser().then(function (response) {
			Model.user = response.data.id
			$scope.userData = response.data;
			//console.log($scope.userData)
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
		// assigns t/f for shared/not shared playlists
		
		fbService.getPlaylist(playlist.id).then(function (response) {
			try {
					playlist.shared = true
					playlist.link = response.voteUrl
			} catch (err) {
					playlist.shared = false
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
		console.log($scope.userData)
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

	window.onload = Model.setTokens($location.search()),getUserData(), getTopPlaylists(), getTopArtists(), getTopTracks();

});
