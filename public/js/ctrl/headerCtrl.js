spotifyApp.controller('HeaderCtrl', function ($scope, Model, $location, Model) {

	$scope.active = function(linkname){
		if (linkname === $location.path()) {
			return {'opacity':1};
		};
		return {'opacity':0.5};
	}

	$scope.clearCookie = function() {
		Model.clearCookie();
	}

	$scope.signOut = function () {
		// signing out
		Model.signOut();
	}
	$scope.getConsent = function () {
		// gets cookie consent
		return Model.getCookieConsent();
	}
	$scope.setConsent = function () {
		// sets cookie consent to true
		Model.setCookieConsent();
		$scope.consent = true;
	}
});