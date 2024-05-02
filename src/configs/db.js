const mongoose = require('mongoose');
// Define the MongoDB connection URL
const database = process.env.DBNAME;
const mongoURI = 'mongodb://127.0.0.1:27017/'+ database;


// Connect to MongoDB
mongoose.connect(mongoURI, {
useNewUrlParser: true,
useUnifiedTopology: true,
});


// Get the default connection
const db = mongoose.connection;


// Handle MongoDB connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


module.exports = db;