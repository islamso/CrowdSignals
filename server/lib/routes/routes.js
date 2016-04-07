'use strict';
const express=require('express'),
	  Router= express.Router(),
	  User=require('../models/user-model.js'),
	  bcrypt=require('bcryptjs'),
	  jwt=require('jsonwebtoken'),
	  database=require('../config/database.js');

//Set api resources
Router.all('/*',function(req,res,next)
{
	res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
	next();
});

/*----------  Api Endpoint Protection  ----------*/

Router.all('/api/*',function(req,res,next)
{
	if(req.headers.authorization)
	{
		let authorization=req.headers.authorization.split(' ');
		
		let scheme = authorization[0];
		if(scheme ==  'Bearer')
		{
			let token = authorization[1];
			try{req.user=jwt.verify(token, database.secret);}catch(err){}
		}
	}
	else
	{
		res.send(401,'Unable to view information without being logged in.');
	}
	next();
});

/*----------  User Route Handling  ----------*/

Router.post('/register',function(req,res)
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
				res.status(400).send('username already taken!');
			}
			//res.json({'error':'Something bad happened try again!'});
		}
		else
		{
			res.json({'error':'0'});
		}
	});
});

Router.post('/login',function(req,res)
{
	User.findOne({username: req.body.username},function(err,user)
		{
			if(!user)
			{
				res.status(400).send('Invalid username or password');
			}
			else
			{
				if(bcrypt.compareSync(req.body.password,user.password))
				{
					let claim={
						username: req.body.username
					}
					let token=jwt.sign(claim, database.secret, {algorithm:'RS256',expiresIn:'60m'});
					res.json({'token':token});
				}
				else
				{
					res.status(400).send('Invalid username or password');
				}
			}
		});
});

module.exports=Router;
