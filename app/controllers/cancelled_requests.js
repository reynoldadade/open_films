//cancelled requests
'use strict';

angular.module('myApp.cancelledRequests', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
   $routeProvider.when('/cancelled_requests', {
    templateUrl: 'transactions/cancelled_requests.html',
    controller: 'cancelled_requests_Ctrl',
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

app.controller('cancelled_requests_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

      $rootScope.logged_in = $sessionStorage.logged_in;
      $rootScope.form_data = $sessionStorage.form_data;
      $rootScope.filtered = $sessionStorage.filtered;

      $scope.sortType = 'StatusDate';
      $scope.sortReverse = false;


    $scope.setSelected = function(selected){
     $scope.selected = $scope.details.indexOf(selected);
  };
        var updateView = function (input) {



                updateStatus_factory.getStatusByDate(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                            if ($scope.filtered){
                                $scope.details = $filter('views_filter_new')(response.data,$scope.form_data);
                            }
                            else{
                                $scope.details = [];
                            }
                             if ($scope.details.length === 0){
                                $scope.empty = true;
                            }
                            $scope.found = false;

                    $timeout(updateView,120000)
                });
};


        $scope.submit = function () {
             var start_day = new Date($scope.start_date).getDate();
                var start_month = new Date($scope.start_date).getMonth() + 1;
                var start_year = new Date($scope.start_date).getFullYear();
                var start_full_year = start_month.toString()+'-'+start_day.toString()+'-'+start_year.toString();
                var end_day = new Date($scope.end_date).getDate() + 1;
                var end_month = new Date($scope.end_date).getMonth() + 1;
                var end_year = new Date($scope.end_date).getFullYear();
                var end_full_year = end_month.toString()+'-'+end_day.toString()+'-'+end_year.toString();
                $scope.found = true;  //for the spinner
                var input = {status: 'cancelled',datefrom: start_full_year,dateto: end_full_year};
                updateView(input);

        };


$scope.get_images = function () {
    get_images(theImage)
};

var get_images = function (theImage) {
  var input;

          input = {id: $scope.details[$scope.selected].Id,type:theImage};
                $scope.formA = [];
                $scope.appointment = [];
                $scope.selfie = [];
                $scope.transfer = [];
                $scope.passport = [];

  updateStatus_factory.getImage(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
            //console.log(response.data);

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
     var input = {id :$scope.details[$scope.selected].SelfieCode};
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
    $scope.passport =  [];
    $scope.passport_alt = 'Loading Passport';
    $scope.passport_spin = true;
    get_passport();
};


//call selfie
$scope.call_selfie = function(){
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
            }

}]);