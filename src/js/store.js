import Vue from 'vue';
import Vuex from 'vuex';
import Occupant from '@labyrinth/Occupant';
import CreateLabyrinthWorker from '@workers/create-labyrinth';
import ConnectToLabyrinthWorker from '@workers/connect-to-labyrinth';
import Labyrinth from './labyrinth/Labyrinth';

let WS_ACTIONS = {
    initialize: 'initialize'
};

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        connected: undefined,
        connectingToLabyrinth: undefined,
        connectedToLabyrinth: undefined,
        endCellDOM: undefined,
        labyrinth: undefined,
        labyrinths: undefined,
        occupiedCell: undefined,
        occupiedCellDOM: undefined,
    },
    getters: {
        getIsGameOver(state) {
            let isGameOver;

            if (state.labyrinth) {
                isGameOver = state.occupiedCell === state.labyrinth.end;
            }
            else {
                isGameOver = undefined;
            }

            return isGameOver;
        }
    },
    mutations: {
        addOccupant(state, occupantParams) {
            const occupant = new Occupant(occupantParams);

            state.labyrinth.addOccupant(occupant);
        },
        setEndCellDOM(state, dom) {
            state.endCellDOM = dom;
        },
        setOccupiedCellDOM(state, dom) {
            state.occupiedCellDOM = dom;
        },
        setLabyrinth(state, labyrinth) {
            state.labyrinth = labyrinth;
        },
        moveOccupant(state, direction) {
            state.occupiedCell = state.labyrinth.moveOccupant(direction);
        },
        setConnected(state, connected) {
            state.connected = connected;
        },
        setLabyrinths(state, labyrinths) {
            state.labyrinths = labyrinths;
        },
        setConnectingToLabyrinth(state, connecting) {
            state.connectingToLabyrinth = connecting;
        },
        setConnectedToLabyrinth(state, connected) {
            state.connectedToLabyrinth = connected;
        }
    },
    actions: {
        connectToLabyrinth({ state, commit }, labyrinthId) {
            commit('setConnectingToLabyrinth', true);
            commit('setConnectedToLabyrinth', false);

            return new Promise((resolve, reject) => {
                const worker = new ConnectToLabyrinthWorker();

                worker.postMessage(labyrinthId);
                worker.onmessage = ({ data: labyrinthObject }) => {
                    const labyrinth = new Labyrinth({ labyrinthObject });

                    try {
                        commit('setLabyrinth', labyrinth);
                    }
                    catch (err) {
                        return reject(err);
                    }

                    resolve(labyrinth);
                }
            });
        },
        createLabyrinth({ state, commit }, labyrinthParams) {
            return new Promise((resolve, reject) => {
                const worker = new CreateLabyrinthWorker();

                worker.postMessage(labyrinthParams);
                worker.onmessage = ({ data: labyrinthObject }) => {
                    if (state.connected) {
                        const message = {
                            action: WS_ACTIONS.register,
                            payload: labyrinthParams
                        };

                        ws.send(JSON.stringify(message));
                    }

                    const labyrinth = new Labyrinth({ labyrinthObject });

                    try {
                        commit('setLabyrinth', labyrinth);
                    }
                    catch (err) {
                        return reject(err);
                    }

                    resolve(labyrinth);
                }
            });
        }
    }
});

const ws = new WebSocket(WEBSOCKET_URL);

ws.onopen = (evt) => {
    store.commit('setConnected', true);
}

ws.onclose = (evt) => {
    store.commit('setConnected', false);
}

ws.onerror = (evt) => {
    store.commit('setConnected', false);
}

ws.onmessage = (evt) => {
    const message = JSON.parse(evt.data);
    console.log('Recieved Message', message);

    const payload = message['payload'];
    const action = message['action']

    switch (action) {
        case WS_ACTIONS.initialize:
        case WS_ACTIONS.refresh:
            WS_ACTIONS = payload['actions'];
            store.commit('setLabyrinths', payload['labyrinths']);
            break;
        case WS_ACTIONS.get_labyrinth:
            ws.send(JSON.stringify({
                action: WS_ACTIONS.deliver_labyrinth,
                payload: {
                    labyrinth: store.state.labyrinth,
                    for: payload['for']
                }
            }));
            break;
        case WS_ACTIONS.register:
            break;
        default:
            throw new Error(`${message.action} is not a valid action.`);
    }
}

export default store;
