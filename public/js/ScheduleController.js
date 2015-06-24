angular.module('sllsepaApp', [])
  .controller('ScheduleController', function($scope, $element, $http, $q) {   
	$scope.submitScore = function(modalName) {
		$http.post('/score', {homeScore:$scope.homeScore, awayScore:$scope.awayScore}).
		  success(function(data, status, headers, config) {
	    	// this callback will be called asynchronously
	    	// when the response is available
		    $('#'+modalName).foundation('reveal', 'close');
	  	}).
	  	error(function(data, status, headers, config) {
	    	// called asynchronously if an error occurs
	    	// or server returns response with an error status.
	  	});
	};

  });
