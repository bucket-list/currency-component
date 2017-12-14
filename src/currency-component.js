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
    .filter('ablCurrency', function($filter, $rootScope, availableCurrencies, $ablCurrencyComponentProvider, $log) {
        var filter = this;

        filter.getCountryCode = function(currency) {
            var countriesCode = { 'usd': 'us', 'cad': 'ca', 'aud': 'au', 'hkd': 'hk', 'nzd': 'nz', 'sgd': 'sg' };
            return countriesCode[currency];
        }

        return function(price, currency, html, symbol) {
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

            var output = '';
            if (angular.isUndefined(html) || !html) { //no html param
                if (angular.isUndefined(symbol) || !symbol) { //if symbol is not passed the symbol will be included
                    if (currentCurrency[0].position === 'prepend') { //the symbol goes in the front
                        output = (currentCurrency[0].symbol + currentCurrency[0].symbolSeparation) + priceFactorixed;
                    }
                    else {
                        output = priceFactorixed + (currentCurrency[0].symbolSeparation + currentCurrency[0].symbol);
                    }
                }
                else {
                    output = priceFactorixed;
                }
            }
            else { //html param passed
                $log.debug('angular.isUndefined(symbol)', angular.isUndefined(symbol), symbol);
                if (angular.isUndefined(symbol) || !symbol) { //if symbol is not passed the symbol will be included
                    if (currentCurrency[0].position === 'prepend') {
                        output = '<span class="abl-currency"><span class="abl-currency-symbol">' + currentCurrency[0].symbol + currentCurrency[0].symbolSeparation + '</span><span class="abl-currency-price">' + priceFactorixed + '</span></span>';
                    }
                    else {
                        output = '<span class="abl-currency"><span class="abl-currency-price">' + priceFactorixed + '</span><span class="abl-currency-symbol">' + currentCurrency[0].symbolSeparation + currentCurrency[0].symbol + '</span></span>';
                    }
                }else{
                    output = '<span class="abl-currency"><span class="abl-currency-price">' + priceFactorixed + '</span></span>';
                }
            }
            console.log('currency:ENV', $rootScope.ENV);
            if($rootScope.ENV.log){
                output = '('+currency+') ' + output;
            }
            
            return output;
        };
    });
