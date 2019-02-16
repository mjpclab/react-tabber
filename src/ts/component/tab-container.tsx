import React from 'react';
import {Entry, TabProps, TabContext, FnSwitchTo, FnSwitchNeighbor} from '../type/tab';
import classNameSuffix from '../utility/class-name-suffix';
import LabelContainer from './label-container';
import PanelContainer from './panel-container';

interface TabContainerProps {
	tabProps: TabProps;
	tabContext: TabContext;
	entries: Entry[];
	fnSwitchTo: FnSwitchTo;
	fnSwitchPrevious: FnSwitchNeighbor;
	fnSwitchNext: FnSwitchNeighbor;
	fnSwitchFirst: FnSwitchNeighbor;
	fnSwitchLast: FnSwitchNeighbor;
}

function TabContainer(props: TabContainerProps): JSX.Element {
	const {
		tabProps,
		tabContext,
		entries,
		fnSwitchTo,
		fnSwitchPrevious,
		fnSwitchNext,
		fnSwitchFirst,
		fnSwitchLast
	} = props;

	const {
		mode,
		tabContainerClassName,
		showHeaderLabelContainer,
		showFooterLabelContainer
	} = tabProps;

	const {header, footer} = classNameSuffix;

	const tabContainerModeClassName = tabContainerClassName + '-' + mode;

	return <div className={tabContainerClassName + ' ' + tabContainerModeClassName}>
		{
			showHeaderLabelContainer ?
				<LabelContainer
					tabProps={tabProps}
					tabContext={tabContext}
					entries={entries}
					side={header}
					fnSwitchTo={fnSwitchTo}
					fnSwitchPrevious={fnSwitchPrevious}
					fnSwitchNext={fnSwitchNext}
					fnSwitchFirst={fnSwitchFirst}
					fnSwitchLast={fnSwitchLast}
				/> : null
		}
		<PanelContainer
			tabProps={tabProps}
			tabContext={tabContext}
			entries={entries}
			refLabelSide={showHeaderLabelContainer || !showFooterLabelContainer ? header : footer}
		/>
		{
			showFooterLabelContainer ?
				<LabelContainer
					tabProps={tabProps}
					tabContext={tabContext}
					entries={entries}
					side={footer}
					fnSwitchTo={fnSwitchTo}
					fnSwitchPrevious={fnSwitchPrevious}
					fnSwitchNext={fnSwitchNext}
					fnSwitchFirst={fnSwitchFirst}
					fnSwitchLast={fnSwitchLast}
				/> : null
		}
	</div>;
}

export default TabContainer;
