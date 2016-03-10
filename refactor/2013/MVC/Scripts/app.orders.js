var app = angular.module('OrderRepository', []);
var DEBUG = false;

app.controller("OrderController", function ($scope, $http) {

    $scope.Error = false;
    $scope.ErrorNo = "";
    $scope.Loading = false;

    $scope.OrderHeaders = ["Order", "Number of Items", "Price"];
    $scope.Orders = [];

    // GET: Get orders from the server
	$scope.GetOrders = function () {

	    if (DEBUG)
	        console.log("Get Orders...");

	    $scope.Loading = true;
	    $("body").css("cursor", "progress");

	    $http.get('/Order/GetOrders')
            .success(function (data, status, headers,
                config) {
                if (DEBUG)
                    console.log(data);

                if (typeof data != 'undefined') {
                    $scope.Orders = data;
                }
            })
            .catch(function (data, status, header, config) {
                $scope.Error = true;
                $scope.ErrorNo = 200;

                if (DEBUG)
                    console.log("Error: " + data);
            })
            .finally(function (data, status, header, config) {
                $scope.Loading = false;
                $("body").css("cursor", "default");
            });
	};

    // Calculate order total for the specified order index
	$scope.CalculateOrderTotal = function (index) {

	    if (DEBUG)
	        console.log("Calculate Order Total...");

	    var total = 0.00;

	    for (var i = 0; i < $scope.Orders[index].items.length; i++)
	    {
	        var product = $scope.Orders[index].items[i];
	        total += (product.price * product.quantity);
	    }

	    return total;
	};

    // Calculate the total items in an order given the specified order index
	$scope.CalculateTotalItems = function (index) {

	    if (DEBUG)
	        console.log("Calculate Total Items...");

	    var total = 0;

	    for (var i = 0; i < $scope.Orders[index].items.length; i++)
	    {
	        var product = $scope.Orders[index].items[i];
	        total += product.quantity;
	    }

	    return total;
	};
});