import React from 'react';

import {Entry, TabProps, TabContext} from '../type/tab';
import classNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from '../utility/get-id';

function createPanelContainer(
	props: TabProps,
	context: TabContext,
	entries: Entry[],
	refLabelSide: string
) {
	const {
		mode,
		panelContainerClassName,
		panelItemClassName,
	} = props;

	const {tabberId, currentPosition: {index: currentIndex}} = context;

	const panelContainerModeClassName = panelContainerClassName + '-' + mode;

	const panelItemActiveClassName = panelItemClassName + '-' + classNameSuffix.active;
	const panelItemInactiveClassName = panelItemClassName + '-' + classNameSuffix.inactive;
	const panelItemDisabledClassName = panelItemClassName + '-' + classNameSuffix.disabled;
	const panelItemHiddenClassName = panelItemClassName + '-' + classNameSuffix.hidden;

	return <div className={panelContainerClassName + ' ' + panelContainerModeClassName}>
		{entries.map((entry, index) => {
			const {panelProps, key, disabled, hidden} = entry;

			const isActive = index === currentIndex;
			const panelItemStatusClassName = isActive ? panelItemActiveClassName : panelItemInactiveClassName;
			let panelItemAllClassName = panelItemClassName + ' ' + panelItemStatusClassName;
			if (disabled) {
				panelItemAllClassName += ' ' + panelItemDisabledClassName;
			}
			if (hidden) {
				panelItemAllClassName += ' ' + panelItemHiddenClassName;
			}
			return <div
				{...panelProps}
				className={panelItemAllClassName}
				id={getPanelItemId(tabberId, index)}
				role="tabpanel"
				aria-labelledby={getLabelItemId(tabberId, refLabelSide, index)}
				aria-hidden={!isActive}
				key={key ? 'key-' + key : 'index-' + index}
			>{entry.panel}</div>
		})}
	</div>;
}

export default createPanelContainer;
