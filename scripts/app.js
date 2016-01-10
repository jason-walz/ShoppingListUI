//(function(angular){

var app = angular.module('shopping-list-app', ['ngRoute']);

	app.config(['$routeProvider', function($routeProvider){
		$routeProvider
			.when('/shopping-lists', {
				title: 'Shopping List', 
				templateUrl: 'partials/shopping-lists.html',
				controller: 'ShoppingListsController'
			})
			.when('/', {				
				title: 'Login', 
				templateUrl: 'partials/login.html'
			});
		}]);

//})(window.angular);