(function(){
  'use strict';

  var Firebase = require('firebase');
  var request = require('request');
  var cheerio = require('cheerio');
  var moment = require('moment');
  var _ = require('underscore');

  var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';
  var fbUrl = 'https://fireseedangular.firebaseio.com/test/';
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
    fbase(week1,'Week1');
    var week2 = workz.slice(4,8);
    fbase(week2,'Week2');
    var week3 = workz.slice(8,12);
    fbase(week3,'Week3');
    var week4 = workz.slice(12,16);
    fbase(week4,'Week4');
    var week5 = workz.slice(16,20);
    fbase(week5,'Week5' );
    var week6 = workz.slice(20,24);
    fbase(week6,'Week6');
    var week7 = workz.slice(24,28);
    fbase(week7,'Week7');
    var week8 = workz.slice(28,31);
    fbase(week8,'Week8');
    var week9 = workz.slice(31,35);
    fbase(week9,'Week9');
    var week10 = workz.slice(35,39);
    fbase(week10,'Week10');
    var week11 = workz.slice(39,43);
    fbase(week11,'Week11');
    var week12 = workz.slice(43,45);
    fbase(week12,'Week12');
    var week13 = workz.slice(45,49);
    fbase(week13,'Week13');
    var week14 = workz.slice(49,53);
    fbase(week14,'Week14');
    var week15 = workz.slice(53,57);
    fbase(week15,'Week15');
    var week16 = workz.slice(57,61);
    fbase(week16,'Week16');
    var week17 = workz.slice(61,65);
    fbase(week17,'Week17');
    var week18 = workz.slice(65,69);
    fbase(week18,'Week18');
    var week19 = workz.slice(69,73);
    fbase(week19,'Week19');
    var week20 = workz.slice(73,77);
    fbase(week20,'Week20');
    var week21 = workz.slice(77,81);
    fbase(week21,'Week21');
    var week22 = workz.slice(81,85);
    fbase(week22,'Week22');
    var week23 = workz.slice(85,89);
    fbase(week23,'Week23');
    var week24 = workz.slice(89,93);
    fbase(week24,'Week24');
    var week25 = workz.slice(93,97);
    fbase(week25,'Week25');
    var week26 = workz.slice(97,101);
    fbase(week26,'Week26');

    function fbase(x,y){
      var temp = [];
      for(var e = 0; e<x.length; e++){

        var home = x[e].Home;
        var date = x[e].Date;
        var visit = x[e].Visitors;
        var zip = _.zip(visit,home);

        // if(zip.length > 4){
        //   var shuf = _.shuffle(zip);
        //   var sli = shuf.slice(0,4);
        //   temp.push({
        //     Date:date,
        //     Games:{Home:_.unzip(sli[0]),Visitor:_.unzip(sli[1])}
        //   });
        //
        // }else{
        //   temp.push({
        //     Date:date,
        //     Games:{Home:_.unzip(zip[0]),Visitor:_.unzip(zip[1])}
        //   });
        // }

      }
      console.log(x);
      //another(temp,y);
    }

function another(x,y){
  var url = 'https://fireseedangular.firebaseio.com/Weeks/'+y;
  var knewRef = new Firebase(url);

   knewRef.set(x);
}
  });
})();
