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
  var final = [];

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

    

  });
})();
