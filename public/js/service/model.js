spotifyApp.factory('Model', function ($resource, $http, $q, $cookies, $interval, $location) {
	console.log("model loaded")
	
	var self = this;

	this.profileData = {
		topTracks: null,
		topArtists: null,
		userData: null,
		playlists: null
	}

	var req = function (url) {
		// returns a "spotify-ready" http request from the url argument
		var access_token = $cookies.get("access_token");

		return $http({ 
			url: 'https://api.spotify.com/v1' + url,
			headers: {'Authorization': 'Bearer ' + access_token}
			});
	}


	var refreshToken = function () {
		// refreshes acess_token
		var refresh_token = $cookies.get("refresh_token");
		
		$http.get('/refresh_token/?refresh_token=' + refresh_token)
			.then(function (res) {
				// sets new access_token in acess-cookie
				$cookies.put("access_token", res.data.access_token);
			});
	}


	this.setUserCred = function () {
		// stores username, access_token and refresh_token to session cookies.
		if (typeof($cookies.get("voteifyUser")) === 'undefined'){
			var tokens = $location.search();
			
			$cookies.put("access_token", tokens.access_token);
			$cookies.put("refresh_token", tokens.refresh_token);
			
			self.getUserData().then(function (res) {
				$cookies.put("voteifyUser",res.data.id)
                self.profileData.userData = res;
			});
			
			$interval(function () {
				refreshToken();
			},(1000*60*59)); //timeout set to refresh access_token each 59 minutes.
		}else{
			return
		}
	}


	this.getUser = function () {
		//returns current user
		return $cookies.get("voteifyUser")	
	}


	this.getUserData = function () {
		// Returns a promise with user data from spotifyAPI
		// and sets votefyUser-cookie
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
		// Returns promise with users top 3 artists
		console.log("top artist call!")
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
		// Returns promise with users top 3 tracks
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


	this.getPlaylists = function () {
		// Returns a promise containing users playlists
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
		//Returns a spesific playlist's tracks.
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

	this.init = function () {
		// initilize app with data made from API calls
		self.setUserCred();
		self.profileData.userData = self.getUserData();
		self.profileData.topTracks = self.getTopTracks();
		self.profileData.topArtists = self.getTopArtists();
		self.profileData.playlists = self.getPlaylists();
	}


	this.signOut = function (argument) {
		//removes all cookies
		$cookies.remove("voteifyUser")
		$cookies.remove("access_token")
		$cookies.remove("refresh_token")
	}


	this.init();
	
	return this;
});