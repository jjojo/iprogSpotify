spotifyApp.controller('RatedlistsCtrl', function ($scope, Model, fbService) {
	
	//console.log("RatedlistsCtrl loaded")
	var getUserData = function () {
		// retrievs user data from Model.
		Model.getUser().then(function (response) {
			Model.user = response.data.id
			//console.log($scope.userData)
		});
	}

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
				if(response[keys[i]].sharedBy === Model.user){
					user_lists.push(response[keys[i]]);
				}
				
			}
			//console.log(user_lists);
			$scope.loading = false;
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

    window.onload = getUserData(), getRatingList();
});