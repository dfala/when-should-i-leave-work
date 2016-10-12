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

	service.getData = function (queryId) {
		return $http.get('/api/data/' + queryId);
	};

	service.getQueries = function (queryId) {
		return $http.get('/api/queries');
	};



	return service;
});
