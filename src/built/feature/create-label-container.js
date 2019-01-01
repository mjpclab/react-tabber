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
    var tabberId = context.tabberId, currentIndex = context.currentPosition.index;
    var labelContainer = React.createElement("div", { className: labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName, role: "tablist" }, entries.map(function (entry, index) {
        var labelProps = entry.labelProps, key = entry.key;
        var doSwitch = function () {
            clearTimeout(context.delayTimeout);
            fnSwitchTo({ index: index, key: key });
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
        var labelDelayTriggerCancelProps;
        var labelDelayTriggerProps;
        if (delayTriggerEvents && delayTriggerEvents.length) {
            labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
            labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
        }
        var labelTriggerProps = createEventHandler(triggerEvents, doSwitch);
        var isActive = index === currentIndex;
        var labelItemStatusClassName = isActive ? labelItemActiveClassName : labelItemInactiveClassName;
        return React.createElement("label", __assign({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { className: labelItemClassName + ' ' + labelItemStatusClassName, tabIndex: 0, id: getLabelItemId(tabberId, side, index), role: "tab", "aria-controls": getPanelItemId(tabberId, index), "aria-selected": isActive, "aria-expanded": isActive, key: key ? 'key-' + key : 'index-' + index }), entry.label);
    }));
    return labelContainer;
}
export default createLabelContainer;
