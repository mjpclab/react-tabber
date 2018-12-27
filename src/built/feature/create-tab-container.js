import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';
import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';
function createTabContainer(props, context, entries, fnSwitchTo) {
    var mode = props.mode, tabContainerClassName = props.tabContainerClassName, showHeaderLabelContainer = props.showHeaderLabelContainer, showFooterLabelContainer = props.showFooterLabelContainer;
    var tabContainerModeClassName = tabContainerClassName + '-' + mode;
    return React.createElement("div", { className: tabContainerClassName + ' ' + tabContainerModeClassName },
        showHeaderLabelContainer ?
            createLabelContainer(props, context, entries, classNameSuffix.header, fnSwitchTo) :
            null,
        createPanelContainer(props, context, entries),
        showFooterLabelContainer ?
            createLabelContainer(props, context, entries, classNameSuffix.header, fnSwitchTo)
            : null);
}
export default createTabContainer;
