var invalidNormalizedPosition = {
    index: -1,
    key: undefined
};
function getNormalizedPosition(entries, position) {
    if (typeof position === 'number') {
        return {
            index: position,
            key: entries[position] && entries[position].key
        };
    }
    else if (isFinite(position)) {
        var index = parseInt(position);
        return {
            index: index,
            key: entries[index].key
        };
    }
    else if (position) {
        var result_1 = undefined;
        entries.some(function (entry, i) {
            if (entry.key === position) {
                result_1 = {
                    index: i,
                    key: entry.key
                };
                return true;
            }
            return false;
        });
        return result_1 || invalidNormalizedPosition;
    }
    else {
        return invalidNormalizedPosition;
    }
}
export { invalidNormalizedPosition, getNormalizedPosition };
