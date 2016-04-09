spotifyApp.controller('VoteingCtrl', function ($scope) {

	$scope.fillstar = "";
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
