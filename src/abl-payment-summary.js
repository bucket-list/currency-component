import hostTotalsTemplate from './host/host-totals.html';

import hostTotalTemplate from './host/host-total.html';


import hostFormsTemplate from './host/host-forms.html';
import hostPersonalDetailsForm from './host/personal-details.html';
import hostAddonsForm from './host/addons.html';




import template from './totals.html';
import hostTemplate from './host.html';

import activityTotalsTemplate from './activity/activity-totals.html';
import activityTotalsMobileTemplate from './activity/activity-totals-mobile.html';

import styles from './abl-payment-summary.css';
angular.module('abl-payment-summary', ['ngMaterial']).run(function($templateCache) {
  $templateCache.put('host-forms.html', hostFormsTemplate);
  $templateCache.put('host-personal-details.html', hostPersonalDetailsForm);
  $templateCache.put('host-addons.html', hostAddonsForm);
  $templateCache.put('host-total.html', hostTotalTemplate);

});

function totalCtrl($scope, $rootScope, $mdMedia, $window) {
  console.log($scope);

  if (angular.isDefined($scope.$parent.$ctrl))
    $scope.$ctrl = $scope.$parent.$ctrl;

  $scope.$mdMedia = $mdMedia;

  $scope.screenIsBig = function() {
    return $mdMedia('gt-sm');
  }
}

angular.module('abl-payment-summary').directive('bookingTotal', ['$interval', '$compile', function($interval, $compile, $rootScope) {

    function link(scope, element, attrs) {}

    return {
      restrict: 'E',
      link: link,
      scope: {},
      transclude: true,
      controller: 'totalCtrl',
      controllerAs: 'vm',
      bindToController: true,
      compile: function(tElem, tAttrs) {
        return function(scope, iElem, iAttrs) {
          iElem.append(scope.$ctrl.mode == 'host' ? hostTotalsTemplate : activityTotalsTemplate);
          $compile(iElem.contents())(scope);
          console.log('bookingTotal ' + scope.$ctrl.mode, iAttrs, scope);

        }
      }
    };
  }])
  .controller('totalCtrl', totalCtrl);

angular.module('abl-payment-summary').component('paymentSummary', {
    bindings: {
      mode: '@',
      unit: '=',
      activity: '=',
      image: '=',
      checkin: '=',
      checkout: '=',
      charges: '=',
      nights: '=',
      guests: '<',
      title: '=',
      total: '='

    },
    controller: function($scope, $element, $attrs, $mdBottomSheet) {
      //Date formatter for checkin/checkout
      function formatDate(d, f) {
        var date = window.moment(d).format(f);
        return date;
      }

      this.formatDate = formatDate;
      this.availableAddons = [];

      //Guest details form 
      this.guestDetailsExpanded = true;

      this.toggleGuestDetails = function() {
        this.guestDetailsExpanded = !this.guestDetailsExpanded;
        console.log('guestDetailsExpanded', this.guestDetailsExpanded)
        if (this.addonsExpanded == true)
          this.addonsExpanded = false;
      }

      //Addons form 
      this.addonsExpanded = false;
      this.toggleAddons = function() {
        this.addonsExpanded = !this.addonsExpanded;
        if (this.guestDetailsExpanded == true)
          this.guestDetailsExpanded = false;
      }

      //Add-ons
      this.showAddons = false;
      this.toggleShowAddons = function() {
        this.showAddons = !this.showAddons;

      }

      this.adjustAddon = function(i, mode) {
        if (mode == 'up')
          this.availableAddons[i].quantity++;
        if (mode == 'down' && this.availableAddons[i].quantity > 0)
          this.availableAddons[i].quantity--;

      }

      function addonTotal() {
        var total = 0;
        this.availableAddons.forEach(function(e, i) {
          total += (e.amount * e.quantity);
        });
        return total;
      };

      this.addonTotal = addonTotal;

      //Taxes
      this.showTaxes = false;
      this.toggleShowTaxes = function() {
        this.showTaxes = !this.showTaxes;
      }

      function taxTotal() {
        var total = 0;
        this.taxes.forEach(function(e, i) {
          total += e.price;
        });
        return total;
      };

      this.taxTotal = taxTotal;

      this.update = function() {
        this.showGridBottomSheet();
        this.title = this.title + 1;
      }

      this.pay = function() {
        $scope.$emit('pay');
      }

      $scope.$on('paymentResponse', function(e, args) {
        console.log('payment response', args);
      });

      //Initialization function
      this.$onInit = function() {
        console.log(this);

        //If charges are passed, filter/get the taxes
        if (angular.isDefined(this.charges)) {
          this.taxes = this.charges.filter(function(value) {
            return (value['type'] != 'aup');
          });

          this.availableAddons = this.unit.property.charges.filter(function(value) {
            return (value['type'] == 'addon');
          });

          this.availableAddons.forEach(function(e, i) {
            e.quantity = 0;
          })
        }
        //Base price of booking
        this.taxes = this.charges.filter(function(value) {
          return (value['type'] != 'aup');
        });

        if (angular.isDefined(this.charges)) {
          this.base = this.charges.filter(function(value) {
            return (value['type'] == 'aup');
          })[0];
        }
      }
    },
    template: function() {
      return template;
    }
  })
  .component('hostForms', {
    transclude: true,
    controller: function($scope, $element, $attrs) {

      this.$onInit = function() {

        this.name = $attrs.name || '';
        console.log(this, $attrs);
      }

    },
    template: hostFormsTemplate
  }).directive('ablBook', function($sce, $compile, $mdMedia) {
    return {
      restrict: 'E',
      scope: {
        unit: '=',
        language: '=',

        booking: '='
      },
      template: hostTemplate,
      link: function($scope, element, attrs) {
        console.log($scope);
        $scope.$watch('', function(n, o) {
          console.log(n);
        }, true);
      },
      controllerAs: 'vm',
      controller: function($scope, $element, $attrs) {
        console.log('abl-book', $scope, $attrs);
        var vm = this;

        $scope.$mdMedia = $mdMedia;

        $scope.screenIsBig = function() {
          return $mdMedia('gt-sm');
        }

        function formatDate(d, f) {
          var date = window.moment(d).format(f);
          return date;
        }

        this.formatDate = formatDate;
        this.availableAddons = [];

        //Guest details form 
        this.guestDetailsExpanded = true;

        this.toggleGuestDetails = function() {
          this.guestDetailsExpanded = !this.guestDetailsExpanded;
          console.log('guestDetailsExpanded', this.guestDetailsExpanded)
          if (this.addonsExpanded == true)
            this.addonsExpanded = false;
        }

        //Addons form 
        this.addonsExpanded = false;
        this.toggleAddons = function() {
          this.addonsExpanded = !this.addonsExpanded;
          if (this.guestDetailsExpanded == true)
            this.guestDetailsExpanded = false;
        }

        //Add-ons
        this.showAddons = false;
        this.toggleShowAddons = function() {
          this.showAddons = !this.showAddons;

        }

        this.adjustAddon = function(i, mode) {
          if (mode == 'up')
            $scope.booking.addOns[i].quantity++;
          if (mode == 'down' && $scope.booking.addOns[i].quantity > 0)
            $scope.booking.addOns[i].quantity--;

        }

        function addonTotal() {
          var total = 0;
          $scope.booking.addOns.forEach(function(e, i) {
            total += (e.amount * e.quantity);
          });
          return total;
        };

        this.addonTotal = addonTotal;

        //Taxes
        this.showTaxes = false;
        this.toggleShowTaxes = function() {
          this.showTaxes = !this.showTaxes;
        }

        function taxTotal() {
          var total = 0;
          this.taxes.forEach(function(e, i) {
            total += e.price;
          });
          return total;
        };

        this.taxTotal = taxTotal;

        this.update = function() {
          this.showGridBottomSheet();
          this.title = this.title + 1;
        }


        this.availableAddons = $scope.unit.property.charges.filter(function(value) {
          return (value['type'] == 'addon');
        });

        this.availableAddons.forEach(function(e, i) {
          e.quantity = 0;
        })

        //Base price of booking
        this.taxes = $scope.booking['pricing']['charges'].filter(function(value) {
          return (value['type'] != 'aup');
        });

        if (angular.isDefined($scope.booking)) {
          this.base = $scope.booking['pricing']['charges'].filter(function(value) {
            return (value['type'] == 'aup');
          })[0];
        }

        this.payNow = function() {
          $scope.booking.unit = $scope.unit;
          angular.extend($scope.booking, vm.bookingForm);
          $scope.$emit('pay', $scope.booking);
        }

        //If charges are passed, filter/get the taxes
        if (angular.isDefined($scope.booking)) {
          this.taxes = $scope.booking['pricing']['charges'].filter(function(value) {
            return (value['type'] != 'aup');
          });
        }

        vm.bookingResponse = {};
        $scope.$on('paymentResponse', function(e, args) {
          vm.bookingResponse = angular.copy(args);
          console.log('abl-book payment response', args);
        });

      }
    };
  });