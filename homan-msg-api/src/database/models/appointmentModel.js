// ./src/database/models/appointmentModel.js

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var AppointmentSchema = new Schema(
  {
		_id: Schema.Types.ObjectId,
		patient: {
			type: Schema.Types.ObjectId,
			ref: 'patients'
		},
		doctor: {
			type: Schema.Types.ObjectId,
			ref: 'doctors'
		},
		location: {
			type: Schema.Types.ObjectId,
			ref: 'clinics'
		},
		note: String,
		bookAt: String,
		status: {
			type: String,
			enum: ['active', 'expired', 'ontime', 'cancelled']
		}
  }
);

var Appointment = mongoose.model('Appointment', AppointmentSchema);
//Export model
module.exports = {
	Appointment: Appointment
}