var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	name: {
    	type: String
  },
  	created : {
  		type : Date
  	}
})

var Chat = mongoose.model("Chat", ChatSchema);

// Export the user model
module.exports = Chat;