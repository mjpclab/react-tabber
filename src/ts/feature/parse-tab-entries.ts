import React, {ReactElement} from "react";
import Label from "../component/label";
import Panel from "../component/panel";

function parseTabEntries(props: ReactTabber.Props, children: React.ReactNode) {
	const entries: ReactTabber.Entry[] = [];

	// tabs
	if (props.tabs && props.tabs.length) {
		entries.push.apply(entries, props.tabs);
	}

	// children
	if (children) {
		let currentLabelProps = {};
		let currentLabelItems: React.ReactNode[] = [];
		let currentPanelProps = {};
		let currentPanelItems: React.ReactNode[] = [];
		let key: string | undefined;

		const pushEntry = () => {
			entries.push({
				labelProps: currentLabelProps,
				label: currentLabelItems,
				panelProps: currentPanelProps,
				panel: currentPanelItems,
				key: key
			});
		};

		React.Children.forEach(children, child => {
			const element = child as ReactElement<any>;
			if (element.type && element.type === Label) {
				if (currentLabelItems.length) { // end of previous entry
					pushEntry();
				}
				currentLabelProps = element.props;
				currentLabelItems = [];
				if (Array.isArray(element.props.children)) {
					currentLabelItems.push(...element.props.children);
				} else {
					currentLabelItems.push(element.props.children);
				}
				currentPanelProps = {};
				currentPanelItems = [];
				key = element.key ? 'key-' + element.key : 'index-' + entries.length;
			} else {
				if (!currentLabelItems.length) {
					currentLabelItems.push('');
				}
				if (element.type && element.type === Panel) {
					currentPanelProps = {...currentPanelProps, ...element.props};
					if (Array.isArray(element.props.children)) {
						currentPanelItems.push(...element.props.children);
					} else {
						currentPanelItems.push(element.props.children);
					}
				} else if (element.type) {
					currentPanelItems.push(element);
				}
			}
		});

		if (currentLabelItems.length) {
			pushEntry();
		}
	}

	return entries;
}

export default parseTabEntries;
