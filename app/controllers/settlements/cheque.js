'use strict';

var app = angular.module('myApp.cheque', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cheque', {
        templateUrl: 'settlement/cheque.html',
        controller: 'chequeCtrl',
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

app.controller('chequeCtrl', ['$scope','$sessionStorage','apiFactory','$route','$rootScope','$location',function($scope,$sessionStorage,apiFactory,$route,$rootScope,$location) {
    $scope.claim = $sessionStorage.claim;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.action = $sessionStorage.action;

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
    }

    $scope.postChequeSettlement = function () {
        settlementRequest.RequestDate = Date.now();
        settlementRequest.StaffId = $scope.claim.Employee_Id;
        settlementRequest.StaffName = $scope.claim.StaffName;
        settlementRequest.LoanNo = $scope.claim.Loan_No;
        settlementRequest.LoanDate = $scope.claim.Loan_Issue_Date;
        settlementRequest.LoanAmount = $scope.claim.Loan_Amount;
        settlementRequest.SettlementAmount = $scope.claim.OutrightAmountDue;
        settlementRequest.SettlementType = 'CHK';
        settlementRequest.ChequeNumber = $scope.cheque.chequeNumber;
        settlementRequest.ChequeBank = $scope.cheque.issuingBank;
        settlementRequest.ChequeSortCode = $scope.cheque.sortCode;
        settlementRequest.ChequeAmount = $scope.cheque.chequeAmount;
        settlementRequest.SettlementTLCode =$sessionStorage.logged_in.user;
        settlementRequest.ChequeIssuerName =$scope.cheque.issuerName;
        settlementRequest.Branch = $scope.cheque.branch;
        settlementRequest.ContactNumber = $scope.cheque.contactNumber;
        settlementRequest.MonthlyInstallments = $scope.claim.Monthly_Installment;


        apiFactory.postSettlementRequest(settlementRequest).then(function (response) {
            console.log(response.data)
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