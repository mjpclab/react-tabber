import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';
import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';
function createTabContainer(props, context, tabs, fnSwitchTo) {
    var tabContainerClassName = props.tabContainerClassName, showHeaderLabelContainer = props.showHeaderLabelContainer, showFooterLabelContainer = props.showFooterLabelContainer;
    return React.createElement("div", { className: tabContainerClassName },
        showHeaderLabelContainer ?
            createLabelContainer(props, context, tabs, classNameSuffix.header, fnSwitchTo) :
            null,
        createPanelContainer(props, context, tabs),
        showFooterLabelContainer ?
            createLabelContainer(props, context, tabs, classNameSuffix.header, fnSwitchTo)
            : null);
}
export default createTabContainer;
