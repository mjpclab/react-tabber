var RE_WHITESPACES = /\s+/;
function normalizeEvents(events) {
    if (events) {
        if (Array.isArray(events)) {
            return events;
        }
        else {
            return String(events).split(RE_WHITESPACES);
        }
    }
}
export default normalizeEvents;
