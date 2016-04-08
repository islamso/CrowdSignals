'use strict';

/*----------  Schematic Models for DB  ----------*/

let AppUsageModel=require('../models/appusage-model.js'),
	LocationModel=require('../models/location-model.js'),
	BatteryModel=require('../models/battery-model.js');

/*----------  Configuration of Node-Restful resources  ----------*/

function setup(app)
{
	function authRequired(req,res,next)
	{
		if(req.user) next();
		else res.status(401).send('Unable to view information without being logged in.');
	}
	let Battery = app.battery = BatteryModel.methods(['get']);
	Battery.before('get',authRequired);
	Battery.register(app, '/api/battery');

	let Location = app.location = LocationModel.methods(['get']);
	Location.before('get',authRequired);
	Location.register(app, '/api/location');

	let AppUsage = app.appusage = AppUsageModel.methods(['get']);
	AppUsage.before('get',authRequired);
	AppUsage.register(app, '/api/appusage');
}



module.exports= setup;
