import template from './template.html';
import styles from './currency-component.css';
angular.module('currency-component', []);

angular.module('currency-component')
    .filter('currencyFilter', function($filter) {
        return function(price, currency, prependAppend, html) {
            function getPriceByCurrency(_price) {
                console.log('getPriceByCurrency', _price, currency);
                switch (currency) {
                    case 'usd':
                        return _price / 100;
                        break;
                    case 'cad':
                        return _price / 100;
                        break;
                    default:
                        return _price;
                }
            }
            var currencies = [{
                    name: 'usd',
                    sign: '$'
                },
                {
                    name: 'cad',
                    sign: '$'
                }, {
                    name: 'eur',
                    sign: '€'
                }, {
                    name: 'kr',
                    sign: 'kr'
                }, {
                    name: 'jpy',
                    sign: '¥'
                }, {
                    name: 'gbp',
                    sign: '£'
                }, {
                    name: 'chf',
                    sign: 'chf'
                }, {
                    name: 'brl',
                    sign: 'R$'
                }, {
                    name: 'cfp',
                    sign: 'cfp'
                }
            ];
            var sign = $filter('filter')(currencies, {
                name: currency
            }, true);
            console.log('sign: ', sign, price, currency, html, prependAppend);
            if (sign.length > 0) { //sign is on the list
                if (typeof html === 'undefined') { //no html param
                    console.log('no html', price);
                    if (typeof currency === 'undefined') { //default currency $
                        console.log('no currency');
                        if (typeof prependAppend === 'undefined') {
                            return $filter('currency')(getPriceByCurrency(price));
                        }
                        else {
                            if (prependAppend === 'prepend') {
                                return $filter('currency')(getPriceByCurrency(price));
                            }
                            else {
                                return $filter('currency')(getPriceByCurrency(price), '') + '$';
                            }
                        }

                    }
                    else { //currency was passed
                        console.log('currency found', currency);
                        if (typeof prependAppend === 'undefined') {
                            return $filter('currency')(getPriceByCurrency(price), sign[0].sign);
                        }
                        else {
                            console.log('currency found & prependAppend', prependAppend);
                            if (prependAppend === 'prepend') {
                                return $filter('currency')(getPriceByCurrency(price), sign[0].sign);
                            }
                            else {
                                return $filter('currency')(getPriceByCurrency(price), '') + sign[0].sign;
                            }
                        }
                    }
                }
                else { //html param passed
                    if (typeof currency === 'undefined') { //default currency $
                        return '<span class="sign">' + sign[0].sign + '</span><span class="getPriceByCurrency(price)">' + $filter('currency')(getPriceByCurrency(price)) + '</span>';
                    }
                    else { //currency was passed
                        if (typeof prependAppend === 'undefined') {
                            return '<span class="sign">' + sign[0].sign + '</span><span class="getPriceByCurrency(price)">' + $filter('currency')(getPriceByCurrency(price), '') + '</span>';
                        }
                        else {
                            console.log('prependAppend', prependAppend);
                            if (prependAppend === 'prepend') {
                                return '<span class="sign">' + sign[0].sign + '</span><span class="getPriceByCurrency(price)">' + $filter('currency')(getPriceByCurrency(price), '') + '</span>';
                            }
                            else {
                                return '<span class="getPriceByCurrency(price)">' + $filter('currency')(getPriceByCurrency(price), '') + '</span><span class="sign">' + sign[0].sign + '</span>';
                            }
                        }
                    }
                }
            }
            else {
                return 'no currency found';
            }
        };
    })
    .component('currencyComponent', {
        bindings: {
            config: '='
        },
        controller: function($scope, $element, $attrs, $rootScope, $http) {
            this.$onInit = function() {
                var vm = this;
                vm.price = 123456789;
                vm.price = 1234567890;
                vm.customCurrencies = [{
                    name: 'usd',
                    sign: '$'
                }, {
                    name: 'eur',
                    sign: '€'
                }, {
                    name: 'kr',
                    sign: 'kr'
                }, {
                    name: 'jpy',
                    sign: '¥'
                }, {
                    name: 'gbp',
                    sign: '£'
                }, {
                    name: 'chf',
                    sign: 'chf'
                }, {
                    name: 'brl',
                    sign: 'R$'
                }, {
                    name: 'cfp',
                    sign: 'cfp'
                }];
                vm.customCurrency = this.customCurrencies[0].name;
                vm.prependAppend = false;
                vm.prependAppendOption = 'prepend';

                $scope.$watch(function() {
                    return vm.prependAppend;
                }, function(newValue, oldValue) {
                    console.log('$scope.$watch', newValue);
                    if (!newValue) {
                        vm.prependAppendOption = 'prepend';
                    }
                    else {
                        vm.prependAppendOption = 'append';
                    }
                });
            }
        },
        template: template
    });
