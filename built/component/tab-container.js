import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';
import { tabContainerPropTypes } from "../utility/prop-types";
import LabelContainer from './label-container';
import PanelContainer from './panel-container';
function TabContainer(props) {
    var entries = props.entries, mode = props.mode, keyboardSwitch = props.keyboardSwitch, delayTriggerLatency = props.delayTriggerLatency, tabContainerClassName = props.tabContainerClassName, labelContainerClassName = props.labelContainerClassName, labelItemClassName = props.labelItemClassName, panelContainerClassName = props.panelContainerClassName, panelItemClassName = props.panelItemClassName, showHeaderLabelContainer = props.showHeaderLabelContainer, showFooterLabelContainer = props.showFooterLabelContainer, triggerEvents = props.triggerEvents, delayTriggerEvents = props.delayTriggerEvents, delayTriggerCancelEvents = props.delayTriggerCancelEvents, fnSwitchTo = props.fnSwitchTo, fnSwitchPrevious = props.fnSwitchPrevious, fnSwitchNext = props.fnSwitchNext, fnSwitchFirst = props.fnSwitchFirst, fnSwitchLast = props.fnSwitchLast, tabContext = props.tabContext;
    var header = classNameSuffix.header, footer = classNameSuffix.footer;
    var tabContainerModeClassName = tabContainerClassName + '-' + mode;
    return React.createElement("div", { className: tabContainerClassName + ' ' + tabContainerModeClassName },
        showHeaderLabelContainer ?
            React.createElement(LabelContainer, { entries: entries, mode: mode, keyboardSwitch: keyboardSwitch, delayTriggerLatency: delayTriggerLatency, labelContainerClassName: labelContainerClassName, labelItemClassName: labelItemClassName, tabContext: tabContext, side: header, triggerEvents: triggerEvents, delayTriggerEvents: delayTriggerEvents, delayTriggerCancelEvents: delayTriggerCancelEvents, fnSwitchTo: fnSwitchTo, fnSwitchPrevious: fnSwitchPrevious, fnSwitchNext: fnSwitchNext, fnSwitchFirst: fnSwitchFirst, fnSwitchLast: fnSwitchLast }) : null,
        React.createElement(PanelContainer, { mode: mode, panelContainerClassName: panelContainerClassName, panelItemClassName: panelItemClassName, tabContext: tabContext, entries: entries, refLabelSide: showHeaderLabelContainer || !showFooterLabelContainer ? header : footer }),
        showFooterLabelContainer ?
            React.createElement(LabelContainer, { entries: entries, mode: mode, keyboardSwitch: keyboardSwitch, delayTriggerLatency: delayTriggerLatency, labelContainerClassName: labelContainerClassName, labelItemClassName: labelItemClassName, tabContext: tabContext, side: footer, triggerEvents: triggerEvents, delayTriggerEvents: delayTriggerEvents, delayTriggerCancelEvents: delayTriggerCancelEvents, fnSwitchTo: fnSwitchTo, fnSwitchPrevious: fnSwitchPrevious, fnSwitchNext: fnSwitchNext, fnSwitchFirst: fnSwitchFirst, fnSwitchLast: fnSwitchLast }) : null);
}
TabContainer.propTypes = tabContainerPropTypes;
export default TabContainer;
