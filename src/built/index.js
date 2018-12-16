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
import PropTypes from 'prop-types';
import getValidIndex from './utility/get-valid-index';
import normalizeEvents from './utility/normalize-events';
import createEventHandler from "./utility/create-event-handler";
import Label from './component/label';
import Panel from './component/panel';
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
    function ReactTabber(props) {
        var _this = _super.call(this, props) || this;
        _this.activeIndex = -1;
        _this.currentIndex = -1;
        _this.renderedIndex = -1;
        _this.activeIndex = getValidIndex(props.activeIndex);
        _this.state = {
            targetIndex: _this.activeIndex
        };
        return _this;
    }
    ReactTabber.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.activeIndex === undefined) {
            return;
        }
        var oldIndex = this.activeIndex;
        var newIndex = getValidIndex(nextProps.activeIndex);
        if (oldIndex !== newIndex) {
            this.activeIndex = newIndex;
            this.setState({
                targetIndex: this.activeIndex
            });
        }
    };
    ReactTabber.prototype.componentWillMount = function () {
        var props = this.props;
        this.triggerEvents = normalizeEvents(props.triggerEvents);
        this.delayTriggerEvents = normalizeEvents(props.delayTriggerEvents);
        this.delayTriggerCancelEvents = normalizeEvents(props.delayTriggerCancelEvents);
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
            targetIndex: getValidIndex(index)
        });
    };
    ReactTabber.prototype.getTabEntries = function () {
        var entries = [];
        var props = this.props;
        //props.tabs
        if (props.tabs.length) {
            entries.push.apply(entries, props.tabs);
        }
        //props.children
        if (props.children) {
            var currentLabelProps_1 = {};
            var currentLabelItems_1 = [];
            var currentPanelProps_1 = {};
            var currentPanelItems_1 = [];
            var key_1;
            var pushEntry_1 = function () {
                entries.push({
                    labelProps: currentLabelProps_1,
                    label: currentLabelItems_1.length === 1 ? currentLabelItems_1[0] : currentLabelItems_1,
                    panelProps: currentPanelProps_1,
                    panel: currentPanelItems_1.length === 1 ? currentPanelItems_1[0] : currentPanelItems_1,
                    key: key_1
                });
            };
            React.Children.forEach(props.children, function (child) {
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
    };
    ReactTabber.prototype.render = function () {
        var self = this;
        var props = self.props;
        var state = self.state;
        var tabEntries = self.getTabEntries();
        var oldIndex = self.currentIndex;
        var newIndex = self.currentIndex = state.targetIndex >= tabEntries.length ? tabEntries.length - 1 : state.targetIndex;
        if (oldIndex !== newIndex && props.onSwitching) {
            props.onSwitching(oldIndex, newIndex);
        }
        return self.createTabContainer(tabEntries);
    };
    ReactTabber.prototype.updateRenderedIndex = function () {
        var self = this;
        var props = self.props;
        var oldIndex = self.renderedIndex;
        var newIndex = self.renderedIndex = self.currentIndex;
        if (oldIndex !== newIndex && props.onSwitched) {
            props.onSwitched(oldIndex, newIndex);
        }
    };
    ReactTabber.prototype.componentDidMount = function () {
        this.updateRenderedIndex();
    };
    ReactTabber.prototype.componentDidUpdate = function () {
        this.updateRenderedIndex();
    };
    ReactTabber.Label = Label;
    ReactTabber.Panel = Panel;
    ReactTabber.propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            panel: PropTypes.node.isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })).isRequired,
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
    ReactTabber.defaultProps = {
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
    return ReactTabber;
}(React.Component));
export default ReactTabber;
