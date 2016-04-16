var spotifyApp = angular.module('spotifyApp', ['ngRoute', 'ngResource', 'ngSanitize', 'firebase', 'ngCookies']);

spotifyApp.config(['$routeProvider', function ($routeProvider) {

	//Use functions from model to initiate data before loading routs
	// resolves data from model API calls.
	var getPlaylists = function(Model) {
        return Model.getPlaylists();
    };
    var getUserData = function(Model) {
        return Model.getUserData();
    };
    var getTopArtists = function(Model) {
        return Model.getTopArtists();
    };
    var getTopTracks = function(Model) {
        return Model.getTopTracks();
    };


	$routeProvider.
		when('/', {
			templateUrl: 	"views/home.html",
			controller: 	"HomeCtrl",
		}).
		when('/profile/:tokens', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
			resolve: {
           			userData: getUserData,
           			topArtists: getTopArtists,
           			topTracks: getTopTracks,
           			playlists: getPlaylists
       				},
		}).
		when('/profile', {
			templateUrl: 	"views/profile.html",
			controller: 	"ProfileCtrl",
			resolve: {
           			userData: getUserData,
           			topArtists: getTopArtists,
           			topTracks: getTopTracks,
           			playlists: getPlaylists
       				},
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
		when('/vote/:playlistId', {
			templateUrl: 	"views/voteing.html",
			controller: 	"VoteingCtrl",

		}).
		otherwise({
			redirectTo: 	"/"
		});
}]);
