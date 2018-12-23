declare namespace ReactTabber {
	type JSXProps = {
		[attr: string]: any;
	};

	interface Entry {
		labelProps?: JSXProps
		label: React.ReactNode | React.ReactNode[];
		panelProps?: JSXProps
		panel: React.ReactNode | React.ReactNode[];
		key?: string | number;
	}

	interface NecessaryProps {
		tabs: Entry[];

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
		labelItemClassName: string;

		panelContainerClassName: string;
		panelItemClassName: string;
	}

	interface Props extends Partial<NecessaryProps> {
	}
}
