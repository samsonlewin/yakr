var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessagesSchema = new Schema({
	content: {
    	type: String
  },
  	created : {
  		type : Date
  	}, 

    chat : [{
    // Store ObjectIds in the array
    type: Schema.Types.ObjectId,
    // The ObjectIds will refer to the ids in the Note model
    ref: "Chat"
  }],

  user: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]

})

var Messages = mongoose.model("Messages", MessagesSchema);

// Export the user model
module.exports = Messages;