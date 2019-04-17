'use strict';

angular.module('myApp.manualWriteOff', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/manualWriteOff', {
        templateUrl: 'settlement/manualWriteOff.html',
        controller: 'manualWriteOffCtrl',
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
    });
}]);

//logout
app.controller('manualWriteOffCtrl', ['$scope','$sessionStorage','apiFactory','$route','$rootScope','$timeout','$filter',function($scope,$sessionStorage,apiFactory,$route,$rootScope,$timeout,$filter) {
    $scope.action  = $sessionStorage.action;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.spin = false;
    $rootScope.user_data  = $sessionStorage.user_data;



    $scope.writeOffLoan = function () {
        var input= {invoiceNo: $scope.invoiceNumber};
        $scope.spin = true;
        apiFactory.writeOffLoan(input).then(function (response) {
            console.log(response);
            if  (response.data === true){
                $sessionStorage.action={
                    message: 'Loan Written Off Successfully',
                    success: true,
                    failure : false,
                    network: false
                };

            }else{
                $sessionStorage.action={
                    message: 'Loan Already Written Off',
                    success: false,
                    failure : true,
                    network: false
                }
            }
            $route.reload();
        },function () {
            $sessionStorage.action={
                message: 'Network Error',
                success: false,
                failure : false,
                network: true
            };
            $route.reload();
        })
    };

    $scope.closeAlerts = function(){
        $sessionStorage.action={
            message: '',
            success: false,
            failure : false,
            network: false
        };
    }

}]);
