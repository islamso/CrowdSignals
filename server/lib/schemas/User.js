var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var DeviceSchema= require('./Device.js');

var UserSchema = new Schema(
	{
		username: String,
		password: String,
		devices:[DeviceSchema]
	});

//var User= mongoose.model('User', UserSchema);

module.exports=UserSchema;


