spotifyApp.factory('fbService', function ($resource, $firebaseArray) {

	//var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls");
	// this.coursesRef = new Firebase("https://solvation.firebaseio.com/courses");
	// var usersRef = new Firebase("https://solvation.firebaseio.com/userdata");

	//var playVote = $firebaseArray(playVoteRef);
	// var courses = $firebaseArray(this.coursesRef);
	// var users = $firebaseArray(usersRef);

	this.addPlayVoteUrl = function(data) {
		var playVoteRef = new Firebase("https://spotifyapplication.firebaseio.com/playVoteUrls/" + data.id);
	    playVoteRef.set( {
	    	'playlistApiUrl': data.playlistApiUrl,
	    	'rating':0, 'voteUrl': data.voteUrl,
	    	'owner': data.owner
	    	} );
	}



	return this;
});