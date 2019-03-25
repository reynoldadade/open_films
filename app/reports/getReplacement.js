'use strict';
angular.module('myApp.getReplacements', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider   .when('/getReplacements', {
        templateUrl: 'reports/getReplacement.html',
        controller: 'getReplacements_Ctrl',
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

app.controller('getReplacements_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

        $rootScope.logged_in = $sessionStorage.logged_in;
        $rootScope.form_data = $sessionStorage.form_data;
        $scope.action = $sessionStorage.action;
        $scope.today = new Date();
        $scope.sortType = 'StatusDate';
        $scope.sortReverse = false;
        $scope.confirm = false;


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

            var input = {startDate: start_full_year,endDate: end_full_year};
            $sessionStorage.input = input;
            updateView(input)

        };


        var updateView = function (input) {
            updateStatus_factory.getReplacement(input).then(function(response) {
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

                updateView(input);


            });
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



/******************************************************************************************************************************************/