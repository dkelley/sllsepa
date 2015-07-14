angular.module('sllsepaApp', [])
  .controller('ScheduleController', function($scope, $element, $http, $q) {   
	$scope.submitScore = function(division, modalName, homeTeam, awayTeam) {
		$http.post('/score', {"division": division, homeScore:$scope.homeScore, awayScore:$scope.awayScore, "homeTeam": homeTeam, "awayTeam": awayTeam}).
		  success(function(data, status, headers, config) {
	    	// this callback will be called asynchronously
	    	// when the response is available
		    $('#'+modalName).foundation('reveal', 'close');
	  	}).
	  	error(function(data, status, headers, config) {
	  		alert("error submitting score");
	  	});
	};
  });
