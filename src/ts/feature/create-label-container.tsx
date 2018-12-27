import React from 'react';

import createEventHandler from '../utility/create-event-handler';
import classNameSuffix from '../utility/class-name-suffix';

function createLabelContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	tabs: ReactTabber.Entry[],
	position: string,
	fnSwitchTo: ReactTabber.FnSwitchTo
) {
	const {
		labelContainerClassName,
		labelItemClassName,
		triggerEvents,
		delayTriggerEvents,
		delayTriggerCancelEvents,
		delayTriggerLatency
	} = props;

	const labelContainerLocationClassName = labelContainerClassName + position;

	const labelItemActiveClassName = labelItemClassName + classNameSuffix.active;
	const labelItemInactiveClassName = labelItemClassName + classNameSuffix.inactive;

	const labelContainer = <div className={labelContainerClassName + ' ' + labelContainerLocationClassName}>
		{tabs.map((tab, index) => {
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

			const {labelProps, key} = tab;
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
			>{tab.label}</div>;
		})}
	</div>;
	return labelContainer;
}

export default createLabelContainer;
