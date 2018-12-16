function getValidIndex(index) {
    if (index === '' || !isFinite(index) || isNaN(index)) {
        return -1;
    }
    var intIndex = parseInt(index);
    return intIndex < 0 ? 0 : index;
}
export default getValidIndex;
