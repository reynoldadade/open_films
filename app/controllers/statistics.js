'use strict';

angular.module('myApp.statistics', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/statistics', {
        templateUrl: 'transactions/statistics.html',
        controller: 'statistics_Ctrl',
        resolve:
        {
                mess:function($location,$sessionStorage)
                {
                    var t=($sessionStorage.logged_in.allow).toString();
                    //var t2=($sessionStorage.logged_in.admin).toString();
                    if(t!=="true" /*&& t2!=="true"*/)
                    {
                        $location.path('/login');
                        //redirectTo: '/login';
                    }
                }
    
        }
      })
   }])

//statistics
app.controller('statistics_Ctrl',['$scope','$http','$rootScope','$sessionStorage','$route','$filter','updateStatus_factory',function ($scope,$http,$rootScope,$sessionStorage,$route,$filter,updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.branches = $sessionStorage.branches;
    $rootScope.filtered = $sessionStorage.filtered;
    $rootScope.paymentMethod = $sessionStorage.paymentMethod;
    $scope.action = $sessionStorage.action;
    $scope.user = $sessionStorage.user;
    $scope.today= new Date();
    $rootScope.user_data = $sessionStorage.user_data;

    $scope.labels = ['KYC', 'TPRS', 'E-PAY'];
    $scope.series = ['Approved', 'Rejected'];




    $scope.submit = function () {
        $scope.found = true;  //for the spinner
        var start_day = new Date($scope.start_date).getDate();
        var start_month = new Date($scope.start_date).getMonth() + 1;
        var start_year = new Date($scope.start_date).getFullYear();
        var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
        var end_day = new Date($scope.end_date).getDate();
        var end_month = new Date($scope.end_date).getMonth();
        var end_year = new Date($scope.end_date).getFullYear();
        var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

        var input = {name: $scope.user, startdate: start_full_year, enddate: end_full_year};
        updateStatus_factory.getReportByName(input).then(function (response) {
            $scope.details = response.data;
            if ($scope.details.length === 0){
                $scope.empty = true;
            }
            $scope.found = false;


            /*$scope.pending_tprs =($filter('filter')($scope.details,{TransactionStatus:'pending_tprs'})).length;
            $scope.kyc_rejected =($filter('filter')($scope.details,{TransactionStatus:'kyc_rejected'})).length;
            $scope.pending_epay =($filter('filter')($scope.details,{TransactionStatus:'pending_epay'})).length;
            $scope.epay_rejected =($filter('filter')($scope.details,{TransactionStatus:'epay_rejected'})).length;
            $scope.paid =($filter('filter')($scope.details,{TransactionStatus:'paid'})).length;
            $scope.kyc_pending =($filter('filter')($scope.details,{TransactionStatus:'kyc_pending'})).length;

            $scope.tprs_rejected =($filter('filter')($scope.details,{TransactionStatus:'tprs_rejected'})).length;
            $scope.labels = ['KYC','TPRS','EPAY'];
            $scope.series = ['Approved','Rejected'];*/


            $scope.data = [[$scope.kyc_pending,$scope.pending_tprs,$scope.pending_epay],[$scope.kyc_rejected,$scope.tprs_rejected,$scope.epay_rejected]];
        });
    };

    $scope.change_password = function () {
        var input = { userid: $rootScope.logged_in.user_id, oldpass: $scope.old_password, newpass: $scope.new_password };
        updateStatus_factory.changePassword(input).then(function (response) {
            console.log(response.data)
            if (response.data === true){

                $sessionStorage.action = {
                    message: 'Password Changed Successfully',
                    success: true,
                    failure : false,
                    network: false
                };
            }
            else{
                $sessionStorage.action = {
                    message: 'Password Change Failed',
                    success: true,
                    failure : false,
                    network: false
                };
            }
            $route.reload();
        });
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
/**********************************************************************************************************************************/