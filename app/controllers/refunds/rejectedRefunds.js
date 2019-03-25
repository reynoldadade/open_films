'use strict';

var app = angular.module('myApp.rejectedRefunds', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/rejectedRefunds', {
        templateUrl: 'refunds/rejectedRefunds.html',
        controller: 'rejectedRefundsCtrl',
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

app.controller('rejectedRefundsCtrl', ['$scope','$sessionStorage','updateStatus_factory','$route','$rootScope','$timeout',function($scope,$sessionStorage,updateStatus_factory,$route,$rootScope,$timeout) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.info ={};
    $scope.info.title = 'Rejected Refunds';
    $scope.info.modalTitle = 'Refund Details';
    $scope.info.buttonText = 'Recall';
    $scope.info.showStatusTime = true;
    //$scope.info.showButton = true;
    $scope.sortType = 'CreatedByDate';
    $rootScope.user_data  = $sessionStorage.user_data;

    $scope.sortReverse = false;


    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
        console.log($scope.claim)

    };

    var updateView = function () {
        var input ={status:'rejected'};
        $scope.info.spin = true;
        updateStatus_factory.getRefundStatus(input).then(function (response) {

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

    updateView();


    var checkStatus = function (input,param,punchline) {
        updateStatus_factory.getRefundById(input).then(function (response) {
            $scope.compare = response.data;
            if ($scope.compare.TransactionStatus === 'pending_kyc'){

                updateStatus(param);
            }else{
                $sessionStorage.action = {
                    message: punchline+' - Refund Worked on - Refund Currently at '+ $scope.compare.TransactionStatus,
                    success: false,
                    failure : true,
                    network: false
                };
                $route.reload();
            }
        })
    };


    var updateStatus = function (input) {
        updateStatus_factory.updateRefundStatus(input).then(function (response) {
                if (response.data = true){
                    if (input.status === 'rejected'){
                        $sessionStorage.action = {
                            message: 'Rejected Sucessfully',
                            success: true,
                            failure : false,
                            network: false
                        };
                    }else{
                        $sessionStorage.action = {
                            message: 'Authorised Sucessfully',
                            success: true,
                            failure : false,
                            network: false
                        };
                    }
                }else{
                    if (input.status === 'pending_epay'){
                        $sessionStorage.action = {
                            message: 'Authorisation Failed',
                            success: false,
                            failure : true,
                            network: false
                        };
                    }else{
                        $sessionStorage.action = {
                            message: 'Rejection Failed',
                            success: false,
                            failure : true,
                            network: false
                        };
                    }
                }

                $route.reload();
            },function () {
                $sessionStorage.action = {
                    message: 'Network Failure',
                    success: false,
                    failure : false,
                    network: true
                };
                $route.reload();
            }
        )
    };

    $scope.authorise = function () {
        var input = {id:$scope.claim.Id};
        var param;
        if ($scope.info.reason){
            param ={status:'pending_kyc', user: $rootScope.logged_in.user, Id: $scope.claim.Id,message:$scope.info.reason};
        }else{
            param ={status:'pending_kyc', user: $rootScope.logged_in.user, Id: $scope.claim.Id,message:$scope.claim.refundmessage};
        }
        var punchline  = 'Recall Failed';
        checkStatus(input,param,punchline)
    };

    $scope.reject = function (){
        var input = {id:$scope.claim.Id};
        var param ={status:'rejected', user: $rootScope.logged_in.user, Id: $scope.claim.Id};
        var punchline  = 'Rejection Failed';
        checkStatus(input,param,punchline)
    };




    $scope.closeAlerts = function(){
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        };
    };



}]);