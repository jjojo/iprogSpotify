spotifyApp.controller('HomeCtrl', function ($scope, $http, $cookies, $resource, Model) {

	//Variable for loading users cookie consent
	$scope.cookieConsent = Model.showConsent();

	$scope.clearCookies = function () {
		// clears cookies if any from previous sessions
		$cookies.remove("voteifyUser");
		$cookies.remove("access_token");
		$cookies.remove("refresh_token");
	}

	$scope.submitConsent = function () {
		//sets cookie policy to hidden during session
		Model.setConsent();
		$scope.cookieConsent = true;
	}
});
