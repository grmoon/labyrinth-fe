import Vue from 'vue';
import Vuex from 'vuex';
import Labyrinth from '@labyrinth/Labyrinth';
import Occupant from '@labyrinth/Occupant';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        labyrinth: undefined
    },
    mutations: {
        addOccupant(state, occupantParams) {
            const occupant = new Occupant(occupantParams);

            state.labyrinth.addOccupant(occupant);
        },
        setLabyrinth(state, labyrinth) {
            state.labyrinth = labyrinth;
        },
        moveOccupant(state, direction) {
            state.labyrinth.moveOccupant(direction);
        }
    },
    actions: {
        createLabyrinth({ commit }, labyrinthParams) {
            return new Promise((resolve) => {
                const labyrinth = new Labyrinth(labyrinthParams);

                commit('setLabyrinth', labyrinth);
                resolve(labyrinth);
            });
        }
    }
});