var mongoose = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema(
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
module.exports = mongoose.model('Doctor', DoctorSchema);