//  Build our app module, with a dependency on the new angular module.
var app = angular.module('sampleapp', ['ngAnimate', 'ngMaterial', 'ngSanitize', 'ngMdIcons', 'currency-component']);

app.run(function($ablCurrencyComponentProvider) {
        console.log('$ablCurrencyComponentProvider', $ablCurrencyComponentProvider);
        $ablCurrencyComponentProvider.defaultCurrency = 'usd';
        $ablCurrencyComponentProvider.uniqueCurrency = false;
        $ablCurrencyComponentProvider.currencies = [{ name: 'cl', symbol: '#', symbolSeparation: '', position: 'prepend' }, { name: 'bl', symbol: '#', symbolSeparation: '', position: 'prepend', factor: 10, decimals: 1 }];
    })
    .filter('objToString', function($log) {
        return function(object) {
            if(typeof object === 'object'){
                var output = '{';
                for (var property in object) {
                    output += '' + property + ': "' + object[property] + '", ';
                }
                output += '}';
                return output;
            }else{
                return object;
            }
        }
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
            name: 'aud',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'hkd',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'nzd',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'sgd',
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
            name: 'dkk',
            symbol: 'kr',
            symbolSeparation: '-',
            position: 'append',
            factor: 100,
            decimals: 2
        }, {
            name: 'nok',
            symbol: 'kr',
            symbolSeparation: '-',
            position: 'append',
            factor: 100,
            decimals: 2
        }, {
            name: 'sek',
            symbol: 'kr',
            symbolSeparation: '-',
            position: 'append',
            factor: 100,
            decimals: 2
        }, {
            name: 'jpy',
            symbol: '¥',
            symbolSeparation: '',
            position: 'prepend',
            factor: null,
            decimals: 0
        }, {
            name: 'mxn',
            symbol: '$',
            symbolSeparation: '',
            position: 'prepend',
            factor: null,
            decimals: 0
        }, {
            name: 'gbp',
            symbol: '£',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }, {
            name: 'chf',
            symbol: 'Fr',
            symbolSeparation: ' ',
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
        }, {
            name: 'brl',
            symbol: 'R$',
            symbolSeparation: '',
            position: 'prepend',
            factor: 100,
            decimals: 2
        }];
        vm.customCurrencies = currencies.concat($ablCurrencyComponentProvider.currencies);
        $log.debug('$ablCurrencyComponentProvider:sample', vm.customCurrencies);
        vm.customCurrency = this.customCurrencies[0].name;
        vm.getCurrencyObject = function(currency) {
            var currentCurrency = $filter('filter')(vm.customCurrencies, {
                name: currency
            }, true);
            return currentCurrency.length > 0 ? $filter('objToString')(currentCurrency[0]) : 'Currency not found';
        }
    }]);
