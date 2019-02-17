import React, {Component} from 'react';

import {PanelContainerProps, PanelContainerPropTypes} from '../type/tab';
import {panelContainerPropTypes} from '../utility/prop-types';
import ClassNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from '../utility/get-id';

class PanelContainer extends Component<PanelContainerProps> {
	static propTypes: PanelContainerPropTypes = panelContainerPropTypes;

	render() {
		const {
			mode,
			panelContainerClassName,
			panelItemClassName,
			tabContext,
			entries,
			refLabelSide
		} = this.props;

		const panelContainerModeClassName = panelContainerClassName + '-' + mode;
		const panelContainerAllClassName = panelContainerClassName + ' ' + panelContainerModeClassName;

		const panelItemActiveClassName = panelItemClassName + '-' + ClassNameSuffix.active;
		const panelItemInactiveClassName = panelItemClassName + '-' + ClassNameSuffix.inactive;
		const panelItemDisabledClassName = panelItemClassName + '-' + ClassNameSuffix.disabled;
		const panelItemHiddenClassName = panelItemClassName + '-' + ClassNameSuffix.hidden;

		const {tabberId, currentPosition: {index: currentIndex}} = tabContext;

		return <div className={panelContainerAllClassName}>
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
}

export default PanelContainer;
