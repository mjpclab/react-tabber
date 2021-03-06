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
import React, { Component } from 'react';
import { tabPropTypes } from '../utility/prop-types';
import { invalidNormalizedPosition, normalizePosition } from '../utility/normalize-position';
import defaultProps from '../utility/default-props';
import { getNextTabContainerId } from '../utility/get-id';
import TabContainer from './tab-container';
var SwitchDirection;
(function (SwitchDirection) {
    SwitchDirection[SwitchDirection["Backward"] = 0] = "Backward";
    SwitchDirection[SwitchDirection["Forward"] = 1] = "Forward";
})(SwitchDirection || (SwitchDirection = {}));
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        var _this = _super.call(this, props) || this;
        _this.tabContext = {
            tabberId: getNextTabContainerId(),
            delayTimeout: 0
        };
        _this.prevPosition = invalidNormalizedPosition;
        _this.currentPosition = invalidNormalizedPosition;
        _this.switchTo = _this.switchTo.bind(_this);
        _this._switchNeighbor = _this._switchNeighbor.bind(_this);
        _this.switchPrevious = _this.switchPrevious.bind(_this);
        _this.switchNext = _this.switchNext.bind(_this);
        _this.switchFirst = _this.switchFirst.bind(_this);
        _this.switchLast = _this.switchLast.bind(_this);
        _this.state = {
            manageTargetPosition: true,
            targetPosition: -1,
        };
        return _this;
    }
    Tab.getDerivedStateFromProps = function (props) {
        var activePosition = props.activePosition;
        if (activePosition === undefined ||
            activePosition === null ||
            (typeof activePosition === 'number' && !isFinite(activePosition))) {
            return {
                manageTargetPosition: true
            };
        }
        return {
            manageTargetPosition: false,
            targetPosition: activePosition
        };
    };
    Tab.prototype.componentWillUnmount = function () {
        clearTimeout(this.tabContext.delayTimeout);
    };
    Tab.prototype.switchTo = function (position) {
        var manageTargetPosition = this.state.manageTargetPosition;
        var _a = this.props, onUpdateActivePosition = _a.onUpdateActivePosition, onUpdateTargetPosition = _a.onUpdateTargetPosition;
        if (manageTargetPosition) {
            if (!onUpdateTargetPosition || onUpdateTargetPosition(position) !== false) {
                this.setState({
                    targetPosition: position.index
                });
            }
        }
        else if (onUpdateActivePosition) {
            onUpdateActivePosition(position);
        }
        return position;
    };
    Tab.prototype._switchNeighbor = function (fromIndex, direction, options) {
        var includeDisabled, includeHidden, loop, exclude;
        if (options) {
            includeDisabled = options.includeDisabled;
            includeHidden = options.includeHidden;
            loop = options.loop;
            exclude = options.exclude;
        }
        var entries = this.props.entries;
        var excludeIndecies = exclude ? exclude.map(function (pos) { return normalizePosition(entries, pos).index; }) : [];
        var itemCount = entries.length;
        var maxIterationCount = -1;
        if (loop) {
            if (fromIndex >= 0 && fromIndex < itemCount) {
                maxIterationCount = itemCount - 1;
            }
            else {
                maxIterationCount = itemCount;
            }
        }
        else if (direction === SwitchDirection.Backward) {
            maxIterationCount = fromIndex;
        }
        else if (direction === SwitchDirection.Forward) {
            maxIterationCount = itemCount - fromIndex - 1;
        }
        var iterationStep = direction === SwitchDirection.Backward ? -1 : 1;
        for (var i = 1; i <= maxIterationCount; i++) {
            var tabItemIndex = (fromIndex + i * iterationStep + itemCount) % itemCount;
            if (excludeIndecies.indexOf(tabItemIndex) >= 0) {
                continue;
            }
            var _a = entries[tabItemIndex], disabled = _a.disabled, hidden = _a.hidden;
            if ((!disabled && !hidden) ||
                (includeDisabled && !hidden) ||
                (!disabled && includeHidden) ||
                (includeDisabled && includeHidden)) {
                return this.switchTo(normalizePosition(entries, tabItemIndex));
            }
        }
    };
    Tab.prototype.switchPrevious = function (options) {
        return this._switchNeighbor(this.currentPosition.index, SwitchDirection.Backward, options);
    };
    Tab.prototype.switchNext = function (options) {
        return this._switchNeighbor(this.currentPosition.index, SwitchDirection.Forward, options);
    };
    Tab.prototype.switchFirst = function (options) {
        return this._switchNeighbor(-1, SwitchDirection.Forward, options);
    };
    Tab.prototype.switchLast = function (options) {
        return this._switchNeighbor(this.props.entries.length, SwitchDirection.Backward, options);
    };
    Tab.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, tabContext = _a.tabContext, normalizedPrevPosition = _a.prevPosition;
        var entries = props.entries, mode = props.mode, keyboardSwitch = props.keyboardSwitch, delayTriggerLatency = props.delayTriggerLatency, tabContainerClassName = props.tabContainerClassName, labelContainerClassName = props.labelContainerClassName, labelItemClassName = props.labelItemClassName, panelContainerClassName = props.panelContainerClassName, panelItemClassName = props.panelItemClassName, showHeaderLabelContainer = props.showHeaderLabelContainer, showFooterLabelContainer = props.showFooterLabelContainer, triggerEvents = props.triggerEvents, delayTriggerEvents = props.delayTriggerEvents, delayTriggerCancelEvents = props.delayTriggerCancelEvents;
        var prevIndex = normalizedPrevPosition.index;
        var targetPosition = state.targetPosition;
        var normalizedTargetPosition = normalizePosition(entries, targetPosition);
        var targetIndex = normalizedTargetPosition.index;
        var entryCount = entries.length;
        var currentIndex;
        if (targetIndex === -1) {
            currentIndex = entryCount > 0 ? 0 : -1;
            this.currentPosition = normalizePosition(entries, currentIndex);
        }
        else if (targetIndex < entryCount) {
            currentIndex = targetIndex;
            this.currentPosition = normalizedTargetPosition;
        }
        else {
            currentIndex = entryCount - 1;
            this.currentPosition = normalizePosition(entries, currentIndex);
        }
        if (prevIndex !== currentIndex && props.onSwitching) {
            props.onSwitching(normalizedPrevPosition, this.currentPosition);
        }
        return React.createElement(TabContainer, { entries: entries, mode: mode, keyboardSwitch: keyboardSwitch, delayTriggerLatency: delayTriggerLatency, tabContainerClassName: tabContainerClassName, labelContainerClassName: labelContainerClassName, labelItemClassName: labelItemClassName, panelContainerClassName: panelContainerClassName, panelItemClassName: panelItemClassName, showHeaderLabelContainer: showHeaderLabelContainer, showFooterLabelContainer: showFooterLabelContainer, triggerEvents: triggerEvents, delayTriggerEvents: delayTriggerEvents, delayTriggerCancelEvents: delayTriggerCancelEvents, fnSwitchTo: this.switchTo, fnSwitchPrevious: this.switchPrevious, fnSwitchNext: this.switchNext, fnSwitchFirst: this.switchFirst, fnSwitchLast: this.switchLast, tabContext: tabContext, currentIndex: currentIndex });
    };
    Tab.prototype.handleIndexChange = function () {
        var _a = this, props = _a.props, prevPosition = _a.prevPosition, currentPosition = _a.currentPosition;
        var onSwitched = props.onSwitched;
        if (prevPosition.index !== currentPosition.index && onSwitched) {
            onSwitched(prevPosition, currentPosition);
        }
        this.prevPosition = currentPosition;
    };
    Tab.prototype.componentDidMount = function () {
        this.handleIndexChange();
    };
    Tab.prototype.componentDidUpdate = function () {
        this.handleIndexChange();
    };
    Tab.propTypes = tabPropTypes;
    Tab.defaultProps = defaultProps;
    return Tab;
}(Component));
export default Tab;
