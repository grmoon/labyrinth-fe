import Configuration from '@components/Configuration';
import Labyrinth from '@components/Labyrinth';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        name: 'configuration',
        component: Configuration,
        path: '/configuration'
    },
    {
        name: 'labyrinth',
        component: Labyrinth,
        path: '/labyrinth'
    }
];

export default new VueRouter({
    mode: 'history',
    routes
});