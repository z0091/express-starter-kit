import { checkLocalStorageSupported, defExpires, get, set, remove } from '../../../../src/utils/localStorageWrapper';

describe('Utils localStorageWrapper tests', () => {
    const key = 'testKey';
    const value = 'testValue';

    afterEach(() => {
        localStorage.clear();
    });

    function getSchedule(expires) {
        const milliSec = expires * 1000;
        return new Date().getTime() + milliSec;
    }

    it('can use localStore', () => {
        expect(checkLocalStorageSupported).to.be.true;
    });

    it('#set()', () => {
        set(key, value);
        expect(localStorage.getItem(key)).to.equal(value);

        const expected = localStorage.getItem(`${key}_time`);
        const expectedInSec = Math.round(expected / 1000);
        const equalInSec = Math.round(getSchedule(defExpires) / 1000);
        expect(expectedInSec).to.equal(equalInSec);
    });
    it('#get()', () => {
        localStorage.setItem(key, value);
        localStorage.setItem(`${key}_time`, getSchedule(defExpires));
        expect(get(key)).to.equal(value);
    });
    it('#get() if expired', (done) => {
        localStorage.setItem(key, value);
        localStorage.setItem(`${key}_time`, getSchedule(0.5));
        // wait 1s
        setTimeout(() => {
            expect(get(key)).to.be.not.ok;
            done();
        }, 1000);
    });
    it('#remove()', () => {
        localStorage.setItem(key, value);
        localStorage.setItem(`${key}_time`, getSchedule(defExpires));

        remove(key);

        expect(localStorage.getItem(key)).to.be.null;
        expect(localStorage.getItem(`${key}_time`)).to.be.null;
    });
});
