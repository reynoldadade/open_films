'use strict';

var app = angular.module('myApp.settleLoan', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/settleLoan',{
        templateUrl: 'settlement/landing.html',
        controller:'settleLoan_Ctrl',
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

app.controller('settleLoan_Ctrl', ['$scope','apiFactory','$sessionStorage','$rootScope',function($scope,apiFactory,$sessionStorage,$rootScope) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $scope.action = $sessionStorage.action;


    $scope.searchSettlement = function () {
        $scope.details = [];
        $scope.count = [];
        $scope.found = false;
        $scope.error = false;
        console.log('searching');
        $scope.searching = true;
        var input= {id:$scope.settlement.EmployeeId};
        apiFactory.getSettlementBalance(input).then(function (response) {
            if (response.data.Status === 'false'){
                $scope.message = 'No Active Loans';
                $scope.count = $scope.details.length;
                $scope.error = true;
                console.log('xxxx')
            }
            else{
                var data = response.data.Data;
                $scope.details = angular.fromJson(data);
                $scope.count = $scope.details.length;
                $scope.found = true;
                console.log('found')
                //console.log($scope.details
            }
            $scope.searching = false;
        },function () {
            $scope.message = 'Connection Failed';
            $scope.error = true;
        })
    };


    $scope.setSelected = function(selected){
        $scope.clicked = true;
        $scope.selected = $scope.details.indexOf(selected);
        //allow you to claim deal from tray
        //
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
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