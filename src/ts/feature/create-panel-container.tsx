import React from 'react';

import classNameSuffix from '../utility/class-name-suffix';

function createPanelContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	entries: ReactTabber.Entry[],
) {
	const {
		mode,
		panelContainerClassName,
		panelItemClassName,
	} = props;

	const {currentIndex} = context;

	const panelContainerModeClassName = panelContainerClassName + '-' + mode;

	const panelItemActiveClassName = panelItemClassName + classNameSuffix.active;
	const panelItemInactiveClassName = panelItemClassName + classNameSuffix.inactive;

	return <div className={panelContainerClassName + ' ' + panelContainerModeClassName}>
		{entries.map((entry, index) => {
			const {panelProps, key} = entry;
			const panelItemStatusClassName = index === currentIndex ? panelItemActiveClassName : panelItemInactiveClassName;
			return <div
				{...panelProps}
				key={key ? 'key-' + key : 'index-' + index}
				className={panelItemClassName + ' ' + panelItemStatusClassName}
			>{entry.panel}</div>
		})}
	</div>;
}

export default createPanelContainer;
