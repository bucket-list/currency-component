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
	
	var _template = __webpack_require__(1);
	
	var _template2 = _interopRequireDefault(_template);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	__webpack_require__(2);
	
	angular.module('abl-payment-summary', []);
	
	angular.module('abl-payment-summary').component('paymentSummary', {
	    bindings: {
	        unit: '=',
	        activity: '=',
	        checkin: '=',
	        checkout: '=',
	        language: '=',
	        charges: '=',
	        addons: '=',
	        nights: '=',
	        guests: '=',
	        total: '='
	    },
	    controller: function controller($scope, $element, $attrs) {
	
	        //Base price
	        if (angular.isDefined(this.charges)) {
	            this.base = this.charges.filter(function (value) {
	                return value['type'] == 'aup';
	            })[0];
	        }
	
	        //Date formatter for checkin/checkout
	        function formatDate(d, f) {
	            var date = window.moment(d).format(f);
	            return date;
	        }
	
	        this.formatDate = formatDate;
	
	        //Add-ons
	        this.showAddons = false;
	        this.toggleShowAddons = function () {
	            this.showAddons = !this.showAddons;
	        };
	
	        function addonTotal() {
	            var total = 0;
	            this.addons.forEach(function (e, i) {
	                total += e.amount * e.quantity;
	            });
	            return total;
	        };
	
	        this.addonTotal = addonTotal;
	
	        //Taxes
	        this.showTaxes = false;
	        this.toggleShowTaxes = function () {
	            this.showTaxes = !this.showTaxes;
	        };
	
	        if (angular.isDefined(this.charges)) {
	            this.taxes = this.charges.filter(function (value) {
	                return value['type'] != 'aup';
	            });
	        }
	
	        function taxTotal() {
	            var total = 0;
	            this.taxes.forEach(function (e, i) {
	                total += e.price;
	            });
	            return total;
	        };
	
	        this.taxTotal = taxTotal;
	
	        //Initialization function
	        this.$onInit = function () {
	            console.log(this);
	        };
	    },
	    template: _template2.default
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = "<md-card class=\"paymentSummaryCard\">\n  <img ng-src=\"{{$ctrl.unit.defaultImage}}\" class=\"md-card-image paymentSummaryImage\" alt=\"Unit Image\">\n    <md-list class=\"\" flex>\n        <md-list-item class=\"md-2-line list-item-48\">\n          <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n                <span class=\"md-subhead\" ng-style=\"{'font-size': '16px'}\">{{$ctrl.unit.strings[$ctrl.language].title}}</span>\n                <span class=\"md-subhead locationHeader\">{{$ctrl.unit.property.location.streetAddress}}</span>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n              <div class=\"lineItemIcon\">\n              </div>\n              <h4 class=\"\">{{ $ctrl.nights}} Nights </h4>\n              <div class=\"spacer\"></div>\n                <div class=\"guestIcon\">\n              </div>\n              <h4 class=\"\">{{ $ctrl.guests}} People </h4>\n            </div>\n          </div>\n        </md-list-item>\n        <md-divider></md-divider>\n        <md-list-item class=\"\">\n          <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">Check-In </p>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkin,'LL')}}</p>\n              </div>                                            </div>\n          </div>\n        </md-list-item>\n        <md-divider></md-divider>\n        <md-list-item class=\"\">\n          <div class=\"md-list-item-text paymentLineItem md-dense\" layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">Check-Out </p>\n              </div>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n              <div layout=\"column\">\n              <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkout,'LL')}}</p>\n              </div>                                               \n            </div>\n          </div>\n        </md-list-item>\n        <md-divider ng-if=\"$ctrl.base.price\"></md-divider>\n        <md-list-item class=\"\" ng-if=\"$ctrl.base.price\">\n          <div class=\"md-list-item-text paymentLineItem\"  layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <p class=\"lineItemHeader\">Base Price </p>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n              <p class=\"lineItemHeader\">{{$ctrl.base.price / 100}} CFP</p>\n            </div>\n          </div>\n      </md-list-item>  \n\n    <md-divider ng-if=\"$ctrl.addons\"></md-divider>\n    <md-list-item class=\"\" ng-click=\"$ctrl.toggleShowAddons()\" ng-if=\"$ctrl.addons\">\n        <div class=\"md-list-item-text paymentLineItem\"  layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <p class=\"lineItemHeader\">Add-ons</p>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"lineItemHeader\">{{$ctrl.addonTotal() / 100}} CFP</p>\n          </div>\n        </div>\n    </md-list-item>  \n    <md-divider ng-if=\"$ctrl.taxes\"></md-divider>\n\n    <md-list-item class=\"md-2-line list-item-48\" ng-repeat=\"charge in $ctrl.addons\" ng-show=\"$ctrl.showAddons\" ng-if=\"$ctrl.taxes\">\n      <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n          <h4>{{ charge.label }} <span style=\"vertical-align: 'middle'\">x</span> {{ charge.quantity }}</h4>\n          <p class=\"locationHeader\">{{ charge.amount / 100 }} CFP</p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <h4 class=\"\">{{ charge.amount/100 * charge.quantity}} CFP</h4>\n        </div>\n      </div>\n\n      <md-divider md-inset ng-if=\"$index != $ctrl.addOns.length - 1\" ></md-divider>\n      <md-divider ng-if=\"$index == $ctrl.addOns.length - 1\" ></md-divider>\n    </md-list-item>\n\n      <md-list-item class=\"\" ng-if=\"$ctrl.taxes\" ng-click=\"$ctrl.toggleShowTaxes()\" >\n          <div class=\"md-list-item-text paymentLineItem\"  layout=\"row\" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <p class=\"lineItemHeader\">Taxes and Fees </p>\n            </div>\n            <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n              <p class=\"lineItemHeader\">{{$ctrl.taxTotal() / 100}} CFP</p>\n            </div>\n          </div>\n      </md-list-item>  \n    <md-divider></md-divider>\n\n    <md-list-item class=\"md-2-line list-item-48\"  ng-if=\"$ctrl.taxes\" ng-repeat=\"charge in $ctrl.taxes\" ng-show=\"$ctrl.showTaxes\">\n      <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n          <h4>{{ charge.label }}{{ charge.quantity }}</h4>\n          <p class=\"locationHeader\" ng-if=\"!charge.percent\">{{ charge.price / 100 }} CFP</p>\n          <p class=\"locationHeader\" ng-if=\"charge.percent\">{{ charge.percent}} %</p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <h4 class=\"\">{{ charge.price/100}} CFP</h4>\n        </div>\n      </div>\n      <md-divider md-inset ng-if=\"$index !=  $ctrl.taxes - 1\" ></md-divider>\n      <md-divider ng-if=\"$index ==  $ctrl.taxes - 1\" ></md-divider>\n    </md-list-item>\n\n    <md-list-item class=\"\">\n        <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <p class=\"lineItemHeader total\">Total </p>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"lineItemHeader total\">{{$ctrl.total / 100}} CFP</p>\n          </div>\n        </div>\n    </md-list-item>\n\n    </md-list>\n</md-card>";

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);
//# sourceMappingURL=abl-payment-summary.js.map