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
import PropTypes from 'prop-types';
var sharedPropTypes = {
    tabs: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.node.isRequired,
        panel: PropTypes.node.isRequired,
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })),
    mode: PropTypes.string,
    keyboardSwitch: PropTypes.bool,
    delayTriggerLatency: PropTypes.number,
    activePosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onSwitching: PropTypes.func,
    onSwitched: PropTypes.func,
    tabContainerClassName: PropTypes.string,
    labelContainerClassName: PropTypes.string,
    showHeaderLabelContainer: PropTypes.bool,
    showFooterLabelContainer: PropTypes.bool,
    labelItemClassName: PropTypes.string,
    panelContainerClassName: PropTypes.string,
    panelItemClassName: PropTypes.string,
};
var publicPropTypes = __assign({}, sharedPropTypes, { triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]), delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]) });
var tabPropTypes = __assign({}, sharedPropTypes, { triggerEvents: PropTypes.arrayOf(PropTypes.string), delayTriggerEvents: PropTypes.arrayOf(PropTypes.string), delayTriggerCancelEvents: PropTypes.arrayOf(PropTypes.string) });
export { publicPropTypes, tabPropTypes };
