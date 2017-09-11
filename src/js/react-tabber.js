"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var React = require("react");
var PropTypes = require("prop-types");
var ReactTabber = /** @class */ (function (_super) {
    __extends(ReactTabber, _super);
    function ReactTabber(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            activeIndex: _this.props.activeIndex
        };
        return _this;
    }
    ReactTabber.prototype.componentWillUnmount = function () {
        clearTimeout(this.delayTimeout);
    };
    ReactTabber.prototype.getLabelContainer = function (positionClassName) {
        var _this = this;
        var props = this.props;
        var state = this.state;
        return React.createElement("div", { className: props.labelContainerClassName + ' ' + positionClassName }, this.props.tabs.map(function (tab, index) {
            var className = props.labelItemClassName + ' ' + (index === state.activeIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName);
            var doSwitch = function () {
                _this.switchTo(index);
            };
            var localDelayTimeout;
            var delayDoSwitch = (props.hoverSwitchDelay) <= 0 ?
                doSwitch :
                function () {
                    clearTimeout(_this.delayTimeout);
                    localDelayTimeout = _this.delayTimeout = setTimeout(doSwitch, props.hoverSwitchDelay);
                };
            var cancelDelayDoSwitch = function () {
                if (localDelayTimeout === _this.delayTimeout) {
                    clearTimeout(localDelayTimeout);
                }
            };
            return React.createElement("label", { key: tab.key ? 'key-' + tab.key : 'index-' + index, className: className, onClick: props.clickSwitch ? doSwitch : undefined, onMouseEnter: props.hoverSwitch ? delayDoSwitch : undefined, onMouseLeave: props.leaveCancelSwitch ? cancelDelayDoSwitch : undefined }, tab.label);
        }));
    };
    ReactTabber.prototype.getPageContainer = function () {
        var props = this.props;
        var state = this.state;
        return React.createElement("div", { className: props.pageContainerClassName }, this.props.tabs.map(function (tab, index) {
            var className = props.pageItemClassName + ' ' + (index === state.activeIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
            return React.createElement("div", { key: tab.key ? 'key-' + tab.key : 'index-' + index, className: className }, tab.page);
        }));
    };
    ReactTabber.prototype.getTabContainer = function () {
        var props = this.props;
        return React.createElement("div", { className: props.tabContainerClassName },
            props.showTopLabelContainer ? this.getLabelContainer(props.topLabelContainerClassName) : null,
            " ",
            this.getPageContainer(),
            " ",
            props.showBottomLabelContainer ? this.getLabelContainer(props.bottomLabelContainerClassName) : null);
    };
    ReactTabber.prototype.switchTo = function (index) {
        var onSwitch = this.props.onSwitch;
        var oldIndex;
        var newIndex = index;
        //update
        this.setState(function (prevState) {
            oldIndex = prevState.activeIndex;
            if (oldIndex !== newIndex) {
                return {
                    activeIndex: newIndex
                };
            }
        }, onSwitch && function () {
            if (oldIndex !== newIndex) {
                onSwitch(oldIndex, newIndex);
            }
        });
    };
    ReactTabber.prototype.render = function () {
        return this.props.tabs ? this.getTabContainer() : null;
    };
    ReactTabber.propTypes = {
        tabs: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            page: PropTypes.node.isRequired,
            key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        })).isRequired,
        activeIndex: PropTypes.number,
        clickSwitch: PropTypes.bool,
        hoverSwitch: PropTypes.bool,
        hoverSwitchDelay: PropTypes.number,
        leaveCancelSwitch: PropTypes.bool,
        onSwitch: PropTypes.func,
        tabContainerClassName: PropTypes.string,
        labelContainerClassName: PropTypes.string,
        showTopLabelContainer: PropTypes.bool,
        showBottomLabelContainer: PropTypes.bool,
        topLabelContainerClassName: PropTypes.string,
        bottomLabelContainerClassName: PropTypes.string,
        labelItemClassName: PropTypes.string,
        labelItemActiveClassName: PropTypes.string,
        labelItemInactiveClassName: PropTypes.string,
        pageContainerClassName: PropTypes.string,
        pageItemClassName: PropTypes.string,
        pageItemActiveClassName: PropTypes.string,
        pageItemInactiveClassName: PropTypes.string
    };
    ReactTabber.defaultProps = {
        activeIndex: 0,
        clickSwitch: true,
        hoverSwitch: false,
        hoverSwitchDelay: 0,
        leaveCancelSwitch: true,
        tabContainerClassName: 'tab-container',
        labelContainerClassName: 'label-container',
        showTopLabelContainer: true,
        showBottomLabelContainer: false,
        topLabelContainerClassName: 'top',
        bottomLabelContainerClassName: 'bottom',
        labelItemClassName: 'label-item',
        labelItemActiveClassName: 'label-active',
        labelItemInactiveClassName: 'label-inactive',
        pageContainerClassName: 'page-container',
        pageItemClassName: 'page-item',
        pageItemActiveClassName: 'page-active',
        pageItemInactiveClassName: 'page-inactive'
    };
    return ReactTabber;
}(React.Component));
module.exports = ReactTabber;
