spotifyApp.controller('VoteingCtrl', function ($scope, fbService, $routeParams, $sce, Model) {
	
	//scope variables to initiate proper view
	var locked = false;
	$scope.disabled = true;
	var playlist;

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

	var checkVoting = function() {
		// loads vote from current session
		if(Model.getVote($routeParams.playlistId) === false){
			$scope.voted = false;
		}else{
			$scope.vote = parseInt(Model.getVote($routeParams.playlistId));
			$scope.fillStar($scope.vote);
			$scope.voted = true;
			locked = true;
		}
	}


	$scope.getPlaylistData = function () {
	// fetches specific playlist data from firebase
		$scope.loading = true;
		fbService.getPlaylist($routeParams.playlistId)
			.then(function (res) {
				if (res) {
					$scope.pl = res;
					playlist = res;
					$scope.loading = false;
				} else {
					$scope.loading = false;
					$scope.badLink = true;
				}
			});
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
	// locks stars so they won't change when clicked
		if (!$scope.voted) {
			locked = true;
			$scope.voteValue = star.value;
			$scope.disabled = false;
			$scope.fillStar(star.value, true);
			$scope.hollowStar(star, true);
		}
	}


	$scope.setVote = function () {
	// sets Vote by sending voteValue and playlist to fbService addVoteRating.
	// also tells model this session has voted once
		$scope.voted = true;

		fbService.addVoteRating($scope.pl, $scope.voteValue);
		Model.setVote($scope.pl.$id, $scope.voteValue);
	}


	$scope.changeVote = function (){
		//Removes vote from FB
		var oldVote = parseInt(Model.getVote($scope.pl.$id));
		locked = false;
		
		$scope.hollowStars();
		$scope.voted = false;
		$scope.disabled = true;

		fbService.deleteVoteRating($scope.pl, oldVote);
		Model.clearVote($scope.pl.$id)
	}


	$scope.hollowStars = function () {
		// sets all stars to hide = true
		if (!locked) {
			for (var i = 0; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};
		};
	}


	$scope.hollowStar = function (star, unlock) {
		// hollows the stars to the right if lit and you hover stars to the left
		if (!locked || unlock) {
			for (var i = star.value; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};
		};
	}


	$scope.fillStar = function(starValue, unlock){
		//fills stars to the left of hovered star
		if (!locked || unlock) {
			for (var i = 0; i < starValue; i++) {
				$scope.stars[i].hide = false;
			};
		}
	}

	checkVoting();
});