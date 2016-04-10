spotifyApp.factory('fbService', function ($resource, $firebaseArray) {

	var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls");
	var playVoteRef = $firebaseArray(playVoteRef);
	
	this.addPlayVoteUrl = function(data) {
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + data.id);
	    playVoteRef.set( {
	    	'playlistApiUrl': data.playlistApiUrl,
	    	'spotifyUrl': data.spotifyUrl,
	    	'rating':0, 
	    	'voteUrl': data.voteUrl,
	    	'owner': data.owner,
	    	'name' : data.name
	    	} );
	    //the object in ref should be replaced totally with the parameter object data! When rating is initialized
	}

	this.getAllSharedPlaylists = function() {
    	//returns all of the userds voteable playlists from firebase
    	return playVoteRef.$loaded().then(function (response) {
    		return response
    	})
	}

	this.getPlaylist = function(playlistId) {
    	//takes a playlisdId as input and returns specific playlist data.
    	return playVoteRef.$loaded().then(function (response){
    		return playVoteRef.$getRecord(playlistId)
    	})
	}

	return this;
});