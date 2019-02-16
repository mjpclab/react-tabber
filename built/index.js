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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Component } from 'react';
import { publicPropTypes } from './utility/prop-types';
import defaultProps from './utility/default-props';
import normalizeEvents from './utility/normalize-events';
import parseTabEntries from './feature/parse-tab-entries';
import Tab from './component/tab';
import Label from './component/label';
import Panel from './component/panel';
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
    function ReactTabber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReactTabber.prototype.render = function () {
        var _a = this.props, entries = _a.entries, children = _a.children, triggerEvents = _a.triggerEvents, delayTriggerEvents = _a.delayTriggerEvents, delayTriggerCancelEvents = _a.delayTriggerCancelEvents, props = __rest(_a, ["entries", "children", "triggerEvents", "delayTriggerEvents", "delayTriggerCancelEvents"]);
        var allEntries = parseTabEntries(entries, children);
        return React.createElement(Tab, __assign({}, props, { entries: allEntries, triggerEvents: normalizeEvents(triggerEvents), delayTriggerEvents: normalizeEvents(delayTriggerEvents), delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents) }));
    };
    ReactTabber.Label = Label;
    ReactTabber.Panel = Panel;
    ReactTabber.propTypes = publicPropTypes;
    ReactTabber.defaultProps = defaultProps;
    return ReactTabber;
}(Component));
export default ReactTabber;
