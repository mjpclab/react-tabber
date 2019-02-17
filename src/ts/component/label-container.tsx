import React, {Component} from 'react';

import {NormalizedTabItemPosition, LabelContainerProps, LabelContainerPropTypes} from '../type/tab';
import {labelContainerPropTypes} from '../utility/prop-types';
import createEventHandler from '../utility/create-event-handler';
import classNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from '../utility/get-id';

const UP = 'Up';
const DOWN = 'Down';
const LEFT = 'Left';
const RIGHT = 'Right';

const ARROW_UP = 'ArrowUp';
const ARROW_DOWN = 'ArrowDown';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';

const TAB = 'Tab';
const HOME = 'Home';
const END = 'End';
const SPACE = ' ';
const ENTER = 'Enter';

interface LabelContainerState {
	labelContainerAllClassName: string;

	labelItemActiveClassName: string;
	labelItemInactiveClassName: string;
	labelItemDisabledClassName: string;
	labelItemHiddenClassName: string;
}

class LabelContainer extends Component<LabelContainerProps, LabelContainerState> {
	static propTypes: LabelContainerPropTypes = labelContainerPropTypes;

	constructor(props: LabelContainerProps) {
		super(props);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.state = {
			labelContainerAllClassName: '',

			labelItemActiveClassName: '',
			labelItemInactiveClassName: '',
			labelItemDisabledClassName: '',
			labelItemHiddenClassName: ''
		};
	}

	static getDerivedStateFromProps(props: LabelContainerProps) {
		const {
			mode,
			labelContainerClassName,
			labelItemClassName,
			side
		} = props;

		const labelContainerLocationClassName = labelContainerClassName + '-' + side;
		const labelContainerModeClassName = labelContainerClassName + '-' + mode;
		const labelContainerLocationModeClassName = labelContainerClassName + '-' + side + '-' + mode;
		const labelContainerAllClassName = labelContainerClassName + ' ' + labelContainerLocationClassName + ' ' + labelContainerModeClassName + ' ' + labelContainerLocationModeClassName;

		const labelItemActiveClassName = labelItemClassName + '-' + classNameSuffix.active;
		const labelItemInactiveClassName = labelItemClassName + '-' + classNameSuffix.inactive;
		const labelItemDisabledClassName = labelItemClassName + '-' + classNameSuffix.disabled;
		const labelItemHiddenClassName = labelItemClassName + '-' + classNameSuffix.hidden;

		return {
			labelContainerAllClassName,

			labelItemActiveClassName,
			labelItemInactiveClassName,
			labelItemDisabledClassName,
			labelItemHiddenClassName
		}
	}

	onKeyDown(e: React.KeyboardEvent, pos: NormalizedTabItemPosition) {
		const {fnSwitchTo, fnSwitchPrevious, fnSwitchNext, fnSwitchFirst, fnSwitchLast} = this.props;

		let switchResult: NormalizedTabItemPosition | undefined;

		if (e.key) {
			switch (e.key) {
				case UP:
				case LEFT:
				case ARROW_UP:
				case ARROW_LEFT:
					switchResult = fnSwitchPrevious();
					break;
				case DOWN:
				case RIGHT:
				case ARROW_DOWN:
				case ARROW_RIGHT:
					switchResult = fnSwitchNext();
					break;
				case TAB:
					switchResult = e.shiftKey ? fnSwitchPrevious() : fnSwitchNext();
					if (switchResult) {
						e.preventDefault();
					}
					break;
				case HOME:
					switchResult = fnSwitchFirst();
					break;
				case END:
					switchResult = fnSwitchLast();
					break;
				case SPACE:
				case ENTER:
					switchResult = fnSwitchTo(pos);
					break;
			}
		}

		if (switchResult) {
			const targetNode = e.currentTarget.parentNode!.childNodes[switchResult.index] as HTMLElement;
			targetNode && targetNode.focus && targetNode.focus();
			e.preventDefault();
		}
	}

	render() {
		const {
			keyboardSwitch,
			labelItemClassName,
			triggerEvents,
			delayTriggerEvents,
			delayTriggerCancelEvents,
			delayTriggerLatency,
			entries,
			tabContext,
			side,
			fnSwitchTo
		} = this.props;

		const {tabberId, currentPosition: {index: currentIndex}} = tabContext;

		const {
			labelContainerAllClassName,
			labelItemActiveClassName,
			labelItemInactiveClassName,
			labelItemDisabledClassName,
			labelItemHiddenClassName
		} = this.state;

		return <div className={labelContainerAllClassName} role="tablist">
			{entries.map((entry, index) => {
				const {labelProps, key, disabled, hidden} = entry;
				const pos: NormalizedTabItemPosition = {index, key};

				let labelDelayTriggerCancelProps;
				let labelDelayTriggerProps;
				let labelTriggerProps;

				if (!disabled && !hidden) {
					const doSwitch = () => {
						clearTimeout(tabContext.delayTimeout);
						fnSwitchTo(pos);
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

					if (delayTriggerEvents.length) {
						labelDelayTriggerCancelProps = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
						labelDelayTriggerProps = createEventHandler(delayTriggerEvents, delayDoSwitch);
					}
					labelTriggerProps = createEventHandler(triggerEvents, doSwitch);
				}

				const isActive = index === currentIndex;
				const labelItemStatusClassName = isActive ? labelItemActiveClassName : labelItemInactiveClassName;
				let labelItemAllClassName = labelItemClassName + ' ' + labelItemStatusClassName;
				if (disabled) {
					labelItemAllClassName += ' ' + labelItemDisabledClassName;
				}
				if (hidden) {
					labelItemAllClassName += ' ' + labelItemHiddenClassName;
				}

				return <label
					{...labelProps}
					{...labelDelayTriggerCancelProps}
					{...labelDelayTriggerProps}
					{...labelTriggerProps}
					className={labelItemAllClassName}
					tabIndex={0}
					id={getLabelItemId(tabberId, side, index)}
					role="tab"
					aria-controls={getPanelItemId(tabberId, index)}
					aria-selected={isActive}
					aria-expanded={isActive}
					key={key ? 'key-' + key : 'index-' + index}
					onKeyDown={keyboardSwitch ? e => this.onKeyDown(e, pos) : undefined}
				>{entry.label}</label>;
			})}
		</div>;
	}
}

export default LabelContainer;
