const Modal = require('./user_module');

// pass a spread of docs and a callback
exports.insertOne = (username, msg) => {
  Modal.User.create({username: username, msg: msg }, function(
    err,
    docs
  ) {
    if (err) throw err;
    console.log('Inser msg are ', docs);
  });
};

// Retrieve all Messages 
exports.retrieveMsg = () => {
    let documents;
    Modal.User.find({}, (err, docs) => {
        if(err) throw err;
        documents = docs;
        // console.log(docs);
    });

    return documents;
};

// Count no.of documents 
// exports.count = () => {
//     let total;
//     Modal.User.count({}, (err, count) => {
//         total = count;
//     });

//     return total;
// }