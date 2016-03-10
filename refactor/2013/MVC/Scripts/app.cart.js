var app = angular.module('ShoppingCart', ['ngCookies']);
var DEBUG = true;

app.controller("CartController", function ($scope, $http, $cookies) {

    $scope.Error = false;
    $scope.ErrorNo = "";
    $scope.Loading = false;

    $scope.ProductHeaders = ["Description", "Price", "Quantity"];
	$scope.CartHeaders = ["Description", "Price", "Total"];

	$scope.Products = $cookies.get("Products") ? JSON.parse($cookies.get("Products")) : $cookies.get("Products");
	$scope.CartItems = $cookies.get("CartItems") ? JSON.parse($cookies.get("CartItems")) : $cookies.get("CartItems");

	$scope.CartEmpty = true;

	if (typeof $scope.CartItems != 'undefined' && $scope.CartItems.length > 0)
	{
	    $scope.CartEmpty = false;
	}

	$scope.OrderComplete = false;
	$scope.OrderID = "";

	$scope.CartTotal = $cookies.get("CartTotal");

    // GET: Load products from server
	$scope.GetProducts = function(){
	    if (DEBUG)
	        console.log("Get Products...");

	    if (typeof $scope.Products == 'undefined') {
	        $scope.Loading = true;
	        $("body").css("cursor", "progress");

	        $http.get('/Order/GetProducts')
                .success(function (data, status, headers, config) {
                    if (DEBUG)
                        console.log(data);

                    if (typeof data != 'undefined') {
                        $scope.Products = data;
                        $cookies.put('Products', JSON.stringify($scope.Products));
                    }
                })
                .catch(function (data, status, header, config) {
                    $scope.Error = true;
                    $scope.ErrorNo = 100;

                    if (DEBUG)
                        console.log("Error: " + data);
                })
	            .finally(function (data, status, header, config) {
	                $scope.Loading = false;
	                $("body").css("cursor", "default");
	            });
        }
	    else
	    {
	        if (DEBUG)
	            console.log("Cookies: " + JSON.stringify($scope.Products));
	    }
	};

    // Add products to cart after button pressed
	$scope.AddProducts = function () {
	    if (DEBUG)
	        console.log("Add Products...");

	    var item = 0;

	    $scope.CartItems = [];
	    $scope.CartTotal = 0.00;
	    $scope.OrderComplete = false;
	    $scope.CartEmpty = true;

	    for (var i = 0; i < $scope.Products.length; i++)
	    {
            // only add items that have a quantity to the cart
	        if ($scope.Products[i].quantity > 0)
	        {
                // set the cart flag
	            $scope.CartEmpty = false;

	            // create a new cart item and save the product info into it
	            $scope.CartItems[item] = new Object();
	            angular.copy($scope.Products[i], $scope.CartItems[item]);

                // add the total for the product and increment the total cart cost
	            $scope.CartItems[item].total = $scope.CartItems[item].quantity * $scope.CartItems[item].price;
	            $scope.CartTotal += $scope.CartItems[item].total;
	            item++;
	        }
	    }

	    $cookies.put('CartItems', JSON.stringify($scope.CartItems));
	    $cookies.put('CartTotal', $scope.CartTotal);
	};

    // clear cart
	$scope.EmptyCart = function () {
	    if (DEBUG)
	        console.log("Empty Cart...");

	    $scope.CartItems = [];
	    $scope.CartEmpty = true;

	    $cookies.put('CartItems', "");
	    $cookies.put('CartTotal', 0.00);
	};

    // POST: Check out and post data to server
	$scope.CheckOut = function () {
	    if (DEBUG)
	        console.log("CheckOut...");

	    if (DEBUG)
	        console.log("Cart Items: " + JSON.stringify($scope.CartItems));

	    $scope.Loading = true;
	    $("body").css("cursor", "progress");

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
            .catch(function (data, status, header, config) {
                $scope.Error = true;
                $scope.ErrorNo = 101;

                if (DEBUG)
                    console.log("Error: " + data);
            })
	        .finally(function (data, status, header, config) {
	            $scope.Loading = false;
	            $("body").css("cursor", "default");
	        });
	};
});