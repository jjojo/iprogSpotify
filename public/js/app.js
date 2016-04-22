var spotifyApp = angular.module('spotifyApp', ['ngRoute', 'ngResource', 'ngSanitize', 'firebase', 'ngCookies', 'ui.bootstrap']);

spotifyApp.config(['$routeProvider', function ($routeProvider) {

	//Use functions from model to initiate data before loading routs
	// resolves data from model API calls.
    var initData = function(Model) {
        return Model.init();
    };

    //Calls function from model to check authenication
    var authenticatetion = function (Model) {
    	return Model.authenticatetion();
    }

	$routeProvider.
		when('/', {
			templateUrl: 	"views/home.html",
			controller: 	"HomeCtrl",
		}).
		when('/profile/:tokens', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
			resolve: {
           			init: initData, 
           			auth: authenticatetion
       				},
		}).
		when('/profile', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
			resolve: {
					auth: authenticatetion
       				},

		}).
		when('/login', {
			templateUrl: 	"views/loginTest.html",
			controller: 	"HomeCtrl",
		}).
		when('/error', {
			templateUrl: 	"views/error.html",
		}).
		when('/about', {
			templateUrl: 	"views/about.html",
			controller: 	"HeaderCtrl",
			resolve: {
					auth: authenticatetion
       				},
		}).	
		when('/ratedlists', {
			templateUrl: 	"views/ratedlists.html",
			controller: 	"RatedlistsCtrl",
			resolve: {
					auth: authenticatetion
       				},
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
