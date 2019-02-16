import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';
import LabelContainer from './label-container';
import PanelContainer from './panel-container';
function TabContainer(props) {
    var tabProps = props.tabProps, tabContext = props.tabContext, entries = props.entries, fnSwitchTo = props.fnSwitchTo, fnSwitchPrevious = props.fnSwitchPrevious, fnSwitchNext = props.fnSwitchNext, fnSwitchFirst = props.fnSwitchFirst, fnSwitchLast = props.fnSwitchLast;
    var mode = tabProps.mode, tabContainerClassName = tabProps.tabContainerClassName, showHeaderLabelContainer = tabProps.showHeaderLabelContainer, showFooterLabelContainer = tabProps.showFooterLabelContainer;
    var header = classNameSuffix.header, footer = classNameSuffix.footer;
    var tabContainerModeClassName = tabContainerClassName + '-' + mode;
    return React.createElement("div", { className: tabContainerClassName + ' ' + tabContainerModeClassName },
        showHeaderLabelContainer ?
            React.createElement(LabelContainer, { tabProps: tabProps, tabContext: tabContext, entries: entries, side: header, fnSwitchTo: fnSwitchTo, fnSwitchPrevious: fnSwitchPrevious, fnSwitchNext: fnSwitchNext, fnSwitchFirst: fnSwitchFirst, fnSwitchLast: fnSwitchLast }) : null,
        React.createElement(PanelContainer, { tabProps: tabProps, tabContext: tabContext, entries: entries, refLabelSide: showHeaderLabelContainer || !showFooterLabelContainer ? header : footer }),
        showFooterLabelContainer ?
            React.createElement(LabelContainer, { tabProps: tabProps, tabContext: tabContext, entries: entries, side: footer, fnSwitchTo: fnSwitchTo, fnSwitchPrevious: fnSwitchPrevious, fnSwitchNext: fnSwitchNext, fnSwitchFirst: fnSwitchFirst, fnSwitchLast: fnSwitchLast }) : null);
}
export default TabContainer;
