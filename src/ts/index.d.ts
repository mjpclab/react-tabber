interface ReactTab {

}

interface ReactTabItem {
	label: JSX.Element;
	page: JSX.Element;
	key?: string;
}

interface ReactTabProps extends Partial<ReactTabOptionalProps> {
	tabs: ReactTabItem[];
}
