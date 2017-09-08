/**
 * The interface for authorization token.
 * Allows you to save it in localStorage or Cookies
 */

import Cookies from 'js-cookie';
import * as _localStorage from './localStorageWrapper';

export default class TokenStorage {
    constructor(options = {}) {
        this.options = {
            useLocalStorage: true,
            cookiesOptions: {
                secure: false,
            },
            expires: 60 * 60 * 2, // default: 2h
            defaultName: 'auth_token',
            ...options,
        };

        const useLocalStoreDriver = _localStorage.checkLocalStorageSupported && this.options.useLocalStorage;

        // if can`t use localStorage, use cookies
        this._driver = useLocalStoreDriver ? _localStorage : Cookies;
        this._driverOptions = useLocalStoreDriver ? {
            expires: this.options.expires,
        } : {
            // options for Cookies
            expires: new Date(new Date().getTime() + (this.options.expires * 1000)),
            ...this.options.cookiesOptions,
        };
    }
    /**
     * Get token value
     * @param {String} name
     * @return {*|undefined}
     */
    get(name = this.options.defaultName) {
        return this._driver.get(name);
    }
    /**
     * Set token value
     * @param {String} name
     * @param {*} token
     */
    set(name = this.options.defaultName, token) {
        return this._driver.set(name, token, this._driverOptions);
    }
    /**
     * Remove token
     * @param {String} name
     */
    remove(name = this.options.defaultName) {
        return this._driver.remove(name);
    }
}
