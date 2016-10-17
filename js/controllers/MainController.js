angular.module('myApp')

.controller('MainController', function ($scope, dataService, $rootScope, dataStore) {
	$scope.init = function () {
		$scope.loading = true;
		$scope.activeTab = 'dump';

		// $scope.fromAddress = "Provo, UT";
		// $scope.toAddress = "Salt Lake City, UT";

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
		.then(function (response) {
			$scope.items.push(response.data);

			alertify.log('Your address was successfully added. Your graph will be ready in a few days.');

			$scope.fromAddress = '';
			$scope.toAddress = '';
		})
		.catch(function (err) {
			console.log(err);
		})
	};

	var fetchingInfo = false;
	var messagesArray = [
		"Bro! Hold on a second. It's still loading...",
		"Dude, for reals?",
		"I can't even with you. Wait a sec.",
		"You are so impatient -- it's unreal.",
		"Dang it man, you barely clicked the button.",
		"This is complicated stuff, give me a sec!",
		"Dang, you really are on a hurry aren't you?"
	]

	$scope.activateQuery = function (query) {
		if (fetchingInfo) {
			$('.error').remove();
			alertify.error(messagesArray[Math.floor(Math.random() * messagesArray.length)]);
			return;
		}

		alertify.log('Loading your information...', null, 100000);
		fetchingInfo = true;

		dataService.getData(query._id)
		.then(function (response) {
			$('.alertify-logs').children().removeClass('show').addClass('hide');
			$scope.activeQuery = true;
			$scope.title = {
				from: 'FROM: ' + response.data.fromAddress,
				to: 'TO: ' + response.data.toAddress
			};

			$rootScope.$emit('activate query', {query: response.data});
		})
		.catch(function (err) {
			console.error(err);
		})
		.finally(function () {
			fetchingInfo = false;
		});
	};

	$scope.activateTab = function (tab) {
		if ($scope.activeTab === tab) return;

		if (tab === 'dump') $scope.activeTab = 'dump';
		if (tab === 'monday') $scope.activeTab = 'monday';
		if (tab === 'tuesday') $scope.activeTab = 'tuesday';
		if (tab === 'wednesday') $scope.activeTab = 'wednesday';
		if (tab === 'thursday') $scope.activeTab = 'thursday';
		if (tab === 'friday') $scope.activeTab = 'friday';

		$rootScope.$emit('activate tab', tab);
	};

	$scope.closeQuery = function () {
		dataStore.clearQuery();
		$scope.activeQuery = false;
		$scope.activeTab = 'dump';
	};

})
