spotifyApp.controller('VoteingCtrl', function ($scope, fbService, $routeParams) {
	
	$scope.fillstar = "";
	
	$scope.getPlaylistData = function () {
		// fetches specific playlist data from firebase.
		fbService.getPlaylist($routeParams.playlistId).then(function (response) {
			//sets all scope variables from response
			//console.log(response)
			$scope.owner = response.owner
			$scope.title = response.name
			$scope.spotLink = response.spotifyUrl
		})
	}

	$scope.fillstars = function(star){
		console.log(star);
		if(star == 3){
		$scope.starStyle(star);
		//$scope.starStyle = {'fill':'#54BA5D'}
		}
	}
	
	$scope.starStyle = function(index){
		if(index === 3){
			return 	{'fill':'#54BA5D'}	
		}
	}



});
