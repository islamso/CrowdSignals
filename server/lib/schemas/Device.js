var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema(
	{
		participant: Schema.Type.ObjectId,
		type: String,
		make: String,
		model: String,
		peripherals: [Schema.Types.Mixed]
	});
module.exports=DeviceSchema;

		// battery:[Schema.Types.ObjectId],
		// location: [Schema.Types.ObjectId],
		// appUsage: [Schema.Types.ObjectId]


