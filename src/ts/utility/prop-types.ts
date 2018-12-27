import PropTypes from 'prop-types';

const sharedPropTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.node.isRequired,
		panel: PropTypes.node.isRequired,
		key: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	})),
	mode: PropTypes.string,
	delayTriggerLatency: PropTypes.number,
	activeIndex: PropTypes.number,
	onSwitching: PropTypes.func,
	onSwitched: PropTypes.func,

	tabContainerClassName: PropTypes.string,

	labelContainerClassName: PropTypes.string,
	showHeaderLabelContainer: PropTypes.bool,
	showFooterLabelContainer: PropTypes.bool,
	labelItemClassName: PropTypes.string,

	panelContainerClassName: PropTypes.string,
	panelItemClassName: PropTypes.string,
};

const propTypes: ReactTabber.PropTypes = {
	...sharedPropTypes,
	triggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	delayTriggerEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
	delayTriggerCancelEvents: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
};

const tabPropTypes: ReactTabber.TabPropTypes = {
	...sharedPropTypes,
	triggerEvents: PropTypes.arrayOf(PropTypes.string),
	delayTriggerEvents: PropTypes.arrayOf(PropTypes.string),
	delayTriggerCancelEvents: PropTypes.arrayOf(PropTypes.string)
};

export {propTypes, tabPropTypes};
