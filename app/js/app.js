'use strict';

/* App Module */

var sampleApp = angular.module('sampleApp', []);

sampleApp.controller('SampleCtrl', function ($scope) {
    $scope.displayText = "XXX";

    $scope.toUpper = function() {
        $scope.displayText = $scope.inputText.toUpperCase();
    }
});
