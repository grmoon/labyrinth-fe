import App from '@components/App';
import Vue from 'vue';

import router from '@js/router';
import store from '@js/store';

new Vue({
    el: '#app',
    router,
    store,
    render(createElement) {
        return createElement(App);
    }
});