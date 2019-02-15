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
import classNameSuffix from '../utility/class-name-suffix';
import { getLabelItemId, getPanelItemId } from '../utility/get-id';
function createPanelContainer(props, context, entries, refLabelSide) {
    var mode = props.mode, panelContainerClassName = props.panelContainerClassName, panelItemClassName = props.panelItemClassName;
    var tabberId = context.tabberId, currentIndex = context.currentPosition.index;
    var panelContainerModeClassName = panelContainerClassName + '-' + mode;
    var panelItemActiveClassName = panelItemClassName + '-' + classNameSuffix.active;
    var panelItemInactiveClassName = panelItemClassName + '-' + classNameSuffix.inactive;
    var panelItemDisabledClassName = panelItemClassName + '-' + classNameSuffix.disabled;
    var panelItemHiddenClassName = panelItemClassName + '-' + classNameSuffix.hidden;
    return React.createElement("div", { className: panelContainerClassName + ' ' + panelContainerModeClassName }, entries.map(function (entry, index) {
        var panelProps = entry.panelProps, key = entry.key, disabled = entry.disabled, hidden = entry.hidden;
        var isActive = index === currentIndex;
        var panelItemStatusClassName = isActive ? panelItemActiveClassName : panelItemInactiveClassName;
        var panelItemAllClassName = panelItemClassName + ' ' + panelItemStatusClassName;
        if (disabled) {
            panelItemAllClassName += ' ' + panelItemDisabledClassName;
        }
        if (hidden) {
            panelItemAllClassName += ' ' + panelItemHiddenClassName;
        }
        return React.createElement("div", __assign({}, panelProps, { className: panelItemAllClassName, id: getPanelItemId(tabberId, index), role: "tabpanel", "aria-labelledby": getLabelItemId(tabberId, refLabelSide, index), "aria-hidden": !isActive, key: key ? 'key-' + key : 'index-' + index }), entry.panel);
    }));
}
export default createPanelContainer;
