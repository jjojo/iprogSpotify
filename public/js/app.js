var spotifyApp = angular.module('spotifyApp', ['ngRoute', 'ngResource']);

spotifyApp.config(['$routeProvider', function ($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 	"views/home.html",
			controller: 	"HomeCtrl",
		}).
		when('/search', {
			templateUrl: 	"views/search.html",
			controller: 	"SearchCtrl",
		}).
		when('/profile/:access_token', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
		}).
		when('/login', {
			templateUrl: 	"views/loginTest.html",
			controller: 	"HomeCtrl",
		}).
		when('/ratedlists/:access_token', {
			templateUrl: 	"views/ratedlists.html",
			controller: 	"RatedlistsCtrl",
		}).
		otherwise({
			redirectTo: 	"/"
		});
}]);
