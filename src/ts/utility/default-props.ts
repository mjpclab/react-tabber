const defaultProps: ReactTabber.Props = {
	tabs: [],
	mode: ReactTabber.Mode.Horizontal,

	activeIndex: 0,
	triggerEvents: ['onClick'],
	delayTriggerLatency: 200,

	tabContainerClassName: 'tab-container',

	labelContainerClassName: 'label-container',
	showHeaderLabelContainer: true,
	showFooterLabelContainer: false,
	labelItemClassName: 'label-item',

	panelContainerClassName: 'panel-container',
	panelItemClassName: 'panel-item',
};

export default defaultProps;
