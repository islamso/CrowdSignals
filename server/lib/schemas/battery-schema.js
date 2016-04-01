var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BatterySchema = new Schema({
    "user_id": Number,
    "sw_name": String,
    "sw_version": String,
    "device_id": String,
    "device_type": String,
    "timezone": Number,
    "type": String,
    "start": Number,
    "end": Number,
    "level": [
        Number
    ],
    "scale": [
        Number
    ],
    "temperature": [
        Number
    ],
    "voltage": [
        Number
    ],
    "plugged": [
        Number
    ],
    "status": [
        String
    ],
    "health": [
        String
    ],
    "timestamps": [
        Number
    ]
  },{"collection":"battery"});

module.exports=BatterySchema;

