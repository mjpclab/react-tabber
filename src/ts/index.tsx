/// <reference path='./type/public.d.ts' />
/// <reference path='./type/private.d.ts' />

import React, {ReactElement} from 'react';
import PropTypes from 'prop-types';

import normalizeEvents from './utility/normalize-events';
import createEventHandler from "./utility/create-event-handler";

import Label from './component/label';
import Panel from './component/panel';

class ReactTabber extends React.Component<ReactTabberProps, ReactTabberState> {
	static Label = Label;
	static Panel = Panel;

	static propTypes = {
		tabs: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.node.isRequired,
			panel: PropTypes.node.isRequired,
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})).isRequired,
		triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerLatency: PropTypes.number,
		activeIndex: PropTypes.number,
		onSwitching: PropTypes.func,
		onSwitched: PropTypes.func,

		tabContainerClassName: PropTypes.string,

		labelContainerClassName: PropTypes.string,
		showHeaderLabelContainer: PropTypes.bool,
		showFooterLabelContainer: PropTypes.bool,
		headerLabelContainerClassName: PropTypes.string,
		footerLabelContainerClassName: PropTypes.string,
		labelItemClassName: PropTypes.string,
		labelItemActiveClassName: PropTypes.string,
		labelItemInactiveClassName: PropTypes.string,

		panelContainerClassName: PropTypes.string,
		panelItemClassName: PropTypes.string,
		panelItemActiveClassName: PropTypes.string,
		panelItemInactiveClassName: PropTypes.string
	};

	static defaultProps: ReactTabberProps = {
		tabs: [],

		activeIndex: 0,
		triggerEvents: ['onClick'],
		delayTriggerLatency: 200,

		tabContainerClassName: 'tab-container',

		labelContainerClassName: 'label-container',
		showHeaderLabelContainer: true,
		showFooterLabelContainer: false,
		headerLabelContainerClassName: 'header-container',
		footerLabelContainerClassName: 'footer-container',
		labelItemClassName: 'label-item',
		labelItemActiveClassName: 'label-active',
		labelItemInactiveClassName: 'label-inactive',

		panelContainerClassName: 'panel-container',
		panelItemClassName: 'panel-item',
		panelItemActiveClassName: 'panel-active',
		panelItemInactiveClassName: 'panel-inactive'
	};

	private activeIndex: number = -1;
	private currentIndex: number = -1;
	private renderedIndex: number = -1;
	private triggerEvents?: string[];
	private delayTriggerEvents?: string[];
	private delayTriggerCancelEvents?: string[];
	private delayTimeout?: number;

	constructor(props: any) {
		super(props);

		this.activeIndex = this.getValidIndex(props.activeIndex);
		this.state = {
			targetIndex: this.activeIndex
		};
	}

	componentWillReceiveProps(nextProps: ReactTabberProps) {
		if (nextProps.activeIndex === undefined) {
			return;
		}

		const oldIndex = this.activeIndex;
		const newIndex = this.getValidIndex(nextProps.activeIndex);
		if (oldIndex !== newIndex) {
			this.activeIndex = newIndex;
			this.setState({
				targetIndex: this.activeIndex
			});
		}
	}

	componentWillMount() {
		const props = this.props;
		this.triggerEvents = normalizeEvents(props.triggerEvents);
		this.delayTriggerEvents = normalizeEvents(props.delayTriggerEvents);
		this.delayTriggerCancelEvents = normalizeEvents(props.delayTriggerCancelEvents);
	}

	componentWillUnmount() {
		clearTimeout(this.delayTimeout);
	}

	private getValidIndex(index: any): number {
		if (index === '' || !isFinite(index) || isNaN(index)) {
			return -1;
		}

		const intIndex = parseInt(index);
		return intIndex < 0 ? 0 : index;
	}

	private _getLabelContainer(tabs: ReactTabberEntry[], positionClassName: string) {
		const props = this.props;

		const labelContainer = <div className={props.labelContainerClassName + ' ' + positionClassName}>
			{tabs.map((tab, index) => {
				const doSwitch = () => {
					clearTimeout(this.delayTimeout);
					this.switchTo(index);
				};
				let localDelayTimeout: number;
				const delayDoSwitch = (props.delayTriggerLatency!) <= 0 ?
					doSwitch :
					() => {
						clearTimeout(this.delayTimeout);
						localDelayTimeout = this.delayTimeout = setTimeout(doSwitch, props.delayTriggerLatency);
					};
				const cancelDelayDoSwitch = () => {
					if (localDelayTimeout === this.delayTimeout) {
						clearTimeout(localDelayTimeout);
					}
				};

				const labelItemProps: JSXProps = Object.assign({}, tab.labelProps);
				if (this.delayTriggerEvents && this.delayTriggerEvents.length) {
					Object.assign(
						labelItemProps,
						createEventHandler(this.delayTriggerCancelEvents, cancelDelayDoSwitch),
						createEventHandler(this.delayTriggerEvents, delayDoSwitch)
					);
				}
				Object.assign(
					labelItemProps,
					createEventHandler(this.triggerEvents, doSwitch),
					{
						key: tab.key ? 'key-' + tab.key : 'index-' + index,
						className: props.labelItemClassName + ' ' + (index === this.currentIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName)
					}
				);

				return <div {...labelItemProps}>{tab.label}</div>;
			})}
		</div>;
		return labelContainer;
	}

	private getHeaderLabelContainer(tabs: ReactTabberEntry[]) {
		return this._getLabelContainer(tabs, this.props.headerLabelContainerClassName!);
	}

	private getFooterLabelContainer(tabs: ReactTabberEntry[]) {
		return this._getLabelContainer(tabs, this.props.footerLabelContainerClassName!);
	}

	private getPanelContainer(tabs: ReactTabberEntry[]) {
		const props = this.props;

		return <div className={props.panelContainerClassName}>
			{tabs.map((tab, index) => {
				const panelItemProps: JSXProps = Object.assign({}, tab.panelProps, {
					key: tab.key ? 'key-' + tab.key : 'index-' + index,
					className: props.panelItemClassName + ' ' + (index === this.currentIndex ? props.panelItemActiveClassName : props.panelItemInactiveClassName)
				});

				return <div {...panelItemProps}>{tab.panel}</div>
			})}
		</div>;
	}

	private getTabContainer(tabs: ReactTabberEntry[]) {
		const props = this.props;

		return <div className={props.tabContainerClassName}>
			{props.showHeaderLabelContainer ? this.getHeaderLabelContainer(tabs) : null}
			{this.getPanelContainer(tabs)}
			{props.showFooterLabelContainer ? this.getFooterLabelContainer(tabs) : null}
		</div>;
	}

	private switchTo(index: number) {
		this.setState({
			targetIndex: this.getValidIndex(index)
		});
	}

	private getTabEntries() {
		const entries: ReactTabberEntry[] = [];
		const props = this.props;

		//props.tabs
		if (props.tabs!.length) {
			entries.push.apply(entries, props.tabs!);
		}

		//props.children
		if (props.children) {
			let currentLabelProps = {};
			let currentLabelItems: ReactTabberNode[] = [];
			let currentPanelProps = {};
			let currentPanelItems: ReactTabberNode[] = [];
			let key: string | undefined;

			React.Children.forEach(props.children, child => {
				const element = child as ReactElement<any>;
				if (element.type && element.type === Label) {
					if (currentLabelItems.length) {
						entries.push({
							labelProps: currentLabelProps,
							label: currentLabelItems.length === 1 ? currentLabelItems[0] : currentLabelItems,
							panelProps: currentPanelProps,
							panel: currentPanelItems.length === 1 ? currentPanelItems[0] : currentPanelItems,
							key: key
						});
					}
					currentLabelProps = Object.assign({}, element.props);
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
						Object.assign(currentPanelProps, element.props);
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
				entries.push({
					labelProps: currentLabelProps,
					label: currentLabelItems.length === 1 ? currentLabelItems[0] : currentLabelItems,
					panelProps: currentPanelProps,
					panel: currentPanelItems.length === 1 ? currentPanelItems[0] : currentPanelItems,
					key: key
				});
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

		return self.getTabContainer(tabEntries);
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