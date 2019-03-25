'use strict';

angular.module('myApp.settlementReceipt', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider,$locationProvider) {

    $routeProvider.when('/receipt/settlementReceipt/:params1',{
        templateUrl: 'receipt/settlementReceipt.html',
        controller:'settlementReceipt_Ctrl'
    })
}]);

app.controller('settlementReceipt_Ctrl',['$scope','$rootScope','$routeParams','$location','updateStatus_factory',function ($scope,$rootScope,$routeParams,$location,updateStatus_factory) {

    $rootScope.datenow = new Date().getHours();
    var url = $location.path().split('/');
    $scope.receiptId = url[3];
    console.log($scope.receiptId)
    //$scope.params1 = $routeParams.params1;
    //console.log($scope.params1)

    var getReceipt = function () {
        var input = { receiptId: $scope.receiptId}
        updateStatus_factory.getReceipt(input).then(function (response) {
            $scope.details = response.data;
        })

    }
    getReceipt();

    $scope.printDiv = function(divName) {
        var printContents = document.getElementById(divName).innerHTML;
        var popupWin = window.open('', '_blank', 'width=300,height=300');
        popupWin.document.open();
        popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="app.css" />' +
            '  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">\n' +
            ' <link href="https://fonts.googleapis.com/css?family=Raleway:700" rel="stylesheet">'
            +'</head><body onload="window.print()">' + printContents + '</body></html>');
        popupWin.document.close();
    }




}]);
