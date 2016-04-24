spotifyApp.controller('VoteingCtrl', function ($scope, $sce, $routeParams, fbService, Model) {
	
	//scope variables to initiate proper view
	var locked = false;
	$scope.voted = false;
	$scope.vote = parseInt(Model.showVote());
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
	]

	$scope.getPlaylistData = function () {
		// fetches specific playlist data from firebase
		$scope.loading = true;
		fbService.getPlaylist($routeParams.playlistId).then(function (response) {
			//sets all scope variables from response
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
		// locks stars so they won't change when mouse leaves
		$scope.starValue = star.value;
		$scope.disabled = false;
		$scope.hollowStar(star);
		$scope.fillStar(star.value);
		$scope.chosenStar = star;
		locked = true;
	}

	$scope.setVote = function () {
		// sets vote value to the current star value
		if (!$scope.vote) {
			$scope.playlist.totalRating += $scope.starValue;
			$scope.playlist.votes += 1
			$scope.playlist.rating = Math.round(($scope.playlist.totalRating/($scope.playlist.votes)) * 100) / 100 
			fbService.addVoteRating($scope.playlist);
			Model.setVote($scope.starValue);
			$scope.vote = $scope.starValue;
			$scope.voted = true;
		} else {
			$scope.changeVote();
		}
	}

	$scope.changeVote = function (){
		//Removes vote from FB
		$scope.playlist.totalRating -= $scope.vote;
		$scope.playlist.votes -= 1;
		if($scope.playlist.votes !== 0){
			$scope.playlist.rating = Math.round(($scope.playlist.totalRating/($scope.playlist.votes)) * 100) / 100; 
		}else{
			$scope.playlist.rating =0;
		}
		fbService.addVoteRating($scope.playlist);
		Model.setVote(0);
		$scope.vote = 0;
		$scope.disabled = true;
		locked = false;
		$scope.voted = false;
		$scope.starValue = 0;
		$scope.hollowStars();
	}

	$scope.hollowStars = function () {
		// sets all stars to hide = true
		if ($scope.starValue) {
			$scope.fillStar($scope.starValue);
			$scope.hollowStar($scope.chosenStar);
		} else {
			for (var i = 0; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};	
		}
	}

	$scope.hollowStar = function (star) {
		// hollows the stars to the right if lit and you hover stars to the left
		locked = false;
		if (!locked && star.value < $scope.stars.length && !$scope.voted) {
			for (var i = star.value; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};
		};
	}

	$scope.fillStar = function(starValue){
		//fills stars to the left of hovered star
		locked = false;
		if (!locked  && !$scope.voted) {
			for (var i = 0; i < starValue; i++) {
				$scope.stars[i].hide = false;
			};
		}
	}

	var checkVoting = function() {
		// loads vote from current session
		if ($scope.vote) {
			$scope.starValue = $scope.vote;
			$scope.chosenStar = Model.showVote();
			$scope.fillStar(Model.showVote());
			$scope.voted = true;
		} else {
			return
		}
	}

	window.onload = checkVoting();
});
