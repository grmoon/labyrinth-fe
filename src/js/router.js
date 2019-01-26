import Configuration from '@components/Configuration';
import Labyrinth from '@components/Labyrinth';
import RouteName from '@enums/RouteName';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@js/store';

Vue.use(VueRouter);

const routes = [
    {
        name: RouteName.configuration,
        component: Configuration,
        path: '/configuration',
        beforeEnter(to, from, next) {
            store.commit('setLabyrinth', undefined);
            next()
        }
    },
    {
        name: RouteName.labyrinth,
        component: Labyrinth,
        path: '/labyrinth',
        beforeEnter(to, from, next) {
            if (store.state.labyrinth === undefined) {
                next({ name: RouteName.configuration });
            }
            else {
                next();
            }
        }
    }
];

export default new VueRouter({
    mode: 'history',
    routes
});