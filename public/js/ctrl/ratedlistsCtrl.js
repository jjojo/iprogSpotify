spotifyApp.controller('RatedlistsCtrl', function ($scope, Model, fbService) {

	//table heading names
	$scope.tableHeads = [
		{"descript":"Cover","status":true},
		{"descript":"Name","status":true},
		{"descript":"Rating","status":true},
		{"descript":"Votes","status":true}]

	//scopes for sorting rating, voting etc
	$scope.predicate = 'rating';
  	$scope.reverse = false;


	var getRatingList = function(){
	// Fetches users shared playlists, runs on load
		$scope.loading = true;
		fbService.getUsersPlaylists().then(function(res){
			var userLists = res;
			
			if (userLists.length === 0) {
				$scope.empty = true;
			} else {
				$scope.empty = false;
			}
			$scope.userRatingList = userLists;
			$scope.loading = false;
		});
	}


  	$scope.order = function(predicate) {
  	// decides how to order depending on predicate then sets predicate to current sorting
  		if ($scope.predicate === predicate) {
  			$scope.reverse = !$scope.reverse;
  		}else{
  			$scope.revers = false;
  		}
    	$scope.predicate = predicate;
    }


    $scope.changeStatusHead = function(head) {
    // sets status of table head. Which is sorted by and not.
    	for(i = 0; i < $scope.tableHeads.length; i++){
    		if($scope.tableHeads[i].descript == head.descript){
    			$scope.tableHeads[i].status = !$scope.tableHeads[i].status;
    			return;
    		}
    	}
    }


	$scope.range = function(n) {
	/* generates an array of lengt to used to set number 
	of stars filled/hollowed dynamically */
		if(typeof(n) === 'undefined'){
			n = 0;
		}
		num = Math.round(n);
        return new Array(num);
    };

    getRatingList();
});