import Cookies from 'js-cookie';
import TokenStorage from '../../../../src/utils/TokenStorage';
//
describe('Utils TokenStorage tests', () => {
    const key = 'auth_token';
    const value = 'token-1243';

    afterEach(() => {
        localStorage.clear();
        Cookies.remove(key);
    });

    it('check default options', () => {
        const token = new TokenStorage();
        expect(token.options).to.deep.equal({
            useLocalStorage: true,
            expires: 60 * 60 * 2, // default: 2h
            defaultName: 'auth_token',
            cookiesOptions: {
                secure: false,
            },
        });

        expect(token.options.defaultName).to.equal(key);
    });

    it('check merge options', () => {
        const token = new TokenStorage({
            defaultName: 'new_name',
            testProp: 'string',
        });
        expect(token.options).to.deep.equal({
            useLocalStorage: true,
            expires: 60 * 60 * 2, // default: 2h
            cookiesOptions: {
                secure: false,
            },
            defaultName: 'new_name',
            testProp: 'string',
        });
    });

    describe('use localStore', () => {
        let token;

        beforeEach(() => {
            token = new TokenStorage();
        });

        it('can use localStore', () => {
            expect(token._driver.checkLocalStorageSupported).to.be.true;
        });

        it('if expired', (done) => {
            const t = new TokenStorage({
                expires: 0.5, // 0.5s
            });

            t.set(key, value);

            // wait 1s
            setTimeout(() => {
                expect(t.get(key)).to.equal(undefined);
                done();
            }, 1000);
        });


        describe('#set()', () => {
            it('case 1', () => {
                token.set(key, value);
                expect(localStorage.getItem(key)).to.equal(value);
            });
            it('case 2', () => {
                token.set(undefined, value);
                expect(localStorage.getItem(token.options.defaultName)).to.equal(value);
            });
        });
        describe('#get()', () => {
            it('case 1', () => {
                expect(token.get(key)).to.equal(undefined);
                token.set(key, value);
                expect(token.get(key)).to.equal(value);
                expect(token.get(key)).to.equal(localStorage.getItem(key));
            });
            it('case 2', () => {
                expect(token.get()).to.equal(undefined);
                token.set(undefined, value);
                expect(token.get()).to.equal(value);
                expect(token.get()).to.equal(localStorage.getItem(token.options.defaultName));
            });
        });
        describe('#remove()', () => {
            it('case 1', () => {
                expect(token.get(key)).to.equal(undefined);
                token.set(key, value);
                token.remove(key);
                expect(token.get(key)).to.equal(undefined);
                expect(localStorage.getItem(key)).to.equal(null);
            });
            it('case 2', () => {
                expect(token.get()).to.equal(undefined);
                token.set(undefined, value);
                token.remove(undefined);
                expect(token.get()).to.equal(undefined);
                expect(localStorage.getItem(token.options.defaultName)).to.equal(null);
            });
        });
    });

    describe('use cookies', () => {
        let token;

        beforeEach(() => {
            token = new TokenStorage({
                useLocalStorage: false,
            });
        });

        it('can use cookies', () => {
            expect(token._driver).to.equal(Cookies);
        });

        it('if expired', (done) => {
            const t = new TokenStorage({
                useLocalStorage: false,
                expires: 0.5,
            });

            t.set(key, value);

            // wait 1s
            setTimeout(() => {
                expect(t.get(key)).to.equal(undefined);
                done();
            }, 1000);
        });


        describe('#set()', () => {
            it('case 1', () => {
                token.set(key, value);
                expect(Cookies.get(key)).to.equal(value);
            });
            it('case 2', () => {
                token.set(undefined, value);
                expect(Cookies.get(token.options.defaultName)).to.equal(value);
            });
        });
        describe('#get()', () => {
            it('case 1', () => {
                expect(token.get(key)).to.equal(undefined);
                token.set(key, value);
                expect(token.get(key)).to.equal(value);
                expect(token.get(key)).to.equal(Cookies.get(key));
            });
            it('case 2', () => {
                expect(token.get()).to.equal(undefined);
                token.set(undefined, value);
                expect(token.get()).to.equal(value);
                expect(token.get()).to.equal(Cookies.get(token.options.defaultName));
            });
        });
        describe('#remove()', () => {
            it('case 1', () => {
                expect(token.get(key)).to.equal(undefined);
                token.set(key, value);
                token.remove(key);
                expect(token.get(key)).to.equal(undefined);
                expect(token.get(key)).to.equal(Cookies.get(key));
            });
            it('case 2', () => {
                expect(token.get()).to.equal(undefined);
                token.set(undefined, value);
                token.remove(undefined);
                expect(token.get()).to.equal(undefined);
                expect(token.get()).to.equal(Cookies.get(token.options.defaultName));
            });
        });
    });
});
