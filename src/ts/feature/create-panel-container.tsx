import React from 'react';

import classNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from "../utility/get-id";

function createPanelContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	entries: ReactTabber.Entry[],
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

	return <div className={panelContainerClassName + ' ' + panelContainerModeClassName}>
		{entries.map((entry, index) => {
			const {panelProps, key} = entry;
			const isActive = index === currentIndex;
			const panelItemStatusClassName = isActive ? panelItemActiveClassName : panelItemInactiveClassName;
			return <div
				{...panelProps}
				className={panelItemClassName + ' ' + panelItemStatusClassName}
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
