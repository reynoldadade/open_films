'use strict';

angular.module('myApp.kyc', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/kyc',{
        templateUrl: 'transactions/kyc.html',
        controller:'kyc_Ctrl',
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

//kyc
app.controller('kyc_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$route','$filter','updateStatus_factory', function ($scope,$rootScope,$sessionStorage,$http,$timeout,$route,$filter,updateStatus_factory) {
             $rootScope.logged_in = $sessionStorage.logged_in;
            $rootScope.form_data = $sessionStorage.form_data;
            $rootScope.filtered = $sessionStorage.filtered;
             $scope.action = $sessionStorage.action;
             $scope.sortType = 'CreatedByDate';
             $rootScope.user_data  = $sessionStorage.user_data;

                $scope.sortReverse = false;
                $scope.found = true;  //for the spinner


    $scope.datas =[{ImageURL:'http://www.pbs.org/black-culture/lunchbox_plugins/s/photogallery/img/no-image-available.jpg'}];


        $scope.getClientImages = function () {

            var input = {staffId: $scope.claim.ClientRefId};
            updateStatus_factory.getClientImages(input).then(function (response) {
                if (response.data === []){
                    $scope.feedback = 'No Image found';
                    console.log($scope.feedback)
                }
                else{
                    $scope.datas = response.data;
                    $scope.feedback = 'Found '+$scope.datas.length + ' Images';
                    console.log($scope.datas)
                }
            },function () {

            })
        };

                $scope.setSelected = function(selected){
                     $scope.selected = $scope.details.indexOf(selected);
              //allow you to claim deal from tray
                    //
                $sessionStorage.claim = selected;
                $scope.claim = $sessionStorage.claim;
                };






               var updateView = function () {
                $scope.mainspin = true;
                   var input = {status: 'pending_kyc'};
                   updateStatus_factory.getStatus(input).then(function (response) {
                       //console.log(response.data);
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

                       $timeout(updateView,120000);
                   }, function () {
                    $scope.mainspin =false;
                       $scope.found = false;
                       $sessionStorage.action = {
                           message: 'Network Error',
                           success: false,
                           failure : false,
                           network: true
                        };
                   });
             
             };
                updateView();

  $scope.call_selfie = function(){
       $scope.selfie = [];
      var theImage = 'Selfie';
      $scope.selfie_spin = true;
      $scope.selfie_alt = 'Loading '+theImage;
    get_images(theImage);
      //$scope.selfie_spin = false;
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
   $scope.call_passport = function(){
        $scope.passport = [];
      var theImage = 'Passport';
   $scope.passport_spin = true;
   $scope.passport_alt = 'Loading '+theImage;
    get_images(theImage);
    //$scope.passport_spin = false;

  };


    $scope.call_idCard = function(){
        $scope.idCard = [];
        var theImage = 'idcard';
        $scope.idcard_spin = true;
        $scope.idcard_alt = 'Loading '+theImage;
        get_images(theImage);
    };


$scope.get_images = function () {

    get_images(theImage)
};

var get_images = function (theImage) {
  var input;
          input = {id:$scope.claim.Id,type:theImage};
          //input = {id: $scope.details[$scope.selected].Id,type:theImage};


  updateStatus_factory.getImage(input).then(function (response) {
           // this callback will be called asynchronously
           // when the response is available
            ////console.log(response.data);

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

                    $scope.passport_alt = 'No '+theImage;
                    $scope.passport_spin = false;
                }
                 else if(theImage === 'idcard'){
                     console.log(theImage);
                     $scope.idcard_alt = 'No '+theImage;
                     $scope.idcard_spin = false;
                 }
            }
            else{


                if (theImage === 'FormA'){

                    $scope.formA = response.data;
                    $scope.forma_spin =false;
                }
                else if(theImage === 'Appointment'){
                    $scope.appointment = response.data;
                    $scope.appointment_spin = false;
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
                else if(theImage === 'idcard'){
                   // console.log(theImage)
                    $scope.idcard= response.data;
                    $scope.idcard_spin = false;
                }
            }
       },function () {

      $scope.formA_alt = 'No '+theImage;
      $scope.forma_spin =false;
      $scope.appointment_alt = 'No '+theImage;
      $scope.appointment_spin = false;
      $scope.selfie_alt ='No '+theImage;
      $scope.selfie_spin = false;
      $scope.transfer_alt = 'No '+theImage;
      $scope.transfer_spin = false;
      $scope.passport_alt = 'No '+theImage;
      $scope.passport_spin = false;
      $scope.idcard_alt = 'No '+theImage;
      $scope.idcard_spin = false;

  });
};
   
//get dp passport image
 var get_passport = function (){
   var input = {id:$scope.claim.SelfieCode};
     //var input = {id :$scope.details[$scope.selected].SelfieCode};
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

var error_codes =   function () {
        var input = {Id: 0};

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

//to approve a kyc deal
    var approve = function () {
        var input = {};
        if ($scope.claim.EmployerTypeId !== 'controller') {
           input = {
               id: $scope.claim.Id,
               status: 'pending_epay',
               username: $rootScope.logged_in.user
           };
        }
        else {
            input = {
               id: $scope.claim.Id,
               status: 'pending_tprs',
               username: $rootScope.logged_in.user

           };
        }
        /* var input = {
            id: $scope.claim.Id,

            status: 'pending_tprs',
            username: $rootScope.logged_in.user
        };*/



         
            updateStatus_factory.updateStatus(input)
                .then(function (response) {
                // this callback will be called asynchronously
                // when the response is available

                if (response.data === true) {
                    $sessionStorage.action = {
                        message: $scope.claim.ClientRefId + ' Successfully Approved',
                        //message: $scope.details[$scope.selected].ClientRefId + ' Successfully Approved',
                        success: true,
                        failure: false,
                        network: false
                    };
                  $route.reload();
                }
                else {
                    $sessionStorage.action = {
                          message: $scope.claim.ClientRefId + '  Approval Failed',
                        //message: $scope.details[$scope.selected].ClientRefId + '  Approval Failed',
                        success: false,
                        failure: true,
                        network: false
                    };
                  $route.reload();
                }

            }, function () {
                $sessionStorage.action = {
                    message: '',
                    success: false,
                    failure: false,
                    network: true
                };

            })
        };

//to reject a kyc deal
var reject = function(){
                  var input = {id:$scope.claim.Id,status: 'kyc_rejected',username:$rootScope.logged_in.user};
                //var input = {id:$scope.details[$scope.selected].Id,status: 'kyc_rejected',username:$rootScope.logged_in.user};

              updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                     if (response.data === true){
                        $scope.rej = response.data;

                    }
                    else{
                          $sessionStorage.action = {
                            message: $scope.claim.ClientRefId+'  Rejection Failed',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
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
              var rej = {id:$scope.claim.Id,error_Code:$scope.selected_error,errorReason:$scope.reason};
                //var rej = {id:$scope.details[$scope.selected].Id,error_Code:$scope.selected_error,errorReason:$scope.reason};
                updateStatus_factory.setError(rej).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                     if (response.data === true){
                        $scope.rej2 = response.data;

                    }
                    else {
                        $sessionStorage.action = {
                          message: $scope.claim.ClientRefId+'  Rejection Failed',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
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
                           //message: $scope.details[$scope.selected].ClientRefId+'  Successfully Rejected',
                           success: true,
                           failure : false,
                           network: false
                        };
                   $route.reload();

                }else{
                     $sessionStorage.action = {
                       message: $scope.claim.ClientRefId+'  Rejection Failed',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
                           success: false,
                           failure : true,
                           network: false
                        };
                   $route.reload();
                }
            };

var autoReject = function(){
                var input = {id:$scope.claim.Id,status: 'kyc_rejected',username:$rootScope.logged_in.user};
                //var input = {id:$scope.details[$scope.selected].Id,status: 'kyc_rejected',username:$rootScope.logged_in.user};

              updateStatus_factory.updateStatus(input).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available

                     if (response.data === true){
                        $scope.rej = response.data;

                    }
                    else{
                          $sessionStorage.action = {
                             message: $scope.claim.ClientRefId+ ' Rejection Failed',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
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

              //add error_Code
              var rej = {id:$scope.claim.Id,error_Code:'4011',errorReason:'Client Failed KYC system Automatically rejected client'};
                //var rej = {id:$scope.details[$scope.selected].Id,error_Code:'4011',errorReason:'Client Failed KYC system Automatically rejected client'};
                updateStatus_factory.setError(rej).then(function(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                     if (response.data === true){
                        $scope.rej2 = response.data;

                    }
                    else {
                        $sessionStorage.action = {
                           message: $scope.claim.ClientRefId+'  Rejection Failed',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
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
                        message: $scope.claim.ClientRefId+'  Rejected by System, Client failed KYC',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejected by System, Client failed KYC',
                           success: true,
                           failure : false,
                           network: false
                        };
                   $route.reload();

                }else{
                     $sessionStorage.action = {
                           message: $scope.claim.ClientRefId+'  Rejection Failed',
                           //message: $scope.details[$scope.selected].ClientRefId+'  Rejection Failed',
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



//scope.approve()
$scope.approve = function(){
  var input = {
     id: $scope.claim.Id
 };
     /*var input = {
        id: $scope.details[$scope.selected].Id
    };*/
    updateStatus_factory.getLoan(input).then(function (response) {
        // this callback will be called asynchronously
        // when the response is available
       $scope.id_status = response.data.TransactionStatus;
        if ($scope.id_status === 'cancelled'){
        $sessionStorage.action = {
                       message: $scope.claim.ClientRefId+' has been cancelled by TL',
                       // message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',
                       success: false,
                       failure : true,
                       network: false
                    };
           $route.reload();
    }
    else if($scope.id_status === 'pending_kyc'){
            if ($scope.score >= 3){
                approve();
            }
            else{
                autoReject();
            }

                }
    else {
             $sessionStorage.action = {
                               message: $scope.claim.ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               //message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
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
    /*var input = {
        id: $scope.details[$scope.selected].Id
    };*/
            updateStatus_factory.getLoan(input).then(function (response) {
                // this callback will be called asynchronously
                // when the response is available
               $scope.id_status = response.data.TransactionStatus;
                    if ($scope.id_status === 'cancelled') {
                         $sessionStorage.action = {
                            message: $scope.claim.ClientRefId+' has been cancelled by TL',
                               /*message: $scope.details[$scope.selected].ClientRefId+' has been cancelled by TL',*/
                               success: false,
                               failure : true,
                               network: false
                            };
                   $route.reload();
    }
    else if($scope.id_status === 'pending_kyc'){
                        reject()
                    }
    else {
             $sessionStorage.action = {
                                message: $scope.claim.ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               //message: $scope.details[$scope.selected].ClientRefId+' has already been worked on, it is currently at '+$scope.id_status,
                               success: false,
                               failure : true,
                               network: false
                            };
                   $route.reload();
        }
    })
};


$scope.check_eligibility = function () {
    var input;
  /*  if ($scope.claim.ClientRefId.includes('CR')){
       input ={ StaffId: $scope.claim.ClientRefId.replace('CR','')};


    }else{
        input ={ StaffId: $scope.claim.ClientRefId + 'CR'};
        console.log(input)
    }*/

    input ={ StaffId: $scope.claim.ClientRefId };

    

    //var input ={ StaffId: $scope.details[$scope.selected].ClientRefId};

    updateStatus_factory.checkEligibility(input).then(function (response) {
                    // this callback will be called asynchronously
                    // when the response is available

                   $scope.message = response.data;
                   $scope.alert = $scope.message.Status === "NOT ELIGIBLE";
                   $scope.found = $scope.message.Status === "ELIGIBLE";
                   //$scope.search = false;
                })
};


var getQuestions =  function () {
   updateStatus_factory.getQuestions().then(function(response) {
    // this callback will be called asynchronously
    // when the response is available
            $scope.questions = response.data;
            var question = [];
            $scope.questions.forEach(function (element) {
                question.push(element.QuestionName)
            });
            $scope.questionsString = question.toString();

});
};
getQuestions();



var saveQuestions = function(){
    var input = {
        "StaffId": $scope.claim.ClientRefId,
        "StaffName": $scope.claim.ClientName,
        "Question": $scope.questionsString,
        "Answer": $scope.questionArrayString,
        "LoanId": $scope.claim.Id,
        "UserId": $rootScope.user_data.Id
    };
    updateStatus_factory.postKycQuestion().then(function (response) {

    },function () {

    })
};

$scope.select_question = function (item) {
    $scope.selected_question = $scope.questions.indexOf(item);
};

$scope.questionArray = [];
$scope.chooseQuestions = function(){

    if ($scope.questionArray.indexOf($scope.questions[$scope.selected_question]) === -1){
        $scope.questionArray.push($scope.questions[$scope.selected_question].QuestionName)
    }
    else{
        $scope.questionArray.splice( $scope.questionArray.indexOf($scope.questions[$scope.selected_question].QuestionName), 1 );
    }
    $scope.score = $scope.questionArray.length;
    $scope.questionArrayString = $scope.questionArray.toString();
};

$scope.postInstructions = function () {
    var input = {requestid: $scope.claim.Id ,instructions:$scope.instructions};
    postLoanInstructions(input);
    $scope.instructions = null;
};

/*****************************post loan instructions*/
 var postLoanInstructions = function (input) {
     $scope.showAlert = false;
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


    $scope.close_alerts = function () {
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        }
    };


}]);
