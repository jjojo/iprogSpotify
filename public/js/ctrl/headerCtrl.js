spotifyApp.controller('HeaderCtrl', function ($scope, Model, $location) {

	$scope.active = function(linkname){
		//highlights current tab
		if (linkname === $location.path()) {
			return {'opacity':1};
		};
		return {'opacity':0.5};
	}


	$scope.signOut = function () {
		// signing out
		Model.clearCookies();
	}


	$scope.getConsent = function () {
		// gets cookie consent
		$scope.consent = Model.consent;
		console.log(Model.consent);
		return Model.getCookieConsent();
	}

	
	$scope.setConsent = function () {
		// sets cookie consent to true
		Model.setCookieConsent();
		$scope.consent = Model.consent;
	}
});