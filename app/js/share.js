(function() {
    var app = angular.module("AngularJsStudy", []);


    //
    // Shared Service
    //
    app.factory("SharedStateService", function() {
        return {
            text: 'SharedStateService'
        };
    });

    app.controller("ShareControllerA", function($scope, SharedStateService) {
        $scope.data = SharedStateService;
    });

    app.controller("ShareControllerB", function($scope, SharedStateService) {
        $scope.data = SharedStateService;
    });


    //
    // Parent Scope Sharing
    //

    app.controller("MasterController", function($scope) {
        $scope.text = "Shared Text";
    });

    app.controller("ChildControllerA", function($scope) {
    });

    app.controller("ChildControllerB", function($scope) {
    });


    //
    // Pub/Sub
    //

    app.factory("SharedService", ["$rootScope", function($rootScope) {
        var text = "Shared Text";

        return {
            text: {
                get: function() { return text; },
                set: function(t) {
                    console.log("[enter] text.set");
                    text = t;
                    $rootScope.$broadcast('changedText');
                    console.log("[leave] text.set");
                }
            }
        };
    }]);

    app.controller("Controller", function($scope, SharedService) {
        $scope.text = SharedService.text.get();

        $scope.setText = function() {
            console.log("[enter] setText");
            SharedService.text.set($scope.text);
            console.log("[leave] setText");
        };

        $scope.$on('changedText', function() {
            console.log("[enter] changedText [current]" + $scope.text);
            $scope.text = SharedService.text.get();
            console.log("[leave] changedText");
        });
    });

}());
