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
import getNumericIndex from '../utility/get-numeric-index';
import { tabPropTypes } from '../utility/prop-types';
import defaultProps from '../utility/default-props';
import createTabContainer from '../feature/create-tab-container';
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        var _this = _super.call(this, props) || this;
        _this.tabContext = {
            prevIndex: -1,
            currentIndex: -1,
            delayTimeout: 0
        };
        var activeIndex = props.activeIndex;
        _this.switchTo = _this.switchTo.bind(_this);
        _this.state = {
            prevActiveIndex: activeIndex,
            targetIndex: activeIndex,
        };
        return _this;
    }
    Tab.getDerivedStateFromProps = function (props, state) {
        var activeIndex = getNumericIndex(props.activeIndex);
        var prevActiveIndex = state.prevActiveIndex;
        if (activeIndex !== prevActiveIndex) {
            return {
                prevActiveIndex: activeIndex,
                targetIndex: activeIndex
            };
        }
        return null;
    };
    Tab.prototype.componentWillUnmount = function () {
        clearTimeout(this.tabContext.delayTimeout);
    };
    Tab.prototype.switchTo = function (index) {
        this.setState({
            targetIndex: getNumericIndex(index)
        });
    };
    Tab.prototype.render = function () {
        var _a = this, props = _a.props, state = _a.state, tabContext = _a.tabContext;
        var prevIndex = tabContext.prevIndex;
        var tabs = props.tabs;
        var currentIndex = tabContext.currentIndex = Math.min(state.targetIndex, tabs.length - 1);
        if (prevIndex !== currentIndex && props.onSwitching) {
            props.onSwitching(prevIndex, currentIndex);
        }
        return createTabContainer(props, tabContext, tabs, this.switchTo);
    };
    Tab.prototype.handleIndexChange = function () {
        var _a = this, props = _a.props, tabContext = _a.tabContext;
        var prevIndex = tabContext.prevIndex, currentIndex = tabContext.currentIndex;
        if (prevIndex !== currentIndex && props.onSwitched) {
            props.onSwitched(prevIndex, currentIndex);
        }
        tabContext.prevIndex = currentIndex;
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
