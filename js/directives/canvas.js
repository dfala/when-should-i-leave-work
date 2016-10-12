angular.module('myApp')

.directive('plotData', function ($rootScope) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, elem, attrs) {
			$rootScope.$on('activate query', function (e, data) {
				scope.chart = true;
				drawChart(data.query);
			})

			function generateLabels (query) {
				return query.instance.map(function (instance) {
					return moment(instance.time).format('MMM Do, h:mm:ss a');
				});
			};


			function generateDataPoints (query) {
				return query.instance.map(function (instance) {
					return instance.duration;
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
	            label: label,
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
			    // maintainAspectRatio: true,
			    // responsive: false
				};

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
