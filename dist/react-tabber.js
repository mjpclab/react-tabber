(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["react-tabber"] = factory(require("react"));
	else
		root["ReactTabber"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var React = __webpack_require__(1);
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
    function ReactTabber(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeIndex: _this.props.activeIndex
        };
        return _this;
    }
    ReactTabber.prototype.componentWillUnmount = function () {
        clearTimeout(this.delayTimeout);
    };
    ReactTabber.prototype.getLabelContainer = function (position) {
        var _this = this;
        var props = this.props;
        var state = this.state;
        return React.createElement("div", { className: props.labelContainerClassName + ' ' + position }, this.props.tabs.map(function (tab, index) {
            var className = props.labelItemClassName + ' ' + (index === state.activeIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName);
            var doSwitch = function () {
                if (index === state.activeIndex) {
                    return;
                }
                _this.switchTo(index);
            };
            var localDelayTimeout;
            var delayDoSwitch = (props.hoverSwitchDelay) <= 0 ?
                doSwitch :
                function () {
                    if (index === state.activeIndex) {
                        return;
                    }
                    clearTimeout(_this.delayTimeout);
                    localDelayTimeout = _this.delayTimeout = setTimeout(doSwitch, props.hoverSwitchDelay);
                };
            var cancelDelayDoSwitch = function () {
                if (localDelayTimeout === _this.delayTimeout) {
                    clearTimeout(localDelayTimeout);
                }
            };
            return React.createElement("label", { key: index, className: className, onClick: props.clickSwitch ? doSwitch : undefined, onMouseEnter: props.hoverSwitch ? delayDoSwitch : undefined, onMouseLeave: props.leaveCancelSwitch ? cancelDelayDoSwitch : undefined }, tab.label);
        }));
    };
    ReactTabber.prototype.getPageContainer = function () {
        var props = this.props;
        var state = this.state;
        return React.createElement("div", { className: props.pageContainerClassName }, this.props.tabs.map(function (tab, index) {
            var className = props.pageItemClassName + ' ' + (index === state.activeIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
            return React.createElement("div", { key: index, className: className }, tab.page);
        }));
    };
    ReactTabber.prototype.getTabContainer = function () {
        var props = this.props;
        return React.createElement("div", { className: props.tabContainerClassName },
            props.showTopLabel ? this.getLabelContainer('top') : null,
            this.getPageContainer(),
            props.showBottomLabel ? this.getLabelContainer('bottom') : null);
    };
    ReactTabber.prototype.render = function () {
        return this.props.tabs ? this.getTabContainer() : null;
    };
    ReactTabber.prototype.switchTo = function (index) {
        var props = this.props;
        //make sure index is valid
        var tabs = props.tabs;
        if (!tabs) {
            return;
        }
        if (index < 0) {
            index = 0;
        }
        else if (index > tabs.length) {
            index = tabs.length - 1;
        }
        //event
        var onSwitch = props.onSwitch;
        if (onSwitch) {
            onSwitch(this.state.activeIndex, index);
        }
        //update
        this.setState({
            activeIndex: index
        });
    };
    ReactTabber.defaultProps = {
        tabContainerClassName: 'tab-container',
        labelContainerClassName: 'label-container',
        labelItemClassName: 'label-item',
        labelItemActiveClassName: 'label-active',
        labelItemInactiveClassName: 'label-inactive',
        pageContainerClassName: 'page-container',
        pageItemClassName: 'page-item',
        pageItemActiveClassName: 'page-active',
        pageItemInactiveClassName: 'page-inactive',
        activeIndex: 0,
        showTopLabel: true,
        showBottomLabel: false,
        clickSwitch: true,
        hoverSwitch: false,
        hoverSwitchDelay: 0,
        leaveCancelSwitch: true
    };
    return ReactTabber;
}(React.Component));
module.exports = ReactTabber;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);

/***/ })
/******/ ]);
});
//# sourceMappingURL=react-tabber.js.map