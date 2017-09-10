declare function clearTimeout(handle?: number): void;

interface ReactTabOptionalProps {
	tabContainerClassName: string;

	labelContainerClassName: string;
	topLabelContainerClassName: string;
	bottomLabelContainerClassName: string;
	labelItemClassName: string;
	labelItemActiveClassName: string;
	labelItemInactiveClassName: string;

	pageContainerClassName: string;
	pageItemClassName: string;
	pageItemActiveClassName: string;
	pageItemInactiveClassName: string;

	activeIndex: number;
	showTopLabelContainer: boolean;
	showBottomLabelContainer: boolean;

	clickSwitch: boolean;
	hoverSwitch: boolean;
	hoverSwitchDelay: number;
	leaveCancelSwitch: boolean;

	onSwitch?: (oldIndex: number, newIndex: number) => void;
}

interface ReactTabState {
	activeIndex: number;
}
