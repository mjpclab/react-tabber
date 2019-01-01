import React from 'react';

import createEventHandler from '../utility/create-event-handler';
import classNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from "../utility/get-id";

function createLabelContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	entries: ReactTabber.Entry[],
	side: string,
	fnSwitchTo: ReactTabber.FnSwitchTo
) {
	const {
		mode,
		labelContainerClassName,
		labelItemClassName,
		triggerEvents,
		delayTriggerEvents,
		delayTriggerCancelEvents,
		delayTriggerLatency
	} = props;

	const labelContainerLocationClassName = labelContainerClassName + '-' + side;
	const labelContainerModeClassName = labelContainerClassName + '-' + mode;
	const labelContainerLocationModeClassName = labelContainerClassName + '-' + side + '-' + mode;

	const labelItemActiveClassName = labelItemClassName + '-' + classNameSuffix.active;
	const labelItemInactiveClassName = labelItemClassName + '-' + classNameSuffix.inactive;

	const {tabberId, currentPosition: {index: currentIndex}} = context;

	const labelContainer =
		<div className={labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName} role="tablist">
			{entries.map((entry, index) => {
				const {labelProps, key} = entry;

				const doSwitch = () => {
					clearTimeout(context.delayTimeout);
					fnSwitchTo({index, key});
				};
				let localDelayTimeout: any;
				const delayDoSwitch = (delayTriggerLatency!) <= 0 ?
					doSwitch :
					() => {
						clearTimeout(context.delayTimeout);
						localDelayTimeout = context.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
					};
				const cancelDelayDoSwitch = () => {
					if (localDelayTimeout === context.delayTimeout) {
						clearTimeout(localDelayTimeout);
					}
				};

				let labelDelayTriggerCancelProps;
				let labelDelayTriggerProps;
				if (delayTriggerEvents && delayTriggerEvents.length) {
					labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
					labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
				}
				const labelTriggerProps = createEventHandler(triggerEvents, doSwitch);

				const isActive = index === currentIndex;
				const labelItemStatusClassName = isActive ? labelItemActiveClassName : labelItemInactiveClassName;

				return <label
					{...labelProps}
					{...labelDelayTriggerCancelProps}
					{...labelDelayTriggerProps}
					{...labelTriggerProps}
					className={labelItemClassName + ' ' + labelItemStatusClassName}
					tabIndex={0}
					id={getLabelItemId(tabberId, side, index)}
					role="tab"
					aria-controls={getPanelItemId(tabberId, index)}
					aria-selected={isActive}
					aria-expanded={isActive}
					key={key ? 'key-' + key : 'index-' + index}
				>{entry.label}</label>;
			})}
		</div>;
	return labelContainer;
}

export default createLabelContainer;
