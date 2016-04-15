spotifyApp.controller('RatedlistsCtrl', function ($scope, Model, fbService) {
	
	//console.log("RatedlistsCtrl loaded")

	$scope.tableHeads = [
	"Name",
	"Rating",
	"Votes"]

	$scope.predicate = 'rating';
  	$scope.reverse = true;
  	$scope.order = function(predicate) {
  		console.log(predicate)
    	$scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
    	$scope.predicate = predicate;
    }

	var getRatingList = function(){
		//console.log(Model.user)
		fbService.getUsersPlaylists(Model.user).then(function(response){
			//console.log("körs onload");
			var user_lists = [];
			var keys = Object.keys(response);
			for(i=0; i<keys.length-1; i++){
				//console.log(response[keys[i]]);
				if(response[keys[i]].sharedBy === Model.user){
					user_lists.push(response[keys[i]]);
				}
				
			}
			//console.log(user_lists);
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

    window.onload=getRatingList();

});