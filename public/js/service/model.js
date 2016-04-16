spotifyApp.factory('Model', function ($resource, $http, $q, $cookies, $interval) {
	//console.log("MODEL LOADED MUAHAHAHHAHAAHHAHAHAHHAHAHAHH")
	// a object containing settings for our app
	this.settings = {
		'access_token' : "",
	}

	var self = this;
	var user = "";

	var req = function (url) {
		// returns a "spotify-ready" http request from the url argument
		return $http({ 
			url: 'https://api.spotify.com/v1' + url,
			headers: {'Authorization': 'Bearer ' + self.getToken()}
			});
	}

	var generateUniqeId = function() {
	    var d = new Date().getTime();
	    if(window.performance && typeof window.performance.now === "function"){
	        d += performance.now();; //use high-precision timer if available
	    }
	    var uid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = (d + Math.random()*16)%16 | 0;
	        d = Math.floor(d/16);
	        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	    });
	    return uid;
	};
	
	
	this.setTokens = function (tokens) {
		// stores access token to cookies
		//console.log($cookies.get("refresh_token"))
		if (typeof($cookies.get("refresh_token")) !== 'undefined'
			|| typeof($cookies.get("access_token")) !== 'undefined') {
				return
		}else{
			$cookies.put("access_token", tokens.access_token);
			$cookies.put("refresh_token", tokens.refresh_token);
			$interval(function () {
				refreshToken();
			},(1000*60*59));
		}
		//console.log($cookies.get("refresh_token"))

		// this.settings.access_token = token;
	}

	this.getToken = function () {
		// returns acess_token
		return $cookies.get("access_token");
	}

	var refreshToken = function () {
		// refreshes acess_token
		var refresh_token = $cookies.get("refresh_token");
		$http.get('/refresh_token/?refresh_token=' + refresh_token)
			.then(function (res) {
				console.log(res.data.access_token);
				// sets new access_token in acess-cookie
				$cookies.put("access_token", res.data.access_token);
				console.log("token was refreshed to " + $cookies.get("access_token"));
			})
	}

	this.getUser = function () {
		// This should maybe be done by returning a promise 
		//to the controller wher it can be resolved...
		var deferred = $q.defer();
		req('/me').then(function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
                console.log(response, "ERROR");
            } else {
                deferred.resolve(response);
                //console.log("SUCCESS")
                //console.log(response);
            }
        });
        //console.log(deferred.promise);
        return deferred.promise;
	}

	this.getTopArtists = function () {

		var deferred = $q.defer();
		req('/me/top/artists?limit=3').then(function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
                console.log(response, "ERROR");
            } else {
                deferred.resolve(response);
                //console.log("SUCCESS")
            }
        });
        return deferred.promise;
	}

	this.getTopTracks = function () {
		var deferred = $q.defer();
		req('/me/top/tracks?limit=3').then(function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
                console.log(response, "ERROR");
            } else {
                deferred.resolve(response);
                //console.log("SUCCESS")
            }
        });
        return deferred.promise;
	}

	this.getPlaylists= function () {
		// This should maybe be done by returning a promise 
		//to the controller wher it can be resolved...
		var deferred = $q.defer();
		req('/me/playlists').then(function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
                console.log(response, "ERROR");
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
	}

	this.getPlaylistSongs = function(userID,playlistID) {

		var userInfo = '/users/' + userID + '/playlists/' + playlistID + '/tracks'
		var deferred = $q.defer();
		req(userInfo).then(function(response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
                console.log(response, "ERROR");
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
	}

	return this;
});