'use strict';

angular.module('myApp.arrearsData', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/arrearsData', {
        templateUrl: 'recovery/arrearsData.html',
        controller: 'arrearsData_Ctrl',
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


app.controller('arrearsData_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$route,updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $scope.action = $sessionStorage.action;
    $scope.info = {
        title: 'Arrears Data'
    };

    //set selected

    $scope.setSelected = function(selected){
        $scope.selected = $scope.details.indexOf(selected);
        $sessionStorage.claim = selected;
        $scope.claim = $sessionStorage.claim;
    };
    
    var clientInfo = {
        "StaffId": "",
        "District": "",
        "Region": "",
        "PhysicalAddress": "",
        "ClientActivePhone": "",
        "CurrentEmployment": "",
        "CurrentNextofKin": "",
        "NokActivePhone": "",
        "DateClientContacted": "2019-04-17T16:09:12.345Z",
        "ClientCurrentStatus": "",
        "IsClientworking": true,
        "ClientFeedback": "",
        "ClientRebookPassword": "",
        "AffordabilityLocked": true,
        "Amount": 0,
        "AffordAmount": 0,
        "PaymentArrangement": "",
        "ModeOfPayment": "",
        "Actions": "",
        "RecoveryOfficer": ""
    };


    $scope.editDetails = function () {
        editDetails()
    };

    var editDetails = function () {
            $route.navigate('/clientDetails')
    };

    var getAll  = function () {
        updateStatus_factory.getAllClientInformation().then(function (response) {
            $scope.details = response.data;
        })
    }



}]);
