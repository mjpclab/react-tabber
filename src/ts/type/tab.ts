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

interface PublicProps extends Partial<NecessaryProps>, Partial<EventProps> {
}

type PublicPropTypes = {
	[P in keyof PublicProps]: any
}


interface TabProps extends NecessaryProps, NormalizedEventProps {
}

type TabPropTypes = {
	[P in keyof TabProps]: any
}

interface TabState {
	manageActiveIndex: boolean;
	targetPosition: TabItemPosition;
}

interface TabContext {
	tabberId: number;
	prevPosition: NormalizedTabItemPosition;
	currentPosition: NormalizedTabItemPosition;
	delayTimeout: any;
}

// Switch
interface SwitchOptions {
	includeDisabled?: boolean;
	includeHidden?: boolean;
	exclude: TabItemPosition[];
	loop: boolean;
}

type FnSwitchTo = (position: NormalizedTabItemPosition) => NormalizedTabItemPosition;
type FnSwitchNeighbor = (options?: SwitchOptions) => NormalizedTabItemPosition | undefined;


export {
	JSXProps,
	Entry,
	Mode,
	TabItemPosition,
	NormalizedTabItemPosition,

	NecessaryProps,
	EventProps,
	NormalizedEventProps,
	PublicProps,
	PublicPropTypes,
	TabPropTypes,

	TabState,
	TabContext,

	SwitchOptions,
	FnSwitchTo,
	FnSwitchNeighbor,
	TabProps
}
