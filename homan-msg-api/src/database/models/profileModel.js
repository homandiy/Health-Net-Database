var mongoose = require('mongoose');
require('mongoose-type-email');

var Schema = mongoose.Schema;

var ProfileSchema = new Schema(
  {
    lastName: {type: String, required: true, max: 100},
    firstName: {type: String, required: true, max: 100},
		email: {
			type: mongoose.SchemaTypes.Email,
			validate: {
				validator: function() {
					return new Promise((res, rej) =>{
						profiles.findOne({email: this.email, _id: {$ne: this._id}})
								.then(data => {
										if(data) {
												res(false)
										} else {
												res(true)
										}
								})
								.catch(err => {
										res(false)
								})
					})
				}, 
				message: 'Email Already Taken'
			}
		},
		identity:  {
			type: String,
			enum: ['patient', 'doctor']
		}
  }
);

//Export model
module.exports = mongoose.model('Profile', ProfileSchema);