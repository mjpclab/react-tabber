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
import React from "react";
import Label from "../component/label";
import Panel from "../component/panel";
function parseTabEntries(props, children) {
    var entries = [];
    // tabs
    if (props.tabs && props.tabs.length) {
        entries.push.apply(entries, props.tabs);
    }
    // children
    if (children) {
        var currentLabelProps_1 = {};
        var currentLabelItems_1 = [];
        var currentPanelProps_1 = {};
        var currentPanelItems_1 = [];
        var key_1;
        var pushEntry_1 = function () {
            entries.push({
                labelProps: currentLabelProps_1,
                label: currentLabelItems_1,
                panelProps: currentPanelProps_1,
                panel: currentPanelItems_1,
                key: key_1
            });
        };
        React.Children.forEach(children, function (child) {
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
                key_1 = typeof element.key !== 'undefined' ? element.key : entries.length;
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
}
export default parseTabEntries;
