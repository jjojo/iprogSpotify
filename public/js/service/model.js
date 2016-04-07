spotifyApp.factory('Model', function ($resource, $http, $q) {

	//
	//	Get data from server
	//

	// this.getToken = function () {
	// 	// body...
	// 	var deferred = $q.defer();
	// 	$http.get('/token')
	// 		.then(function(response) {
 //                console.log(response)
 //                if (!response) {
 //                    deferred.reject('Error occured');
 //                    console.log(response, "ERROR");
 //                } else {
 //                    deferred.resolve(response);
 //                    console.log("SUCCESS")
 //                    console.log(response);
 //                }
 //            });
 //            //console.log(deferred.promise);
 //            return deferred.promise;
	// }

	// this.getToken()


	return this;
});