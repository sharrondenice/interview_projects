var app = angular.module('ShoppingCart', ['ngCookies']);
var DEBUG = true;

app.controller("CartController", function ($scope, $http, $cookies) {

	$scope.ProductHeaders = ["Description", "Price", "Quantity"];
	$scope.CartHeaders = ["Description", "Price", "Quantity", "Total"];

	$scope.Products = $cookies.get("Products") ? JSON.parse($cookies.get("Products")) : $cookies.get("Products");
	$scope.CartItems = $cookies.get("CartItems") ? JSON.parse($cookies.get("CartItems")) : $cookies.get("CartItems");

	$scope.CartEmpty = true;

	if (typeof $scope.CartItems != 'undefined' && $scope.CartItems.length > 0)
	    $scope.CartEmpty = false;

	$scope.OrderComplete = false;
	$scope.OrderID = "";

	$scope.CartTotal = $cookies.get("CartTotal");

	$scope.GetProducts = function(){
	    if (DEBUG)
	        console.log("Get Products...");

	    if (typeof $scope.Products == 'undefined') {
	        $http.get('/Order/GetProducts')
                .success(function (data, status, headers, config) {
                    if (DEBUG)
                        console.log(data);

                    if (typeof data != 'undefined') {
                        $scope.Products = data;
                        $cookies.put('Products', JSON.stringify($scope.Products));
                    }
                })
                .error(function (data, status, header, config) {
                    if (DEBUG)
                        console.log("Error: " + data);
                });
	    }
	    else
	    {
	        if (DEBUG)
	            console.log("Cookies: " + JSON.stringify($scope.Products));
	    }
	};

	$scope.AddProducts = function () {
	    if (DEBUG)
	        console.log("Add Products...");

	    var item = 0;

	    $scope.CartItems = [];
	    $scope.CartTotal = 0.00;
	    $scope.OrderComplete = false;

	    for (var i = 0; i < $scope.Products.length; i++)
	    {
	        if ($scope.Products[i].quantity > 0)
	        {
	            $scope.CartEmpty = false;
	            $scope.CartItems[item] = $scope.Products[i];

	            $scope.CartItems[item].total = $scope.CartItems[item].quantity * $scope.CartItems[item].price;
	            $scope.CartTotal += $scope.CartItems[item].total;
	            item++;
	        }
	    }

	    $cookies.put('CartItems', JSON.stringify($scope.CartItems));
	    $cookies.put('CartTotal', $scope.CartTotal);
	};

	$scope.EmptyCart = function () {
	    if (DEBUG)
	        console.log("Empty Cart...");

	    $scope.CartItems = [];
	    $scope.CartEmpty = true;

	    $cookies.put('CartItems', "");
	    $cookies.put('CartTotal', 0.00);
	};

	$scope.CheckOut = function () {
	    if (DEBUG)
	        console.log("CheckOut...");

	    if (DEBUG)
	        console.log("Cart Items: " + JSON.stringify($scope.CartItems));

	    $http.post('/Order/Save', $scope.CartItems)
            .success(function (data, status, headers, config) {

                if (typeof data != 'undefined') {
                    if (DEBUG)
                        console.log("Order ID: " + data.id);

                    $scope.OrderID = data.id;
                    $scope.EmptyCart();
                    $scope.OrderComplete = true;
                }
            })
            .error(function (data, status, header, config) {
            });
	};
});