(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react'), require('prop-types')) :
    typeof define === 'function' && define.amd ? define(['react', 'prop-types'], factory) :
    (global = global || self, global.ReactTabber = factory(global.React, global.PropTypes));
}(this, function (React, PropTypes) { 'use strict';

    var React__default = 'default' in React ? React['default'] : React;
    PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;

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
    var sharedPropTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            panel: PropTypes.node.isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })),
        delayTriggerLatency: PropTypes.number,
        activeIndex: PropTypes.number,
        onSwitching: PropTypes.func,
        onSwitched: PropTypes.func,
        tabContainerClassName: PropTypes.string,
        labelContainerClassName: PropTypes.string,
        showHeaderLabelContainer: PropTypes.bool,
        showFooterLabelContainer: PropTypes.bool,
        labelItemClassName: PropTypes.string,
        panelContainerClassName: PropTypes.string,
        panelItemClassName: PropTypes.string,
    };
    var propTypes = __assign({}, sharedPropTypes, { triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) });
    var tabPropTypes = __assign({}, sharedPropTypes, { triggerEvents: PropTypes.arrayOf(PropTypes.string), delayTriggerEvents: PropTypes.arrayOf(PropTypes.string), delayTriggerCancelEvents: PropTypes.arrayOf(PropTypes.string) });

    var defaultProps = {
        tabs: [],
        activeIndex: 0,
        triggerEvents: ['onClick'],
        delayTriggerLatency: 200,
        tabContainerClassName: 'tab-container',
        labelContainerClassName: 'label-container',
        showHeaderLabelContainer: true,
        showFooterLabelContainer: false,
        labelItemClassName: 'label-item',
        panelContainerClassName: 'panel-container',
        panelItemClassName: 'panel-item',
    };

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
                        currentPanelProps_1 = __assign$1({}, currentPanelProps_1, element.props);
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

    function createEventHandler(events, handler) {
        var eventHandlers = {};
        events && events.length && events.forEach(function (event) {
            eventHandlers[event] = handler;
        });
        return eventHandlers;
    }

    var classNameSuffix = {
        active: '-active',
        inactive: '-inactive',
        header: '-header',
        footer: '-footer'
    };

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
    var __assign$2 = (undefined && undefined.__assign) || function () {
        __assign$2 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$2.apply(this, arguments);
    };
    var Tab = /** @class */ (function (_super) {
        __extends$2(Tab, _super);
        function Tab(props) {
            var _this = _super.call(this, props) || this;
            _this.tabContext = {
                prevIndex: -1,
                currentIndex: -1,
                delayTimeout: 0
            };
            var activeIndex = props.activeIndex;
            _this.state = {
                prevActiveIndex: activeIndex,
                targetIndex: activeIndex,
            };
            return _this;
        }
        Tab.getDerivedStateFromProps = function (props, state) {
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
        Tab.prototype.componentWillUnmount = function () {
            clearTimeout(this.tabContext.delayTimeout);
        };
        Tab.prototype.createLabelContainer = function (tabs, position) {
            var _this = this;
            var tabContext = this.tabContext;
            var _a = this.props, labelContainerClassName = _a.labelContainerClassName, labelItemClassName = _a.labelItemClassName, triggerEvents = _a.triggerEvents, delayTriggerEvents = _a.delayTriggerEvents, delayTriggerCancelEvents = _a.delayTriggerCancelEvents, delayTriggerLatency = _a.delayTriggerLatency;
            var labelContainerLocationClassName = labelContainerClassName + position;
            var labelItemActiveClassName = labelItemClassName + classNameSuffix.active;
            var labelItemInactiveClassName = labelItemClassName + classNameSuffix.inactive;
            var labelContainer = React__default.createElement("div", { className: labelContainerClassName + ' ' + labelContainerLocationClassName }, tabs.map(function (tab, index) {
                var doSwitch = function () {
                    clearTimeout(tabContext.delayTimeout);
                    _this.switchTo(index);
                };
                var localDelayTimeout;
                var delayDoSwitch = (delayTriggerLatency) <= 0 ?
                    doSwitch :
                    function () {
                        clearTimeout(tabContext.delayTimeout);
                        localDelayTimeout = tabContext.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
                    };
                var cancelDelayDoSwitch = function () {
                    if (localDelayTimeout === tabContext.delayTimeout) {
                        clearTimeout(localDelayTimeout);
                    }
                };
                var labelProps = tab.labelProps, key = tab.key;
                var labelDelayTriggerCancelProps;
                var labelDelayTriggerProps;
                if (delayTriggerEvents && delayTriggerEvents.length) {
                    labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
                    labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
                }
                var labelTriggerProps = createEventHandler(triggerEvents, doSwitch);
                var labelItemStatusClassName = (index === tabContext.currentIndex ? labelItemActiveClassName : labelItemInactiveClassName);
                return React__default.createElement("div", __assign$2({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { key: key ? 'key-' + key : 'index-' + index, className: labelItemClassName + ' ' + labelItemStatusClassName }), tab.label);
            }));
            return labelContainer;
        };
        Tab.prototype.createPanelContainer = function (tabs) {
            var _this = this;
            var _a = this.props, panelContainerClassName = _a.panelContainerClassName, panelItemClassName = _a.panelItemClassName;
            var panelItemActiveClassName = panelItemClassName + classNameSuffix.active;
            var panelItemInactiveClassName = panelItemClassName + classNameSuffix.inactive;
            return React__default.createElement("div", { className: panelContainerClassName }, tabs.map(function (tab, index) {
                var panelProps = tab.panelProps, key = tab.key;
                var panelItemStatusClassName = index === _this.tabContext.currentIndex ? panelItemActiveClassName : panelItemInactiveClassName;
                return React__default.createElement("div", __assign$2({}, panelProps, { key: key ? 'key-' + key : 'index-' + index, className: panelItemClassName + ' ' + panelItemStatusClassName }), tab.panel);
            }));
        };
        Tab.prototype.createTabContainer = function (tabs) {
            var _a = this.props, tabContainerClassName = _a.tabContainerClassName, showHeaderLabelContainer = _a.showHeaderLabelContainer, showFooterLabelContainer = _a.showFooterLabelContainer;
            return React__default.createElement("div", { className: tabContainerClassName },
                showHeaderLabelContainer ? this.createLabelContainer(tabs, classNameSuffix.header) : null,
                this.createPanelContainer(tabs),
                showFooterLabelContainer ? this.createLabelContainer(tabs, classNameSuffix.footer) : null);
        };
        Tab.prototype.switchTo = function (index) {
            this.setState({
                targetIndex: getNumericIndex(index)
            });
        };
        Tab.prototype.render = function () {
            var _a = this, props = _a.props, state = _a.state, tabContext = _a.tabContext;
            var prevIndex = tabContext.prevIndex;
            var tabs = props.tabs;
            var currentIndex = tabContext.currentIndex = Math.min(state.targetIndex, tabs.length - 1);
            if (prevIndex !== currentIndex && props.onSwitching) {
                props.onSwitching(prevIndex, currentIndex);
            }
            return this.createTabContainer(tabs);
        };
        Tab.prototype.handleIndexChange = function () {
            var _a = this, props = _a.props, tabContext = _a.tabContext;
            var prevIndex = tabContext.prevIndex, currentIndex = tabContext.currentIndex;
            if (prevIndex !== currentIndex && props.onSwitched) {
                props.onSwitched(prevIndex, currentIndex);
            }
            tabContext.prevIndex = currentIndex;
        };
        Tab.prototype.componentDidMount = function () {
            this.handleIndexChange();
        };
        Tab.prototype.componentDidUpdate = function () {
            this.handleIndexChange();
        };
        Tab.propTypes = tabPropTypes;
        Tab.defaultProps = defaultProps;
        return Tab;
    }(React__default.Component));

    /// <reference path='./type/public.d.ts' />
    var __extends$3 = (undefined && undefined.__extends) || (function () {
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
    var __assign$3 = (undefined && undefined.__assign) || function () {
        __assign$3 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$3.apply(this, arguments);
    };
    var __rest = (undefined && undefined.__rest) || function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
                t[p[i]] = s[p[i]];
        return t;
    };
    var ReactTabber = /** @class */ (function (_super) {
        __extends$3(ReactTabber, _super);
        function ReactTabber() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ReactTabber.prototype.render = function () {
            var _a = this.props, triggerEvents = _a.triggerEvents, delayTriggerEvents = _a.delayTriggerEvents, delayTriggerCancelEvents = _a.delayTriggerCancelEvents, props = __rest(_a, ["triggerEvents", "delayTriggerEvents", "delayTriggerCancelEvents"]);
            var tabs = parseTabEntries(this.props, this.props.children);
            return React__default.createElement(Tab, __assign$3({}, props, { triggerEvents: normalizeEvents(triggerEvents), delayTriggerEvents: normalizeEvents(delayTriggerEvents), delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents), tabs: tabs }));
        };
        ReactTabber.Label = Label;
        ReactTabber.Panel = Panel;
        ReactTabber.propTypes = propTypes;
        ReactTabber.defaultProps = defaultProps;
        return ReactTabber;
    }(React__default.Component));

    return ReactTabber;

}));
