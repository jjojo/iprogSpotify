spotifyApp.controller('HomeCtrl', function ($scope, Model) {

	//Variable for loading users cookie consent
	$scope.cookieConsent = Model.showConsent();


	$scope.clearCookies = function () {
		// clears cookies if any from previous sessions
		Model.clearCookies();
	}


	$scope.submitConsent = function () {
		//sets cookie policy to hidden during session
		Model.setConsent();
		$scope.cookieConsent = true;
	}
});
