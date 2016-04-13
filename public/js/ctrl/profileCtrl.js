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

	$scope.getLink = function (playlist) {
		// returns the voteURL for one playlist
		playlist.status = "Generating link...";
		fbService.getPlaylist(playlist.id).then(function (response) {
			playlist.status = " ";
			playlist.link = response.voteUrl
			playlist.sharedList = response.shared
			console.log(playlist.sharedList)
			// for (var i = response.length - 1; i >= 0; i--) {
			// 	if (response[i].$id === playlist.id){
			// 		playlist.link = response[i].voteUrl
			// 		playlist.sharedList = response[i].shared
			// 		console.log(playlist.sharedList)
			// 	}
			// };
		})
	}

	$scope.genLink = function (playlist) {
		// body...
		Model.getPlaylistSongs(playlist.owner.id,playlist.id).then(function (response) {
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
		});
	}


	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists(), getTopArtists(), getTopTracks();

});
