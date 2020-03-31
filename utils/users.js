// To store excited messages instead of using DB
var activeUsers = [];

// Temporary storage 
var storage = [];

// Insert msg into store
function insertMsg(id, username, msg){
  storage.push(msgStore(id, username, msg));
}

// Insert into activeUsers array
function insertUser(id, username) {
  let user = {
    id,
    username
  };

  console.log(user);

  activeUsers.push(user);

  return user;
}

// Get current user
function delCurrentUser(attr,value){
    var i = activeUsers.length;
    while(i--){
       if( activeUsers[i] 
           && activeUsers[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && activeUsers[i][attr] === value ) ){ 

           activeUsers.splice(i,1);
       }
    }
    return activeUsers;
}

// Store the msg and user then return by object 
function msgStore(id, username, msg){
  return {
    id,
    username,
    msg
  }
}

// Functions 
exports.insertUser = insertUser;
exports.delCurrentUser = delCurrentUser;
exports.insertMsg = insertMsg;
// Variables 
exports.activeUsers = activeUsers;
exports.storage = storage;