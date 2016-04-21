spotifyApp.controller('RatedlistsCtrl', function ($scope, Model, fbService) {

	$scope.tableHeads = [
	"Name",
	"Rating",
	"Votes"]

	$scope.predicate = 'rating';
  	$scope.reverse = true;
  	$scope.order = function(predicate) {
    	$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    	$scope.predicate = predicate;
    }

	var getRatingList = function(){
		//console.log(Model.user)
		// This solution is not valid for refresh requests! When refreching this function trys to fetch 
		// Model.user even thoug Model.user is not set after refresh. A better way might be setting a user-cookie 
		// on login. This way we can retrive it even on refresh.
		$scope.loading = true;
		fbService.getUsersPlaylists(Model.user).then(function(response){

			var user_lists = [];
			var keys = Object.keys(response);
			for(i=0; i<keys.length-1; i++){
				//console.log(response[keys[i]]);
				if(response[keys[i]].sharedBy === Model.getUser()){
					user_lists.push(response[keys[i]]);
					$scope.loading = false;
				}
				else{
					$scope.loading = false;
				}	
			}
			$scope.loading = false;
			if (user_lists.length === 0) {
				$scope.empty = true;
			} else {
				$scope.empty = false;
			}
			$scope.userRatingList = user_lists;
		})
	}


	$scope.range = function(n) {
		//console.log(n)
				if(typeof(n) === 'undefined'){
			n = 0;
		}
		num = Math.round(n);

		//console.log(num)
        return new Array(num);
    };

    window.onload = getRatingList();
});