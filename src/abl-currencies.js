import styles from './abl-currencies.css';
import template from './template.html';
angular.module('abl-currencies', []);

angular.module('abl-currencies')
  .component('ablCurrencies', {
    bindings: {
      mode: '@'
    },
    controller: function($scope, $element, $attrs) {
      //Initialization function
      this.$onInit = function() {
        this.price = 123456789;
      }
    },
    template: function() {
      return template;
    }
  })
  .filter('ablCurrency', ['$filter', '$sce', function($filter, $sce) {
    return function(value, currency, html) {
      var currencies = [{
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
      }];
      var currencyObject = $filter('filter')(currencies, {
        name: currency
      }, true);
      if (typeof currency === 'undefined') { //if currency param was NOT passed in the implementation, USD $ default
        return $filter('currency')(value);
      }
      else { //if currency param was passed in the implementation
        if (currencyObject.length > 0) {//if currency was found on the list
          if (typeof html === 'undefined') {//if html was NOT defined
            return $filter('currency')(value, currencyObject[0].sign);
          }
          else {//if html was defined
            return '<strong class="sign">' + currencyObject[0].sign + '</strong><span class="price">' + $filter('currency')(value, '') + '</span>';
          }
        }
        else {//if currency was passed but NOT found on the list
          return 'No currency found';
        }
      }
    }
  }]);
