/// <reference path='./type/public.d.ts' />

import React from 'react';

import {propTypes} from './utility/prop-types';
import defaultProps from './utility/default-props';
import normalizeEvents from './utility/normalize-events';

import parseTabEntries from './feature/parse-tab-entries';

import Tab from './component/tab';
import Label from './component/label';
import Panel from './component/panel';

class ReactTabber extends React.Component<ReactTabber.Props> {
	static Label = Label;
	static Panel = Panel;

	static propTypes = propTypes;
	static defaultProps = defaultProps;

	render() {
		const {triggerEvents, delayTriggerEvents, delayTriggerCancelEvents, ...props} = this.props;
		const tabs = parseTabEntries(this.props, this.props.children);

		return <Tab
			{...props}
			triggerEvents={normalizeEvents(triggerEvents)}
			delayTriggerEvents={normalizeEvents(delayTriggerEvents)}
			delayTriggerCancelEvents={normalizeEvents(delayTriggerCancelEvents)}
			tabs={tabs}
		/>;
	}
}

export default ReactTabber;
