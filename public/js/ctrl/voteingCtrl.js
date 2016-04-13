spotifyApp.controller('VoteingCtrl', function ($scope, fbService, $routeParams, $sce) {
	
	var locked = false;

	$scope.hide = true;

	$scope.stars = [{
		value: 1,
		hide : true},
		{value: 2,
		hide : true},
		{value: 3,
		hide : true},
		{value: 4,
		hide : true},
		{value: 5,
		hide : true},	
	]

	$scope.getPlaylistData = function () {
		// fetches specific playlist data from firebase.
		fbService.getPlaylist($routeParams.playlistId).then(function (response) {
			//sets all scope variables from response
			$scope.playlist = response
			$scope.owner = response.owner
			$scope.title = response.name
			$scope.spotLink = response.spotifyUrl
			$scope.playlistSongs = response.playlistSongs.items
			$scope.votes = response.votes
			$scope.totalRate = response.totalRating
			
			if (response.votes) {
				$scope.rating = Math.round((response.totalRating/response.votes) * 100) / 100
			} else {
				$scope.rating = 0
			} 
		})
	}

	$scope.trustSrc = function (src) {
		return $sce.trustAsResourceUrl(src);
	}

	$scope.setLock = function (playlist, star) {
		// sets lock
		locked = true;
		fbService.addVoteRating(playlist, star.value)
		playlist.totalRating += star.value
		$scope.votes = playlist.votes +1
		$scope.rating = Math.round((playlist.totalRating/(playlist.votes +1)) * 100) / 100 
	}

	$scope.hollowStars = function (star) {
		// sets all stars to hide = true
		if (!locked) {
			for (var i = 0; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};
		}
	}

	$scope.hollowStar = function (star) {
		// hollows the star to the right if lit and you hover stars to the left
		if (!locked && star.value < $scope.stars.length) {
			$scope.stars[star.value].hide = true;
		};
	}

	$scope.fillStar = function(star){
		//fills stars to the left of hovered star
		if (!locked) {
			for (var i = 0; i < star.value; i++) {
				$scope.stars[i].hide = false;
			};
		}
	}
});
