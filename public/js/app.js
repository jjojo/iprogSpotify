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
		when('/error', {
			templateUrl: 	"views/error.html",
		}).
		when('/about', {
			templateUrl: 	"views/about.html",
			controller: 	"HeaderCtrl",
		}).	
		when('/ratedlists', {
			templateUrl: 	"views/ratedlists.html",
			controller: 	"RatedlistsCtrl",
		}).
		when('/vote/:playlistId', {
			templateUrl: 	"views/voteing.html",
			controller: 	"VoteingCtrl",
		}).
		when('/voteabout', {
			templateUrl: "views/voteabout.html",
		}).
		otherwise({
			redirectTo: 	"/"
		});
}]);
