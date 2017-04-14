import template from './summary.html';
require("./abl-payment-summary.css");

angular.module('abl-payment-summary', []);

angular.module('abl-payment-summary')
.component('paymentSummary', {
    bindings: {
      booking: '=',
      unit: '=',
      language: '='
    },
    controller: function ($scope, $element, $attrs) {


      function getBasePrice() {
      }

      this.getBasePrice = getBasePrice;
      

      function formatDate(d,f) {
        var date = window.moment(d).format(f);
        return date;
      }

      this.formatDate = formatDate;

      this.$onInit = function() {
        console.log(this);
        this.base = this.booking['pricing']['charges'].filter(  function (value) {  
          return (value['type'] == 'aup');
        })[0];
      }
    },
    template: template
});

