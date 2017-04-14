/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _summary = __webpack_require__(1);
	
	var _summary2 = _interopRequireDefault(_summary);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(2);
	
	angular.module('abl-payment-summary', []);
	
	angular.module('abl-payment-summary').component('paymentSummary', {
	  bindings: {
	    booking: '=',
	    unit: '=',
	    language: '='
	  },
	  controller: function controller($scope, $element, $attrs) {
	
	    function getBasePrice() {}
	
	    this.getBasePrice = getBasePrice;
	
	    function formatDate(d, f) {
	      var date = window.moment(d).format(f);
	      return date;
	    }
	
	    this.formatDate = formatDate;
	
	    this.$onInit = function () {
	      console.log(this);
	      this.base = this.booking['pricing']['charges'].filter(function (value) {
	        return value['type'] == 'aup';
	      })[0];
	    };
	  },
	  template: _summary2.default
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = "<md-card class=\"paymentSummaryCard\">\n  <img ng-src=\"{{$ctrl.unit.defaultImage}}\" class=\"md-card-image paymentSummaryImage\" alt=\"Washed Out\">\n    <md-list class=\"\" flex>\n        <md-list-item class=\"md-2-line list-item-48\" ng-click=\"null\">\n          <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n                <span class=\"md-subhead\" ng-style=\"{'font-size': '16px'}\">{{$ctrl.unit.strings[$ctrl.language].title}}</span>\n                <span class=\"md-subhead locationHeader\">{{$ctrl.unit.property.location.streetAddress}}</span>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n              <div class=\"lineItemIcon\">\n              </div>\n              <h4 class=\"\">{{ $ctrl.booking.numberOfNights}} Nights </h4>\n              <div class=\"spacer\"></div>\n                <div class=\"guestIcon\">\n              </div>\n              <h4 class=\"\">{{ $ctrl.booking.numberOfPeople}} People </h4>\n            </div>\n          </div>\n        </md-list-item>\n        <md-divider></md-divider>\n        <md-list-item class=\"\" ng-click=\"null\">\n          <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">Check-In </p>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.booking.checkIn,'LL')}}</p>\n              </div>                                            </div>\n          </div>\n        </md-list-item>\n        <md-list-item class=\"\" ng-click=\"null\">\n          <div class=\"md-list-item-text paymentLineItem md-dense\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">Check-Out </p>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.booking.checkOut,'LL')}}</p>\n              </div>                                               \n            </div>\n          </div>\n        </md-list-item>\n        <md-divider md-inset></md-divider>\n          <md-list-item class=\"md-2-line\" ng-click=\"null\">\n          <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">Base Price </p>\n              <p></p>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">{{$ctrl.base.price / 100}} CFP</p>\n              </div>                                               \n            </div>\n          </div>\n        </md-list-item>\n\n    <md-divider></md-divider>\n    <md-subheader class=\"md-no-sticky\">Add-ons</md-subheader>\n    <md-divider ></md-divider>\n\n    <md-list-item class=\"md-2-line list-item-48\" ng-repeat=\"charge in $ctrl.booking.addOns\" ng-click=\"null\">\n      <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n          <h4>{{ charge.label }} <span style=\"'vertical-align': 'middle'\">x</span> {{ charge.quantity }}</h4>\n          <p class=\"locationHeader\">{{ charge.amount / 100 }} CFP</p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <h4 class=\"\">{{ charge.amount/100 * charge.quantity}} CFP</h4>\n        </div>\n      </div>\n\n      <md-divider md-inset ng-if=\"$index != $ctrl.booking.addOns.length - 1\" ></md-divider>\n      <md-divider ng-if=\"$index == $ctrl.booking.addOns.length - 1\" ></md-divider>\n    </md-list-item>\n\n    <md-subheader class=\"md-no-sticky\">Taxes and Fees</md-subheader>\n    <md-divider></md-divider>\n\n    <md-list-item class=\"md-2-line list-item-48\"  ng-repeat=\"charge in $ctrl.booking.pricing.charges\" ng-click=\"null\">\n      <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n          <h4>{{ charge.label }}{{ charge.quantity }}</h4>\n          <p class=\"locationHeader\">{{ charge.amount / 100 }} CFP</p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <h4 class=\"\">{{ charge.price/100}} CFP</h4>\n        </div>\n      </div>\n      <md-divider md-inset ng-if=\"$index != $ctrl.booking.pricing.charges - 1\" ></md-divider>\n      <md-divider ng-if=\"$index == $ctrl.booking.pricing.charges - 1\" ></md-divider>\n    </md-list-item>\n    </md-list>\n</md-card>";

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=abl-payment-summary.js.map