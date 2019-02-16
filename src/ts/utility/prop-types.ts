import PropTypes from 'prop-types';

import {
	PublicPropTypes,
	TabPropTypes,
	TabContainerPropTypes,
	LabelContainerPropTypes,
	PanelContainerPropTypes
} from '../type/tab';

const switchFuncPropTypes = {
	fnSwitchTo: PropTypes.func,
	fnSwitchPrevious: PropTypes.func,
	fnSwitchNext: PropTypes.func,
	fnSwitchFirst: PropTypes.func,
	fnSwitchLast: PropTypes.func
};

const entriesPropType = PropTypes.arrayOf(PropTypes.shape({
	label: PropTypes.node.isRequired,
	panel: PropTypes.node.isRequired,
	key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}));

const necessaryPropTypes = {
	entries: entriesPropType,
	mode: PropTypes.string,
	keyboardSwitch: PropTypes.bool,
	delayTriggerLatency: PropTypes.number,

	tabContainerClassName: PropTypes.string,

	labelContainerClassName: PropTypes.string,
	showHeaderLabelContainer: PropTypes.bool,
	showFooterLabelContainer: PropTypes.bool,
	labelItemClassName: PropTypes.string,

	panelContainerClassName: PropTypes.string,
	panelItemClassName: PropTypes.string
};

const callbackPropTypes = {
	onUpdateActivePosition: PropTypes.func,
	onUpdateTargetPosition: PropTypes.func,
	onSwitching: PropTypes.func,
	onSwitched: PropTypes.func
};

const eventPropTypes = {
	triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};

const normalizedEventPropTypes = {
	triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};


const publicPropTypes: PublicPropTypes = {
	...necessaryPropTypes,
	...callbackPropTypes,
	...eventPropTypes,
	activePosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const tabPropTypes: TabPropTypes = {
	...necessaryPropTypes,
	...callbackPropTypes,
	...normalizedEventPropTypes,
	activePosition: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const tabContainerPropTypes: TabContainerPropTypes = {
	...necessaryPropTypes,
	...normalizedEventPropTypes,
	...switchFuncPropTypes,
	tabContext: PropTypes.object,
};

const labelContainerPropTypes: LabelContainerPropTypes = {
	...normalizedEventPropTypes,
	...switchFuncPropTypes,
	entries: entriesPropType,
	mode: PropTypes.string,
	keyboardSwitch: PropTypes.bool,
	delayTriggerLatency: PropTypes.number,
	labelContainerClassName: PropTypes.string,
	labelItemClassName: PropTypes.string,
	tabContext: PropTypes.object,
	side: PropTypes.string,
};

const panelContainerPropTypes: PanelContainerPropTypes = {
	entries: PropTypes.arrayOf(PropTypes.object),
	mode: PropTypes.string,
	panelContainerClassName: PropTypes.string,
	panelItemClassName: PropTypes.string,
	tabContext: PropTypes.object,
	refLabelSide: PropTypes.string
};

export {publicPropTypes, tabPropTypes, tabContainerPropTypes, labelContainerPropTypes, panelContainerPropTypes};
