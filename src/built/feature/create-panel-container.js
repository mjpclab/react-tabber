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
function createPanelContainer(props, context, tabs) {
    var mode = props.mode, panelContainerClassName = props.panelContainerClassName, panelItemClassName = props.panelItemClassName;
    var currentIndex = context.currentIndex;
    var panelContainerModeClassName = panelContainerClassName + '-' + mode;
    var panelItemActiveClassName = panelItemClassName + classNameSuffix.active;
    var panelItemInactiveClassName = panelItemClassName + classNameSuffix.inactive;
    return React.createElement("div", { className: panelContainerClassName + ' ' + panelContainerModeClassName }, tabs.map(function (tab, index) {
        var panelProps = tab.panelProps, key = tab.key;
        var panelItemStatusClassName = index === currentIndex ? panelItemActiveClassName : panelItemInactiveClassName;
        return React.createElement("div", __assign({}, panelProps, { key: key ? 'key-' + key : 'index-' + index, className: panelItemClassName + ' ' + panelItemStatusClassName }), tab.panel);
    }));
}
export default createPanelContainer;
