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
/******/ 	var hotCurrentHash = "d7e6cc78cac8f5936b91"; // eslint-disable-line no-unused-vars
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
	
	var _hostTotalsMobile = __webpack_require__(3);
	
	var _hostTotalsMobile2 = _interopRequireDefault(_hostTotalsMobile);
	
	var _hostForms = __webpack_require__(4);
	
	var _hostForms2 = _interopRequireDefault(_hostForms);
	
	var _personalDetails = __webpack_require__(5);
	
	var _personalDetails2 = _interopRequireDefault(_personalDetails);
	
	var _hostFormsMobile = __webpack_require__(6);
	
	var _hostFormsMobile2 = _interopRequireDefault(_hostFormsMobile);
	
	var _totals = __webpack_require__(7);
	
	var _totals2 = _interopRequireDefault(_totals);
	
	var _activityTotals = __webpack_require__(8);
	
	var _activityTotals2 = _interopRequireDefault(_activityTotals);
	
	var _activityTotalsMobile = __webpack_require__(9);
	
	var _activityTotalsMobile2 = _interopRequireDefault(_activityTotalsMobile);
	
	var _ablPaymentSummary = __webpack_require__(10);
	
	var _ablPaymentSummary2 = _interopRequireDefault(_ablPaymentSummary);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	angular.module('abl-payment-summary', ['ngMaterial']).run(function ($templateCache) {
	  $templateCache.put('host-forms.html', _hostForms2.default);
	  $templateCache.put('host-personal-details.html', _personalDetails2.default);
	
	  $templateCache.put('host-totals-mobile.html', _hostTotalsMobile2.default);
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
	    addons: '=',
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
	
	    this.showGridBottomSheet = function () {
	      $scope.alert = '';
	      $mdBottomSheet.show({
	        template: _hostTotalsMobile2.default,
	        scope: $scope,
	        controller: 'totalCtrl',
	        controllerAs: 'vm',
	        bindToController: true,
	        preserveScope: true,
	        clickOutsideToClose: false
	      }).then(function (clickedItem) {
	        console.log($scope);
	      }).catch(function (error) {
	        console.log($scope);
	      });
	    };
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
	
	    //Initialization function
	    this.$onInit = function () {
	      console.log(this);
	
	      //If charges are passed, filter/get the taxes
	      if (angular.isDefined(this.charges)) {
	        this.taxes = this.charges.filter(function (value) {
	          return value['type'] != 'aup';
	        });
	      }
	      //Base price of booking
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
	}).component('verticalWizard', {
	  transclude: true,
	  controller: function wizardController($scope, $element, $attrs) {
	
	    this.$onInit = function () {
	
	      this.name = $attrs.name || '';
	      console.log(this, $attrs);
	    };
	    var completed = this.completed = 0;
	
	    var steps = this.steps = [];
	
	    this.setCompleted = function (i) {
	      this.completed = i;
	    };
	
	    this.select = function (step) {
	      angular.forEach(steps, function (step) {
	        step.selected = false;
	      });
	      step.selected = true;
	    };
	
	    this.addStep = function (step) {
	      if (steps.length === 0) {
	        this.select(step);
	      }
	      step.form = this.name + step.step;
	      steps.push(step);
	    };
	  },
	  template: '<div> <div ng-repeat="step in $ctrl.steps" ng-class="{activeWizardStep:step.selected}"> <form name="{{step.form}}"><a href="" ng-click="$ctrl.select(step)">{{step.label}}</a> {{$ctrl.completed >= step.step}} </form></div> </div> <div class="tab-content" ng-transclude></div> '
	}).component('wizardStep', {
	  transclude: true,
	  require: {
	    wizardCtrl: '^verticalWizard'
	  },
	  bindings: {
	    label: '@'
	  },
	  controller: function controller($scope, $element, $attrs) {
	
	    var that = this;
	    //Initialization function
	    this.$onInit = function () {
	      var step = that.step = this.wizardCtrl.steps.length + 1;
	
	      this.wizardCtrl.addStep(this);
	
	      that.form = this.wizardCtrl.name + step;
	
	      // Mark the step completed in the parent component controller 
	      $scope.$watch(this.form + '.$valid', function (newVal) {
	        that.wizardCtrl.setCompleted(that.step);
	      });
	
	      console.log(this, $scope);
	    };
	  },
	  template: function template() {
	    return '<form name="{{$ctrl.form}}" class="wizardStep" ng-show="$ctrl.selected"  ng-transclude></form>';
	  }
	});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = "<div ng-show=\"screenIsBig()\" layout=\"row\" layout-align=\"center start\" flex=\"100\">\n  <div ng-include=\"'host-forms.html'\"></div>\n  <div layout=\"column\" layout-align=\"space-around stretch\">\n    <md-card class=\"paymentSummaryCard\">\n      <div class=\"paymentSummaryImage\" ng-style=\"{'background-image': 'url({{$ctrl.image}})'}\">\n      </div>\n    </md-card>\n    <md-card class=\"paymentSummaryCard\" layout-margin>\n      <md-list class=\" \" flex>\n        <md-list-item class=\"md-2-line list-item-48 paymentHeader \" ng-click=\"$ctrl.showGridBottomSheet(); \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\"paymentTitle \" ng-style=\"{ 'font-size': '16px'} \">{{$ctrl.title}}</p>\n                <span class=\"md-subhead locationHeader \">{{$ctrl.unit.property.location.streetAddress}}</span>\n              </div>\n            </div>\n\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <div class=\"lineItemIcon \">\n              </div>\n              <p class=\" \">{{ $ctrl.nights}} Nights </p>\n              <div class=\"spacer \"></div>\n              <div class=\"guestIcon \">\n              </div>\n              <p class=\" \">{{ $ctrl.guests}} People </p>\n            </div>\n          </div>\n        </md-list-item>\n        <!--<md-divider class=\"darkerDivider \"></md-divider>-->\n        <md-list-item class=\"lineItemHeader \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\" \">Check-In </p>\n              </div>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n\n              <div layout=\"column \">\n                <p class=\"lineItemHeader \">{{$ctrl.formatDate($ctrl.checkin,'LL')}}</p>\n              </div>\n            </div>\n          </div>\n        </md-list-item>\n        <md-list-item class=\"lineItemHeader \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\" \">Check-Out </p>\n              </div>\n            </div>\n\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <div layout=\"column \">\n                <p class=\"lineItemHeader \">{{$ctrl.formatDate($ctrl.checkout,'LL')}}</p>\n              </div>\n            </div>\n          </div>\n        </md-list-item>\n        <md-divider ng-if=\"$ctrl.base \"></md-divider>\n        <md-list-item class=\"lineItemHeader \" ng-if=\"$ctrl.base \">\n          <div class=\"md-list-item-text paymentLineItem \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\" \">Base Price </p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{$ctrl.base.price / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n\n\n        <!--<md-divider ng-if=\"$ctrl.addons \"></md-divider>-->\n        <md-list-item class=\"lineItemHeader \" ng-click=\"$ctrl.toggleShowAddons() \" ng-if=\"$ctrl.addons \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\" \">Add-ons</p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{$ctrl.addonTotal() / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n        <!--<md-divider ng-if=\"$ctrl.taxes \"></md-divider>-->\n\n        <md-list-item class=\"list-item-48 lineItemDetail \" ng-repeat=\"charge in $ctrl.addons \" ng-show=\"$ctrl.showAddons \" ng-if=\"$ctrl.taxes \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"row \">\n                <p>{{ charge.label }} <span style=\"vertical-align: 'middle' \">x</span> {{ charge.quantity }}</p>\n                <!--<p class=\" \">{{ charge.amount / 100 }} CFP</p>-->\n              </div>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{ charge.amount/100 * charge.quantity}} CFP</p>\n            </div>\n          </div>\n\n          <!--<md-divider md-inset ng-if=\"$index !=$ ctrl.addons.length - 1 \" class=\"lineItemDetailDivider \"></md-divider>\n          <md-divider ng-if=\"$index==$ ctrl.addons.length - 1 \"></md-divider>-->\n        </md-list-item>\n\n        <md-list-item class=\"lineItemHeader \" ng-if=\"$ctrl.taxes \" ng-click=\"$ctrl.toggleShowTaxes() \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\" \">Taxes and Fees </p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\" \">{{$ctrl.taxTotal() / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n        <!--<md-divider ng-if=\"!$ctrl.showTaxes \" class=\"totalDivider \"></md-divider>\n        <md-divider ng-if=\"$ctrl.showTaxes \"></md-divider>-->\n\n        <md-list-item class=\"list-item-48 lineItemDetail \" ng-if=\"$ctrl.taxes \" ng-repeat=\"charge in $ctrl.taxes \" ng-show=\"$ctrl.showTaxes \">\n          <div class=\"md-list-item-text \" layout=\"row \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <div layout=\"row \">\n                <p class=\" \">{{ charge.label }}{{ charge.quantity }}</p>\n                <!--<p class=\"lineItemDetail \" ng-if=\"!charge.percent \"> {{ charge.price / 100 }} CFP</p>-->\n                <p class=\" \" ng-if=\"charge.percent \">&nbsp; {{ charge.percent}}%</p>\n              </div>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\"lineItemDetail \">{{ charge.price/100}} CFP</p>\n            </div>\n          </div>\n          <!--<md-divider md-inset ng-if=\"$index !=$ ctrl.taxes.length - 1 \" class=\"lineItemDetailDivider \"></md-divider>-->\n          <!--<md-divider ng-if=\"$index==$ ctrl.taxes.length - 1 \" class=\"darkerDivider \"></md-divider>-->\n        </md-list-item>\n\n        <md-list-item class=\"total \">\n          <div class=\"md-list-item-text \" layout=\"row \" layout-align=\"space-between center \" flex>\n            <div layout=\"row \" layout-align=\"start center \" flex=\"50 \">\n              <p class=\"total \">Total </p>\n            </div>\n            <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n              <p class=\"total \">{{$ctrl.total / 100}} CFP</p>\n            </div>\n          </div>\n        </md-list-item>\n\n      </md-list>\n    </md-card>\n  </div>\n</div>\n\n<div ng-show=\"!screenIsBig() \" ng-include=\" 'host-totals-mobile.html' \" class=\"mobileList \" layout=\"row \" layout-align=\"center stretch \" layout-fill flex=\"100 \">\n\n</div>";

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = "<div layout=\"column\" layout-align=\"center stretch\" flex=\"100\">\n\n  <md-list class=\"\" flex>\n    <md-list-item class=\"md-2-line list-item-48 paymentHeader\" ng-click=\"$ctrl.showGridBottomSheet();\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"paymentTitle\" ng-style=\"{'font-size': '16px'}\">{{$ctrl.title}}</p>\n            <span class=\"md-subhead locationHeader\">{{$ctrl.unit.property.location.streetAddress}}</span>\n          </div>\n        </div>\n\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <div class=\"lineItemIcon\">\n          </div>\n          <p class=\"\">{{ $ctrl.nights}} Nights </p>\n          <div class=\"spacer\"></div>\n          <div class=\"guestIcon\">\n          </div>\n          <p class=\"\">{{ $ctrl.guests}} People </p>\n        </div>\n      </div>\n    </md-list-item>\n    <md-divider class=\"darkerDivider\"></md-divider>\n    <md-list-item class=\"lineItemHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"\">Check-In </p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n          <div layout=\"column\">\n            <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkin,'LL')}}</p>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-list-item class=\"lineItemHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"\">Check-Out </p>\n          </div>\n        </div>\n\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkout,'LL')}}</p>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n\n    <div class=\"mobileBottomBar\">\n      <md-divider ng-if=\"$ctrl.base\"></md-divider>\n      <md-list-item class=\"lineItemHeader\" ng-if=\"$ctrl.base\">\n        <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <p class=\"\">Base Price </p>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"\">{{$ctrl.base.price / 100}} CFP</p>\n          </div>\n        </div>\n      </md-list-item>\n\n\n      <md-divider ng-if=\"$ctrl.addons\"></md-divider>\n      <md-list-item class=\"lineItemHeader\" ng-click=\"$ctrl.toggleShowAddons()\" ng-if=\"$ctrl.addons\">\n        <div class=\"md-list-item-text\" layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <p class=\"\">Add-ons</p>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"\">{{$ctrl.addonTotal() / 100}} CFP</p>\n          </div>\n        </div>\n      </md-list-item>\n      <md-divider ng-if=\"$ctrl.taxes\"></md-divider>\n\n      <md-list-item class=\"list-item-48 lineItemDetail\" ng-repeat=\"charge in $ctrl.addons\" ng-show=\"$ctrl.showAddons\" ng-if=\"$ctrl.taxes\">\n        <div class=\"md-list-item-text\" layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <div layout=\"row\">\n              <p>{{ charge.label }} <span style=\"vertical-align: 'middle'\">x</span> {{ charge.quantity }}</p>\n              <!--<p class=\"\">{{ charge.amount / 100 }} CFP</p>-->\n            </div>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"\">{{ charge.amount/100 * charge.quantity}} CFP</p>\n          </div>\n        </div>\n\n        <md-divider md-inset ng-if=\"$index != $ctrl.addons.length - 1\" class=\"lineItemDetailDivider\"></md-divider>\n        <md-divider ng-if=\"$index == $ctrl.addons.length - 1\"></md-divider>\n      </md-list-item>\n\n      <md-list-item class=\"lineItemHeader\" ng-if=\"$ctrl.taxes\" ng-click=\"$ctrl.toggleShowTaxes()\">\n        <div class=\"md-list-item-text\" layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <p class=\"\">Taxes and Fees </p>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"\">{{$ctrl.taxTotal() / 100}} CFP</p>\n          </div>\n        </div>\n      </md-list-item>\n      <md-divider ng-if=\"!$ctrl.showTaxes\" class=\"totalDivider\"></md-divider>\n      <md-divider ng-if=\"$ctrl.showTaxes\"></md-divider>\n\n      <md-list-item class=\"list-item-48 lineItemDetail\" ng-if=\"$ctrl.taxes\" ng-repeat=\"charge in $ctrl.taxes\" ng-show=\"$ctrl.showTaxes\">\n        <div class=\"md-list-item-text\" layout=\"row\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <div layout=\"row\">\n              <p class=\"\">{{ charge.label }}{{ charge.quantity }}</p>\n              <!--<p class=\"lineItemDetail\" ng-if=\"!charge.percent\"> {{ charge.price / 100 }} CFP</p>-->\n              <p class=\"\" ng-if=\"charge.percent\">&nbsp; {{ charge.percent}}%</p>\n            </div>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"lineItemDetail\">{{ charge.price/100}} CFP</p>\n          </div>\n        </div>\n        <md-divider md-inset ng-if=\"$index !=  $ctrl.taxes.length - 1\" class=\"lineItemDetailDivider\"></md-divider>\n        <md-divider ng-if=\"$index ==  $ctrl.taxes.length - 1\" class=\"darkerDivider\"></md-divider>\n      </md-list-item>\n      <md-list-item class=\"total\">\n        <div class=\"md-list-item-text\" layout=\"row\" layout-align=\"space-between center\" flex>\n          <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n            <p class=\"total\">Total </p>\n          </div>\n          <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n            <p class=\"total\">{{$ctrl.total / 100}} CFP</p>\n          </div>\n        </div>\n      </md-list-item>\n    </div>\n\n  </md-list>\n</div>";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = "<!--<vertical-wizard name=\"booking\">\n\n  <wizard-step label=\"Hello\">\n    <h4>Fu</h4>\n    <p>Lorem ipsum dolor sit amet</p>\n  </wizard-step>\n\n  <wizard-step label=\"World\">\n    <h4>{{vm.label}}</h4>\n    <em>Mauris elementum elementum enim at suscipit.</em>\n  </wizard-step>\n\n</vertical-wizard>-->\n\n<md-card class=\"paymentSummaryCard\">\n  <md-list class=\"\" flex>\n    <md-list-item class=\"md-2-line paymentHeader\" ng-click=\"null\">\n      <div layout=\"row\" class=\"md-list-item-text \" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\" class=\"formHeader\">\n            <span class=\"paymentTitle\">Guest Details</span>\n            <span class=\" md-subhead locationHeader \">{{$ctrl.unit.property.location.streetAddress}}</span>\n\n          </div>\n        </div>\n\n        <div layout=\"row \" layout-align=\"end center \" flex=\"50 \">\n          <div layout=\"column \" layout-align=\"center end \" flex>\n            <ng-md-icon icon=\"help \" class=\"listIcon \"></ng-md-icon>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider>\n    </md-divider>-->\n    <div class=\"cardForm\" ng-include=\" 'host-personal-details.html' \" layout-margin></div>\n\n  </md-list>\n\n</md-card>";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = "<form name=\"personalDetailsForm\">\n  <div>\n    <md-input-container class=\"md-block\">\n      <label>Full Name</label>\n      <input name=\"name\" ng-model=\"bookingForm.name\" required type=\"text\" md-maxlength=\"100\" ng-minlength=\"3\">\n      <div ng-messages=\"bookingInfoForm.name.$error\">\n        <div ng-message=\"required\">This is required.</div>\n        <div ng-message=\"minlength\">The name must be at least 3 characters long.</div>\n        <div ng-message=\"md-maxlength\">The name must be less than 100 characters long.</div>\n      </div>\n    </md-input-container>\n\n    <md-input-container class=\"md-block\">\n      <label>E-mail</label>\n      <input name=\"email\" ng-model=\"bookingForm.email\" required type=\"email\" md-maxlength=\"100\">\n      <div ng-messages=\"bookingInfoForm.email.$error\">\n        <div ng-message=\"required\">This is required.</div>\n        <div ng-message=\"email\">You must enter a valid e-mail address.</div>\n        <div ng-message=\"md-maxlength\">The e-mail must be less than 100 characters long.</div>\n      </div>\n    </md-input-container>\n\n    <md-input-container class=\"md-block\">\n      <label>Phone</label>\n      <input ng-model=\"bookingForm.phone\" required type=\"phone\">\n    </md-input-container>\n\n    <md-input-container class=\"md-block\">\n      <label>Notes</label>\n      <textarea ng-model=\"bookingForm.notes\" md-maxlength=\"150\" rows=\"5\" md-select-on-focus></textarea>\n    </md-input-container>\n  </div>\n\n  <div layout=\"row\" layout-align=\"end center\">\n    <md-button type=\"submit\" class=\"md-raised md-accent formButton\" ng-click=\"changeState('addBooking.rooms')\" ng-disabled=\"bookingInfoForm.$invalid\">Continue</md-button>\n  </div>\n</form>";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = "";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = "<booking-total></booking-total>";

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = "<md-card class=\"paymentSummaryCard\">\n  <div class=\"paymentSummaryImage\" ng-style=\"{'background-image': 'url({{$ctrl.image}})'}\">\n  </div>\n  <md-list class=\"\" flex>\n    <md-list-item class=\"md-2-line list-item-48 paymentHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"paymentTitle\">{{$ctrl.title}}</p>\n            <span class=\"md-subhead locationHeader\">{{$ctrl.unit.property.location.streetAddress}}</span>\n          </div>\n        </div>\n\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <div class=\"lineItemIcon\">\n          </div>\n          <p class=\"\">{{ $ctrl.nights}} Nights </p>\n          <div class=\"spacer\"></div>\n          <div class=\"guestIcon\">\n          </div>\n          <p class=\"\">{{ $ctrl.guests}} People </p>\n        </div>\n      </div>\n    </md-list-item>\n    <md-divider class=\"darkerDivider\"></md-divider>\n    <md-list-item class=\"lineItemHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"\">Check-In </p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n\n          <div layout=\"column\">\n            <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkin,'LL')}}</p>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-list-item class=\"lineItemHeader\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"\">Check-Out </p>\n          </div>\n        </div>\n\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <div layout=\"column\">\n            <p class=\"lineItemHeader\">{{$ctrl.formatDate($ctrl.checkout,'LL')}}</p>\n          </div>\n        </div>\n      </div>\n    </md-list-item>\n    <md-divider ng-if=\"$ctrl.base\"></md-divider>\n    <md-list-item class=\"lineItemHeader\" ng-if=\"$ctrl.base\">\n      <div class=\"md-list-item-text paymentLineItem\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"\">Base Price </p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{$ctrl.base.price / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n\n\n    <md-divider ng-if=\"$ctrl.addons\"></md-divider>\n    <md-list-item class=\"lineItemHeader\" ng-click=\"$ctrl.toggleShowAddons()\" ng-if=\"$ctrl.addons\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"\">Add-ons</p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{$ctrl.addonTotal() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider ng-if=\"$ctrl.taxes\"></md-divider>-->\n\n    <md-list-item class=\"list-item-48 lineItemDetail\" ng-repeat=\"charge in $ctrl.addons\" ng-show=\"$ctrl.showAddons\" ng-if=\"$ctrl.taxes\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"row\">\n            <p>{{ charge.label }} <span style=\"vertical-align: 'middle'\">x</span> {{ charge.quantity }}</p>\n            <!--<p class=\"\">{{ charge.amount / 100 }} CFP</p>-->\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{ charge.amount/100 * charge.quantity}} CFP</p>\n        </div>\n      </div>\n\n      <md-divider md-inset ng-if=\"$index != $ctrl.addons.length - 1\" class=\"lineItemDetailDivider\"></md-divider>\n      <md-divider ng-if=\"$index == $ctrl.addons.length - 1\"></md-divider>\n    </md-list-item>\n\n    <md-list-item class=\"lineItemHeader\" ng-if=\"$ctrl.taxes\" ng-click=\"$ctrl.toggleShowTaxes()\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"\">Taxes and Fees </p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"\">{{$ctrl.taxTotal() / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n    <!--<md-divider ng-if=\"!$ctrl.showTaxes\" class=\"totalDivider\"></md-divider>\n    <md-divider ng-if=\"$ctrl.showTaxes\"></md-divider>-->\n\n    <md-list-item class=\"list-item-48 lineItemDetail\" ng-if=\"$ctrl.taxes\" ng-repeat=\"charge in $ctrl.taxes\" ng-show=\"$ctrl.showTaxes\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <div layout=\"row\">\n            <p class=\"\">{{ charge.label }}{{ charge.quantity }}</p>\n            <!--<p class=\"lineItemDetail\" ng-if=\"!charge.percent\"> {{ charge.price / 100 }} CFP</p>-->\n            <p class=\"\" ng-if=\"charge.percent\">&nbsp; {{ charge.percent}}%</p>\n          </div>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"lineItemDetail\">{{ charge.price/100}} CFP</p>\n        </div>\n      </div>\n      <!--<md-divider md-inset ng-if=\"$index !=  $ctrl.taxes.length - 1\" class=\"lineItemDetailDivider\"></md-divider>\n      <md-divider md-inset ng-if=\"$index ==  $ctrl.taxes.length - 1\" class=\"darkerDivider\"></md-divider>-->\n    </md-list-item>\n\n    <md-list-item class=\"total\">\n      <div class=\"md-list-item-text\" layout=\"row\" flex>\n        <div layout=\"row\" layout-align=\"start center\" flex=\"50\">\n          <p class=\"total\">Total </p>\n        </div>\n        <div layout=\"row\" layout-align=\"end center\" flex=\"50\">\n          <p class=\"total\">{{$ctrl.total / 100}} CFP</p>\n        </div>\n      </div>\n    </md-list-item>\n\n  </md-list>\n</md-card>";

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = "<md-toolbar>\n  <div class=\"md-toolbar-tools paymentSummaryBottomBar\">\n\n  </div>\n</md-toolbar>";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(11, function() {
				var newContent = __webpack_require__(11);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)(undefined);
	// imports
	
	
	// module
	exports.push([module.id, "md-list {\n    display: block;\n    padding: 0px 0px 0px 0px;\n}\n\n.list-item-48 {\n    height: 36px;\n    min-height: 36px;\n    font-size: 14px;\n    font-weight: 300;\n}\n\n.paymentSummaryCard {\n    width: 440px;\n    max-width: 440px;\n}\n\n.paymentHeader p {\n    color: rgba(0, 0, 0, .8) !important;\n    font-weight: 500;\n    letter-spacing: 0.012em;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n}\n\n.paymentTitle {\n    font-size: 20px !important;\n}\n\n.lineItemIcon {\n    width: 32px;\n    height: 32px;\n    margin: 4px 4px 4px -6px;\n    background: url('https://s3.amazonaws.com/assets.ablsolution.com/icons/stopwatch-2.svg') no-repeat;\n    background-position: center;\n    background-size: 28px 28px;\n}\n\n.lineItemText {\n    font-size: 14px;\n    font-weight: 500;\n    letter-spacing: 0.010em;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: rgba(0, 0, 0, 0.54) !important;\n}\n\n.lineItemDetail {\n    background: rgba(255, 255, 255, .1);\n}\n\n.lineItemDetail p {\n    font-size: 12px;\n    color: rgba(0, 0, 0, .77);\n    font-weight: 400;\n}\n\n.lineItemHeader p {\n    font-size: 14px;\n    font-weight: 400;\n    letter-spacing: 0.010em;\n    margin: 0 0 0 0;\n    line-height: 1.6em;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n    color: rgba(0, 0, 0, 0.82) !important;\n}\n\n.lineItemHeader {\n    background: rgba(0, 0, 0, 0);\n}\n\n.guestIcon {\n    width: 32px;\n    height: 32px;\n    margin: 4px 4px 4px -6px;\n    background: url('https://s3.amazonaws.com/assets.ablsolution.com/icons/user-3.svg') no-repeat;\n    background-position: center;\n    background-size: 28px 28px;\n}\n\n.lineItemIconRight {\n    width: 40px;\n    height: 40px;\n    margin: 4px -6px 4px 4px;\n    background: url('https://s3.amazonaws.com/assets.ablsolution.com/icons/calendar.svg') no-repeat;\n    background-position: center;\n    background-size: 28px 28px;\n}\n\n.locationHeader {\n    font-size: 14px !important;\n    letter-spacing: 0.010em;\n    line-height: 20px;\n    color: rgba(0, 0, 0, 0.66) !important;\n}\n\n.total {\n    font-size: 18px;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    color: rgba(0, 0, 0, 0.8) !important;\n}\n\n.spacer {\n    margin: 4px;\n    width: 8px;\n}\n\n.darkerDivider {\n    border-top-color: rgba(0, 0, 0, 0.12);\n}\n\n.totalDivider {\n    display: block;\n    border-top-width: 1px;\n}\n\n.lineItemDetailDivider {\n    border-top-color: rgba(0, 0, 0, 0.0);\n}\n\n.paymentSummaryImage {\n    width: 440px;\n    height: 264px;\n    background-position: center center;\n    background-repeat: no-repeat;\n}\n\n.mobileList {\n    height: 100%;\n}\n\n.mobileBottomBar {\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n}\n\n.cardForm {\n    margin: 16px 16px 16px 16px;\n}\n\n.formHeader {\n    padding: 16px 12px 24px 10px;\n    margin: 0;\n    font-size: 22px;\n    font-weight: 500;\n}\n\n.paymentHeader._md-button-wrap>div.md-button:first-child {\n    font-size: 22px;\n    /*box-shadow: 0 1px rgba(0, 0, 0, .12);*/\n}\n\n.listIcon {\n    height: 24px;\n    width: 24px;\n}\n\n.formButton {\n    margin-right: 0;\n}", ""]);
	
	// exports


/***/ }),
/* 12 */
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
/* 13 */
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
		fixUrls = __webpack_require__(14);
	
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
/* 14 */
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