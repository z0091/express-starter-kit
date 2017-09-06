import Vue from 'vue';
import chaiSubset from 'chai-subset';

global.chai.use(chaiSubset);
Vue.config.productionTip = false;

// Base tests
describe('Base process.env tests', () => {
    it('NODE_ENV should be \'testing\'', () => {
        expect(process.env.NODE_ENV).to.equal('testing');
    });
    it('BABEL_ENV should be \'test\'', () => {
        expect(process.env.BABEL_ENV).to.equal('test');
    });
});

// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);
