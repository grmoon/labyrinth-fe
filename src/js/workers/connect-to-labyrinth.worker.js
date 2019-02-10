let WS_ACTIONS = { initialize: 'initialize' };
const ws = new WebSocket('ws://localhost:8765');
const _self = self;

self.onmessage = ({ data: labyrinthId }) => {
  const intervalId = setInterval(() => {
    if (ws.readyState === 1) {
      clearInterval(intervalId);

      ws.send(JSON.stringify({
        action: WS_ACTIONS.connect_to_labyrinth,
        payload: {
          labyrinth_id: labyrinthId
        }
      }));
    }
  });
}

ws.onclose = (evt) => {
}

ws.onerror = (evt) => {
}

ws.onmessage = (evt) => {
  const message = JSON.parse(evt.data);
  const payload = message['payload'];
  const action = message['action']

  switch(action) {
    case WS_ACTIONS.initialize:
    case WS_ACTIONS.refresh:
      WS_ACTIONS = payload['actions'];
      break;
    case WS_ACTIONS.deliver_labyrinth:
      self.postMessage(payload['labyrinth']);
      break;
    default:
      throw new Error(`${message.action} is not a valid action.`);
  }
}
