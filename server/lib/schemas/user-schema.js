var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
	{
		username: {type: String, unique: true},
		password: String,
	},{'collection':'user'});

//var User= mongoose.model('User', UserSchema);

module.exports=UserSchema;


