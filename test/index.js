import chaiSubset from 'chai-subset';

global.chai.use(chaiSubset);

before(() => {
});

describe('OK', () => {
    expect(true).to.be.ok;
});
