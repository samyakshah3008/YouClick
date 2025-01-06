/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/tabs/components/Home.tsx":
/*!**************************************!*\
  !*** ./src/tabs/components/Home.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/lib/axios.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function Home() {
    const [isLoggedIn, setIsLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const handleLogin = () => {
        // chrome.tabs.create({
        //   url: "http://localhost:4500/api/v1/auth/google",
        //   selected: true,
        //   active: true,
        // });
        chrome.tabs.create({
            url: "https://you-click-server.vercel.app/api/v1/auth/google",
            selected: true,
            active: true,
        });
    };
    const handleLogout = () => {
        // axios.get("http://localhost:4500/api/v1/auth/logout").then((response) => {
        //   chrome.storage.local.remove("accessToken", () => {
        //     console.log("Access token removed from storage.");
        //   });
        //   window.location.reload();
        // });
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].get("https://you-click-server.vercel.app/api/v1/auth/logout")
            .then((response) => {
            chrome.storage.local.remove("accessToken", () => {
                console.log("Access token removed from storage.");
            });
            window.location.reload();
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        chrome.storage.local.remove("accessToken", () => {
            console.log("Access token removed from storage.");
        });
        axios__WEBPACK_IMPORTED_MODULE_1__["default"].get("https://you-click-server.vercel.app/api/v1/auth/me", {
            withCredentials: true,
        })
            .then((res) => {
            var _a;
            if ((_a = res === null || res === void 0 ? void 0 : res.data[0]) === null || _a === void 0 ? void 0 : _a.accessToken) {
                setIsLoggedIn(true);
            }
            chrome.storage.local.get("accessToken", (data) => {
                var _a;
                if (!data.accessToken) {
                    chrome.storage.local.set({ accessToken: (_a = res.data[0]) === null || _a === void 0 ? void 0 : _a.accessToken }, () => {
                        console.log("Access token saved to Chrome storage.");
                    });
                }
                else {
                    console.log("token already present");
                }
            });
        });
    }, []);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "min-h-screen bg-gray-100 w-screen" },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", { className: "bg-white shadow-md p-4" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "flex justify-between items-center container mx-auto" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "text-2xl font-bold" }, "\uD83D\uDC4D YouClick"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://you-click.vercel.app/", target: "_blank", rel: "noopener noreferrer", className: " font-medium text-gray-700 hover:text-red-500 transition-colors" }, "How to use YouClick - Guide"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", { className: "flex flex-col justify-center items-center mt-20 gap-8" },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bg-white p-6 shadow-md rounded-lg text-center w-1/2" }, isLoggedIn ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "text-xl font-bold text-gray-800" }, "Welcome back to YouClick!"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", { className: "text-gray-600 mt-2" }, "We're glad to have you logged in. Let's make the most of your time."),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: handleLogout, className: "mt-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-all" }, "Logout"))) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null,
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: "text-xl font-bold text-gray-800" }, "Welcome to YouClick!"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", { className: "text-gray-600 mt-2" }, "Please log in to access your account and explore features."),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { onClick: handleLogin, className: "mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all" }, "Login")))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: "bg-white p-6 shadow-md rounded-lg w-1/2" },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", { className: "text-lg font-semibold text-gray-800 mb-4" }, "Important Information"),
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", { className: "list-disc list-inside text-gray-700 space-y-2" },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Open a new tab to start a session after successful login."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Session will stay active only for 1 hour; you need to re-login afterward."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Ensure you use same YouTube Account which you login from YouClick. Or else from that account which you will login - in that all actions will be executed."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Ensure you grant YouTube's permissions during login, or it won't work."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                        "If you don't have beta access, you won't be able to log in since YouClick is currently under test mode and we are working on Publishing to Chrome Web Store. To get access, please fill out a",
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://you-click.vercel.app/beta-access", target: "_blank", className: "text-blue-500" }, "short form"),
                        " ",
                        "today."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                        "Read FAQs",
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://you-click.vercel.app/", target: "_blank", className: "text-blue-500" }, "here"),
                        "."),
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null,
                        "If you liked YouClick, please consider hitting a star on Github",
                        " ",
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", { href: "https://github.com/samyakshah3008/YouClick", target: "_blank", className: "text-blue-500" }, "here"),
                        "."))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Home);


/***/ }),

/***/ "./src/tabs/index.tsx":
/*!****************************!*\
  !*** ./src/tabs/index.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _assets_tailwind_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/tailwind.css */ "./src/assets/tailwind.css");
/* harmony import */ var _components_Home__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Home */ "./src/tabs/components/Home.tsx");





function init() {
    const appContainer = document.createElement("div");
    document.body.appendChild(appContainer);
    if (!appContainer) {
        throw new Error("Can not find AppContainer");
    }
    const root = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(appContainer);
    root.render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__.HashRouter, null,
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Home__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
}
init();


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"newTab": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkreactjs_chrome"] = self["webpackChunkreactjs_chrome"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_css-loader_dist_runtime_api_js-node_modules_css-loader_dist_runtime_sour-b53f7e","vendors-node_modules_axios_lib_axios_js","vendors-node_modules_react-router-dom_index_js","src_assets_tailwind_css"], () => (__webpack_require__("./src/tabs/index.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=newTab.js.map