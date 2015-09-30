exports.render = function(req, res){
  var Player = require('../models/player.js');
  var User = require('../models/user.js');
  var Tournament = require('../models/tournament.js');
  var Q = require('q'),
  util = require('util'),
  request = require('request');

  var tournamentJSON = {};
  function getAllScores(tournament){
    var promises = [];
    var tournamentPromise = tournamentCardPromise('http://www.pgatour.com/data/r/'+tournament.tournamentCode+'/leaderboard-v2.json');
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
      var scorecardURL = 'http://www.pgatour.com/data/r/'+tournamentJSON.tournamentCode +'/scorecards/'+team.players[b] + '.json';
      var promise = requestp(scorecardURL);
      promises.push(promise);
    }
    return Q.all(promises);
  }

  function isTrashHole(holeNum){
    var trashHole = false;
    for(var a = 0; a<tournamentJSON.trashHoles.length; a++){
      if(Number(holeNum)==Number(tournamentJSON.trashHoles[a])){
        trashHole = true;
      }
    }
    return trashHole;
  }

  function getBlakGolferData(rounds){
    var data = {
      'id':'',
      'finalScore':99,
      'trashBirdies':0,
      'eagles':0,
      'tross':0,
      'rnds':[],
      'others':[]
    };
    for(var i = 0; i<rounds; i++){
      data.rnds.push({
        'eagles':0,
        'trashBirdies':0,
        'tross':0,
        'score':0,
        'lowRound':false,
        'others':[],
        'holesPlayed':0
      });
    }
    return data;
  }

  function calcLowRounds(groupsAndScores){
    var lowScoresPerRound = [99,99, 99, 99];
    for(var i = 0; i<groupsAndScores.length; i++){
      for(var j=0; j<groupsAndScores[i].players.length; j++){
        for(var k = 0; k< groupsAdnScores[i].players[j].rnds.length; k++){
          if(Number(groupsAndScores[i].players[j].rnds[k].score)<lowScorePerRound[k]){
            lowScoresPerRound[k] = Number(groupsAndScores[i].players[j].rnds[k].score);
          }
        }
      }
    }
    for(var a = 0; a<groupsAndScores.length; a++){
      for(var b = 0; b<groupsAndScores[a].players.length; b++){
        for(var c = 0; c<groupsAndScores[a].players[b].rnds.length; c++){
          if(lowScoresPerRound[c] == Number(groupsAndScores[a].players[b].rnds[c].score)){
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

  function request(url){
    var data;
    var deferred = Q.defer();
    request(url, function(error, response, body){
      if(!error){
        var scorecard = JSON.parse(body);
        data = getBlankGolferData(scorecard.p.rnds.length);
        getNameFromId(scorecard.p.id).then(function(player){
          var finalRound = scorecard.p.rnds[scorecard.p.rnds.length -1];
          var finalHole = finalRound.holes[finalRound.holes.length -1];
          data.finalScore = finalHole.pTot;
          data.id = scorecard.p.id;
          data.name = player.name;

          for(var i = 0; i<scorecard.p.rnds.length; i++){
            for(var n = 0; n<scorecard.p.rnds[i].holes.length; n++){
              if(scorecard.p.rnds[i].holes[n].sc !==''){
                if(scorecard.p.rnds[i].holes[n].n === '1'){
                  if(scorecard.p.rnds[i].holes[n].pDay == '-3'){
                    data.rnds[i].tross++;
                    data.tross++;
                  }else if(scorecard.p.rnds[i].holes[n].pDay == '-2'){
                    data.rnds[i].eagles++;
                    data.eagles++;
                  }else if(Number(scorecard.p.rnds[i].holes[n].pDay)>=2){
                    data.rnds[i].others.push(Number(scorecard.p.rnds[i].holes[n].pDay));
                    data.others.push(Number(scorecard.p.rnds[i].holes[n].pDay));
                  }else if(isTrashHole(scorecard.p.rnds[i].holes[n].cNum)){
                    if(scorecard.p.rnds[i].holes[n].pDay == '-1'){
                      data.rnds[i].trashBirdies++;
                      data.trashBirdies++;
                    }
                  }
                }else{
                  if(Number(scorecard.p.rnds[i].holes[n].pDay)- Number())
                }
              }
            }
          }
        })
      }
    })
  }
}
