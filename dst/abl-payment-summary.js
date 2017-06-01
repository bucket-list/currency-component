/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "e39306a22a9d7c8294cc"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
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
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _hostTotals = __webpack_require__(2);
	
	var _hostTotals2 = _interopRequireDefault(_hostTotals);
	
	var _hostTotal = __webpack_require__(3);
	
	var _hostTotal2 = _interopRequireDefault(_hostTotal);
	
	var _hostForms = __webpack_require__(4);
	
	var _hostForms2 = _interopRequireDefault(_hostForms);
	
	var _personalDetails = __webpack_require__(5);
	
	var _personalDetails2 = _interopRequireDefault(_personalDetails);
	
	var _addons = __webpack_require__(6);
	
	var _addons2 = _interopRequireDefault(_addons);
	
	var _totals = __webpack_require__(7);
	
	var _totals2 = _interopRequireDefault(_totals);
	
	var _host = __webpack_require__(8);
	
	var _host2 = _interopRequireDefault(_host);
	
	var _activityTotals = __webpack_require__(9);
	
	var _activityTotals2 = _interopRequireDefault(_activityTotals);
	
	var _activityTotalsMobile = __webpack_require__(10);
	
	var _activityTotalsMobile2 = _interopRequireDefault(_activityTotalsMobile);
	
	var _ablPaymentSummary = __webpack_require__(11);
	
	var _ablPaymentSummary2 = _interopRequireDefault(_ablPaymentSummary);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	angular.module('abl-payment-summary', ['ngMaterial', 'smDateTimeRangePicker']).run(function ($templateCache) {
	  $templateCache.put('host-forms.html', _hostForms2.default);
	  $templateCache.put('host-personal-details.html', _personalDetails2.default);
	  $templateCache.put('host-addons.html', _addons2.default);
	  $templateCache.put('host-total.html', _hostTotal2.default);
	});
	
	function totalCtrl($scope, $rootScope, $mdMedia, $window) {
	  console.log($scope);
	
	  if (angular.isDefined($scope.$parent.$ctrl)) $scope.$ctrl = $scope.$parent.$ctrl;
	
	  $scope.$mdMedia = $mdMedia;
	
	  $scope.screenIsBig = function () {
	    return $mdMedia('gt-sm');
	  };
	}
	
	angular.module('abl-payment-summary').directive('bookingTotal', ['$interval', '$compile', function ($interval, $compile, $rootScope) {
	
	  function link(scope, element, attrs) {}
	
	  return {
	    restrict: 'E',
	    link: link,
	    scope: {},
	    transclude: true,
	    controller: 'totalCtrl',
	    controllerAs: 'vm',
	    bindToController: true,
	    compile: function compile(tElem, tAttrs) {
	      return function (scope, iElem, iAttrs) {
	        iElem.append(scope.$ctrl.mode == 'host' ? _hostTotals2.default : _activityTotals2.default);
	        $compile(iElem.contents())(scope);
	        console.log('bookingTotal ' + scope.$ctrl.mode, iAttrs, scope);
	      };
	    }
	  };
	}]).controller('totalCtrl', totalCtrl);
	
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
	  controller: function controller($scope, $element, $attrs, $mdBottomSheet) {
	    //Date formatter for checkin/checkout
	    function formatDate(d, f) {
	      var date = window.moment(d).format(f);
	      return date;
	    }
	
	    this.formatDate = formatDate;
	    this.availableAddons = [];
	
	    //Guest details form 
	    this.guestDetailsExpanded = true;
	
	    this.toggleGuestDetails = function () {
	      this.guestDetailsExpanded = !this.guestDetailsExpanded;
	      console.log('guestDetailsExpanded', this.guestDetailsExpanded);
	      if (this.addonsExpanded == true) this.addonsExpanded = false;
	    };
	
	    //Addons form 
	    this.addonsExpanded = false;
	    this.toggleAddons = function () {
	      this.addonsExpanded = !this.addonsExpanded;
	      if (this.guestDetailsExpanded == true) this.guestDetailsExpanded = false;
	    };
	
	    //Add-ons
	    this.showAddons = false;
	    this.toggleShowAddons = function () {
	      this.showAddons = !this.showAddons;
	    };
	
	    this.adjustAddon = function (i, mode) {
	      if (mode == 'up') this.availableAddons[i].quantity++;
	      if (mode == 'down' && this.availableAddons[i].quantity > 0) this.availableAddons[i].quantity--;
	
	      $scope.$emit('recalculatePricing');
	    };
	
	    function addonTotal() {
	      var total = 0;
	      this.availableAddons.forEach(function (e, i) {
	        total += e.price * e.quantity;
	      });
	      return total;
	    };
	
	    this.addonTotal = addonTotal;
	
	    //Taxes
	    this.showTaxes = false;
	    this.toggleShowTaxes = function () {
	      this.showTaxes = !this.showTaxes;
	    };
	
	    function taxTotal() {
	      var total = 0;
	      this.taxes.forEach(function (e, i) {
	        total += e.price;
	      });
	      return total;
	    };
	
	    this.taxTotal = taxTotal;
	
	    this.update = function () {
	      this.showGridBottomSheet();
	      this.title = this.title + 1;
	    };
	
	    this.pay = function () {
	      $scope.$emit('pay');
	    };
	
	    $scope.$on('paymentResponse', function (e, args) {
	      console.log('payment response', args);
	    });
	
	    //Initialization function
	    this.$onInit = function () {
	      console.log(this);
	
	      //If charges are passed, filter/get the taxes
	      if (angular.isDefined(this.charges)) {
	        this.taxes = this.charges.filter(function (value) {
	          return value['type'] != 'aup';
	        });
	
	        this.availableAddons = this.unit.property.charges.filter(function (value) {
	          return value['type'] == 'addon';
	        });
	
	        this.availableAddons.forEach(function (e, i) {
	          e.quantity = 0;
	        });
	      }
	      //Base price of booking
	      this.taxes = this.charges.filter(function (value) {
	        return value['type'] != 'aup';
	      });
	
	      if (angular.isDefined(this.charges)) {
	        this.base = this.charges.filter(function (value) {
	          return value['type'] == 'aup';
	        })[0];
	      }
	    };
	  },
	  template: function template() {
	    return _totals2.default;
	  }
	}).component('hostForms', {
	  transclude: true,
	  controller: function controller($scope, $element, $attrs) {
	
	    this.$onInit = function () {
	
	      this.name = $attrs.name || '';
	      console.log(this, $attrs);
	    };
	  },
	  template: _hostForms2.default
	}).directive('ablBook', function ($sce, $compile, $mdMedia, $state) {
	  return {
	    restrict: 'E',
	    scope: {
	      unit: '=',
	      language: '=',
	      config: '=',
	      booking: '=',
	      pricing: '='
	    },
	    template: _host2.default,
	    link: function link($scope, element, attrs) {
	      console.log($scope);
	      $scope.$watch('', function (n, o) {
	        console.log(n);
	      }, true);
	    },
	    controllerAs: 'vm',
	    controller: function controller($scope, $element, $attrs) {
	      console.log('abl-book', $scope, $attrs);
	      var vm = this;
	
	      $scope.goToState = function (state) {
	        $state.go(state);
	      };
	
	      var moment = window.moment;
	
	      this.lengthOfStay = function () {
	        if (angular.isDefined($scope.booking)) {
	          var checkin = moment($scope.booking.checkin);
	          var checkout = moment($scope.booking.checkout);
	          return checkout.diff(checkin, 'days');
	        }
	
	        return '1';
	      };
	
	      $scope.$mdMedia = $mdMedia;
	
	      $scope.screenIsBig = function () {
	        return $mdMedia('gt-sm');
	      };
	
	      function formatDate(d, f) {
	        var date = window.moment(d).format(f);
	        return date;
	      }
	
	      this.formatDate = formatDate;
	      this.availableAddons = [];
	
	      //Guest details form 
	      this.guestDetailsExpanded = true;
	
	      this.toggleGuestDetails = function () {
	        this.guestDetailsExpanded = !this.guestDetailsExpanded;
	        console.log('guestDetailsExpanded', this.guestDetailsExpanded);
	        if (this.addonsExpanded == true) this.addonsExpanded = false;
	      };
	
	      //Addons form 
	      this.addonsExpanded = false;
	      this.toggleAddons = function () {
	        this.addonsExpanded = !this.addonsExpanded;
	        if (this.guestDetailsExpanded == true) this.guestDetailsExpanded = false;
	      };
	
	      //Add-ons
	      this.showAddons = false;
	      this.toggleShowAddons = function () {
	        this.showAddons = !this.showAddons;
	      };
	
	      this.adjustAddon = function (i, mode) {
	        if (mode == 'up') $scope.booking.addOns[i].quantity++;
	        if (mode == 'down' && $scope.booking.addOns[i].quantity > 0) $scope.booking.addOns[i].quantity--;
	
	        console.log('adjust addons', $scope.booking.addOns);
	      };
	
	      function addonTotal() {
	        var total = 0;
	        if (angular.isDefined($scope.booking['addOns'])) {
	          $scope.booking['addOns'].forEach(function (e, i) {
	            total += e.price * e.quantity;
	          });
	        }
	
	        return total;
	      };
	
	      this.addonTotal = addonTotal;
	
	      //Taxes
	      this.showTaxes = false;
	      this.toggleShowTaxes = function () {
	        this.showTaxes = !this.showTaxes;
	      };
	
	      this.update = function () {
	        this.showGridBottomSheet();
	        this.title = this.title + 1;
	      };
	
	      this.availableAddons = $scope.unit.property.charges.filter(function (value) {
	        return value['type'] == 'addon';
	      });
	
	      this.availableAddons.forEach(function (e, i) {
	        e.quantity = 0;
	      });
	
	      function base() {
	        var base = 0;
	        if (angular.isDefined($scope.booking['pricing'])) {
	          if (angular.isDefined($scope.booking['pricing']['charges'])) {
	            base = $scope.booking['pricing']['charges'].filter(function (value) {
	              return value['type'] == 'aup';
	            })[0].price;
	          }
	          //console.log('base', base);
	        }
	        return base;
	      }
	
	      this.base = base;
	
	      this.payNow = function () {
	        $scope.booking.unit = $scope.unit;
	        angular.extend($scope.booking, vm.bookingForm);
	        console.debug('emit pay', $scope.booking);
	        $scope.$emit('pay', $scope.booking);
	      };
	
	      function taxes() {
	        var taxes = [];
	        if (angular.isDefined($scope.booking['pricing']['charges'])) {
	          taxes = $scope.booking['pricing']['charges'].filter(function (value) {
	            return value['type'] != 'aup';
	          });
	        }
	        return taxes;
	      }
	
	      this.taxes = taxes;
	
	      function taxTotal() {
	        var total = 0;
	
	        if (angular.isDefined($scope.booking['pricing']['charges'])) {
	          $scope.booking['pricing']['charges'].forEach(function (e, i) {
	            if (e.type == 'tax' || e.type == 'fee') total += e.price * e.quantity;
	          });
	        }
	
	        return total;
	      };
	
	      this.taxTotal = taxTotal;
	
	      vm.bookingResponse = {};
	      $scope.$on('paymentResponse', function (e, args) {
	        vm.bookingResponse = angular.copy(args);
	        console.log('abl-book payment response', args);
	      });
	
	      $scope.$watch('detailsForm', function (newValue, oldValue) {
	        console.log('detailsForm watch', newValue, oldValue);
	      });
	
	      $scope.$watch('booking.checkin', function (newValue, oldValue) {
	        console.log('booking.checkin watch', newValue, oldValue);
	        $scope.setCheckInDate(newValue);
	      });
	
	      $scope.setCheckInDate = function (d) {
	        var newDate = moment(d).format('LL');
	        if ($scope.booking.checkin != newDate) $scope.booking.checkin = newDate;
	        console.log('setCheckInDate', d, newDate, $scope.booking.checkin);
	
	        if (moment(newDate).isAfter(moment($scope.booking.checkout))) $scope.booking.checkout = moment(newDate).add(1, 'days');
	
	        $scope.$emit('recalculatePricing');
	      };
	
	      $scope.$watch('booking.checkout', function (newValue, oldValue) {
	        console.log('booking.checkout watch', newValue, oldValue);
	        $scope.setCheckOutDate(newValue);
	      });
	
	      $scope.setCheckOutDate = function (d) {
	        var newDate = moment(d).format('LL');
	        if ($scope.booking.checkout != newDate) $scope.booking.checkout = newDate;
	        console.log('setCheckOutDate', d, newDate, $scope.booking.checkout);
	
	        if (moment(newDate).isBefore(moment($scope.booking.checkin))) $scope.booking.checkin = moment(newDate).subtract(1, 'days');
	
	        $scope.$emit('recalculatePricing');
	      };
	
	      $scope.setCheckOutDate($scope.booking.checkout);
	      $scope.setCheckInDate($scope.booking.checkin);
	    }
	  };
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = "<div ng-show=\"screenIsBig()\" layout=\"row\" layout-align=\"center start\" flex=\"100\">\n  <div ng-include=\"'host-forms.html'\"></div>\n  <div layout=\"column\" layout-align=\"space-around stretch\">\n    <md-card class=\"paymentSummaryCard\">\n      <div class=\"paymentSummaryImage\" ng-style=\"{'background-image': 'url({{$ctrl.image}})'}\">\n      </div>\n    </md-card>\n    <md-card class=\"paymentSummaryCard\" layout-margin>\n      <md-list class=\" \" flex>\n        <md-list-item class=\"md-2-line list-item-48 paymentHeader \" ng-click=\"$ctrl.showGridBottomSheet(); \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\"paymentTitle \" ng-style=\"{ 'font-size': '16px'} \">{{$ctrl.title}}</p>\n                <span class=\"md-subhead locationHeader \">{{$ctrl.unit.property.location.streetAddress}}</span>\n              </div>\n            </div>\n\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <div class=\"lineItemIcon \">\n              </div>\n              <p class=\" \">{{ $ctrl.nights}} Nights </p>\n              <div class=\"spacer \"></div>\n              <div class=\"guestIcon \">\n              </div>\n              <p class=\" \">{{ $ctrl.guests}} People </p>\n            </div>\n          </div>\n        </md-list-item>\n        <!--<md-divider class=\"darkerDivider \"></md-divider>-->\n        <md-list-item class=\"lineItemHeader \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\" \">Check-In </p>\n              </div>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n\n              <div layout=\"column \">\n                <p class=\"lineItemHeader \">{{$ctrl.formatDate($ctrl.checkin,'LL')}}</p>\n              </div>\n            </div>\n          </div>\n        </md-list-item>\n        <md-list-item class=\"lineItemHeader \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\" \">Check-Out </p>\n              </div>\n            </div>\n\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\"lineItemHeader \">{{$ctrl.formatDate($ctrl.checkout,'LL')}}</p>\n              </div>\n            </div>\n          </div>\n        </md-list-item>\n        <md-divider ng-if=\"$ctrl.base \"></md-divider>\n        <md-list-item class=\"lineItemHeader \" ng-if=\"$ctrl.base \">\n          <div class=\"md-list-item-text paymentLineItem \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\" \">Base Price </p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{$ctrl.base.price / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n\n\n        <!--<md-divider ng-if=\"$ctrl.addons \"></md-divider>-->\n        <md-list-item class=\"lineItemHeader \" ng-click=\"$ctrl.toggleShowAddons() \" ng-if=\"$ctrl.addons \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\" \">Add-ons</p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{$ctrl.addonTotal() / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n        <!--<md-divider ng-if=\"$ctrl.taxes \"></md-divider>-->\n\n        <md-list-item class=\"list-item-48 lineItemDetail \" ng-repeat=\"charge in $ctrl.addons \" ng-show=\"$ctrl.showAddons \" ng-if=\"$ctrl.taxes \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"row \">\n                <p>{{ charge.label }} <span style=\"vertical-align: 'middle' \">x</span> {{ charge.quantity }}</p>\n                <!--<p class=\" \">{{ charge.amount / 100 }} CFP</p>-->\n              </div>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{ charge.amount/100 * charge.quantity}} CFP</p>\n            </div>\n          </div>\n\n          <!--<md-divider md-inset ng-if=\"$index !=$ ctrl.addons.length - 1 \" class=\"lineItemDetailDivider \"></md-divider>\n          <md-divider ng-if=\"$index==$ ctrl.addons.length - 1 \"></md-divider>-->\n        </md-list-item>\n\n        <md-list-item class=\"lineItemHeader \" ng-if=\"$ctrl.taxes \" ng-click=\"$ctrl.toggleShowTaxes() \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\" \">Taxes and Fees </p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{$ctrl.taxTotal() / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n        <!--<md-divider ng-if=\"!$ctrl.showTaxes \" class=\"totalDivider \"></md-divider>\n        <md-divider ng-if=\"$ctrl.showTaxes \"></md-divider>-->\n\n        <md-list-item class=\"list-item-48 lineItemDetail \" ng-if=\"$ctrl.taxes \" ng-repeat=\"charge in $ctrl.taxes \" ng-show=\"$ctrl.showTaxes \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"row \">\n                <p class=\" \">{{ charge.label }}{{ charge.quantity }}</p>\n                <!--<p class=\"lineItemDetail \" ng-if=\"!charge.percent \"> {{ charge.price / 100 }} CFP</p>-->\n                <p class=\" \" ng-if=\"charge.percent \">&nbsp; {{ charge.percent}}%</p>\n              </div>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\"lineItemDetail \">{{ charge.price/100}} CFP</p>\n            </div>\n          </div>\n          <!--<md-divider md-inset ng-if=\"$index !=$ ctrl.taxes.length - 1 \" class=\"lineItemDetailDivider \"></md-divider>-->\n          <!--<md-divider ng-if=\"$index==$ ctrl.taxes.length - 1 \" class=\"darkerDivider \"></md-divider>-->\n        </md-list-item>\n\n        <md-list-item class=\"total \">\n          <div class=\"md-list-item-text \" layout=\"row \" layout-align=\"space-between center \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\"total \">Total </p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\"total \">{{$ctrl.total / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n\n      </md-list>\n    </md-card>\n  </div>\n</div>\n\n<div ng-show=\"!screenIsBig() \" ng-include=\" 'host-totals-mobile.html' \" class=\"mobileList \" layout=\"row \" layout-align=\"center stretch \" layout-fill flex=\"100 \">\n\n</div>";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = "<md-card class=\"paymentSummaryCard\" ng-if=\"screenIsBig()\">\n  <div class=\"paymentSummaryImageBig\" ng-style=\"{'background-image': 'url({{unit.defaultImage}})'}\">\n  </div>\n</md-card>\n\n<md-card class=\"paymentSummaryCard\">\n  <md-list class=\"\" flex>\n    <md-list-item class=\"paymentHeader md-2-line \" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\">\n      <div layout=\"row\" class=\"md-list-item-text \" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\" class=\"formHeader\">\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <ng-md-icon class=\"headerIcon\" icon=\"local_offer\" class=\"listIcon \"></ng-md-icon>\n\n              <span class=\"paymentSubTitle\">Booking Summary</span>\n            </div>\n\n\n          </div>\n        </div>\n\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <div layout=\"column \" layout-align=\"center end \" flex>\n            <!--<ng-md-icon icon=\"payment \" class=\"listIcon \"></ng-md-icon>-->\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n\n    <!--<md-divider ng-if=\"vm.base \"></md-divider>-->\n    <md-list-item class=\"lineItemHeader \" ng-if=\"vm.base \" ng-click=\"null\">\n      <div class=\"md-list-item-text  \" layout=\"row \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <p class=\" \">Base Price </p>\n        </div>\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <p class=\" \">{{vm.base() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n\n\n    <!--<md-divider ng-if=\"vm.addons \"></md-divider>-->\n    <md-list-item class=\"lineItemHeader \" ng-click=\"vm.toggleShowAddons() \" ng-if=\"vm.addonTotal() > 0\">\n      <div class=\"md-list-item-text \" layout=\"row \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <p class=\" \">Add-ons</p>\n        </div>\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <p class=\" \">{{vm.addonTotal() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider ng-if=\"vm.taxes \"></md-divider>-->\n\n    <div ng-repeat=\"charge in booking.addOns \" ng-show=\"vm.showAddons \" ng-if=\"booking.addOns.length > 0\">\n      <md-list-item class=\"list-item-48 lineItemDetail\" ng-if=\"charge.quantity > 0\">\n        <div class=\"md-list-item-text \" layout=\"row \" flex>\n          <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n            <div layout=\"row \">\n              <p>{{ charge.label }} <span style=\"vertical-align: 'middle' \">x</span> {{ charge.quantity }}</p>\n              <!--<p class=\" \">{{ charge.amount / 100 }} CFP</p>-->\n            </div>\n          </div>\n          <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n            <p class=\" \">{{ charge.price/100 * charge.quantity}} CFP</p>\n          </div>\n        </div>\n\n        <!--<md-divider md-inset ng-if=\"$index !=$ ctrl.addons.length - 1 \" class=\"lineItemDetailDivider \"></md-divider>\n          <md-divider ng-if=\"$index==$ ctrl.addons.length - 1 \"></md-divider>-->\n      </md-list-item>\n    </div>\n    <md-list-item class=\"lineItemHeader \" ng-if=\"booking.taxes.length > 0\" ng-click=\"vm.toggleShowTaxes() \">\n      <div class=\"md-list-item-text \" layout=\"row \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <p class=\" \">Taxes and Fees </p>\n        </div>\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <p class=\" \">{{vm.taxTotal() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider ng-if=\"!vm.showTaxes \" class=\"totalDivider \"></md-divider>\n        <md-divider ng-if=\"vm.showTaxes \"></md-divider>-->\n    <div ng-repeat=\"charge in booking.pricing.charges\" ng-show=\"vm.showTaxes\">\n      <md-list-item class=\"list-item-48 lineItemDetail\" ng-if=\"charge.type == 'tax' || charge.type =='fee'\">\n        <div class=\"md-list-item-text \" layout=\"row \" flex>\n          <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n            <div layout=\"row \">\n              <p class=\" \">{{ charge.label }}</p>\n              <!--<p class=\"lineItemDetail \" ng-if=\"!charge.percent \"> {{ charge.price / 100 }} CFP</p>-->\n              <p class=\"\" ng-if=\"charge.percent \">&nbsp; {{ charge.percent}}%</p>\n            </div>\n          </div>\n          <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n            <p class=\"lineItemDetail \">{{ charge.price/100}} CFP</p>\n          </div>\n        </div>\n        <!--<md-divider md-inset ng-if=\"$index !=$ ctrl.taxes.length - 1 \" class=\"lineItemDetailDivider \"></md-divider>-->\n        <!--<md-divider ng-if=\"$index==$ ctrl.taxes.length - 1 \" class=\"darkerDivider \"></md-divider>-->\n      </md-list-item>\n    </div>\n    <!--<md-divider></md-divider>-->\n\n    <md-list-item class=\"paymentHeader md-2-line total \" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\">\n      <div class=\"md-list-item-text \" layout=\"row \" layout-align=\"space-between center \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <span class=\"total \">Total </span>\n        </div>\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <span class=\"total \">{{booking.pricing.total / 100 + vm.addonTotal() / 100 | number:2}} CFP</span>\n        </div>\n      </div>\n    </md-list-item>\n  </md-list>\n</md-card>\n<md-card class=\"paymentSummaryCard\">\n  <md-list>\n\n\n    <div ng-show=\"booking.paymentResponse == 'success'\">\n      <md-list-item class=\"paymentHeader md-2-line md-primary\" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\">\n        <div layout=\"row\" class=\"md-list-item-text \" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\" md-colors=\"{color: 'primary'}\">\n            <ng-md-icon class=\"headerIcon\" icon=\"payment\" class=\"listIcon \"></ng-md-icon>\n\n            <span class=\"paymentSubTitle total\">Payment Complete</span>\n          </div>\n          <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n            <span class=\"paymentSubTitle total\" md-colors=\"{color: 'green'}\"></span>\n\n            <ng-md-icon icon=\"check\" class=\"listIcon \" md-colors=\"{fill: 'green'}\"></ng-md-icon>\n\n          </div>\n        </div>\n      </md-list-item>\n      <md-list-item>\n        <div layout=\"row\" layout-wrap>\n\n          <p class=\"listMessage\">An e-mail will be sent to {{booking.email }} with details about your reservation.</p>\n        </div>\n      </md-list-item>\n      <md-list-item>\n        <div layout=\"row\" layout-align=\"end center\" flex>\n          <md-button class=\"md-raised md-primary\" ng-click=\"goToState('home');\">Return</md-button>\n\n        </div>\n      </md-list-item>\n    </div>\n\n    <div ng-show=\"paymentResponse == 'failed'\">\n\n      <md-list-item class=\"paymentHeader md-2-line md-primary\" md-colors=\"{color: 'primary'}\" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\">\n        <div layout=\"row\" class=\"md-list-item-text \" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\" md-colors=\"{color: 'warn'}\">\n            <ng-md-icon class=\"headerIcon\" icon=\"payment\" class=\"listIcon \"></ng-md-icon>\n\n            <span class=\"paymentSubTitle total\">Payment Failed</span>\n          </div>\n          <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n            <span class=\"paymentSubTitle total\" md-colors=\"{color: 'warn'}\"></span>\n\n            <ng-md-icon icon=\"error\" class=\"listIcon \" md-colors=\"{fill: 'warn'}\"></ng-md-icon>\n\n          </div>\n        </div>\n      </md-list-item>\n\n      <md-list-item>\n        <div layout=\"row\" layout-wrap>\n\n          <p class=\"listMessage\">Your credit card has been declined. Please confirm the information you provided is correct and try again.</p>\n        </div>\n      </md-list-item>\n      <md-list-item>\n        <div layout=\"row\" layout-align=\"end center\" flex>\n          <md-button class=\"md-raised md-primary\" ng-click=\"vm.payNow();\">Try Again</md-button>\n\n        </div>\n      </md-list-item>\n    </div>\n\n\n    <div ng-show=\"paymentResponse == 'processing'\">\n\n      <md-list-item class=\"paymentHeader md-2-line md-primary\" md-colors=\"{color: 'primary'}\" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\">\n\n        <div layout=\"row\" class=\"md-list-item-text \" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex layout-grow md-colors=\"{color: 'primary'}\">\n            <ng-md-icon class=\"headerIcon\" icon=\"payment\" class=\"listIcon \"></ng-md-icon>\n\n            <span class=\"paymentSubTitle total\">Payment Processing</span>\n          </div>\n          <div layout=\"row \" layout-align=\"end center \">\n            <span class=\"paymentSubTitle total\" md-colors=\"{color: 'green'}\"></span>\n\n            <ng-md-icon icon=\"watch_later\" class=\"listIcon \" md-colors=\"{fill: 'amber'}\"></ng-md-icon>\n\n          </div>\n        </div>\n      </md-list-item>\n      <md-list-item>\n        <div layout=\"row\" layout-wrap>\n\n          <p class=\"listMessage\">Your booking payment is still processing. An e-mail will be sent to {{booking.email }} with details about your reservation.</p>\n        </div>\n\n      </md-list-item>\n      <md-list-item>\n        <div layout=\"row\" layout-align=\"end center\" flex>\n          <md-button class=\"md-raised md-primary\" ng-click=\"goToState('home');\">Return</md-button>\n\n        </div>\n      </md-list-item>\n    </div>\n  </md-list>\n\n</md-card>";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = "<md-card class=\"paymentSummaryCard\" ng-if=\"!screenIsBig()\">\n  <div class=\"paymentSummaryImage\" ng-style=\"{'background-image': 'url({{unit.defaultImage}})'}\">\n  </div>\n</md-card>\n\n<md-card class=\"paymentSummaryCard\" layout-margin>\n  <md-list class=\" \" flex>\n    <md-list-item class=\"md-2-line paymentHeader listItemNotButton\">\n      <div class=\"md-list-item-text \" layout=\"row \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <div layout=\"column \">\n            <p class=\"paymentTitle \" ng-style=\"{ 'font-size': '16px'} \">{{unit.strings[language].title}}</p>\n            <span class=\"md-subhead locationHeader \">{{unit.property.location.streetAddress}}</span>\n          </div>\n        </div>\n\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <div class=\"lineItemIcon \">\n          </div>\n          <p class=\" \">{{ vm.lengthOfStay() }} {{ vm.lengthOfStay() == '1' ? 'Night' : 'Nights' }} </p>\n          <div class=\"spacer \"></div>\n          <div class=\"guestIcon \">\n          </div>\n          <p class=\" \">{{ booking.numberOfPeople}} {{ booking.numberOfPeople == '1' ? 'Person' : 'People'}} </p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider class=\"darkerDivider \"></md-divider>-->\n    <md-list-item class=\"lineItemHeader listItemNotButton\">\n      <div class=\"md-list-item-text \" layout=\"row \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <div layout=\"column \">\n            <p class=\" \">Check-In </p>\n          </div>\n        </div>\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n\n          <div layout=\"row\">\n            <p class=\"lineItemHeader\" flex>{{vm.formatDate(booking.checkin,'LL')}}</p>\n            <sm-date-time-picker fname=\"field\" ng-model=\"booking.checkin\" is-required=\"{{true}}\" format=\"LL\" mode=\"date\" close-on-select=\"true\" inputtype=\"input\" week-start-day=\"Monday\" on-date-selected-call=\"setCheckInDate(date)\">\n            </sm-date-time-picker>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-list-item class=\"lineItemHeader listItemNotButton\">\n      <div class=\"md-list-item-text \" layout=\"row \" flex>\n        <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n          <div layout=\"column \">\n            <p class=\" \">Check-Out </p>\n          </div>\n        </div>\n\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <div layout=\"row \">\n            <p class=\"lineItemHeader \">{{vm.formatDate(booking.checkout,'LL')}}</p>\n            <sm-date-time-picker fname=\"field\" ng-model=\"booking.checkout\" is-required=\"{{true}}\" format=\"LL\" mode=\"date\" close-on-select=\"true\" inputtype=\"input\" week-start-day=\"Monday\" on-date-selected-call=\"setCheckOutDate(date)\">\n            </sm-date-time-picker>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-list>\n</md-card>\n\n\n\n<md-card class=\"paymentSummaryCard\">\n  <md-list class=\"\" flex>\n    <md-divider></md-divider>\n\n    <md-list-item class=\"paymentHeader md-2-line \" ng-click=\"vm.toggleGuestDetails()\" ng-mouseleave=\"guestDetailsHover = 0\" ng-mouseenter=\"guestDetailsHover = 1\" ng-init=\"guestDetailsHover=0\">\n      <div layout=\"row\" class=\"md-list-item-text \" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\" class=\"formHeader\">\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <ng-md-icon class=\"headerIcon\" icon=\"filter_1\" class=\"listIcon \"></ng-md-icon>\n              <span class=\"paymentSubTitle\">Guest Details</span>\n            </div>\n            <!--<div layout=\"row\" class=\"stepStatusRow\">\n              <span class=\"md-subhead locationHeader \">Complete</span>\n              <ng-md-icon icon=\"check\"></ng-md-icon>\n\n            </div>-->\n\n          </div>\n        </div>\n\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <div layout=\"column \" layout-align=\"center end \" flex>\n            <ng-md-icon ng-show=\"guestDetailsHover\" icon=\"{{vm.guestDetailsExpanded ? 'expand_less' : 'expand_more'}}\" class=\"listIcon \"></ng-md-icon>\n\n            <ng-md-icon ng-show=\"!guestDetailsHover && detailsForm.$valid\" icon=\"check\" class=\"listIcon \"></ng-md-icon>\n\n            <ng-md-icon ng-show=\"!guestDetailsHover && detailsForm.$invalid\" icon=\"{{vm.guestDetailsExpanded ? 'radio_button_checked' : 'radio_button_unchecked'}}\" class=\"listIcon \"></ng-md-icon>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <div ng-show=\"vm.guestDetailsExpanded\">\n      <div class=\"cardForm\" layout-margin>\n\n        <form name=\"detailsForm\" no-validate>\n          <md-input-container class=\"md-block\">\n            <label>Full Name</label>\n            <input name=\"name\" ng-model=\"vm.bookingForm.fullName\" required type=\"text\" md-maxlength=\"100\" ng-minlength=\"3\" />\n            <div ng-messages=\"detailsForm.fullName.$error\">\n              <div ng-message=\"required\">This is required.</div>\n              <div ng-message=\"minlength\">The name must be at least 3 characters long.</div>\n              <div ng-message=\"md-maxlength\">The name must be less than 100 characters long.</div>\n            </div>\n          </md-input-container>\n\n          <md-input-container class=\"md-block\">\n            <label>E-mail</label>\n            <input name=\"email\" ng-model=\"vm.bookingForm.email\" required type=\"email\" md-maxlength=\"100\" />\n            <div ng-messages=\"detailsForm.email.$error\">\n              <div ng-message=\"required\">This is required.</div>\n              <div ng-message=\"email\">You must enter a valid e-mail address.</div>\n              <div ng-message=\"md-maxlength\">The e-mail must be less than 100 characters long.</div>\n            </div>\n          </md-input-container>\n\n          <md-input-container class=\"md-block\">\n            <label>Phone</label>\n            <input ng-model=\"vm.bookingForm.phone\" required type=\"phone\" />\n          </md-input-container>\n\n          <md-input-container class=\"md-block\">\n            <label>Notes</label>\n            <textarea ng-model=\"vm.bookingForm.notes\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus></textarea>\n          </md-input-container>\n\n\n        </form>\n      </div>\n\n      <!--<md-list-item class=\"md-2-line md-primary\" ng-click=\"vm.payNow();\" md-colors=\"{color: 'primary'}\" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\">\n        <div layout=\"row\" class=\"md-list-item-text \" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\" md-colors=\"{color: 'primary'}\">\n\n          </div>\n          <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n            <ng-md-icon class=\"headerIcon\" icon=\"next\" class=\"listIcon \" md-colors=\"{fill: 'primary'}\"></ng-md-icon>\n\n            <span class=\"paymentSubTitle total\" md-colors=\"{color: 'primary'}\">Next</span>\n          </div>\n        </div>\n      </md-list-item>-->\n\n    </div>\n\n    <md-divider ng-if=\"!vm.guestDetailsExpanded\"></md-divider>\n\n  </md-list>\n  <md-list class=\"\" flex ng-disabled=\"detailsForm.$invalid\">\n    <md-list-item class=\"paymentHeader md-2-line \" ng-click=\"vm.toggleAddons(); vm.addonsSelected = 1\" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\" ng-disabled=\"detailsForm.$invalid\" ng-show=\"booking.addOns.length > 0\">\n      <div layout=\"row\" class=\"md-list-item-text \" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\" class=\"formHeader\">\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <ng-md-icon class=\"headerIcon\" icon=\"filter_2\" class=\"listIcon \"></ng-md-icon>\n              <span class=\"paymentSubTitle\">Add-ons</span>\n            </div>\n            <!--<div layout=\"row\" class=\"stepStatusRow\">\n              <span class=\"md-subhead locationHeader \">Complete</span>\n              <ng-md-icon icon=\"check\"></ng-md-icon>\n\n            </div>-->\n\n          </div>\n        </div>\n\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <div layout=\"column \" layout-align=\"center end \" flex>\n            <ng-md-icon ng-show=\"vm.addOnsSelected == 1\" icon=\"check\" class=\"listIcon \"></ng-md-icon>\n            <ng-md-icon ng-show=\"addOnsHover\" icon=\"{{vm.addonsExpanded ? 'expand_less' : 'expand_more'}}\" class=\"listIcon \"></ng-md-icon>\n            <ng-md-icon ng-show=\"!addOnsHover && vm.addonsSelected\" icon=\"check\" class=\"listIcon \"></ng-md-icon>\n\n            <ng-md-icon ng-show=\"!addOnsHover && !vm.addonsSelected\" icon=\"{{vm.addonsExpanded ? 'radio_button_checked' : 'radio_button_unchecked'}}\" class=\"listIcon \"></ng-md-icon>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <div class=\"addonForm\" ng-show=\"vm.addonsExpanded && booking.addOns.length > 0\">\n      <div ng-repeat=\"addon in booking.addOns\">\n        <md-list-item class=\"md-2-line addOnListItem\">\n          <div layout=\"row\" class=\"md-list-item-text \" flex>\n            <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n              <div layout=\"column\" class=\"\">\n                <span class=\"lineItemSubHeader\">{{addon.label}}</span>\n\n                <div layout=\"row\" class=\"\">\n                  <span class=\"lineItemSubDetail \">{{addon.price/ 100}} CFP</span>\n                  <!--<ng-md-icon icon=\"check\"></ng-md-icon>-->\n\n                </div>\n\n              </div>\n            </div>\n\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <div layout=\"column \" class=\"addOnAdjusters\" layout-align=\"center end \" flex layout-grow>\n                <ng-md-icon icon=\"add_circle_outline\" class=\"listIconSub\" ng-click=\"vm.adjustAddon($index,'up');\"> </ng-md-icon>\n                <ng-md-icon icon=\" remove_circle_outline \" class=\"listIconSub\" ng-click=\"vm.adjustAddon($index,'down');\"></ng-md-icon>\n              </div>\n\n              <div layout=\"column\" layout-align=\"end end \">\n                <input class='addOnQuantityText' ng-model=\"addon.quantity \"></input>\n              </div>\n            </div>\n          </div>\n        </md-list-item>\n      </div>\n    </div>\n    <md-divider ng-if=\"!vm.addonsExpanded && booking.addOns.length > 0\"></md-divider>\n    <md-list-item class=\"paymentHeader md-2-line md-primary\" ng-click=\"vm.payNow();\" ng-mouseleave=\"addOnsHover = 0\" ng-mouseenter=\"addOnsHover = 1\" ng-init=\"addOnsHover=0\" ng-show=\"booking.paymentResponse == ''\" ng-disabled=\"detailsForm.$invalid\">\n      <div layout=\"row\" class=\"md-list-item-text \" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <ng-md-icon class=\"headerIcon\" icon=\"filter_3\" class=\"listIcon \" ng-if=\"booking.addOns.length > 0\"></ng-md-icon>\n          <ng-md-icon class=\"headerIcon\" icon=\"filter_2\" class=\"listIcon \" ng-if=\"booking.addOns.length < 1\"></ng-md-icon>\n\n          <span class=\"paymentSubTitle total\">Pay</span>\n        </div>\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <span class=\"paymentSubTitle total\"></span>\n\n          <ng-md-icon icon=\"input\" class=\"listIcon \"></ng-md-icon>\n\n        </div>\n      </div>\n    </md-list-item>\n\n\n  </md-list>\n\n\n</md-card>";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = "<form name=\"detailsForm\" no-validate>\n  <md-input-container class=\"md-block\">\n    <label>Full Name</label>\n    <input name=\"name\" ng-model=\"$ctrl.bookingForm.name\" required type=\"text\" md-maxlength=\"100\" ng-minlength=\"3\" />\n    <div ng-messages=\"detailsForm.name.$error\">\n      <div ng-message=\"required\">This is required.</div>\n      <div ng-message=\"minlength\">The name must be at least 3 characters long.</div>\n      <div ng-message=\"md-maxlength\">The name must be less than 100 characters long.</div>\n    </div>\n  </md-input-container>\n\n  <md-input-container class=\"md-block\">\n    <label>E-mail</label>\n    <input name=\"email\" ng-model=\"bookingForm.email\" required type=\"email\" md-maxlength=\"100\" />\n    <div ng-messages=\"detailsForm.email.$error\">\n      <div ng-message=\"required\">This is required.</div>\n      <div ng-message=\"email\">You must enter a valid e-mail address.</div>\n      <div ng-message=\"md-maxlength\">The e-mail must be less than 100 characters long.</div>\n    </div>\n  </md-input-container>\n\n  <md-input-container class=\"md-block\">\n    <label>Phone</label>\n    <input ng-model=\"personalDetailsForm.phone\" required type=\"phone\" />\n  </md-input-container>\n\n  <md-input-container class=\"md-block\">\n    <label>Notes</label>\n    <textarea ng-model=\"bookingForm.notes\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus></textarea>\n  </md-input-container>\n\n\n</form>";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "<div ng-repeat=\"addon in $ctrl.availableAddons\">\n  <md-list-item class=\"md-2-line\">\n    <div layout=\"row\" class=\"md-list-item-text \" flex>\n      <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n        <div layout=\"column\" class=\"\">\n          <span class=\"lineItemSubHeader\">{{addon.label}}</span>\n\n          <div layout=\"row\" class=\"\">\n            <span class=\"lineItemSubDetail \">{{addon.amount/ 100}} CFP</span>\n            <!--<ng-md-icon icon=\"check\"></ng-md-icon>-->\n\n          </div>\n\n        </div>\n      </div>\n\n      <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n        <div layout=\"column \" layout-align=\"center end \" flex>\n          <ng-md-icon icon=\"add_circle_outline\" class=\"listIconSub\" ng-click=\"$ctrl.adjustAddon($index,'up');\"> </ng-md-icon>\n          <ng-md-icon icon=\" remove_circle_outline \" class=\"listIconSub\" ng-click=\"$ctrl.adjustAddon($index,'down');\"></ng-md-icon>\n        </div>\n\n        <div layout=\"column \" layout-align=\"end end \">\n          <input class='addOnQuantityText' ng-model=\"addon.quantity \"></input>\n        </div>\n      </div>\n    </div>\n  </md-list-item>\n</div>";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = "<payment-details></payment-details>\n<booking-total></booking-total>";

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = "<div ng-show=\"screenIsBig()\" layout=\"row\" layout-align=\"center start\" flex=\"100\">\n  <div layout=\"row\" layout-align=\"center start\" flex=\"100\">\n    <div layout-align=\"center stretch\" flex=\"100\" class=\"paymentSummaryCardLarge\">\n      <div ng-include=\"'host-forms.html'\"></div>\n    </div>\n    <div layout-align=\"center stretch\" flex=\"100\" class=\"paymentSummaryCardLarge\">\n\n      <div ng-include=\"'host-total.html'\"></div>\n    </div>\n  </div>\n</div>\n\n<div ng-show=\"!screenIsBig()\" layout=\"row\" layout-align=\"center start\" flex=\"100\">\n  <div layout=\"row\" layout-align=\"center start\" flex=\"100\">\n    <div layout=\"column\" class=\"paymentSummaryCard\" layout-align=\"center stretch\" flex=\"100\">\n      <div ng-include=\"'host-forms.html'\"></div>\n      <div ng-include=\"'host-total.html'\"></div>\n    </div>\n  </div>\n</div>";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = "<md-card class=\"paymentSummaryCard\">\n  <div class=\"paymentSummaryImage\" ng-style=\"{'background-image': 'url({{$ctrl.image}})'}\">\n  </div>\n  <md-list class=\"\" flex>\n    <md-list-item class=\"md-2-line list-item-48 paymentHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"paymentTitle\">{{$ctrl.title}}</p>\n            <span class=\"md-subhead locationHeader\">{{$ctrl.unit.property.location.streetAddress}}</span>\n          </div>\n        </div>\n\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <div class=\"lineItemIcon\">\n          </div>\n          <p class=\"\">{{ $ctrl.nights}} Nights </p>\n          <div class=\"spacer\"></div>\n          <div class=\"guestIcon\">\n          </div>\n          <p class=\"\">{{ $ctrl.guests}} People </p>\n        </div>\n      </div>\n    </md-list-item>\n    <md-divider class=\"darkerDivider\"></md-divider>\n    <md-list-item class=\"lineItemHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"\">Check-In </p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n          <div layout=\"column\">\n            <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkin,'LL')}}</p>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-list-item class=\"lineItemHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"\">Check-Out </p>\n          </div>\n        </div>\n\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkout,'LL')}}</p>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-divider ng-if=\"$ctrl.base\"></md-divider>\n    <md-list-item class=\"lineItemHeader\" ng-if=\"$ctrl.base\">\n      <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"\">Base Price </p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{$ctrl.base.price / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n\n\n    <md-divider ng-if=\"$ctrl.addons\"></md-divider>\n    <md-list-item class=\"lineItemHeader\" ng-click=\"$ctrl.toggleShowAddons()\" ng-if=\"$ctrl.addons\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"\">Add-ons</p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{$ctrl.addonTotal() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider ng-if=\"$ctrl.taxes\"></md-divider>-->\n\n    <md-list-item class=\"list-item-48 lineItemDetail\" ng-repeat=\"charge in $ctrl.addons\" ng-show=\"$ctrl.showAddons\" ng-if=\"$ctrl.taxes\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"row\">\n            <p>{{ charge.label }} <span style=\"vertical-align: 'middle'\">x</span> {{ charge.quantity }}</p>\n            <!--<p class=\"\">{{ charge.amount / 100 }} CFP</p>-->\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{ charge.amount/100 * charge.quantity}} CFP</p>\n        </div>\n      </div>\n\n      <md-divider md-inset ng-if=\"$index != $ctrl.addons.length - 1\" class=\"lineItemDetailDivider\"></md-divider>\n      <md-divider ng-if=\"$index == $ctrl.addons.length - 1\"></md-divider>\n    </md-list-item>\n\n    <md-list-item class=\"lineItemHeader\" ng-if=\"$ctrl.taxes\" ng-click=\"$ctrl.toggleShowTaxes()\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"\">Taxes and Fees </p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{$ctrl.taxTotal() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider ng-if=\"!$ctrl.showTaxes\" class=\"totalDivider\"></md-divider>\n    <md-divider ng-if=\"$ctrl.showTaxes\"></md-divider>-->\n\n    <md-list-item class=\"list-item-48 lineItemDetail\" ng-if=\"$ctrl.taxes\" ng-repeat=\"charge in $ctrl.taxes\" ng-show=\"$ctrl.showTaxes\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"row\">\n            <p class=\"\">{{ charge.label }}{{ charge.quantity }}</p>\n            <!--<p class=\"lineItemDetail\" ng-if=\"!charge.percent\"> {{ charge.price / 100 }} CFP</p>-->\n            <p class=\"\" ng-if=\"charge.percent\">&nbsp; {{ charge.percent}}%</p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"lineItemDetail\">{{ charge.price/100}} CFP</p>\n        </div>\n      </div>\n      <!--<md-divider md-inset ng-if=\"$index !=  $ctrl.taxes.length - 1\" class=\"lineItemDetailDivider\"></md-divider>\n      <md-divider md-inset ng-if=\"$index ==  $ctrl.taxes.length - 1\" class=\"darkerDivider\"></md-divider>-->\n    </md-list-item>\n\n    <md-list-item class=\"total\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"total\">Total </p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"total\">{{$ctrl.total / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n\n  </md-list>\n</md-card>";

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = "<md-toolbar>\n  <div class=\"md-toolbar-tools paymentSummaryBottomBar\">\n\n  </div>\n</md-toolbar>";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(12);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(12, function() {
				var newContent = __webpack_require__(12);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(13)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, "md-list {\n    display: block;\n    padding: 0px 0px 0px 0px;\n}\n\n.list-item-48 {\n    height: 36px;\n    min-height: 36px;\n    font-size: 14px;\n    font-weight: 300;\n}\n\n.paymentSummaryCard {\n    min-width: 100%;\n    margin-bottom: 8px;\n    margin-right: 16px;\n    margin-top: 0;\n    background: none;\n    box-shadow: none;\n}\n\n.paymentSummaryCardLarge {\n    min-width: 440px;\n    max-width: 440px;\n    margin-bottom: 0;\n    margin-top: 0;\n    padding-right: 16px;\n    padding-left: 16px;\n}\n\n.paymentHeader p {\n    color: rgba(0, 0, 0, .8) !important;\n    font-weight: 500;\n    letter-spacing: 0.012em;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n}\n\n.paymentTitle {\n    font-size: 20px !important;\n}\n\n.paymentSubTitle {\n    font-size: 18px !important;\n    font-weight: 400;\n}\n\n.lineItemIcon {\n    width: 32px;\n    height: 32px;\n    margin: 4px 4px 4px -6px;\n    background: url('https://s3.amazonaws.com/assets.ablsolution.com/icons/stopwatch-2.svg') no-repeat;\n    background-position: center;\n    background-size: 28px 28px;\n}\n\n.headerIcon {\n    vertical-align: middle;\n    height: 36px;\n    width: 40px;\n    padding-right: 16px;\n}\n\n.headerIconRight {\n    padding-left: 16px;\n}\n\n.headerIcon svg {\n    position: absolute;\n    top: 24px;\n    bottom: 24px;\n    height: 24px;\n    width: 24px;\n}\n\n.lineItemText {\n    font-size: 14px;\n    font-weight: 500;\n    letter-spacing: 0.010em;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: rgba(0, 0, 0, 0.54) !important;\n}\n\n.lineItemDetail {\n    background: rgba(255, 255, 255, .1);\n}\n\n.lineItemDetail p {\n    font-size: 12px;\n    color: rgba(0, 0, 0, .77);\n    font-weight: 400;\n}\n\n.lineItemHeader p {\n    font-size: 16px;\n    font-weight: 400;\n    letter-spacing: 0.010em;\n    margin: 0 0 0 0;\n    line-height: 50px;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: rgba(0, 0, 0, 0.82) !important;\n}\n\n.lineItemSubHeader {\n    font-size: 16px;\n    font-weight: 400;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: rgba(0, 0, 0, 0.82) !important;\n}\n\n.lineItemSubDetail {\n    font-size: 12px;\n    font-weight: 500;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: rgba(0, 0, 0, .6);\n}\n\n.lineItemHeader {\n    background: rgba(0, 0, 0, 0);\n    color: rgba(0, 0, 0, .7) !important;\n}\n\n.addOnAdjusters {\n    width: 36px;\n    margin-right: 16px;\n}\n\n.addOnQuantityText {\n    border: none;\n    width: 40px;\n    font-weight: 500;\n    text-align: center;\n    font-size: 16px;\n    outline: none;\n}\n\n.guestIcon {\n    width: 32px;\n    height: 32px;\n    margin: 4px 4px 4px -6px;\n    background: url('https://s3.amazonaws.com/assets.ablsolution.com/icons/user-3.svg') no-repeat;\n    background-position: center;\n    background-size: 28px 28px;\n}\n\n.lineItemIconRight {\n    width: 40px;\n    height: 40px;\n    margin: 4px -6px 4px 4px;\n    background: url('https://s3.amazonaws.com/assets.ablsolution.com/icons/calendar.svg') no-repeat;\n    background-position: center;\n    background-size: 28px 28px;\n}\n\n.locationHeader {\n    font-size: 14px !important;\n    letter-spacing: 0.010em;\n    line-height: 20px;\n    color: rgba(0, 0, 0, 0.66) !important;\n}\n\n.total {\n    font-size: 18px;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    color: rgba(0, 0, 0, 0.8);\n}\n\n.spacer {\n    margin: 4px;\n    width: 8px;\n}\n\n.darkerDivider {\n    border-top-color: rgba(0, 0, 0, 0.12);\n}\n\n.totalDivider {\n    display: block;\n    border-top-width: 1px;\n}\n\n.lineItemDetailDivider {\n    border-top-color: rgba(0, 0, 0, 0.0);\n}\n\n.paymentSummaryImage {\n    height: 120px;\n    margin: 24px 12px 0 12px;\n    background-position: center center;\n    background-repeat: no-repeat;\n    border-radius: 2px;\n}\n\n.paymentSummaryImageBig {\n    height: 244px;\n    margin: 24px 12px 0 12px;\n    background-position: center center;\n    background-repeat: no-repeat;\n    border-radius: 2px;\n    /*box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .6);*/\n}\n\n.mobileList {\n    height: 100%;\n}\n\n.mobileBottomBar {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n\n.cardForm {\n    margin: 16px 16px 16px 16px;\n}\n\n.addonForm {\n    padding-left: 16px;\n    padding-right: 16px;\n}\n\n.formHeader {\n    padding: 16px 12px 16px 0;\n    margin: 0;\n    font-size: 22px;\n    font-weight: 500;\n}\n\n.paymentHeader._md-button-wrap>div.md-button:first-child {\n    font-size: 22px;\n    /*box-shadow: 0 1px rgba(0, 0, 0, .12);*/\n}\n\n.listIcon {\n    height: 24px;\n    width: 24px;\n    margin-left: 8px;\n}\n\n.listIconSub {\n    height: 20px;\n    width: 20px;\n    color: rgba(0, 0, 0, .5);\n    fill: rgba(0, 0, 0, .5);\n    outline: none;\n}\n\n.listIconSub svg {\n    height: 20px;\n    width: 20px;\n}\n\n.listIconSub:hover {\n    height: 20px;\n    width: 20px;\n    color: rgba(0, 0, 0, .86);\n    fill: rgba(0, 0, 0, .86);\n    outline: none;\n}\n\n.formButton {\n    margin-right: 0;\n}\n\n.stepStatusRow ng-md-icon svg {\n    height: 16px;\n    margin-top: 1px;\n    vertical-align: top;\n}\n\nmd-list-item.addOnListItem {\n    margin-right: -24px;\n    padding-left: 0;\n}\n\nmd-list-item.listItemNotButton {\n    padding: 0 8px !important;\n}\n\n.totalListItem {\n    margin-bottom: 12px;\n}\n\n.listMessage {\n    font-size: 16px;\n    line-height: 1.6em;\n}\n\n.listSubMessage {}", ""]);
	
	// exports


/***/ }),
/* 13 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function(useSourceMap) {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			return this.map(function (item) {
				var content = cssWithMappingToString(item, useSourceMap);
				if(item[2]) {
					return "@media " + item[2] + "{" + content + "}";
				} else {
					return content;
				}
			}).join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};
	
	function cssWithMappingToString(item, useSourceMap) {
		var content = item[1] || '';
		var cssMapping = item[3];
		if (!cssMapping) {
			return content;
		}
	
		if (useSourceMap && typeof btoa === 'function') {
			var sourceMapping = toComment(cssMapping);
			var sourceURLs = cssMapping.sources.map(function (source) {
				return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
			});
	
			return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
		}
	
		return [content].join('\n');
	}
	
	// Adapted from convert-source-map (MIT)
	function toComment(sourceMap) {
		// eslint-disable-next-line no-undef
		var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
		var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
	
		return '/*# ' + data + ' */';
	}


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			// Test for IE <= 9 as proposed by Browserhacks
			// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
			// Tests for existence of standard globals is to allow style-loader 
			// to operate correctly into non-standard environments
			// @see https://github.com/webpack-contrib/style-loader/issues/177
			return window && document && document.all && !window.atob;
		}),
		getElement = (function(fn) {
			var memo = {};
			return function(selector) {
				if (typeof memo[selector] === "undefined") {
					memo[selector] = fn.call(this, selector);
				}
				return memo[selector]
			};
		})(function (styleTarget) {
			return document.querySelector(styleTarget)
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [],
		fixUrls = __webpack_require__(15);
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the <head> element
		if (typeof options.insertInto === "undefined") options.insertInto = "head";
	
		// By default, add <style> tags to the bottom of the target
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var styleTarget = getElement(options.insertInto)
		if (!styleTarget) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				styleTarget.insertBefore(styleElement, styleTarget.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				styleTarget.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			styleTarget.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		options.attrs.type = "text/css";
	
		attachTagAttrs(styleElement, options.attrs);
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";
	
		attachTagAttrs(linkElement, options.attrs);
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function attachTagAttrs(element, attrs) {
		Object.keys(attrs).forEach(function (key) {
			element.setAttribute(key, attrs[key]);
		});
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement, options);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	
		if (options.convertToAbsoluteUrls || autoFixUrls){
			css = fixUrls(css);
		}
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 15 */
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
	
	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;
	
	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }
	
		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }
	
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	
		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.
	
		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens
	
		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });
	
			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}
	
			// convert the url to a full url
			var newUrl;
	
			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}
	
			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});
	
		// send back the fixed css
		return fixedCss;
	};


/***/ })
/******/ ]);
//# sourceMappingURL=abl-payment-summary.js.map