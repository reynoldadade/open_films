'use strict';

var app = angular.module('myApp.epayRefunds', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/epayRefunds', {
        templateUrl: 'refunds/epayRefunds.html',
        controller: 'epayRefundsCtrl',
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

app.controller('epayRefundsCtrl', ['$scope','$sessionStorage','updateStatus_factory','$route','$rootScope','$timeout',function($scope,$sessionStorage,updateStatus_factory,$route,$rootScope,$timeout) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $rootScope.user_data  = $sessionStorage.user_data;
    $scope.info ={};
    $scope.info.title = 'Refunds At EPayment';
    $scope.info.modalTitle = 'Refund Details';
    $scope.info.buttonText = 'Pay';
    $scope.info.showButton = true;
    $scope.info.showStatusTime = true;
    $scope.info.straightButton = true;


    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
        console.log($scope.claim)

    };

    var updateView = function () {
        var input ={status:'pending_epay'};
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
                message: '',
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
            if ($scope.compare.TransactionStatus === 'pending_epay'){

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
                $scope.info.reason = null;
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
                if (input.status === 'paid'){
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

            }
        )
    };

    $scope.authorise = function () {
        var input = {id:$scope.claim.Id};

            var param ={status:'paid', user: $rootScope.logged_in.user, Id: $scope.claim.Id,message:$scope.claim.refundmessage};
        var punchline  = 'Authorisation Failed';
        checkStatus(input,param,punchline)
    };

    $scope.reject = function (){
        var input = {id:$scope.claim.Id};
        var param ={status:'rejected', user: $rootScope.logged_in.user, Id: $scope.claim.Id,message:$scope.info.reason};
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
    }
}]);