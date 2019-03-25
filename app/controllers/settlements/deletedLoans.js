'use strict';

var app = angular.module('myApp.deletedLoans', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/deletedLoans', {
        templateUrl: 'settlement/deletedLoans.html',
        controller: 'deletedLoansCtrl',
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

app.controller('deletedLoansCtrl', ['$scope','$sessionStorage','apiFactory','$route','$rootScope','$timeout','$filter',function($scope,$sessionStorage,apiFactory,$route,$rootScope,$timeout,$filter) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.info ={};
    $scope.info.title = 'Deleted Loans';
    $scope.info.modalTitle = 'Settlement Details';
    $rootScope.user_data  = $sessionStorage.user_data;
    $scope.formStuff = {};
    $scope.formStuff.showSubmit = true;



    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
        console.log($scope.claim)

    };

    $scope.submit = function(){
        $scope.details = [];
        $scope.found = true;  //for the spinner
        var start_day = new Date($scope.formStuff.start_date).getDate();
        var start_month = new Date($scope.formStuff.start_date).getMonth() + 1;
        var start_year = new Date($scope.formStuff.start_date).getFullYear();
        var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
        var end_day = new Date($scope.formStuff.end_date).getDate();
        var end_month = new Date($scope.formStuff.end_date).getMonth() + 1;
        var end_year = new Date($scope.formStuff.end_date).getFullYear();
        var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();


        $sessionStorage.input = {status: 'deleted',startDate: start_full_year,endDate: end_full_year};
        console.log($sessionStorage.input)
        updateView()

    };

    var updateView = function () {
        $scope.info.spin = true;
        var input = $sessionStorage.input;
        apiFactory.getSettlementStatusByDate(input).then(function (response) {

            if (response.data.length === 0){
                $scope.info.error = true;
                $scope.info.message = 'No transactions found';
            }else{
                $scope.details = response.data;

            }

            $timeout(updateView,120000)

        },function () {
            $sessionStorage.action = {
                message: 'Network Error',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        });
        $scope.info.spin = false;
    };





   
    $scope.closeAlerts = function(){
        console.log('closing');
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        };
    }
}]);