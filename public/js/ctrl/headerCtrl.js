/*
Copy this to create a new controller
This is not to be included in the project
*/
spotifyApp.controller('HeaderCtrl', function ($scope, Model) {
	

	$scope.access_token = 'access_token=' + Model.settings.access_token;
});