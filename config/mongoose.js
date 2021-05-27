const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codial_development', {useNewUrlParser: true, useUnifiedTopology: true});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("successfully connected to database");
});

module.exports = db;