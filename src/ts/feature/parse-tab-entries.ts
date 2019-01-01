import React, {ReactElement} from "react";
import Label from "../component/label";
import Panel from "../component/panel";

function parseTabEntries(propTabs: ReactTabber.Entry[] | undefined, children: React.ReactNode) {
	const entries: ReactTabber.Entry[] = [];

	// prop entries
	if (propTabs && propTabs.length) {
		entries.push(...propTabs.map(_entry => {
			const entry: ReactTabber.Entry = {..._entry};
			if (entry.key === undefined) {
				entry.key = null
			}
			return entry;
		}));
	}

	// children
	if (children) {
		let currentLabelProps = {};
		let currentLabelItems: React.ReactNode[] = [];
		let currentPanelProps = {};
		let currentPanelItems: React.ReactNode[] = [];
		let key: string | number | null | undefined;
		let disabled: boolean | undefined;
		let hidden: boolean | undefined;

		const pushEntry = () => {
			entries.push({
				labelProps: currentLabelProps,
				label: currentLabelItems,
				panelProps: currentPanelProps,
				panel: currentPanelItems,
				key,
				disabled,
				hidden
			});
		};

		React.Children.forEach(children, child => {
			const element = child as ReactElement<any>;
			if (element.type && element.type === Label) {
				if (currentLabelItems.length) { // end of previous entry
					pushEntry();
				}
				const {disabled: itemDisabled, hidden: itemHidden, ...restLabelProps} = element.props;
				currentLabelProps = restLabelProps;
				currentLabelItems = [];
				if (Array.isArray(element.props.children)) {
					currentLabelItems.push(...element.props.children);
				} else {
					currentLabelItems.push(element.props.children);
				}
				currentPanelProps = {};
				currentPanelItems = [];
				key = typeof element.key !== 'undefined' ? element.key : entries.length;
				disabled = itemDisabled;
				hidden = itemHidden;
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
