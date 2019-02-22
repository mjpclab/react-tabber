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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React from "react";
import Label from "../component/label";
import Panel from "../component/panel";
function parseTabEntries(propEntries, children) {
    var entries = [];
    // prop entries
    if (propEntries && propEntries.length) {
        entries.push.apply(entries, propEntries.map(function (_entry) {
            var entry = __assign({}, _entry);
            if (entry.key === undefined) {
                entry.key = null;
            }
            return entry;
        }));
    }
    // children
    if (children) {
        var currentLabelProps_1 = {};
        var currentLabelItems_1 = [];
        var currentPanelProps_1 = {};
        var currentPanelItems_1 = [];
        var key_1;
        var disabled_1;
        var hidden_1;
        var pushEntry_1 = function () {
            entries.push({
                labelProps: currentLabelProps_1,
                label: currentLabelItems_1,
                panelProps: currentPanelProps_1,
                panel: currentPanelItems_1,
                key: key_1,
                disabled: disabled_1,
                hidden: hidden_1
            });
        };
        React.Children.forEach(children, function (child) {
            var element = child;
            if (element.type && element.type === Label) {
                if (currentLabelItems_1.length) { // end of previous entry
                    pushEntry_1();
                }
                var _a = element.props, itemDisabled = _a.disabled, itemHidden = _a.hidden, restLabelProps = __rest(_a, ["disabled", "hidden"]);
                currentLabelProps_1 = restLabelProps;
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
                disabled_1 = itemDisabled;
                hidden_1 = itemHidden;
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
                else {
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
