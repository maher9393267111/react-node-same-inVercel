const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://maher:maher9326@cluster0.nf63j.mongodb.net/graph?retryWrites=true&w=majority'

, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});

module.exports = mongoose.connection;