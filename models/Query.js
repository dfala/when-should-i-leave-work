var mongoose = require('mongoose');

var QuerySchema = new mongoose.Schema({
  fromAddress: { type: String, required: true },
  toAddress: { type: String, required: true },
  instance: [{
    duration: Number,
    time: {type: Date, default: Date.now}
  }],
  createdDate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Query', QuerySchema);
