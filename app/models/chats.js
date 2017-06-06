var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	name: {
    	type: String
  },
  	created : {
  		type : Date
  	},
  	messages : [
    {
    // Store ObjectIds in the array
    //type: Schema.Types.ObjectId,
    type: String, 
    // The ObjectIds will refer to the ids in the Note model
    ref: "Messages"
  }

  ]
})

var Chat = mongoose.model("Chat", ChatSchema);

// Export the user model
module.exports = Chat;



