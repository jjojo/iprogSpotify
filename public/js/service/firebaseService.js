spotifyApp.factory('fbService', function ($resource, $firebaseArray, Model) {

	//variable that holds ref to fb
	var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls");
	var playVoteRef = $firebaseArray(playVoteRef);

	this.addVoteRating = function(playlist, rating) {
	//updates the playlist votes in fb
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + playlist.$id);
	    playVoteRef.update ({
	    	'votes': playlist.votes += 1,
	    	'totalRating' : playlist.totalRating += rating,
	    	'rating' : Math.round(((playlist.totalRating)/(playlist.votes)) * 100) / 100
		})
	};

	this.deleteVoteRating = function(playlist, oldRating) {
	// deletes users previous vote on the playlist
		if (playlist.votes === 1) {
			votes = 1;
		}else{
			votes = playlist.votes - 1;
		}
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + playlist.$id);
	    playVoteRef.update ({
	    	'votes': playlist.votes -= 1,
	    	'totalRating' : playlist.totalRating -= oldRating,
	    	'rating' : Math.round(((playlist.totalRating)/(votes)) * 100) / 100
		})
	};
	
	this.addPlayVoteUrl = function(playlist, userId) {
	// Adds playlist data to firebase, takes playlist and a user id.
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + playlist.id);
		
		Model.getPlaylistSongs(playlist).then(function (res) {
			var playlistSongs = res.data;
		    playVoteRef.set( {
		    	'playlistApiUrl': playlist.href,
		    	'spotifyUrl': playlist.external_urls.spotify,
		    	'votes': 0, 
		    	'totalRating': 0,
		    	'rating' : 0,
		    	'voteUrl': '#/vote/' + playlist.id,
		    	'owner': playlist.owner.id,
		    	'name' : playlist.name,
		    	'playlistSongs' : playlistSongs,
		    	'shared' : true,
		    	'sharedBy' : userId,
		    	'image' :playlist.images[0].url,
		    	'totalTracks' : playlist.tracks.total
		    });
		});
	}

	this.deletePlaylistUrl = function(data) {
		//Removes playlist from fb
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + data.id);
	    playVoteRef.remove();
	}

	this.getPlaylist = function(playlistId) {
    	//takes a playlistId as input and returns specific playlist data.
    	return playVoteRef.$loaded().then(function (res){
    		return playVoteRef.$getRecord(playlistId);
    	})
	}
	
	this.getUsersPlaylists = function() {
		//returns current users playlists that are up for vote
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls");
		var playVoteRef = $firebaseArray(playVoteRef);
		
		return playVoteRef.$loaded().then(function (res){
			var usersPlaylists = [];
			
			angular.forEach(res, function(value, key) {
				if (value.sharedBy === Model.getUserId()) {
					usersPlaylists.push(value);
				};
       		});
			return usersPlaylists;
    	})
	}

	return this;
});