//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'currency-component']);

app.run(function($ablCurrencyComponentProvider) {
        console.log('$ablCurrencyComponentProvider', $ablCurrencyComponentProvider);
        $ablCurrencyComponentProvider.defaultCurrency = 'usd';
        $ablCurrencyComponentProvider.uniqueCurrency = 'usd';
        $ablCurrencyComponentProvider.currencies = [{ name: 'me', sign: '#', position: 'prepend' }];
    })
    .controller('SampleController', ['$scope', '$mdMedia', '$rootScope', '$window', '$timeout', '$filter', 'availableCurrencies', '$log', function($scope, $mdMedia, $rootScope, $window, $timeout, $filter, availableCurrencies, $log) {
        var vm = this;
        vm.price = 123456789;
        vm.customPrice = 1234567890;
        vm.customCurrencies = $filter('currencyFilter');
        console.log('vm.customCurrencies', availableCurrencies.getAvailableCurrencies());
        //vm.customCurrency = this.customCurrencies[0].name;
    }]);
