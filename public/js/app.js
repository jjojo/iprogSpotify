var spotifyApp = angular.module('spotifyApp', ['ngRoute', 'ngResource', 'ngSanitize', 'firebase']);

spotifyApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 	"views/home.html",
			controller: 	"HomeCtrl",
		}).
		when('/profile/:access_token', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
		}).
		when('/login', {
			templateUrl: 	"views/loginTest.html",
			controller: 	"HomeCtrl",
		}).
		when('/sorry/:access_token', {
			templateUrl: 	"views/sorry.html",
			controller: 	"HeaderCtrl",
		}).
		when('/about/:access_token', {
			templateUrl: 	"views/about.html",
			controller: 	"HeaderCtrl",
		}).	
		when('/ratedlists/:access_token', {
			templateUrl: 	"views/ratedlists.html",
			controller: 	"RatedlistsCtrl",
		}).
		when('/vote/:playlistId', {
			templateUrl: 	"views/voteing.html",
			controller: 	"VoteingCtrl",

		}).
		otherwise({
			redirectTo: 	"/"
		});
}]);
