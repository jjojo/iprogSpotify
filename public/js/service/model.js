spotifyApp.factory('Model', function ($resource, $http, $q, $cookies, $interval, $location) {
	
	//initiates variables for error handling
	var self = this;
	this.profileData = {
		topData:{}
	};

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

	this.authenticatetion = function(){
		//Checks if the user is signed in. If not, redirects to error-page. Else refresh the users token.
		var user = $cookies.get("voteifyUser");

		if(!user){
			$location.path("/error"); 
		}else{
			refreshToken();
			return
		}
	} 

	this.setUserCred = function () {
		// stores username, access_token and refresh_token to session cookies.
		if (typeof($cookies.get("voteifyUser")) === 'undefined'){
			var tokens = $location.search();
			
			$cookies.put("access_token", tokens.access_token);
			$cookies.put("refresh_token", tokens.refresh_token);
			$cookies.put("voteifyUser", tokens.user);
			
			$interval(function () {
				refreshToken();
			},(1000*60*59)); //timeout set to refresh access_token each 59 minutes.
		} else {
			return 
		}
	}

	this.getUserId = function () {
		//returns current user
		return $cookies.get("voteifyUser")	
	}

	this.getUserData = function () {
		// Returns a promise with user data from spotifyAPI
		// and sets votefyUser-cookie
		return req('/me').then(function(res) {
            if (!res || res.error) {
                return "ERROR";
            } else {
                return res.data;
            }
        });
	}

	this.getTopArtists = function () {
		// Returns promise with users top 3 artists
		return req('/me/top/artists?limit=5').then(function(res) {
            if (!res || res.error) {
                return "ERROR";
            } else {
               return res.data;
            }
        });
	}

	this.getTopTracks = function () {
		// Returns promise with users top 3 tracks
		return req('/me/top/tracks?limit=5').then(function(res) {
            if (!res || res.error) {
                return "ERROR";
            } else {
                return res.data;
            }
        });
	}

	this.getPlaylists = function () {
		// Returns a promise containing users playlists
		return req('/me/playlists').then(function(res) {
            if (!res || res.error) {
            	return "ERROR";
            } else {
                return res.data;
            }
        });
	}


	this.getPlaylistSongs = function(playlist) {
		//Returns a spesific playlist's tracks.
		var userInfo = '/users/' + playlist.owner.id + '/playlists/' + playlist.id + '/tracks'
		return req(userInfo).then(function(res) {
            if (!res || res.error) {
            	console.log(res)
                return "ERROR";
            } else {
                return res;
            }
        });
	}

	this.init = function () {
		// initilize app with data made from API calls
		self.setUserCred();

		var userData = self.getUserData().then(function(res){
			self.profileData.userData = res;
		});
		var topTracks = self.getTopTracks().then(function(res){
			self.profileData.topData.topTracks = res;
			self.profileData.topData.topTracks.title = 'Top Tracks';
		});
		var topArtists = self.getTopArtists().then(function(res){
			self.profileData.topData.topArtists = res;
			self.profileData.topData.topArtists.title = 'Top Artists';
		});
		var playlists = self.getPlaylists().then(function(res){
			self.profileData.playlists = res;
		});
		
		return $q.all([userData, topTracks, topArtists, playlists])
	}

	this.setShowModal = function (bool) {
		// sets if modal shows next time user visits
		// and makes sure we only see the popup once in session.
		localStorage.showModal = bool;
		sessionStorage.showModal = false;
	}

	this.showModal = function () {
		// Returns if modal should be showing or not.
		if (localStorage.showModal === 'false' 
		|| sessionStorage.showModal === 'false') {
			return false;
		}else{
			return true;
		}
	}

	this.setConsent = function () {
		// sets cookie policy hide
		sessionStorage.consent = true;
	}

	this.showConsent = function () {
		// Returns if cookie policy should be showing or not.
		if (sessionStorage.consent === 'true') {
			return true;
		}else{
			return false;
		}
	}

	this.setVote = function (voteValue) {
		// stores the vote during session
		sessionStorage.vote = voteValue;
	}

	this.showVote = function () {
		// Returns if user can vote or not
		if (typeof(sessionStorage.vote) === 'undefined') {
			return 0;
		}else{
			return sessionStorage.vote;
		}
	}

	this.signOut = function (argument) {
		//removes all cookies
		$cookies.remove("voteifyUser")
		$cookies.remove("access_token")
		$cookies.remove("refresh_token")
	}

	//runs initial functions
	this.init();
	return this;
});