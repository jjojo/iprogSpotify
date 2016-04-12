spotifyApp.controller('RatedlistsCtrl', function ($scope) {
	
	console.log("RatedlistsCtrl loaded")

	$scope.tableHeads = [
	"Playlist Avatar",
	"Name",
	"Rating",
	"#Votes"]

	$scope.range = function(n) {
        return new Array(n);
    };

});