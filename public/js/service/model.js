spotifyApp.factory('Model', function ($resource, $http, $q, $timeout) {

	// a object containing settings for our app
	this.settings = {
		'access_token' : "",
	}

	var self = this;
	
	this.signedIn = function () {
		// body...
		if (this.settings.access_token) {
			return true
		}else{
			return false
		}
	}

	var req = function (url) {
		// returns a "spotify-ready" http request from the url argument
		return $http({ 
			url: 'https://api.spotify.com/v1' + url,
			headers: {'Authorization': 'Bearer ' + self.settings.access_token}
			});
	}

	


	this.setToken = function (token) {
		// sets access token.
		this.settings.access_token = token;
	}

	this.getToken = function () {
		// returns acess_token
		return this.settings.access_token;
	}

	this.getUser = function () {
		// This should maybe be done by returning a promise 
		//to the controller wher it can be resolved...
		return req('/me')
	}



	///Aarons model functions

	// this.getProfileInfo = function(){
	// //hämtar användarens information

	// var req = {
	//  method: 'GET',
	//  url: 'https://api.spotify.com/v1/me',
	//  headers: {
	//    'Authorization': 'Bearer ' + 'INSERT ACCESS_TOKEN HERE'
	//  },

	//  data: { test: 'test' }
	// }

 //    var temp = {};
 //    var defer = $q.defer();
 //    $http(req).then(function(data){
 //            temp =data;
 //            defer.resolve(data);
 //    });
 //    return defer.promise;
	// };

	// this.getTopPlaylists = function(){
	// //hämtar användarens favortlistor

	// var req = {
	//  method: 'GET', 
	//  url: 'https://api.spotify.com/v1/me/playlists?limit=10',
	//  headers: {
	//    'Authorization': 'Bearer ' + 'INSERT ACCESS_TOKEN HERE' //behöver kopplas ihop med "getToken" i controller
	//  },
	//  data: { test: 'test' }
	// }

 //    var temp = {};
 //    var defer = $q.defer();
 //    $http(req).then(function(data){
 //            temp =data;
 //            defer.resolve(data);
 //            console.log(data)
 //    });
 //    return defer.promise; //ger oss tillgång till objektet
	// };

	return this;
});