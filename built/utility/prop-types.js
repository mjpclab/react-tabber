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
var switchFuncPropTypes = {
    fnSwitchTo: PropTypes.func,
    fnSwitchPrevious: PropTypes.func,
    fnSwitchNext: PropTypes.func,
    fnSwitchFirst: PropTypes.func,
    fnSwitchLast: PropTypes.func
};
var entriesPropType = PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node.isRequired,
    panel: PropTypes.node.isRequired,
    key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}));
var necessaryPropTypes = {
    entries: entriesPropType,
    mode: PropTypes.string,
    keyboardSwitch: PropTypes.bool,
    delayTriggerLatency: PropTypes.number,
    tabContainerClassName: PropTypes.string,
    labelContainerClassName: PropTypes.string,
    showHeaderLabelContainer: PropTypes.bool,
    showFooterLabelContainer: PropTypes.bool,
    labelItemClassName: PropTypes.string,
    panelContainerClassName: PropTypes.string,
    panelItemClassName: PropTypes.string
};
var callbackPropTypes = {
    onUpdateActivePosition: PropTypes.func,
    onUpdateTargetPosition: PropTypes.func,
    onSwitching: PropTypes.func,
    onSwitched: PropTypes.func
};
var eventPropTypes = {
    triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
var normalizedEventPropTypes = {
    triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};
var publicPropTypes = __assign({}, necessaryPropTypes, callbackPropTypes, eventPropTypes, { activePosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) });
var tabPropTypes = __assign({}, necessaryPropTypes, callbackPropTypes, normalizedEventPropTypes, { activePosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) });
var tabContainerPropTypes = __assign({}, necessaryPropTypes, normalizedEventPropTypes, switchFuncPropTypes, { tabContext: PropTypes.object });
var labelContainerPropTypes = __assign({}, normalizedEventPropTypes, switchFuncPropTypes, { entries: entriesPropType, mode: PropTypes.string, keyboardSwitch: PropTypes.bool, delayTriggerLatency: PropTypes.number, labelContainerClassName: PropTypes.string, labelItemClassName: PropTypes.string, tabContext: PropTypes.object, side: PropTypes.string });
var panelContainerPropTypes = {
    entries: PropTypes.arrayOf(PropTypes.object),
    mode: PropTypes.string,
    panelContainerClassName: PropTypes.string,
    panelItemClassName: PropTypes.string,
    tabContext: PropTypes.object,
    refLabelSide: PropTypes.string
};
export { publicPropTypes, tabPropTypes, tabContainerPropTypes, labelContainerPropTypes, panelContainerPropTypes };
