var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    "user_id": Number,
    "sw_name": String,
    "sw_version": String,
    "device_id": String,
    "device_type": String,
    "timezone": Number,
    "type": String,
    "start": Number,
    "end": Number,
    "latitude": [
      Number
    ],
    "longitude": [
      Number
    ],
    "accuracy": [
      Number
    ],
    "speed": [
      Number
    ],
    "bearing": [
      Number
    ],
    "provider": [
      String
    ],
    "isPassive": [
      Boolean
    ],
    "timestamps": [
      Number
    ]
 },{"collection":"location"});

module.exports=LocationSchema;

