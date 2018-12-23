/// <reference path='./type/public.d.ts' />
var __extends = (this && this.__extends) || (function () {
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
var __assign = (this && this.__assign) || function () {
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
import React from 'react';
import getNumericIndex from './utility/get-numeric-index';
import normalizeEvents from './utility/normalize-events';
import createEventHandler from "./utility/create-event-handler";
import tabberPropTypes from './utility/tabber-prop-types';
import tabberDefaultProps from './utility/tabber-default-props';
import classNameSuffix from './utility/class-name-suffix';
import parseTabEntries from './feature/parse-tab-entries';
import Label from './component/label';
import Panel from './component/panel';
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
    function ReactTabber(props) {
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
    ReactTabber.getDerivedStateFromProps = function (props, state) {
        var triggerEvents = props.triggerEvents, delayTriggerEvents = props.delayTriggerEvents, delayTriggerCancelEvents = props.delayTriggerCancelEvents;
        var result = {
            triggerEvents: normalizeEvents(triggerEvents),
            delayTriggerEvents: normalizeEvents(delayTriggerEvents),
            delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents)
        };
        var activeIndex = getNumericIndex(props.activeIndex);
        var prevActiveIndex = state.prevActiveIndex;
        if (activeIndex !== prevActiveIndex) {
            result = __assign({}, result, { prevActiveIndex: activeIndex, targetIndex: activeIndex });
        }
        return result;
    };
    ReactTabber.prototype.componentWillUnmount = function () {
        clearTimeout(this.tabContext.delayTimeout);
    };
    ReactTabber.prototype.createLabelContainer = function (tabs, position) {
        var _this = this;
        var tabContext = this.tabContext;
        var _a = this.props, labelContainerClassName = _a.labelContainerClassName, labelItemClassName = _a.labelItemClassName, delayTriggerLatency = _a.delayTriggerLatency;
        var _b = this.state, triggerEvents = _b.triggerEvents, delayTriggerEvents = _b.delayTriggerEvents, delayTriggerCancelEvents = _b.delayTriggerCancelEvents;
        var labelContainerLocationClassName = labelContainerClassName + position;
        var labelItemActiveClassName = labelItemClassName + classNameSuffix.active;
        var labelItemInactiveClassName = labelItemClassName + classNameSuffix.inactive;
        var labelContainer = React.createElement("div", { className: labelContainerClassName + ' ' + labelContainerLocationClassName }, tabs.map(function (tab, index) {
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
            return React.createElement("div", __assign({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { key: key ? 'key-' + key : 'index-' + index, className: labelItemClassName + ' ' + labelItemStatusClassName }), tab.label);
        }));
        return labelContainer;
    };
    ReactTabber.prototype.createPanelContainer = function (tabs) {
        var _this = this;
        var _a = this.props, panelContainerClassName = _a.panelContainerClassName, panelItemClassName = _a.panelItemClassName;
        var panelItemActiveClassName = panelItemClassName + classNameSuffix.active;
        var panelItemInactiveClassName = panelItemClassName + classNameSuffix.inactive;
        return React.createElement("div", { className: panelContainerClassName }, tabs.map(function (tab, index) {
            var panelProps = tab.panelProps, key = tab.key;
            var panelItemStatusClassName = index === _this.tabContext.currentIndex ? panelItemActiveClassName : panelItemInactiveClassName;
            return React.createElement("div", __assign({}, panelProps, { key: key ? 'key-' + key : 'index-' + index, className: panelItemClassName + ' ' + panelItemStatusClassName }), tab.panel);
        }));
    };
    ReactTabber.prototype.createTabContainer = function (tabs) {
        var _a = this.props, tabContainerClassName = _a.tabContainerClassName, showHeaderLabelContainer = _a.showHeaderLabelContainer, showFooterLabelContainer = _a.showFooterLabelContainer;
        return React.createElement("div", { className: tabContainerClassName },
            showHeaderLabelContainer ? this.createLabelContainer(tabs, classNameSuffix.header) : null,
            this.createPanelContainer(tabs),
            showFooterLabelContainer ? this.createLabelContainer(tabs, classNameSuffix.footer) : null);
    };
    ReactTabber.prototype.switchTo = function (index) {
        this.setState({
            targetIndex: getNumericIndex(index)
        });
    };
    ReactTabber.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, tabContext = _a.tabContext;
        var prevIndex = tabContext.prevIndex;
        var tabEntries = parseTabEntries(props, props.children);
        var currentIndex = tabContext.currentIndex = Math.min(state.targetIndex, tabEntries.length - 1);
        if (prevIndex !== currentIndex && props.onSwitching) {
            props.onSwitching(prevIndex, currentIndex);
        }
        return this.createTabContainer(tabEntries);
    };
    ReactTabber.prototype.handleIndexChange = function () {
        var _a = this, props = _a.props, tabContext = _a.tabContext;
        var prevIndex = tabContext.prevIndex, currentIndex = tabContext.currentIndex;
        if (prevIndex !== currentIndex && props.onSwitched) {
            props.onSwitched(prevIndex, currentIndex);
        }
        tabContext.prevIndex = currentIndex;
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
}(React.Component));
export default ReactTabber;
