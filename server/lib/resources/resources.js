var restful= require('node-restful');
	AppUsageSchema=require('../schemas/appusage-schema.js'),
	LocationSchema=require('../schemas/location-schema.js'),
	BatterySchema=require('../schemas/battery-schema.js');

function setup(app)
{
	var Battery = app.battery = restful.model('battery', BatterySchema).methods(['get']);
	Battery.register(app, '/api/battery');

	var Location = app.location = restful.model('location', LocationSchema).methods(['get']);
	Location.register(app, '/api/location');

	var AppUsage = app.appusage = restful.model('appusage', AppUsageSchema).methods(['get']);
	AppUsage.register(app, '/api/appusage');
}



module.exports= setup;
