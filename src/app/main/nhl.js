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
    var first = [];
    for (var i = 0; i<final.length; i++){
      var date = final[i].date;
      first.push(date);
    }
    var second = [];
    var count = 0;
    for(var x = 0; x<first.length && x<final.length; x++){
      if(first[x] === first[x-1]){
        var z = x-count;
        second.push(z);
        count++;
      }else{
        second.push(x+1);
        count = 0;
      }

    }
// Got the dates marked off
// Next step is to seperate them into weeks
// Not sure how this is going to work yet might just have to put them in by had
// 1st game is going to be added twice 


    // var week1 = final.slice(0,4);
    // fbase(week1,'Week1');
    // var week2 = final.slice(4,8);
    // fbase(week2,'Week2');
    // var week3 = final.slice(8,12);
    // fbase(week3,'Week3');
    // var week4 = final.slice(12,16);
    // fbase(week4,'Week4');
    // var week5 = final.slice(16,20);
    // fbase(week5,'Week5' );
    // var week6 = final.slice(20,24);
    // fbase(week6,'Week6');
    // var week7 = final.slice(24,28);
    // fbase(week7,'Week7');
    // var week8 = final.slice(28,31);
    // fbase(week8,'Week8');
    // var week9 = final.slice(31,35);
    // fbase(week9,'Week9');
    // var week10 = final.slice(35,39);
    // fbase(week10,'Week10');
    // var week11 = final.slice(39,43);
    // fbase(week11,'Week11');
    // var week12 = final.slice(43,45);
    // fbase(week12,'Week12');
    // var week13 = final.slice(45,49);
    // fbase(week13,'Week13');
    // var week14 = final.slice(49,53);
    // fbase(week14,'Week14');
    // var week15 = final.slice(53,57);
    // fbase(week15,'Week15');
    // var week16 = final.slice(57,61);
    // fbase(week16,'Week16');
    // var week17 = final.slice(61,65);
    // fbase(week17,'Week17');
    // var week18 = final.slice(65,69);
    // fbase(week18,'Week18');
    // var week19 = final.slice(69,73);
    // fbase(week19,'Week19');
    // var week20 = final.slice(73,77);
    // fbase(week20,'Week20');
    // var week21 = final.slice(77,81);
    // fbase(week21,'Week21');
    // var week22 = final.slice(81,85);
    // fbase(week22,'Week22');
    // var week23 = final.slice(85,89);
    // fbase(week23,'Week23');
    // var week24 = final.slice(89,93);
    // fbase(week24,'Week24');
    // var week25 = final.slice(93,97);
    // fbase(week25,'Week25');
    // var week26 = final.slice(97,101);
    // fbase(week26,'Week26');

// function fbase(x,y){
//   var temp = {};
//   for(var g = 0; g<x.length; g++){
//     var date = x[g].Date;
//     var Home = x[g].Home;
//     var Visitors = x[g].Visitors;
//     var zip = _.zip(Visitors,Home);
//
//     temp.Home = Home;
//     temp.Date = date;
//     temp.Visitor = Visitors;
//
//   }
//
// }
function fbase(x,y){
  console.log(x,y);
}

function another(x,y,z){
  //var url = 'https://fireseedangular.firebaseio.com/Weeks/'+y;
  //var knewRef = new Firebase(url);
  console.log(z,x,y);

}
  });
})();
