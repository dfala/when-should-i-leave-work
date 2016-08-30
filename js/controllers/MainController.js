angular.module('myApp')

.controller('MainController', function ($scope, dataService, $http) {
	$scope.fromAddress = "Lucid Software, South River Front Parkway #600, South Jordan, UT";
	$scope.toAddress = "733 North Braemar Way, Saratoga Springs, UT";


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

	$scope.getData = function () {
		dataService.getData()
		.then(function (response) {
			console.warn(response);
			window.obj = response;
		})
		.catch(function (err) {
			console.error(err);
		})
	};


})
