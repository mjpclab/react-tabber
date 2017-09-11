declare function clearTimeout(handle?: number): void;

interface ReactTabOptionalProps {
	activeIndex: number;
	clickSwitch: boolean;
	hoverSwitch: boolean;
	hoverSwitchDelay: number;
	leaveCancelSwitch: boolean;
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

interface ReactTabState {
	activeIndex: number;
}
