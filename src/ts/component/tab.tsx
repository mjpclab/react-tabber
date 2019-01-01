import React from 'react';

import {invalidNormalizedPosition, getNormalizedPosition} from '../utility/normalized-position';
import {tabPropTypes} from '../utility/prop-types';
import defaultProps from '../utility/default-props';

import createTabContainer from '../feature/create-tab-container';

let nextTabberId = 0;

class Tab extends React.Component<ReactTabber.TabProps, ReactTabber.TabState> {
	static propTypes = tabPropTypes;
	static defaultProps = defaultProps;

	private tabContext: ReactTabber.TabContext = {
		tabberId: nextTabberId++,
		prevPosition: invalidNormalizedPosition,
		currentPosition: invalidNormalizedPosition,
		delayTimeout: 0
	};

	constructor(props: ReactTabber.TabProps) {
		super(props);

		this.switchTo = this.switchTo.bind(this);

		this.state = {
			manageActiveIndex: true,
			targetPosition: -1,
		};
	}

	static getDerivedStateFromProps(props: ReactTabber.TabProps, state: ReactTabber.TabState) {
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

	private switchTo(position: ReactTabber.NormalizedTabItemPosition) {
		const {manageActiveIndex} = this.state;
		const {onUpdateActivePosition} = this.props;

		if (manageActiveIndex) {
			this.setState({
				targetPosition: position.index
			});
		} else if (onUpdateActivePosition) {
			onUpdateActivePosition(position);
		}
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

		return createTabContainer(props, tabContext, tabs, this.switchTo);
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
