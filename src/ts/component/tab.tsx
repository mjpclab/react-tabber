import React from 'react';

import {TabProps, TabState, TabContext, NormalizedTabItemPosition, SwitchOptions} from '../type/tab';
import {invalidNormalizedPosition, getNormalizedPosition} from '../utility/normalized-position';
import {tabPropTypes} from '../utility/prop-types';
import defaultProps from '../utility/default-props';
import {getNextTabContainerId} from '../utility/get-id';

import createTabContainer from '../feature/create-tab-container';

enum SwitchDirection {Backward, Forward}

class Tab extends React.Component<TabProps, TabState> {
	static propTypes = tabPropTypes;
	static defaultProps = defaultProps;

	private tabContext: TabContext = {
		tabberId: getNextTabContainerId(),
		prevPosition: invalidNormalizedPosition,
		currentPosition: invalidNormalizedPosition,
		delayTimeout: 0
	};

	constructor(props: TabProps) {
		super(props);

		this.switchTo = this.switchTo.bind(this);
		this._switchNeighbor = this._switchNeighbor.bind(this);
		this.switchPrevious = this.switchPrevious.bind(this);
		this.switchNext = this.switchNext.bind(this);
		this.switchFirst = this.switchFirst.bind(this);
		this.switchLast = this.switchLast.bind(this);

		this.state = {
			manageActiveIndex: true,
			targetPosition: -1,
		};
	}

	static getDerivedStateFromProps(props: TabProps) {
		const {activePosition} = props;

		if (activePosition === undefined || activePosition === null || (typeof activePosition === 'number' && !isFinite(activePosition))) {
			return {
				manageActiveIndex: true
			}
		}

		return {
			manageActiveIndex: false,
			targetPosition: activePosition
		}
	}

	componentWillUnmount() {
		clearTimeout(this.tabContext.delayTimeout);
	}

	public switchTo(position: NormalizedTabItemPosition) {
		const {manageActiveIndex} = this.state;
		const {onUpdateActivePosition, onUpdateTargetPosition} = this.props;

		if (manageActiveIndex) {
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

		const entries = this.props.tabs;
		const excludeIndecies = exclude ? exclude.map(pos => getNormalizedPosition(entries, pos).index) : [];

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
				return this.switchTo(getNormalizedPosition(entries, tabItemIndex));
			}
		}
	}

	public switchPrevious(options?: SwitchOptions) {
		return this._switchNeighbor(this.tabContext.currentPosition.index, SwitchDirection.Backward, options);
	}

	public switchNext(options?: SwitchOptions) {
		return this._switchNeighbor(this.tabContext.currentPosition.index, SwitchDirection.Forward, options);
	}

	public switchFirst(options?: SwitchOptions) {
		return this._switchNeighbor(-1, SwitchDirection.Forward, options);
	}

	public switchLast(options?: SwitchOptions) {
		return this._switchNeighbor(this.props.tabs.length, SwitchDirection.Backward, options);
	}

	render() {
		const {props, state, tabContext} = this;
		const {targetPosition} = state;
		const {prevPosition: normalizedPrevPosition} = tabContext;
		const {index: prevIndex} = normalizedPrevPosition;
		const {tabs} = props;

		const normalizedTargetPosition = getNormalizedPosition(tabs, targetPosition);
		const {index: targetIndex} = normalizedTargetPosition;

		const entryCount = tabs.length;
		let currentIndex: number;
		if (targetIndex === -1) {
			currentIndex = entryCount > 0 ? 0 : -1;
			tabContext.currentPosition = getNormalizedPosition(tabs, currentIndex);
		} else if (targetIndex < entryCount) {
			currentIndex = targetIndex;
			tabContext.currentPosition = normalizedTargetPosition;
		} else {
			currentIndex = entryCount - 1;
			tabContext.currentPosition = getNormalizedPosition(tabs, currentIndex);
		}

		if (prevIndex !== currentIndex && props.onSwitching) {
			props.onSwitching(normalizedPrevPosition, tabContext.currentPosition);
		}

		return createTabContainer(
			props,
			tabContext,
			tabs,
			this.switchTo,
			this.switchPrevious,
			this.switchNext,
			this.switchFirst,
			this.switchLast
		);
	}

	private handleIndexChange() {
		const {props, tabContext} = this;
		const {onSwitched} = props;
		const {prevPosition, currentPosition} = tabContext;

		if (prevPosition.index !== currentPosition.index && onSwitched) {
			onSwitched(prevPosition, currentPosition);
		}
		tabContext.prevPosition = currentPosition;
	}

	componentDidMount() {
		this.handleIndexChange();
	}

	componentDidUpdate() {
		this.handleIndexChange();
	}
}

export default Tab
