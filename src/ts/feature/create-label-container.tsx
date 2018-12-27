import React from 'react';

import createEventHandler from '../utility/create-event-handler';
import classNameSuffix from '../utility/class-name-suffix';

function createLabelContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	entries: ReactTabber.Entry[],
	sideSuffix: string,
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

	const labelContainerLocationClassName = labelContainerClassName + sideSuffix;
	const labelContainerModeClassName = labelContainerClassName + '-' + mode;
	const labelContainerLocationModeClassName = labelContainerClassName + sideSuffix + '-' + mode;

	const labelItemActiveClassName = labelItemClassName + classNameSuffix.active;
	const labelItemInactiveClassName = labelItemClassName + classNameSuffix.inactive;

	const labelContainer =
		<div className={labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName}>
			{entries.map((entry, index) => {
				const doSwitch = () => {
					clearTimeout(context.delayTimeout);
					fnSwitchTo(index);
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

				const {labelProps, key} = entry;
				let labelDelayTriggerCancelProps;
				let labelDelayTriggerProps;
				if (delayTriggerEvents && delayTriggerEvents.length) {
					labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
					labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
				}
				const labelTriggerProps = createEventHandler(triggerEvents, doSwitch);

				const labelItemStatusClassName = (index === context.currentIndex ? labelItemActiveClassName : labelItemInactiveClassName);

				return <div
					{...labelProps}
					{...labelDelayTriggerCancelProps}
					{...labelDelayTriggerProps}
					{...labelTriggerProps}
					key={key ? 'key-' + key : 'index-' + index}
					className={labelItemClassName + ' ' + labelItemStatusClassName}
				>{entry.label}</div>;
			})}
		</div>;
	return labelContainer;
}

export default createLabelContainer;
