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
function createLabelContainer(props, context, entries, sideSuffix, fnSwitchTo) {
    var mode = props.mode, labelContainerClassName = props.labelContainerClassName, labelItemClassName = props.labelItemClassName, triggerEvents = props.triggerEvents, delayTriggerEvents = props.delayTriggerEvents, delayTriggerCancelEvents = props.delayTriggerCancelEvents, delayTriggerLatency = props.delayTriggerLatency;
    var labelContainerLocationClassName = labelContainerClassName + sideSuffix;
    var labelContainerModeClassName = labelContainerClassName + '-' + mode;
    var labelContainerLocationModeClassName = labelContainerClassName + sideSuffix + '-' + mode;
    var labelItemActiveClassName = labelItemClassName + classNameSuffix.active;
    var labelItemInactiveClassName = labelItemClassName + classNameSuffix.inactive;
    var currentIndex = context.currentPosition.index;
    var labelContainer = React.createElement("div", { className: labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName }, entries.map(function (entry, index) {
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
        return React.createElement("div", __assign({}, labelProps, labelDelayTriggerCancelProps, labelDelayTriggerProps, labelTriggerProps, { key: key ? 'key-' + key : 'index-' + index, className: labelItemClassName + ' ' + labelItemStatusClassName }), entry.label);
    }));
    return labelContainer;
}
export default createLabelContainer;