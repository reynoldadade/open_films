'use strict';
angular.module('myApp.paid', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider   .when('/paid_deals', {
        templateUrl: 'transactions/paid_deals.html',
        controller: 'paid_deals_Ctrl',
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

app.controller('paid_deals_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

        $rootScope.logged_in = $sessionStorage.logged_in;
        $rootScope.form_data = $sessionStorage.form_data;
        $scope.action = $sessionStorage.action;
        $scope.today = new Date();
        $scope.sortType = 'StatusDate';
        $scope.sortReverse = false;
        $scope.confirm = false;
        $rootScope.user_data  = $sessionStorage.user_data;

        $scope.setSelected = function(selected){
            $scope.selected = $scope.details.indexOf(selected);
            $sessionStorage.claim = selected;
            $scope.claim = $sessionStorage.claim;
        };
        $scope.submit = function(){
            $scope.details = [];
            $scope.found = true;  //for the spinner
            var start_day = new Date($scope.start_date).getDate();
            var start_month = new Date($scope.start_date).getMonth() + 1;
            var start_year = new Date($scope.start_date).getFullYear();
            var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
            var end_day = new Date($scope.end_date).getDate();
            var end_month = new Date($scope.end_date).getMonth() + 1;
            var end_year = new Date($scope.end_date).getFullYear();
            var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();


            $sessionStorage.input = {status: 'paid',datefrom: start_full_year,dateto: end_full_year};
            updateView()

        };


        var updateView = function () {
            var input = $sessionStorage.input;
            updateStatus_factory.getStatusByStatusDate(input).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available


                $scope.details = $filter('views_filter_new')(response.data,$scope.form_data);

                var sortDetails = $scope.details;
                sortDetails.sort(function (a,b) {
                    return a.ClientRefId - b.ClientRefId
                });
                $scope.sortDetails = sortDetails;
                //console.log($scope.sortDetails)

                //console.log($scope.details);
                //
                if ($scope.details.length === 0){
                    $scope.empty = true;
                }
                $scope.found = false;

                updateView();


            });
        };


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

                    $scope.formA = [];
                    $scope.appointment = [];
                    $scope.selfie = [];
                    $scope.transfer = [];
                    $scope.passport = [];

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
        $scope.close_alerts = function () {
            $sessionStorage.action={
                message: '',
                success: false,
                failure : false,
                network: false
            }
        };

        $scope.call_forma = function(){
            $scope.formA = [];
            var theImage = 'FormA';
            $scope.forma_spin = true;
            $scope.formA_alt = 'Loading '+theImage;
            get_images(theImage);
            //$scope.forma_spin =false;
        };
        $scope.call_appointment = function(){
            $scope.appointment = [];
            var theImage = 'Appointment';
            $scope.appointment_spin = true;
            $scope.appointment_alt = 'Loading '+theImage;
            get_images(theImage);
            //$scope.appointment_spin = false;
        };
        $scope.call_transfer = function(){
            $scope.transfer = [];
            var theImage = 'Transfer';
            $scope.transfer_spin = true;
            $scope.transfer_alt='Loading '+theImage;
            get_images(theImage);
            //$scope.transfer_spin = false;

        };
        $scope.call_idCard = function(){
            $scope.idCard = [];
            var theImage = 'idcard';
            $scope.idcard_spin = true;
            $scope.idcard_alt = 'Loading '+theImage;
            get_images(theImage);
        };



        



        var cancel =function () {
            var input = {id:$scope.claim.Id,status: 'cancelled',username:$rootScope.logged_in.user };
            updateStatus_factory.updateStatus(input).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data === true){
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Successfully Cancelled',
                        success: true,
                        failure : false,
                        network: false
                    };
                    $route.reload();
                }
                else{
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId+'  Cancellation Failed',
                        success: false,
                        failure : true,
                        network: false
                    };
                    $route.reload();
                }

            },function(){
                $sessionStorage.action = {
                    message: '',
                    success: false,
                    failure : false,
                    network: true
                };
            });

        };

        $scope.cancelLoan = function () {
            cancel();
        }


    }]);



/******************************************************************************************************************************************/