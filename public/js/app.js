var spotifyApp = angular.module('spotifyApp', ['ngRoute', 'ngResource', 'ngSanitize', 'firebase', 'ngCookies']);

spotifyApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 	"views/home.html",
			controller: 	"HomeCtrl",
		}).
		when('/profile/:tokens', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
		}).
		when('/profile', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
		}).
		when('/login', {
			templateUrl: 	"views/loginTest.html",
			controller: 	"HomeCtrl",
		}).
		when('/sorry', {
			templateUrl: 	"views/sorry.html",
			controller: 	"HeaderCtrl",
		}).
		when('/about', {
			templateUrl: 	"views/about.html",
			controller: 	"HeaderCtrl",
		}).	
		when('/ratedlists', {
			templateUrl: 	"views/ratedlists.html",
			controller: 	"RatedlistsCtrl",
		}).
		when('/vote', {
			templateUrl: 	"views/voteing.html",
			controller: 	"VoteingCtrl",

		}).
		otherwise({
			redirectTo: 	"/"
		});
}]);
