spotifyApp.controller('RatedlistsCtrl', function ($scope, Model, fbService) {
	
	console.log("RatedlistsCtrl loaded")

	$scope.tableHeads = [
	"Playlist Avatar",
	"Name",
	"Rating",
	"#Votes"]

	$scope.getRatingList = function(){
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
			console.log(user_lists);
			$scope.userRatingList = user_lists;
		})
	}


	$scope.range = function(n) {
        return new Array(n);
    };

});