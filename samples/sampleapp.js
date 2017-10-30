//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'currency-component']);

app.run(function($ablCurrencyComponentProvider) {
        console.log('$ablCurrencyComponentProvider', $ablCurrencyComponentProvider);
        $ablCurrencyComponentProvider.defaultCurrency = 'usd';
        $ablCurrencyComponentProvider.uniqueCurrency = false;
        $ablCurrencyComponentProvider.currencies = [{ name: 'cl', sign: '#', signSeparation: '', position: 'prepend' }];
    })
    .controller('SampleController', ['$scope', '$mdMedia', '$rootScope', '$window', '$timeout', '$filter', '$log', function($scope, $mdMedia, $rootScope, $window, $timeout, $filter, availableCurrencies, $log) {
        var vm = this;
        vm.price = 123456789;
        vm.customPrice = 1234567890;
        vm.customCurrencies = [{
            name: 'usd',
            sign: '$',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'cad',
            sign: '$',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'eur',
            sign: '€',
            signSeparation: '',
            position: 'append'
        }, {
            name: 'kr',
            sign: 'kr',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'jpy',
            sign: '¥',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'gbp',
            sign: '£',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'chf',
            sign: 'chf',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'brl',
            sign: 'R$',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'cfp',
            sign: 'cfp',
            signSeparation: '',
            position: 'prepend'
        }, {
            name: 'xpf',
            sign: 'XPF',
            signSeparation: ' ',
            position: 'append'
        }];
        console.log('vm.customCurrencies', vm.customCurrencies);
        vm.customCurrency = this.customCurrencies[0].name;
    }]);
