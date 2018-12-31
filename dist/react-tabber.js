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
        mode: PropTypes.string,
        delayTriggerLatency: PropTypes.number,
        activePosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
        mode: "horizontal" /* Horizontal */,
        activePosition: 0,
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
    function parseTabEntries(propTabs, children) {
        var entries = [];
        // prop entries
        if (propTabs && propTabs.length) {
            entries.push.apply(entries, propTabs.map(function (_entry) {
                var entry = __assign$1({}, _entry);
                if (entry.key === undefined) {
                    entry.key = null;
                }
                return entry;
            }));
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
                    key_1 = typeof element.key !== 'undefined' ? element.key : entries.length;
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

    var invalidNormalizedPosition = {
        index: -1,
        key: undefined
    };
    function getNormalizedPosition(entries, position) {
        if (typeof position === 'number') {
            return {
                index: position,
                key: entries[position] && entries[position].key
            };
        }
        else if (isFinite(position)) {
            var index = parseInt(position);
            return {
                index: index,
                key: entries[index].key
            };
        }
        else if (position) {
            var result_1 = undefined;
            entries.some(function (entry, i) {
                if (entry.key === position) {
                    result_1 = {
                        index: i,
                        key: entry.key
                    };
                    return true;
                }
                return false;
            });
            return result_1 || invalidNormalizedPosition;
        }
        else {
            return invalidNormalizedPosition;
        }
    }

    var classNameSuffix = {
        active: '-active',
        inactive: '-inactive',
        header: '-header',
        footer: '-footer'
    };

    function createEventHandler(events, handler) {
        var eventHandlers = {};
        events && events.length && events.forEach(function (event) {
            eventHandlers[event] = handler;
        });
        return eventHandlers;
    }

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
    function createLabelContainer(props, context, entries, sideSuffix, fnSwitchTo) {
        var mode = props.mode, labelContainerClassName = props.labelContainerClassName, labelItemClassName = props.labelItemClassName, triggerEvents = props.triggerEvents, delayTriggerEvents = props.delayTriggerEvents, delayTriggerCancelEvents = props.delayTriggerCancelEvents, delayTriggerLatency = props.delayTriggerLatency;
        var labelContainerLocationClassName = labelContainerClassName + sideSuffix;
        var labelContainerModeClassName = labelContainerClassName + '-' + mode;
        var labelContainerLocationModeClassName = labelContainerClassName + sideSuffix + '-' + mode;
        var labelItemActiveClassName = labelItemClassName + classNameSuffix.active;
        var labelItemInactiveClassName = labelItemClassName + classNameSuffix.inactive;
        var currentIndex = context.currentPosition.index;
        var labelContainer = React__default.createElement("div", { className: labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName }, entries.map(function (entry, index) {
            var doSwitch = function () {
                clearTimeout(context.delayTimeout);
                fnSwitchTo(index);
            };
            var localDelayTimeout;
            var delayDoSwitch = (delayTriggerLatency) <= 0 ?
                doSwitch :
                function () {
                    clearTimeout(context.delayTimeout);
                    localDelayTimeout = context.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
                };
            var cancelDelayDoSwitch = function () {
                if (localDelayTimeout === context.delayTimeout) {
                    clearTimeout(localDelayTimeout);
                }
            };
            var labelProps = entry.labelProps, key = entry.key;
            var labelDelayTriggerCancelProps;
            var labelDelayTriggerProps;
            if (delayTriggerEvents && delayTriggerEvents.length) {
                labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
                labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
            }
            var labelTriggerProps = createEventHandler(triggerEvents, doSwitch);
            var labelItemStatusClassName = (index === currentIndex ? labelItemActiveClassName : labelItemInactiveClassName);
            return React__default.createElement("div", __assign$2({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { key: key ? 'key-' + key : 'index-' + index, className: labelItemClassName + ' ' + labelItemStatusClassName }), entry.label);
        }));
        return labelContainer;
    }

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
    function createPanelContainer(props, context, entries) {
        var mode = props.mode, panelContainerClassName = props.panelContainerClassName, panelItemClassName = props.panelItemClassName;
        var currentIndex = context.currentPosition.index;
        var panelContainerModeClassName = panelContainerClassName + '-' + mode;
        var panelItemActiveClassName = panelItemClassName + classNameSuffix.active;
        var panelItemInactiveClassName = panelItemClassName + classNameSuffix.inactive;
        return React__default.createElement("div", { className: panelContainerClassName + ' ' + panelContainerModeClassName }, entries.map(function (entry, index) {
            var panelProps = entry.panelProps, key = entry.key;
            var panelItemStatusClassName = index === currentIndex ? panelItemActiveClassName : panelItemInactiveClassName;
            return React__default.createElement("div", __assign$3({}, panelProps, { key: key ? 'key-' + key : 'index-' + index, className: panelItemClassName + ' ' + panelItemStatusClassName }), entry.panel);
        }));
    }

    function createTabContainer(props, context, entries, fnSwitchTo) {
        var mode = props.mode, tabContainerClassName = props.tabContainerClassName, showHeaderLabelContainer = props.showHeaderLabelContainer, showFooterLabelContainer = props.showFooterLabelContainer;
        var tabContainerModeClassName = tabContainerClassName + '-' + mode;
        return React__default.createElement("div", { className: tabContainerClassName + ' ' + tabContainerModeClassName },
            showHeaderLabelContainer ?
                createLabelContainer(props, context, entries, classNameSuffix.header, fnSwitchTo) :
                null,
            createPanelContainer(props, context, entries),
            showFooterLabelContainer ?
                createLabelContainer(props, context, entries, classNameSuffix.header, fnSwitchTo)
                : null);
    }

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
    var Tab = /** @class */ (function (_super) {
        __extends$2(Tab, _super);
        function Tab(props) {
            var _this = _super.call(this, props) || this;
            _this.tabContext = {
                prevPosition: invalidNormalizedPosition,
                currentPosition: invalidNormalizedPosition,
                delayTimeout: 0
            };
            _this.switchTo = _this.switchTo.bind(_this);
            _this.state = {
                prevActivePosition: -1,
                targetPosition: -1,
            };
            return _this;
        }
        Tab.getDerivedStateFromProps = function (props, state) {
            var activePosition = props.activePosition;
            var prevActivePosition = state.prevActivePosition;
            if (activePosition !== prevActivePosition) {
                return {
                    prevActivePosition: activePosition,
                    targetPosition: activePosition
                };
            }
            return null;
        };
        Tab.prototype.componentWillUnmount = function () {
            clearTimeout(this.tabContext.delayTimeout);
        };
        Tab.prototype.switchTo = function (position) {
            this.setState({
                targetPosition: position
            });
        };
        Tab.prototype.render = function () {
            var _a = this, props = _a.props, state = _a.state, tabContext = _a.tabContext;
            var targetPosition = state.targetPosition;
            var normalizedPrevPosition = tabContext.prevPosition;
            var prevIndex = normalizedPrevPosition.index;
            var tabs = props.tabs;
            var normalizedTargetPosition = getNormalizedPosition(tabs, targetPosition);
            var targetIndex = normalizedTargetPosition.index;
            var entryCount = tabs.length;
            var currentIndex;
            if (targetIndex === -1) {
                currentIndex = entryCount > 0 ? 0 : -1;
                tabContext.currentPosition = getNormalizedPosition(tabs, currentIndex);
            }
            else if (targetIndex < entryCount) {
                currentIndex = targetIndex;
                tabContext.currentPosition = normalizedTargetPosition;
            }
            else {
                currentIndex = entryCount - 1;
                tabContext.currentPosition = getNormalizedPosition(tabs, currentIndex);
            }
            if (prevIndex !== currentIndex && props.onSwitching) {
                props.onSwitching(normalizedPrevPosition, tabContext.currentPosition);
            }
            return createTabContainer(props, tabContext, tabs, this.switchTo);
        };
        Tab.prototype.handleIndexChange = function () {
            var _a = this, props = _a.props, tabContext = _a.tabContext;
            var onSwitched = props.onSwitched;
            var prevPosition = tabContext.prevPosition, currentPosition = tabContext.currentPosition;
            if (prevPosition.index !== currentPosition.index && onSwitched) {
                onSwitched(prevPosition, currentPosition);
            }
            tabContext.prevPosition = currentPosition;
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
    var __assign$4 = (undefined && undefined.__assign) || function () {
        __assign$4 = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign$4.apply(this, arguments);
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
            var _a = this.props, tabs = _a.tabs, children = _a.children, triggerEvents = _a.triggerEvents, delayTriggerEvents = _a.delayTriggerEvents, delayTriggerCancelEvents = _a.delayTriggerCancelEvents, props = __rest(_a, ["tabs", "children", "triggerEvents", "delayTriggerEvents", "delayTriggerCancelEvents"]);
            var allTabs = parseTabEntries(tabs, children);
            return React__default.createElement(Tab, __assign$4({}, props, { triggerEvents: normalizeEvents(triggerEvents), delayTriggerEvents: normalizeEvents(delayTriggerEvents), delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents), tabs: allTabs }));
        };
        ReactTabber.Label = Label;
        ReactTabber.Panel = Panel;
        ReactTabber.propTypes = propTypes;
        ReactTabber.defaultProps = defaultProps;
        return ReactTabber;
    }(React__default.Component));

    return ReactTabber;

}));
