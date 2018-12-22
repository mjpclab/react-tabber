import PropTypes from 'prop-types';

const tabberPropTypes = {
	tabs: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.node.isRequired,
		panel: PropTypes.node.isRequired,
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

	panelContainerClassName: PropTypes.string,
	panelItemClassName: PropTypes.string,
	panelItemActiveClassName: PropTypes.string,
	panelItemInactiveClassName: PropTypes.string
};

export default tabberPropTypes;
