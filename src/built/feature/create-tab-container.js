import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';
import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';
function createTabContainer(props, context, entries, fnSwitchTo, fnSwitchPrevious, fnSwitchNext) {
    var mode = props.mode, tabContainerClassName = props.tabContainerClassName, showHeaderLabelContainer = props.showHeaderLabelContainer, showFooterLabelContainer = props.showFooterLabelContainer;
    var header = classNameSuffix.header, footer = classNameSuffix.footer;
    var tabContainerModeClassName = tabContainerClassName + '-' + mode;
    return React.createElement("div", { className: tabContainerClassName + ' ' + tabContainerModeClassName },
        showHeaderLabelContainer ?
            createLabelContainer(props, context, entries, header, fnSwitchTo, fnSwitchPrevious, fnSwitchNext) :
            null,
        createPanelContainer(props, context, entries, showHeaderLabelContainer || !showFooterLabelContainer ? header : footer),
        showFooterLabelContainer ?
            createLabelContainer(props, context, entries, footer, fnSwitchTo, fnSwitchPrevious, fnSwitchNext)
            : null);
}
export default createTabContainer;
