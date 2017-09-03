import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';

Vue.use(ElementUI);

new Vue({ // eslint-disable-line no-new
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
});
