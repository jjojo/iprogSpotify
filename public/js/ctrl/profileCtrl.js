spotifyApp.controller('ProfileCtrl', function ($scope, Model, $location, $route, $routeParams, $timeout, fbService) {
	console.log("profile controller loaded")

	var getUserData = function (argument) {
		// retrievs user data from Model.
		Model.getUser().then(function (response) {
			$scope.userData = response.data;

		});
	}

	$scope.shared;
	
	var getTopPlaylists = function (argument) {
		// retrievs user data from Model.
		Model.getPlaylists().then(function (response) {
			//console.log(response.data)
			$scope.playlists = response.data.items;
		});
	}

	var getTopArtists = function (argument) {

		Model.getTopArtists().then(function (response) {
			console.log(response.data.items)
			$scope.topartists = response.data.items; 
		});
	}

	var getTopTracks = function (argument) {
		Model.getTopTracks().then(function (response) {
			console.log(response.data.items)
			$scope.toptracks = response.data.items; 
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
<<<<<<< HEAD
		console.log(playlist)
=======
>>>>>>> 7c370eece62a8653c4c02fef3cd8ef668a4fb809
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

<<<<<<< HEAD
	

	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists(),getTopArtists();;
=======
	window.onload = Model.setToken($routeParams.access_token.substring(13)),getUserData(), getTopPlaylists(), getTopArtists(), getTopTracks();
>>>>>>> 7c370eece62a8653c4c02fef3cd8ef668a4fb809
});