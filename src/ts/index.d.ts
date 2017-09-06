interface ReactTab {
}

type ReactTabberNode = string | number | JSX.Element | React.Component;

interface ReactTabItem {
	label: ReactTabberNode | ReactTabberNode[];
	page: ReactTabberNode | ReactTabberNode[];
	key?: string | number;
}

interface ReactTabProps extends Partial<ReactTabOptionalProps> {
	tabs: ReactTabItem[];
}
