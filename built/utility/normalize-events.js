var RE_WHITESPACES = /\s+/;
function normalizeEvents(events) {
    if (!events) {
        return [];
    }
    var arrayed = Array.isArray(events) ? events : String(events).split(RE_WHITESPACES);
    var normalized = arrayed.filter(Boolean);
    return normalized;
}
export default normalizeEvents;
