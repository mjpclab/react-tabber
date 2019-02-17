import {JSXProps} from '../type/tab';

function createEventHandler(events: string[], handler: any) {
	const eventHandlers: JSXProps = {};

	events.forEach(event => {
		eventHandlers[event] = handler;
	});

	return eventHandlers;
}

export default createEventHandler;
