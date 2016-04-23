spotifyApp.factory('fbService', function ($resource, $firebaseArray) {

	//variable that holds ref to fb
	var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls");
	var playVoteRef = $firebaseArray(playVoteRef);

	this.addVoteRating = function(playlist) {
		//updates the playlist votes in fb
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + playlist.$id);
	    playVoteRef.update ({
	    	'votes': playlist.votes,
	    	'totalRating' : playlist.totalRating,
	    	'rating' : playlist.rating
		})
	};
	
	this.addPlayVoteUrl = function(data) {
		//adds the playlist with relevant data to fb
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + data.id);
	    playVoteRef.set( {
	    	'playlistApiUrl': data.playlistApiUrl,
	    	'spotifyUrl': data.spotifyUrl,
	    	'votes': 0, 
	    	'totalRating': 0,
	    	'rating' : 0,
	    	'voteUrl': data.voteUrl,
	    	'owner': data.owner,
	    	'name' : data.name,
	    	'playlistSongs' : data.playlist,
	    	'shared' : data.shared,
	    	'sharedBy' : data.sharedBy,
	    	'image' : data.image,
	    	'totalTracks' : data.totalTracks
	    	});
	    //the object in ref should be replaced totally with the parameter object data! When rating is initialized
	}

	this.deletePlaylistUrl = function(data) {
		//Removes playlist from fb
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + data.id);
	    playVoteRef.remove();
	}

	this.getAllSharedPlaylists = function() {
    	//returns all of the userds voteable playlists from firebase
    	return playVoteRef.$loaded().then(function (response) {
    		return response
    	})
	}

	this.getPlaylist = function(playlistId) {
    	//takes a playlistId as input and returns specific playlist data.
    	return playVoteRef.$loaded().then(function (response){
    		return playVoteRef.$getRecord(playlistId)

    	})
	}
	

	this.getUsersPlaylists = function(user) {
		//returns a user playlists that are stored in fb
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/");
		var playVoteRef = $firebaseArray(playVoteRef);
		return playVoteRef.$loaded().then(function (response){
			return playVoteRef.$getRecord("playVoteUrls")
    	})
	}

	return this;
});