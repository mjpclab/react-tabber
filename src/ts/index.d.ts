interface ReactTab {

}

interface ReactTabItem {
	label: JSX.Element;
	page: JSX.Element;
}

interface ReactTabProps extends Partial<ReactTabOptionalProps> {
	tabs: ReactTabItem[];
}
