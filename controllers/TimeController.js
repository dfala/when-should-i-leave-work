var exports = module.exports = {},
		Promise = require('promise'),
		Query 	= require('../models/Query.js'),
		Request = require('request'),
		GKey 		= require('../keys.js').google,
		CronJob = require('cron').CronJob;

// Example structure
exports.post = function (req, res) {
	var newQuery = new Query(req.body);
	newQuery.save(function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	});
};

exports.getData = function (req, res) {
	Query.find({})
	.then(function (queries) {
		queries.forEach(function (query) {

			var cron = new CronJob('* * * * * 1-5', function() {
			// new CronJob('00 * 16 * * 1-5', function() {
				console.log('hi there');
				setInterval(function () {
					console.log('hit');
					//Google map request
					var uri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + encodeURIComponent(query.fromAddress) + "&destination=" + encodeURIComponent(query.toAddress) + GKey;
					Request(uri, function (error, response, body) {
					  if (!error && response.statusCode == 200) {
							var responseJSON = JSON.parse(response.body);
							var duration = responseJSON.routes[0].legs[0].duration.value;
							console.log(duration);

							query.instance.push({duration: duration, time: Date.now()})
							query.save(function (err, result) {
								// if (err) return res.status(500).send(err);
								// return res.json(response);
								if (!err) return console.log('Saved!')
								console.log('ERROR saving', err);
							});
					  }
					})

				}, 5000)
				// }, 60000)
			}, null, true, 'America/Denver');

			// console.log(cron);
		})
	})
	.catch(function (err) {
		console.log("Could not initiate cron job: ", err);
	})

};
