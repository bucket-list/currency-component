import styles from './currency-component.css';
angular.module('currency-component', []);

angular.module('currency-component')
    .provider('$ablCurrencyComponentProvider', [function $ablCurrencyComponentProvider() {
        var config = {
            defaultCurrency: 'usd', //default currency to usd
            uniqueCurrency: false, //unique means the app will pass by provider an unique currency for the whole app
            currencies: [] //list (array of objects) of currencies added by provider
        };
        return {
            $get: function() {
                return config;
            }
        }
    }])
    .factory('availableCurrencies', function() {
        return {
            //list of currencies availables https://stripe.com/docs/currencies
            getAvailableCurrencies: function() {
                return [{
                    name: ['usd', 'cad', 'aud', 'hkd', 'nzd', 'sgd'],
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
                    name: ['dkk', 'nok', 'sek'],
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
            }
        }
    })
    .filter('ablCurrency', function($filter, availableCurrencies, $ablCurrencyComponentProvider, $log) {
        var filter = this;
        filter.decimalsToString = function(decimals) {
            if (decimals > 0) {
                var decimalsToString = '';
                for (var i = 0; i < decimals; i++) {
                    decimalsToString += '0';
                }
                return '.' + decimalsToString;
            }
            else {
                return '';
            }
        }
        filter.fixDecimals = function(price, decimals) {
            var integer = price.toString().substr(price.toString().indexOf('.') + 1);
            $log.debug('fixDecimals', integer, decimals);
            if (integer.toString().length < decimals) {
                var diff = decimals - integer.length;
                return price.toString().substr(0, price.toString().indexOf('.')) + '666';
            }
        }

        return function(price, currency, html) {
            //vars
            var currencies, uniqueCurrency, defaultCurrencies, currentCurrency, defaultCurrency;

            //get boolean if the app should use only one currency in the whole app. Default value is false
            uniqueCurrency = $ablCurrencyComponentProvider.uniqueCurrency;

            //get list of available currencies in component
            defaultCurrencies = availableCurrencies.getAvailableCurrencies();

            //concat component currencies with the ones provided by user in setup. Default is 'usd'
            defaultCurrency = $ablCurrencyComponentProvider.defaultCurrency;

            //final list concatenated array from provider
            currencies = defaultCurrencies.concat($ablCurrencyComponentProvider.currencies);
            filter.currencies = currencies;

            if (uniqueCurrency) { //force to use defaultCurrency from provider
                currency = $ablCurrencyComponentProvider.defaultCurrency;
            }
            else { //if currency is undefined, use the default one
                if (angular.isUndefined(currency)) { //module defines a defaultCurrency to usd. By provider defaultCurrency can be overwritten
                    if (angular.isUndefined($ablCurrencyComponentProvider.defaultCurrency)) {
                        currency = defaultCurrency;
                    }
                    else {
                        currency = $ablCurrencyComponentProvider.defaultCurrency;
                    }
                }
            }

            //find currency in array
            currentCurrency = $filter('filter')(currencies, {
                name: currency
            }, true);

            //if currency is not on the list and it was not provide by the app should return an exception
            if (currentCurrency.length === 0) {
                return 'Currency "' + currency + '" not found'; //display message with currency name not found
            }
            else {
                //set defaulst values if they are not found in the object
                if (angular.isUndefined(currentCurrency[0].symbolSeparation)) { //set separator to no space if symbolSeparation is undefined in the currency object
                    currentCurrency[0].symbolSeparation = '';
                }
                if (angular.isUndefined(currentCurrency[0].factor)) { //set separator to no space if symbolSeparation is undefined in the currency object
                    currentCurrency[0].factor = null;
                }
                if (angular.isUndefined(currentCurrency[0].decimals)) { //set separator to no space if symbolSeparation is undefined in the currency object
                    currentCurrency[0].decimals = 0;
                }
            }

            //calculate price taking factor and adding the decimals
            var priceFactorixed = currentCurrency[0].factor === null ? price : (price / currentCurrency[0].factor).toFixed(currentCurrency[0].decimals);

            if (angular.isUndefined(html)) { //no html param
                if (currentCurrency[0].position === 'prepend') { //the symbol goes in the front
                    return (currentCurrency[0].symbol + currentCurrency[0].symbolSeparation) + priceFactorixed;
                }
                else {
                    return priceFactorixed + (currentCurrency[0].symbolSeparation + currentCurrency[0].symbol);
                }
            }
            else { //html param passed
                if (currentCurrency[0].position === 'prepend') {
                    return '<span class="symbol">' + currentCurrency[0].symbol + currentCurrency[0].symbolSeparation + '</span><span class="price">' + priceFactorixed + '</span>';
                }
                else {
                    return '<span class="price">' + priceFactorixed + '</span><span class="symbol">' + currentCurrency[0].symbolSeparation + currentCurrency[0].symbol + '</span>';
                }
            }
        };
    });
