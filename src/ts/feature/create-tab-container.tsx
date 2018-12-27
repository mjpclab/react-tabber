import React from 'react';
import classNameSuffix from '../utility/class-name-suffix';

import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';

function createTabContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	entries: ReactTabber.Entry[],
	fnSwitchTo: ReactTabber.FnSwitchTo
) {
	const {
		mode,
		tabContainerClassName,
		showHeaderLabelContainer,
		showFooterLabelContainer
	} = props;

	const tabContainerModeClassName = tabContainerClassName + '-' + mode;

	return <div className={tabContainerClassName + ' ' + tabContainerModeClassName}>
		{
			showHeaderLabelContainer ?
				createLabelContainer(props, context, entries, classNameSuffix.header, fnSwitchTo) :
				null
		}
		{createPanelContainer(props, context, entries)}
		{
			showFooterLabelContainer ?
				createLabelContainer(props, context, entries, classNameSuffix.header, fnSwitchTo)
				: null
		}
	</div>;
}

export default createTabContainer;
