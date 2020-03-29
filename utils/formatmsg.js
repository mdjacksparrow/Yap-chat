const moment = require('moment');

exports.format = (username, message) => {
    return{
        username,
        message,
        time: moment.format('h:mm a'),
    }
}