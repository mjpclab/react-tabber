type ReactTabberNode = string | number | JSX.Element | React.Component;

interface ReactTabber {
}

interface ReactTabberItem {
	label: ReactTabberNode | ReactTabberNode[];
	page: ReactTabberNode | ReactTabberNode[];
	key?: string | number;
}

interface ReactTabberOptionalProps {
	activeIndex: number;
	triggerEvents?: string | string[];
	delayTriggerEvents?: string | string[];
	delayTriggerCancelEvents?: string | string[];
	delayTriggerLatency: number;
	onSwitch?: (oldIndex: number, newIndex: number) => void;

	tabContainerClassName: string;

	labelContainerClassName: string;
	showTopLabelContainer: boolean;
	showBottomLabelContainer: boolean;
	topLabelContainerClassName: string;
	bottomLabelContainerClassName: string;
	labelItemClassName: string;
	labelItemActiveClassName: string;
	labelItemInactiveClassName: string;

	pageContainerClassName: string;
	pageItemClassName: string;
	pageItemActiveClassName: string;
	pageItemInactiveClassName: string;
}

interface ReactTabberProps extends Partial<ReactTabberOptionalProps> {
	tabs: ReactTabberItem[];
}

interface ReactTabberState {
	activeIndex: number;
}
