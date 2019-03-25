'use strict';

angular.module('myApp.selfieAudit', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/selfieAudit', {
        templateUrl: 'reports/selfieAudit.html',
        controller: 'selfieAudit_Ctrl',
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



app.controller('selfieAudit_Ctrl',['$scope','$rootScope','$sessionStorage','$http','$route','updateStatus_factory',function ($scope,$rootScope,$sessionStorage,$http,$route,updateStatus_factory) {
    $rootScope.logged_in = $sessionStorage.logged_in;
    $rootScope.form_data = $sessionStorage.form_data;
    $scope.today = new Date();

    $scope.datas =[{ImageURL:'http://www.pbs.org/black-culture/lunchbox_plugins/s/photogallery/img/no-image-available.jpg'}];



    $scope.getClientImages = function () {
        $scope.spin = true;
            $scope.datas = [];
        var input = {staffId: $scope.staffid};
        updateStatus_factory.getClientImages(input).then(function (response) {
            if (response.data.length === 0){
                $scope.found = true;
                $scope.datas =[{ImageURL:'http://www.pbs.org/black-culture/lunchbox_plugins/s/photogallery/img/no-image-available.jpg'}];
                console.log($scope.feedback)
            }
            else{
                $scope.found = true;
                $scope.datas = response.data;
                $scope.feedback = 'Found '+$scope.datas.length + ' Images';
                console.log($scope.datas)
            }
            $scope.spin = false;
        },function () {
            $scope.found = true;
            $scope.datas =[{ImageURL:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE249Ar6GP1NtYIGsPTHYRVnRcAsm5LmlEpGmt3UW9nHdkVeB9QA'}];
            //console.log($scope.feedback)
            $scope.spin = false;
        })
    };

}]);


