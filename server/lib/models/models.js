var	mongoose= require('mongoose'),
	DeviceSchema= require('../schemas/Device.js'),
	UserSchema= require('../schemas/User.js'),
	ParticipantSchema= require('../schemas/Participant.js');

module.exports={
	Device: mongoose.model('Device', DeviceSchema),
	User: mongoose.model('User', UserSchema),
	Participant: mongoose.model('Participant', ParticipantSchema)
};