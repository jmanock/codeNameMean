exports.render = function(req, res){
  var Player = require('../models/player.js');
  var User = require('../models/user.js');
  var Tournament = require('../models/tournament.js');

  var Q = require('q');
  var util = require('util');
  var request = require('request');

  var tournamentJSON = {};

  function getAllScores(tournament){
    var promises = [];
    var tournamentPromise = tournamentCardPromise('http://www.pgatour.com/data/r/'+ tournament.tournamentCode + '/leaderboard-v2.json');
    promises.push(tournamentPromise);
    for(var a = 0; a<tournament.teams.length; a++){
      var promise = getTeamScores(tournament.teams[a]);
      promises.push(promise);
      var namePromise = getUserFromId(tournament.teams[a].user_id);
      promises.push(namePromise);
    }
    return Q.all(promises);
  }

  function getTeamScores(team){
    var promises = [];
    for(var b = 0; b<team.players.length; b++){
      var scorecardURL = 'http://www.pgatour.com/data/r/'+tournamentJSON.tournamentCode + '/scorecards/'+team.players[b]+'.json';
      var promise = request(scorecardURL);//requestp
      promises.push(promise);
    }
    return Q.all(promises);
  }

  function isTrahHole(holeNum){
    var trashHole = false;
    for(var a = 0; a<tournamentJSON.trashHoles.length; a++){
      if(Number(holeNum) == Number(tournamentJSON.trashHoles[a])){
        trashHole = true;
      }
    }
    return trashHole;
  }

  function getBlankGolferData(rounds){
    var data = {
      'id':'',
      'finalScore':99,
      'trashBirdies':0,
      'eagles':0,
      'tross':0,
      'rnds':[],
      'others':[]
    };
    for(var i =0; i<rounds; i++){
      data.rnds.push({
        'eagles':0,
        'trashBirdies':0,
        'tross':0,
        'score':0,
        'lowRounds':false,
        'others':[],
        'holesPlayed':0
      });
    }
    return data;
  }

  function clacLowRounds(groupsAndScores){
    var lowScoresPerRound = [99,99,99,99];
    for(var i =0; i<groupsAndScores.length; i++){
      for(var j = 0; j<groupsAndScores[i].players.length; j++){
        for(var k = 0; k<groupsAndScores[i].players[j].rnds.length; k++){
          if(Number(groupsAndScores[i].players[j].rnds[k].score)<lowScoresPerRound[k]){
            lowScoresPerRound[k] = Number(groupsAndScores[i].players[j].rnds[k].score);
          }
        }
      }
    }
    for(var a = 0; a<groupsAndScores.length; a++){
      for(var b = 0; b<groupsAndScores[a].players.length; b++){
        for(var c = 0; c<groupsAndScores[a].players[b].rnds.length; c++){
          if(lowScorePerRounds[c] == Number(groupsAndScores[a].players[b].rnds[c].score)){
            groupsAndScores[a].players[b].rnds[c].lowRound = true;
          }
        }
      }
    }
    return groupsAndScores;
  }

  function tournamentCardPromise(url){
    var deferred = Q.defer();
    request(url, function(error, response, body){
      if(!error){
        var scorecard = JSON.parse(body);
        deferred.resolve(scorecard);
      }else{
        deferred.reject(error);
      }
    });
    return deferred.promise;
  }

  function requestp(url) {
  var data;
  var deferred = Q.defer();
  request(url, function (error, response, body) {
      if (!error) {
          var scorecard = JSON.parse(body);
          data = getBlankGolferData(scorecard.p.rnds.length);
          getNameFromId(scorecard.p.id).then(function(player){
              var finalRound = scorecard.p.rnds[scorecard.p.rnds.length - 1];
              var finalHole = finalRound.holes[finalRound.holes.length - 1];
              data.finalScore = finalHole.pTot;
              data.id = scorecard.p.id;
              data.name = player.name;

              //loop through each round
              for (var i = 0; i < scorecard.p.rnds.length; i++) {
                  //loop through each hole of each round to check for birdie or eagle trash
                  for (var n = 0; n < scorecard.p.rnds[i].holes.length; n++) {
                      //have you finished this hole yet? if you haven't, you wont have a score yet
                      if (scorecard.p.rnds[i].holes[n].sc !== "") {
                          //is first hole of round? needs special logic
                          if (scorecard.p.rnds[i].holes[n].n == "1") {
                              //did you eagle the first hole?
                              if (scorecard.p.rnds[i].holes[n].pDay == "-3") {
                                  //nice albatross guy
                                  data.rnds[i].tross++;
                                  data.tross++;
                              } else if (scorecard.p.rnds[i].holes[n].pDay == "-2") {
                                  data.rnds[i].eagles++;
                                  data.eagles++;
                              } else if (Number(scorecard.p.rnds[i].holes[n].pDay) >= 2) {
                                  //looks like double bogey or worse
                                  data.rnds[i].others.push(Number(scorecard.p.rnds[i].holes[n].pDay));
                                  data.others.push(Number(scorecard.p.rnds[i].holes[n].pDay));
                                  //did you birdie a trash hole - make sure to use cNum in case player started on the back 9
                              } else if (isTrashHole(scorecard.p.rnds[i].holes[n].cNum)) {
                                  if (scorecard.p.rnds[i].holes[n].pDay == "-1") {
                                      data.rnds[i].trashBirdies++;
                                      data.trashBirdies++;
                                  }
                              }
                          } else {
                              if (Number(scorecard.p.rnds[i].holes[n].pDay) - Number((scorecard.p.rnds[i].holes[n-1].pDay)) == -3) {
                                  //nice albatross guy
                                  data.rnds[i].tross++;
                                  data.tross++;
                              } else if (Number(scorecard.p.rnds[i].holes[n].pDay) - Number((scorecard.p.rnds[i].holes[n-1].pDay)) == -2) {
                                  //did you eagle - your current round score minus previous hole's current round score is -2 or less?
                                  data.rnds[i].eagles++;
                                  data.eagles++;
                              } else if (Number(scorecard.p.rnds[i].holes[n].pDay) - Number((scorecard.p.rnds[i].holes[n-1].pDay)) >= 2) {
                                  //looks like double bogey or worse
                                  data.rnds[i].others.push(Number(scorecard.p.rnds[i].holes[n].pDay) - Number((scorecard.p.rnds[i].holes[n-1].pDay)));
                                  data.others.push(Number(scorecard.p.rnds[i].holes[n].pDay) - Number((scorecard.p.rnds[i].holes[n-1].pDay)));
                              } else if (isTrashHole(scorecard.p.rnds[i].holes[n].cNum)) {
                                  if (Number(scorecard.p.rnds[i].holes[n].pDay) - Number((scorecard.p.rnds[i].holes[n - 1].pDay)) == -1) {
                                      data.rnds[i].trashBirdies++;
                                      data.trashBirdies++;
                                  }
                              }
                          }
                          //set your current score
                          data.rnds[i].score = scorecard.p.rnds[i].holes[n].pDay;
                          //you've finished all 18
                          data.rnds[i].holesPlayed = Number(scorecard.p.rnds[i].holes[n].n);
                      } else {
                          //if you haven't finished this hole, then the previous one is your most recently finished
                          data.rnds[i].holesPlayed = Number(scorecard.p.rnds[i].holes[n].n) - 1;
                          //your current score for this round
                          if (n > 0) {
                              data.rnds[i].score = scorecard.p.rnds[i].holes[n-1].pDay;
                          } else {
                              //if n is 0, you haven't started round
                              //current rd score is 0
                              data.rnds[i].score = 0;
                          }
                          //lets break out of this loop to stop checking each hole - we know this guy hasn't played any more holes
                          break;
                      }
                  }
              }
              deferred.resolve(data);
          });
      } else {
          deferred.reject(error);
      }
  });
  return deferred.promise;
}

function getNameFromId(id){
  return Player.findOne({'id':id}).exec();
}

function getUserFromId(id){
  return User.findOne({'id':id}).exec();
}

function getTournamentFromId(id){
  return Tournament.findOne({'TournamentCode':id}).exec();
}

function getMoneyEarned(player,isAnti){
  var money = 0;
  money += player.eagles * tournamentJSON.eaglePrice;
  money += player.trashBirdies * tournamentJSON.trashPrice;
  if(isAnti){
    money *= 1;
    for(var i = 0; i<player.others.length; i++){
      money += tournamentJSON.parOrWorsePayoutsAnti[player.others[i]];
    }
  }else{
    for(var j = 0; j<player.others.length;j++){
      money += tournamentJSON.parOrWorsePayouts[player.others[j]];
    }
  }
  money += getFinalScoreMoney(player.position,isAnti);
  return money;
}

function getFinalScoreMoney(position,isAnti){
  var money = 0;
  if(position !== 'CUT'){
    position = position.replace('T', '');
    position = parseInt(position);
    if(position === 1){
      money = 20;
    }else if(position <= 3){
      money = 10;
    }else if(position <= 10){
      moeny = 5;
    }
  }else{
    if(isAnti){
      money = 5;
    }
  }
  return money;
}

function setUserNamesToTeams(data){
  var newData = [];
  for(var i = 0; i<data.length; i++){
    if(!util.isArray(data[i])){
      data[i-1].userName = data[i].name;
      newData.push({
        'name':data[i].name,
        'players':data[i-1]
      });
    }
  }
  return newData;
}

getTournamentFromId(req.params.tournament_id).then(function(tournament){
  tournamentJSON = tournament;
  getAllScores(tournament).then(function(groupsAndScores){
    var leaderboard = groupsAndScores.splice(0,1);
    groupsAndScores = setUserNamesToTeams(groupsAndScores);
    groupsAndScores = calcLowRounds(groupsAndScores);
    for(var i = 0; i<groupsAndScores.length; i++){
      for(var j = 0; j<groupsAndScores[i].players.length; j++){
        for(var k = 0; k<leaderboard[0].leaderboard.players.length; k++){
          if(groupsAndScores[i].players[j].id == leaderboard[0].leaderboard.players[k].player_id){
            groupsAndScores[i].players[j].position = leaderboard[0].leaderboard.players[k].current_position ? leaderboard[0].leaderboard.players[k].current_position: 'CUT';
            groupsAndScores[i].players[j].finalScore = leaderboard[i].leaderboard.players[k].total;
          }
        }
        var isAnti = (j == groupsAndScores[i].length -1);
        groupsAndScores[i].players[j].money = getMoneyEarned(groupsAndScores[i].players[j], isAnti);
      }
    }
    res.json(groupsAndScores);
  }, function(rejection){
    console.log(rejection);
  });
});
};
