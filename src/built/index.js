/// <reference path='./type/public.d.ts' />
/// <reference path='./type/private.d.ts' />
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
        _this.activeIndex = _this.getValidIndex(props.activeIndex);
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
        var newIndex = this.getValidIndex(nextProps.activeIndex);
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
    ReactTabber.prototype.getValidIndex = function (index) {
        if (index === '' || !isFinite(index) || isNaN(index)) {
            return -1;
        }
        var intIndex = parseInt(index);
        return intIndex < 0 ? 0 : index;
    };
    ReactTabber.prototype._getLabelContainer = function (tabs, positionClassName) {
        var _this = this;
        var props = this.props;
        var labelContainer = React.createElement("div", { className: props.labelContainerClassName + ' ' + positionClassName }, tabs.map(function (tab, index) {
            var doSwitch = function () {
                clearTimeout(_this.delayTimeout);
                _this.switchTo(index);
            };
            var localDelayTimeout;
            var delayDoSwitch = (props.delayTriggerLatency) <= 0 ?
                doSwitch :
                function () {
                    clearTimeout(_this.delayTimeout);
                    localDelayTimeout = _this.delayTimeout = setTimeout(doSwitch, props.delayTriggerLatency);
                };
            var cancelDelayDoSwitch = function () {
                if (localDelayTimeout === _this.delayTimeout) {
                    clearTimeout(localDelayTimeout);
                }
            };
            var labelItemProps = Object.assign({}, tab.labelProps);
            if (_this.delayTriggerEvents && _this.delayTriggerEvents.length) {
                Object.assign(labelItemProps, createEventHandler(_this.delayTriggerCancelEvents, cancelDelayDoSwitch), createEventHandler(_this.delayTriggerEvents, delayDoSwitch));
            }
            Object.assign(labelItemProps, createEventHandler(_this.triggerEvents, doSwitch), {
                key: tab.key ? 'key-' + tab.key : 'index-' + index,
                className: props.labelItemClassName + ' ' + (index === _this.currentIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName)
            });
            return React.createElement("div", __assign({}, labelItemProps), tab.label);
        }));
        return labelContainer;
    };
    ReactTabber.prototype.getHeaderLabelContainer = function (tabs) {
        return this._getLabelContainer(tabs, this.props.headerLabelContainerClassName);
    };
    ReactTabber.prototype.getFooterLabelContainer = function (tabs) {
        return this._getLabelContainer(tabs, this.props.footerLabelContainerClassName);
    };
    ReactTabber.prototype.getPanelContainer = function (tabs) {
        var _this = this;
        var props = this.props;
        return React.createElement("div", { className: props.panelContainerClassName }, tabs.map(function (tab, index) {
            var panelItemProps = Object.assign({}, tab.panelProps, {
                key: tab.key ? 'key-' + tab.key : 'index-' + index,
                className: props.panelItemClassName + ' ' + (index === _this.currentIndex ? props.panelItemActiveClassName : props.panelItemInactiveClassName)
            });
            return React.createElement("div", __assign({}, panelItemProps), tab.panel);
        }));
    };
    ReactTabber.prototype.getTabContainer = function (tabs) {
        var props = this.props;
        return React.createElement("div", { className: props.tabContainerClassName },
            props.showHeaderLabelContainer ? this.getHeaderLabelContainer(tabs) : null,
            this.getPanelContainer(tabs),
            props.showFooterLabelContainer ? this.getFooterLabelContainer(tabs) : null);
    };
    ReactTabber.prototype.switchTo = function (index) {
        this.setState({
            targetIndex: this.getValidIndex(index)
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
            React.Children.forEach(props.children, function (child) {
                var element = child;
                if (element.type && element.type === Label) {
                    if (currentLabelItems_1.length) {
                        entries.push({
                            labelProps: currentLabelProps_1,
                            label: currentLabelItems_1.length === 1 ? currentLabelItems_1[0] : currentLabelItems_1,
                            panelProps: currentPanelProps_1,
                            panel: currentPanelItems_1.length === 1 ? currentPanelItems_1[0] : currentPanelItems_1,
                            key: key_1
                        });
                    }
                    currentLabelProps_1 = Object.assign({}, element.props);
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
                        Object.assign(currentPanelProps_1, element.props);
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
                entries.push({
                    labelProps: currentLabelProps_1,
                    label: currentLabelItems_1.length === 1 ? currentLabelItems_1[0] : currentLabelItems_1,
                    panelProps: currentPanelProps_1,
                    panel: currentPanelItems_1.length === 1 ? currentPanelItems_1[0] : currentPanelItems_1,
                    key: key_1
                });
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
        return self.getTabContainer(tabEntries);
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
