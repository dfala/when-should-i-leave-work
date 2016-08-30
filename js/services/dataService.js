angular.module('myApp')

.factory('dataService', function ($http) {
	var service = {}


	service.newTimeQuery = function (fromAddress, toAddress) {
		var data = {
			fromAddress: fromAddress,
			toAddress: toAddress
		}

		return $http.post('/api/new-time-query', data);
	};

	service.getData = function () {
		return $http.get('/api/data');
	}



	return service;
});
