(function(){
  'use strict';
  var request = require('request');
  var cheerio = require('cheerio');
  var moment = require('moment');
  var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';
  var something = [];
  var vTeam = [];
  var hTeam = [];
  var dates = [];
  var cut = [];
  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var link = $('td > a');
      var date = $('tr').next().text();



      link.each(function(i,links){
        var knames = links.children;
        var date = links.parent.attribs.csk;
        dates.push(date);

        for(var j = 0; j<knames.length; j++){
          var games = knames[j].data;
          something.push(games);
        }
      });
    }
    for(var x = 0; x<something.length; x++){
      if(x % 2 === 0){
        vTeam.push(something[x]);
      }else{
        hTeam.push(something[x]);
      }
    }

    for(var k = 0; k<dates.length; k++){
      if(k % 2 === 0){
        var kick = dates[k].slice(4,12);
        var a = moment(kick, 'YYYYMMDD').format('MMM Do YYYY');
        cut.push(a);
      }

    }
    
  });
})();
