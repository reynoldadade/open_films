'use strict';

var app = angular.module('myApp.postRefund', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/postRefund', {
        templateUrl: 'refunds/postRefund.html',
        controller: 'postRefundCtrl',
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
app.controller('postRefundCtrl', ['$scope','$sessionStorage','updateStatus_factory','$route','$rootScope','$timeout',function($scope,$sessionStorage,updateStatus_factory,$route,$rootScope,$timeout) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.user_data = $sessionStorage.user_data;
    $scope.info ={};
    $scope.claim = {};


var refundData = {
    "Id": 0,
    "LoanRefId": "",
    "ClientRefId": "",
    "ClientName": "",
    "LoanType": "",
    "TransactionType": "",
    "Branch": "",
    "PaymentMethod": "",
    "AccountNumber": "",
    "MobileNumber": "",
    "ContactNumber": "",
    "TLCode": "",
    "EmployerName": "",
    "GrossAmount": "",
    "NetAmount": "",
    "TransactionStatus": "",
    "IsReplaced": true,
    "ErrorCode": "",
    "ErrorReason": "",
    "StatusByUser": "",
    "StatusDate": "2018-06-30T12:01:45.721Z",
    "SelfieFileName": "",
    "VoterFileName": "",
    "PassportPictureFileName": "",
    "LoanAdvanceFormFileName": "",
    "SelfieCode": "",
    "FormAFileName": "",
    "AppointmentLetterFileName": "",
    "TransferFileName": "",
    "NavLoanId": "",
    "Commission": 0,
    "CreatedByUser": "",
    "CreatedByDate": "2018-06-30T12:01:45.721Z",
    "MandateNumber": "",
    "MandateNumber2": "",
    "LoanAdvanceNumber": "",
    "AuthorityNoteNumber": "",
    "IDCardNumber": "",
    "EmployerTypeId": "",
    "Affordability": 0,
    "Overider": 0,
    "Instructions": "",
    "TinNumber": "",
    "Comments": "",
    "UserBranch": "",
    "paymentBranchAlt": "",
    "paymentMethodAlt": "",
    "bankAccountNumber": "",
    "paymentmobileNumber": "",
    "refundmessage": ""
};

    $scope.branches = ['Accra','Bolga','Wa','Takoradi','Kumasi','Cape coast','Akatsi','Ho','Sunyani','Koforidua','Tamale'];
    $scope.payments = ['MTN Mobile Money','TIGO Cash','Vodafone Cash','Cheque', 'GhIPSS','GN Bank','GCB','Airtel Money'] ;


var postRefund = function () {
    refundData.ClientRefId = $scope.refundData.EmployeeId;
    refundData.ClientName = $scope.claim.StaffId;
    refundData.Branch = $scope.refundData.branch;
    refundData.PaymentMethod = $scope.refundData.paymentMethod;
    refundData.TransactionType = 'Refund';
    refundData.MobileNumber = $scope.refundData.mobileNumber;
    refundData.ContactNumber = $scope.refundData.contactNumber;
    refundData.paymentmobileNumber = $scope.refundData.paymentNumber;
    refundData.CreatedByUser  = $scope.user_data.Id;
    refundData.GrossAmount = $scope.claim.Amount;
    refundData.NetAmount = $scope.claim.Amount;
    refundData.UserBranch = $scope.refundData.branch;
    refundData.TLCode = $scope.user_data.Name;
    updateStatus_factory.postRefundData(refundData).then(function (response) {
        console.log(response)
        if(response.data.Status === "true"){
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
        $scope.info.title = 'Network Error'
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