'use strict';

var app = angular.module('myApp.paidRefunds', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/paidRefunds', {
        templateUrl: 'refunds/paidRefunds.html',
        controller: 'paidRefundsCtrl',
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

app.controller('paidRefundsCtrl', ['$scope','$sessionStorage','updateStatus_factory','$route','$rootScope','$timeout',function($scope,$sessionStorage,updateStatus_factory,$route,$rootScope,$timeout) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.info ={};
    $scope.info.title = 'Paid Refunds';
    $scope.info.modalTitle = 'Refund Details';
    $scope.info.showForm = true;
    $scope.info.buttonText = 'Approve';
    $scope.info.showStatusTime = true;
    $scope.format = {};
    $rootScope.user_data  = $sessionStorage.user_data;
    //$scope.info.showButton = true;


   

    $scope.submit = function(){
        $scope.details = [];
        $scope.info.spin = true;
       // console.log($scope.format);
        //$scope.found = true;  //for the spinner
        var start_day = new Date($scope.format.start_date).getDate();
        var start_month = new Date($scope.format.start_date).getMonth() + 1;
        var start_year = new Date($scope.format.start_date).getFullYear();
        var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
        var end_day = new Date($scope.format.end_date).getDate();
        var end_month = new Date($scope.format.end_date).getMonth() + 1;
        var end_year = new Date($scope.format.end_date).getFullYear();
        var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

        var input = {status: 'paid',startDate: start_full_year,endDate: end_full_year};
        $sessionStorage.input = input;
        updateView(input)

    };


    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
        console.log($scope.claim)

    };

    var updateView = function (input) {
        //console.log('in here');

        updateStatus_factory.getRefundByStatusDate(input).then(function (response) {

            if (response.data.length === 0){
                $scope.info.error = true;
                $scope.info.message = 'No transactions found';
            }else{
                $scope.details = response.data;
            }

        },function () {
            $sessionStorage.action = {
                message: '',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        });
        $scope.info.spin = false;
    };

    
}]);