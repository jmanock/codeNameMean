'use strict';
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var url = 'http://www.hockey-reference.com/leagues/NHL_2016_games.html';
var something = [];
request(url, function(error, response, body){

  if(!error && response.statusCode === 200){
    var $ = cheerio.load(body);
    // var visitTeam = $('.left > a').text();
    // var homeTeam = $('.right > a').text();
    var date = $('tr > td');
    
    /* Get
      ~ Home Team
      ~ Visiting Team
      ~ Date
    */
  }

});
