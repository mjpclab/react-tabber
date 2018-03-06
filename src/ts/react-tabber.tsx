/// <reference path='public.d.ts' />
/// <reference path='private.d.ts' />

import * as React from 'react';
import * as PropTypes from 'prop-types';

import ReactTabberLabel from './react-tabber-label';
import ReactTabberPage from './react-tabber-page';
import {ReactElement} from "react";

const RE_WHITESPACES = /\s+/;

function normalizeTriggerEvents(events: string | string[] | undefined): string[] | undefined {
	if (events) {
		if (Array.isArray(events)) {
			return events;
		}
		else {
			return String(events).split(RE_WHITESPACES);
		}
	}
}

function fillEventHandler(props: JSXProps, events: string[] | undefined | null, handler: any) {
	if (events && events.length) {
		events.forEach(event => {
			props[event] = handler;
		});
	}
}

class ReactTabber extends React.Component<ReactTabberProps, ReactTabberState> {
	static Label = ReactTabberLabel;
	static Page = ReactTabberPage;

	static propTypes = {
		tabs: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.node.isRequired,
			page: PropTypes.node.isRequired,
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})),
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

		pageContainerClassName: PropTypes.string,
		pageItemClassName: PropTypes.string,
		pageItemActiveClassName: PropTypes.string,
		pageItemInactiveClassName: PropTypes.string
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

		pageContainerClassName: 'page-container',
		pageItemClassName: 'page-item',
		pageItemActiveClassName: 'page-active',
		pageItemInactiveClassName: 'page-inactive'
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
		this.triggerEvents = normalizeTriggerEvents(props.triggerEvents);
		this.delayTriggerEvents = normalizeTriggerEvents(props.delayTriggerEvents);
		this.delayTriggerCancelEvents = normalizeTriggerEvents(props.delayTriggerCancelEvents);
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
				const className = props.labelItemClassName + ' ' + (index === this.currentIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName);
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

				const labelItemProps: JSXProps = {};
				if (this.delayTriggerEvents && this.delayTriggerEvents.length) {
					fillEventHandler(labelItemProps, this.delayTriggerCancelEvents, cancelDelayDoSwitch);
					fillEventHandler(labelItemProps, this.delayTriggerEvents, delayDoSwitch);
				}
				fillEventHandler(labelItemProps, this.triggerEvents, doSwitch);

				labelItemProps.key = tab.key ? 'key-' + tab.key : 'index-' + index;
				labelItemProps.className = className;

				return React.createElement('div', labelItemProps, tab.label);
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

	private getPageContainer(tabs: ReactTabberEntry[]) {
		const props = this.props;

		return <div className={props.pageContainerClassName}>
			{tabs.map((tab, index) => {
				const className = props.pageItemClassName + ' ' + (index === this.currentIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
				return <div
					key={tab.key ? 'key-' + tab.key : 'index-' + index}
					className={className}
				>{tab.page}</div>
			})}
		</div>;
	}

	private getTabContainer(tabs: ReactTabberEntry[]) {
		const props = this.props;

		return <div className={props.tabContainerClassName}>
			{props.showHeaderLabelContainer ? this.getHeaderLabelContainer(tabs) : null}
			{this.getPageContainer(tabs)}
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
			entries.push.apply(entries, props.tabs);
		}

		//props.children
		if (props.children) {
			let currentLabel: ReactTabberNode[] = [];
			let currentPage: ReactTabberNode[] = [];
			let key: string | undefined;

			React.Children.forEach(props.children, (child: React.ReactChild) => {
				const element = child as ReactElement<any>;
				if (element.type && element.type === ReactTabberLabel) {
					if (currentLabel.length) {
						entries.push({
							label: currentLabel.length === 1 ? currentLabel[0] : currentLabel,
							page: currentPage.length === 1 ? currentPage[0] : currentPage,
							key: key
						});
					}
					currentLabel = [];
					if (Array.isArray(element.props.children)) {
						currentLabel.push.apply(currentLabel, element.props.children);
					}
					else {
						currentLabel.push(element.props.children);
					}
					currentPage = [];
					key = element.key ? 'key-' + element.key : 'index-' + entries.length;
				}
				else {
					if (!currentLabel.length) {
						currentLabel.push('');
					}
					if (element.type && element.type === ReactTabberPage) {
						if (Array.isArray(element.props.children)) {
							currentPage.push.apply(currentPage, element.props.children);
						}
						else {
							currentPage.push(element.props.children);
						}
					}
					else if (element.type) {
						currentPage.push(element);
					}
				}
			});

			if (currentLabel.length) {
				entries.push({
					label: currentLabel.length === 1 ? currentLabel[0] : currentLabel,
					page: currentPage.length === 1 ? currentPage[0] : currentPage,
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

export {
	ReactTabber as default,
	ReactTabber,
	ReactTabberLabel,
	ReactTabberPage
}