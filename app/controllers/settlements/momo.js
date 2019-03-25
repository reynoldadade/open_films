'use strict';

var app = angular.module('myApp.momo', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/momo', {
        templateUrl: 'settlement/momo.html',
        controller: 'momoCtrl',
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

app.controller('momoCtrl', ['$scope','$sessionStorage','$route','$rootScope','$location','apiFactory',function($scope,$sessionStorage,$route,$rootScope,$location,apiFactory) {
    $scope.claim = $sessionStorage.claim;
    $scope.networks = [{Name:'MTN',Code:'MTN'},{Name:'AIRTEL',Code:'AIR'},{Name:'VODAFONE',Code:'VOD'},{Name:'TIGO',Code:'TIG'}];
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.action = $sessionStorage.action;
    $rootScope.user_data  = $sessionStorage.user_data;



    var settlementRequest = {
        "Id": 0,
        "RequestDate": "2018-07-01T17:34:21.591Z",
        "StaffId": "",
        "StaffName": "",
        "LoanNo": "",
        "LoanDate": "2018-07-01T17:34:21.591Z",
        "LoanAmount": 0,
        "SettlementAmount": 0,
        "SettlementCharges": 0,
        "SettlementTotal": 0,
        "Balance": 0,
        "PaymentMobileNumber": "",
        "PaymentNetworkProvider": "",
        "PaymentUserCode": "",
        "PaymentAuthorized": true,
        "Status": "",
        "SettlementType": "",
        "ChequeNumber": "",
        "ChequeBank": "",
        "ChequeSortCode": "",
        "ChequeAmount": 0,
        "SettlementTLCode": "",
        "ChequeIssuerName": "",
        "Branch": "",
        "ContactNumber": "",
        "StatusDate": "2018-07-01T17:34:21.592Z",
        "CreatedDate": "2018-07-01T17:34:21.592Z",
        "MonthlyInstallments": 0
    };

    $scope.postMomoSettlement = function () {
        settlementRequest.RequestDate = Date.now();
        settlementRequest.StaffId = $scope.claim.Employee_Id;
        settlementRequest.StaffName = $scope.claim.StaffName;
        settlementRequest.LoanNo = $scope.claim.Loan_No;
        settlementRequest.LoanDate = $scope.claim.Loan_Issue_Date;
        settlementRequest.LoanAmount = $scope.claim.Loan_Amount;
        settlementRequest.SettlementAmount = $scope.claim.OutrightAmountDue;
        settlementRequest.SettlementType = 'MM';
        settlementRequest.ContactNumber = $scope.momo.contactNumber;
        settlementRequest.SettlementTLCode =$rootScope.user_data.Id;
        settlementRequest.PaymentMobileNumber = $scope.momo.momoNumber;
        settlementRequest.ContactNumber = $scope.momo.contactNumber;
        settlementRequest.PaymentNetworkProvider = $scope.momo.network;
        settlementRequest.MonthlyInstallments = $scope.claim.Monthly_Installment;


        apiFactory.postSettlementRequest(settlementRequest).then(function (response) {
            console.log(response)
            if  (response.data === true){
                $sessionStorage.action={
                    message: 'Mobile Settlement Successfully Posted',
                    success: true,
                    failure : false,
                    network: false
                };
                $location.path('/settleLoan');

            }else{
                $sessionStorage.action={
                    message: 'Mobile Settlement Posting Failed',
                    success: false,
                    failure : true,
                    network: false
                }
            }
            $route.reload();
        },function () {
            $sessionStorage.action={
                message: 'Network Error',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        })
    }

    $scope.closeAlerts = function(){
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        };
    }



}]);