function createEventHandler(events: string[] | undefined | null, handler: any) {
	const eventHandlers: ReactTabber.JSXProps = {};

	events && events.length && events.forEach(event => {
		eventHandlers[event] = handler;
	});

	return eventHandlers;
}

export default createEventHandler;
