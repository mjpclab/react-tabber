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
import classNameSuffix from '../utility/class-name-suffix';
import { getLabelItemId, getPanelItemId } from '../utility/get-id';
var PanelContainer = /** @class */ (function (_super) {
    __extends(PanelContainer, _super);
    function PanelContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            panelContainerAllClassName: '',
            panelItemActiveClassName: '',
            panelItemInactiveClassName: '',
            panelItemDisabledClassName: '',
            panelItemHiddenClassName: ''
        };
        return _this;
    }
    PanelContainer.getDerivedStateFromProps = function (props) {
        var _a = props.tabProps, mode = _a.mode, panelContainerClassName = _a.panelContainerClassName, panelItemClassName = _a.panelItemClassName;
        var panelContainerModeClassName = panelContainerClassName + '-' + mode;
        var panelContainerAllClassName = panelContainerClassName + ' ' + panelContainerModeClassName;
        var panelItemActiveClassName = panelItemClassName + '-' + classNameSuffix.active;
        var panelItemInactiveClassName = panelItemClassName + '-' + classNameSuffix.inactive;
        var panelItemDisabledClassName = panelItemClassName + '-' + classNameSuffix.disabled;
        var panelItemHiddenClassName = panelItemClassName + '-' + classNameSuffix.hidden;
        return {
            panelContainerAllClassName: panelContainerAllClassName,
            panelItemActiveClassName: panelItemActiveClassName,
            panelItemInactiveClassName: panelItemInactiveClassName,
            panelItemDisabledClassName: panelItemDisabledClassName,
            panelItemHiddenClassName: panelItemHiddenClassName
        };
    };
    PanelContainer.prototype.render = function () {
        var _a = this.props, panelItemClassName = _a.tabProps.panelItemClassName, tabContext = _a.tabContext, entries = _a.entries, refLabelSide = _a.refLabelSide;
        var tabberId = tabContext.tabberId, currentIndex = tabContext.currentPosition.index;
        var _b = this.state, panelContainerAllClassName = _b.panelContainerAllClassName, panelItemActiveClassName = _b.panelItemActiveClassName, panelItemInactiveClassName = _b.panelItemInactiveClassName, panelItemDisabledClassName = _b.panelItemDisabledClassName, panelItemHiddenClassName = _b.panelItemHiddenClassName;
        return React.createElement("div", { className: panelContainerAllClassName }, entries.map(function (entry, index) {
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
    };
    PanelContainer.propTypes = {
        tabProps: PropTypes.object,
        tabContext: PropTypes.object,
        entries: PropTypes.arrayOf(PropTypes.object),
        refLabelSide: PropTypes.string
    };
    return PanelContainer;
}(Component));
export default PanelContainer;
