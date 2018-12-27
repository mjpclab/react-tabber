import React from 'react';

import classNameSuffix from '../utility/class-name-suffix';

function createPanelContainer(
	props: ReactTabber.TabProps,
	context: ReactTabber.TabContext,
	tabs: ReactTabber.Entry[],
) {
	const {
		panelContainerClassName,
		panelItemClassName,
	} = props;

	const {currentIndex} = context;

	const panelItemActiveClassName = panelItemClassName + classNameSuffix.active;
	const panelItemInactiveClassName = panelItemClassName + classNameSuffix.inactive;

	return <div className={panelContainerClassName}>
		{tabs.map((tab, index) => {
			const {panelProps, key} = tab;
			const panelItemStatusClassName = index === currentIndex ? panelItemActiveClassName : panelItemInactiveClassName;
			return <div
				{...panelProps}
				key={key ? 'key-' + key : 'index-' + index}
				className={panelItemClassName + ' ' + panelItemStatusClassName}
			>{tab.panel}</div>
		})}
	</div>;
}

export default createPanelContainer;
