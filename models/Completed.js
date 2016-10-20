var mongoose = require('mongoose');

var CompletedSchema = new mongoose.Schema({
  lastUpdated    : {type: Date, default: Date.now},
  parentQuery    : { type: mongoose.Schema.Types.ObjectId, ref: 'Query' },
  instancesCount : { type: String, required: true }
});

module.exports = mongoose.model('Completed', CompletedSchema);
