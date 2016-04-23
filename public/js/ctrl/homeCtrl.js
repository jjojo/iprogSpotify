spotifyApp.controller('HomeCtrl', function ($scope, $http, $cookies, $resource, Model) {

	//Booleans for loading consent
	$scope.cookieConsent = Model.showConsent();

	$scope.clearCookies = function () {
		// clears cookies if any from previous sessions
		$cookies.remove("voteifyUser");
		$cookies.remove("access_token");
		$cookies.remove("refresh_token");
	}

	$scope.submitConsent = function (dontShowAgain) {
		//sets if modal is to show again and closes popup
		Model.setConsent();
		$scope.cookieConsent = true;
	}
});
