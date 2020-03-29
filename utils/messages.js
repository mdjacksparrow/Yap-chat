const moment = require('moment');

// Format the msg and return as a object 
function formatMsg(username, message) {
  return {
    username,
    message,
    time: moment().format('h:mm a')
  };
}

exports.formatMsg = formatMsg;
