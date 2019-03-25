'use strict';

angular.module('myApp.tprsRejected', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/tprs_rejected', {
        templateUrl: 'transactions/tprs_rejected.html',
        controller: 'rejected_deals_Ctrl',
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
   }])
//rejected tprs
app.controller('rejected_deals_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$route,$filter,updateStatus_factory) {
        $rootScope.logged_in = $sessionStorage.logged_in;
        $rootScope.form_data = $sessionStorage.form_data;
        $rootScope.filtered = $sessionStorage.filtered;
        $rootScope.user_data  = $sessionStorage.user_data;

        $scope.action = $sessionStorage.action;
        $scope.sortType = 'StatusDate';
        $scope.sortReverse = false;
        $scope.found = true;  //for the spinner

        $scope.setSelected = function(selected){
            $scope.selected = $scope.details.indexOf(selected);
            $sessionStorage.claim = selected;
            $scope.claim = $sessionStorage.claim;
        };

        var  input = {status : 'tprs_rejected'};

        updateStatus_factory.getStatus(input).then(function(response) {
            // this callback will be called asynchronously
            // when the response is available

            if ($scope.filtered){
                $scope.details = $filter('views_filter_new')(response.data,$scope.form_data);
            }
            else{
                $scope.details = [];
            }
            $scope.found = false;
            if ($scope.details.length === 0){
                $scope.empty = true;
            }


        },function(){
            $sessionStorage.action = {
                message: 'Network Error',
                success: false,
                failure : false,
                network: true
            };
        });

        /*$scope.call_images = function(){
                       $scope.images = [];
                       $scope.picture= true;
                       $scope.selfie = 'Loading Selfie...';
                       $scope.passport = 'Loading Passport...';
             var input = {id: $scope.claim.Id};
             updateStatus_factory.getImages(input).then(function (response) {
                  // this callback will be called asynchronously
                  // when the response is available
                  $scope.images = response.data;
                  $scope.picture = false;
                   $scope.passport = 'No Passport Image';
                   $scope.selfie = 'No Selfie Image';
              });
         };*/


        $scope.get_images = function () {
            get_images(theImage)
        };

        var get_images = function (theImage) {

            var input;

            input = {id: $scope.claim.Id,type:theImage};


            updateStatus_factory.getImage(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                ////console.log(response.data);

                if (response.data === 'false' || response.data === null){



                    if (theImage === 'FormA'){
                        $scope.formA_alt = 'No '+theImage;
                        $scope.forma_spin =false;
                    }
                    else if(theImage === 'Appointment'){
                        $scope.appointment_alt = 'No '+theImage;
                        $scope.appointment_spin = false;
                    }
                    else if(theImage === 'Selfie'){
                        $scope.selfie_alt ='No '+theImage;
                        $scope.selfie_spin = false;
                    }
                    else if(theImage === 'Transfer'){
                        $scope.transfer_alt = 'No '+theImage;
                        $scope.transfer_spin = false;
                    }
                    else if(theImage === 'Passport'){

                        $scope.passport_alt = 'No '+theImage;
                        $scope.passport_spin = false;
                    }
                }
                else{

                    if (theImage === 'FormA'){
                        $scope.formA = response.data;
                        $scope.forma_spin =false;
                    }
                    else if(theImage === 'Appointment'){
                        $scope.appointment = response.data;
                        $scope.appointmemt_spin = false;
                    }
                    else if(theImage === 'Selfie'){

                        $scope.selfie = response.data;
                        $scope.selfie_spin = false;
                    }
                    else if(theImage === 'Transfer'){
                        $scope.transfer = response.data;
                        $scope.transfer_spin = false;
                    }
                    else if(theImage === 'Passport'){
                        $scope.passport = response.data;
                        $scope.passport_spin = false;
                    }
                }
            });
        };
//get dp passport image
        var get_passport = function (){
            var input = {id :$scope.claim.SelfieCode};
            updateStatus_factory.getuserImage(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
                ////console.log(response.data);
                if (response.data === null){
                    $scope.passport_spin = false;
                    $scope.passport_alt = 'No Passport Image Found';
                }
                else{
                    $scope.passport = response.data;
                    $scope.passport_spin = false;
                }

            })
        };

        $scope.get_passport = function () {
            $scope.passport = [];
            $scope.passport_alt = 'Loading Passport';
            $scope.passport_spin = true;
            get_passport();
        };

//call selfie
        $scope.call_selfie = function(){
            $scope.selfie = [];
            var theImage = 'Selfie';
            $scope.selfie_spin = true;
            $scope.selfie_alt = 'Loading '+theImage;
            get_images(theImage);
            //$scope.selfie_spin = false;
        };
//call passport
        $scope.call_passport = function(){
            var theImage = 'Passport';
            $scope.passport_spin = true;
            $scope.passport_alt = 'Loading '+theImage;
            get_images(theImage);
            //$scope.passport_spin = false;

        };

//recall
        var recall = function () {
            var input = {id:$scope.claim.Id,status: 'pending_tprs',username:$rootScope.logged_in.user};
            updateStatus_factory.updateStatus(input).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data === true){
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Sucessfully Recalled',
                        success: true,
                        failure : false,
                        network: false
                    };
                    $route.reload();

                }
                else{
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Recall Failed',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $route.reload();

                }

            },function(){
                $sessionStorage.action = {
                    message: 'Network Error',
                    success: false,
                    failure : false,
                    network: true
                };
            });

        };

        $scope.recall = function () {
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
                else if($scope.id_status === 'tprs_rejected'){
                    recall();
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

        $scope.close_alerts = function () {
            $sessionStorage.action={
                message: '',
                success: false,
                failure : false,
                network: false
            }
        }
    }]);