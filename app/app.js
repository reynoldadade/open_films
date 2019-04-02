'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngStorage',
  'ngRoute',
  'ngJsonExportExcel',
  'myApp.admin',
  'myApp.cancelledRequests',
  'myApp.kyc',
  'myApp.kycRejected',
  'myApp.dashboard',
  'myApp.landing',
  'myApp.login',
  'myApp.paid',
  'myApp.pendingPayments',
  'myApp.pendingLoanIssues',
  'myApp.resolvedLoanIssues',
  'myApp.pendingQC',
  'myApp.rejectedPayments',
  'myApp.settings',
  'myApp.statistics',
  'myApp.testMe',
  'myApp.tprsRejected',
  'myApp.checkActiveLoans',
  'myApp.pendingEligibility',
  'myApp.approvedEligibility',
  'myApp.rejectedEligibility',
  'myApp.auditTrail',
  'myApp.selfieAudit',
  'myApp.tprsDeletions',
  'myApp.tlDisbursements',
  'myApp.momo',
  'myApp.bank',
  'myApp.cheque',
  'myApp.pendingClearing',
  'myApp.pendingClientAuthorisation',
  'myApp.settleLoan',
  'myApp.pendingRefunds',
  'myApp.epayRefunds',
  'myApp.paidRefunds',
  'myApp.rejectedRefunds',
  'myApp.postRefund',
  'myApp.branchDisbursements',
  'myApp.logout',
  'chart.js',
  'myApp.epayConfirmation',
  'myApp.deletedLoans',
  'myApp.settlementReceipt',
  'myApp.getReplacements',
  'myApp.autoPost',
  'myApp.eligibilityCheck',
  'myApp.refundsEpay',
  'myApp.refundsKYC',
  'myApp.refundsRequest',
  'myApp.refundsTPRS',
  'myApp.manualWriteOff',
  'ngPrint'
]);

app.config(['$locationProvider', '$routeProvider','$httpProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


   $routeProvider.when('/',{
        templateUrl: 'transactions/login.html',
        controller: 'login_Ctrl'
  })
   

  $routeProvider.otherwise({redirectTo: '/login'});
}]);




//app filters
app.filter('views_filter', function () {
    return function (inputs, checkbox_data) {
        var out = [];
        var out2 = [];
        //do filter here
        angular.forEach(inputs, function(input){
           if(input.PaymentMethod === checkbox_data.mtn || input.PaymentMethod === checkbox_data.tigo || input.PaymentMethod === checkbox_data.vodafone
           || input.PaymentMethod === checkbox_data.gn || input.PaymentMethod === checkbox_data.cheque || input.PaymentMethod=== checkbox_data.gcb || input.PaymentMethod===checkbox_data.ghipss){
               out.push(input)
           }

        });

       /* angular.forEach(out, function (input) {
            if(input.Branch === checkbox_data.ho || input.Branch === checkbox_data.akatsi || input.Branch === checkbox_data.wa || input.Branch === checkbox_data.accra
            || input.Branch === checkbox_data.kumasi || input.Branch === checkbox_data.koforidua || input.Branch === checkbox_data.sunyani || input.Branch === checkbox_data.bolgatanga
            || input.Branch === checkbox_data.takoradi || input.Branch === checkbox_data.capecoast){
                out2.push(input)
            }
        });
    return out2;*/
       return out;
    };

});


app.directive('carousel', function($timeout) {
    return {
        restrict: 'E',
        scope: {
          datas: '='
        },
        templateUrl: 'directives/carousel.html',
        link: function(scope, element) {
            $timeout(function() {
                $('.carousel-indicators li',element).first().addClass('active');
                $('.carousel-inner .item',element).first().addClass('active');
            });
        }
    }
});


app.directive('tableDirective', function() {
    return {
        restrict: 'E',
        scope: {
            details: '=',
            claim: '=',
            info: '=',
            setSelected : '=',
            authorise: '=',
            formStuff:'=',
            submit:'='

        },
        templateUrl: 'directives/table.html',
        link: function(scope, element) {

        }
    }
});

app.directive('alertDirective', function() {
    return {
        restrict: 'E',
        scope: {
            action: '=',
            closeAlerts: '='
        },
        templateUrl: 'directives/alerts.html',
        link: function(scope, element) {

        }
    }
});

app.directive('report20Directive', function() {
    return {
        restrict: 'E',
        scope: {
            action: '=',
            closeAlerts: '='
        },
        templateUrl: 'directives/refunds/report20.html',
        link: function(scope, element) {

        }
    }
});


app.directive('navDataDirective', function() {
    return {
        restrict: 'E',
        scope: {
            action: '=',
            closeAlerts: '='
        },
        templateUrl: 'directives/refunds/navData.html',
        link: function(scope, element) {

        }
    }
});

app.directive('financeReportDirective', function() {
    return {
        restrict: 'E',
        scope: {
            action: '=',
            closeAlerts: '='
        },
        templateUrl: 'directives/refunds/financeReport.html',
        link: function(scope, element) {

        }
    }
});

app.directive('refundTableDirective', function() {
    return {
        restrict: 'E',
        scope: {
            claim: '=',
            info: '=',
            setSelected : '=',
            details : '=',
            submit: '=',
            format: '=',
            authorise: '=',
            reject:'='

        },
        templateUrl: 'directives/refunds/tables.html',
        link: function(scope, element) {

        }
    }
});

app.directive('twoCards', function() {
    return {
        restrict: 'E',
        scope: {
            claim: '='

        },
        templateUrl: 'directives/twoCards.html',
        link: function(scope, element) {

        }
    }
});

app.directive('refundsTable', function() {
    return {
        restrict: 'E',
        scope: {
            claim: '=',
            info: '=',
            setSelected : '=',
            details : '=',
            submit: '=',
            format: '=',
            authorise: '=',
            reject:'='


        },
        templateUrl: 'directives/refundsTable.html',
        link: function(scope, element) {

        }
    }
});


app.filter('role_filter',function(){
    return function(inputs){
        var output;
        if (inputs ===1){
            return output= 'FIL'
        }
        else if(inputs ===2){
            return output = 'TL'
        }
        else if(inputs ===3){
            return output = 'DP'
        }
        else if(inputs ===4){
            return output = 'OA'
        }
        else if(inputs ===5){
            return output ='ADMIN'
        }
        else if(inputs ===6){
            return output = 'LO'
        }
         else if(inputs ===7){
            return output = 'SM'
        }
         else if(inputs ===8){
            return output = 'FIL-HEAD'
        }
         else if(inputs === 9){
             return output = 'REFUND'
        }
        return output;
    }
});
app.filter('status_filter',function () {
    return function (inputs) {

        if (inputs === 'pending_kyc'){
            return 'Pending KYC'
        }
        else  if (inputs === 'pending_tprs'){
            return 'Pending TPRS'
        }
        else  if (inputs === 'pending_epay'){
            return 'E-Pay Validation'
        }
         else  if (inputs === 'kyc_rejected'){
            return 'Rejected At KYC'
        }
         else  if (inputs === 'epay_rejected'){
            return 'Rejected At E-Pay'
        }
         else  if (inputs === 'tprs_rejected'){
            return 'Rejected At TPRS'
        }
         else  if (inputs === 'paid'){
            return 'Paid'
        }
         else  if (inputs === 'cancelled'){
            return 'Cancelled By TL'
        }
         else if (inputs === 'pending_issues'){
             return  'Pending Issues'
        }
         else if (input === 'resolved'){
             return  'Issue Resolved'
        }
    }
});
app.filter('views_filter_new', function(){
    return function (inputs,checkbox_data) {
        var out = [];
        var out2 = [];
        var out3 = [];
        var out4 = [];
        angular.forEach(inputs,function (input) {
            for (var i=0; i<checkbox_data.length;i++){
                if(input.PaymentMethod === checkbox_data[i]){
                    out.push(input)
                }
            }
        });

        angular.forEach(out,function (input) {
            for (var j=0; j<checkbox_data.length;j++){
                if(input.Branch === checkbox_data[j]){
                    out2.push(input)
                }
            }

        });

        angular.forEach(out2,function (input) {
            for (var j=0; j<checkbox_data.length;j++){
                if(input.EmployerTypeId === checkbox_data[j]){
                    out3.push(input)
                }
            }

        });


       /* angular.forEach(out3,function (input) {
            for (var j=0; j<checkbox_data.length;j++){
                if(input.TransactionType === checkbox_data[j]){
                    out4.push(input)
                }
            }

        });*/
       return out3;
    }
});



app.filter('reports_filter', function(){
    return function (inputs,checkbox_data) {
        var out = [];
        var out2 = [];
        var out3 = [];
        var out4 = [];
        angular.forEach(inputs,function (input) {
            for (var i=0; i<checkbox_data.length;i++){
                if(input.PaymentMethod === checkbox_data[i]){
                    out.push(input)
                }
            }
        });

        angular.forEach(out,function (input) {
            for (var j=0; j<checkbox_data.length;j++){
                if(input.UserBranch === checkbox_data[j]){
                    out2.push(input)
                }
            }

        });

        angular.forEach(out2,function (input) {
            for (var j=0; j<checkbox_data.length;j++){
                if(input.EmployerTypeId === checkbox_data[j]){
                    out3.push(input)
                }
            }

        });


       /* angular.forEach(out3,function (input) {
            for (var j=0; j<checkbox_data.length;j++){
                if(input.TransactionType === checkbox_data[j]){
                    out4.push(input)
                }
            }

        });*/
        return out3;
    }
});

app.filter('cheque_filter', function(){
    return function (inputs) {
        var out = [];
        angular.forEach(inputs,function (input) {
                if(input.SettlementType !== 'MM' ){
                    out.push(input)
                }
        });
        return out;
    }
});

app.filter('momo_filter', function(){
    return function (inputs) {
        var out = [];
        angular.forEach(inputs,function (input) {
            if(input.SettlementType === 'MM' ){
                out.push(input)
            }
        });
        return out;
    }
});






app.filter('greetings', function () {
    return function (inputs) {


     if (inputs < 12){
         return "Good Morning"
     }
     else if (inputs >=12 && inputs < 17){
         return "Good Afternoon"
     }
     else{
         return "Good Evening"
     }

    }
});

app.filter('afford_filter', function () {
    return function (inputs) {


       if (inputs === 'rejected'){
           return 'Client is Not Eligible'
       }
       else if(inputs === 'approved'){
           return 'Client is Eligible'
       }

    }
});

app.filter('employer_filter', function () {
    return function (inputs) {


        if (inputs === 'police'){
            return 'Ghana Police Service'
        }
        else if(inputs === 'korlebu'){
            return 'Korle Bu'
        }
        else if(inputs === 'controller'){
            return 'CAGD'
        }

    }
});


var ip = 'http://'+ sessionStorage.getItem('ip') ;
console.log(ip, 'this is ip')
// var ip = 'http://10.0.6.246:6767'
var test_ip = 'http://52.91.63.84';

//factories and services
app.factory('updateStatus_factory',['$http',function ($http){


   //var ip = sessionStorage.getItem('ip') ;
   // var ip = 'http://10.0.6.246:6767'
  // var test_ip = 'http://52.91.63.84';
   var updateStatus_factory = {};

updateStatus_factory.getReceipt = function (input) {
    return $http({
        method: 'GET',//or POST
        url: ip+'/FilmsWeb/api/web/GetReceipt',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}



updateStatus_factory.updateStatus = function(input) {
return $http({
method: 'POST',//or POST
url: ip+'/FilmsWeb/api/web/updatestatus',
params: input,
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
});
};

updateStatus_factory.getStatus = function(input) {
return $http({
method: 'POST',//or POST
url: ip+'/FilmsWeb/api/web/getstatus',
params: input,
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
}
});
};

updateStatus_factory.getStatusByDate = function(input) {
return $http({
method: 'POST',//or POST
url: ip+'/FilmsWeb/api/web/getstatusbydate',
params: input,
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json'
}
});
};

updateStatus_factory.getStatusByStatusDate = function(input) {
return $http({
method: 'POST',//or POST
url: ip+'/FilmsWeb/api/web/getstatusbystatusdate',
params: input,
headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
}
});
};

updateStatus_factory.getStatusDateUser = function(input) {
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/getstatusdateuser',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

updateStatus_factory.getStatusDateTlCode = function(input) {
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/getstatusdatetlcode',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
};

updateStatus_factory.getImages = function (input) {
 return  $http({
    method: 'POST',//or POST
    url: ip+'/FilmsWeb/api/web/getimages',
    params: input,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
};

updateStatus_factory.getError = function (){
 return  $http({
    method: 'POST',//or POST
    url: ip+'/FilmsWeb/api/web/geterrors',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
};

updateStatus_factory.setError = function (rejected) {
 return $http({
             method: 'POST',//or POST
            url: ip+'/FilmsWeb/api/web/seterrorcode',
            params: rejected,
            headers: {'Content-Type': 'application/json',
                       'Accept': 'application/json'
            }
        })
};

updateStatus_factory.getLoan = function(input){
 return $http({
        method: 'GET',//or POST
        url: ip+'/FilmsWeb/api/web/getloanrequest',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getImage = function (input) {
 return $http({
     method: 'GET',//or POST
     url: ip+'/FilmsWeb/api/web/getspecificimage',
     params: input,
     headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
 })
};

    updateStatus_factory.navRequest = function (input) {
        return $http({
            method: 'POST',//or POST
            url: ip+'/FilmsWeb/api/payment/navrequest',
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };



updateStatus_factory.getuserImage = function (input) {
 return $http({
     method: 'GET',//or POST
     url: ip+'/FilmsWeb/api/web/getuserimage',
     params: input,
     headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
 })
};

updateStatus_factory.getUsers = function(){
 return $http({
method: 'GET',//or POST
url: ip+'/FilmsWeb/api/web/getusers',
headers: {
   'Content-Type': 'application/json',
   'Accept': 'application/json'
}
})
};

updateStatus_factory.getUser = function(input){
return $http({
    method: 'GET',//or POST
    url: ip+'/FilmsWeb/api/web/getuser',
    params: input,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
};

updateStatus_factory.getQuestions = function(){
   return  $http({
                 method: 'GET',//or POST
                url: ip+'/FilmsWeb/api/web/getquestions',
                headers: {'Content-Type': 'application/json',
                           'Accept': 'application/json'
                }
            })
};

updateStatus_factory.postIssues = function (input){
   return  $http({
        method: 'POST',// or POST
        url: ip+'/FilmsWeb/api/mobile/reportloanissue',
        params: input,
        headers: {'Content-Type': 'application/json',
                    'Accept': 'application/json'
        }
   })
};

updateStatus_factory.getIssues = function (input){
    return  $http({
        method: 'GET',// or POST
        url: ip+'/FilmsWeb/api/web/getloanissuesbydate',
        params: input,
        headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.checkEligibility = function (input) {
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/qccreditcheck',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.updateIssues = function(input){
   return $http({
       method: 'POST',// or GET
       url:ip+'/FilmsWeb/api/web/updateloanissuestatus',
       params: input,
       headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
       }
   })
};

updateStatus_factory.getRoles = function(){
        return $http({
            method: 'POST',//or POST
            url: ip+'/FilmsWeb/api/web/getroles',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    updateStatus_factory.getReplacement = function(input){
        return $http({
            method: 'GET',//or POST
            url: ip+'/FilmsWeb/api/report/getreplacementrequests',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

updateStatus_factory.updatePaymentMethod = function(input){
return $http({
    method: 'POST',//or POST
    url: ip+'/FilmsWeb/api/web/updatepaymentmethod',
    params: input,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
};

updateStatus_factory.login = function(input){
return $http({
    method: 'POST',
    url: ip+'/FilmsWeb/api/web/loginuser',
    params: input,
    headers: {'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
};

updateStatus_factory.getAllActiveRequests = function(input){
    return  $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/getallactiverequests',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.updateBranch = function(input){
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/updateBranch',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.changeUserRole = function(input){
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/changeuserrole',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.changePermission = function(input){
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/changepermission',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.changePasswordAdmin = function(input){
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/changepasswordadmin',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.changePassword = function (input) {
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/changepassword',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.addUser = function(input){
    return $http({
        method: 'POST',//or POST
        url: ip+'/FilmsWeb/api/web/insertuser',
        data: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getSettlements = function(input){
    return $http({
        method: 'GET',// or GET
        url:ip+'/FilmsWeb/api/web/getsettlementstatus',
        params: input,
        headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};


updateStatus_factory.changeSettlementStatus = function (input) {
    return $http({
        method: 'GET',// or GET
        url:ip+'/FilmsWeb/api/web/changesettlementstatus',
        params: input,
        headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};



updateStatus_factory.getNcRequests = function(input){
    return $http({
        method: 'GET',// or GET
        url:ip+'/FilmsWeb/api/web/getncrequest',
        params: input,
        headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.setNcRequestStatus = function(input){
    return $http({
        method: 'POST',// or GET
        url:ip+'/FilmsWeb/api/web/setncrequeststatus',
        params: input,
        headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getReportByName = function (input) {
    return $http({
        method: 'POST',// or GET
        url: ip+'/FilmsWeb/api/report/getloanhistorybyname',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getReportByDate = function (input) {
    return $http({
        method: 'POST',// or GET
        url: ip+'/FilmsWeb/api/report/getloanhistorybydate',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getReportByStatus = function (input) {
    return $http({
        method: 'POST',// or GET
        url: ip+'/FilmsWeb/api/report/getloanhistorybystatus',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getActiveLoans = function (input) {
    return $http({
        method:'POST',// or POST
        url: ip+'/FilmsWeb/api/mobile/getnavstaffloansbulk',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getClientImages = function (input) {
    return $http({
        method:'POST',// or POST
        url: ip+'/FilmsWeb/api/web/getclientImages',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.postLoanInstructions = function (input) {
    return $http({
        method:'POST',// or POST
        url: ip+'/FilmsWeb/api/web/postloaninstructions',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};


updateStatus_factory.getRefundStatus = function (input) {
    return $http({
        method:'POST',// or POST
        url: ip+'/FilmsWeb/api/web/getrefundbystatus',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};

updateStatus_factory.getRefundByStatusDate = function (input) {
    return $http({
        method:'POST',// or POST
        url: ip+'/FilmsWeb/api/web/getrefundstatusbydate',
        params: input,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
};


    updateStatus_factory.updateRefundStatus = function (input) {
        return $http({
            method:'POST',// or POST
            url: ip+'/FilmsWeb/api/web/updaterefundstatus',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };


    updateStatus_factory.getRefundById = function (input) {
        return $http({
            method:'GET',// or POST
            url: ip+'/FilmsWeb/api/web/getrefundbyid',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    updateStatus_factory.postRefundData = function (input) {
        return $http({
            method:'POST',// or POST
            url: ip+'/FilmsWeb/api/mobile/postrefundrequest',
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };


    updateStatus_factory.refundEligibility = function (input) {
        return $http({
            method:'POST',// or POS
            url: ip+'/FilmsWeb/api/mobile/refundeligibility',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };



    updateStatus_factory.setAlt = function (input) {
        return $http({
            method:'POST',// or POS
            url: ip+'/FilmsWeb/api/web/postloanaltType',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };


    //refund

    //request refund
    updateStatus_factory.requestRefund = function (input) {
        return $http({
            method:'POST',// or get
            url: ip+'/FilmsWeb/api/web/requestrefund',
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    updateStatus_factory.getRefundByStatus = function (input) {
        return $http({
            method:'POST',// or get
            url: ip+'/FilmsWeb/api/web/getrefundbystatus',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    updateStatus_factory.postKycQuestion = function (input) {
        return $http({
            method:'POST',// or get
            url: ip+'/FilmsWeb/api/web/insertquestions',
            data: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    updateStatus_factory.getKycQuestion = function (input) {
        return $http({
            method:'GET',// or get
            url: ip+'/FilmsWeb/api/web/getquestionanswers',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    updateStatus_factory.getIp = function (input) {
        return $http({
            method:'GET',// or get
            url: test_ip+'/FilmsWeb/api/admin/getip',
            params: input,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };




return updateStatus_factory;



}]);


app.factory('apiFactory',['$http',function ($http) {

    var apiFactory = {};

    //login
    apiFactory.login = function(input){
        return $http({
            method: 'POST',
            url: ip+'/FilmsWeb/api/web/loginuser',
            params: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };
    //settlementBalance
    apiFactory.getSettlementBalance = function(input){
        return $http({
            method: 'POST',
            url: ip+'/FilmsWeb/api/mobile/getnavstaffloansbulk',
            params: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    apiFactory.postSettlementRequest = function(input){
        return $http({
            method: 'POST',
            url: ip+'/FilmsWeb/api/web/settleloanpay',
            data: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    apiFactory.getSettlementStatus =  function (input) {
        return  $http({
            method: 'GET',
            url: ip+'/FilmsWeb/api/web/getsettlementstatus',
            params: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    apiFactory.getSettlementStatusByDate =  function (input) {
        return  $http({
            method: 'GET',
            url: ip+'/FilmsWeb/api/web/getsettlementstatusbydate',
            params: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    apiFactory.changeChequeToPaid =  function (input) {
        return  $http({
            method: 'POST',
            url: ip+'/FilmsWeb/api/web/changechequetopaid',
            params: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };

    apiFactory.writeOffLoan = function (input) {
        return $http({
            method: 'GET',
            url: ip+'FilmsWeb/api/payment/callbackget',
            params: input,
            headers: {'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
    };




    return apiFactory;
}]);

//other functions
  function w3_open() {

  document.getElementById("mySidebar").style.width = "15%";
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("openNav").style.display = 'none';
  document.getElementById("closeNav").style.display = 'inline-block'



}
function w3_close() {
  document.getElementById("main").style.marginLeft = "0%";
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("openNav").style.display = "inline-block";
  document.getElementById("closeNav").style.display = 'none'

}
function myFunction() {
    var x = document.getElementById("demo");
    if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


function openAudit(evt, auditType) {
    var i, x, tablinks;
    x = document.getElementsByClassName("audit");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
    }
    document.getElementById(auditType).style.display = "block";
    evt.currentTarget.firstElementChild.className += " w3-border-red";
}


function accordionFunc(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") === -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-green";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-green", "");
    }
}
