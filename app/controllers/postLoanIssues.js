'use strict';

angular.module('myApp.postLoanIssues', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/postLoanIssues', {
        templateUrl: 'transactions/postLoanIssues.html',
        controller: 'postLoanIssues_Ctrl',
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


app.controller('postLoanIssues_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter',
    'updateStatus_factory','$route',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory,$route) {

        $rootScope.logged_in = $sessionStorage.logged_in;
        $scope.action = $sessionStorage.action;
        $scope.loanIssue = {};
        $scope.employers = ['controller','korlebu','police'];
        $scope.categories = ['Multiple Loan','Duplicate Loan','Incorrect Balance','Refunds','Unrecorded Repayments',
        'Unrecorded Settlements','Others'];
        $scope.issues = ['Refund','Settlement','Loan','Others'];
        $rootScope.user_data  = $sessionStorage.user_data;


        $scope.postLoanIssue = function () {
            var input = {issueDate: new Date(),staffId: $scope.loanIssue.staffId, category: $scope.loanIssue.category,clientname:$scope.loanIssue.clientname,
                description: $scope.loanIssue.description, submittedBy: $scope.logged_in.user_id , stafftype: $scope.loanIssue.stafftype,IssueType: $scope.issueType};

                updateStatus_factory.postIssues(input).then(function (response) {
                    //console.log(input);
                   // console.log(response.data);
                    if (response.data.Status === 'true'){
                        $sessionStorage.action = {
                            message: 'Loan Issue Sent Successfully',
                            //message: $scope.details[$scope.selected].ClientRefId + ' Successfully Approved',
                            success: true,
                            failure: false,
                            network: false
                        };
                    }
                    else{
                        $sessionStorage.action = {
                            message: response.data.Message,
                            //message: $scope.details[$scope.selected].ClientRefId + ' Successfully Approved',
                            success: true,
                            failure: false,
                            network: false
                        };
                    }
                    $route.reload();
                },function () {

                    $sessionStorage.action = {
                        message: 'Sending Request Failed',
                        //message: $scope.details[$scope.selected].ClientRefId + ' Successfully Approved',
                        success: false,
                        failure: false,
                        network: true
                    };
                    $route.reload();
                })
        }


        $scope.close_alerts = function () {
            $sessionStorage.action={
                message: '',
                success: false,
                failure : false,
                network: false
            }
        };


}]);


