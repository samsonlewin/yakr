var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ChatSchema = new Schema({
	title: {
    	type: String
  },
  // body: a string
  	body: {
    	type: String
  }, 
  	created : {
  		type : Date.now()
  	}
})