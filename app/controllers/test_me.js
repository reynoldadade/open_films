'use strict';

angular.module('myApp.testMe', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/test', {
        templateUrl: 'transactions/test_me.html',
        controller: 'test_me',
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
   }])
 


app.controller('test_me',['$scope','$rootScope','$sessionStorage','$timeout','$location',function ($scope,$rootScope,$sessionStorage,$timeout,$location) {




}]);