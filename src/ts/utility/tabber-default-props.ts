const tabberDefaultProps: ReactTabber.Props = {
	tabs: [],

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

export default tabberDefaultProps;
