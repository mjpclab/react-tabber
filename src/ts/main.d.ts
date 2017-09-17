type ReactTabberNode = string | number | JSX.Element | React.Component;

interface ReactTabber {
}

interface ReactTabberItem {
	label: ReactTabberNode | ReactTabberNode[];
	page: ReactTabberNode | ReactTabberNode[];
	key?: string | number;
}

interface _ReactTabberProps {
	tabs: ReactTabberItem[];

	triggerEvents?: string | string[];
	delayTriggerEvents?: string | string[];
	delayTriggerCancelEvents?: string | string[];
	delayTriggerLatency: number;
	activeIndex: number;
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

interface ReactTabberProps extends Partial<_ReactTabberProps> {
}

interface ReactTabberState {
	targetIndex: number;
}
