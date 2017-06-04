var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
	content: {
    	type: String
  },
  	created : {
  		type : Date
  	}, 
  user: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]

})

var Messages = mongoose.model("Messages", MessagesSchema);

// Export the user model
module.exports = Messages;