'use strict';

angular.module('myApp.pendingQC', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/tprs_pending', {
        templateUrl: 'transactions/pending_tprs.html',
        controller: 'pending_qc_Ctrl',
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

//pending qc
app.controller('pending_qc_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $scope.action = $sessionStorage.action;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.sortType = 'StatusDate';
    $scope.sortReverse = false;
    $scope.found = true;  //for the spinner
    $rootScope.user_data  = $sessionStorage.user_data;

    $scope.setSelected = function(selected){

        $scope.selected = $scope.details.indexOf(selected);
        //allow you to claim deal from tray
        //
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
    };
    var updateView = function () {
        $scope.mainspin = true;

        var input = {status: 'pending_tprs'};
        updateStatus_factory.getStatus(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            if ($scope.filtered){
                $scope.details = $filter('views_filter_new')(response.data,$scope.form_data);
            }
            else{
                $scope.details = [];
            }
            $scope.found = false;
            $scope.mainspin =false;
            if ($scope.details.length === 0){
                $scope.empty = true;
            }
            $timeout(updateView,120000)

        }, function () {
            $scope.mainspin =false;
            $sessionStorage.action = {
                message: '',
                success: false,
                failure : false,
                network: true
            };
        });
    };
    updateView();




    $scope.get_images = function () {
        get_images(theImage)
    };

    var get_images = function (theImage) {

        var input;

        input = {id: $scope.claim.Id,type:theImage};

        updateStatus_factory.getImage(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available
            // //console.log(response.data);
            console.log(response.data)
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
                    console.log(theImage)
                    $scope.passport_alt = 'No '+theImage;
                    $scope.passport_spin = false;
                }
                else if(theImage === 'authoritynote'){
                    console.log(theImage)
                    $scope.authority_alt = 'No '+theImage;
                    $scope.authority_spin = false;
                }
                else if(theImage === 'clientpicture'){
                    console.log(theImage)
                    $scope.picture_alt = 'No '+theImage;
                    $scope.picture_spin = false;
                }
                else if(theImage === 'idcard'){
                    console.log(theImage)
                    $scope.idcard_alt = 'No '+theImage;
                    $scope.idcard_spin = false;
                }
                else if(theImage === 'loanadvance'){
                    console.log(theImage)
                    $scope.loanAdvance_alt = 'No '+theImage;
                    $scope.loanAdvance_spin = false;
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
                else if(theImage === 'authoritynote'){
                    console.log(theImage)
                    $scope.authority = response.data;
                    $scope.authority_spin = false;
                }
                else if(theImage === 'clientpicture'){
                    //console.log(theImage)
                    $scope.picture = response.data;
                    $scope.picture_spin = false;
                }
                else if(theImage === 'idcard'){
                    //console.log(theImage)
                    $scope.idcard= response.data;
                    $scope.idcard_spin = false;
                }
                else if(theImage === 'loanadvance'){
                    //console.log(theImage)
                    $scope.loanAdvance = response.data;
                    $scope.loanAdvance_spin = false;
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


//call authorityNote
$scope.call_authority = function(){
    $scope.authority = [];
    var theImage = 'authoritynote';
    $scope.authority_spin = true;
    $scope.authority_alt = 'Loading '+theImage;
    get_images(theImage);
};

    //call client picture
    $scope.call_picture = function(){
        $scope.picture = [];
        var theImage = 'clientpicture';
        $scope.picture_spin = true;
        $scope.picture_alt = 'Loading '+theImage;
        get_images(theImage);
    };

    //call client picture
    $scope.call_idCard = function(){
        $scope.idCard = [];
        var theImage = 'idcard';
        $scope.idcard_spin = true;
        $scope.idcard_alt = 'Loading '+theImage;
        get_images(theImage);
    };
    $scope.call_loanAdvance = function(){
        $scope.loanAdvance = [];
        var theImage = 'loanadvance';
        $scope.loanAdvance_spin = true;
        $scope.loanAdvance_alt = 'Loading '+theImage;
        get_images(theImage);
    };



    //error_codes
    var error_codes =   function () {

        var input = {Id: 0};
        updateStatus_factory.getError(input).then(function (response) {
            // this callback will be called asynchronously
            // when the response is available

            $scope.error_codes = response.data;
        }, function () {
            $sessionStorage.action = {
                message: '',
                success: false,
                failure : false,
                network: true
            };
        });
    };
    error_codes();
//approve
    var approve=function () {
        var input = {id:$scope.claim.Id,status: 'pending_epay',username:$rootScope.logged_in.user };
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
                message: '',
                success: false,
                failure : false,
                network: true
            };
        });

    };
//reject
    var reject = function(){

        var input = {id:$scope.claim.Id,status: 'tprs_rejected',username:$rootScope.logged_in.user};
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
                message: '',
                success: false,
                failure : false,
                network: true
            };
        });

        //add error_code
        var rejected = {id:$scope.claim.Id,error_Code:$scope.selected_error,errorReason:$scope.reason};
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
                message: '',
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
    $scope.close_alerts = function () {
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        }
    };

    /**************************************************************/
    $scope.postInstructions = function () {
        var input = {requestid: $scope.claim.Id ,instructions:$scope.instructions}
        postLoanInstructions(input)
        $scope.instructions = null;
    };

    /*****************************post loan instructions*/
    var postLoanInstructions = function (input) {
        $scope.showAlert = false
        updateStatus_factory.postLoanInstructions(input).then(function (response) {
            if (response.data){
                $scope.alert = 'Further Instructions Posted';
                $scope.showAlert = true;
            }else{
                $scope.alert = 'Failed to post Instructions';
                $scope.showAlert = true;
            }
        },function () {
            $scope.alert = 'Failed to post Instructions to Server, Check Network';
            $scope.showAlert = true;
        })
    };


    $scope.clearAlert = function(){
        $scope.showAlert = false;
    };
    /**************************************************/





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
            else if($scope.id_status === 'pending_tprs'){
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
            else if($scope.id_status === 'pending_tprs'){
                reject();
            }
            else {
                $sessionStorage.action = {
                    message: $scope.claim.ClientRefId+' has already been worked on, it is currently at'+$scope.id_status,
                    success: false,
                    failure : true,
                    network: false
                };
               $route.reload();
            }
        })
    };


}]);
