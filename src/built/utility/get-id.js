var PREFIX = '__react-tabber';
function getLabelItemId(tabberId, side, index) {
    return PREFIX + "__" + tabberId + "__" + side + "__label__" + index;
}
function getPanelItemId(tabberId, index) {
    return PREFIX + "__" + tabberId + "__panel__" + index;
}
export { getLabelItemId, getPanelItemId };
