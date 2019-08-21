// ./src/index.js

// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// database
const {startDatabase} = require('./database/mongo');
const {insertMsg, getMsgs} = require('./database/msgs');
const {deleteMsg, updateMsg} = require('./database/msgs');

// JWTS
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const msgArr = [
  {title: 'Hello, world (again at port 3001)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// GET
app.get('/', function (req, res) {
  res.status(400).send({
    message:  "Wrong path! Please check with Administator..."
  })
});

// User
const userApi = 'This_is_my_API_key!'
app.get('/user', async (req, res) => {
	
  console.dir(req.hostname)
  console.dir(req.ip)
  
  // authenticate apikey
  var apikey = req.query.apikey
  console.dir(apikey+'    vs    '+userApi)
  
  if ( apikey === userApi) {
	console.dir('Equal')
	res.send(await getMsgs());
  } else {
	console.dir('Not Equal')
	res.status(400).send({
	  message:  "Incorrect API key..."
	})
  }

});

/*
 * Start Appointment CRUD.
 */
app.set('query parser', false);
// api key
const appointmentApiKey = 'appointmentApiKey_1688'
// appointment database
const {getAppointments} = require('./database/appointment');

/*
 * appointment endpoint:	/appointment
 */
 
// chai test
var chai = require('chai');
var assert = chai.assert;

// Get method
app.get('/appointment', async (req, res) => {
	
	console.log('url: '+req.url)
  console.dir(req.hostname)
  console.dir(req.ip)
	console.log('\nQuery: \n');
	for (const key in req.query) {
		console.log(key, req.query[key]);
	}
  console.log('\n');
	
  // authenticate apikey
  var apikey = req.query.apikey
  console.dir(apikey+'    vs    '+userApi)
	assert(apikey != null, '\n\nMissing API key\n\n');
	
	//get user
	var user = req.query.user;
	console.dir('user id:  '+user)
	assert(user != null, '\n\nMissing user ID\n\n');
	//get user type
	
	var usertype = req.query.usertype;
	console.dir('ut: '+usertype);	
	assert(usertype != null, '\n\nMissing user type\n\n');
  
  if ( apikey === appointmentApiKey) {
		
		console.dir('Connecting to Apointment DB...');
		res.send({message:  "Connecting to Apointment DB...\n"});
		
		try {
			var appointments = await getAppointments(user, usertype);
		} catch (error) {
			console.error('\nError:\n'+error);
		}
		
		if (appointments == null) {
			console.log("\nFind nothing...\n");
		} else {
			console.log(appointments);
		}
		
  } else {
		console.dir('Not Equal')
		res.status(400).send({
			message:  "Incorrect API key..."
		})
  }

});
/*
 * End Appointment CRUD.
 */

// check JWTS endpoint
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-homan-android.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'https://msg-api',
  issuer: `https://dev-homan-android.auth0.com/`,
  algorithms: ['RS256']
});

app.use(checkJwt);

// POST
app.post('/', async (req, res) => {
  const newMsg = req.body;
  
  console.log(newMsg);
  
  await insertMsg( newMsg );
  res.send({ message: 'New message inserted.' });
});

// DELETE
app.delete('/:id', async (req, res) => {
  await deleteMsg(req.params.id);
  res.send({ message: 'Message removed.' });
});

// PUT
app.put('/:id', async (req, res) => {
  const updated_Msg = req.body;
  await updateMsg(req.params.id, updated_Msg);
  res.send({ message: 'Message updated.' });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  await insertMsg({title: 'Now, we have a in-memory database!'});

  // start the server
  app.listen(3001, async () => {
    console.log('Listening on port 3001 with MongoDB + Auth0');
  });
});