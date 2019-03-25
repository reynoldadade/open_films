'use strict';

var app = angular.module('myApp.eligibilityCheck', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/eligibilityCheck', {
        templateUrl: 'refundsV2/eligibilityCheck.html',
        controller: 'eligibilityCheckCtrl',
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

app.controller('eligibilityCheckCtrl', ['$scope','$sessionStorage','$rootScope','$location',function($scope,$sessionStorage,$rootScope,$location) {
    $scope.claim = $sessionStorage.claim;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;


    $scope.info ={
        title:'Eligibility Check'
    }





    $scope.closeAlerts = function(){
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        };
    }
}]);