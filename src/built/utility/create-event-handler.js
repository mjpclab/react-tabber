function createEventHandler(events, handler) {
    var eventHandlers = {};
    events && events.length && events.forEach(function (event) {
        eventHandlers[event] = handler;
    });
    return eventHandlers;
}
export default createEventHandler;
