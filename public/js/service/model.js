spotifyApp.factory('Model', function ($resource, $http, $q, $timeout) {

	// a object containing settings for our app
	this.settings = {
		'access_token' : "",
	}

	var self = this;

	var req = function (url) {
		// returns a "spotify-ready" http request from the url argument
		return $http({ 
			url: 'https://api.spotify.com/v1' + url,
			headers: {'Authorization': 'Bearer ' + self.settings.access_token}
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
	
	this.signedIn = function () {
		// body...
		if (this.settings.access_token) {
			return true
		}else{
			return false
		}
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


	return this;
});