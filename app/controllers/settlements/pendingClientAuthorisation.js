'use strict';

var app = angular.module('myApp.pendingClientAuthorisation', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/pendingClientAuthorisation', {
        templateUrl: 'settlement/pendingClientAuthorisation.html',
        controller: 'pendingClientAuthorisationCtrl',
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

app.controller('pendingClientAuthorisationCtrl', ['$scope','$sessionStorage','apiFactory','$route','$rootScope','$timeout','$filter',function($scope,$sessionStorage,apiFactory,$route,$rootScope,$timeout,$filter) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.info ={};
    $scope.info.title = 'Pending Client Authorisation';
    $scope.info.modalTitle = 'Settlement Details';
    $rootScope.user_data  = $sessionStorage.user_data;



    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
        console.log($scope.claim)

    };

    var updateView = function () {
        $scope.info.spin = true;
        var input = {status:'pending'}
        apiFactory.getSettlementStatus(input).then(function (response) {

            if (response.data.length === 0){
                $scope.info.error = true;
                $scope.info.message = 'No transactions found';
            }else{
                $scope.details = response.data;
                $scope.details = $filter('momo_filter')(response.data);
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


    var clickToPay = function (input) {
        apiFactory.changeChequeToPaid(input).then(function (response) {
                if (response.data = true){
                    $sessionStorage.action = {
                        message: 'Cheque Payment Authorised Successfully',
                        success: true,
                        failure : false,
                        network: false
                    };
                }else{
                    $sessionStorage.action = {
                        message: 'Cheque Posting Failed',
                        success: false,
                        failure : true,
                        network: false
                    };
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

    $scope.authorise = function (input) {
        if ($scope.claim.SettlementType === 'CHK'){
            clickToPay({chequeNumber: $scope.claim.ChequeNumber, user:$scope.logged_in.user})
        }
        else{
            $sessionStorage.action = {
                message: 'This Transaction is not a CHEQUE Payment. Authorisation Failed',
                success: false,
                failure : true,
                network: false
            };
            $route.reload();
        }
    };


    updateView();

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