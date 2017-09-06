import Vue from 'vue';
import Home from '../../../src/components/Home.vue';

describe('Home.vue', () => {
    it('should render correct contents', () => {
        const Constructor = Vue.extend(Home);
        const vm = new Constructor().$mount();
        expect(vm.$el.querySelector('p').textContent)
            .to.equal('Welcome to Your Vue.js App');
    });
});
