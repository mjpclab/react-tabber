import React from 'react';

import {
	TabProps,
	TabContext,
	NormalizedTabItemPosition,
	SwitchOptions,
	TabItemPosition,
	TabPropTypes
} from '../type/tab';
import {tabPropTypes} from '../utility/prop-types';
import {invalidNormalizedPosition, normalizePosition} from '../utility/normalize-position';
import defaultProps from '../utility/default-props';
import {getNextTabContainerId} from '../utility/get-id';

import TabContainer from './tab-container';

enum SwitchDirection {Backward, Forward}

interface TabState {
	manageTargetPosition: boolean;
	targetPosition: TabItemPosition;
}

class Tab extends React.Component<TabProps, TabState> {
	static propTypes: TabPropTypes = tabPropTypes;
	static defaultProps = defaultProps;

	private tabContext: TabContext = {
		tabberId: getNextTabContainerId(),
		delayTimeout: 0
	};
	private prevPosition = invalidNormalizedPosition;
	private currentPosition = invalidNormalizedPosition;


	constructor(props: TabProps) {
		super(props);

		this.switchTo = this.switchTo.bind(this);
		this._switchNeighbor = this._switchNeighbor.bind(this);
		this.switchPrevious = this.switchPrevious.bind(this);
		this.switchNext = this.switchNext.bind(this);
		this.switchFirst = this.switchFirst.bind(this);
		this.switchLast = this.switchLast.bind(this);

		this.state = {
			manageTargetPosition: true,
			targetPosition: -1,
		};
	}

	static getDerivedStateFromProps(props: TabProps) {
		const {activePosition} = props;

		if (activePosition === undefined || activePosition === null || (typeof activePosition === 'number' && isNaN(activePosition))) {
			return {
				manageTargetPosition: true
			}
		}

		return {
			manageTargetPosition: false,
			targetPosition: activePosition
		}
	}

	componentWillUnmount() {
		clearTimeout(this.tabContext.delayTimeout);
	}

	public switchTo(position: NormalizedTabItemPosition) {
		const {manageTargetPosition} = this.state;
		const {onUpdateActivePosition, onUpdateTargetPosition} = this.props;

		if (manageTargetPosition) {
			if (!onUpdateTargetPosition || onUpdateTargetPosition(position) !== false) {
				this.setState({
					targetPosition: position.index
				});
			}
		} else if (onUpdateActivePosition) {
			onUpdateActivePosition(position);
		}

		return position;
	}

	private _switchNeighbor(fromIndex: number, direction: SwitchDirection, options?: SwitchOptions) {
		let includeDisabled, includeHidden, loop, exclude;
		if (options) {
			includeDisabled = options.includeDisabled;
			includeHidden = options.includeHidden;
			loop = options.loop;
			exclude = options.exclude;
		}

		const entries = this.props.entries;
		const excludeIndecies = exclude ? exclude.map(pos => normalizePosition(entries, pos).index) : [];

		const itemCount = entries.length;

		let maxIterationCount = -1;
		if (loop) {
			if (fromIndex >= 0 && fromIndex < itemCount) {
				maxIterationCount = itemCount - 1;
			} else {
				maxIterationCount = itemCount;
			}
		} else if (direction === SwitchDirection.Backward) {
			maxIterationCount = fromIndex;
		} else if (direction === SwitchDirection.Forward) {
			maxIterationCount = itemCount - fromIndex - 1;
		}

		const iterationStep = direction === SwitchDirection.Backward ? -1 : 1;

		for (let i = 1; i <= maxIterationCount; i++) {
			const tabItemIndex = (fromIndex + i * iterationStep + itemCount) % itemCount;

			if (excludeIndecies.indexOf(tabItemIndex) >= 0) {
				continue;
			}

			const {disabled, hidden} = entries[tabItemIndex];

			if (
				(!disabled && !hidden) ||
				(includeDisabled && !hidden) ||
				(!disabled && includeHidden) ||
				(includeDisabled && includeHidden)
			) {
				return this.switchTo(normalizePosition(entries, tabItemIndex));
			}
		}
	}

	public switchPrevious(options?: SwitchOptions) {
		return this._switchNeighbor(this.currentPosition.index, SwitchDirection.Backward, options);
	}

	public switchNext(options?: SwitchOptions) {
		return this._switchNeighbor(this.currentPosition.index, SwitchDirection.Forward, options);
	}

	public switchFirst(options?: SwitchOptions) {
		return this._switchNeighbor(-1, SwitchDirection.Forward, options);
	}

	public switchLast(options?: SwitchOptions) {
		return this._switchNeighbor(this.props.entries.length, SwitchDirection.Backward, options);
	}

	render() {
		const {props, state, tabContext, prevPosition: normalizedPrevPosition} = this;
		const {
			entries,
			mode,
			keyboardSwitch,
			delayTriggerLatency,

			tabContainerClassName,
			labelContainerClassName,
			labelItemClassName,
			panelContainerClassName,
			panelItemClassName,
			showHeaderLabelContainer,
			showFooterLabelContainer,

			triggerEvents,
			delayTriggerEvents,
			delayTriggerCancelEvents,
		} = props;

		const {index: prevIndex} = normalizedPrevPosition;

		const {targetPosition} = state;
		const normalizedTargetPosition = normalizePosition(entries, targetPosition);
		const {index: targetIndex} = normalizedTargetPosition;

		const entryCount = entries.length;
		let currentIndex: number;
		if (targetIndex === -1) {
			currentIndex = entryCount > 0 ? 0 : -1;
			this.currentPosition = normalizePosition(entries, currentIndex);
		} else if (targetIndex < entryCount) {
			currentIndex = targetIndex;
			this.currentPosition = normalizedTargetPosition;
		} else {
			currentIndex = entryCount - 1;
			this.currentPosition = normalizePosition(entries, currentIndex);
		}

		if (prevIndex !== currentIndex && props.onSwitching) {
			props.onSwitching(normalizedPrevPosition, this.currentPosition);
		}

		return <TabContainer
			entries={entries}
			mode={mode}
			keyboardSwitch={keyboardSwitch}
			delayTriggerLatency={delayTriggerLatency}

			tabContainerClassName={tabContainerClassName}
			labelContainerClassName={labelContainerClassName}
			labelItemClassName={labelItemClassName}
			panelContainerClassName={panelContainerClassName}
			panelItemClassName={panelItemClassName}
			showHeaderLabelContainer={showHeaderLabelContainer}
			showFooterLabelContainer={showFooterLabelContainer}

			triggerEvents={triggerEvents}
			delayTriggerEvents={delayTriggerEvents}
			delayTriggerCancelEvents={delayTriggerCancelEvents}

			fnSwitchTo={this.switchTo}
			fnSwitchPrevious={this.switchPrevious}
			fnSwitchNext={this.switchNext}
			fnSwitchFirst={this.switchFirst}
			fnSwitchLast={this.switchLast}

			tabContext={tabContext}
			currentIndex={currentIndex}
		/>
	}

	private handleIndexChange() {
		const {props, prevPosition, currentPosition} = this;
		const {onSwitched} = props;

		if (prevPosition.index !== currentPosition.index && onSwitched) {
			onSwitched(prevPosition, currentPosition);
		}
		this.prevPosition = currentPosition;
	}

	componentDidMount() {
		this.handleIndexChange();
	}

	componentDidUpdate() {
		this.handleIndexChange();
	}
}

export default Tab
