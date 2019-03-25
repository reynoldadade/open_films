'use strict';

angular.module('myApp.tat', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/tat', {
        templateUrl: 'reports/tat.html',
        controller: 'tat_Ctrl',
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

app.controller('tat_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$route,updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $scope.today = new Date();



    $scope.statuses = [{name:'pending_kyc'},{name:'kyc_rejected'},{name:'pending_tprs'},{name:'tprs_rejected'},{name:'pending_epay'},{name:'paid'},{name:'cancelled'}];

    $scope.resetScope = function () {
        $scope.details = [];
    };

    $scope.getByStatus = function () {
        $scope.details = [];
        $scope.found = true;
        var start_day = new Date($scope.start_date).getDate();
        var start_month = new Date($scope.start_date).getMonth() + 1;
        var start_year = new Date($scope.start_date).getFullYear();
        var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
        var end_day = new Date($scope.end_date).getDate();
        var end_month = new Date($scope.end_date).getMonth() + 1;
        var end_year = new Date($scope.end_date).getFullYear();
        var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();
        var input = {startdate: start_full_year, enddate:end_full_year, status:$scope.status};
        //console.log(input)
        updateStatus_factory.getReportByStatus(input).then(function (response) {
            //console.log(response.data)
            if (response.data === []){
                $scope.message = 'Data not found';
                $scope.error = true;
            }
            else{
                $scope.details = response.data;
            }
            $scope.found = false;

        },function () {
            $scope.error = true;
            $scope.message = 'Unable to connect to server, please retry later';
            $scope.found = false;
        })
    };

    $scope.getByName = function () {
        getUser({userid:$scope.name});

    };

    $scope.getByDate = function () {
        $scope.details = [];
        $scope.found = true;
        var start_day = new Date($scope.start_date).getDate();
        var start_month = new Date($scope.start_date).getMonth() + 1;
        var start_year = new Date($scope.start_date).getFullYear();
        var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
        var end_day = new Date($scope.end_date).getDate();
        var end_month = new Date($scope.end_date).getMonth() + 1;
        var end_year = new Date($scope.end_date).getFullYear();
        var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();
        var input = {startdate: start_full_year, endate:end_full_year};
        updateStatus_factory.getReportByDate(input).then(function (response) {
            if (response.data === []){
                $scope.message = 'Data not found';
                $scope.error = true;
            }
            else{
                $scope.details = response.data;
            }
            $scope.found = false;

        },function () {
            $scope.error = true;
            $scope.message = 'Unable to connect to server, please retry later';
            $scope.found = false;
        })
    };

    var getUser = function (name) {
        updateStatus_factory.getUser(name).then(function (response) {
            console.log(response.data);
            $scope.details = [];
            if (response.data === null){
                $scope.message = 'Data not found';
                $scope.error = true;
            }else{
                $scope.found = true;
                var start_day = new Date($scope.start_date).getDate();
                var start_month = new Date($scope.start_date).getMonth() + 1;
                var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();
                var input = {startdate: start_full_year, enddate:end_full_year, name:response.data.Name};
                var start_year = new Date($scope.start_date).getFullYear();
                var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
                var end_day = new Date($scope.end_date).getDate();
                var end_month = new Date($scope.end_date).getMonth() + 1;
                var end_year = new Date($scope.end_date).getFullYear();
                updateStatus_factory.getReportByName(input).then(function (response) {
                    if (response.data === []){
                        console.log(response.data);
                        $scope.message = 'Data not found';
                        $scope.error = true;
                    }
                    else{
                        $scope.details = response.data;
                    }
                    $scope.found = false;

                },function () {
                    $scope.error = true;
                    $scope.message = 'Unable to connect to server, please retry later';
                    $scope.found = false;
                })
            }
        },function () {
            $scope.fullName = [];
        })
    };


}]);