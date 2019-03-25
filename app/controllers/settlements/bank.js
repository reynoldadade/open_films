'use strict';

var app = angular.module('myApp.bank', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/bank', {
        templateUrl: 'settlement/bank.html',
        controller: 'bankCtrl',
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

app.controller('bankCtrl', ['$scope','$sessionStorage','$rootScope','$location',function($scope,$sessionStorage,$rootScope,$location) {
    $scope.claim = $sessionStorage.claim;
    $scope.networks = ['MTN','AIRTEL TIGO','VODAFONE'];
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;



    var settlementRequest = {
        "Id": 0,
        "RequestDate": "2018-06-05T10:46:22.960Z",
        "StaffId": "string",
        "StaffName": "string",
        "LoanNo": "string",
        "LoanDate": "2018-06-05T10:46:22.960Z",
        "LoanAmount": 0,
        "SettlementAmount": 0,
        "SettlementCharges": 0,
        "SettlementTotal": 0,
        "Balance": 0,
        "PaymentMobileNumber": "string",
        "PaymentNetworkProvider": "string",
        "PaymentUserCode": "string",
        "PaymentAuthorized": true,
        "Status": "string",
        "SettlementType": "string",
        "ChequeNumber": "string",
        "ChequeBank": "string",
        "ChequeSortCode": "string",
        "ChequeAmount": 0,
        "SettlementTLCode": "string",
        "ChequeIssuerName": "string",
        "Branch": "string",
        "ContactNumber": "string",
        "StatusDate": "2018-06-05T10:46:22.960Z",
        "CreatedDate": "2018-06-05T10:46:22.960Z"
    };

    $scope.postBankSettlement = function () {
        settlementRequest.RequestDate = Date.now();
        settlementRequest.StaffId = $scope.claim.Employee_Id;
        settlementRequest.StaffName = $scope.claim.StaffName;
        settlementRequest.LoanNo = $scope.claim.Loan_No;
        settlementRequest.LoanDate = $scope.claim.Loan_Issue_Date;
        settlementRequest.LoanAmount = $scope.claim.Loan_Amount;
        settlementRequest.SettlementAmount = $scope.claim.OutrightAmountDue;
        settlementRequest.SettlementType = 'BNK';
        settlementRequest.ContactNumber = $scope.bank.contactNumber;
        settlementRequest.SettlementTLCode =$sessionStorage.logged_in.user;

        apiFactory.postSettlementRequest(settlementRequest).then(function (response) {
            if  (response.data === true){
                $sessionStorage.action={
                    message: 'Cheque Settlement Successfully Posted',
                    success: true,
                    failure : false,
                    network: false
                };
                $location.path('/settleLoan');

            }else{
                $sessionStorage.action={
                    message: 'Cheque Settlement Posting Failed',
                    success: false,
                    failure : true,
                    network: false
                };
                $route.reload();
            }

        },function () {
            $sessionStorage.action={
                message: 'Network Error',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        })
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