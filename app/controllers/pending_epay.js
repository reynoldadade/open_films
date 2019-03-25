'use strict';

angular.module('myApp.pendingPayments', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/e-pay_pending', {
        templateUrl: 'transactions/pending_e-pay.html',
        controller: 'pending_payments_Ctrl',
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

   //controller

app.controller('pending_payments_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {
        $rootScope.logged_in = $sessionStorage.logged_in;
        $scope.action = $sessionStorage.action;
        $rootScope.form_data = $sessionStorage.form_data;
        $rootScope.filtered = $sessionStorage.filtered;

        $scope.sortType = 'StatusDate';
        $scope.sortReverse = false;
        $scope.found = true;  //for the spinner

        $scope.setSelected = function(selected){
            $scope.selected = $scope.details.indexOf(selected);
            $sessionStorage.claim = selected;
            $scope.claim = $sessionStorage.claim;
        };

        var updateView = function () {
            $scope.mainspin =true;
            var input = {status: 'pending_epay'};
            updateStatus_factory.getStatus(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                if ($scope.filtered){
                    $scope.details = $filter('views_filter_new')(response.data,$scope.form_data);
                }
                else{
                    $scope.details = [];
                }
                $scope.gcb_details = $filter('filter')($scope.details,{PaymentMethod: 'GCB'});
                $scope.tigo_details = $filter('filter')($scope.details,{PaymentMethod: 'Tigo Cash'});
                $scope.gn_details = $filter('filter')($scope.details,{PaymentMethod: 'GN Bank'});
                $scope.mtn_details = $filter('filter')($scope.details, { PaymentMethod: 'MTN Mobile Money' });
                $scope.vodafone_details = $filter('filter')($scope.details, { PaymentMethod: 'Vodafone Cash' });
                $scope.ghipss_details = $filter('filter')($scope.details, {PaymentMethod:'GhIPSS'});

                if ($scope.details.length === 0){
                    $scope.empty = true;
                }
                $scope.mainspin =false;
                $scope.found = false;

                //}
                $timeout(updateView,120000);
                //console.log($scope.details);

            });
        };
//run function
        updateView();


        var error_codes =   function () {

            var input = {Id: 1};
            updateStatus_factory.getError(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available

                $scope.error_codes = response.data;
            }, function () {
                $sessionStorage.action = {
                           message: 'Network Error',
                           success: false,
                           failure : false,
                           network: true
                        };
            });
        };
        error_codes();


        //reject function

        var reject = function(){
            var input = {id:$scope.claim.Id,status:'epay_rejected',username:$rootScope.logged_in.user};
            updateStatus_factory.updateStatus(input).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data === true){
                    $scope.rej = response.data;

                }
                else{
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Rejection Failed',
                        success: false,
                        failure : true,
                        network: false
                    };
                }
            },function(){
                $sessionStorage.action = {
                           message: 'Network Error',
                           success: false,
                           failure : false,
                           network: true
                        };
            });

            //add error_code
            var rejected = {id:$scope.claim.Id,error_code:$scope.selected_error,errorReason:$scope.reason};
            updateStatus_factory.setError(rejected).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available
                if (response.data === true){
                    $scope.rej2 = response.data;

                }
                else {
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Rejection Failed',
                        success: false,
                        failure : true,
                        network: false
                    };
                }
            },function(){
                $sessionStorage.action = {
                           message: 'Network Error',
                           success: false,
                           failure : false,
                           network: true
                        };
            });

            if ($scope.rej === $scope.rej2){
                $sessionStorage.action = {
                    message: $scope.claim.ClientRefId+'  Successfully Rejected',
                    success: true,
                    failure : false,
                    network: false
                };
               $route.reload();

            }else{
                $sessionStorage.action = {
                    message: $scope.claim.ClientRefId+'  Rejection Failed',
                    success: false,
                    failure : true,
                    network: false
                };
               $route.reload();

            }

        };

        //approve
        var approve = function () {
            var input ={};
            if ($scope.claim.PaymentMethod === 'TIGO Cash' || $scope.claim.PaymentMethod === 'GN Bank'){
                 input = {id:$scope.claim.Id,status: 'epay_confirmation',username:$rootScope.logged_in.user };
            }
            else{
                 input = {id:$scope.claim.Id,status: 'paid',username:$rootScope.logged_in.user };
            }

            updateStatus_factory.updateStatus(input).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data === true){
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Successfully Approved',
                        success: true,
                        failure : false,
                        network: false
                    };
                   $route.reload();

                }
                else{
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Approval Failed',
                        success: false,
                        failure : true,
                        network: false
                    };
                   $route.reload();
                }


            },function(){
                $sessionStorage.action = {
                    message: $scope.claim.ClientRefId+'  Recall Failed',
                    success: false,
                    failure : false,
                    network: true
                };
            });

        };

        $scope.close_alerts = function () {
            $sessionStorage.action={
                message: '',
                success: false,
                failure : false,
                network: false
            }
        };





        $scope.approve = function(){

            var input = {
                id: $scope.claim.Id
            };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled'){
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+' has been cancelled by TL',
                        success: false,
                        failure : true,
                        network: false
                    };
                   $route.reload();
                }
                else if($scope.id_status === 'pending_epay'){
                    approve();
                }
                else {
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                        success: false,
                        failure : true,
                        network: false
                    };
                   $route.reload();
                }
            });
        };


//$scope.reject()
        $scope.reject = function () {
            var input = {
                id: $scope.claim.Id
            };
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.id_status = response.data.TransactionStatus;
                if ($scope.id_status === 'cancelled') {
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+' has been cancelled by TL',
                        success: false,
                        failure : true,
                        network: false
                    };
                   $route.reload();
                }
                else if($scope.id_status === 'pending_epay'){
                    reject();
                }
                else {
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                        success: false,
                        failure : true,
                        network: false
                    };
                   $route.reload();
                }
            })
        };
    }]);