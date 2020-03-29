const moment = require('moment');
const url = require('url');

// Format the msg and return as a object 
function formatMsg(username, message) {
  return {
    username,
    message,
    time: moment().format('h:mm a')
  };
}

// Get the current username 
function getUser(req) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;

  return query.username;
}

exports.formatMsg = formatMsg;
exports.getUser = getUser;
