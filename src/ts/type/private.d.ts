declare function clearTimeout(handle?: number): void;

declare function parseInt(value: string | number): number;

declare namespace ReactTabber {
	interface Context {
		prevIndex: number;
		currentIndex: number;
		delayTimeout: any;
	}
}
