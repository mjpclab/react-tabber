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
import parseTabEntries from './feature/parse-tab-entries';
import Label from './component/label';
import Panel from './component/panel';
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
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
        var labelContainer = React.createElement("div", { className: labelContainerClassName + ' ' + positionClassName }, tabs.map(function (tab, index) {
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
            return React.createElement("div", __assign({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { key: key ? 'key-' + key : 'index-' + index, className: labelItemClassName + ' ' + (index === _this.currentIndex ? labelItemActiveClassName : labelItemInactiveClassName) }), tab.label);
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
        return React.createElement("div", { className: panelContainerClassName }, tabs.map(function (tab, index) {
            var panelProps = tab.panelProps, key = tab.key;
            return React.createElement("div", __assign({}, panelProps, { key: key ? 'key-' + key : 'index-' + index, className: panelItemClassName + ' ' + (index === _this.currentIndex ? panelItemActiveClassName : panelItemInactiveClassName) }), tab.panel);
        }));
    };
    ReactTabber.prototype.createTabContainer = function (tabs) {
        var _a = this.props, tabContainerClassName = _a.tabContainerClassName, showHeaderLabelContainer = _a.showHeaderLabelContainer, showFooterLabelContainer = _a.showFooterLabelContainer;
        return React.createElement("div", { className: tabContainerClassName },
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
}(React.Component));
export default ReactTabber;
