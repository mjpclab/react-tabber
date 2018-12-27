declare namespace ReactTabber {
	type JSXProps = {
		[attr: string]: any;
	};

	interface Entry {
		labelProps?: JSXProps
		label: React.ReactNode | React.ReactNode[];
		panelProps?: JSXProps
		panel: React.ReactNode | React.ReactNode[];
		key?: string | number | null;
	}

	const enum Mode {
		Horizontal = 'horizontal',
		Vertical = 'vertical',
	}

	type TabItemPosition = string | number ;

	interface NormalizedTabItemPosition {
		index: number;
		key?: string | number | null;
	}

	interface NecessaryProps {
		tabs: Entry[];
		mode: Mode;

		delayTriggerLatency: number;
		activePosition?: TabItemPosition;
		onSwitching?: (from: NormalizedTabItemPosition, to: NormalizedTabItemPosition) => void;
		onSwitched?: (from: NormalizedTabItemPosition, to: NormalizedTabItemPosition) => void;

		tabContainerClassName: string;

		labelContainerClassName: string;
		showHeaderLabelContainer: boolean;
		showFooterLabelContainer: boolean;
		labelItemClassName: string;

		panelContainerClassName: string;
		panelItemClassName: string;
	}

	interface EventProps {
		triggerEvents?: string | string[];
		delayTriggerEvents?: string | string[];
		delayTriggerCancelEvents?: string | string[];
	}

	type NormalizedEventProps = {
		[P in keyof EventProps]: string[]
	}

	interface Props extends Partial<NecessaryProps>, Partial<EventProps> {
	}

	type PropTypes = {
		[P in keyof Props]: any
	}
}
