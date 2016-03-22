var path=require('path'),
	mysql=require('mysql'),
	bodyParser=require('body-parser'),
	express=require('express'),
	passport=require('passport'),
	Routes=require('./routes/routes.js'),
	app=express();


/*----------  Middlware  ----------*/
app.use(express.static('../website/app'));
app.use(Routes);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*----------  Database Setup  ----------*/
// var options = {
//   db: { native_parser: true },
//   server: { poolSize: 5 },
//   replset: { rs_name: 'myReplicaSetName' },
//   user: 'myUserName',
//   pass: 'myPassword'
// }
// var db= mongoose.connect(uri, options);
// db.on('open',);
// db.on('error',);




// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//   if (err) throw err;

//   console.log('The solution is: ', rows[0].solution);
// });




/*----------  Run server  ----------*/

app.listen(process.env.PORT || 8080, ()=>{
	console.log(`App listening on port ${process.env.PORT || 8080}`);
});


