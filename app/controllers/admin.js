'use strict';

angular.module('myApp.admin', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/admin', {
        templateUrl: 'transactions/admin.html',
        controller: 'dashboard_Ctrl',
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
  }]);


app.controller('admin_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$route,updateStatus_factory) {
 $rootScope.logged_in = $sessionStorage.logged_in;
 $scope.action = $sessionStorage.action;
    $scope.HeadOffice = true;
    $scope.allBranches = ['Accra','Bolga','Wa','Takoradi','Kumasi','Cape coast','Akatsi','Ho','Sunyani','Koforidua','Tamale'];
    $scope.allPayments = ['MTN Mobile Money','TIGO Cash','Vodafone Cash','Cheque', 'GhIPSS','GN Bank','GCB','Airtel Money'] ;
    $scope.chosenPayment=[];
    $scope.chosenBranch =[];

var callRoles = function () {
    updateStatus_factory.getRoles().then(function (response) {
        $scope.roles = response.data;
    })
};
callRoles();


    $scope.set_payment = function(selected){
        $scope.set_selected_payment = $scope.allPayments.indexOf(selected);
    };
    $scope.set_branch = function(selected){
        $scope.set_selected_branch = $scope.allBranches.indexOf(selected)
    };

    $scope.checkAllPayments = function () {
        console.log($scope.selectedAllPay)
        if ($scope.selectedAllPay){
            $scope.chosenPayment = $scope.allPayments
        }
        else{
            $scope.chosenPayment = [];
        }
        console.log($scope.chosenPayment)
    };


    $scope.checkAllBranches = function(){
        if($scope.selectedAllBranch){
            $scope.chosenBranch = $scope.allBranches
        }
        else{
            $scope.chosenBranch = [];
        }
        console.log($scope.chosenBranch)
    };


    $scope.selected_payment = function(){
        if ($scope.chosenPayment.indexOf($rootScope.allPayments[$scope.set_selected_payment]) === -1){
            $scope.chosenPayment.push($rootScope.allPayments[$scope.set_selected_payment])
        }
        else{
            $scope.chosenPayment.splice( $scope.selected_array.indexOf($rootScope.allPayments[$scope.set_selected_payment]), 1 );
        }
    };

    $scope.selected_branch = function(){
        //$scope.currentBranchIndex = null;
        if ($scope.chosenBranch.indexOf($rootScope.allBranches[$scope.set_selected_branch]) === -1){
            $scope.chosenBranch.push($rootScope.allBranches[$scope.set_selected_branch])
            //$scope.currentBranchIndex = $scope.selected_array.indexOf($rootScope.allBranches[$scope.set_selected_branch])
        }
        else{
            $scope.chosenBranch.splice( $scope.selected_array.indexOf($rootScope.allBranches[$scope.set_selected_branch]), 1 );
        }
    };

    $scope.addUser = function () {
        var user = {};
        if (!$scope.HeadOffice){
            $scope.branchString = $scope.chosenBranch.toString();
            $scope.paymentString = $scope.chosenPayment.toString();
        }
        else{
            $scope.branchString = 'Head Office';
            $scope.paymentString = 'all'
        }
        user.UserCode = $scope.username;
        user.UserRoleId = $scope.userRoleId;
        user.Name = $scope.fullName;
        user.Permission = true;
        user.Password = 'Default@123';
        user.PaymentMethod = $scope.paymentString;
        user.Branch = $scope.branchString;
        console.log(user);
        updateStatus_factory.addUser(user).then(function (response) {
            if (response.data){
                $sessionStorage.action = {
                    message: 'User Successfully Created',
                    //message: $scope.details[$scope.selected].ClientRefId + ' Successfully Approved',
                    success: true,
                    failure: false,
                    network: false
                };
                $route.reload();
            }
        },function(){

        })





    }



    }]);
