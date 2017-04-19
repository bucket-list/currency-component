import template from './summary.html';
require("./abl-payment-summary.css");

angular.module('abl-payment-summary', []);

angular.module('abl-payment-summary')
.component('paymentSummary', {
    bindings: {
      unit:     '=',
      checkin:  '=',
      checkout: '=',
      language: '=',
      charges:  '=',
      addons:   '=',
      nights:   '=',
      guests:   '=',
      total:    '='
    },
    controller: function ($scope, $element, $attrs) {

        //Base price
        this.base = this.charges.filter(function (value) {  
            return (value['type'] == 'aup');
        })[0];

        //Date formatter for checkin/checkout
        function formatDate(d,f) {
            var date = window.moment(d).format(f);
            return date;
        }

        this.formatDate = formatDate;
        
        //Add-ons
        this.showAddons = false;
        this.toggleShowAddons = function () {
            this.showAddons = !this.showAddons;
        }

        function addonTotal() {
            var total = 0;
            this.addons.forEach(function(e,i) {
                total += (e.amount * e.quantity);
            });
            return total;
        };

        this.addonTotal = addonTotal;

        //Taxes
        this.showTaxes = false;
        this.toggleShowTaxes = function () {
            this.showTaxes = !this.showTaxes;
        }

        this.taxes = this.charges.filter(function (value) {  
            return (value['type'] != 'aup');
        });

        function taxTotal() {
            var total = 0;
            this.taxes.forEach(function(e,i) {
                total += e.price;
            });
            return total;
        };

        this.taxTotal = taxTotal;

        //Initialization function
        this.$onInit = function() {
            console.log(this);
        }

    },
    template: template
});

