'use strict';

angular.module('myApp.dashboard', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'transactions/dashboard.html',
        controller: 'dashboard_Ctrl',
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
   }]);
 

app.controller('dashboard_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$filter','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$filter,updateStatus_factory) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $rootScope.branches = $sessionStorage.branches;
 $rootScope.form_data = $sessionStorage.form_data;
 $rootScope.paymentMethod  = $sessionStorage.paymentMethod;
 $scope.loaded = true;
$scope.today = new Date();
$scope.submit=function () {
    $scope.found=true;
    var start_day = new Date($scope.start_date).getDate();
    var start_month = new Date($scope.start_date).getMonth() + 1;
    var start_year = new Date($scope.start_date).getFullYear();
    var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
    var end_day = new Date($scope.end_date).getDate() + 1;
    var end_month = new Date($scope.end_date).getMonth() + 1;
    var end_year = new Date($scope.end_date).getFullYear();
    var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

   var input = {start:start_full_year,end:end_full_year};
       updateStatus_factory.getAllActiveRequests(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.details = response.data;
             $scope.loaded = false;
            $scope.found=false;
            $scope.pending_tprs =($filter('filter')($scope.details,{TransactionStatus:'pending_tprs'})).length;
            $scope.kyc_rejected =($filter('filter')($scope.details,{TransactionStatus:'kyc_rejected'})).length;
            $scope.pending_epay =($filter('filter')($scope.details,{TransactionStatus:'pending_epay'})).length;
            $scope.epay_rejected =($filter('filter')($scope.details,{TransactionStatus:'epay_rejected'})).length;
            $scope.paid =($filter('filter')($scope.details,{TransactionStatus:'paid'})).length;
            $scope.kyc_pending =($filter('filter')($scope.details,{TransactionStatus:'kyc_pending'})).length;
            $scope.cancelled =($filter('filter')($scope.details,{TransactionStatus:'cancelled'})).length;
            $scope.tprs_rejected =($filter('filter')($scope.details,{TransactionStatus:'tprs_rejected'})).length;
            $scope.labels = ['KYC','KYC Rejected','TPRS Pending','TPRS Rejected','EPAY Validation','EPAY Rejected','Cancelled'];


$scope.data = [$scope.kyc_pending,$scope.kyc_rejected,$scope.pending_tprs,$scope.tprs_rejected,$scope.pending_epay,$scope.epay_rejected,$scope.cancelled];
//$scope.data = [4,3,10,5,20,8,3];
        }, function () {
           $sessionStorage.action = {
               message: 'Network Error',
               success: false,
               failure : false,
               network: true
           };
        });
    };









}]);
