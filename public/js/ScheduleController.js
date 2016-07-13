angular.module('sllsepaApp', [])
  .controller('ScheduleController', function($scope, $element, $http, $q) {   

  	var teamRecords = {};

  	angular.forEach(window.teamData, function(value, key) {
  		angular.forEach(value.Games, function(game, key) {
  			var homeTeamRecord = teamRecords[game[0]];
  			var awayTeamRecord = teamRecords[game[1]];
  			if (homeTeamRecord == null){
  				homeTeamRecord = {wins:0, loses:0}
  			}
  			if (awayTeamRecord == null){
  				awayTeamRecord = {wins:0, loses:0}
  			}

  			if (game.length ==5 && !(game[3] == 0 && game[4] ==0)){
	  			console.log(homeTeamRecord);
  				if (game[3] > game[4]){
  					homeTeamRecord.wins = homeTeamRecord.wins +1;
  					awayTeamRecord.loses = awayTeamRecord.loses +1;
  				}else{
  					homeTeamRecord.loses = homeTeamRecord.loses +1;
  					awayTeamRecord.wins = awayTeamRecord.wins +1;
  				}
  			}
  			teamRecords[game[0]] = homeTeamRecord;
  			teamRecords[game[1]] = awayTeamRecord;
  		});
	});

	var leagues = {};
  	angular.forEach(window.teams, function(value) {
  		var league = leagues[value[1]];
		if (league == null){
			league = [];
		}
		var team = teamRecords[value[0]];
		if (angular.isUndefined(team))
			team = {};
		team.name = value[0];
		league.push(team);
		leagues[value[1]] = league;
	});

	// var output = [];
	// for (var key in teamRecords) {
	//     teamRecords[key].name = key;   
	//     output.push(teamRecords[key]);
	// }  

	angular.forEach(leagues, function(teams, key) {
		teams.sort(function(a, b) { 
			if (a.wins > b.wins){
				return -1
			}else if (a.wins < b.wins){			
				return 1		
			}else{
				if (a.loses < b.loses)
					return -1
				else if (a.loses > b.loses)
					return 1
				else
					return 0;
			}
		    // return ((a.wins > b.wins) ? -1 : ((a.wins < b.wins) ? 1 : 0));
		});
	});
  	// $scope.teams = output;
	// console.log(leagues);
	$scope.leagues = leagues;

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
