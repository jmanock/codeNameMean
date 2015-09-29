module.exports = function(app){
  var team = require('../controllers/team');
  var flight = require('../controllers/flight');
  var field = require('../controllers/field');
  var wipe = require('../controllers/wipe');
  var tournament = require('../controllers/tournament');
  var Player = require('../models/player.js');
  var User = require('../models/user.js');

  app.use(function(req,res,next){
    next();
  });

  app.route('/players')
  .get(function(req, res){
    Player.find(function(err, players){
      if(err){
        res.send(err);
      }else{
        res.json(players);
      }
    });
  });

  app.route('/players/:player_id')
  .get(function(req, res){
    Player.findOne({'id':req.params.player_id}, function(err, player){
      if(err){
        res.send(err);
      }else{
        res.json(player);
      }
    });
  });

  app.route('/users')
  .get(function(req, res){
    User.find(function(err, users){
      if(err){
        res.send(err);
      }else{
        res.json(users);
      }
    });
  });

  app.route('/users/:user_id')
  .get(function(req, res){
    User.findOne({'id':req.params.user_id}, function(err, user){
      if(err){
        res.send(err);
      }else{
        res.json(user);
      }
    });
  });

  app.route('/team/:tournament_id')
  .get(team.render);

  app.route('/flight/:tournament_id')
  .get(flight.render);

  app.route('/build/:tournament_id')
  .get(field.render);

  app.route('/tournaments')
  .get(tournament.render);

  app.route('/tournament')
  .post(tournament.create);

  app.get('/admin', function(req, res){
    res.sendfile('public/admin.html');
  });

  app.get('/tournaments/:tournament_id', function(req, res){
    res.sendfile('public/index.html');
  });

  app.get('/', function(req, res){
    res.sedfile('public/index.html');
  });
};
