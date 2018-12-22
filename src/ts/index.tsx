/// <reference path='./type/public.d.ts' />

import React from 'react';

import getNumericIndex from './utility/get-numeric-index';
import normalizeEvents from './utility/normalize-events';
import createEventHandler from "./utility/create-event-handler";

import tabberPropTypes from './utility/tabber-prop-types';
import tabberDefaultProps from './utility/tabber-default-props';

import parseTabEntries from './feature/parse-tab-entries';

import Label from './component/label';
import Panel from './component/panel';

class ReactTabber extends React.Component<ReactTabber.Props, ReactTabber.State> {
	static Label = Label;
	static Panel = Panel;

	static propTypes = tabberPropTypes;
	static defaultProps = tabberDefaultProps;

	private tabContext: ReactTabber.Context = {
		prevIndex: -1,
		currentIndex: -1,
		delayTimeout: 0
	};

	constructor(props: any) {
		super(props);
		const {activeIndex} = props;

		this.state = {
			prevActiveIndex: activeIndex,
			targetIndex: activeIndex,
		};
	}

	static getDerivedStateFromProps(props: ReactTabber.Props, state: ReactTabber.State) {
		const {triggerEvents, delayTriggerEvents, delayTriggerCancelEvents} = props;

		let result: Partial<ReactTabber.State> = {
			triggerEvents: normalizeEvents(triggerEvents),
			delayTriggerEvents: normalizeEvents(delayTriggerEvents),
			delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents)
		};

		const activeIndex = getNumericIndex(props.activeIndex);
		const {prevActiveIndex} = state;
		if (activeIndex !== prevActiveIndex) {
			result = {
				...result,
				prevActiveIndex: activeIndex,
				targetIndex: activeIndex
			}
		}

		return result;
	}

	componentWillUnmount() {
		clearTimeout(this.tabContext.delayTimeout);
	}

	private _createLabelContainer(tabs: ReactTabber.Entry[], positionClassName: string) {
		const {tabContext} = this;
		const {
			labelContainerClassName,
			labelItemClassName,
			labelItemActiveClassName,
			labelItemInactiveClassName,
			delayTriggerLatency
		} = this.props;
		const {triggerEvents, delayTriggerEvents, delayTriggerCancelEvents} = this.state;

		const labelContainer = <div className={labelContainerClassName + ' ' + positionClassName}>
			{tabs.map((tab, index) => {
				const doSwitch = () => {
					clearTimeout(tabContext.delayTimeout);
					this.switchTo(index);
				};
				let localDelayTimeout: any;
				const delayDoSwitch = (delayTriggerLatency!) <= 0 ?
					doSwitch :
					() => {
						clearTimeout(tabContext.delayTimeout);
						localDelayTimeout = tabContext.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
					};
				const cancelDelayDoSwitch = () => {
					if (localDelayTimeout === tabContext.delayTimeout) {
						clearTimeout(localDelayTimeout);
					}
				};

				const {labelProps, key} = tab;
				let labelDelayTriggerCancelProps;
				let labelDelayTriggerProps;
				if (delayTriggerEvents && delayTriggerEvents.length) {
					labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
					labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
				}
				const labelTriggerProps = createEventHandler(triggerEvents, doSwitch);

				return <div
					{...labelProps}
					{...labelDelayTriggerCancelProps}
					{...labelDelayTriggerProps}
					{...labelTriggerProps}
					key={key ? 'key-' + key : 'index-' + index}
					className={labelItemClassName + ' ' + (index === tabContext.currentIndex ? labelItemActiveClassName : labelItemInactiveClassName)}
				>{tab.label}</div>;
			})}
		</div>;
		return labelContainer;
	}

	private createHeaderLabelContainer(tabs: ReactTabber.Entry[]) {
		return this._createLabelContainer(tabs, this.props.headerLabelContainerClassName!);
	}

	private createFooterLabelContainer(tabs: ReactTabber.Entry[]) {
		return this._createLabelContainer(tabs, this.props.footerLabelContainerClassName!);
	}

	private createPanelContainer(tabs: ReactTabber.Entry[]) {
		const {
			panelContainerClassName,
			panelItemClassName,
			panelItemActiveClassName,
			panelItemInactiveClassName
		} = this.props;

		return <div className={panelContainerClassName}>
			{tabs.map((tab, index) => {
				const {panelProps, key} = tab;
				return <div
					{...panelProps}
					key={key ? 'key-' + key : 'index-' + index}
					className={panelItemClassName + ' ' + (index === this.tabContext.currentIndex ? panelItemActiveClassName : panelItemInactiveClassName)}
				>{tab.panel}</div>
			})}
		</div>;
	}

	private createTabContainer(tabs: ReactTabber.Entry[]) {
		const {
			tabContainerClassName,
			showHeaderLabelContainer,
			showFooterLabelContainer
		} = this.props;

		return <div className={tabContainerClassName}>
			{showHeaderLabelContainer ? this.createHeaderLabelContainer(tabs) : null}
			{this.createPanelContainer(tabs)}
			{showFooterLabelContainer ? this.createFooterLabelContainer(tabs) : null}
		</div>;
	}

	private switchTo(index: number) {
		this.setState({
			targetIndex: getNumericIndex(index)
		});
	}

	render() {
		const {props, state, tabContext} = this;
		const {prevIndex} = tabContext;
		const tabEntries = parseTabEntries(props, props.children);

		const currentIndex = tabContext.currentIndex = Math.min(state.targetIndex, tabEntries.length - 1);
		if (prevIndex !== currentIndex && props.onSwitching) {
			props.onSwitching(prevIndex, currentIndex);
		}

		return this.createTabContainer(tabEntries);
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

export default ReactTabber;
