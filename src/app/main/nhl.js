(function(){
  'use strict';

  var Firebase = require('firebase');
  var request = require('request');
  var cheerio = require('cheerio');
  var moment = require('moment');
  var _ = require('underscore');

  var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';
  var fbUrl = 'https://fireseedangular.firebaseio.com/';
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

    var week1 = workz.slice(0,4);
    var week2 = workz.slice(4,8);
    var week3 = workz.slice(8,12);
    var week4 = workz.slice(12,16);
    var week5 = workz.slice(16,20);
    var week6 = workz.slice(20,24);
    var week7 = workz.slice(24,28);
    var week8 = workz.slice(28,31);
    var week9 = workz.slice(31,35);
    var week10 = workz.slice(35,39);
    var week11 = workz.slice(39,43);
    var week12 = workz.slice(43,45);
    var week13 = workz.slice(45,49);
    var week14 = workz.slice(49,53);
    var week15 = workz.slice(53,57);
    var week16 = workz.slice(57,61);
    var week17 = workz.slice(61,65);
    var week18 = workz.slice(65,69);
    var week19 = workz.slice(69,73);
    var week20 = workz.slice(73,77);
    var week21 = workz.slice(77,81);
    var week22 = workz.slice(81,85);
    var week23 = workz.slice(85,89);
    var week24 = workz.slice(89,93);
    var week25 = workz.slice(93,97);
    var week26 = workz.slice(97,101);

    ref.set({
      Week1:week1,
      Week2:week2,
      Week3:week3,
      Week4:week4,
      Week5:week5,
      Week6:week6,
      Week7:week7,
      Week8:week8,
      Week9:week9,
      Week10:week10,
      Week11:week11,
      Week12:week12,
      Week13:week13,
      Week14:week14,
      Week15:week15,
      Week16:week16,
      Week17:week17,
      Week18:week18,
      Week19:week19,
      Week20:week20,
      Week21:week21,
      Week22:week22,
      Week23:week23,
      Week24:week24,
      Week25:week25,
      Week26:week26
    });
    var total = 0;
    for(var e = 0; e<week1.length; e++){
      var home = week1[e].Home;
      var date = week1[e].Date;
      var visit = week1[e].Visitors;
      var some = _.zip(visit,home);

      total += some.length;

      if(some.length > 4){
        /*
          ~ Need to shuffle and add to fb
          ~ Remove or pluck
        */
        var shuf = _.shuffle(some);
        console.log(date);
        console.log(shuf[0]);
        console.log(shuf[1]);
        console.log(shuf[2]);
        console.log(shuf[3]);
      }else{
        console.log(date);
        console.log(some);
      }

      // console.log(date,home.length, visit.length);
    }


  });
})();
