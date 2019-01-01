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
	const labelItemDisabledClassName = labelItemClassName + '-' + classNameSuffix.disabled;
	const labelItemHiddenClassName = labelItemClassName + '-' + classNameSuffix.hidden;

	const {tabberId, currentPosition: {index: currentIndex}} = context;

	const labelContainer =
		<div className={labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName} role="tablist">
			{entries.map((entry, index) => {
				const {labelProps, key, disabled, hidden} = entry;

				let labelDelayTriggerCancelProps;
				let labelDelayTriggerProps;
				let labelTriggerProps;

				if (!disabled && !hidden) {
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

					if (delayTriggerEvents && delayTriggerEvents.length) {
						labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
						labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
					}
					labelTriggerProps = createEventHandler(triggerEvents, doSwitch);
				}

				const isActive = index === currentIndex;
				const labelItemStatusClassName = isActive ? labelItemActiveClassName : labelItemInactiveClassName;
				let labelItemAllClassName = labelItemClassName + ' ' + labelItemStatusClassName;
				if (disabled) {
					labelItemAllClassName += ' ' + labelItemDisabledClassName;
				}
				if (hidden) {
					labelItemAllClassName += ' ' + labelItemHiddenClassName;
				}

				return <label
					{...labelProps}
					{...labelDelayTriggerCancelProps}
					{...labelDelayTriggerProps}
					{...labelTriggerProps}
					className={labelItemAllClassName}
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
