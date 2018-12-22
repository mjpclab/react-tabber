function getNumericIndex(index: any): number {
	if (index === '' || !isFinite(index) || isNaN(index)) {
		return -1;
	}

	let intIndex = parseInt(index);
	if (intIndex < -1) {
		intIndex = -1;
	}
	return intIndex;
}

export default getNumericIndex;
