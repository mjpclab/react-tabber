import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';

import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';

function createTabContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	tabs: ReactTabber.Entry[],
	fnSwitchTo: ReactTabber.FnSwitchTo
) {
	const {
		tabContainerClassName,
		showHeaderLabelContainer,
		showFooterLabelContainer
	} = props;

	return <div className={tabContainerClassName}>
		{
			showHeaderLabelContainer ?
				createLabelContainer(props, context, tabs, classNameSuffix.header, fnSwitchTo) :
				null
		}
		{createPanelContainer(props, context, tabs)}
		{
			showFooterLabelContainer ?
				createLabelContainer(props, context, tabs, classNameSuffix.header, fnSwitchTo)
				: null
		}
	</div>;
}

export default createTabContainer;
