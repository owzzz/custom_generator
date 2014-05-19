app.factory('configurationService', ['$http', function($http){

    'use strict';

    return {
        loadConfig : function() {
            return $http({
                method: 'GET',
                url: 'assets/data/config.json'
            });
        }
    }
}])