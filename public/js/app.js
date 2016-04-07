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
		when('/profile', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
		}).
		when('/toplist', {
			templateUrl: 	"views/toplist.html",
			controller: 	"ToplistCtrl",
		}).

		otherwise({
			redirectTo: 	"/"
		});
}]);

// spotifyApp.config(function($httpProvider){
// 	console.log($httpProvider.defaults.headers)
//     $httpProvider.defaults.useXDomain = true;
// 	$httpProvider.defaults.withCredentials = true;
// 	delete $httpProvider.defaults.headers.common["X-Requested-With"];
// 	$httpProvider.defaults.headers.common["Accept"] = "application/json";
// 	$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
// 	//$httpProvider.defaults.headers.get = { 'Access-Control-Allow-Origin' : '*' }
// 	$httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// 	$httpProvider.defaults.headers.common["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS, PUT, PATCH, DELETE";
// 	$httpProvider.defaults.headers.common["Access-Control-Allow-Headers"] = "X-Requested-With,content-type";

// });