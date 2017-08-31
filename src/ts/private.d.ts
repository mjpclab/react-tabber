declare function clearTimeout(handle?: number): void;

interface ReactTabOptionalProps {
	tabContainerClassName: string;

	labelContainerClassName: string;
	labelItemClassName: string;
	labelItemActiveClassName: string;
	labelItemInactiveClassName: string;

	pageContainerClassName: string;
	pageItemClassName: string;
	pageItemActiveClassName: string;
	pageItemInactiveClassName: string;

	activeIndex: number;
	showTopLabel: boolean;
	showBottomLabel: boolean;

	clickSwitch: boolean;
	hoverSwitch: boolean;
	hoverSwitchDelay: number;
	leaveCancelSwitch: boolean;

	onSwitch?: (oldIndex: number, newIndex: number) => void;
}

interface ReactTabState {
	activeIndex: number;
}
