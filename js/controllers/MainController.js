angular.module('myApp')

.controller('MainController', function ($scope, dataService, $rootScope) {
	$scope.init = function () {
		$scope.fromAddress = "Lucid Software, South River Front Parkway #600, South Jordan, UT";
		$scope.toAddress = "733 North Braemar Way, Saratoga Springs, UT";
		dataService.getQueries()
		.then(function (response) {
			$scope.items = response.data;
		})
		.catch(function (err) {
			console.error(err);
		})
	};

	//example method
	$scope.submitForm = function () {
		dataService.newTimeQuery($scope.fromAddress, $scope.toAddress)
		.then(function (result) {
			console.info(result)
		})
		.catch(function (err) {
			console.log(err);
		})
	};

	$scope.activateQuery = function (query) {
		$rootScope.$emit('activate query', {query: query});
	};

})
