import React = require('react');
import PropTypes = require('prop-types');

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
		activeIndex: PropTypes.number,
		triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		delayTriggerLatency: PropTypes.number,
		onSwitch: PropTypes.func,

		tabContainerClassName: PropTypes.string,

		labelContainerClassName: PropTypes.string,
		showTopLabelContainer: PropTypes.bool,
		showBottomLabelContainer: PropTypes.bool,
		topLabelContainerClassName: PropTypes.string,
		bottomLabelContainerClassName: PropTypes.string,
		labelItemClassName: PropTypes.string,
		labelItemActiveClassName: PropTypes.string,
		labelItemInactiveClassName: PropTypes.string,

		pageContainerClassName: PropTypes.string,
		pageItemClassName: PropTypes.string,
		pageItemActiveClassName: PropTypes.string,
		pageItemInactiveClassName: PropTypes.string
	};

	static defaultProps: ReactTabberOptionalProps = {
		activeIndex: 0,
		triggerEvents: ['onClick'],
		delayTriggerLatency: 200,

		tabContainerClassName: 'tab-container',

		labelContainerClassName: 'label-container',
		showTopLabelContainer: true,
		showBottomLabelContainer: false,
		topLabelContainerClassName: 'top',
		bottomLabelContainerClassName: 'bottom',
		labelItemClassName: 'label-item',
		labelItemActiveClassName: 'label-active',
		labelItemInactiveClassName: 'label-inactive',

		pageContainerClassName: 'page-container',
		pageItemClassName: 'page-item',
		pageItemActiveClassName: 'page-active',
		pageItemInactiveClassName: 'page-inactive'
	};

	private triggerEvents?: string[];
	private delayTriggerEvents?: string[];
	private delayTriggerCancelEvents?: string[];
	private delayTimeout?: number;

	constructor(props: any) {
		super(props);

		this.state = {
			activeIndex: -1
		};
	}

	componentWillMount() {
		this.switchTo(this.props.activeIndex!);

		const props = this.props;
		this.triggerEvents = normalizeTriggerEvents(props.triggerEvents);
		this.delayTriggerEvents = normalizeTriggerEvents(props.delayTriggerEvents);
		this.delayTriggerCancelEvents = normalizeTriggerEvents(props.delayTriggerCancelEvents);
	}

	componentWillUnmount() {
		clearTimeout(this.delayTimeout);
	}

	private getLabelContainer(positionClassName: string) {
		const props = this.props;
		const state = this.state;

		const labelContainer = <div className={props.labelContainerClassName + ' ' + positionClassName}>
			{this.props.tabs.map((tab, index) => {
				const className = props.labelItemClassName + ' ' + (index === state.activeIndex ? props.labelItemActiveClassName : props.labelItemInactiveClassName);
				const doSwitch = () => {
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
				if(this.delayTriggerEvents && this.delayTriggerEvents.length) {
					fillEventHandler(labelItemProps, this.delayTriggerCancelEvents, cancelDelayDoSwitch);
					fillEventHandler(labelItemProps, this.delayTriggerEvents, delayDoSwitch);
				}
				fillEventHandler(labelItemProps, this.triggerEvents, doSwitch);

				labelItemProps.key = tab.key ? 'key-' + tab.key : 'index-' + index;
				labelItemProps.className = className;

				return React.createElement('label', labelItemProps, tab.label);
			})}
		</div>;
		return labelContainer;
	}

	private getPageContainer() {
		const props = this.props;
		const state = this.state;

		return <div className={props.pageContainerClassName}>
			{this.props.tabs.map((tab, index) => {
				const className = props.pageItemClassName + ' ' + (index === state.activeIndex ? props.pageItemActiveClassName : props.pageItemInactiveClassName);
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
			{props.showTopLabelContainer ? this.getLabelContainer(props.topLabelContainerClassName!) : null} {this.getPageContainer()} {props.showBottomLabelContainer ? this.getLabelContainer(props.bottomLabelContainerClassName!) : null}
		</div>;
	}

	private switchTo(index: number) {
		if (!isFinite(index) || isNaN(index)) {
			return;
		}

		const props = this.props;
		const onSwitch = props.onSwitch;
		let oldIndex: number;
		let newIndex: number;

		if (index < 0) {
			newIndex = 0;
		}
		else if (index >= props.tabs.length) {
			newIndex = props.tabs.length - 1;
		}
		else {
			newIndex = parseInt(index);
		}

		//update
		this.setState(function (prevState) {
			oldIndex = prevState.activeIndex;
			if (oldIndex !== newIndex) {
				return {
					activeIndex: newIndex
				};
			}
		}, onSwitch && function () {
			if (oldIndex !== newIndex) {
				onSwitch(oldIndex, newIndex);
			}
		});
	}

	render() {
		return this.props.tabs ? this.getTabContainer() : null;
	}
}

export = ReactTabber;