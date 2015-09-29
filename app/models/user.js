var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Scheam({
  name:String,
  id: String
});
module.exports = mongoose.model('User', UserSchema);
