// ./src/database/appointments.js

var mongoose = require('mongoose');
  
// Mongoose Options  
const options = {  
  useNewUrlParser: true,  
  useCreateIndex: true,  
  useFindAndModify: false,  
  autoIndex: false, // Don't build indexes  
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect  
  reconnectInterval: 500, // Reconnect every 500ms  
  poolSize: 10, // Maintain up to 10 socket connections  
  // If not connected, return errors immediately rather than waiting for reconnect  
  bufferMaxEntries: 0,  
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds  
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity  
  family: 4 // Use IPv4, skip trying IPv6  
};  

// Link
const appointmentUrl = 'mongodb://appointmentDeveloper:gofor1688@localhost:27017/health-net';

//Import model:
var Search = require('./models/appointmentModel').Appointment;

// Get data from MongoDB
async function getAppointments( user, usertype ) {
	
  mongoose.connect(appointmentUrl, options);  
		
	var models = mongoose.models;
	console.dir("models: \n"+models);
	
	if (usertype === 'patient') {
		console.log('patient collection'); 		
	}
	
	if (usertype === 'doctor') {		
		console.log('doctor collection'); 
	}
	
	return await Search.find({});	
}

module.exports = {
	getAppointments,
};