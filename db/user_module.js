const db = require('./dbConnection');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Initialize the db connection
db.connect();
console.log('Db connected !');

const userMsg = new Schema({
  username: {
    type: String
    // required: [true]
  },    
  msg: {
    type: String,
    required: [true]
  },
  time: {
    type : String,
    required: [true]
  }
});
exports.User = new mongoose.model('message-storage', userMsg);