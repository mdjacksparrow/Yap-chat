const mongoose = require("mongoose");

// Establishing connection between server and DB

exports.connect = function() {
  mongoose.connect("mongodb+srv://Mdjack:jack@cluster0-atf8h.mongodb.net/Yap-chat-storage", { useNewUrlParser: true, useUnifiedTopology : true 
}); 
  mongoose.set('useCreateIndex', true);
};
// userUnifiedTopology
// "mongodb://localhost/Yap-chat-storage",