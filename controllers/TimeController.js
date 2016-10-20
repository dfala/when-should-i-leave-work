var exports 		= module.exports = {},
		Promise 		= require('promise'),
		Query 			= require('../models/Query.js'),
		Completed 	= require('../models/Completed.js'),
		Request 		= require('request'),
		GKey 				= require('../keys.js').google,
		CronJob 		= require('cron').CronJob;

// Example structure
exports.post = function (req, res) {
	var newQuery = new Query(req.body);
	newQuery.save(function (err, result) {
		if (err) return res.status(500).send(err);
		return res.json(result);
	});
};

exports.createCompleted = function () {
	Query.find({})
	.then(function (queries) {
		return console.log(queries.length);
		queries.forEach(function (query) {
			var newCompleted = new Completed();
			newCompleted.parentQuery = query._id;
			newCompleted.instancesCount = query.instance ? query.instance.length : 0;

			newCompleted.save();
		});
	})
	.catch(function (error) {
		console.log('ERROR CREATING COMPLETED', error);
	})
};

exports.identifyQueries = function () {
	var cron = new CronJob('00 59 15 * * 1-5', function() {
		Completed.find({instancesCount: {$lt: 1800}})
		.populate({ path: 'parentQuery' })
		.exec(function (err, completeds) {
			if (err) return console.log('ERROR COLLECTING QUERIES', err);

			var queries = completeds.map(function (completed) {
					return completed.parentQuery;
			});

			queries.forEach(function (query) {
				var interval = setInterval(function() {
					if (new Date().getHours() >= 19) return clearInterval(interval);

					var uri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + encodeURIComponent(query.fromAddress) + "&destination=" + encodeURIComponent(query.toAddress) + "&traffic_model=best_guess&departure_time=now" + "&key=" + GKey;
					Request(uri, function (error, response, body) {
						if (!error && response.statusCode == 200) {
							var responseJSON = JSON.parse(response.body);
							if (!responseJSON.routes[0].legs[0].duration_in_traffic) return;
							var duration = responseJSON.routes[0].legs[0].duration_in_traffic.value;

							query.instance.push({duration: duration, time: Date.now()})
							query.save(function (err, result) {
								if (!err) return console.log('Saved!')
								console.log('ERROR saving', err);
							});
						}
					})
				}, 60 * 1000);
			})
		})

	}, null, true, 'America/Denver');
};
