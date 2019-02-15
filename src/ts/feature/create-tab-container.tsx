import React from 'react';

import {Entry, TabProps, TabContext, FnSwitchTo, FnSwitchNeighbor} from '../type/tab';
import classNameSuffix from '../utility/class-name-suffix';
import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';

function createTabContainer(
	props: TabProps,
	context: TabContext,
	entries: Entry[],
	fnSwitchTo: FnSwitchTo,
	fnSwitchPrevious: FnSwitchNeighbor,
	fnSwitchNext: FnSwitchNeighbor,
	fnSwitchFirst: FnSwitchNeighbor,
	fnSwitchLast: FnSwitchNeighbor
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
				createLabelContainer(
					props, context, entries, header,
					fnSwitchTo, fnSwitchPrevious, fnSwitchNext, fnSwitchFirst, fnSwitchLast
				) :
				null
		}
		{createPanelContainer(props, context, entries, showHeaderLabelContainer || !showFooterLabelContainer ? header : footer)}
		{
			showFooterLabelContainer ?
				createLabelContainer(
					props, context, entries, footer,
					fnSwitchTo, fnSwitchPrevious, fnSwitchNext, fnSwitchFirst, fnSwitchLast
				)
				: null
		}
	</div>;
}

export default createTabContainer;
