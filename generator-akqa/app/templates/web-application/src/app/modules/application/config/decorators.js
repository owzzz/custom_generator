//clean up events on dispose. This makes $rootScope usable as event bus.
app.config(['$provide', function($provide) {

    'use strict';

    $provide.decorator('$rootScope', ['$delegate', function($delegate) {
        $delegate.constructor.prototype.$onRootScope = function(name, listener) {
            var unsubscribe = $delegate.$on(name, listener);
            this.$on('$destroy', unsubscribe);
        };
        return $delegate;
    }]);
}]);