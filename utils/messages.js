// Format the msg and return as a object
exports.formatMsg = (username, message, time) => {
  return {
    username,
    message,
    time
  };
}

exports.getTime = () => {
  // For reference 
  // Create instance of Date and get the notation 
  // const notation = new Date().toLocaleString().split(' ')[2];

  //split the time zone
  // const timearr = new Date().toLocaleString().split(' ')[1].split(':');

  return `${
    new Date()
      .toLocaleString()
      .split(' ')[1]
      .split(':')[0]
  }:${
    new Date()
      .toLocaleString()
      .split(' ')[1]
      .split(':')[1]
  } ${new Date().toLocaleString().split(' ')[2]}`;
}
