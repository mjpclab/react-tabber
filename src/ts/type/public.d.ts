type ReactTabberNode = string | number | JSX.Element | React.Component | boolean | null | undefined;

type JSXProps = {
	[attr: string]: any;
};

interface ReactTabberEntry {
	labelProps?: JSXProps
	label: ReactTabberNode | ReactTabberNode[];
	pageProps?: JSXProps
	page: ReactTabberNode | ReactTabberNode[];
	key?: string | number;
}

interface _ReactTabberProps {
	tabs: ReactTabberEntry[];

	triggerEvents?: string | string[];
	delayTriggerEvents?: string | string[];
	delayTriggerCancelEvents?: string | string[];
	delayTriggerLatency: number;
	activeIndex: number;
	onSwitching?: (oldIndex: number, newIndex: number) => void;
	onSwitched?: (oldIndex: number, newIndex: number) => void;

	tabContainerClassName: string;

	labelContainerClassName: string;
	showHeaderLabelContainer: boolean;
	showFooterLabelContainer: boolean;
	headerLabelContainerClassName: string;
	footerLabelContainerClassName: string;
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
