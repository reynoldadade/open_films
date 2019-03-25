'use strict';

var app = angular.module('myApp.refundsRequest', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/refundsRequest', {
        templateUrl: 'refundsV2/refundsRequest.html',
        controller: 'refundsRequestCtrl',
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

app.controller('refundsRequestCtrl', ['$scope','$sessionStorage','$rootScope','$location','updateStatus_factory','$route',function($scope,$sessionStorage,$rootScope,$location, updateStatus_factory,$route) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.user_data = $sessionStorage.user_data;
    $scope.info ={};
    $scope.claim = {};
    $scope.refunds = {};


    var refundData = {
        "Id": 0,
        "Name": "",
        "Employer": "",
        "EmployeeID": "",
        "ContactPhoneNumber": "",
        "PaymentMode": "",
        "Reason": "",
        "SettlementAmount": 0,
        "SettlementMonth": "",
        "SettlementYear": "",
        "Notes": "",
        "RefundStatus": "",
        "CreatedByDate": "2018-10-26T13:22:59.873Z",
        "StatusByDate": "2018-10-26T13:22:59.873Z",
        "CreatedByUser": "",
        "StatusByUser": "",
        "MomoNumber": '',
        "BankBranch":''
    }

    $scope.branches = ['Accra','Bolga','Wa','Takoradi','Kumasi','Cape coast','Akatsi','Ho','Sunyani','Koforidua','Tamale'];
    $scope.payments = ['MTN Mobile Money','TIGO Cash','Vodafone Cash','Cheque','GN Bank'] ;
    $scope.employers = ['controller','korlebu','police'];


    var postRefund = function () {
        refundData.EmployeeID = $scope.refunds.EmployeeId;
        refundData.Name = $scope.refunds.Name;
        refundData.Employer = $scope.refunds.Employer;
        refundData.Branch = $scope.refunds.branch;
        refundData.PaymentMode = $scope.refunds.PaymentMode;
        refundData.ContactPhoneNumber = $scope.refunds.ContactPhoneNumber;
        refundData.MomoNumber = $scope.refunds.MomoNumber;
        refundData.CreatedByUser  = $scope.user_data.Id;
        refundData.Reason = $scope.refunds.reasons;
        //refundData.BankBranch = $scope.user.BankBranch;
        refundData.SettlementAmount = $scope.SettlementAmount;
        refundData.SettlementMonth = $scope.SettlementMonth;
        refundData.SettlementYear = $scope.SettlementYear;

        updateStatus_factory.requestRefund(refundData).then(function (response) {
            console.log(response);
            if(response.data === true){
                $sessionStorage.action = {
                    message: 'Refund Requested Sucessfully',
                    success: true,
                    failure : false,
                    network: false
                };
                $route.reload();
            }else{
                $sessionStorage.action = {
                    message: 'Failed to Post Refund Request',
                    success: true,
                    failure : false,
                    network: false
                };
                $route.reload();
            }
        },function () {
            $sessionStorage.action = {
                message: 'Network Failure',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        })
    };

    var checkRefund = function () {
        var input = {staffId: $scope.refundData.EmployeeId};
        //console.log('in here');
        updateStatus_factory.refundEligibility(input).then(function (response) {

                if(response.data.Status === "true" && response.data.Data === "null"){
                    $scope.error = true;
                    $scope.info.title = 'Not Eligible'
                } else if(response.data.Status === "true"){
                    //console.log(response.data)
                    $scope.info.title = 'Eligible';
                    $scope.error = true;
                    $scope.showForm = true;
                    var claim = response.data.Data;
                    $scope.claim = angular.fromJson(claim)

                }
                else{
                    $scope.error = true;
                    $scope.info.title = 'Not Eligible'
                }
                $scope.searching = false;

            },function () {
                $scope.error = true;
                $scope.info.title = 'Network Error';
                $scope.searching = false;
            }
        )
    };

    $scope.checkRefund = function () {
        $scope.claim = null;
        $scope.searching = true;
        $scope.error = false;
        $scope.showForm = false;

        checkRefund();

    };


    $scope.reasons = ['SETTLEMENT',
                    'MATURITY',
                    'DOUBLE DEDUCTION',
                    'OVER-DEDUCTION',
                    'SETTLEMENT DIFFERENCE',
                    'WRONGFUL CAPTURE',
                    'FRAUD'];



    $scope.sendRefund=function () {
        postRefund();
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