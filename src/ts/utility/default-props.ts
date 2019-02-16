import {PublicProps, Mode} from '../type/tab';

const defaultProps: PublicProps = {
	entries: [],
	mode: Mode.Horizontal,
	keyboardSwitch: true,

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
