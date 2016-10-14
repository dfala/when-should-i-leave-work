angular.module('myApp')

.directive('plotData', function ($rootScope, dataStore) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {

			$rootScope.$on('activate query', function (e, data) {
				scope.chart = true;
				dataStore.storeQuery(data.query);
				drawChart(data.query);
			});

			$rootScope.$on('activate tab', function (e, tab) {
				if (tab === 'dump') return drawChart(dataStore.serveQuery());
				return parseDayData(tab);
			});

			function parseDayData (day) {
				if (day === 'monday') day = 1;
				if (day === 'tuesday') day = 2;
				if (day === 'wednesday') day = 3;
				if (day === 'thursday') day = 4;
				if (day === 'friday') day = 5;

				var data = dataStore.serveQuery();

				data.instance = data.instance.filter(function (inst) {
					if (new Date(inst.time).getDay() === day) return true;
					return false;
				});

				var mTime = {};
				data.instance.forEach(function (inst) {
					inst.time = new Date(inst.time);
					var minute = moment(inst.time).format('h:mm a');
					if (!mTime[minute]) {
						mTime[minute] = {
							duration: inst.duration,
							count: 1
						};
					} else {
						mTime[minute].count++;
						mTime[minute].duration = mTime[minute].duration + inst.duration;
					}
				})

				var parsedInst = [];
				for (var i in mTime) {
					parsedInst.push({
						time: i,
						duration: mTime[i].duration / mTime[i].count
					})
				};

				data.instance = parsedInst;
				drawChart(data);
			};

			function generateLabels (query) {
				return query.instance.map(function (instance) {
					return moment(instance.time).format('MMM Do, h:mm a');
				});
			};


			function generateDataPoints (query) {
				return query.instance.map(function (instance) {
					return (Math.round((instance.duration / 60) * 100) / 100);
				});
			}


			function drawChart (query) {
				if (window.myLineChart) window.myLineChart.destroy();

				var ctx = document.getElementById("myChart");

				var labels 			= generateLabels(query),
						label	 			= 'FROM: ' + query.fromAddress + ' || TO: ' + query.toAddress,
						dataPoints 	= generateDataPoints(query);

				var data = {
			    labels: labels,
			    datasets: [
		        {
	            label: 'Minutes to arrival',
	            fill: true,
	            lineTension: 0,
	            backgroundColor: "rgba(75,192,192,0.4)",
	            borderColor: "rgba(75,192,192,1)",
	            borderCapStyle: 'butt',
	            borderDash: [],
	            borderDashOffset: 0.0,
	            borderJoinStyle: 'miter',
	            pointBorderColor: "rgba(75,192,192,1)",
	            pointBackgroundColor: "#fff",
	            pointBorderWidth: 1,
	            pointHoverRadius: 5,
	            pointHoverBackgroundColor: "rgba(75,192,192,1)",
	            pointHoverBorderColor: "rgba(220,220,220,1)",
	            pointHoverBorderWidth: 2,
	            pointRadius: 1,
	            pointHitRadius: 10,
	            data: dataPoints,
	            spanGaps: false
		        }
			    ]
				};

				var options = {
			    scales: {
		        yAxes: [{
	            ticks: {
                beginAtZero: true
	            }
		        }]
			    }
				}

				window.myLineChart = new Chart(ctx, {
			    type: 'line',
			    data: data,
					options: options
				});

				setTimeout(function () {
					window.scrollTo(0,document.body.scrollHeight);
				}, 150);
			};

		}
	}
})
