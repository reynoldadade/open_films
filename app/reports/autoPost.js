'use strict';
angular.module('myApp.autoPost', ['ngRoute']);


app.config(['$routeProvider', function($routeProvider) {
    $routeProvider   .when('/autoPost', {
        templateUrl: 'reports/autoPost.html',
        controller: 'autoPost_Ctrl',
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

app.controller('autoPost_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$timeout','$filter','updateStatus_factory',
    function ($scope,$rootScope,$sessionStorage,$http,$timeout,$filter,updateStatus_factory) {

        $rootScope.logged_in = $sessionStorage.logged_in;
        $rootScope.form_data = $sessionStorage.form_data;
        $scope.action = $sessionStorage.action;
        $scope.today = new Date();
        $scope.sortType = 'StatusDate';
        $scope.sortReverse = false;
        $scope.confirm = false;
        var data;
        $scope.replacementReport = [];







        $scope.submit = function(){
           var selectedFile = document.getElementById('replacementFile').files[0];
            Papa.parse(selectedFile,
                {
                    header: false,
                    dynamicTyping: true,
                    trimHeaders: true,
                    skipEmptyLines: true,
                    complete: function(results) {
                                data = results.data;
                                data.splice(0,1);

                                console.log(data);
                                $scope.action = {
                                    message:'About to Upload'+ data.length+ 'entries',
                                    success:true
                                };

                                data.forEach(function (value) {
                                    var input = {
                                        "EmployeeId": value[0],
                                        "LoanNo": value[1],
                                        "SettlementType": 0
                                    };
                                   // console.log(input,'input')
                                    updateStatus_factory.navRequest(input).then(function (response) {
                                        var results = {
                                            "EmployeeId": input.EmployeeId,
                                            "LoanNo": input.LoanNo,
                                            "Successful":response.data
                                        };
                                        $scope.replacementReport.push(results)
                                    })


                                });
                                $scope.action = {
                                    message:'Complete',
                                    success:true,
                                    complete:true
                                };




                            }
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