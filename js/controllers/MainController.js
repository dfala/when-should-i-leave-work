angular.module('myApp')

.controller('MainController', function ($scope, dataService, $rootScope) {
	$scope.init = function () {
		$scope.loading = true;

		$scope.fromAddress = "Lucid Software, South River Front Parkway #600, South Jordan, UT";
		$scope.toAddress = "733 North Braemar Way, Saratoga Springs, UT";
		dataService.getQueries()
		.then(function (response) {
			$scope.items = response.data;
		})
		.catch(function (err) {
			console.error(err);
		})
		.finally(function () {
			$scope.loading = false;
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
		alertify.log('Loading your information...');

		dataService.getData(query._id)
		.then(function (response) {

			$('.alertify-logs').children().removeClass('show').addClass('hide');
			$scope.activeQuery = true;
			$rootScope.$emit('activate query', {query: response.data});
		})
		.catch(function (err) {
			console.error(err);
		})

	};

})
