'use strict';

angular.module('myApp.checkActiveLoans', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/checkActiveLoans', {
        templateUrl: 'transactions/checkActiveLoans.html',
        controller: 'checkActiveLoans_Ctrl',
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

//controller

app.controller('checkActiveLoans_Ctrl',['$rootScope','$sessionStorage','$scope','$http','$location','updateStatus_factory',function ($rootScope,$sessionStorage,$scope,$http,$location,updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $scope.action = $sessionStorage.action;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
$scope.searchLoan = function () {
    $scope.found = true;
    $scope.details = [];
    $scope.error = false;
    var input= {id:$scope.employeeId}
    updateStatus_factory.getActiveLoans(input).then(function (response) {
        if (response.data.Status === 'false'){
            $scope.message = 'No Active Loans'
            $scope.error = true;
        }
        else{
            var data = response.data.Data;
            $scope.details = angular.fromJson(data)
            //console.log($scope.details)
        }
       $scope.found = false;
    },function () {

    })
}


}]);