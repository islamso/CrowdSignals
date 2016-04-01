var express=require('express'),
	Api= express.Router(),
	mongoose=require('mongoose'),
	/*----------  AppUsage  ----------*/
	AppUsageSchema=require('../schemas/appusage-schema.js'),
	AppUsage=mongoose.model('AppUsage', AppUsageSchema),

	/*----------  Location  ----------*/
	LocationSchema=require('../schemas/location-schema.js'),
	Location=mongoose.model('Location', LocationSchema),

	/*----------  User  ----------*/
	UserSchema=require('../schemas/user-schema.js'),
	User=mongoose.model('User', UserSchema),

	/*----------  Battery  ----------*/
	BatterySchema=require('../schemas/battery-schema.js'),
	Battery=mongoose.model('Battery', BatterySchema);


//All Locations
Api.get('/location',function(req,res)
	{
		Location.find({}, function (err, locations) {
			console.log('I got called!');
			if (err) res.send(404);
		  	res.json(locations);
		});
	});

//Locations by user id
Api.get('/location/:userId',function(req,res)
	{
		Location.find({"user_id":req.params.userId}, function (err, locations) {
			console.log('I got called!');
			if (err) res.send(404);
			res.json(locations);
		});
	});

//All Battery
Api.get('/battery',function(req,res)
	{
		Battery.find({}, function (err, battery) {
			console.log('I got called!');
			if (err) res.send(404);
		  	res.json(battery);
		});
	});

//Battery by user id
Api.get('/battery/:userId',function(req,res)
	{
		Battery.find({"user_id":req.params.userId}, function (err, battery) {
			console.log('I got called!');
			if (err) res.send(404);
			res.json(battery);
		});
	});

module.exports=Api;

/*
function(Router)
{
	for(model in models)
	{
		attach model route
	}	
}

*/