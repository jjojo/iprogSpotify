spotifyApp.controller('VoteingCtrl', function ($scope, fbService, $routeParams, $sce) {
	
	var locked = false;
	$scope.voted = false;

	$scope.disabled = true;
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
		// {value: 6,
		// hide : true},
		// {value: 7,
		// hide : true},
		// {value: 8,
		// hide : true},
		// {value: 9,
		// hide : true},
		// {value: 10,
		// hide : true}	
	]

	$scope.getPlaylistData = function () {
		// fetches specific playlist data from firebase.
		$scope.loading = true;
		fbService.getPlaylist($routeParams.playlistId).then(function (response) {
			//sets all scope variables from response
			console.log(response)
			if (response) {
				$scope.playlist = response
				$scope.image = response.image
				$scope.totalTracks = response.totalTracks
				$scope.owner = response.owner
				$scope.title = response.name
				$scope.spotLink = response.spotifyUrl
				$scope.playlistSongs = response.playlistSongs.items	
				$scope.loading = false;
			} else {
				$scope.loading = false;
				$scope.badLink = true;
			}

		})
	}

	$scope.trustSrc = function (src) {
		//Makes the src secure. If no src, returns default setting.
		if(src){
			$scope.preview = false;
			return $sce.trustAsResourceUrl(src);
		}
		else{
			$scope.preview = true;
		}
	}

	$scope.setLock = function (star) {
		// sets lock
		$scope.starValue = star.value;
		$scope.disabled = false;
		locked = true;
	}

	$scope.setVote = function () {
		// sets vote
		if (!$scope.voted) {
			$scope.playlist.totalRating += $scope.starValue;
			$scope.playlist.votes += 1
			$scope.playlist.rating = Math.round(($scope.playlist.totalRating/($scope.playlist.votes)) * 100) / 100 
			fbService.addVoteRating($scope.playlist);
			$scope.voted = true;
		} else {
			return
		}
	}

	$scope.changeVote = function (){
		//Removes vote from FB
		$scope.playlist.totalRating -= $scope.starValue;
		$scope.playlist.votes -= 1;
		if($scope.playlist.votes != 0){
			$scope.playlist.rating = Math.round(($scope.playlist.totalRating/($scope.playlist.votes)) * 100) / 100; 
		}else{
			$scope.playlist.rating =0;
		}
		fbService.addVoteRating($scope.playlist);
		$scope.voted = false;
		$scope.disabled = true;
		locked = false;

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
