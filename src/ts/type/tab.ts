import type React from "react";
import type {ReactElement} from "react";

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

interface TabContext {
	readonly tabberId: number;
	delayTimeout: any;
}

interface SwitchOptions {
	includeDisabled?: boolean;
	includeHidden?: boolean;
	exclude: TabItemPosition[];
	loop: boolean;
}

type FnSwitchTo = (position: NormalizedTabItemPosition) => NormalizedTabItemPosition;
type FnSwitchNeighbor = (options?: SwitchOptions) => NormalizedTabItemPosition | undefined;

interface SwitchFuncs {
	fnSwitchTo: FnSwitchTo;
	fnSwitchPrevious: FnSwitchNeighbor;
	fnSwitchNext: FnSwitchNeighbor;
	fnSwitchFirst: FnSwitchNeighbor;
	fnSwitchLast: FnSwitchNeighbor;
}

interface ComponentProps {
	children: ReactElement
}

interface NecessaryProps {
	entries: Entry[];
	mode: Mode;

	keyboardSwitch: boolean;
	delayTriggerLatency: number;

	tabContainerClassName: string;
	labelContainerClassName: string;
	labelItemClassName: string;
	panelContainerClassName: string;
	panelItemClassName: string;
	showHeaderLabelContainer: boolean;
	showFooterLabelContainer: boolean;
}

interface Callbacks {
	onUpdateActivePosition?: (position: NormalizedTabItemPosition) => void;
	onUpdateTargetPosition?: (position: NormalizedTabItemPosition) => boolean | undefined;
	onSwitching?: (from: NormalizedTabItemPosition, to: NormalizedTabItemPosition) => void;
	onSwitched?: (from: NormalizedTabItemPosition, to: NormalizedTabItemPosition) => void;
}

interface EventProps {
	triggerEvents: string | string[];
	delayTriggerEvents: string | string[];
	delayTriggerCancelEvents: string | string[];
}

type NormalizedEventProps = {
	[P in keyof EventProps]: string[]
}

// public
interface PublicProps extends Partial<ComponentProps>, Partial<NecessaryProps>, Partial<Callbacks>, Partial<EventProps> {
	activePosition?: TabItemPosition;
}

type PublicPropTypes = {
	[P in keyof PublicProps]: any
}

// tab
interface TabProps extends NecessaryProps, Callbacks, NormalizedEventProps {
	activePosition?: TabItemPosition;
}

type TabPropTypes = {
	[P in keyof TabProps]: any
}

// tab container
interface TabContainerProps extends NecessaryProps, NormalizedEventProps, SwitchFuncs {
	tabContext: TabContext;
	currentIndex: number;
}

type TabContainerPropTypes = {
	[P in keyof TabContainerProps]: any
}

// label container
interface LabelContainerProps extends NormalizedEventProps, SwitchFuncs {
	entries: Entry[];
	mode: Mode;
	keyboardSwitch: boolean;
	delayTriggerLatency: number;

	labelContainerClassName: string;
	labelItemClassName: string;

	tabContext: TabContext;
	currentIndex: number;
	side: string;
}

type LabelContainerPropTypes = {
	[P in keyof LabelContainerProps]: any
}

// panel container
interface PanelContainerProps {
	entries: Entry[];
	mode: Mode;
	panelContainerClassName: string;
	panelItemClassName: string;
	tabContext: TabContext;
	currentIndex: number;
	refLabelSide: string;
}

type PanelContainerPropTypes = {
	[P in keyof PanelContainerProps]: any
}

export {
	JSXProps,
	Entry,
	Mode,
	TabItemPosition,
	NormalizedTabItemPosition,

	TabContext,
	SwitchOptions,
	FnSwitchTo,
	FnSwitchNeighbor,

	PublicProps,
	PublicPropTypes,

	TabProps,
	TabPropTypes,

	TabContainerProps,
	TabContainerPropTypes,

	LabelContainerProps,
	LabelContainerPropTypes,

	PanelContainerProps,
	PanelContainerPropTypes
}
