var app = angular.module('OrderRepository', []);
var DEBUG = true;

app.controller("OrderController", function ($scope, $http) {

    $scope.OrderHeaders = ["Order", "Number of Items", "Price"];
	$scope.Orders = [];


	$scope.GetOrders = function () {

	    if (DEBUG)
	        console.log("Get Orders...");

	    $http.get('/Order/GetOrders')
            .success(function (data, status, headers, config) {
                if (DEBUG)
                    console.log(data);

                if (typeof data != 'undefined') {
                    $scope.Orders = data;
                }
            })
            .error(function (data, status, header, config) {
                if (DEBUG)
                    console.log("Error: " + data);
            });
	};

	$scope.GetOrderTotal = function (index) {

	    if (DEBUG)
	        console.log("Get Order Total...");

	    var total = 0.00;

	    for (var i = 0; i < $scope.Orders[index].items.length; i++)
	    {
	        var product = $scope.Orders[index].items[i];
	        total += (product.price * product.quantity);
	    }

	    return total;
	};

	$scope.GetTotalItems = function (index) {

	    if (DEBUG)
	        console.log("Get Total Items...");

	    var total = 0;

	    for (var i = 0; i < $scope.Orders[index].items.length; i++)
	    {
	        var product = $scope.Orders[index].items[i];
	        total += product.quantity;
	    }

	    return total;
	};
});