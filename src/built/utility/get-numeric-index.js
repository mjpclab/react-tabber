function getNumericIndex(index) {
    if (index === '' || !isFinite(index) || isNaN(index)) {
        return -1;
    }
    var intIndex = parseInt(index);
    if (intIndex < -1) {
        intIndex = -1;
    }
    return intIndex;
}
export default getNumericIndex;
