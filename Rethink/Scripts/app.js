var app = angular.module('reThink', ['ngRoute']);


app.controller('MainController', ['$scope', 'ApiDataService', function($scope, ApiDataService) {
    $scope.Products = [];
    $scope.Categories = [];
    $scope.Companies = [];

    $scope.editing = false;
    $scope.deleting = false;
    $scope.startOperation = false;
    $scope.adding = false;

    $scope.selectedProduct = {};


    ApiDataService.getProducts().then(function(data) {
        $scope.Products = data;
    });



    ApiDataService.getCompanies().then(function (data) {
        $scope.Companies = data;
    });

    ApiDataService.getCategories().then(function (data) {
        $scope.Categories = data;
    });


    $scope.addNewOne = function () {
        $scope.startOperation = true;
        $scope.adding = true;
        $scope.selectedProduct = {};
    }

    $scope.edit = function (product) {
        $scope.startOperation = true;
        $scope.editing = true;
        $scope.selectedProduct = product;
        $scope.adding = false;
    }


    $scope.Add = function () {
        ApiDataService.addProduct($scope.selectedProduct).then(function (data) {
             $scope.Products.push(data);

            $scope.startOperation = false;
            $scope.editing = false;
            $scope.selectedProduct = {};
        });
    }

    $scope.update= function() {
        ApiDataService.updateProduct($scope.selectedProduct).then(function() {
            var index = $scope.Products.indexOf($scope.selectedProduct);
            
            $scope.Products[index] = $scope.selectedProduct;
            $scope.startOperation = false;
            $scope.editing = false;
            $scope.selectedProduct = {};
        });
    }
    $scope.cancelEdit = function () {
        $scope.startOperation = false;
        $scope.editing = false;
        $scope.selectedProduct = {};
    }
    $scope.delete = function (p) {
        var a = confirm("Are you sure to delete this? => " + p.ProductName);
        if (a) {
            ApiDataService.deleteProduct(p.ProductId).then(function() {
                var index = $scope.Products.indexOf(p);
               
                $scope.Products.splice(index, 1);
            });

        } else {
            return;
        }
    }

}]);


app.factory('ApiDataService', ['$http', '$q', function ($http, $q) {
    var getProducts = function () {
        var d = $q.defer();

        $http({
            url: '/api/productsapi/',
            method: 'GET',
        }).success(function (data) {

            d.resolve(data);
        }).error(function () {

            d.reject();
        });

        return d.promise;
    }

    var getCategories = function () {
        var d = $q.defer();

        $http({
            url: '/api/categoriesapi/',
            method: 'GET',
        }).success(function (data) {

            d.resolve(data);
        }).error(function () {

            d.reject();
        });

        return d.promise;
    }

    var getCompanies = function (search) {
        var d = $q.defer();

        $http({
            url: '/api/companiesapi/',
            method: 'GET',
        }).success(function (data) {

            d.resolve(data);
        }).error(function () {

            d.reject();
        });

        return d.promise;
    }

    var deleteProduct = function (i) {
        var d = $q.defer();

        $http({
            url: '/api/ProductsApi/'+i,
            method: 'DELETE',
        }).success(function (data) {

            d.resolve(data);
        }).error(function () {

            d.reject();
        });

        return d.promise;
    }

    var updateProduct = function(product) {
        var d = $q.defer();

        $http({
            url: '/api/ProductsApi/' +product.ProductId,
            method: 'PUT',
            data:product
        }).success(function (data) {

            d.resolve(data);
        }).error(function () {

            d.reject();
        });

        return d.promise;
    }
    var addProduct = function (product) {
        var d = $q.defer();

        $http({
            url: '/api/ProductsApi/' + product.ProductId,
            method: 'POST',
            data: product
        }).success(function (data) {

            d.resolve(data);
        }).error(function () {

            d.reject();
        });

        return d.promise;
    }

    
    return {
        getProducts: getProducts,
        getCategories: getCategories,
        getCompanies: getCompanies,
        deleteProduct: deleteProduct,
        updateProduct: updateProduct,
        addProduct: addProduct
    }
    
}]);


     
