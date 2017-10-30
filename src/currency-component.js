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
            console.log('currencies', currencies);

            console.log('currency', currency);
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
                return 'Currency "' + currency + '" not found';//display message with currency name not found
            }else{
                if(angular.isUndefined(currentCurrency[0].signSeparation)){//set separator to no space if signSeparation is undefined in the currency object
                    currentCurrency[0].signSeparation = '';
                }
            }

            console.log('currentCurrency: ', price, currentCurrency[0].name, currentCurrency[0].sign, currentCurrency[0].position, currency, html);
            if (currentCurrency.length > 0) { //currency is on the list
                if (angular.isUndefined(html)) { //no html param
                    console.log('currency found & prependAppend', currentCurrency[0].position);
                    if (currentCurrency[0].position === 'prepend') {
                        return $filter('currency')(price, (currentCurrency[0].sign + currentCurrency[0].signSeparation));
                    }
                    else {
                        return $filter('currency')(price, '') + (currentCurrency[0].signSeparation + currentCurrency[0].sign);
                    }
                }
                else { //html param passed
                    console.log('prependAppend', prependAppend);
                    if (prependAppend === 'prepend') {
                        return '<span class="sign">' + currentCurrency[0].sign + currentCurrency[0].signSeparation + '</span><span class="price">' + $filter('currency')(price, '') + '</span>';
                    }
                    else {
                        return '<span class="price">' + $filter('currency')(price, '') + '</span><span class="sign">' + currentCurrency[0].signSeparation + currentCurrency[0].sign + '</span>';
                    }
                }
            }
            else {
                return currency + ' not found';
            }
        };
    });
