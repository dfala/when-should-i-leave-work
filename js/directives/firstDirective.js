angular.module('myApp')

.directive('firstDirective', function () {
	return {
		restrict: 'E',
		scope: true,
		templateUrl: '/templates/home.html',
		link: function (scope, elem, attrs) {
			console.log('my firstDirective is plugged in!');
		}
	}
})