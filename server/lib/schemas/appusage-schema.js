var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AppUsageSchema = new Schema(
	{    
		"user_id": Number,
	    "sw_name": String,
	    "sw_version": String,
	    "device_id": String,
	    "device_type": String,
	    "timezone": Number,
	    "type": String,
	    "start": Number,
	    "end": Number,
	    "event_type": [
	      String
	    ],
	    "data": [
	      String
	    ],
	    "number": [
	      String
	    ],
	    "timestamps": [
	      Number
	    ]
	},{"collection":"appusage"});

module.exports=AppUsageSchema;

