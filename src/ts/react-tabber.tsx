/// <reference path='public.d.ts' />
/// <reference path='private.d.ts' />

import * as React from 'react';
import * as PropTypes from 'prop-types';

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
	static propTypes = {
		tabs: PropTypes.arrayOf(PropTypes.shape({
			label: PropTypes.node.isRequired,
			page: PropTypes.node.isRequired,
			key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
		})).isRequired,
		triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerLatency: PropTypes.number,
		activeIndex: PropTypes.number,
		onSwitch: PropTypes.func,

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

	private currentIndex: number = -1;
	private triggerEvents?: string[];
	private delayTriggerEvents?: string[];
	private delayTriggerCancelEvents?: string[];
	private delayTimeout?: number;

	constructor(props: any) {
		super(props);

		this.state = {
			targetIndex: this.getValidIndex(props.activeIndex)
		};
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

	private getLabelContainer(positionClassName: string) {
		const props = this.props;

		const labelContainer = <div className={props.labelContainerClassName + ' ' + positionClassName}>
			{this.props.tabs!.map((tab, index) => {
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

	private getPageContainer() {
		const props = this.props;

		return <div className={props.pageContainerClassName}>
			{this.props.tabs!.map((tab, index) => {
				const className = props.pageItemClassName + ' ' + (index === this.currentIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
				return <div
					key={tab.key ? 'key-' + tab.key : 'index-' + index}
					className={className}
				>{tab.page}</div>
			})}
		</div>;
	}

	private getTabContainer() {
		const props = this.props;

		return <div className={props.tabContainerClassName}>
			{props.showHeaderLabelContainer ? this.getLabelContainer(props.headerLabelContainerClassName!) : null}
			{this.getPageContainer()}
			{props.showFooterLabelContainer ? this.getLabelContainer(props.footerLabelContainerClassName!) : null}
		</div>;
	}

	private switchTo(index: number) {
		this.setState({
			targetIndex: this.getValidIndex(index)
		});
	}

	render() {
		const props = this.props;
		const state = this.state;

		const oldIndex = this.currentIndex;
		const newIndex = this.currentIndex = state.targetIndex >= props.tabs!.length ? props.tabs!.length - 1 : state.targetIndex;
		if (oldIndex !== newIndex && props.onSwitch) {
			props.onSwitch(oldIndex, newIndex);
		}

		return this.props.tabs ? this.getTabContainer() : null;
	}
}

export default ReactTabber;