angular.module('myApp')

.factory('dataStore', function ($http) {
	var service = {}

  var query = null;
	service.storeQuery = function (passedQuery) {
    query = angular.copy(passedQuery);
    return true;
  };

  service.serveQuery = function () {
    return angular.copy(query);
  };

  service.clearQuery = function () {
    query = null;
    return true;
  };

	return service;
});
