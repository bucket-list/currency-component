//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'currency-component']);

app.run(function($ablCurrencyComponentProvider) {
        console.log('$ablCurrencyComponentProvider', $ablCurrencyComponentProvider);
        $ablCurrencyComponentProvider.defaultCurrency = 'usd';
        $ablCurrencyComponentProvider.uniqueCurrency = false;
        $ablCurrencyComponentProvider.currencies = [{ name: 'cl', symbol: '#', symbolSeparation: '', position: 'prepend'}, { name: 'bl', symbol: '#', symbolSeparation: '', position: 'prepend', factor: 10, decimals: 1 }];
    })
    .controller('SampleController', ['$scope', '$mdMedia', '$rootScope', '$window', '$timeout', '$filter', '$ablCurrencyComponentProvider', '$log', function($scope, $mdMedia, $rootScope, $window, $timeout, $filter, $ablCurrencyComponentProvider, $log) {
        var vm = this;
        vm.price = 123456789;
        vm.customPrice = 1234567890;
        var currencies = [{
            name: 'usd',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'cad',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'eur',
            symbol: '€',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'kr',
            symbol: 'kr',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'jpy',
            symbol: '¥',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'gbp',
            symbol: '£',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'chf',
            symbol: 'chf',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'brl',
            symbol: 'R$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'cfp',
            symbol: 'cfp',
            symbolSeparation: '',
            position: 'append',
            factor: 100,
            decimals: 2
        }, {
            name: 'xpf',
            symbol: 'XPF',
            symbolSeparation: ' ',
            position: 'append',
            factor: null,
            decimals: 0
        }];
        vm.customCurrencies = currencies.concat($ablCurrencyComponentProvider.currencies);
        $log.debug('$ablCurrencyComponentProvider:sample', $ablCurrencyComponentProvider);
        vm.customCurrency = this.customCurrencies[0].name;
    }]);
