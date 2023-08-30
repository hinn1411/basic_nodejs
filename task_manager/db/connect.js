const mongoose = require("mongoose");
const connectionString =
  "mongodb+srv://quachtrieuvu:abc123123@cluster0.rqpmkfe.mongodb.net/task-manager?retryWrites=true&w=majority";

const connectDB = (url) => {
  return mongoose.connect(url);
};



module.exports = connectDB;