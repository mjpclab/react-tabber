import React, {Component} from 'react';

import {PublicProps, PublicPropTypes} from './type/tab';
import {publicPropTypes} from './utility/prop-types';
import defaultProps from './utility/default-props';
import normalizeEvents from './utility/normalize-events';

import parseTabEntries from './feature/parse-tab-entries';

import Tab from './component/tab';
import Label from './component/label';
import Panel from './component/panel';

class ReactTabber extends Component<PublicProps> {
	static Label = Label;
	static Panel = Panel;

	static propTypes: PublicPropTypes = publicPropTypes;
	static defaultProps: PublicProps = defaultProps;

	render() {
		const {entries, children, triggerEvents, delayTriggerEvents, delayTriggerCancelEvents, ...props} = this.props;

		return <Tab
			{...props}
			entries={parseTabEntries(entries, children)}
			triggerEvents={normalizeEvents(triggerEvents)}
			delayTriggerEvents={normalizeEvents(delayTriggerEvents)}
			delayTriggerCancelEvents={normalizeEvents(delayTriggerCancelEvents)}
		/>;
	}
}

export default ReactTabber;
