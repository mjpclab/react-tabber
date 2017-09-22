"use strict";
/// <reference path='main.d.ts' />
/// <reference path='private.d.ts' />
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
var React = require("react");
var PropTypes = require("prop-types");
var RE_WHITESPACES = /\s+/;
function normalizeTriggerEvents(events) {
    if (events) {
        if (Array.isArray(events)) {
            return events;
        }
        else {
            return String(events).split(RE_WHITESPACES);
        }
    }
}
function fillEventHandler(props, events, handler) {
    if (events && events.length) {
        events.forEach(function (event) {
            props[event] = handler;
        });
    }
}
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
    function ReactTabber(props) {
        var _this = _super.call(this, props) || this;
        _this.currentIndex = -1;
        _this.state = {
            targetIndex: _this.getValidIndex(props.activeIndex)
        };
        return _this;
    }
    ReactTabber.prototype.componentWillMount = function () {
        var props = this.props;
        this.triggerEvents = normalizeTriggerEvents(props.triggerEvents);
        this.delayTriggerEvents = normalizeTriggerEvents(props.delayTriggerEvents);
        this.delayTriggerCancelEvents = normalizeTriggerEvents(props.delayTriggerCancelEvents);
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
    ReactTabber.prototype.getLabelContainer = function (positionClassName) {
        var _this = this;
        var props = this.props;
        var labelContainer = React.createElement("div", { className: props.labelContainerClassName + ' ' + positionClassName }, this.props.tabs.map(function (tab, index) {
            var className = props.labelItemClassName + ' ' + (index === _this.currentIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName);
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
            var labelItemProps = {};
            if (_this.delayTriggerEvents && _this.delayTriggerEvents.length) {
                fillEventHandler(labelItemProps, _this.delayTriggerCancelEvents, cancelDelayDoSwitch);
                fillEventHandler(labelItemProps, _this.delayTriggerEvents, delayDoSwitch);
            }
            fillEventHandler(labelItemProps, _this.triggerEvents, doSwitch);
            labelItemProps.key = tab.key ? 'key-' + tab.key : 'index-' + index;
            labelItemProps.className = className;
            return React.createElement('div', labelItemProps, tab.label);
        }));
        return labelContainer;
    };
    ReactTabber.prototype.getPageContainer = function () {
        var _this = this;
        var props = this.props;
        return React.createElement("div", { className: props.pageContainerClassName }, this.props.tabs.map(function (tab, index) {
            var className = props.pageItemClassName + ' ' + (index === _this.currentIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
            return React.createElement("div", { key: tab.key ? 'key-' + tab.key : 'index-' + index, className: className }, tab.page);
        }));
    };
    ReactTabber.prototype.getTabContainer = function () {
        var props = this.props;
        return React.createElement("div", { className: props.tabContainerClassName },
            props.showTopLabelContainer ? this.getLabelContainer(props.topLabelContainerClassName) : null,
            this.getPageContainer(),
            props.showBottomLabelContainer ? this.getLabelContainer(props.bottomLabelContainerClassName) : null);
    };
    ReactTabber.prototype.switchTo = function (index) {
        this.setState({
            targetIndex: this.getValidIndex(index)
        });
    };
    ReactTabber.prototype.render = function () {
        var props = this.props;
        var state = this.state;
        var oldIndex = this.currentIndex;
        var newIndex = this.currentIndex = state.targetIndex >= props.tabs.length ? props.tabs.length - 1 : state.targetIndex;
        if (oldIndex !== newIndex && props.onSwitch) {
            props.onSwitch(oldIndex, newIndex);
        }
        return this.props.tabs ? this.getTabContainer() : null;
    };
    ReactTabber.propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            page: PropTypes.node.isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })).isRequired,
        triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
        delayTriggerLatency: PropTypes.number,
        activeIndex: PropTypes.number,
        onSwitch: PropTypes.func,
        tabContainerClassName: PropTypes.string,
        labelContainerClassName: PropTypes.string,
        showTopLabelContainer: PropTypes.bool,
        showBottomLabelContainer: PropTypes.bool,
        topLabelContainerClassName: PropTypes.string,
        bottomLabelContainerClassName: PropTypes.string,
        labelItemClassName: PropTypes.string,
        labelItemActiveClassName: PropTypes.string,
        labelItemInactiveClassName: PropTypes.string,
        pageContainerClassName: PropTypes.string,
        pageItemClassName: PropTypes.string,
        pageItemActiveClassName: PropTypes.string,
        pageItemInactiveClassName: PropTypes.string
    };
    ReactTabber.defaultProps = {
        tabs: [],
        activeIndex: 0,
        triggerEvents: ['onClick'],
        delayTriggerLatency: 200,
        tabContainerClassName: 'tab-container',
        labelContainerClassName: 'label-container',
        showTopLabelContainer: true,
        showBottomLabelContainer: false,
        topLabelContainerClassName: 'top',
        bottomLabelContainerClassName: 'bottom',
        labelItemClassName: 'label-item',
        labelItemActiveClassName: 'label-active',
        labelItemInactiveClassName: 'label-inactive',
        pageContainerClassName: 'page-container',
        pageItemClassName: 'page-item',
        pageItemActiveClassName: 'page-active',
        pageItemInactiveClassName: 'page-inactive'
    };
    return ReactTabber;
}(React.Component));
module.exports = ReactTabber;
