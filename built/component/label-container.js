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
import { labelContainerPropTypes } from '../utility/prop-types';
import createEventHandler from '../utility/create-event-handler';
import ClassNameSuffix from '../utility/class-name-suffix';
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
    function LabelContainer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
        var _a = this.props, entries = _a.entries, mode = _a.mode, keyboardSwitch = _a.keyboardSwitch, triggerEvents = _a.triggerEvents, labelContainerClassName = _a.labelContainerClassName, labelItemClassName = _a.labelItemClassName, delayTriggerEvents = _a.delayTriggerEvents, delayTriggerCancelEvents = _a.delayTriggerCancelEvents, delayTriggerLatency = _a.delayTriggerLatency, tabContext = _a.tabContext, currentIndex = _a.currentIndex, side = _a.side, fnSwitchTo = _a.fnSwitchTo;
        var labelContainerSideClassName = labelContainerClassName + '-' + side;
        var labelContainerModeClassName = labelContainerClassName + '-' + mode;
        var labelContainerSideModeClassName = labelContainerClassName + '-' + side + '-' + mode;
        var labelContainerAllClassName = labelContainerClassName + ' ' + labelContainerSideClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerSideModeClassName;
        var labelItemActiveClassName = labelItemClassName + '-' + ClassNameSuffix.active;
        var labelItemInactiveClassName = labelItemClassName + '-' + ClassNameSuffix.inactive;
        var labelItemDisabledClassName = labelItemClassName + '-' + ClassNameSuffix.disabled;
        var labelItemHiddenClassName = labelItemClassName + '-' + ClassNameSuffix.hidden;
        var tabberId = tabContext.tabberId;
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
                if (delayTriggerEvents.length) {
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
    LabelContainer.propTypes = labelContainerPropTypes;
    return LabelContainer;
}(Component));
export default LabelContainer;
