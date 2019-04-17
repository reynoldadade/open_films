'use strict';

angular.module('myApp.landing', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/landing',{
        templateUrl: 'transactions/landing.html',
        controller:'landing_Ctrl',
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
    }).when('/epayNav',{
        templateUrl: 'navigations/epayNav.html',
        controller:'landing_Ctrl',
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
    }) .when('/kycNav',{
    templateUrl: 'navigations/kycNav.html',
    controller:'landing_Ctrl',
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
}).when('/tprsNav',{
        templateUrl: 'navigations/tprsNav.html',
        controller:'landing_Ctrl',
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
        .when('/affordNav',{
            templateUrl: 'navigations/affordNav.html',
            controller:'landing_Ctrl',
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

        .when('/reportsNav',{
            templateUrl: 'navigations/ReportsNav.html',
            controller:'landing_Ctrl',
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
        .when('/loanIssuesNav',{
            templateUrl: 'navigations/loanIssuesNav.html',
            controller:'landing_Ctrl',
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
        .when('/settlementNav',{
            templateUrl: 'navigations/settlementNav.html',
            controller:'landing_Ctrl',
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

        .when('/refundNav',{
            templateUrl: 'navigations/refundNav.html',
            controller:'landing_Ctrl',
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
        .when('/recoveryNav',{
            templateUrl: 'navigations/recoveryNav.html',
            controller:'landing_Ctrl',
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

app.controller('landing_Ctrl',['$scope','$rootScope','$sessionStorage',function ($scope,$rootScope,$sessionStorage) {
    $rootScope.user_data = $sessionStorage.user_data;
    $rootScope.logged_in = $sessionStorage.logged_in;
    $scope.action = $sessionStorage.action;
    $rootScope.form_data = $sessionStorage.form_data;
    $rootScope.filtered = $sessionStorage.filtered;
    $rootScope.datenow = new Date().getHours();


}]);
