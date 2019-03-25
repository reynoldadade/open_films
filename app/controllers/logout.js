'use strict';

angular.module('myApp.logout', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider .when('/logout', {
        templateUrl: 'transactions/login.html',
        controller: 'logout_Ctrl'
    })
   }])

//logout
app.controller('logout_Ctrl',['$location','$sessionStorage','$scope',function ($location,$sessionStorage,$scope) {
    $scope.logged_in.showMenu =false;
    $sessionStorage.logged_in.showMenu = false;
    if ($sessionStorage.form_data !== undefined){
         $sessionStorage.form_data.filtered = false;
    }

    $sessionStorage.$reset();

    $location.path('/login');

}]);
