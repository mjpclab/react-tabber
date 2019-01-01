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

	const {header, footer} = classNameSuffix;

	const tabContainerModeClassName = tabContainerClassName + '-' + mode;

	return <div className={tabContainerClassName + ' ' + tabContainerModeClassName}>
		{
			showHeaderLabelContainer ?
				createLabelContainer(props, context, entries, header, fnSwitchTo) :
				null
		}
		{createPanelContainer(props, context, entries, showHeaderLabelContainer || !showFooterLabelContainer ? header : footer)}
		{
			showFooterLabelContainer ?
				createLabelContainer(props, context, entries, footer, fnSwitchTo)
				: null
		}
	</div>;
}

export default createTabContainer;
