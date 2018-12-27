import React from 'react';

import getNumericIndex from '../utility/get-numeric-index';
import {tabPropTypes} from '../utility/prop-types';
import defaultProps from '../utility/default-props';

import createTabContainer from '../feature/create-tab-container';

class Tab extends React.Component<ReactTabber.TabProps, ReactTabber.TabState> {
	static propTypes = tabPropTypes;
	static defaultProps = defaultProps;

	private tabContext: ReactTabber.TabContext = {
		prevIndex: -1,
		currentIndex: -1,
		delayTimeout: 0
	};

	constructor(props: ReactTabber.TabProps) {
		super(props);
		const {activeIndex} = props;

		this.switchTo = this.switchTo.bind(this);

		this.state = {
			prevActiveIndex: activeIndex,
			targetIndex: activeIndex,
		};
	}

	static getDerivedStateFromProps(props: ReactTabber.TabProps, state: ReactTabber.TabState) {
		const activeIndex = getNumericIndex(props.activeIndex);
		const {prevActiveIndex} = state;
		if (activeIndex !== prevActiveIndex) {
			return {
				prevActiveIndex: activeIndex,
				targetIndex: activeIndex
			}
		}

		return null;
	}

	componentWillUnmount() {
		clearTimeout(this.tabContext.delayTimeout);
	}

	private switchTo(index: number) {
		this.setState({
			targetIndex: getNumericIndex(index)
		});
	}

	render() {
		const {props, state, tabContext} = this;
		const {prevIndex} = tabContext;
		const {tabs} = props;

		const currentIndex = tabContext.currentIndex = Math.min(state.targetIndex, tabs.length - 1);
		if (prevIndex !== currentIndex && props.onSwitching) {
			props.onSwitching(prevIndex, currentIndex);
		}

		return createTabContainer(props, tabContext, tabs, this.switchTo);
	}

	private handleIndexChange() {
		const {props, tabContext} = this;
		const {prevIndex, currentIndex} = tabContext;
		if (prevIndex !== currentIndex && props.onSwitched) {
			props.onSwitched(prevIndex, currentIndex);
		}
		tabContext.prevIndex = currentIndex;
	}

	componentDidMount() {
		this.handleIndexChange();
	}

	componentDidUpdate() {
		this.handleIndexChange();
	}
}

export default Tab
