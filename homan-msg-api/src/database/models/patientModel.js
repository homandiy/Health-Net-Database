var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PatientSchema = new Schema(
  {
    username: {type: String, required: true, max: 100},
    password: {type: String, required: true, max: 100},
		profile: {
			type: Schema.Types.ObjectId,
			ref: 'profiles'
		}
  }
);

//Export model
module.exports = mongoose.model('Patient', PatientSchema);