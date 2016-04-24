spotifyApp.controller('VoteingCtrl', function ($scope, fbService, $routeParams, $sce, Model) {
	
	//scope variables to initiate proper view
	var locked = false;
	//$scope.voted = false;
	//$scope.vote = parseInt(Model.getVote($routeParams.playlistId));
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
		locked = true;
		$scope.voteValue = star.value;
		// $scope.lockedStar = star
		$scope.disabled = false;
	}


	$scope.setVote = function () {
	// sets Vote by sending voteValue and playlist to fbService addVoteRating.
	// also tells model this session has voted once
		fbService.addVoteRating($scope.pl, $scope.voteValue);
		Model.setVote($scope.pl.$id, $scope.voteValue);
		$scope.voted = true;
	}

	// var average = function(total, votes){
	// 	console.log( total + " adn votes " + votes)
	// 	return Math.round((total/(votes)) * 100) / 100;
	// }

	// $scope.setVote = function (voteValue) {
	// 	// sets vote value to the current star value

	// 	if (!$scope.vote) {
	// 		$scope.pl.totalRating += $scope.lockedStar.value;
	// 		$scope.pl.votes += 1
	// 		$scope.pl.rating = Math.round(($scope.pl.totalRating/($scope.pl.votes)) * 100) / 100 
	// 		;
	// 		Model.setVote($scope.lockedStar.value);
	// 		$scope.vote = $scope.lockedStar.value;
	// 		$scope.voted = true;
	// 	} else {
	// 		console.log(star)
	// 		$scope.changeVote();
	// 	}
	// }


	$scope.changeVote = function (){
		//Removes vote from FB
		locked = false;
		$scope.hollowStars();

		console.log($scope.pl + " scope.vote " + $scope.vote)
		console.log($scope.pl + " scope.voteValue " + $scope.voteValue)

		if (typeof($scope.vote) === 'undefined') {
			fbService.deleteVoteRating($scope.pl, $scope.voteValue);
		}else{
			fbService.deleteVoteRating($scope.pl, $scope.vote);
		}
		
		// $scope.pl.totalRating -= $scope.vote;
		// $scope.pl.votes -= 1;
		// if($scope.pl.votes !== 0){
		// 	$scope.pl.rating = Math.round(($scope.pl.totalRating/($scope.pl.votes)) * 100) / 100; 
		// }else{
		// 	$scope.pl.rating =0;
		// }
		// fbService.addVoteRating($scope.pl);
		// Model.setVote(0);
		// $scope.vote = 0;
		// $scope.disabled = true;
		
		// $scope.voted = false;
		// //$scope.starValue = 0;
		// $scope.hollowStars();
	}


	$scope.hollowStars = function () {
		// sets all stars to hide = true
		// if ($scope.starValue) {
		// 	$scope.fillStar($scope.starValue);
		// 	$scope.hollowStar($scope.chosenStar);
		// } else {
		if (!locked) {
			for (var i = 0; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};
		};
				
		//}
	}


	$scope.hollowStar = function (star) {
		// hollows the stars to the right if lit and you hover stars to the left
		//locked = false;
		if (!locked) {
			for (var i = star.value; i < $scope.stars.length; i++) {
				$scope.stars[i].hide = true;
			};
		};
	}


	$scope.fillStar = function(starValue){
		//fills stars to the left of hovered star
		if (!locked) {
			for (var i = 0; i < starValue; i++) {
				$scope.stars[i].hide = false;
			};
		}
	}


	var checkVoting = function() {
		// loads vote from current session
		if(Model.getVote($routeParams.playlistId) === false){
			$scope.voted = false;
			console.log("no previous vote")
		}else{
			$scope.vote = parseInt(Model.getVote($routeParams.playlistId));
			$scope.fillStar($scope.vote);
			$scope.voted = true;
			locked = true;
			console.log("voted earlier with " + $scope.vote)
		}
		// if ($scope.vote) {
		// 	$scope.starValue = $scope.vote;
		// 	$scope.chosenStar = Model.showVote();
		// 	$scope.fillStar(Model.showVote());
		// 	$scope.voted = true;
		// } else {
		// 	return
		// }
	}

	window.onload = checkVoting();
});
