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
		disabled?: boolean;
		hidden?: boolean;
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

		keyboardSwitch: boolean;
		delayTriggerLatency: number;
		activePosition?: TabItemPosition;
		onUpdateActivePosition?: (position: NormalizedTabItemPosition) => void;
		onUpdateTargetPosition?: (position: NormalizedTabItemPosition) => boolean | undefined;
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

	// Label
	interface LabelProps {
		disabled?: boolean;
		hidden?: boolean;
	}

	type LabelPropTypes = {
		[P in keyof LabelProps]: any
	};

	// Switch
	interface SwitchOptions {
		includeDisabled?: boolean;
		includeHidden?: boolean;
		exclude: TabItemPosition[];
		loop: boolean;
	}
}
