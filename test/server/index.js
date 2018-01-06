const { expect } = require('chai');

// Base tests
describe('Base process.env tests', () => {
    it('NODE_ENV should be \'testing\'', () => {
        expect(process.env.NODE_ENV).to.equal('testing');
    });
    it('BABEL_ENV should be \'test\'', () => {
        expect(process.env.BABEL_ENV).to.equal('test');
    });
});
