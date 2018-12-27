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
		prevActivePosition: ReactTabber.TabItemPosition
		targetPosition: ReactTabber.TabItemPosition;
	}

	interface TabContext {
		prevPosition: ReactTabber.NormalizedTabItemPosition;
		currentPosition: ReactTabber.NormalizedTabItemPosition;
		delayTimeout: any;
	}

	type FnSwitchTo = (position: ReactTabber.TabItemPosition) => void;
}
