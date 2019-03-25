'use strict';

angular.module('myApp.tprsDeletions', ['ngRoute']);
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/tprsDeletions',{
        templateUrl: 'transactions/tprsDeletions.html',
        controller:'tprsDeletions_Ctrl',
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



app.controller('tprsDeletions_Ctrl',['$scope','$rootScope','$sessionStorage','$timeout','$location','updateStatus_factory','$route',
    function ($scope,$rootScope,$sessionStorage,$timeout,$location,updateStatus_factory,$route) {

    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $scope.today = new Date();
    $scope.action = $sessionStorage.action;
        $rootScope.user_data  = $sessionStorage.user_data;

    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
    };



    var updateView = function () {
        $scope.found = true;
        var input = {status:'paid'};

        updateStatus_factory.getSettlements(input).then(function (response) {
            if (response.data.length === 0){
                $scope.empty = true;
            }else{
                $scope.details = response.data;
            }
            $timeout(updateView,120000)
        },function () {
            $sessionStorage.action = {
                message: 'Network  Error',
                success: false,
                failure : false,
                network: true
            };
        });
        $scope.found = false;

    };



    updateView();


    $scope.delete = function () {
        var input = {id: $scope.claim.Id, status:'deleted',user:$scope.logged_in.user};
        //console.log(input)
        updateStatus_factory.changeSettlementStatus(input).then(function (response) {
            console.log(response.data);
            if (response.data === true){
                $sessionStorage.action = {
                    message: 'Deleted Successfully',
                    success: true,
                    failure : false,
                    network: false
                };
            }else{
                $sessionStorage.action = {
                    message: 'Deletion failed',
                    success: false,
                    failure : true,
                    network: false
                };
            }
            $route.reload();
        },function () {
            $sessionStorage.action = {
                message: 'Network Error',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        })
    };


        $scope.close_alerts = function () {
            $sessionStorage.action={
                message: '',
                success: false,
                failure : false,
                network: false
            }
        };


    }]);
