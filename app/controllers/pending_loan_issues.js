'use strict';

angular.module('myApp.pendingLoanIssues', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/pending_loan_issues',{
        templateUrl: 'transactions/pending_loan_issues.html',
        controller:'pending_loan_issues_Ctrl',
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

app.controller('pending_loan_issues_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory','$route',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory,$route) {

        $rootScope.logged_in = $sessionStorage.logged_in;
        $scope.action = $sessionStorage.action;
        $rootScope.form_data = $sessionStorage.form_data;
        $rootScope.filtered = $sessionStorage.filtered;
        $scope.action = $sessionStorage.action;
        $scope.sortType = 'TicketCreatedDate';
        $scope.sortReverse = false;
        $scope.today = new Date();
        $scope.input = {};
        $scope.issues = ['Refund','Settlement','Loan','Others'];

        $scope.issues = ['Refund','Settlement','Loan','Others'];


        $scope.setSelected = function(selected){
            $scope.selected = $scope.details.indexOf(selected);
            $sessionStorage.claim = selected;
            $scope.claim = $sessionStorage.claim;
        };

        var updateView = function () {

            $scope.found = true;  //for the spinner
            $scope.action = $sessionStorage.action;

            updateStatus_factory.getIssues($scope.input).then(function (response) {
                // console.log(response.data)
                // this callback will be called asynchronously
                // when the response is available
                if(response.data.length === 0){
                    $scope.details = [];
                    $scope.empty = true;
                }
                else{
                    $scope.details = response.data;

                }
                $scope.found = false;
                $scope.updating = false;
                //}

                $timeout(updateView,120000);
                //console.log($scope.details);

            },function(){
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
                $route.reload();
                $scope.found =false;
            });
        };
//run function
$scope.submit = function () {
    $scope.details = [];
    var start_day = new Date($scope.start_date).getDate();
    var start_month = new Date($scope.start_date).getMonth() + 1;
    var start_year = new Date($scope.start_date).getFullYear();
    var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
    var end_day = new Date($scope.end_date).getDate();
    var end_month = new Date($scope.end_date).getMonth() + 1;
    var end_year = new Date($scope.end_date).getFullYear();
    var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

    $scope.input = {status: 'Pending',startDate: start_full_year,endDate: end_full_year};
    $sessionStorage.input = $scope.input;

    updateView();
};


        $scope.resolved = function () {
            var input = {status:'Resolved',ticketid:$scope.claim.TicketNumber,note:$scope.note};
            console.log(input);
            updateStatus_factory.updateIssues(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                if (response.data === true){
                    $sessionStorage.action = {
                        message: $scope.claim.TicketNumber+'  Issue Successfully Resolved',
                        success: true,
                        failure : false,
                        network: false
                    };
                    $scope.updating = true;
                    updateView();


                }
                else{
                    $sessionStorage.action = {
                        message: $scope.claim.TicketNumber+'  Failure Resolving Issue',
                        success: false,
                        failure : true,
                        network: false
                    };

                    updateView();
                }
                $scope.note = null;

            },function(){
                $sessionStorage.action = {
                           message: 'Network Error',
                           success: false,
                           failure : false,
                           network: true
                        };
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