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
import createTabContainer from '../feature/create-tab-container';
var nextTabberId = 0;
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        var _this = _super.call(this, props) || this;
        _this.tabContext = {
            tabberId: nextTabberId++,
            prevPosition: invalidNormalizedPosition,
            currentPosition: invalidNormalizedPosition,
            delayTimeout: 0
        };
        _this.switchTo = _this.switchTo.bind(_this);
        _this.state = {
            manageActiveIndex: true,
            targetPosition: -1,
        };
        return _this;
    }
    Tab.getDerivedStateFromProps = function (props, state) {
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
        return createTabContainer(props, tabContext, tabs, this.switchTo);
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
