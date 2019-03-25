'use strict';

var app = angular.module('myApp.refundsKYC', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/refundsKYC', {
        templateUrl: 'refundsV2/refundsKYC.html',
        controller: 'refundsKYCCtrl',
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
    });
}]);

app.controller('refundsKYCCtrl', ['$scope','$sessionStorage','$rootScope','$location',function($scope,$sessionStorage,$rootScope,$location) {
    $scope.claim = $sessionStorage.claim;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;





    $scope.closeAlerts = function(){
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        };
    }
}]);