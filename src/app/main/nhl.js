(function(){
  'use strict';
  var request = require('request');
  var cheerio = require('cheerio');
  var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';

  request(url, function(error, response, body){
    if(!error && response.statusCode === 200){
      var $ = cheerio.load(body);
      var link = $('td > a');
      link.each(function(i,links){
        var knames = links.children;
        for(var j = 0; j<knames.length; j++){
          console.log(knames[j].data);
        }

      });
    }
  });
})();
