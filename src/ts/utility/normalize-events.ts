const RE_WHITESPACES = /\s+/;

function normalizeEvents(events: string | string[] | undefined): string[] | undefined {
	if (events) {
		if (Array.isArray(events)) {
			return events;
		} else {
			return String(events).split(RE_WHITESPACES);
		}
	}
}

export default normalizeEvents;
