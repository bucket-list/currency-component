//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'currency-component']);

app.run(function($ablCurrencyComponentProvider) {
        console.log('$ablCurrencyComponentProvider', $ablCurrencyComponentProvider);
        $ablCurrencyComponentProvider.defaultCurrency = 'usd';
        $ablCurrencyComponentProvider.uniqueCurrency = false;
        $ablCurrencyComponentProvider.currencies = [{ name: 'cl', symbol: '#', symbolSeparation: '', position: 'prepend' }];
    })
    .controller('SampleController', ['$scope', '$mdMedia', '$rootScope', '$window', '$timeout', '$filter', '$ablCurrencyComponentProvider', '$log', function($scope, $mdMedia, $rootScope, $window, $timeout, $filter, $ablCurrencyComponentProvider, $log) {
        var vm = this;
        vm.price = 123456789;
        vm.customPrice = 1234567890;
        vm.customCurrencies = [{
            name: 'usd',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'cad',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'eur',
            symbol: '€',
            symbolSeparation: '',
            position: 'append'
        }, {
            name: 'kr',
            symbol: 'kr',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'jpy',
            symbol: '¥',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'gbp',
            symbol: '£',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'chf',
            symbol: 'chf',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'brl',
            symbol: 'R$',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'cfp',
            symbol: 'cfp',
            symbolSeparation: '',
            position: 'prepend'
        }, {
            name: 'xpf',
            symbol: 'XPF',
            symbolSeparation: ' ',
            position: 'append'
        }];
        vm.customCurrency = this.customCurrencies[0].name;
    }]);
