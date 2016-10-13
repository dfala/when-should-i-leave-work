var exports = module.exports = {},
    Query 	= require('../models/Query.js');


exports.serveQuery = function (req, res) {
  Query.findById(req.params.queryId, function (err, result) {
    if (err) return res.status(500).json(err);
    result.instance = result.instance.map(function (instance) {
      instance.time = new Date(instance.time);
      return instance;
    });
    return res.json(result);
  })
};

exports.serveQueries = function (req, res) {
  Query.find({}, {'instance': 0}, function (err, result) {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
};
