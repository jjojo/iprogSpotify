spotifyApp.factory('Model', function ($resource, $http, $q) {

	this.getProfileInfo = function(){
	//hämtar användarens information

	var req = {
	 method: 'GET',
	 url: 'https://api.spotify.com/v1/me',
	 headers: {
	   'Authorization': 'Bearer ' + 'INSERT ACCESS_TOKEN HERE'
	 },

	 data: { test: 'test' }
	}

    var temp = {};
    var defer = $q.defer();
    $http(req).then(function(data){
            temp =data;
            defer.resolve(data);
    });
    return defer.promise;
	};

	this.getTopPlaylists = function(){
	//hämtar användarens favortlistor

	var req = {
	 method: 'GET', 
	 url: 'https://api.spotify.com/v1/me/playlists?limit=10',
	 headers: {
	   'Authorization': 'Bearer ' + 'INSERT ACCESS_TOKEN HERE' //behöver kopplas ihop med "getToken" i controller
	 },
	 data: { test: 'test' }
	}

    var temp = {};
    var defer = $q.defer();
    $http(req).then(function(data){
            temp =data;
            defer.resolve(data);
            console.log(data)
    });
    return defer.promise; //ger oss tillgång till objektet
	};

	return this;
});