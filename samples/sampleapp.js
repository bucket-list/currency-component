//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'abl-currencies']);

app.controller('SampleController', ['$scope', '$mdMedia', '$rootScope', '$window', '$timeout', function($scope, $mdMedia, $rootScope, $window, $timeout) {
  var vm = this;
}]);