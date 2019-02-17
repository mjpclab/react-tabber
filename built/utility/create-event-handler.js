function createEventHandler(events, handler) {
    var eventHandlers = {};
    events.forEach(function (event) {
        eventHandlers[event] = handler;
    });
    return eventHandlers;
}
export default createEventHandler;
