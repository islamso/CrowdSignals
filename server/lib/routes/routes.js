var express=require('express'),
	Router= express.Router(),
	mongoose=require('node-restful').mongoose,	
	UserSchema=require('../schemas/user-schema.js'),
	User=mongoose.model('User', UserSchema),
	bcrypt=require('bcryptjs');

Router.post('/api/user',function(req,res)
{
	var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	console.log(hash);
	var user = new User(
	{
		"username": req.body.username,
		"password": hash
	});

	user.save(function(err)
	{
		if(err)
		{
			if(err.code === 11000){
				res.json({'error':'username already taken!'});
			}
			//res.json({'error':'Something bad happened try again!'});
		}
		else
		{
			res.json({'error':'0'});
		}
	});
});

module.exports=Router;

/*
function(Router)
{
	for(model in models)
	{
		attach model route
	}	
}

*/