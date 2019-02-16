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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createEventHandler from '../utility/create-event-handler';
import classNameSuffix from '../utility/class-name-suffix';
import { getLabelItemId, getPanelItemId } from '../utility/get-id';
var UP = 'Up';
var DOWN = 'Down';
var LEFT = 'Left';
var RIGHT = 'Right';
var ARROW_UP = 'ArrowUp';
var ARROW_DOWN = 'ArrowDown';
var ARROW_LEFT = 'ArrowLeft';
var ARROW_RIGHT = 'ArrowRight';
var TAB = 'Tab';
var HOME = 'Home';
var END = 'End';
var SPACE = ' ';
var ENTER = 'Enter';
var LabelContainer = /** @class */ (function (_super) {
    __extends(LabelContainer, _super);
    function LabelContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.onKeyDown = _this.onKeyDown.bind(_this);
        _this.state = {
            labelContainerAllClassName: '',
            labelItemActiveClassName: '',
            labelItemInactiveClassName: '',
            labelItemDisabledClassName: '',
            labelItemHiddenClassName: ''
        };
        return _this;
    }
    LabelContainer.getDerivedStateFromProps = function (props) {
        var _a = props.tabProps, mode = _a.mode, labelContainerClassName = _a.labelContainerClassName, labelItemClassName = _a.labelItemClassName, side = props.side;
        var labelContainerLocationClassName = labelContainerClassName + '-' + side;
        var labelContainerModeClassName = labelContainerClassName + '-' + mode;
        var labelContainerLocationModeClassName = labelContainerClassName + '-' + side + '-' + mode;
        var labelContainerAllClassName = labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName;
        var labelItemActiveClassName = labelItemClassName + '-' + classNameSuffix.active;
        var labelItemInactiveClassName = labelItemClassName + '-' + classNameSuffix.inactive;
        var labelItemDisabledClassName = labelItemClassName + '-' + classNameSuffix.disabled;
        var labelItemHiddenClassName = labelItemClassName + '-' + classNameSuffix.hidden;
        return {
            labelContainerAllClassName: labelContainerAllClassName,
            labelItemActiveClassName: labelItemActiveClassName,
            labelItemInactiveClassName: labelItemInactiveClassName,
            labelItemDisabledClassName: labelItemDisabledClassName,
            labelItemHiddenClassName: labelItemHiddenClassName
        };
    };
    LabelContainer.prototype.onKeyDown = function (e, pos) {
        var _a = this.props, fnSwitchTo = _a.fnSwitchTo, fnSwitchPrevious = _a.fnSwitchPrevious, fnSwitchNext = _a.fnSwitchNext, fnSwitchFirst = _a.fnSwitchFirst, fnSwitchLast = _a.fnSwitchLast;
        var switchResult;
        if (e.key) {
            switch (e.key) {
                case UP:
                case LEFT:
                case ARROW_UP:
                case ARROW_LEFT:
                    switchResult = fnSwitchPrevious();
                    break;
                case DOWN:
                case RIGHT:
                case ARROW_DOWN:
                case ARROW_RIGHT:
                    switchResult = fnSwitchNext();
                    break;
                case TAB:
                    switchResult = e.shiftKey ? fnSwitchPrevious() : fnSwitchNext();
                    if (switchResult) {
                        e.preventDefault();
                    }
                    break;
                case HOME:
                    switchResult = fnSwitchFirst();
                    break;
                case END:
                    switchResult = fnSwitchLast();
                    break;
                case SPACE:
                case ENTER:
                    switchResult = fnSwitchTo(pos);
                    break;
            }
        }
        if (switchResult) {
            var targetNode = e.currentTarget.parentNode.childNodes[switchResult.index];
            targetNode && targetNode.focus && targetNode.focus();
            e.preventDefault();
        }
    };
    LabelContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, _b = _a.tabProps, keyboardSwitch = _b.keyboardSwitch, labelItemClassName = _b.labelItemClassName, triggerEvents = _b.triggerEvents, delayTriggerEvents = _b.delayTriggerEvents, delayTriggerCancelEvents = _b.delayTriggerCancelEvents, delayTriggerLatency = _b.delayTriggerLatency, entries = _a.entries, tabContext = _a.tabContext, side = _a.side, fnSwitchTo = _a.fnSwitchTo;
        var tabberId = tabContext.tabberId, currentIndex = tabContext.currentPosition.index;
        var _c = this.state, labelContainerAllClassName = _c.labelContainerAllClassName, labelItemActiveClassName = _c.labelItemActiveClassName, labelItemInactiveClassName = _c.labelItemInactiveClassName, labelItemDisabledClassName = _c.labelItemDisabledClassName, labelItemHiddenClassName = _c.labelItemHiddenClassName;
        return React.createElement("div", { className: labelContainerAllClassName, role: "tablist" }, entries.map(function (entry, index) {
            var labelProps = entry.labelProps, key = entry.key, disabled = entry.disabled, hidden = entry.hidden;
            var pos = { index: index, key: key };
            var labelDelayTriggerCancelProps;
            var labelDelayTriggerProps;
            var labelTriggerProps;
            if (!disabled && !hidden) {
                var doSwitch_1 = function () {
                    clearTimeout(tabContext.delayTimeout);
                    fnSwitchTo(pos);
                };
                var localDelayTimeout_1;
                var delayDoSwitch = (delayTriggerLatency) <= 0 ?
                    doSwitch_1 :
                    function () {
                        clearTimeout(tabContext.delayTimeout);
                        localDelayTimeout_1 = tabContext.delayTimeout = setTimeout(doSwitch_1, delayTriggerLatency);
                    };
                var cancelDelayDoSwitch = function () {
                    if (localDelayTimeout_1 === tabContext.delayTimeout) {
                        clearTimeout(localDelayTimeout_1);
                    }
                };
                if (delayTriggerEvents && delayTriggerEvents.length) {
                    labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
                    labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
                }
                labelTriggerProps = createEventHandler(triggerEvents, doSwitch_1);
            }
            var isActive = index === currentIndex;
            var labelItemStatusClassName = isActive ? labelItemActiveClassName : labelItemInactiveClassName;
            var labelItemAllClassName = labelItemClassName + ' ' + labelItemStatusClassName;
            if (disabled) {
                labelItemAllClassName += ' ' + labelItemDisabledClassName;
            }
            if (hidden) {
                labelItemAllClassName += ' ' + labelItemHiddenClassName;
            }
            return React.createElement("label", __assign({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { className: labelItemAllClassName, tabIndex: 0, id: getLabelItemId(tabberId, side, index), role: "tab", "aria-controls": getPanelItemId(tabberId, index), "aria-selected": isActive, "aria-expanded": isActive, key: key ? 'key-' + key : 'index-' + index, onKeyDown: keyboardSwitch ? function (e) { return _this.onKeyDown(e, pos); } : undefined }), entry.label);
        }));
    };
    LabelContainer.propTypes = {
        tabProps: PropTypes.object,
        tabContext: PropTypes.object,
        entries: PropTypes.arrayOf(PropTypes.object),
        side: PropTypes.string,
        fnSwitchTo: PropTypes.func,
        fnSwitchPrevious: PropTypes.func,
        fnSwitchNext: PropTypes.func,
        fnSwitchFirst: PropTypes.func,
        fnSwitchLast: PropTypes.func
    };
    return LabelContainer;
}(Component));
export default LabelContainer;
