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
import createEventHandler from '../utility/create-event-handler';
import classNameSuffix from '../utility/class-name-suffix';
import { getLabelItemId, getPanelItemId } from "../utility/get-id";
function createLabelContainer(props, context, entries, side, fnSwitchTo) {
    var mode = props.mode, labelContainerClassName = props.labelContainerClassName, labelItemClassName = props.labelItemClassName, triggerEvents = props.triggerEvents, delayTriggerEvents = props.delayTriggerEvents, delayTriggerCancelEvents = props.delayTriggerCancelEvents, delayTriggerLatency = props.delayTriggerLatency;
    var labelContainerLocationClassName = labelContainerClassName + '-' + side;
    var labelContainerModeClassName = labelContainerClassName + '-' + mode;
    var labelContainerLocationModeClassName = labelContainerClassName + '-' + side + '-' + mode;
    var labelItemActiveClassName = labelItemClassName + '-' + classNameSuffix.active;
    var labelItemInactiveClassName = labelItemClassName + '-' + classNameSuffix.inactive;
    var labelItemDisabledClassName = labelItemClassName + '-' + classNameSuffix.disabled;
    var labelItemHiddenClassName = labelItemClassName + '-' + classNameSuffix.hidden;
    var tabberId = context.tabberId, currentIndex = context.currentPosition.index;
    var labelContainer = React.createElement("div", { className: labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName, role: "tablist" }, entries.map(function (entry, index) {
        var labelProps = entry.labelProps, key = entry.key, disabled = entry.disabled, hidden = entry.hidden;
        var labelDelayTriggerCancelProps;
        var labelDelayTriggerProps;
        var labelTriggerProps;
        if (!disabled && !hidden) {
            var doSwitch_1 = function () {
                clearTimeout(context.delayTimeout);
                fnSwitchTo({ index: index, key: key });
            };
            var localDelayTimeout_1;
            var delayDoSwitch = (delayTriggerLatency) <= 0 ?
                doSwitch_1 :
                function () {
                    clearTimeout(context.delayTimeout);
                    localDelayTimeout_1 = context.delayTimeout = setTimeout(doSwitch_1, delayTriggerLatency);
                };
            var cancelDelayDoSwitch = function () {
                if (localDelayTimeout_1 === context.delayTimeout) {
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
        return React.createElement("label", __assign({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { className: labelItemAllClassName, tabIndex: 0, id: getLabelItemId(tabberId, side, index), role: "tab", "aria-controls": getPanelItemId(tabberId, index), "aria-selected": isActive, "aria-expanded": isActive, key: key ? 'key-' + key : 'index-' + index }), entry.label);
    }));
    return labelContainer;
}
export default createLabelContainer;
