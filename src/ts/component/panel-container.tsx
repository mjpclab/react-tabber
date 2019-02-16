import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Entry, TabProps, TabContext} from '../type/tab';
import classNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from '../utility/get-id';

interface PanelContainerProps {
	tabProps: TabProps,
	tabContext: TabContext,
	entries: Entry[],
	refLabelSide: string
}

interface PanelContainerState {
	panelContainerAllClassName: string;

	panelItemActiveClassName: string;
	panelItemInactiveClassName: string;
	panelItemDisabledClassName: string;
	panelItemHiddenClassName: string;
}

class PanelContainer extends Component<PanelContainerProps, PanelContainerState> {
	static propTypes = {
		tabProps: PropTypes.object,
		tabContext: PropTypes.object,
		entries: PropTypes.arrayOf(PropTypes.object),
		refLabelSide: PropTypes.string
	};

	static getDerivedStateFromProps(props: PanelContainerProps) {
		const {
			tabProps: {
				mode,
				panelContainerClassName,
				panelItemClassName
			},
		} = props;

		const panelContainerModeClassName = panelContainerClassName + '-' + mode;
		const panelContainerAllClassName = panelContainerClassName + ' ' + panelContainerModeClassName;

		const panelItemActiveClassName = panelItemClassName + '-' + classNameSuffix.active;
		const panelItemInactiveClassName = panelItemClassName + '-' + classNameSuffix.inactive;
		const panelItemDisabledClassName = panelItemClassName + '-' + classNameSuffix.disabled;
		const panelItemHiddenClassName = panelItemClassName + '-' + classNameSuffix.hidden;

		return {
			panelContainerAllClassName,

			panelItemActiveClassName,
			panelItemInactiveClassName,
			panelItemDisabledClassName,
			panelItemHiddenClassName
		}
	}

	render() {
		const {
			tabProps: {
				panelItemClassName
			},
			tabContext,
			entries,
			refLabelSide
		} = this.props;

		const {tabberId, currentPosition: {index: currentIndex}} = tabContext;

		const {
			panelContainerAllClassName,

			panelItemActiveClassName,
			panelItemInactiveClassName,
			panelItemDisabledClassName,
			panelItemHiddenClassName
		} = this.state;

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
