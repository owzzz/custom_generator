app.config(['$urlRouterProvider', '$stateProvider', function( $urlRouterProvider, $stateProvider ) {

    'use strict';

    $urlRouterProvider.otherwise('/');

    //set up application routes

    $urlRouterProvider
        .otherwise('/');


    $stateProvider

        .state('home', {

            url: '/',

            template: '<h1>Home</h1>'

        })

}]);