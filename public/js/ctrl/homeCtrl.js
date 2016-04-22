spotifyApp.controller('HomeCtrl', function ($scope, $http, $cookies, $resource) {
$scope.login = function (argument) {
	// body...

}

$scope.clearCookies = function () {
	// clears cookies if any from previous sessions
	$cookies.remove("voteifyUser");
	$cookies.remove("access_token");
	$cookies.remove("refresh_token");
}

});
