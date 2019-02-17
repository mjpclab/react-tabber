import {Entry, TabItemPosition, NormalizedTabItemPosition} from '../type/tab';

const invalidNormalizedPosition: NormalizedTabItemPosition = {
	index: -1,
	key: undefined
};

function normalizePosition(entries: Entry[], position: TabItemPosition): NormalizedTabItemPosition {
	if (typeof position === 'number') {
		return {
			index: position,
			key: entries[position] && entries[position].key
		}
	} else if (isFinite(position)) {
		const index = parseInt(position);
		return {
			index,
			key: entries[index].key
		}
	} else if (position) {
		let result: NormalizedTabItemPosition | undefined = undefined;

		entries.some((entry, i) => {
			if (entry.key === position) {
				result = {
					index: i,
					key: entry.key
				};
				return true;
			}
			return false;
		});

		return result || invalidNormalizedPosition;
	} else {
		return invalidNormalizedPosition
	}
}

export {invalidNormalizedPosition, normalizePosition};
