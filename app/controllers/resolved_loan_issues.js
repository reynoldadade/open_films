'use strict';

angular.module('myApp.resolvedLoanIssues', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/resolved_loan_issues',{
        templateUrl: 'transactions/resolved_loan_issues.html',
        controller:'resolved_loan_issues_Ctrl',
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
 


app.controller('resolved_loan_issues_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

        $rootScope.logged_in = $sessionStorage.logged_in;
        $scope.action = $sessionStorage.action;
        $rootScope.form_data = $sessionStorage.form_data;
        $rootScope.filtered = $sessionStorage.filtered;
        $scope.action = $sessionStorage.action;
        $scope.sortType = 'TicketCreatedDate';
        $scope.sortReverse = false;
        $rootScope.user_data  = $sessionStorage.user_data;


        $scope.setSelected = function(selected){
            $scope.selected = $scope.details.indexOf(selected);
            $sessionStorage.claim = selected;
            $scope.claim = $sessionStorage.claim;
        };

        $scope.employers = ['controller','police','korlebu'];



        $scope.submit = function () {
            var start_day = new Date($scope.start_date).getDate();
            var start_month = new Date($scope.start_date).getMonth() + 1;
            var start_year = new Date($scope.start_date).getFullYear();
            var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
            var end_day = new Date($scope.end_date).getDate();
            var end_month = new Date($scope.end_date).getMonth() + 1;
            var end_year = new Date($scope.end_date).getFullYear();
            var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();

            var input = {status: 'Resolved',startDate: start_full_year,endDate: end_full_year};

            updateStatus_factory.getIssues(input).then(function (response) {
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

                $timeout(updateView,120000)
                console.log($scope.details);

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
            updateView();
        };

        $scope.close_alerts = function () {
            $sessionStorage.action={
                message: '',
                success: false,
                failure : false,
                network: false
            }
        }

    }]);