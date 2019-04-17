'use strict';

angular.module('myApp.login', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider  .when('/login', {
        templateUrl: 'transactions/login.html',
        controller: 'login_Ctrl'
      })
   }]);

app.controller('login_Ctrl',['$rootScope','$sessionStorage','$scope','$http','$location','updateStatus_factory',function ($rootScope,$sessionStorage,$scope,$http,$location,updateStatus_factory) {

    updateStatus_factory.getIp({id: 2}).then(function (response) {
        sessionStorage.setItem('ip',response.data.toString());

    });

    $scope.login= function () {
        $scope.signIn = true;
        var input = {
            "username": $scope.username,
            "password": $scope.password
        };
        //console.log($scope.username,$scope.password);
        updateStatus_factory.login(input).then(function(response) {

            $scope.user_data = response.data;
            $sessionStorage.user_data = $scope.user_data;


            if ($scope.user_data === null){
                $scope.error = true;
                $scope.message = 'incorrect username/password';
                $scope.signIn = false;
            }
            else if($scope.user_data.Permission === 'True') {
                $sessionStorage.lastLogin = $scope.user_data['LastLogin'];
                $sessionStorage.user = $scope.user_data.Name;
                $sessionStorage.user_id = $scope.user_data.Id;
                $sessionStorage.branch = $scope.user_data.Branch;
                $sessionStorage.payment = $scope.user_data.PaymentMethod;
                //$sessionStorage.role = $scope.user_data.Role;
                $sessionStorage.allow = true;
                $sessionStorage.showMenu = true;




                $scope.allBranches = ['Head Office','Accra','Bolga','Wa','Takoradi','Kumasi','Cape coast','Akatsi','Ho','Sunyani','Koforidua','Tamale'];
                $scope.allPayments = ['MTN Mobile Money','TIGO Cash','Vodafone Cash', 'GhIPSS','GN Bank','GCB','Airtel Money'] ;
                $scope.allEmployers = ['controller','korlebu','police'];
                $scope.allTransactions = ['Loan','Refund'];





                var branch_array = [];
                var payment_array = [];
                var employer_array = [];
                var transaction_array = [];
                var i,j;
                if ($scope.user_data.Branch === 'Head Office'){


                    $sessionStorage.all = true;
                    branch_array = $scope.allBranches;
                    payment_array = $scope.allPayments;
                    employer_array = $scope.allEmployers;
                    transaction_array = $scope.allTransactions;
                }
                else if($scope.user_data.Branch.includes(',') && $scope.user_data.PaymentMethod.includes(',')) {
                    branch_array= $scope.user_data.Branch.split(",");
                    payment_array = $scope.user_data.PaymentMethod.split(",");
                    employer_array = $scope.allEmployers;
                    transaction_array = $scope.allTransactions;



                }
                else if($scope.user_data.Branch.includes(',') && !($scope.user_data.PaymentMethod.includes(','))){
                    branch_array= $scope.user_data.Branch.split(",");
                    payment_array.push($scope.user_data.PaymentMethod);
                    employer_array = $scope.allEmployers;
                    transaction_array = $scope.allTransactions;



                }
                else if($scope.user_data.PaymentMethod.includes(',') && !(scope.user_data.Branch.includes(','))){
                    payment_array = $scope.user_data.PaymentMethod.split(",");
                    branch_array.push($scope.user_data.Branch);
                    employer_array = $scope.allEmployers;
                    transaction_array = $scope.allTransactions;

                }
                else {

                    branch_array.push($scope.user_data.Branch);
                    payment_array.push($scope.user_data.PaymentMethod);
                    employer_array = $scope.allEmployers;
                    transaction_array = $scope.allTransactions;

                }




                $sessionStorage.logged_in = {
                    'showMenu': $sessionStorage.showMenu,
                    'LastLogin': $sessionStorage.lastLogin,
                    'user': $sessionStorage.user,
                    'user_id': $sessionStorage.user_id,
                    'allow': $sessionStorage.allow,
                    'role': $sessionStorage.role,
                    'all':$sessionStorage.all,
                    'branch':$sessionStorage.branch,
                    'paymentMethod': $sessionStorage.payment,
                    'ds' : $sessionStorage.ds
                };


               $sessionStorage.access = payment_array.concat(branch_array);
                $sessionStorage.b_array = branch_array;
                $sessionStorage.p_array = payment_array;
                $sessionStorage.e_array = employer_array;
                $sessionStorage.t_array = transaction_array;
                //$sessionStorage.branches = branches;
                //$sessionStorage.paymentMethod = paymentMethod;
                /* console.log(branch_array);
                console.log(payment_array);
        */

                $location.path('/settings');
            }

            else{
                $scope.error = true;
                $scope.message = 'Your account is locked';
                $scope.signIn= false;
            }



        },function () {
            $scope.error = true;
            $scope.message = 'Unable to establish connection';
            $scope.signIn = false;
        })


    };

}]);
