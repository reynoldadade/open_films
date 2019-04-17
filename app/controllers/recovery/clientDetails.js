'use strict';

angular.module('myApp.clientDetails', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/clientDetails', {
        templateUrl: 'recovery/clientDetails.html',
        controller: 'clientDetails_ctrl',
        resolve:
            {
                mess:function($location,$sessionStorage)
                {
                    var t=($sessionStorage.logged_in.allow).toString();
                    if(t!=="true")
                    {
                        $location.path('/login');
                        //redirectTo: '/login';
                    }
                }

            }
    })
}]);


app.controller('clientDetails_ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','updateStatus_factory',function ($scope, $rootScope, $sessionStorage, $http, $route, updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $scope.action = $sessionStorage.action;


    $scope.editDetails = function () {
        editDetails()
    };

   var editDetails = function () {

   };



}]);
