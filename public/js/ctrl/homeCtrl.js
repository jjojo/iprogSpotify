spotifyApp.controller('HomeCtrl', function ($scope, $http, $cookies, $resource) {
	
console.log("HomeCtrl loaded")


$scope.getDate = function(){
	var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

	var date = new Date();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();
	
	var datestring = monthNames[monthIndex]+"  "+ day+", "+ year;
	return datestring;
}

$scope.login = function (argument) {
	// body...

	$resource('/user/:userId', {userId:'@id'}, {
    'customActionName':    {
        url:'/user/someURI'
        method:'GET',
        params: {
            param1: '....',
            param2: '....',
        }
    },
     ....
});
}

$scope.clearCookies = function () {
	// clears cookies if any from previous sessions
	$cookies.remove("voteifyUser");
	$cookies.remove("access_token");
	$cookies.remove("refresh_token");
}

});
