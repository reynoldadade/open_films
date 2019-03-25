'use strict';

angular.module('myApp.settings', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/settings', {
        templateUrl: 'transactions/settings.html',
        controller: 'settings_Ctrl',
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
//Settings
app.controller('settings_Ctrl',['$scope','$rootScope','$sessionStorage','$timeout','$location',function ($scope,$rootScope,$sessionStorage,$timeout,$location) {
    $rootScope.user_data = $sessionStorage.user_data;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.branches = $sessionStorage.branches;
    $rootScope.paymentMethod  = $sessionStorage.paymentMethod;
    $rootScope.access  = $sessionStorage.access;
    $scope.p_array = $sessionStorage.p_array;
    $scope.b_array = $sessionStorage.b_array;
    $scope.e_array = $sessionStorage.e_array;
    //$scope.t_array = $sessionStorage.t_array;

    //console.log($scope.p_array)
    $scope.chosenBranch = [];
    $scope.chosenPayment = [];
    $scope.chosenEmployer = [];
   // $scope.chosenTransaction = [];

    $scope.submit = function () {
        $scope.filtering = true;
        $scope.filtered= true;

        $scope.form_data = $scope.chosenBranch.concat($scope.chosenPayment);
        $scope.form_data = $scope.chosenEmployer.concat($scope.form_data);
        //$scope.form_data = $scope.chosenTransaction.concat($scope.form_data);
        //console.log($scope.form_data);
        $sessionStorage.form_data = $scope.form_data;
        $sessionStorage.filtered = $scope.filtered;
        $scope.set = true;
        $scope.filtering = false;

        $location.path('/landing');
    };

    $scope.set_payment = function(selected){
        $scope.set_selected_payment = $scope.p_array.indexOf(selected);
    };
    $scope.set_branch = function(selected){
        $scope.set_selected_branch = $scope.b_array.indexOf(selected)
    };
    $scope.set_employer = function(selected){
        $scope.set_selected_employer = $scope.e_array.indexOf(selected)
    };

   /* $scope.set_transaction = function(selected){
        $scope.set_selected_transaction = $scope.t_array.indexOf(selected)
        //console.log($scope.set_selected_transaction)
    };*/

    $scope.checkAllPayments = function () {
        //console.log($scope.selectedAllPay)
        //console.log($scope.p_array)
        if ($scope.selectedAllPay){
            //console.log('in here nigga');
            $scope.chosenPayment = $scope.chosenPayment.concat($scope.p_array);
            //console.log($scope.chosenPayment)
        }
        else{
            $scope.chosenPayment = [];
        }




    };
    $scope.checkAllEmployers = function () {
        if ($scope.selectedAllEmployer){
            $scope.chosenEmployer = $scope.chosenEmployer.concat($scope.e_array);
        }
        else{
            $scope.chosenEmployer= [];
        }




    };
    $scope.checkAllBranches = function(){
        if($scope.selectedAllBranch){
            $scope.chosenBranch = $scope.chosenBranch.concat($scope.b_array);
        }
        else{
            $scope.chosenBranch = [];
        }
    };


   /* $scope.checkAllTransactions = function(){
        if($scope.selectedAllTransaction){
            $scope.chosenTransaction = $scope.chosenTransaction.concat($scope.t_array);
        }
        else{
            $scope.chosenTransaction = [];
        }
    };*/


    $scope.selected_payment = function(){

        if ($scope.chosenPayment.indexOf($scope.p_array[$scope.set_selected_payment]) === -1){
            $scope.chosenPayment.push($scope.p_array[$scope.set_selected_payment])
            //console.log($scope.chosenPayment);
        }
        else{
            //console.log($scope.p_array[$scope.set_selected_payment])
            $scope.chosenPayment.splice($scope.chosenPayment.indexOf($scope.p_array[$scope.set_selected_payment]), 1 );
            //console.log($scope.chosenPayment);
        }
    };

    $scope.selected_branch = function(){
        //$scope.currentBranchIndex = null;
        if ($scope.chosenBranch.indexOf($scope.b_array[$scope.set_selected_branch]) === -1){
            $scope.chosenBranch.push($scope.b_array[$scope.set_selected_branch])
            //$scope.currentBranchIndex = $scope.selected_array.indexOf($scope.b_array[$scope.set_selected_branch])
        }
        else{
            $scope.chosenBranch.splice( $scope.chosenBranch.indexOf($scope.b_array[$scope.set_selected_branch]), 1 );
        }
    };

    $scope.selected_employer = function(){
        //$scope.currentBranchIndex = null;
        if ($scope.chosenEmployer.indexOf($scope.e_array[$scope.set_selected_employer]) === -1){
            $scope.chosenEmployer.push($scope.e_array[$scope.set_selected_employer])
            //$scope.currentBranchIndex = $scope.selected_array.indexOf($scope.e_array[$scope.set_selected_employer])
        }
        else{
            $scope.chosenEmployer.splice($scope.chosenEmployer.indexOf($scope.e_array[$scope.set_selected_employer]), 1 );
        }
    };

   /* $scope.selected_transaction = function(){
        //$scope.currentBranchIndex = null;
        if ($scope.chosenTransaction.indexOf($scope.t_array[$scope.set_selected_transaction]) === -1){
            $scope.chosenTransaction.push($scope.t_array[$scope.set_selected_transaction])
            //$scope.currentBranchIndex = $scope.selected_array.indexOf($scope.e_array[$scope.set_selected_employer])
        }
        else{
            $scope.chosenTransaction.splice($scope.chosenTransaction.indexOf($scope.t_array[$scope.set_selected_transaction]), 1 );
        }
    };*/
}
]);