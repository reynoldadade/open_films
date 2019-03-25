'use strict';
angular.module('myApp.tlDisbursements', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider   .when('/tl_disbursements', {
        templateUrl: 'transactions/individual_disbursements.html',
        controller: 'individual_disbursements_Ctrl',
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

app.controller('individual_disbursements_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
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

            var input = {status: 'paid',datefrom: start_full_year,dateto: end_full_year,user:$scope.user};
            updateStatus_factory.getStatusDateUser(input).then(function(response) {
                // this callback will be called asynchronously
                // when the response is available

                console.log(response.data)
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


            });
        };


    }]);



/******************************************************************************************************************************************/