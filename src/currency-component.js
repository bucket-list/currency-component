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
            getAvailableCurrencies: function() {
                return [{
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
                    position: 'prepend'
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
                    position: 'append'
                }, {
                    name: 'xpf',
                    symbol: 'XPF',
                    symbolSeparation: ' ',
                    position: 'append'
                }];
            }
        }
    })
    .filter('currencyFilter', function($filter, availableCurrencies, $ablCurrencyComponentProvider) {
        var filter = this;
        return function(price, currency, html) {
            //vars
            var currencies, uniqueCurrency, defaultCurrencies, currentCurrency, prependAppend, defaultCurrency;

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
                if (angular.isUndefined(currentCurrency[0].symbolSeparation)) { //set separator to no space if symbolSeparation is undefined in the currency object
                    currentCurrency[0].symbolSeparation = '';
                }
            }

            if (angular.isUndefined(html)) { //no html param
                if (currentCurrency[0].position === 'prepend') {
                    return $filter('currency')(price, (currentCurrency[0].symbol + currentCurrency[0].symbolSeparation));
                }
                else {
                    return $filter('currency')(price, '') + (currentCurrency[0].symbolSeparation + currentCurrency[0].symbol);
                }
            }
            else { //html param passed
                if (prependAppend === 'prepend') {
                    return '<span class="symbol">' + currentCurrency[0].symbol + currentCurrency[0].symbolSeparation + '</span><span class="price">' + $filter('currency')(price, '') + '</span>';
                }
                else {
                    return '<span class="price">' + $filter('currency')(price, '') + '</span><span class="symbol">' + currentCurrency[0].symbolSeparation + currentCurrency[0].symbol + '</span>';
                }
            }
        };
    });