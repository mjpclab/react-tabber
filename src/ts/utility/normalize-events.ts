const RE_WHITESPACES = /\s+/;

function normalizeEvents(events: string | string[] | undefined): string[] {
	if (!events) {
		return [];
	}

	const arrayed = Array.isArray(events) ? events : String(events).split(RE_WHITESPACES);
	const normalized = arrayed.filter(Boolean);
	return normalized;
}

export default normalizeEvents;
