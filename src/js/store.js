import Vue from 'vue';
import Vuex from 'vuex';
import Occupant from '@labyrinth/Occupant';
import CreateLabyrinthWorker from '@workers/create-labyrinth';
import Labyrinth from './labyrinth/Labyrinth';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        labyrinth: undefined,
        occupiedCell: undefined,
        endCellDOM: undefined,
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
        }
    },
    actions: {
        createLabyrinth({ commit }, labyrinthParams) {
            return new Promise((resolve, reject) => {
                const worker = new CreateLabyrinthWorker();

                worker.postMessage(labyrinthParams);
                worker.onmessage = ({ data: labyrinthObject }) => {
                    const labyrinth = new Labyrinth({
                        labyrinthObject
                    });

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
