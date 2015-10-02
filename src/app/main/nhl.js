(function(){
  'use strict';
  var request = require('request');
  var cheerio = require('cheerio');
  var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';

  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var rows;
      for(var i = 0; i<1230; i++){
        rows = '.data-row='+i;
        var knew = $(rows);
        console.log(knew);
      }
    }
  });
})();
