declare function clearTimeout(handle?: number): void;

declare function parseInt(value: string | number): number;

declare namespace ReactTabber {
	interface TabProps extends NecessaryProps, NormalizedEventProps {

	}

	type TabPropTypes = {
		[P in keyof TabProps]: any
	}

	interface TabState {
		prevActiveIndex: number;
		targetIndex: number;
	}

	interface TabContext {
		prevIndex: number;
		currentIndex: number;
		delayTimeout: any;
	}

	type FnSwitchTo = (index: number) => void;
}
