const PREFIX = '__react-tabber';

function getLabelItemId(
	tabberId: number,
	side: string,
	index: number
) {
	return `${PREFIX}__${tabberId}__${side}__label__${index}`;
}

function getPanelItemId(
	tabberId: number,
	index: number
) {
	return `${PREFIX}__${tabberId}__panel__${index}`;
}

export {
	getLabelItemId,
	getPanelItemId
}
