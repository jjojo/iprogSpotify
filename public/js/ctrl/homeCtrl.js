spotifyApp.controller('HomeCtrl', function ($scope, $http) {
	
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


});
