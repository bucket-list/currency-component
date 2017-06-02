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
angular.module('abl-payment-summary', ['ngMaterial', 'smDateTimeRangePicker']).run(function($templateCache) {
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

        $scope.$emit('recalculatePricing');
      }

      function addonTotal() {
        var total = 0;
        this.availableAddons.forEach(function(e, i) {
          total += (e.price * e.quantity);
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
  }).directive('ablBook', function($sce, $compile, $mdMedia, $window, $state) {
    return {
      restrict: 'E',
      scope: {
        unit: '=',
        language: '=',
        config: '=',
        booking: '=',
        pricing: '='
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

        $scope.goToState = function(state) {
          $state.go(state);
        }

        var moment = window.moment;


        // Digest on resize to recalculate $mdMedia window size
        function onResize() {
          // console.log('resize');
          $scope.$digest();
        };

        angular.element($window).on('resize', onResize);

        this.lengthOfStay = function() {
          if (angular.isDefined($scope.booking)) {
            var checkin = moment($scope.booking.checkin);
            var checkout = moment($scope.booking.checkout);
            return checkout.diff(checkin, 'days');
          }

          return '1';

        }

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

          console.log('adjust addons', $scope.booking.addOns);
        }

        function addonTotal() {
          var total = 0;
          if (angular.isDefined($scope.booking['addOns'])) {
            $scope.booking['addOns'].forEach(function(e, i) {
              total += (e.price * e.quantity);
            });
          }

          return total;
        };

        this.addonTotal = addonTotal;

        //Taxes
        this.showTaxes = false;
        this.toggleShowTaxes = function() {
          this.showTaxes = !this.showTaxes;
        }



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


        function base() {
          var base = 0;
          if (angular.isDefined($scope.booking['pricing'])) {
            if (angular.isDefined($scope.booking['pricing']['charges'])) {
              base = $scope.booking['pricing']['charges'].filter(function(value) {
                return (value['type'] == 'aup');
              })[0].price;
            }
            //console.log('base', base);
          }
          return base;
        }

        this.base = base;


        this.payNow = function() {
          $scope.booking.unit = $scope.unit;
          angular.extend($scope.booking, vm.bookingForm);
          console.debug('emit pay', $scope.booking);
          $scope.$emit('pay', $scope.booking);
        }

        function taxes() {
          var taxes = [];
          if (angular.isDefined($scope.booking['pricing']['charges'])) {
            taxes = $scope.booking['pricing']['charges'].filter(function(value) {
              return (value['type'] != 'aup');
            });
          }
          return taxes;
        }

        this.taxes = taxes;

        function taxTotal() {
          var total = 0;

          if (angular.isDefined($scope.booking['pricing']['charges'])) {
            $scope.booking['pricing']['charges'].forEach(function(e, i) {
              if (e.type == 'tax' || e.type == 'fee')
                total += (e.price * e.quantity);
            });
          }

          return total;
        };

        this.taxTotal = taxTotal;


        vm.bookingResponse = {};
        $scope.$on('paymentResponse', function(e, args) {
          vm.bookingResponse = angular.copy(args);
          console.log('abl-book payment response', args);
        });

        $scope.$watch('detailsForm', function(newValue, oldValue) {
          console.log('detailsForm watch', newValue, oldValue);
        });

        $scope.$watch('booking.checkin', function(newValue, oldValue) {
          console.log('booking.checkin watch', newValue, oldValue);
          $scope.setCheckInDate(newValue);
        });


        $scope.setCheckInDate = function(d) {
          var newDate = moment(d).format('LL');
          if ($scope.booking.checkin != newDate)
            $scope.booking.checkin = newDate;
          console.log('setCheckInDate', d, newDate, $scope.booking.checkin);

          if (moment(newDate).isAfter(moment($scope.booking.checkout)))
            $scope.booking.checkout = moment(newDate).add(1, 'days');

          $scope.$emit('recalculatePricing');
        }

        $scope.$watch('booking.checkout', function(newValue, oldValue) {
          console.log('booking.checkout watch', newValue, oldValue);
          $scope.setCheckOutDate(newValue);
        });


        $scope.setCheckOutDate = function(d) {
          var newDate = moment(d).format('LL');
          if ($scope.booking.checkout != newDate)
            $scope.booking.checkout = newDate;
          console.log('setCheckOutDate', d, newDate, $scope.booking.checkout);

          if (moment(newDate).isBefore(moment($scope.booking.checkin)))
            $scope.booking.checkin = moment(newDate).subtract(1, 'days');

          $scope.$emit('recalculatePricing');
        }

        $scope.setCheckOutDate($scope.booking.checkout);
        $scope.setCheckInDate($scope.booking.checkin);

      }
    };
  });