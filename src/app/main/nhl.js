(function(){
  'use strict';

  var Firebase = require('firebase');
  var request = require('request');
  var cheerio = require('cheerio');
  var moment = require('moment');
  var _ = require('underscore');

  var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';
  var fbUrl = 'https://fireseedangular.firebaseio.com';
  var ref = new Firebase(fbUrl);
  var something = [];
  var dates = [];
  var final = [];
  var hTeam = [];
  var vTeam = [];
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var teams = $('td > a');
      // var date = $('tr').next().text();

      teams.each(function(i, team){
        var names = team.children;
        var date = team.parent.attribs.csk;
        dates.push(date);

        for(var a = 0; a<names.length; a++){
          var games = names[a].data;
           something.push(games);
        }
      });
    }


    for(var b = 0; b<dates.length && b<something.length; b++){

      var kick = dates[b].slice(4,12);

      var a = moment(kick, 'YYYYMMDD').format('dddd MMM Do YYYY');
      var c = moment(kick, 'YYYYMMDD').format('dddd');
      // var d = moment(kick, 'YYYYMMDD').format('ll');
      if(c === 'Sunday' || c === 'Saturday' || c === 'Friday' || c === 'Thursday'){

        if(b % 2 === 0){
          vTeam.push({
            Date:a,
            Visitor:something[b],
          });
        }else{
          hTeam.push({
          Home:something[b]
        });
        }
      }
    }
    for(var d =0; d<hTeam.length && d<vTeam.length; d++){

      final.push({
        date:vTeam[d].Date,
        Visitor:vTeam[d].Visitor,
        Home:hTeam[d].Home
      });
    }

    // This puts all the same dates together
    var workz = _.chain(final).groupBy('date').map(function(value, key){
      return{
        Date:key,
        Visitors:_.pluck(value, 'Visitor'),
        Home:_.pluck(value, 'Home')
      };
    }).value();
    var weekOne = [];
    var weekTwo = [];
    var week1 = workz.slice(0,4);
    var week2 = workz.slice(4,8);
    weekOne.push(week1);
    weekTwo.push(week2);
    console.log(weekTwo);
    // This splits the dates into groups of 4 ie (weeks)
    // This gets fucked up when there is no thurs games
    var e, j, temparray, chunk = 4;
    for(e=0,j=workz.length; e<j; e+=chunk){
      temparray = workz.slice(e,e+chunk);
      // Fb only gets the last for which is off getting the last sunday when the last week should only have three days
      /*
      I think what I would like is this
        - Week one
          - Dates
            - Games
        - Week two
          - Dates
            - Games
      */
      /* What do I want to do
        - Push each collection into a new array (ie weeks)
        - Without changing the name everything gets replaced
        - Dont think i can get it with temp[1]
      */
      //console.log(temparray[0]);
    }

  });
})();
