// JavaScript source code
'use strict';

angular.module('myApp.approvedEligibility', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/approvedEligibility', {
        templateUrl: 'transactions/approved_eligibility.html',
        controller: 'approved_eligibility_Ctrl',
        resolve:
            {
                mess: function ($location, $sessionStorage) {
                    var t = ($sessionStorage.logged_in.allow).toString();
                    if (t !== "true") {
                        $location.path('/login');
                        //redirectTo: '/login';
                    }
                }

            }
    })
}])

//controller

app.controller('approved_eligibility_Ctrl', ['$scope', '$rootScope', '$sessionStorage', '$http', '$timeout', '$route', '$filter', 'updateStatus_factory',
    function ($scope, $rootScope, $sessionStorage, $http, $timeout, $route, $filter, updateStatus_factory) {
        $rootScope.logged_in = $sessionStorage.logged_in;
        $scope.action = $sessionStorage.action;
        $rootScope.form_data = $sessionStorage.form_data;
        $rootScope.filtered = $sessionStorage.filtered;

        $scope.sortType = 'StatusDate';
        $scope.sortReverse = false;
        $scope.found = true;  //for the spinner

        $scope.setSelected = function (selected) {
            $scope.selected = $scope.details.indexOf(selected);
            $sessionStorage.claim = selected;
            $scope.claim = $sessionStorage.claim;
        };

        var updateView = function () {
            var input = { status: 'approved' };
            updateStatus_factory.getNcRequests(input).then(function (response) {
                // this callback will be called asynchronously
                //
                // $scope.details = [{id:1}];

                if (response.data.length === 0) {
                    $scope.empty = true;
                }
                else {
                    $scope.details = response.data;
                }

                $scope.found = false;

                //}
                $timeout(updateView, 120000);
                //console.log($scope.details);

            });
        };
        //run function
        updateView();

        var recall = function (input) {
            updateStatus_factory.setNcRequestStatus(input).then(function (response) {
                if (response.data === true) {
                    $sessionStorage.action = {
                        message: 'Response Successfully Recalled',
                        success: true,
                        failure: false,
                        network: false
                    }

                }
                else {
                    $sessionStorage.action = {
                        message: 'Response Failed',
                        success: false,
                        failure: true,
                        network: false
                    }
                }
                $route.reload();

            }, function () {

                $sessionStorage.action = {
                    message: '',
                    success: false,
                    failure: false,
                    network: true
                }

            })
        };

        $scope.respond = function () {
            $scope.found = true;
            var input = { id: $scope.claim.Id, status: $scope.selected_status, note: $scope.note, affordability: $scope.affordability };
            recall(input);
            $scope.found = false;

        };

        $scope.statuses = ['approved', 'rejected'];

    }]);