var morgan=require('morgan'),
	bodyParser=require('body-parser'),
	passport=require('passport'),
	//mongoose=require('mongoose'),
	mongoose=require('node-restful').mongoose,
	sessions=require('client-sessions'),
	express=require('express'),
	routes=require('./lib/routes/routes.js'),
	api=require('./lib/routes/api.js'),
	app=express();


/*----------  Middlware  ----------*/
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('json spaces',4)


// app.use(sessions({
//   cookieName: 'session',	// cookie name dictates the key name added to the request object 
//   secret: "k1zg6c=#brt?$VsgpG5F'Ub(yf9plCk1zg6c=#brt?$VsgpG5F'Ub(yf9plCk1zg6c=#brt?$VsgpG5F'Ub(yf9plC", // should be a large unguessable string 
//   duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
//   activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds 
// }));


//Set api resources
app.get('*',function(req,res,next)
{
	res.set('Access-Control-Allow-Origin','*')
	next();
});
require('./lib/resources/resources.js')(app);
app.use(routes);





/*----------  Database Setup  ----------*/
var options = {
  user: 'userAdmin',
  pass: "k1zg6c=#brt?$VsgpG5F'Ub(yf9plC"
}
var config = JSON.parse(process.env.APP_CONFIG);
var db=mongoose.connection;
mongoose.connect("mongodb://" + config.mongo.user + ":<your_password_here>@" +
		config.mongo.hostString);
db.on('open',function()
	{
		console.log('Connected to db on mongodb://localhost:27017/crowd-signals');
	});
db.on('error',function()
	{
		console.log('Error connecting to db');
	});



/*----------  Run server  ----------*/

app.listen(process.env.PORT || 8080, ()=>{
	console.log(`App listening on port ${process.env.PORT || 8080}`);
});

