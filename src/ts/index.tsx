/// <reference path='./type/public.d.ts' />

import React, {ReactElement} from 'react';

import tabberPropTypes from './utility/tabber-prop-types';
import tabberDefaultProps from './utility/tabber-default-props';

import getNumericIndex from './utility/get-numeric-index';
import normalizeEvents from './utility/normalize-events';
import createEventHandler from "./utility/create-event-handler";

import Label from './component/label';
import Panel from './component/panel';

class ReactTabber extends React.Component<ReactTabber.Props, ReactTabber.State> {
	static Label = Label;
	static Panel = Panel;

	static propTypes = tabberPropTypes;
	static defaultProps = tabberDefaultProps;

	private currentIndex: number = -1;
	private renderedIndex: number = -1;
	private triggerEvents?: string[];
	private delayTriggerEvents?: string[];
	private delayTriggerCancelEvents?: string[];
	private delayTimeout?: number;

	constructor(props: any) {
		super(props);
		const {activeIndex} = props;

		this.state = {
			prevActiveIndex: activeIndex,
			targetIndex: activeIndex
		};

		this.triggerEvents = normalizeEvents(props.triggerEvents);
		this.delayTriggerEvents = normalizeEvents(props.delayTriggerEvents);
		this.delayTriggerCancelEvents = normalizeEvents(props.delayTriggerCancelEvents);
	}

	static getDerivedStateFromProps(props: ReactTabber.Props, state: ReactTabber.State) {
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
		clearTimeout(this.delayTimeout);
	}

	private _createLabelContainer(tabs: ReactTabber.Entry[], positionClassName: string) {
		const {
			labelContainerClassName,
			labelItemClassName,
			labelItemActiveClassName,
			labelItemInactiveClassName,
			delayTriggerLatency
		} = this.props;

		const labelContainer = <div className={labelContainerClassName + ' ' + positionClassName}>
			{tabs.map((tab, index) => {
				const doSwitch = () => {
					clearTimeout(this.delayTimeout);
					this.switchTo(index);
				};
				let localDelayTimeout: number;
				const delayDoSwitch = (delayTriggerLatency!) <= 0 ?
					doSwitch :
					() => {
						clearTimeout(this.delayTimeout);
						localDelayTimeout = this.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
					};
				const cancelDelayDoSwitch = () => {
					if (localDelayTimeout === this.delayTimeout) {
						clearTimeout(localDelayTimeout);
					}
				};

				const {labelProps, key} = tab;
				let labelDelayTriggerCancelProps;
				let labelDelayTriggerProps;
				if (this.delayTriggerEvents && this.delayTriggerEvents.length) {
					labelDelayTriggerCancelProps = createEventHandler(this.delayTriggerCancelEvents, cancelDelayDoSwitch);
					labelDelayTriggerProps = createEventHandler(this.delayTriggerEvents, delayDoSwitch);
				}
				const labelTriggerProps = createEventHandler(this.triggerEvents, doSwitch);

				return <div
					{...labelProps}
					{...labelDelayTriggerCancelProps}
					{...labelDelayTriggerProps}
					{...labelTriggerProps}
					key={key ? 'key-' + key : 'index-' + index}
					className={labelItemClassName + ' ' + (index === this.currentIndex ? labelItemActiveClassName : labelItemInactiveClassName)}
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
					className={panelItemClassName + ' ' + (index === this.currentIndex ? panelItemActiveClassName : panelItemInactiveClassName)}
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

	private getTabEntries() {
		const entries: ReactTabber.Entry[] = [];
		const props = this.props;

		//props.tabs
		if (props.tabs!.length) {
			entries.push.apply(entries, props.tabs!);
		}

		//props.children
		if (props.children) {
			let currentLabelProps = {};
			let currentLabelItems: React.ReactNode[] = [];
			let currentPanelProps = {};
			let currentPanelItems: React.ReactNode[] = [];
			let key: string | undefined;

			const pushEntry = () => {
				entries.push({
					labelProps: currentLabelProps,
					label: currentLabelItems.length === 1 ? currentLabelItems[0] : currentLabelItems,
					panelProps: currentPanelProps,
					panel: currentPanelItems.length === 1 ? currentPanelItems[0] : currentPanelItems,
					key: key
				});
			};

			React.Children.forEach(props.children, child => {
				const element = child as ReactElement<any>;
				if (element.type && element.type === Label) {
					if (currentLabelItems.length) { // end of previous entry
						pushEntry();
					}
					currentLabelProps = element.props;
					currentLabelItems = [];
					if (Array.isArray(element.props.children)) {
						currentLabelItems.push(...element.props.children);
					} else {
						currentLabelItems.push(element.props.children);
					}
					currentPanelProps = {};
					currentPanelItems = [];
					key = element.key ? 'key-' + element.key : 'index-' + entries.length;
				} else {
					if (!currentLabelItems.length) {
						currentLabelItems.push('');
					}
					if (element.type && element.type === Panel) {
						currentPanelProps = {...currentPanelProps, ...element.props};
						if (Array.isArray(element.props.children)) {
							currentPanelItems.push(...element.props.children);
						} else {
							currentPanelItems.push(element.props.children);
						}
					} else if (element.type) {
						currentPanelItems.push(element);
					}
				}
			});

			if (currentLabelItems.length) {
				pushEntry();
			}
		}

		return entries;
	}

	render() {
		const self = this;
		const props = self.props;
		const state = self.state;
		const tabEntries = self.getTabEntries();

		const oldIndex = self.currentIndex;
		const newIndex = self.currentIndex = state.targetIndex >= tabEntries.length ? tabEntries.length - 1 : state.targetIndex;
		if (oldIndex !== newIndex && props.onSwitching) {
			props.onSwitching(oldIndex, newIndex);
		}

		return self.createTabContainer(tabEntries);
	}

	private updateRenderedIndex() {
		const self = this;
		const props = self.props;
		const oldIndex = self.renderedIndex;
		const newIndex = self.renderedIndex = self.currentIndex;
		if (oldIndex !== newIndex && props.onSwitched) {
			props.onSwitched(oldIndex, newIndex);
		}
	}

	componentDidMount() {
		this.updateRenderedIndex();
	}

	componentDidUpdate() {
		this.updateRenderedIndex();
	}
}

export default ReactTabber;
