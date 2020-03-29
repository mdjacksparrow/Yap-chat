// To store excited messages instead of using DB
var activeUsers = [];

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

exports.insertUser = insertUser;
exports.delCurrentUser = delCurrentUser;
exports.activeUsers = activeUsers;
