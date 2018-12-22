declare function clearTimeout(handle?: number): void;

declare function parseInt(value: string | number): number;

declare namespace ReactTabber {
	interface State {
		prevActiveIndex: number;
		targetIndex: number;
		triggerEvents?: string[];
		delayTriggerEvents?: string[];
		delayTriggerCancelEvents?: string[];
	}

	interface Context {
		prevIndex: number;
		currentIndex: number;
		delayTimeout: any;
	}
}
