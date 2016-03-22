var express=require('express'),
	Router= express.Router();


Router.get('/',(req,res)=>{
		res.send('Hello World');
		console.log(`${req}`);
	});


Router.get('/user',(req, res)=>
	{
		res.send('user');
	});
Router.get('/user/:id',(req, res)=>
	{
		res.send(`user${req.params.id}`);
	});
module.exports=Router;