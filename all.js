/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "73555c5047d8ca132738"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
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
/******/ 			_main: hotCurrentChildModule !== moduleId,
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
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
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
/******/ 		hotCurrentChildModule = undefined;
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
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
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
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
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
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
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
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
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
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
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
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
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
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./main.coffee")(__webpack_require__.s = "./main.coffee");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./config.coffee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return keys; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return tanks; });
var keys = {
  0: {
    0: 'ArrowUp',
    1: 'ArrowRight',
    2: 'ArrowDown',
    3: 'ArrowLeft',
    fire: 'Space'
  },
  1: {
    0: 'KeyW',
    1: 'KeyD',
    2: 'KeyS',
    3: 'KeyA',
    fire: 'Tab'
  }
};

var tanks = {
  0: {
    life: 1,
    invVelocity: 16,
    fireCooldown: 30,
    invBulletVelocity: 4,
    maxBullets: 1
  },
  1: {
    life: 1,
    invVelocity: 16,
    fireCooldown: 30,
    invBulletVelocity: 2,
    maxBullets: 1
  },
  2: {
    life: 1,
    invVelocity: 16,
    fireCooldown: 30,
    invBulletVelocity: 2,
    maxBullets: 2
  },
  3: {
    life: 2,
    invVelocity: 16,
    fireCooldown: 30,
    invBulletVelocity: 2,
    maxBullets: 2
  }
};


/***/ }),

/***/ "./index.slm":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "index.html";

/***/ }),

/***/ "./levels.coffee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return width; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return height; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return playerSpawnPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return enemySpawnPoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return levels; });
var X, _, f, o, w;

var width = 52;

var height = 52;

_ = 0;

o = 1;

X = 2;

w = 3;

f = 4;

var playerSpawnPoints = [[18, 50], [34, 50]];

var enemySpawnPoints = [[2, 2], [26, 2], [50, 2]];

var levels = [[_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, X, X, X, X, X, X, X, X, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, o, o, o, o, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, o, o, o, o, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, o, o, o, o, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, o, o, o, o, X, X, X, X, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, f, f, f, f, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, f, f, f, f, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, f, f, f, f, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, f, f, f, f, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, X, X, X, X, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _], [_, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, X, X, X, X, X, X, X, X, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, X, X, X, X, X, X, X, X, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, X, X, X, X, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, X, X, X, X, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, X, X, X, X, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, X, X, X, X, X, X, X, X, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, f, o, o, o, o, _, _, _, _, _, _, _, _, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, X, X, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, X, X, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, X, X, X, X, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, X, X, X, X, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _], [_, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, _, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, o, o, _, _, _, _, X, X, _, _, _, _, _, _, X, X, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, o, o, _, _, _, _, X, X, _, _, _, _, _, _, X, X, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, o, o, _, _, _, _, X, X, _, _, _, _, _, _, X, X, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, o, o, _, _, _, _, X, X, _, _, _, _, _, _, X, X, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, o, o, _, _, _, _, _, _, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, X, X, X, X, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, X, X, X, X, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, X, X, X, X, X, X, X, X, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, X, X, X, X], [_, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, o, o, o, o, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, _, _, _, _, o, o, o, o, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, X, X, X, X, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, w, w, w, w, w, w, w, w, _, _, _, _, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, w, w, w, w, w, w, w, w, _, _, _, _, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, w, w, w, w, w, w, w, w, _, _, _, _, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, o, o, o, o, w, w, w, w, w, w, w, w, _, _, _, _, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, w, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, X, X, X, X, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, X, X, X, X, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, o, o, o, o, o, o, _, _, _, _, X, X, X, X, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, o, o, o, o, o, o, _, _, _, _, X, X, X, X, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, o, o, o, o, o, o, _, _, _, _, X, X, X, X, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, _, _, o, o, o, o, o, o, _, _, _, _, X, X, X, X, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, _, _, _, _, o, o, o, o, f, f, f, f, f, f, f, f, f, f, f, f, w, w, w, w, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, f, f, f, f, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, o, o, o, o, o, o, o, o, o, o, o, o, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, X, X, X, X, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, w, w, w, w, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, w, w, w, w, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, o, o, o, o, _, _, _, _, o, o, o, o, _, _, _, _, _, _, o, o, o, o, o, o, o, o, _, _, _, _, _, _, w, w, w, w, f, f, f, f, f, f, f, f, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, o, o, _, _, _, _, o, o, _, _, _, _, _, _, w, w, w, w, _, _, _, _, f, f, f, f, _, _, _, _]];


/***/ }),

/***/ "./main.coffee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_slm__ = __webpack_require__("./index.slm");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index_slm___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__index_slm__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_sass__ = __webpack_require__("./ui.sass");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_sass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ui_sass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_coffee__ = __webpack_require__("./config.coffee");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__levels_coffee__ = __webpack_require__("./levels.coffee");
var Base, Bullet, Explosion, Player, Spawn, Tank, Team, aiControl, attackers, cell, cellMask, cellSize, cells, collide, ctx, defenders, draw, drawCell, drawMovingObj, drawSprite, dx, dy, enemies, event, explode, inRange, keyControl, keyDown, level, loadLevel, menu, message, objs, players, rand, score, setCell, sprite, stopGame, tick, updateScore, view;









rand = function(max) {
  return Math.floor(Math.random() * max);
};

level = tick = null;

objs = cells = players = enemies = [];

dx = [0, 1, 0, -1];

dy = [-1, 0, 1, 0];

inRange = function(x, y) {
  return 0 <= x && x < __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["e" /* width */] && 0 <= y && y < __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["b" /* height */];
};

cell = function(x, y) {
  if (inRange(x, y)) {
    return cells[y * __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["e" /* width */] + x];
  } else {
    return 1;
  }
};

setCell = function(x, y, v) {
  if (inRange(x, y)) {
    return cells[y * __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["e" /* width */] + x] = v;
  }
};

cellMask = [0, 0b11, 0b11, 0b1, 0];

collide = function(a, ax, ay) {
  var b, j, k, l, len, ref, ref1, ref2, ref3, x, y;
  for (x = j = ref = ax - a.size, ref1 = ax + a.size; ref <= ref1 ? j < ref1 : j > ref1; x = ref <= ref1 ? ++j : --j) {
    for (y = k = ref2 = ay - a.size, ref3 = ay + a.size; ref2 <= ref3 ? k < ref3 : k > ref3; y = ref2 <= ref3 ? ++k : --k) {
      if (a.layer & cellMask[cell(x, y)]) {
        return a;
      }
    }
  }
  if ((ax !== a.x || ay !== a.y) && collide(a, a.x, a.y)) {
    return;
  }
  for (l = 0, len = objs.length; l < len; l++) {
    b = objs[l];
    if (a !== b && b !== a.tank && a.mask & b.layer) {
      if (Math.max(Math.abs(ax - b.x), Math.abs(ay - b.y)) < a.size + b.size) {
        return b;
      }
    }
  }
};

explode = function(x, y) {
  return objs.push(new Explosion(x, y));
};

Tank = (function() {
  class Tank {
    constructor(spawn, type1, dir1 = 0) {
      this.spawn = spawn;
      this.type = type1;
      this.dir = dir1;
      ({x: this.x, y: this.y, player: this.player} = this.spawn);
      this.life = this.type.life;
      this.cooldown = this.bullets = this.t = this.g = 0;
      this.spawn.tanks += 1;
    }

    die() {
      this.spawn.tanks -= 1;
      this.player.kill(this);
      return explode(this.x, this.y);
    }

    move(dir) {
      var x, y;
      if (!this.t) {
        this.dir = dir;
        x = this.x + 2 * dx[this.dir];
        y = this.y + 2 * dy[this.dir];
        if (!collide(this, x, y)) {
          this.x = x;
          this.y = y;
          return this.t = this.type.invVelocity;
        }
      }
    }

    fire() {
      if (!this.cooldown && this.bullets < this.type.maxBullets) {
        this.cooldown = this.type.fireCooldown;
        return objs.push(new Bullet(this.x + dx[this.dir], this.y + dy[this.dir], this, this.dir));
      }
    }

    tick() {
      if (1 === this.t % 4) {
        this.g = (this.g + 1) % 2;
      }
      if (this.t) {
        this.t -= 1;
      }
      this.player.control.call(this);
      if (this.cooldown) {
        return this.cooldown -= 1;
      }
    }

    draw() {
      return drawMovingObj(this, this.t / this.type.invVelocity * 2, this.g * 4, this.player.color);
    }

  };

  Tank.prototype.layer = 1;

  Tank.prototype.mask = 1;

  Tank.prototype.size = 2;

  return Tank;

})();

Bullet = (function() {
  class Bullet {
    constructor(x1, y1, tank, dir1) {
      this.x = x1;
      this.y = y1;
      this.tank = tank;
      this.dir = dir1;
      this.life = this.t = 1;
      this.invVelocity = this.tank.type.invBulletVelocity;
      this.tank.bullets += 1;
    }

    die() {
      var ex, ey, j, k, ref, ref1, ref2, ref3, x, y;
      this.tank.bullets -= 1;
      ex = 1 + Math.abs(dy[this.dir]);
      ey = 1 + Math.abs(dx[this.dir]);
      for (x = j = ref = this.x - ex, ref1 = this.x + ex; ref <= ref1 ? j < ref1 : j > ref1; x = ref <= ref1 ? ++j : --j) {
        for (y = k = ref2 = this.y - ey, ref3 = this.y + ey; ref2 <= ref3 ? k < ref3 : k > ref3; y = ref2 <= ref3 ? ++k : --k) {
          if (1 === cell(x, y)) {
            setCell(x, y, 0);
          }
        }
      }
      return explode(this.x, this.y);
    }

    tick() {
      var obj, ref;
      if (obj = collide(this, this.x, this.y)) {
        if (this.tank.player.team !== ((ref = obj.player) != null ? ref.team : void 0)) {
          obj.life -= 1;
        }
        this.life = 0;
      }
      if (!(this.t -= 1)) {
        this.t = this.invVelocity;
        this.x += dx[this.dir];
        return this.y += dy[this.dir];
      }
    }

    draw() {
      return drawMovingObj(this, this.t / this.invVelocity, 4, 4);
    }

  };

  Bullet.prototype.layer = 2;

  Bullet.prototype.mask = 0b11;

  Bullet.prototype.size = 1;

  return Bullet;

})();

Base = (function() {
  class Base {
    constructor(x1, y1, team) {
      this.x = x1;
      this.y = y1;
      this.team = team;
      this.life = 1;
    }

    die() {
      this.team.lose();
      return explode(this.x, this.y);
    }

    draw() {
      return drawSprite(this.x, this.y, 7, 3);
    }

  };

  Base.prototype.layer = 1;

  Base.prototype.size = 2;

  return Base;

})();

Explosion = class Explosion {
  constructor(x1, y1, life = 19) {
    this.x = x1;
    this.y = y1;
    this.life = life;
  }

  tick() {
    return this.life -= 1;
  }

  draw() {
    return drawSprite(this.x, this.y, 4 - Math.floor(this.life / 5), 3);
  }

};

Spawn = class Spawn {
  constructor(player1, maxTanks, points) {
    this.player = player1;
    this.maxTanks = maxTanks;
    this.points = points;
    this.tanks = 0;
    this.life = 1;
    this.t = 20;
    this.next = 0;
  }

  tick() {
    if (this.tanks < Math.min(this.maxTanks, this.player.life)) {
      if (this.t === 20) {
        [this.x, this.y] = this.points[this.next];
        this.next = (this.next + 1) % this.points.length;
        explode(this.x, this.y);
      }
      if (!(this.t -= 1)) {
        objs.push(new Tank(this, __WEBPACK_IMPORTED_MODULE_2__config_coffee__["b" /* tanks */][0]));
        return this.t = 160;
      }
    }
  }

};

Team = class Team {
  constructor(lose) {
    this.lose = lose;
    this.players = 0;
  }

  add() {
    return this.players += 1;
  }

  remove() {
    if (!(this.players -= 1)) {
      return this.lose(this);
    }
  }

};

Player = class Player {
  constructor(team, color, life, control) {
    this.team = team;
    this.color = color;
    this.life = life;
    this.control = control;
    this.team.add(this);
  }

  kill() {
    if (!(this.life -= 1)) {
      this.team.remove(this);
    }
    return updateScore();
  }

};

keyDown = {};

window.onkeydown = function(e) {
  keyDown[e.code] = true;
  return false;
};

window.onkeyup = function(e) {
  delete keyDown[e.code];
  return false;
};

keyControl = function(keys) {
  return function() {
    var dir, j;
    for (dir = j = 0; j <= 3; dir = ++j) {
      if (keyDown[keys[dir]]) {
        this.move(dir);
      }
    }
    if (keyDown[keys.fire]) {
      return this.fire();
    }
  };
};

aiControl = function() {
  var dir;
  dir = rand(48) ? this.dir : rand(4);
  this.move(dir);
  if (!rand(8)) {
    return this.fire();
  }
};

menu = document.getElementById('menu');

message = document.getElementById('message');

score = document.getElementById('score');

updateScore = function() {
  var i, j, len, player, results;
  results = [];
  for (i = j = 0, len = players.length; j < len; i = ++j) {
    player = players[i];
    results.push(score.children[i].innerText = `P${i}: ${player.life}`);
  }
  return results;
};

event = function(text, fn) {
  if (!message.innerText) {
    message.innerText = text;
    message.style.visibility = 'visible';
    return setTimeout(function() {
      message.innerText = '';
      message.style.visibility = 'hidden';
      return typeof fn === "function" ? fn() : void 0;
    }, 2000);
  }
};

attackers = new Team(function() {
  return event('Victory!', function() {
    return loadLevel(level += 1);
  });
});

defenders = new Team(function() {
  return event('Game Over', function() {
    return stopGame();
  });
});

loadLevel = function(level) {
  var i, j, len, player;
  enemies = new Player(attackers, 0, 20, aiControl);
  attackers.players = 1;
  cells = __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["c" /* levels */][level % __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["c" /* levels */].length].slice(0);
  objs = [new Base(26, 50, defenders), new Spawn(enemies, 5, __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["a" /* enemySpawnPoints */])];
  for (i = j = 0, len = players.length; j < len; i = ++j) {
    player = players[i];
    objs.push(new Spawn(player, 1, [__WEBPACK_IMPORTED_MODULE_3__levels_coffee__["d" /* playerSpawnPoints */][i]]));
  }
  return updateScore();
};

window.newGame = function(playerCount) {
  var i;
  menu.style.visibility = 'hidden';
  players = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 0, ref = playerCount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      results.push(new Player(defenders, 1 + i, 3, keyControl(__WEBPACK_IMPORTED_MODULE_2__config_coffee__["a" /* keys */][i])));
    }
    return results;
  })();
  defenders.players = playerCount;
  loadLevel(level = 0);
  return tick = setInterval(function() {
    var j, k, len, len1, obj, results;
    objs = objs.filter(function(obj) {
      return obj.life != null;
    });
    for (j = 0, len = objs.length; j < len; j++) {
      obj = objs[j];
      if (typeof obj.tick === "function") {
        obj.tick();
      }
    }
    results = [];
    for (k = 0, len1 = objs.length; k < len1; k++) {
      obj = objs[k];
      if (!(obj.life <= 0)) {
        continue;
      }
      if (typeof obj.die === "function") {
        obj.die();
      }
      results.push(delete obj.life);
    }
    return results;
  }, 10);
};

stopGame = function() {
  clearInterval(tick);
  return menu.style.visibility = 'visible';
};

view = document.getElementById('view');

ctx = view.getContext('2d');

sprite = Object.assign(new Image, {
  src: __webpack_require__("./sprite.png")
});

cellSize = 21;

(window.onresize = function() {
  cellSize = Math.min(Math.floor(window.innerWidth / __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["e" /* width */]), Math.floor(window.innerHeight / __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["b" /* height */]));
  view.width = __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["e" /* width */] * cellSize;
  return view.height = __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["b" /* height */] * cellSize;
})();

drawCell = function(type, i) {
  var x, y;
  x = i % __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["e" /* width */];
  y = Math.floor(i / __WEBPACK_IMPORTED_MODULE_3__levels_coffee__["b" /* height */]);
  return ctx.drawImage(sprite, 21 * (type * 4 - 4 + x % 4), 21 * (16 + y % 4), 21, 21, x * cellSize, y * cellSize, cellSize, cellSize);
};

drawSprite = function(x, y, sx, sy) {
  return ctx.drawImage(sprite, 84 * sx, 84 * sy, 84, 84, (x - 2) * cellSize, (y - 2) * cellSize, cellSize * 4, cellSize * 4);
};

drawMovingObj = function(o, t, sx, sy) {
  return drawSprite(o.x - t * dx[o.dir], o.y - t * dy[o.dir], sx + o.dir, sy);
};

(draw = function() {
  var c, i, j, k, l, len, len1, len2, obj;
  if (objs != null) {
    ctx.clearRect(0, 0, view.width, view.height);
    for (i = j = 0, len = cells.length; j < len; i = ++j) {
      c = cells[i];
      if (c === 3) {
        drawCell(c, i);
      }
    }
    for (k = 0, len1 = objs.length; k < len1; k++) {
      obj = objs[k];
      if (typeof obj.draw === "function") {
        obj.draw();
      }
    }
    for (i = l = 0, len2 = cells.length; l < len2; i = ++l) {
      c = cells[i];
      if (c !== 3) {
        drawCell(c, i);
      }
    }
    return requestAnimationFrame(draw);
  }
})();


/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./ui.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, "* {\n  text-align: center;\n  font-size: 48px;\n  color: #eee; }\n\nbody, canvas {\n  padding: 0;\n  margin: 0;\n  border: 0;\n  background: #333; }\n\n#view, #menu, #message {\n  font-family: \"Arial Black\", Gadget, sans-serif;\n  text-shadow: 2px 2px #000;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  text-transform: uppercase; }\n\n#view {\n  background: linear-gradient(black, #242424); }\n\n#menu {\n  background: #333;\n  padding: 16px;\n  font-family: Impact, Charcoal, sans-serif; }\n\n#score {\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  padding: 16px; }\n\nbutton {\n  display: block;\n  width: 100%;\n  background: #444;\n  border: 2px solid #eee;\n  border-radius: 16px;\n  margin: 4px;\n  text-shadow: 2px 2px black;\n  outline: none; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
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

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
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

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

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

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
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


/***/ }),

/***/ "./sprite.png":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "18896dac3bf09aaeb27d3af240b61a2b.png";

/***/ }),

/***/ "./ui.sass":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./ui.sass");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./ui.sass", function() {
			var newContent = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/sass-loader/lib/loader.js!./ui.sass");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ })

/******/ });
//# sourceMappingURL=all.js.map