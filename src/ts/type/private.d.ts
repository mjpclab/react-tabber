declare function clearTimeout(handle?: number): void;

declare function parseInt(value: string | number): number;

declare function isFinite(number: string): boolean;

declare namespace ReactTabber {
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
		prevPosition: NormalizedTabItemPosition;
		currentPosition: NormalizedTabItemPosition;
		delayTimeout: any;
	}

	type FnSwitchTo = (position: NormalizedTabItemPosition) => void;
}
