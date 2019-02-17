import React from 'react';
import {TabContainerProps} from '../type/tab';
import ClassNameSuffix from '../utility/class-name-suffix';
import {tabContainerPropTypes} from "../utility/prop-types";

import LabelContainer from './label-container';
import PanelContainer from './panel-container';

function TabContainer(props: TabContainerProps): JSX.Element {
	const {
		entries,
		mode,
		keyboardSwitch,
		delayTriggerLatency,

		tabContainerClassName,
		labelContainerClassName,
		labelItemClassName,
		panelContainerClassName,
		panelItemClassName,
		showHeaderLabelContainer,
		showFooterLabelContainer,

		triggerEvents,
		delayTriggerEvents,
		delayTriggerCancelEvents,

		fnSwitchTo,
		fnSwitchPrevious,
		fnSwitchNext,
		fnSwitchFirst,
		fnSwitchLast,

		tabContext,
		currentIndex
	} = props;

	const tabContainerModeClassName = tabContainerClassName + '-' + mode;

	return <div className={tabContainerClassName + ' ' + tabContainerModeClassName}>
		{
			showHeaderLabelContainer ?
				<LabelContainer
					entries={entries}
					mode={mode}
					keyboardSwitch={keyboardSwitch}
					delayTriggerLatency={delayTriggerLatency}
					labelContainerClassName={labelContainerClassName}
					labelItemClassName={labelItemClassName}
					tabContext={tabContext}
					currentIndex={currentIndex}
					side={ClassNameSuffix.header}

					triggerEvents={triggerEvents}
					delayTriggerEvents={delayTriggerEvents}
					delayTriggerCancelEvents={delayTriggerCancelEvents}

					fnSwitchTo={fnSwitchTo}
					fnSwitchPrevious={fnSwitchPrevious}
					fnSwitchNext={fnSwitchNext}
					fnSwitchFirst={fnSwitchFirst}
					fnSwitchLast={fnSwitchLast}
				/> : null
		}
		<PanelContainer
			mode={mode}
			panelContainerClassName={panelContainerClassName}
			panelItemClassName={panelItemClassName}
			tabContext={tabContext}
			currentIndex={currentIndex}
			entries={entries}
			refLabelSide={showHeaderLabelContainer || !showFooterLabelContainer ? ClassNameSuffix.header : ClassNameSuffix.footer}
		/>
		{
			showFooterLabelContainer ?
				<LabelContainer
					entries={entries}
					mode={mode}
					keyboardSwitch={keyboardSwitch}
					delayTriggerLatency={delayTriggerLatency}
					labelContainerClassName={labelContainerClassName}
					labelItemClassName={labelItemClassName}
					tabContext={tabContext}
					currentIndex={currentIndex}
					side={ClassNameSuffix.footer}

					triggerEvents={triggerEvents}
					delayTriggerEvents={delayTriggerEvents}
					delayTriggerCancelEvents={delayTriggerCancelEvents}

					fnSwitchTo={fnSwitchTo}
					fnSwitchPrevious={fnSwitchPrevious}
					fnSwitchNext={fnSwitchNext}
					fnSwitchFirst={fnSwitchFirst}
					fnSwitchLast={fnSwitchLast}
				/> : null
		}
	</div>;
}

TabContainer.propTypes = tabContainerPropTypes;

export default TabContainer;
