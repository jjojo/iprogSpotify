spotifyApp.factory('fbService', function ($resource, $firebaseArray) {

	var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls");
	var playVoteRef = $firebaseArray(playVoteRef);

	this.addVoteRating = function(playlist, value) {
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + playlist.$id);
	    
	    playVoteRef.once("value", function(snapshot) {
  			var votesSnapshot = snapshot.child("votes");
 			this.votes = votesSnapshot.val();
  		});
	    
	    playVoteRef.once("value", function(snapshot) {
  			var rateSnapshot = snapshot.child("totalRating");
 			this.rating = rateSnapshot.val();
  		});
	    playVoteRef.update ({
	    	'votes': votes + 1,
	    	'totalRating' : rating + value,
		})
	};
	
	this.addPlayVoteUrl = function(data) {
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + data.id);
	    playVoteRef.set( {
	    	'playlistApiUrl': data.playlistApiUrl,
	    	'spotifyUrl': data.spotifyUrl,
	    	'votes': 0, 
	    	'totalRating': 0,
	    	'averageRating': 0,
	    	'voteUrl': data.voteUrl,
	    	'owner': data.owner,
	    	'name' : data.name,
	    	'playlistSongs' : data.playlist,
	    	'shared' : data.shared
	    	});
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