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
import React from 'react';
import { invalidNormalizedPosition, getNormalizedPosition } from '../utility/normalized-position';
import { tabPropTypes } from '../utility/prop-types';
import defaultProps from '../utility/default-props';
import { getNextTabContainerId } from '../utility/get-id';
import createTabContainer from '../feature/create-tab-container';
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
            prevPosition: invalidNormalizedPosition,
            currentPosition: invalidNormalizedPosition,
            delayTimeout: 0
        };
        _this.switchTo = _this.switchTo.bind(_this);
        _this._switchNeighbor = _this._switchNeighbor.bind(_this);
        _this.switchPrevious = _this.switchPrevious.bind(_this);
        _this.switchNext = _this.switchNext.bind(_this);
        _this.state = {
            manageActiveIndex: true,
            targetPosition: -1,
        };
        return _this;
    }
    Tab.getDerivedStateFromProps = function (props) {
        var activePosition = props.activePosition;
        if (activePosition === undefined || activePosition === null || (typeof activePosition === 'number' && !isFinite(activePosition))) {
            return {
                manageActiveIndex: true
            };
        }
        return {
            manageActiveIndex: false,
            targetPosition: activePosition
        };
    };
    Tab.prototype.componentWillUnmount = function () {
        clearTimeout(this.tabContext.delayTimeout);
    };
    Tab.prototype.switchTo = function (position) {
        var manageActiveIndex = this.state.manageActiveIndex;
        var onUpdateActivePosition = this.props.onUpdateActivePosition;
        if (manageActiveIndex) {
            this.setState({
                targetPosition: position.index
            });
        }
        else if (onUpdateActivePosition) {
            onUpdateActivePosition(position);
        }
        return position;
    };
    Tab.prototype._switchNeighbor = function (direction, options) {
        var includeDisabled, includeHidden, loop, exclude;
        if (options) {
            includeDisabled = options.includeDisabled;
            includeHidden = options.includeHidden;
            loop = options.loop;
            exclude = options.exclude;
        }
        var entries = this.props.tabs;
        var excludeIndecies = exclude ? exclude.map(function (pos) { return getNormalizedPosition(entries, pos).index; }) : [];
        var currentIndex = this.tabContext.currentPosition.index;
        var itemCount = entries.length;
        var maxIterationCount = -1;
        if (loop) {
            if (currentIndex >= 0 && currentIndex < itemCount) {
                maxIterationCount = itemCount - 1;
            }
            else {
                maxIterationCount = itemCount;
            }
        }
        else if (direction === SwitchDirection.Backward) {
            maxIterationCount = currentIndex;
        }
        else if (direction === SwitchDirection.Forward) {
            maxIterationCount = itemCount - currentIndex - 1;
        }
        var iterationStep = direction === SwitchDirection.Backward ? -1 : 1;
        for (var i = 1; i <= maxIterationCount; i++) {
            var tabItemIndex = (currentIndex + i * iterationStep + itemCount) % itemCount;
            if (excludeIndecies.indexOf(tabItemIndex) >= 0) {
                continue;
            }
            var _a = entries[tabItemIndex], disabled = _a.disabled, hidden = _a.hidden;
            if ((!disabled && !hidden) ||
                (includeDisabled && !hidden) ||
                (!disabled && includeHidden) ||
                (includeDisabled && includeHidden)) {
                return this.switchTo(getNormalizedPosition(entries, tabItemIndex));
            }
        }
    };
    Tab.prototype.switchPrevious = function (options) {
        return this._switchNeighbor(SwitchDirection.Backward, options);
    };
    Tab.prototype.switchNext = function (options) {
        return this._switchNeighbor(SwitchDirection.Forward, options);
    };
    Tab.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, tabContext = _a.tabContext;
        var targetPosition = state.targetPosition;
        var normalizedPrevPosition = tabContext.prevPosition;
        var prevIndex = normalizedPrevPosition.index;
        var tabs = props.tabs;
        var normalizedTargetPosition = getNormalizedPosition(tabs, targetPosition);
        var targetIndex = normalizedTargetPosition.index;
        var entryCount = tabs.length;
        var currentIndex;
        if (targetIndex === -1) {
            currentIndex = entryCount > 0 ? 0 : -1;
            tabContext.currentPosition = getNormalizedPosition(tabs, currentIndex);
        }
        else if (targetIndex < entryCount) {
            currentIndex = targetIndex;
            tabContext.currentPosition = normalizedTargetPosition;
        }
        else {
            currentIndex = entryCount - 1;
            tabContext.currentPosition = getNormalizedPosition(tabs, currentIndex);
        }
        if (prevIndex !== currentIndex && props.onSwitching) {
            props.onSwitching(normalizedPrevPosition, tabContext.currentPosition);
        }
        return createTabContainer(props, tabContext, tabs, this.switchTo, this.switchPrevious, this.switchNext);
    };
    Tab.prototype.handleIndexChange = function () {
        var _a = this, props = _a.props, tabContext = _a.tabContext;
        var onSwitched = props.onSwitched;
        var prevPosition = tabContext.prevPosition, currentPosition = tabContext.currentPosition;
        if (prevPosition.index !== currentPosition.index && onSwitched) {
            onSwitched(prevPosition, currentPosition);
        }
        tabContext.prevPosition = currentPosition;
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
}(React.Component));
export default Tab;
