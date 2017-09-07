export const defExpires = 60 * 60 * 24 * 365; // default: 365d

export const checkLocalStorageSupported = (() => {
    try {
        if (!window.localStorage || !window.sessionStorage) {
            throw new Error('exception');
        }

        localStorage.setItem('test', 1);
        localStorage.removeItem('test');

        return true;
    } catch (e) {
        return false;
    }
})();

/**
 * Remove data from localStorage
 * @param {String} name
 */
export const remove = (name) => {
    localStorage.removeItem(name);
    localStorage.removeItem(`${name}_time`);
};

/**
 * Add data to localStorage
 * @param {String} name
 * @param {*} value
 * @param {Number} expires - seconds to expires
 */
export const set = (name, value, expires = defExpires) => {
    const milliSec = expires * 1000;
    const schedule = new Date().getTime() + milliSec;

    localStorage.setItem(name, value);
    localStorage.setItem(`${name}_time`, schedule);
};

/**
 * Get data from localStorage
 * @param {String} name
 * @return {*|null}
 */
export const get = (name) => {
    const current = new Date().getTime();

    // Get Schedule
    let stored_time = localStorage.getItem(`${name}_time`);
    if (stored_time === undefined || stored_time === 'null') stored_time = 0;

    // Expired
    const isExpired = stored_time < current;
    if (isExpired) {
        // Remove
        remove(name);
    }

    return isExpired ? null : localStorage.getItem(name);
};
