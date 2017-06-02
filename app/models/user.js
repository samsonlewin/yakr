// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : {
        	type: String,
        	unique: true,
    		match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
        },
        password     : {
        	type: String,
			trim: true,
    		required: "Password is Required",
    		validate: [
      		function(input) {
        	return input.length >= 6;
      		},
      		"Password should be longer."
    		]
        }, 
        handle:{
            type: String,
            unique: true,
            required: "Handle is Required"
        }
    }

});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);