(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
    typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
    global.ReactTabber = factory(global.React,global.PropTypes);
}(typeof self !== 'undefined' ? self : this, function (React,PropTypes) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

    function getNumericIndex(index) {
        if (index === '' || !isFinite(index) || isNaN(index)) {
            return -1;
        }
        var intIndex = parseInt(index);
        if (intIndex < -1) {
            intIndex = -1;
        }
        return intIndex;
    }

    var RE_WHITESPACES = /\s+/;
    function normalizeEvents(events) {
        if (events) {
            if (Array.isArray(events)) {
                return events;
            }
            else {
                return String(events).split(RE_WHITESPACES);
            }
        }
    }

    function createEventHandler(events, handler) {
        var eventHandlers = {};
        events && events.length && events.forEach(function (event) {
            eventHandlers[event] = handler;
        });
        return eventHandlers;
    }

    var tabberPropTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            panel: PropTypes.node.isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })),
        triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        delayTriggerLatency: PropTypes.number,
        activeIndex: PropTypes.number,
        onSwitching: PropTypes.func,
        onSwitched: PropTypes.func,
        tabContainerClassName: PropTypes.string,
        labelContainerClassName: PropTypes.string,
        showHeaderLabelContainer: PropTypes.bool,
        showFooterLabelContainer: PropTypes.bool,
        headerLabelContainerClassName: PropTypes.string,
        footerLabelContainerClassName: PropTypes.string,
        labelItemClassName: PropTypes.string,
        labelItemActiveClassName: PropTypes.string,
        labelItemInactiveClassName: PropTypes.string,
        panelContainerClassName: PropTypes.string,
        panelItemClassName: PropTypes.string,
        panelItemActiveClassName: PropTypes.string,
        panelItemInactiveClassName: PropTypes.string
    };

    var tabberDefaultProps = {
        tabs: [],
        activeIndex: 0,
        triggerEvents: ['onClick'],
        delayTriggerLatency: 200,
        tabContainerClassName: 'tab-container',
        labelContainerClassName: 'label-container',
        showHeaderLabelContainer: true,
        showFooterLabelContainer: false,
        headerLabelContainerClassName: 'header-container',
        footerLabelContainerClassName: 'footer-container',
        labelItemClassName: 'label-item',
        labelItemActiveClassName: 'label-active',
        labelItemInactiveClassName: 'label-inactive',
        panelContainerClassName: 'panel-container',
        panelItemClassName: 'panel-item',
        panelItemActiveClassName: 'panel-active',
        panelItemInactiveClassName: 'panel-inactive'
    };

    var __extends = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Label;
    }(React.Component));

    var __extends$1 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var Panel = /** @class */ (function (_super) {
        __extends$1(Panel, _super);
        function Panel() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Panel;
    }(React.Component));

    var __assign = (undefined && undefined.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function parseTabEntries(props, children) {
        var entries = [];
        // tabs
        if (props.tabs && props.tabs.length) {
            entries.push.apply(entries, props.tabs);
        }
        // children
        if (children) {
            var currentLabelProps_1 = {};
            var currentLabelItems_1 = [];
            var currentPanelProps_1 = {};
            var currentPanelItems_1 = [];
            var key_1;
            var pushEntry_1 = function () {
                entries.push({
                    labelProps: currentLabelProps_1,
                    label: currentLabelItems_1,
                    panelProps: currentPanelProps_1,
                    panel: currentPanelItems_1,
                    key: key_1
                });
            };
            React__default.Children.forEach(children, function (child) {
                var element = child;
                if (element.type && element.type === Label) {
                    if (currentLabelItems_1.length) { // end of previous entry
                        pushEntry_1();
                    }
                    currentLabelProps_1 = element.props;
                    currentLabelItems_1 = [];
                    if (Array.isArray(element.props.children)) {
                        currentLabelItems_1.push.apply(currentLabelItems_1, element.props.children);
                    }
                    else {
                        currentLabelItems_1.push(element.props.children);
                    }
                    currentPanelProps_1 = {};
                    currentPanelItems_1 = [];
                    key_1 = element.key ? 'key-' + element.key : 'index-' + entries.length;
                }
                else {
                    if (!currentLabelItems_1.length) {
                        currentLabelItems_1.push('');
                    }
                    if (element.type && element.type === Panel) {
                        currentPanelProps_1 = __assign({}, currentPanelProps_1, element.props);
                        if (Array.isArray(element.props.children)) {
                            currentPanelItems_1.push.apply(currentPanelItems_1, element.props.children);
                        }
                        else {
                            currentPanelItems_1.push(element.props.children);
                        }
                    }
                    else if (element.type) {
                        currentPanelItems_1.push(element);
                    }
                }
            });
            if (currentLabelItems_1.length) {
                pushEntry_1();
            }
        }
        return entries;
    }

    /// <reference path='./type/public.d.ts' />
    var __extends$2 = (undefined && undefined.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    var __assign$1 = (undefined && undefined.__assign) || function () {
        __assign$1 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$1.apply(this, arguments);
    };
    var ReactTabber = /** @class */ (function (_super) {
        __extends$2(ReactTabber, _super);
        function ReactTabber(props) {
            var _this = _super.call(this, props) || this;
            _this.currentIndex = -1;
            _this.prevIndex = -1;
            var activeIndex = props.activeIndex;
            _this.state = {
                prevActiveIndex: activeIndex,
                targetIndex: activeIndex
            };
            _this.triggerEvents = normalizeEvents(props.triggerEvents);
            _this.delayTriggerEvents = normalizeEvents(props.delayTriggerEvents);
            _this.delayTriggerCancelEvents = normalizeEvents(props.delayTriggerCancelEvents);
            return _this;
        }
        ReactTabber.getDerivedStateFromProps = function (props, state) {
            var activeIndex = getNumericIndex(props.activeIndex);
            var prevActiveIndex = state.prevActiveIndex;
            if (activeIndex !== prevActiveIndex) {
                return {
                    prevActiveIndex: activeIndex,
                    targetIndex: activeIndex
                };
            }
            return null;
        };
        ReactTabber.prototype.componentWillUnmount = function () {
            clearTimeout(this.delayTimeout);
        };
        ReactTabber.prototype._createLabelContainer = function (tabs, positionClassName) {
            var _this = this;
            var _a = this.props, labelContainerClassName = _a.labelContainerClassName, labelItemClassName = _a.labelItemClassName, labelItemActiveClassName = _a.labelItemActiveClassName, labelItemInactiveClassName = _a.labelItemInactiveClassName, delayTriggerLatency = _a.delayTriggerLatency;
            var labelContainer = React__default.createElement("div", { className: labelContainerClassName + ' ' + positionClassName }, tabs.map(function (tab, index) {
                var doSwitch = function () {
                    clearTimeout(_this.delayTimeout);
                    _this.switchTo(index);
                };
                var localDelayTimeout;
                var delayDoSwitch = (delayTriggerLatency) <= 0 ?
                    doSwitch :
                    function () {
                        clearTimeout(_this.delayTimeout);
                        localDelayTimeout = _this.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
                    };
                var cancelDelayDoSwitch = function () {
                    if (localDelayTimeout === _this.delayTimeout) {
                        clearTimeout(localDelayTimeout);
                    }
                };
                var labelProps = tab.labelProps, key = tab.key;
                var labelDelayTriggerCancelProps;
                var labelDelayTriggerProps;
                if (_this.delayTriggerEvents && _this.delayTriggerEvents.length) {
                    labelDelayTriggerCancelProps = createEventHandler(_this.delayTriggerCancelEvents, cancelDelayDoSwitch);
                    labelDelayTriggerProps = createEventHandler(_this.delayTriggerEvents, delayDoSwitch);
                }
                var labelTriggerProps = createEventHandler(_this.triggerEvents, doSwitch);
                return React__default.createElement("div", __assign$1({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { key: key ? 'key-' + key : 'index-' + index, className: labelItemClassName + ' ' + (index === _this.currentIndex ? labelItemActiveClassName : labelItemInactiveClassName) }), tab.label);
            }));
            return labelContainer;
        };
        ReactTabber.prototype.createHeaderLabelContainer = function (tabs) {
            return this._createLabelContainer(tabs, this.props.headerLabelContainerClassName);
        };
        ReactTabber.prototype.createFooterLabelContainer = function (tabs) {
            return this._createLabelContainer(tabs, this.props.footerLabelContainerClassName);
        };
        ReactTabber.prototype.createPanelContainer = function (tabs) {
            var _this = this;
            var _a = this.props, panelContainerClassName = _a.panelContainerClassName, panelItemClassName = _a.panelItemClassName, panelItemActiveClassName = _a.panelItemActiveClassName, panelItemInactiveClassName = _a.panelItemInactiveClassName;
            return React__default.createElement("div", { className: panelContainerClassName }, tabs.map(function (tab, index) {
                var panelProps = tab.panelProps, key = tab.key;
                return React__default.createElement("div", __assign$1({}, panelProps, { key: key ? 'key-' + key : 'index-' + index, className: panelItemClassName + ' ' + (index === _this.currentIndex ? panelItemActiveClassName : panelItemInactiveClassName) }), tab.panel);
            }));
        };
        ReactTabber.prototype.createTabContainer = function (tabs) {
            var _a = this.props, tabContainerClassName = _a.tabContainerClassName, showHeaderLabelContainer = _a.showHeaderLabelContainer, showFooterLabelContainer = _a.showFooterLabelContainer;
            return React__default.createElement("div", { className: tabContainerClassName },
                showHeaderLabelContainer ? this.createHeaderLabelContainer(tabs) : null,
                this.createPanelContainer(tabs),
                showFooterLabelContainer ? this.createFooterLabelContainer(tabs) : null);
        };
        ReactTabber.prototype.switchTo = function (index) {
            this.setState({
                targetIndex: getNumericIndex(index)
            });
        };
        ReactTabber.prototype.render = function () {
            var _a = this, props = _a.props, state = _a.state, prevIndex = _a.prevIndex;
            var tabEntries = parseTabEntries(props, props.children);
            var currentIndex = this.currentIndex = Math.min(state.targetIndex, tabEntries.length - 1);
            if (prevIndex !== currentIndex && props.onSwitching) {
                props.onSwitching(prevIndex, currentIndex);
            }
            return this.createTabContainer(tabEntries);
        };
        ReactTabber.prototype.handleIndexChange = function () {
            var _a = this, props = _a.props, prevIndex = _a.prevIndex, currentIndex = _a.currentIndex;
            if (prevIndex !== currentIndex && props.onSwitched) {
                props.onSwitched(prevIndex, currentIndex);
            }
            this.prevIndex = currentIndex;
        };
        ReactTabber.prototype.componentDidMount = function () {
            this.handleIndexChange();
        };
        ReactTabber.prototype.componentDidUpdate = function () {
            this.handleIndexChange();
        };
        ReactTabber.Label = Label;
        ReactTabber.Panel = Panel;
        ReactTabber.propTypes = tabberPropTypes;
        ReactTabber.defaultProps = tabberDefaultProps;
        return ReactTabber;
    }(React__default.Component));

    return ReactTabber;

}));
