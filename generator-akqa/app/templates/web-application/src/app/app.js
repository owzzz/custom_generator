/*global angular:true */

//global app module
var app;

(function () {
    "use strict";

    var moduleDependencies = [

        //site modules
        'app.module1',
        'app.module2',

        //3rd party modules
        'ui.router',
        'ngAnimate',
        'ngSanitize',
        'ngTouch'
    ];

    //define application on global 'app' module
    app = angular.module('app', moduleDependencies )

}());