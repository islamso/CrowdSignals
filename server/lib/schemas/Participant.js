var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipantSchema = new Schema(
	{
		id: String,
		devices:[Schema.Types.ObjectId]
	});

//var Participant= mongoose.model('Participant', ParticipantSchema);
module.exports=ParticipantSchema;


//localhost:8080/api/Participant/123?devices=20&fields=accelerometer