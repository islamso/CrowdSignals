var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema(
	{
		type: String,
		make: String,
		model: String,
		peripherals: [Schema.Types.Mixed]
	});

//var Device= mongoose.model('Device', DeviceSchema);

module.exports=DeviceSchema;
		// accelerometer: [Schema.Types.ObjectId],
		// battery:[Schema.Types.ObjectId],
		// bluetooth:[Schema.Types.ObjectId],
		// connectionStrength: [Schema.Types.ObjectId],
		// connectivity: [Schema.Types.ObjectId],
		// gsm: [Schema.Types.ObjectId],
		// gyroscope: [Schema.Types.ObjectId],
		// heartRate: [Schema.Types.ObjectId],
		// intervalLabel: [Schema.Types.ObjectId],
		// light: [Schema.Types.ObjectId],
		// location: [Schema.Types.ObjectId],
		// magnetometer: [Schema.Types.ObjectId],
		// phoneState: [Schema.Types.ObjectId],
		// pressure:[Schema.Types.ObjectId],
		// proximity: [Schema.Types.ObjectId],
		// screen:[Schema.Types.ObjectId],
		// sms: [Schema.Types.ObjectId],
		// wlan:[Schema.Types.ObjectId]