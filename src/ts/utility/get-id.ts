const PREFIX = '__react-tabber';

const NUMBER_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
let currentTabberContainerId = -1;

function getNextTabContainerId() {
	currentTabberContainerId = (currentTabberContainerId + 1) % NUMBER_MAX_SAFE_INTEGER;
	return currentTabberContainerId;
}

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
	getNextTabContainerId,
	getLabelItemId,
	getPanelItemId
}
