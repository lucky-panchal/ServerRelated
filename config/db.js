const mongoose = require('mongoose');

const uri = "mongodb://localhost:27017/MERN"
function connectDB() {
    mongoose
    .connect(uri)
    .then(()=> console.log("Connected to MongoDB databse"))
    .catch((err) => console.error("Connection Error", err));
}


module.exports = connectDB;
