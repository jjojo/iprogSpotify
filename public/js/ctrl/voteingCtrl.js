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
		{value: 6,
		hide : true},
		{value: 7,
		hide : true},
		{value: 8,
		hide : true},
		{value: 9,
		hide : true},
		{value: 10,
		hide : true}	
	]

	$scope.getPlaylistData = function () {
		// fetches specific playlist data from firebase.
		fbService.getPlaylist($routeParams.playlistId).then(function (response) {
			//sets all scope variables from response

			console.log(response.playlistSongs.items)
			$scope.owner = response.owner
			$scope.title = response.name
			$scope.spotLink = response.spotifyUrl
			$scope.playlistSongs = response.playlistSongs.items
		})
	}

	$scope.trustSrc = function (src) {
		return $sce.trustAsResourceUrl(src);
	}

	$scope.setLock = function () {
		// sets lock
		locked = true;
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
