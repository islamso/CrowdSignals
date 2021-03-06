'use strict';

const mongoose=require('node-restful').mongoose,
	  express=require('express'),
	  routes=require('./lib/routes/routes.js'),
	  api=require('./lib/routes/api.js'),
	  app=express(),
	  data=require('./lib/config/database.js'),
	  morgan=require('morgan'),
	  bodyParser=require('body-parser'),
	  sessions=require('client-sessions'),
	  helmet=require('helmet'),
	  database=require('./lib/config/database.js'),
	  jwt=require('jsonwebtoken'),
	  fs=require('fs');

/*----------  Middlware  ----------*/
app.disable('x-powered-by');
app.use(helmet());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces',4)
app.use(express.static('./website/app'));


app.use(routes);
api(app);

/*----------  Database Setup  ----------*/
var db=mongoose.connection;
mongoose.connect(database.url);

db.on('open',function()
{
	console.log('Connected to db.');
});
db.on('error',function()
{
	console.log('Error connecting to db.');
});



/*----------  Run server  ----------*/

app.listen(process.env.PORT || 8080, ()=>{
	console.log(`App listening on port ${process.env.PORT || 8080}`);
});